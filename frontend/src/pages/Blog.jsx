import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ArrowUpRight } from "lucide-react";
import SEO from "@/components/site/SEO";
import { Reveal } from "@/components/ref/motion";
import { Badge } from "@/components/ref/ui";
import { CTABand } from "@/components/ref/sections";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const CATEGORIES = ["All", "SAP", "ERP", "Digital Transformation", "AI", "Cloud", "Business Applications", "Industry", "Technology Strategy"];

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("All");

  useEffect(() => {
    axios
      .get(`${API}/insights`, { params: { type: "blog" } })
      .then((r) => setPosts(r.data))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () => (active === "All" ? posts : posts.filter((p) => p.category === active)),
    [posts, active]
  );

  return (
    <div data-testid="blog-page">
      <SEO
        title="Blog — SAP, ERP, Digital Transformation, AI & Cloud"
        description="Regular perspectives on SAP, ERP, digital transformation, AI, cloud and business applications for enterprise leaders."
        path="/insights/blog"
      />

      <section className="ic-hero-grid relative isolate overflow-hidden bg-white">
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-brand-red/[0.06] blur-3xl" />
        <div className="ic-container relative px-6 pb-14 pt-32 lg:px-10 lg:pb-16 lg:pt-44">
          <Reveal>
            <Badge tone="red" className="mb-6">Blog</Badge>
            <h1 className="max-w-3xl font-display text-[36px] font-bold leading-[1.05] tracking-[-0.5px] text-brand-ink lg:text-[56px]">
              Ideas worth acting on.
            </h1>
            <p className="mt-6 max-w-2xl font-body text-[17px] leading-relaxed text-brand-slate lg:text-[18px]">
              Shorter, more frequent takes on enterprise technology — from SAP and ERP to AI, cloud and
              the decisions leaders face along the way.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white">
        <div className="ic-container px-6 pb-6 lg:px-10">
          <div className="flex flex-wrap gap-2" data-testid="blog-filters">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                data-testid={`blog-filter-${c.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                onClick={() => setActive(c)}
                className={`rounded-chip border px-4 py-2 font-body text-[13.5px] font-semibold transition-colors duration-200 ${
                  active === c ? "border-brand-red bg-brand-red text-white" : "border-brand-mist bg-white text-brand-slate hover:border-brand-red/40 hover:text-brand-red"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="ic-container px-6 pb-24 pt-8 lg:px-10">
          {loading ? (
            <p className="py-10 font-body text-[15px] text-brand-slate" data-testid="blog-loading">Loading posts…</p>
          ) : filtered.length === 0 ? (
            <p className="py-10 font-body text-[15px] text-brand-slate" data-testid="blog-empty">No posts in this category yet.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((a, i) => (
                <Reveal key={a.slug} delay={0.06 * i} className="h-full">
                  <Link
                    to={`/insights/${a.slug}`}
                    data-testid={`blog-card-${a.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-card border border-brand-mist bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
                  >
                    {a.image ? (
                      <div className="relative aspect-[16/10] w-full overflow-hidden">
                        <img src={a.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                    ) : null}
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-3 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-red">
                        <span>{a.category}</span>
                        <span className="text-brand-slate">·</span>
                        <span className="text-brand-slate">{a.date}</span>
                      </div>
                      <h2 className="mt-3 font-display text-[19px] font-semibold leading-[1.25] text-brand-ink">{a.title}</h2>
                      <p className="mt-3 flex-1 font-body text-[14.5px] leading-relaxed text-brand-slate">{a.excerpt}</p>
                      <div className="mt-5 inline-flex items-center gap-1.5 font-body text-[13.5px] font-semibold text-brand-red">
                        Read post <ArrowUpRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTABand
        eyebrow="Let's begin"
        title="From reading to results."
        subtitle="Schedule a 30-minute call with a senior consultant."
        primaryCta={{ label: "Talk to an Expert", href: "/contact" }}
        secondaryCta={{ label: "Explore Services", href: "/services/digital-transformation" }}
      />
    </div>
  );
}
