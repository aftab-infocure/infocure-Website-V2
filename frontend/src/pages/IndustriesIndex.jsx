import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SEO from "@/components/site/SEO";
import { Reveal } from "@/components/ref/motion";
import { Badge } from "@/components/ref/ui";
import { CTABand } from "@/components/ref/sections";
import { INDUSTRIES } from "@/data/industries";

export default function IndustriesIndex() {
  return (
    <div data-testid="industries-page">
      <SEO
        title="Industries We Serve"
        description="Digital transformation across manufacturing, automotive, healthcare, financial services, retail and logistics."
        path="/industries"
      />

      <section className="ic-hero-grid relative isolate overflow-hidden bg-white">
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-brand-red/[0.06] blur-3xl" />
        <div className="ic-container relative px-6 pb-16 pt-32 lg:px-10 lg:pb-20 lg:pt-44">
          <Reveal>
            <Badge tone="red" className="mb-6">Industries</Badge>
            <h1 className="max-w-3xl font-display text-[36px] font-bold leading-[1.05] tracking-[-0.5px] text-brand-ink lg:text-[56px]">
              Deep in the industries that build and move the world.
            </h1>
            <p className="mt-6 max-w-2xl font-body text-[17px] leading-relaxed text-brand-slate lg:text-[18px]">
              Generic consulting fails in specific industries. Our practices are built on hundreds
              of engagements inside the operations we transform.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white">
        <div className="ic-container px-6 pb-24 lg:px-10">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((ind, i) => (
              <Reveal key={ind.slug} delay={0.06 * i}>
                <Link
                  to={`/industries/${ind.slug}`}
                  data-testid={`industry-tile-${ind.slug}`}
                  className="group relative block h-72 overflow-hidden rounded-card"
                >
                  <img
                    src={ind.image}
                    alt={ind.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/50 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="font-display text-[22px] font-semibold text-white">{ind.name}</div>
                    <div className="mt-1 font-body text-[13.5px] text-white/75">{ind.headline}</div>
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

      <CTABand
        eyebrow="Let's begin"
        title="Your industry. Our discipline. One conversation."
        subtitle="Schedule a 30-minute call with a senior consultant from your sector practice."
        primaryCta={{ label: "Schedule a Consultation", href: "/contact" }}
        secondaryCta={{ label: "Request a Proposal", href: "/contact" }}
      />
    </div>
  );
}
