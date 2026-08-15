import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SEO from "@/components/site/SEO";
import { Reveal } from "@/components/ref/motion";
import { CTABand } from "@/components/ref/sections";
import { ThemedVisual } from "@/components/ref/visuals";
import Hero from "@/components/ref/Hero";
import { getSolution } from "@/data/solutions";

const VISUALS = {
  "s4hana-rise": { center: "RISE", nodes: [{ label: "Private" }, { label: "Public" }, { label: "BTP" }, { label: "Clean Core" }, { label: "Migrate" }, { label: "Operate" }] },
  "sap-analytics-cloud": { center: "SAC", nodes: [{ label: "Live Data" }, { label: "Planning" }, { label: "Stories" }, { label: "Predict" }, { label: "Govern" }, { label: "Adopt" }] },
  "sap-hcm": { center: "HCM", nodes: [{ label: "Core HR" }, { label: "Payroll" }, { label: "Talent" }, { label: "Recruit" }, { label: "Learn" }, { label: "Mobile" }] },
  "sap-fiori": { center: "Fiori", nodes: [{ label: "Personas" }, { label: "Catalogs" }, { label: "Spaces" }, { label: "Custom" }, { label: "Mobile" }, { label: "Adopt" }] },
};

export default function SolutionPage() {
  const { slug } = useParams();
  const solution = getSolution(slug);
  if (!solution) return <Navigate to="/" replace />;

  const visual = VISUALS[slug];

  return (
    <div data-testid={`solution-page-${slug}`}>
      <SEO title={solution.seo.title} description={solution.seo.description} path={`/solutions/${slug}`} />

      <Hero
        eyebrow={solution.eyebrow}
        headline={solution.title}
        subhead={solution.heroCopy}
        primaryCta={{ label: "Discuss your roadmap", href: "/contact" }}
        secondaryCta={{ label: "Talk to an architect", href: "/contact" }}
        trustLine="Senior architects on every engagement"
        video="/media/method-bg.mp4"
        videoWebm="/media/method-bg.webm"
        videoPoster="/media/method-bg.jpg"
        visual={visual ? <ThemedVisual center={visual.center} nodes={visual.nodes} caption={solution.title} /> : undefined}
        image={solution.image}
      />

      {/* Benefits — numbered editorial rows */}
      <section className="bg-white">
        <div className="ic-container px-6 py-20 lg:px-10 lg:py-24">
          <Reveal>
            <div className="mb-4 font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-red">Why it matters</div>
            <h2 className="ic-h2 mb-12">Built for measurable advantage.</h2>
          </Reveal>
          <div className="space-y-px overflow-hidden rounded-card border border-brand-mist bg-brand-mist">
            {solution.benefits.map((b, i) => (
              <Reveal key={b.title} delay={0.05 * i}>
                <div className="group grid grid-cols-1 gap-3 bg-white p-7 transition-colors duration-200 hover:bg-brand-cloud md:grid-cols-12 md:items-center lg:p-9">
                  <span className="font-mono text-[26px] font-semibold text-brand-red/25 transition-colors duration-300 group-hover:text-brand-red md:col-span-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-[20px] font-semibold text-brand-ink md:col-span-4">{b.title}</h3>
                  <p className="font-body text-[15px] leading-relaxed text-brand-slate md:col-span-6">{b.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-brand-cloud border-y border-brand-mist">
        <div className="ic-container px-6 py-20 lg:px-10 lg:py-24">
          <Reveal>
            <div className="mb-4 font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-red">Delivery path</div>
            <h2 className="ic-h2 mb-12">From decision to value.</h2>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {solution.process.map((step, i) => (
              <Reveal key={step.title} delay={0.07 * i} className="h-full">
                <div className="h-full rounded-card border border-brand-mist bg-white p-7 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover">
                  <div className="font-mono text-[13px] font-semibold tracking-[0.2em] text-brand-red">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="mt-4 font-display text-[19px] font-semibold text-brand-ink">{step.title}</h3>
                  <p className="mt-2.5 font-body text-[14.5px] leading-relaxed text-brand-slate">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="bg-white">
        <div className="ic-container px-6 py-20 lg:px-10 lg:py-24">
          <Reveal>
            <div className="mb-4 font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-red">Related</div>
            <h2 className="ic-h2 mb-10">Keep exploring.</h2>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {solution.related.map((r, i) => (
              <Reveal key={r.href} delay={0.06 * i} className="h-full">
                <Link
                  to={r.href}
                  className="group flex h-full items-center justify-between rounded-card border border-brand-mist bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:border-brand-red/40 hover:shadow-card-hover"
                >
                  <span className="font-display text-[17px] font-semibold text-brand-ink">{r.name}</span>
                  <ArrowUpRight className="h-4 w-4 flex-none text-brand-red transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        eyebrow="Let's begin"
        title="Every transformation starts with an honest conversation."
        subtitle="Schedule a 30-minute call with a senior consultant. No sales pitch, just a working discussion about where you are and what it will take."
        primaryCta={{ label: "Schedule a Consultation", href: "/contact" }}
        secondaryCta={{ label: "Request a Proposal", href: "/contact" }}
      />
    </div>
  );
}
