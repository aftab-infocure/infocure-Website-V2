import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Globe, ShieldCheck, Users, Building2 } from "lucide-react";
import SEO from "@/components/site/SEO";
import { HomeHero } from "@/components/ref/HomeHero";
import { TrustStrip, StatBand, FeatureGrid, Testimonial, CTABand, FAQAccordion } from "@/components/ref/sections";
import { Marquee, Reveal } from "@/components/ref/motion";
import LazyVideo from "@/components/ref/LazyVideo";
import { Badge, Button } from "@/components/ref/ui";

const IMG = {
  handshake: "https://images.pexels.com/photos/7414041/pexels-photo-7414041.jpeg?auto=compress&cs=tinysrgb&w=1600",
  skyline: "https://images.pexels.com/photos/28350363/pexels-photo-28350363.jpeg?auto=compress&cs=tinysrgb&w=1600",
  factory: "https://images.pexels.com/photos/31336008/pexels-photo-31336008/free-photo-of-female-factory-worker-operating-textile-machinery.jpeg?auto=compress&cs=tinysrgb&w=1600",
  automotive: "https://images.pexels.com/photos/19233057/pexels-photo-19233057/free-photo-of-assembling-machines-in-factory.jpeg?auto=compress&cs=tinysrgb&w=1600",
  logistics: "https://images.pexels.com/photos/31112251/pexels-photo-31112251/free-photo-of-warehouse-worker-organizing-inventory-shelves.jpeg?auto=compress&cs=tinysrgb&w=1600",
  retail: "https://images.pexels.com/photos/12495827/pexels-photo-12495827.jpeg?auto=compress&cs=tinysrgb&w=1600",
  pharma: "https://images.pexels.com/photos/8442378/pexels-photo-8442378.jpeg?auto=compress&cs=tinysrgb&w=1600",
  analytics: "https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=1600",
};

const MARQUEE_ITEMS = [
  "Digital Transformation", "SAP S/4HANA", "Oracle Cloud", "Salesforce", "Business Applications",
  "AI & Data", "Cloud & DevOps", "Enterprise Integration", "Resource Augmentation", "Certified Consultants",
];

const TRUST_METRICS = [
  { value: "SAP · Oracle", label: "Certified consultants across both core ERP platforms" },
  { value: "India + GCC", label: "Delivery teams across both regions, not fly-in support" },
  { value: "Senior-led", label: "Principal architects on every engagement, start to finish" },
  { value: "Fixed scope", label: "Timelines and costs agreed before work begins" },
];

const CAPABILITIES = [
  {
    kicker: "Flagship practice",
    title: "Digital Transformation",
    href: "/services/digital-transformation",
    description: "Board-level strategy, operating model design and technology execution, delivered as one accountable programme rather than fragmented projects.",
    outcomes: ["Transformation roadmap tied to P&L", "Operating model + governance redesign", "Technology platform selection & rollout"],
  },
  {
    kicker: "SAP Center of Excellence",
    title: "SAP Consulting & S/4HANA",
    href: "/services/sap/consultation",
    description: "S/4HANA migrations, RISE with SAP, greenfield implementations and application managed services, anchored by senior architects.",
    outcomes: ["S/4HANA public & private cloud", "Brownfield & selective data transitions", "24×7 AMS with SLA-backed uptime"],
  },
  {
    kicker: "Oracle & Salesforce",
    title: "Oracle & Salesforce Consulting",
    href: "/services/oracle/fusion",
    description: "Oracle Cloud (Fusion, EPM) and Salesforce implementations engineered for growing enterprises entering their second decade.",
    outcomes: ["Oracle Fusion Cloud & EBS", "Salesforce Sales & Service Cloud", "Integration to legacy landscapes"],
  },
  {
    kicker: "Cloud & Integration",
    title: "Cloud, AI & Integration",
    href: "/services/ai",
    description: "Hyperscaler landing zones, enterprise API fabrics and applied AI, the operating layer that makes transformation stick.",
    outcomes: ["AWS, Azure & OCI landing zones", "Enterprise integration platform", "Applied AI & data foundations"],
  },
  {
    kicker: "Talent on demand",
    title: "Resource Augmentation",
    href: "/services/team-augmentation",
    description: "Vetted SAP, Oracle, cloud and engineering talent, deployed on-site or through our global delivery model in 10–14 days.",
    outcomes: ["Dedicated development teams", "Individual expert placements", "Global delivery from India & UAE"],
  },
  {
    kicker: "Build",
    title: "Custom Software & Mobile",
    href: "/services/software-development",
    description: "Product-grade engineering for the systems your ERP can't cover, from executive portals to field-force mobility.",
    outcomes: ["Executive portals & dashboards", "iOS, Android & cross-platform", "API-first, cloud-native builds"],
  },
];

const PRODUCTS = [
  { slug: "crm", title: "CRM", tag: "Customer", description: "Pipeline, accounts and service, configured for B2B sales cycles across India and the GCC." },
  { slug: "erp", title: "ERP", tag: "Core", description: "Finance, procurement, production and sales unified on one honest enterprise backbone." },
  { slug: "oms", title: "Order Management System", tag: "Operations", description: "Omnichannel order capture, allocation and fulfilment orchestration for distributed businesses." },
  { slug: "dms", title: "Dealer Management System", tag: "Channel", description: "Dealer network onboarding, incentives, claims and stock visibility across multi-tier distribution." },
  { slug: "hrms", title: "HRMS", tag: "People", description: "Hire-to-retire on a single platform, statutory compliance for India, UAE, KSA and beyond." },
  { slug: "ppc", title: "Production Planning & Control", tag: "Manufacturing", description: "Master planning, shop-floor execution and downtime analytics for discrete and process plants." },
  { slug: "exim", title: "EXIM", tag: "Trade", description: "Documentation, incentive tracking and DGFT/customs workflows for exporters and importers." },
  { slug: "vehicle-tracking", title: "Vehicle Tracking", tag: "Logistics", description: "Real-time fleet visibility, route optimisation and driver-behaviour analytics." },
  { slug: "e-invoicing", title: "e-Invoicing Cockpit", tag: "Finance", description: "IRN generation, GSTN & ZATCA compliance and reconciliation for high-volume finance teams." },
];

const INDUSTRIES = [
  { slug: "manufacturing", title: "Manufacturing", image: IMG.factory, tagline: "Discrete, process and hybrid plants, from shop floor to top floor." },
  { slug: "automotive", title: "Automotive", image: IMG.automotive, tagline: "OEMs, tier suppliers and dealer networks across Asia and the GCC." },
  { slug: "logistics", title: "Logistics & Supply Chain", image: IMG.logistics, tagline: "Freight forwarders, 3PLs and multimodal operators." },
  { slug: "retail", title: "Retail & Distribution", image: IMG.retail, tagline: "Omnichannel retail and multi-tier distribution networks." },
  { slug: "healthcare", title: "Pharma & Healthcare", image: IMG.pharma, tagline: "GxP-aligned life-sciences and hospital operators." },
  { slug: "financial-services", title: "Financial Services", image: IMG.analytics, tagline: "Banks, NBFCs and insurers modernising with confidence." },
];

const INSIGHTS = [
  {
    slug: "cfo-guide-s4hana-migration",
    category: "Executive Guide",
    date: "May 2026",
    title: "The CFO's guide to an S/4HANA migration that finishes on time",
    excerpt: "Why 70% of S/4HANA programmes overrun, and the four governance moves that keep the rest on plan.",
    image: IMG.analytics,
  },
  {
    slug: "sovereign-cloud-gcc-2026",
    category: "Point of View",
    date: "April 2026",
    title: "Sovereign cloud in the GCC: what growing businesses need to decide in 2026",
    excerpt: "KSA, UAE and Bahrain data-residency rules have matured. Here is the decision framework we use with CIOs.",
    image: IMG.skyline,
  },
  {
    slug: "applied-ai-operations-pnl",
    category: "Research",
    date: "March 2026",
    title: "Applied AI in operations: five use-cases with measurable P&L impact",
    excerpt: "A field study across manufacturing, distribution and after-sales, separating hype from value.",
    image: IMG.factory,
  },
];

const TESTIMONIALS = [
  {
    quote: "infocure ran our S/4HANA cutover across three plants with the discipline of a Tier-1 firm and the accessibility of a partner. Zero business disruption on day one.",
    name: "Group CIO",
    company: "Indian automotive component manufacturer, INR 4,000 Cr revenue",
  },
  {
    quote: "They understood the boardroom conversation before they wrote a line of code. Our transformation programme finally has a single owner.",
    name: "Managing Director",
    company: "Diversified conglomerate, GCC",
  },
];

const GLOBAL_PRESENCE = [
  { region: "India", cities: "Mumbai · Bengaluru", role: "Global delivery + India market" },
  { region: "United Arab Emirates", cities: "Ras Al Khaimah", role: "GCC customer hub" },
  { region: "Qatar · Bahrain · Oman", cities: "On-demand delivery", role: "Extended GCC coverage" },
];

const HOMEPAGE_FAQ = [
  {
    q: "How is infocure technologies different from a typical IT services firm?",
    a: "We operate as a consulting-first partner. Every engagement is led by senior architects and business consultants, not by a delivery manager routing tickets to an offshore pool. Growing enterprises get the rigour of a Tier-1 firm without the overhead.",
  },
  {
    q: "Which enterprise platforms do you specialise in?",
    a: "SAP (S/4HANA public & private cloud, RISE, ECC migrations, AMS), Oracle Cloud (Fusion, NetSuite, EPM), Salesforce, Microsoft, and the three hyperscalers. We also build proprietary business applications where standard packages fall short.",
  },
  {
    q: "Do you work outside India and the Middle East?",
    a: "Yes. Our delivery centres in India and the UAE serve customers across South Asia, the GCC, Africa and increasingly North America and Europe through our global delivery model.",
  },
  {
    q: "How quickly can you mobilise a team?",
    a: "For resource augmentation, vetted consultants are typically deployed in 10–14 days. For end-to-end transformation programmes, the shaping phase begins within two weeks of a signed engagement.",
  },
];

const POSITIONING_CARDS = [
  { icon: Building2, title: "Boardroom fluency", body: "We speak the language of P&L owners, boards and investors, not just of IT." },
  { icon: Users, title: "Senior on every seat", body: "Programmes are led by principal-level architects, never by rotating juniors." },
  { icon: Globe, title: "India, GCC and global", body: "Delivery centres in Mumbai, Bengaluru and Ras Al Khaimah, following the sun." },
  { icon: ShieldCheck, title: "Operating discipline", body: "ISO 27001-aligned processes, transparent governance and outcome-based commitments." },
];

const METHOD = [
  { n: "01", t: "Shape", d: "Executive alignment, current-state assessment, and a transformation thesis your board can defend." },
  { n: "02", t: "Architect", d: "Target operating model, technology architecture, and a sequenced roadmap tied to business outcomes." },
  { n: "03", t: "Deliver", d: "Senior-led execution across SAP, Oracle, cloud and integration, shipping to plan, on budget." },
  { n: "04", t: "Sustain", d: "AMS, continuous improvement and value engineering, so the transformation compounds instead of decays." },
];

export default function Home() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOMEPAGE_FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div data-testid="home-page">
      <SEO
        title="Digital Transformation Partner for Growing Businesses"
        path="/"
        description="infocure technologies helps growing businesses modernise operations through SAP, Oracle, business applications, AI, cloud and certified technology experts across India, the Middle East and global markets."
        jsonLd={faqJsonLd}
      />

      <HomeHero />

      <TrustStrip />

      <div className="bg-brand-cloud">
        <Marquee items={MARQUEE_ITEMS} />
      </div>

      {/* Positioning section */}
      <section className="bg-white">
        <div className="ic-container px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-24">
            <Reveal>
              <Badge tone="red" className="mb-6">Our positioning</Badge>
              <h2 className="font-display text-[30px] font-semibold leading-[1.15] tracking-[-0.3px] text-brand-ink lg:text-[44px]">
                Eleven years of consulting rigour. Purpose-built for the pace of growing businesses.
              </h2>
              <p className="mt-6 font-body text-[17px] leading-relaxed text-brand-slate lg:text-[18px]">
                Global system integrators are engineered for the Fortune 500. Regional shops are
                engineered for staff augmentation. Growing enterprises, typically between INR 200 Cr
                and INR 5,000 Cr or their GCC and international equivalents, have long been
                under-served by both.
              </p>
              <p className="mt-4 font-body text-[17px] leading-relaxed text-brand-slate lg:text-[18px]">
                We built infocure technologies for exactly that gap: consulting-grade strategy,
                senior architects on every engagement, and an accountable delivery model that
                respects your calendar and your budget.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/about" size="md">About infocure</Button>
                <Button href="/case-studies" variant="secondary" size="md" data-testid="home-case-studies-cta">See client outcomes</Button>
              </div>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {POSITIONING_CARDS.map(({ icon: Icon, title, body }, i) => (
                <Reveal key={title} delay={0.08 * i}>
                  <div className="h-full rounded-card border border-brand-mist bg-brand-cloud p-6">
                    <Icon className="h-6 w-6 text-brand-red" strokeWidth={1.6} />
                    <div className="mt-4 font-display text-[17px] font-semibold text-brand-ink">{title}</div>
                    <p className="mt-2 font-body text-[14.5px] leading-relaxed text-brand-slate">{body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <StatBand items={TRUST_METRICS} tone="dark" />

      {/* Capabilities */}
      <Reveal>
        <FeatureGrid
          eyebrow="What we do"
          title="A single partner for the transformation stack."
          subtitle="From board-level strategy to the last mile of technology delivery, across SAP, Oracle, Salesforce, cloud, AI and enterprise integration."
          items={CAPABILITIES}
          columns={3}
        />
      </Reveal>

      {/* Products */}
      <section className="bg-brand-cloud">
        <div className="ic-container px-6 py-20 lg:px-10 lg:py-24">
          <Reveal>
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div className="max-w-2xl">
                <div className="mb-4 font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-red">Business applications</div>
                <h2 className="ic-h2">Ready-to-deploy products, engineered for growing enterprises.</h2>
                <p className="mt-4 font-body text-[16px] leading-relaxed text-brand-slate lg:text-[17px]">
                  Nine production-grade platforms that plug into your ERP landscape, with the depth
                  of custom software and the speed of a packaged product.
                </p>
              </div>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.map((p, i) => (
              <Reveal key={p.slug} delay={0.05 * i} className="h-full">
                <Link
                  to={`/products/${p.slug}`}
                  data-testid={`product-card-${p.slug}`}
                  className="group flex h-full flex-col rounded-card border border-brand-mist bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:border-brand-red/40 hover:shadow-card-hover"
                >
                  <div className="font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-red">{p.tag}</div>
                  <div className="mt-3 font-display text-[18px] font-semibold text-brand-ink">{p.title}</div>
                  <p className="mt-2 flex-1 font-body text-[14px] leading-relaxed text-brand-slate">{p.description}</p>
                  <div className="mt-4 inline-flex items-center gap-1.5 font-body text-[13.5px] font-semibold text-brand-red">
                    Learn more <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="bg-white">
        <div className="ic-container px-6 py-20 lg:px-10 lg:py-24">
          <Reveal>
            <div className="max-w-2xl">
              <div className="mb-4 font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-red">Industries</div>
              <h2 className="ic-h2">Deep sector experience across the operating economy.</h2>
              <p className="mt-4 font-body text-[16px] leading-relaxed text-brand-slate lg:text-[17px]">
                We work with the businesses that move materials, orders and cash, organisations where operational excellence is the competitive edge.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((ind, i) => (
              <Reveal key={ind.slug} delay={0.06 * i}>
                <Link
                  to={`/industries/${ind.slug}`}
                  data-testid={`industry-card-${ind.slug}`}
                  className="group relative block h-72 overflow-hidden rounded-card"
                >
                  <img
                    src={ind.image}
                    alt={ind.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/50 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="font-display text-[22px] font-semibold text-white">{ind.title}</div>
                    <div className="mt-1 font-body text-[13.5px] text-white/75">{ind.tagline}</div>
                    <div className="mt-4 inline-flex items-center gap-1.5 font-body text-[13.5px] font-semibold text-white">
                      Explore practice <ArrowUpRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="relative isolate overflow-hidden bg-brand-ink text-white">
        <div aria-hidden="true" className="absolute inset-0">
          <LazyVideo
            src="/media/method-bg.mp4"
            webm="/media/method-bg.webm"
            poster="/media/method-bg.jpg"
            className="h-full w-full object-cover opacity-45"
            testId="method-bg-video"
          />
          <div className="absolute inset-0 bg-brand-ink/72" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-ink/60 via-transparent to-brand-ink/70" />
        </div>
        <div className="relative ic-container px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr]">
            <Reveal>
              <div className="mb-4 font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-red">The infocure method</div>
              <h2 className="font-display text-[30px] font-semibold leading-[1.15] text-white lg:text-[44px]">
                Consulting-grade thinking. Delivered with the discipline of an operating company.
              </h2>
              <p className="mt-6 max-w-lg font-body text-[16.5px] leading-relaxed text-white/70">
                Every engagement follows our four-phase framework: shape, architect, deliver,
                sustain. Outcomes are measurable at every gate.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/services/digital-transformation" size="lg">Read our approach <ArrowRight className="h-4 w-4" /></Button>
                <Button href="/industries" variant="secondary-on-dark" size="lg">See industries</Button>
              </div>
            </Reveal>
            <ol className="grid gap-4">
              {METHOD.map((s, i) => (
                <li key={s.n} className="grid grid-cols-[auto_1fr] gap-6 rounded-card border border-white/10 bg-white/[0.04] p-6 lg:p-7">
                  <Reveal delay={0.07 * i}>
                    <div className="grid grid-cols-[auto_1fr] gap-6">
                      <div className="font-mono text-[28px] font-semibold text-brand-red">{s.n}</div>
                      <div>
                        <div className="font-display text-[20px] font-semibold text-white">{s.t}</div>
                        <div className="mt-2 font-body text-[15px] leading-relaxed text-white/70">{s.d}</div>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Reveal>
        <Testimonial items={TESTIMONIALS} />
      </Reveal>

      {/* Global presence */}
      <section className="bg-white">
        <div className="ic-container px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <Reveal>
              <div className="mb-4 font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-red">Global presence</div>
              <h2 className="ic-h2">Delivery from where your business runs.</h2>
              <p className="mt-4 max-w-lg font-body text-[16px] leading-relaxed text-brand-slate lg:text-[17px]">
                Our multi-country delivery footprint gives you time-zone coverage, cultural fluency, and the option to blend onshore, nearshore and offshore teams.
              </p>
              <div className="mt-8 space-y-3">
                {GLOBAL_PRESENCE.map((g) => (
                  <div key={g.region} className="grid grid-cols-[auto_1fr] items-baseline gap-6 border-b border-brand-mist pb-3">
                    <div className="min-w-[190px] font-display text-[16px] font-semibold text-brand-ink">{g.region}</div>
                    <div>
                      <div className="font-body text-[14.5px] text-brand-ink">{g.cities}</div>
                      <div className="mt-0.5 font-body text-[13px] text-brand-slate">{g.role}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Button href="/contact" variant="secondary" size="md">Talk to our team</Button>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="relative h-80 overflow-hidden rounded-card lg:h-full">
                <img src={IMG.skyline} alt="Global business skyline" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/40 via-transparent to-transparent" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Insights */}
      <section className="bg-brand-cloud">
        <div className="ic-container px-6 py-20 lg:px-10 lg:py-24">
          <Reveal>
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div className="max-w-2xl">
                <div className="mb-4 font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-red">Insights</div>
                <h2 className="ic-h2">Perspectives for the leaders driving the change.</h2>
              </div>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {INSIGHTS.map((a, i) => (
              <Reveal key={a.title} delay={0.07 * i} className="h-full">
                <Link
                  to={`/insights/${a.slug}`}
                  data-testid={`insight-card-${a.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-card border border-brand-mist bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <img src={a.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-3 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-red">
                      <span>{a.category}</span>
                      <span className="text-brand-slate">·</span>
                      <span className="text-brand-slate">{a.date}</span>
                    </div>
                    <h3 className="mt-3 font-display text-[19px] font-semibold leading-[1.25] text-brand-ink">{a.title}</h3>
                    <p className="mt-3 flex-1 font-body text-[14.5px] leading-relaxed text-brand-slate">{a.excerpt}</p>
                    <div className="mt-5 inline-flex items-center gap-1.5 font-body text-[13.5px] font-semibold text-brand-red">
                      Read article <ArrowUpRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Reveal>
        <FAQAccordion title="Frequently asked by senior leaders" subtitle="What CIOs, CFOs and Managing Directors ask us most often before we begin." items={HOMEPAGE_FAQ} />
      </Reveal>

      <CTABand
        eyebrow="Let's begin"
        title="Every transformation starts with an honest conversation."
        subtitle="Schedule a 30-minute call with a senior consultant. No sales pitch, just a working discussion about where you are, where you want to be, and what it will take."
        primaryCta={{ label: "Schedule a Consultation", href: "/contact" }}
        secondaryCta={{ label: "Request a Proposal", href: "/contact" }}
        backgroundImage={IMG.handshake}
        backgroundVideo="/media/cta-bg.mp4"
        backgroundVideoWebm="/media/cta-bg.webm"
      />
    </div>
  );
}
