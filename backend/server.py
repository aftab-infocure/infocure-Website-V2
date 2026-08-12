from fastapi import FastAPI, APIRouter, HTTPException, Header, Depends
import bcrypt
import jwt
from datetime import timedelta
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

logger = logging.getLogger(__name__)

# ---------------- Admin auth (single-email JWT) ----------------
JWT_ALGORITHM = "HS256"
ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "").strip().lower()


def _hash_password(pw: str) -> str:
    return bcrypt.hashpw(pw.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def _verify_password(pw: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(pw.encode("utf-8"), hashed.encode("utf-8"))
    except Exception:
        return False


def _create_token(email: str) -> str:
    payload = {
        "email": email,
        "role": "admin",
        "exp": datetime.now(timezone.utc) + timedelta(hours=12),
    }
    return jwt.encode(payload, os.environ["JWT_SECRET"], algorithm=JWT_ALGORITHM)


async def admin_guard(authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    token = authorization[7:]
    try:
        payload = jwt.decode(token, os.environ["JWT_SECRET"], algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Session expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    if (payload.get("email") or "").lower() != ADMIN_EMAIL:
        raise HTTPException(status_code=403, detail="Not authorized")
    return payload


class AdminLogin(BaseModel):
    email: EmailStr
    password: str


@api_router.post("/admin/login")
async def admin_login(body: AdminLogin):
    email = body.email.strip().lower()
    if email != ADMIN_EMAIL:
        raise HTTPException(status_code=403, detail="This account is not authorized.")
    admin = await db.admins.find_one({"email": email})
    if not admin or not _verify_password(body.password, admin.get("password_hash", "")):
        raise HTTPException(status_code=401, detail="Invalid email or password.")
    return {"token": _create_token(email), "email": email}


@api_router.get("/admin/me")
async def admin_me(admin=Depends(admin_guard)):
    return {"email": admin.get("email"), "role": "admin"}


@app.on_event("startup")
async def seed_admin():
    if not ADMIN_EMAIL:
        return
    pw = os.environ.get("ADMIN_PASSWORD", "")
    existing = await db.admins.find_one({"email": ADMIN_EMAIL})
    if existing is None:
        await db.admins.insert_one({"email": ADMIN_EMAIL, "password_hash": _hash_password(pw)})
        logger.info("Seeded admin %s", ADMIN_EMAIL)
    elif pw and not _verify_password(pw, existing.get("password_hash", "")):
        await db.admins.update_one({"email": ADMIN_EMAIL}, {"$set": {"password_hash": _hash_password(pw)}})


class ContactEnquiry(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    company: Optional[str] = ""
    interest: Optional[str] = ""
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactEnquiryCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    company: Optional[str] = ""
    interest: Optional[str] = ""
    message: str


@api_router.get("/")
async def root():
    return {"message": "infocure technologies API", "status": "ok"}


@api_router.get("/health")
async def health():
    return {"status": "healthy"}


def _notify_email(enquiry: ContactEnquiry):
    api_key = os.environ.get("RESEND_API_KEY")
    if not api_key:
        logger.info("RESEND_API_KEY not set — enquiry stored without email notification")
        return
    import resend
    resend.api_key = api_key
    html = f"""
    <table style="font-family:Arial,sans-serif;max-width:560px">
      <tr><td><h2 style="margin:0">New enquiry — infocure.in</h2></td></tr>
      <tr><td><p><b>Name:</b> {enquiry.name}</p>
      <p><b>Email:</b> {enquiry.email}</p>
      <p><b>Phone:</b> {enquiry.phone or '-'}</p>
      <p><b>Company:</b> {enquiry.company or '-'}</p>
      <p><b>Interest:</b> {enquiry.interest or '-'}</p>
      <p><b>Message:</b><br/>{enquiry.message}</p></td></tr>
    </table>"""
    params = {
        "from": os.environ.get("SENDER_EMAIL", "onboarding@resend.dev"),
        "to": [os.environ.get("NOTIFY_EMAIL", "solutions@infocure.in")],
        "subject": f"Website enquiry: {enquiry.name} ({enquiry.company or 'No company'})",
        "html": html,
    }
    try:
        resend.Emails.send(params)
        logger.info(f"Notification email sent for enquiry {enquiry.id}")
    except Exception as e:
        logger.error(f"Email notification failed: {e}")


@api_router.post("/contact", response_model=ContactEnquiry)
async def create_enquiry(input: ContactEnquiryCreate):
    enquiry = ContactEnquiry(**input.model_dump())
    doc = enquiry.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.contact_enquiries.insert_one(doc)
    asyncio.get_event_loop().run_in_executor(None, _notify_email, enquiry)
    return enquiry


@api_router.get("/contact", response_model=List[ContactEnquiry])
async def list_enquiries():
    docs = await db.contact_enquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for d in docs:
        if isinstance(d.get("created_at"), str):
            d["created_at"] = datetime.fromisoformat(d["created_at"])
    return docs


# ---------------- Insights (blog) ----------------

class InsightSection(BaseModel):
    h: Optional[str] = None
    p: str


class Insight(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    slug: str
    title: str
    excerpt: str
    category: str = "Perspective"
    type: str = "article"
    date: str
    read_minutes: int = 5
    image: str = ""
    sections: List[InsightSection] = []
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class InsightCreate(BaseModel):
    slug: str
    title: str
    excerpt: str
    category: str = "Perspective"
    type: str = "article"
    date: str
    read_minutes: int = 5
    image: str = ""
    sections: List[InsightSection] = []


def _require_admin(x_admin_key: Optional[str]):
    expected = os.environ.get("ADMIN_KEY")
    if not expected or x_admin_key != expected:
        raise HTTPException(status_code=401, detail="Invalid admin key")


SEED_INSIGHTS = [
    {
        "slug": "cfo-guide-s4hana-migration",
        "title": "The CFO's guide to an S/4HANA migration that finishes on time",
        "excerpt": "Why 70% of S/4HANA programmes overrun, and the four governance moves that keep the rest on plan.",
        "category": "Executive Guide",
        "date": "May 2026",
        "read_minutes": 7,
        "image": "https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "sections": [
            {"h": None, "p": "Most S/4HANA programmes do not fail because of technology. They fail because of governance that was designed for a simpler era of ERP. The patterns are remarkably consistent: scope agreed in optimism, data treated as an afterthought, and decisions queuing behind monthly steering committees while the meter runs."},
            {"h": "Why programmes drift", "p": "In our delivery reviews of mid-market programmes, three root causes explain the majority of overruns. First, scope locked before process discovery is complete, which converts every workshop into a change request. Second, custom code carried forward without a ruthless retire-or-justify review. Third, data migration rehearsed once, late, on stale extracts."},
            {"h": "Move 1: Fund decisions, not phases", "p": "Replace phase gates with decision gates. Each gate releases funding only when evidence exists: a signed fit-to-standard baseline, a completed mock conversion, a tested cutover script. This shifts the conversation from 'are we on plan?' to 'what has been proven?'"},
            {"h": "Move 2: Put a single owner on the business case", "p": "Transformation benefits evaporate when ownership is shared across IT, finance and operations. Appoint one accountable executive, usually the CFO or COO, with the value targets written into the programme charter and reviewed quarterly against the P&L."},
            {"h": "Move 3: Rehearse cutover like a product launch", "p": "A cutover that has been rehearsed twice on production-like data is a different risk class from one that has been rehearsed once in a sandbox. Budget for two full mock conversions. The second rehearsal is where timings stabilize and the real cutover becomes a non-event."},
            {"h": "Move 4: Contract for outcomes, with room to learn", "p": "Fixed-scope contracts work when the scope is genuinely understood. Where it is not, a hybrid model, fixed price for proven work packages and capacity-based pricing for discovery, protects both sides from the fiction of early certainty."},
            {"h": None, "p": "The programmes that finish on time are not the ones with the biggest budgets. They are the ones where evidence replaces optimism at every gate."},
        ],
    },
    {
        "slug": "sovereign-cloud-gcc-2026",
        "title": "Sovereign cloud in the GCC: what growing businesses need to decide in 2026",
        "excerpt": "KSA, UAE and Bahrain data-residency rules have matured. Here is the decision framework we use with CIOs.",
        "category": "Point of View",
        "date": "April 2026",
        "read_minutes": 6,
        "image": "https://images.pexels.com/photos/28350363/pexels-photo-28350363.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "sections": [
            {"h": None, "p": "Two years ago, sovereign cloud in the Gulf was a compliance footnote. Today it shapes architecture decisions from day one. KSA's data classification regime, the UAE's sectoral residency rules and Bahrain's cloud-first policy have each matured, and they no longer say the same thing."},
            {"h": "What actually changed", "p": "Regulators have moved from principles to enforcement guidance. Financial services, healthcare and government-adjacent workloads now carry explicit residency expectations, while commercial workloads have more freedom than many assume. The result is not a binary choice but a placement decision per workload."},
            {"h": "The three-question framework", "p": "For each workload we ask: What data does it hold, and whose? Which regulator's perimeter does it fall under? And what is the latency cost of placing it in-country versus in-region? Workloads scoring high on the first two questions go sovereign or in-country; the rest follow economics."},
            {"h": "ERP is the anchor workload", "p": "Because ERP holds finance, HR and often customer data, its placement decision cascades to everything integrated with it. We typically anchor S/4HANA or Fusion Cloud in-country or in a sovereign region, then let analytics and integration layers sit where they perform best, with clear data-flow documentation for auditors."},
            {"h": "Do not over-correct", "p": "The most expensive mistake we see is blanket residency, moving every workload in-country at significant cost, when only a fraction of the estate actually requires it. A documented workload-by-workload classification satisfies regulators and keeps the architecture honest."},
        ],
    },
    {
        "slug": "applied-ai-operations-pnl",
        "title": "Applied AI in operations: five use-cases with measurable P&L impact",
        "excerpt": "A field study across manufacturing, distribution and after-sales, separating hype from value.",
        "category": "Research",
        "date": "March 2026",
        "read_minutes": 8,
        "image": "https://images.pexels.com/photos/31336008/pexels-photo-31336008/free-photo-of-female-factory-worker-operating-textile-machinery.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "sections": [
            {"h": None, "p": "Across our delivery portfolio we track every AI deployment against a simple test: does it move a line on the P&L within twelve months? Five use-cases pass that test consistently. The rest are still experiments, and should be budgeted as such."},
            {"h": "1. Intelligent document processing", "p": "Invoices, purchase orders and delivery notes extracted, validated and posted automatically. Document cycle times fall by 60–80% and finance teams are redeployed to exceptions and analysis. This is the most reliable payback in the portfolio, typically under six months."},
            {"h": "2. Demand forecasting that planners trust", "p": "Machine-learning forecasts blended with planner overrides consistently beat both pure statistical models and gut feel. Inventory reductions of 15–25% are achievable without service-level damage, provided the model is retrained on a fixed cadence."},
            {"h": "3. Predictive maintenance on constrained assets", "p": "On bottleneck equipment where every hour of downtime has a known cost, sensor-driven failure prediction pays back quickly. The discipline is choosing the constrained asset first rather than instrumenting everything."},
            {"h": "4. Service copilots grounded in your data", "p": "Retrieval-grounded assistants over service history, manuals and parts catalogs cut resolution time for new engineers dramatically. Accuracy is engineered through grounding and evaluation harnesses, not hoped for."},
            {"h": "5. Quality inspection vision systems", "p": "Camera-based defect detection on production lines reduces escapes and reclaims inspector time for root-cause work. Value compounds because the defect data feeds process improvement upstream."},
            {"h": "What separates value from theatre", "p": "Every successful case shared three traits: a named business owner, a baseline metric agreed before the pilot, and a hard scale-or-stop decision at twelve weeks. AI that survives contact with operations is engineered like operations."},
        ],
    },
]


SEED_BLOG = [
    {
        "slug": "why-fit-to-standard-beats-customization",
        "title": "Why fit-to-standard beats customization for growing businesses",
        "excerpt": "Every customization is a future upgrade cost. Here is when to standardize and when to extend.",
        "category": "SAP",
        "type": "blog",
        "date": "May 2026",
        "read_minutes": 4,
        "image": "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "sections": [
            {"h": None, "p": "The instinct to bend the system to match today's process is strong — and expensive. Modern ERP encodes decades of leading practice. Fighting it usually means paying twice: once to build the customization, and again at every upgrade to maintain it."},
            {"h": "Standardize the commodity", "p": "Finance postings, procurement approvals and standard reporting rarely differentiate your business. Adopt the standard here and redirect the saved effort to what actually wins customers."},
            {"h": "Extend only the differentiators", "p": "Where a process is a genuine competitive edge, extend on a clean core — side-by-side, upgrade-safe extensions rather than core modifications. The rule is simple: standardize the commodity, engineer the edge."},
        ],
    },
    {
        "slug": "erp-and-ai-what-changes-in-2026",
        "title": "ERP and AI: what actually changes for operators in 2026",
        "excerpt": "AI copilots are arriving inside ERP. The winners will be the businesses with clean, governed data.",
        "category": "AI",
        "type": "blog",
        "date": "April 2026",
        "read_minutes": 5,
        "image": "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "sections": [
            {"h": None, "p": "AI features are landing inside every major ERP suite. The demos are impressive, but value depends less on the model and more on the data underneath it."},
            {"h": "Data quality is the moat", "p": "A copilot is only as good as the master data and process discipline it sits on. Businesses that cleaned their data during migration will see immediate benefit; the rest will see confident, wrong answers."},
            {"h": "Start where the payback is obvious", "p": "Document processing, exception handling and narrative reporting pay back fastest. Treat everything else as an experiment with a hard scale-or-stop decision."},
        ],
    },
    {
        "slug": "cloud-migration-without-the-drama",
        "title": "Cloud migration without the drama: a pragmatic checklist",
        "excerpt": "Moving core workloads to the cloud is routine now — if you sequence it around business risk.",
        "category": "Cloud",
        "type": "blog",
        "date": "March 2026",
        "read_minutes": 4,
        "image": "https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "sections": [
            {"h": None, "p": "Cloud migration is no longer a leap of faith. The risk today is not the destination — it is the sequence."},
            {"h": "Classify before you move", "p": "Group workloads by data sensitivity, integration depth and downtime tolerance. That classification, not a vendor preference, should drive the order of migration."},
            {"h": "Rehearse the cutover", "p": "One rehearsed cutover on production-like data turns go-live from an event into a non-event. Budget for the rehearsal, not just the migration."},
        ],
    },
]


@api_router.on_event("startup")
async def seed_insights():
    if await db.insights.count_documents({"type": {"$ne": "blog"}}) == 0:
        for item in SEED_INSIGHTS:
            doc = Insight(**item).model_dump()
            doc["created_at"] = doc["created_at"].isoformat()
            await db.insights.insert_one(doc)
        logger.info("Seeded %d articles", len(SEED_INSIGHTS))
    if await db.insights.count_documents({"type": "blog"}) == 0:
        for item in SEED_BLOG:
            doc = Insight(**item).model_dump()
            doc["created_at"] = doc["created_at"].isoformat()
            await db.insights.insert_one(doc)
        logger.info("Seeded %d blog posts", len(SEED_BLOG))


def _serialize_insight(doc):
    doc.pop("_id", None)
    if isinstance(doc.get("created_at"), str):
        doc["created_at"] = datetime.fromisoformat(doc["created_at"])
    return doc


@api_router.get("/insights", response_model=List[Insight])
async def list_insights(type: Optional[str] = None):
    query = {"type": type} if type else {}
    docs = await db.insights.find(query, {"_id": 0}).sort("created_at", -1).to_list(100)
    return [_serialize_insight(d) for d in docs]


@api_router.get("/insights/{slug}", response_model=Insight)
async def get_insight(slug: str):
    doc = await db.insights.find_one({"slug": slug}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Article not found")
    return _serialize_insight(doc)


@api_router.post("/insights", response_model=Insight)
async def create_insight(input: InsightCreate, admin=Depends(admin_guard)):
    existing = await db.insights.find_one({"slug": input.slug})
    if existing:
        raise HTTPException(status_code=409, detail="An article with this slug already exists")
    insight = Insight(**input.model_dump())
    doc = insight.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.insights.insert_one(doc)
    return insight


@api_router.delete("/insights/{slug}")
async def delete_insight(slug: str, admin=Depends(admin_guard)):
    result = await db.insights.delete_one({"slug": slug})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Article not found")
    return {"deleted": slug}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
