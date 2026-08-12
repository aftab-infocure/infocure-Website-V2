import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SEO from "@/components/site/SEO";
import { Reveal } from "@/components/ref/motion";
import { FeatureGrid, StatBand, CTABand } from "@/components/ref/sections";
import Hero from "@/components/ref/Hero";
import { getIndustry, INDUSTRIES } from "@/data/industries";
import { PRODUCTS } from "@/data/products";
import { SERVICES } from "@/data/services";

const nameFor = (href) => {
  const prod = PRODUCTS.find((p) => `/products/${p.slug}` === href);
  if (prod) return prod.name;
  const svc = SERVICES.find((s) => s.path === href);
  return svc ? svc.title : href;
};

export default function IndustryPage() {
  const { slug } = useParams();
  const industry = getIndustry(slug);
  if (!industry) return <Navigate to="/industries" replace />;

  const others = INDUSTRIES.filter((i) => i.slug !== slug).slice(0, 3);

  return (
    <div data-testid={`industry-page-${slug}`}>
      <SEO title={industry.seo.title} description={industry.seo.description} path={`/industries/${slug}`} />

      <Hero
        eyebrow={`Industry · ${industry.name}`}
        headline={industry.headline}
        subhead={industry.intro}
        primaryCta={{ label: "Talk to an industry expert", href: "/contact" }}
        secondaryCta={{ label: "Explore services", href: "/services/digital-transformation" }}
        trustLine="Sector practices built on hundreds of engagements"
        video="/media/cta-bg.mp4"
        videoWebm="/media/cta-bg.webm"
        image={industry.image}
      />

      <Reveal>
        <FeatureGrid
          eyebrow="The reality"
          title="Challenges we solve every day."
          subtitle="Sector-specific problems need sector-fluent teams. These are the ones we are called in for most."
          items={industry.challenges.map((c) => ({ title: c.title, description: c.desc }))}
          columns={2}
        />
      </Reveal>

      {/* Roadmap — dark */}
      <section className="bg-brand-ink text-white">
        <div className="ic-container px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr]">
            <Reveal>
              <div className="mb-4 font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-red">Transformation roadmap</div>
              <h2 className="font-display text-[30px] font-semibold leading-[1.15] text-white lg:text-[40px]">
                A sequenced path, not a leap of faith.
              </h2>
              <p className="mt-6 max-w-lg font-body text-[16px] leading-relaxed text-white/70">
                Each phase funds the next. Value is measured at every gate before further investment.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <span className="mr-1 font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-white/50">Stack</span>
                {industry.stack.map((t) => (
                  <span key={t} className="rounded-chip border border-white/15 bg-white/[0.06] px-4 py-1.5 font-body text-[13px] font-medium text-white/85">
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
            <ol className="grid gap-4">
              {industry.roadmap.map((r, i) => (
                <li key={r.title} className="grid grid-cols-[auto_1fr] gap-6 rounded-card border border-white/10 bg-white/[0.04] p-6 lg:p-7">
                  <Reveal delay={0.07 * i}>
                    <div className="grid grid-cols-[auto_1fr] gap-6">
                      <div className="font-mono text-[28px] font-semibold text-brand-red">{String(i + 1).padStart(2, "0")}</div>
                      <div>
                        <div className="font-display text-[20px] font-semibold text-white">{r.title}</div>
                        <div className="mt-2 font-body text-[15px] leading-relaxed text-white/70">{r.desc}</div>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <StatBand items={industry.outcomes.map((o) => ({ value: `${o.value}${o.suffix}`, label: o.label }))} />

      {/* Related */}
      <section className="bg-white">
        <div className="ic-container px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-14 lg:grid-cols-2">
            <div>
              <Reveal>
                <div className="mb-4 font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-red">Related products</div>
                <h2 className="ic-h2-split mb-8">Platforms for this industry.</h2>
              </Reveal>
              <div className="space-y-3">
                {industry.relatedProducts.map((href) => (
                  <Link key={href} to={href} className="group flex items-center justify-between rounded-card border border-brand-mist bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:border-brand-red/40 hover:shadow-card-hover">
                    <span className="font-display text-[17px] font-semibold text-brand-ink">{nameFor(href)}</span>
                    <ArrowUpRight className="h-4 w-4 text-brand-red transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <Reveal>
                <div className="mb-4 font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-red">Related services</div>
                <h2 className="ic-h2-split mb-8">Practices that deliver it.</h2>
              </Reveal>
              <div className="space-y-3">
                {industry.relatedServices.map((href) => (
                  <Link key={href} to={href} className="group flex items-center justify-between rounded-card border border-brand-mist bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:border-brand-red/40 hover:shadow-card-hover">
                    <span className="font-display text-[17px] font-semibold text-brand-ink">{nameFor(href)}</span>
                    <ArrowUpRight className="h-4 w-4 text-brand-red transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 border-t border-brand-mist pt-10">
            <div className="mb-5 font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-slate">More industries</div>
            <div className="flex flex-wrap gap-3">
              {others.map((o) => (
                <Link key={o.slug} to={`/industries/${o.slug}`} className="rounded-chip border border-brand-mist bg-white px-5 py-2.5 font-body text-[14px] font-medium text-brand-ink transition-colors hover:border-brand-red/40 hover:text-brand-red">
                  {o.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABand
        eyebrow="Let's begin"
        title={`Let's transform ${industry.name.toLowerCase()} operations — starting with yours.`}
        subtitle="Schedule a 30-minute call with a senior consultant who knows your sector."
        primaryCta={{ label: "Schedule a Consultation", href: "/contact" }}
        secondaryCta={{ label: "Request a Proposal", href: "/contact" }}
      />
    </div>
  );
}
