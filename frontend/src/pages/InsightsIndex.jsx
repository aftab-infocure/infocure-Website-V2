import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ArrowUpRight } from "lucide-react";
import SEO from "@/components/site/SEO";
import { Reveal } from "@/components/ref/motion";
import { Badge } from "@/components/ref/ui";
import { CTABand } from "@/components/ref/sections";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function InsightsIndex() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API}/insights`, { params: { type: "article" } })
      .then((r) => setPosts(r.data))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div data-testid="insights-page">
      <SEO
        title="Insights — Perspectives for Enterprise Leaders"
        description="Guides, points of view and field research for CIOs, CFOs and business owners driving digital transformation."
        path="/insights"
      />

      <section className="ic-hero-grid relative isolate overflow-hidden bg-white">
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-brand-red/[0.06] blur-3xl" />
        <div className="ic-container relative px-6 pb-16 pt-32 lg:px-10 lg:pb-20 lg:pt-44">
          <Reveal>
            <Badge tone="red" className="mb-6">Insights</Badge>
            <h1 className="max-w-3xl font-display text-[36px] font-bold leading-[1.05] tracking-[-0.5px] text-brand-ink lg:text-[56px]">
              Perspectives for the leaders driving the change.
            </h1>
            <p className="mt-6 max-w-2xl font-body text-[17px] leading-relaxed text-brand-slate lg:text-[18px]">
              Field notes from enterprise transformation programmes — written for boards,
              CIOs and the operators who make change stick.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white">
        <div className="ic-container px-6 pb-24 lg:px-10">
          {loading ? (
            <p className="py-10 font-body text-[15px] text-brand-slate" data-testid="insights-loading">Loading articles…</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((a, i) => (
                <Reveal key={a.slug} delay={0.06 * i} className="h-full">
                  <Link
                    to={`/insights/${a.slug}`}
                    data-testid={`insight-card-${a.slug}`}
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
                        Read article <ArrowUpRight className="h-3.5 w-3.5" />
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
        title="Reading is the easy part. Let's talk about your programme."
        subtitle="Schedule a 30-minute call with a senior consultant."
        primaryCta={{ label: "Schedule a Consultation", href: "/contact" }}
        secondaryCta={{ label: "Request a Proposal", href: "/contact" }}
      />
    </div>
  );
}
