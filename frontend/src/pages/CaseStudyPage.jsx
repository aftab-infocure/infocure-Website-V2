import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Quote, CheckCircle2 } from "lucide-react";
import SEO from "@/components/site/SEO";
import { Reveal } from "@/components/ref/motion";
import { Badge } from "@/components/ref/ui";
import { StatBand, CTABand } from "@/components/ref/sections";
import Hero from "@/components/ref/Hero";
import { getCaseStudy, CASE_STUDIES } from "@/data/case-studies";

function BlockList({ title, items, dark = false }) {
  return (
    <div>
      <h3 className={`font-display text-[20px] font-semibold ${dark ? "text-white" : "text-brand-ink"}`}>{title}</h3>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className={`flex items-start gap-3 font-body text-[15px] leading-relaxed ${dark ? "text-white/75" : "text-brand-slate"}`}>
            <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 h-4 w-4 flex-none text-brand-red" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CaseStudyPage() {
  const { slug } = useParams();
  const cs = getCaseStudy(slug);
  if (!cs) return <Navigate to="/case-studies" replace />;

  const others = CASE_STUDIES.filter((c) => c.slug !== slug).slice(0, 2);

  return (
    <div data-testid={`case-study-page-${slug}`}>
      <SEO title={cs.title} description={cs.summary} path={`/case-studies/${slug}`} />

      <Hero
        eyebrow={`Client outcome · ${cs.industry}`}
        headline={cs.title}
        subhead={cs.summary}
        trustLine={`${cs.client} · ${cs.region}`}
        image={cs.image}
      />

      {/* Challenge / Approach / Solution */}
      <section className="bg-white">
        <div className="ic-container px-6 py-20 lg:px-10 lg:py-24">
          <div className="mb-10">
            <Link to="/case-studies" data-testid="case-study-back" className="inline-flex items-center gap-2 font-body text-[13.5px] font-semibold text-brand-slate hover:text-brand-red">
              <ArrowLeft className="h-4 w-4" /> All client outcomes
            </Link>
          </div>
          <div className="grid gap-12 lg:grid-cols-3">
            <Reveal><BlockList title="The challenge" items={cs.challenge} /></Reveal>
            <Reveal delay={0.08}><BlockList title="Our approach" items={cs.approach} /></Reveal>
            <Reveal delay={0.16}><BlockList title="What we delivered" items={cs.solution} /></Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="mt-14 flex flex-wrap items-center gap-3 border-t border-brand-mist pt-10">
              <span className="mr-2 font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-slate">Delivered on</span>
              {cs.stack.map((t) => (
                <span key={t} className="rounded-chip border border-brand-mist bg-brand-cloud px-4 py-1.5 font-body text-[13.5px] font-medium text-brand-ink">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <StatBand tone="dark" items={cs.outcomes} />

      {/* Quote */}
      <section className="bg-brand-cloud border-b border-brand-mist">
        <div className="ic-container-narrow px-6 py-20 lg:px-0 lg:py-24">
          <Reveal>
            <figure>
              <Quote className="h-9 w-9 text-brand-red" />
              <blockquote className="mt-6 font-display text-[24px] font-medium leading-[1.4] text-brand-ink lg:text-[30px]">
                “{cs.quote.quote}”
              </blockquote>
              <figcaption className="mt-8">
                <div className="font-body text-[15px] font-semibold text-brand-ink">{cs.quote.name}</div>
                <div className="mt-1 font-body text-[13.5px] text-brand-slate">{cs.quote.company}</div>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* More stories */}
      <section className="bg-white">
        <div className="ic-container px-6 py-20 lg:px-10 lg:py-24">
          <Reveal>
            <h2 className="ic-h2 mb-10">More client outcomes.</h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {others.map((o, i) => (
              <Reveal key={o.slug} delay={0.07 * i} className="h-full">
                <Link
                  to={`/case-studies/${o.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-card border border-brand-mist bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <div className="relative aspect-[16/8] w-full overflow-hidden">
                    <img src={o.image} alt={o.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/60 to-transparent" />
                  </div>
                  <div className="p-6">
                    <Badge tone="red">{o.industry}</Badge>
                    <h3 className="mt-3 font-display text-[19px] font-semibold leading-[1.25] text-brand-ink">{o.title}</h3>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        eyebrow="Your story next"
        title="Let's write your outcome story."
        subtitle="Schedule a 30-minute call with a senior consultant."
        primaryCta={{ label: "Schedule a Consultation", href: "/contact" }}
        secondaryCta={{ label: "Request a Proposal", href: "/contact" }}
      />
    </div>
  );
}
