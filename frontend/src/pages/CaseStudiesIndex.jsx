import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ArrowUpRight } from "lucide-react";
import SEO from "@/components/site/SEO";
import { Reveal } from "@/components/ref/motion";
import { Badge } from "@/components/ref/ui";
import { CTABand } from "@/components/ref/sections";
import { CASE_STUDIES } from "@/data/case-studies";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function CaseStudiesIndex() {
  const [extra, setExtra] = useState([]);
  useEffect(() => {
    axios.get(`${API}/insights`, { params: { type: "case-study" } }).then((r) => setExtra(r.data)).catch(() => setExtra([]));
  }, []);
  return (
    <div data-testid="case-studies-page">
      <SEO
        title="Client Outcomes & Case Studies"
        description="Detailed outcome stories: S/4HANA cutovers, GCC transformation programmes, production planning and fleet visibility — with measured results."
        path="/case-studies"
      />

      <section className="ic-hero-grid relative isolate overflow-hidden bg-white">
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-brand-red/[0.06] blur-3xl" />
        <div className="ic-container relative px-6 pb-16 pt-32 lg:px-10 lg:pb-20 lg:pt-44">
          <Reveal>
            <Badge tone="red" className="mb-6">Client outcomes</Badge>
            <h1 className="max-w-3xl font-display text-[36px] font-bold leading-[1.05] tracking-[-0.5px] text-brand-ink lg:text-[56px]">
              Proof, not promises.
            </h1>
            <p className="mt-6 max-w-2xl font-body text-[17px] leading-relaxed text-brand-slate lg:text-[18px]">
              Every engagement below shipped to plan and was measured against the business case.
              Names are withheld under NDA; the numbers are real.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white">
        <div className="ic-container px-6 pb-24 lg:px-10">
          {extra.length > 0 && (
            <div className="mb-6 grid gap-6 md:grid-cols-2" data-testid="case-studies-admin">
              {extra.map((cs, i) => (
                <Reveal key={cs.slug} delay={0.05 * i} className="h-full">
                  <Link to={`/insights/${cs.slug}`} data-testid={`case-study-admin-${cs.slug}`} className="group flex h-full flex-col overflow-hidden rounded-card border border-brand-mist bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
                    {cs.image ? (
                      <div className="relative aspect-[16/9] w-full overflow-hidden">
                        <img src={cs.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                    ) : null}
                    <div className="flex flex-1 flex-col p-7">
                      <div className="font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-red">{cs.category} · {cs.date}</div>
                      <h2 className="mt-3 font-display text-[21px] font-semibold leading-[1.25] text-brand-ink">{cs.title}</h2>
                      <p className="mt-3 flex-1 font-body text-[14.5px] leading-relaxed text-brand-slate">{cs.excerpt}</p>
                      <div className="mt-5 inline-flex items-center gap-1.5 font-body text-[13.5px] font-semibold text-brand-red">Read the story <ArrowUpRight className="h-3.5 w-3.5" /></div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
          <div className="grid gap-6 md:grid-cols-2">
            {CASE_STUDIES.map((cs, i) => (
              <Reveal key={cs.slug} delay={0.06 * i} className="h-full">
                <Link
                  to={`/case-studies/${cs.slug}`}
                  data-testid={`case-study-card-${cs.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-card border border-brand-mist bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <img src={cs.image} alt={cs.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/60 to-transparent" />
                    <div className="absolute bottom-4 left-5 flex items-center gap-2">
                      <span className="rounded-chip bg-white/90 px-3 py-1 font-body text-[11.5px] font-semibold uppercase tracking-[0.12em] text-brand-ink">{cs.industry}</span>
                      <span className="rounded-chip bg-white/20 px-3 py-1 font-body text-[11.5px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur">{cs.region}</span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <h2 className="font-display text-[21px] font-semibold leading-[1.25] text-brand-ink">{cs.title}</h2>
                    <p className="mt-3 flex-1 font-body text-[14.5px] leading-relaxed text-brand-slate">{cs.summary}</p>
                    <div className="mt-5 flex items-center justify-between border-t border-brand-mist pt-5">
                      <span className="font-mono text-[20px] font-semibold text-brand-red">{cs.outcomes[0].value}</span>
                      <span className="max-w-[60%] text-right font-body text-[12.5px] leading-snug text-brand-slate">{cs.outcomes[0].label}</span>
                    </div>
                    <div className="mt-5 inline-flex items-center gap-1.5 font-body text-[13.5px] font-semibold text-brand-red">
                      Read the story <ArrowUpRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        eyebrow="Your story next"
        title="The next outcome on this page could be yours."
        subtitle="Schedule a 30-minute call with a senior consultant to discuss what measurable change looks like for your business."
        primaryCta={{ label: "Schedule a Consultation", href: "/contact" }}
        secondaryCta={{ label: "Explore Services", href: "/services/digital-transformation" }}
      />
    </div>
  );
}
