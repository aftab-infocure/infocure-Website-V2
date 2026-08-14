import SEO from "@/components/site/SEO";
import Hero from "@/components/ref/Hero";
import { Reveal } from "@/components/ref/motion";
import { CTABand } from "@/components/ref/sections";
import { FileText, BookOpen, ListChecks, BookMarked, FileDown, BarChart3, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const RESOURCES = [
  {
    icon: FileText,
    title: "Whitepapers",
    desc: "In-depth perspectives on enterprise transformation, ERP modernization and business technology strategy.",
    status: "Available on request",
  },
  {
    icon: BookOpen,
    title: "Guides",
    desc: "Practical guides for leaders planning S/4HANA migration, cloud adoption and enterprise application programmes.",
    status: "Available on request",
  },
  {
    icon: ListChecks,
    title: "Checklists",
    desc: "Readiness checklists for ERP programmes, e-invoicing adoption, dealer digitization and transformation planning.",
    status: "Available on request",
  },
  {
    icon: BookMarked,
    title: "Brochures",
    desc: "Service and product overviews for the Infocure consulting portfolio and business application suite.",
    status: "Available on request",
  },
  {
    icon: FileDown,
    title: "eBooks & PDFs",
    desc: "Downloadable long-form content for executive teams evaluating technology investments.",
    status: "Available on request",
  },
  {
    icon: BarChart3,
    title: "Industry Reports",
    desc: "Sector-level analysis across manufacturing, automotive, distribution and logistics technology adoption.",
    status: "Coming soon",
  },
];

export default function Resources() {
  return (
    <div data-testid="resources-page">
      <SEO
        title="Resources | Whitepapers, Guides & Checklists | Infocure"
        description="Executive resources from Infocure — whitepapers, guides, checklists, brochures, eBooks and industry reports on enterprise technology and digital transformation."
        path="/insights/resources"
      />

      <Hero
        eyebrow="Insights · Resources"
        headline="Resources for Technology Decision-Makers"
        subhead="Whitepapers, guides, checklists and executive briefings from Infocure's consulting and product practices — practical material for leaders planning enterprise technology investments."
        primaryCta={{ label: "Request a Resource", href: "/contact" }}
        secondaryCta={{ label: "Talk to an Expert", href: "/contact" }}
        trustLine="Written by practitioners, not marketers"
        video="/media/method-bg.mp4"
        videoWebm="/media/method-bg.webm"
        image="/img-digital-transformation.webp"
      />

      <section className="bg-white">
        <div className="ic-container px-6 py-16 lg:px-10 lg:py-20">
          <Reveal>
            <div className="mb-4 font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-red">Resource Library</div>
            <h2 className="ic-h2 mb-4">Premium, Practical, Practitioner-Written</h2>
            <p className="mb-12 max-w-2xl font-body text-[16px] leading-relaxed text-brand-slate">
              Every resource is produced by the consultants and architects who deliver our engagements.
              Request any title and a senior consultant will share it with you directly.
            </p>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {RESOURCES.map((r, i) => (
              <Reveal key={r.title} delay={0.05 * i} className="h-full">
                <Link
                  to="/contact"
                  data-testid={`resource-${r.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  className="group flex h-full flex-col rounded-card border border-brand-mist bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-brand-red/40 hover:shadow-card-hover lg:p-7"
                >
                  <div className="flex items-center justify-between">
                    <r.icon className="h-6 w-6 text-brand-red" />
                    <span className="rounded-full bg-brand-cloud px-3 py-1 font-body text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-slate">
                      {r.status}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-[19px] font-semibold text-brand-ink">{r.title}</h3>
                  <p className="mt-3 font-body text-[14.5px] leading-relaxed text-brand-slate">{r.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 font-body text-[13.5px] font-semibold text-brand-ink">
                    Request access
                    <ArrowUpRight className="h-3.5 w-3.5 text-brand-red transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        eyebrow="Insights · Resources"
        title="Looking for a specific topic?"
        subtitle="Tell us what you're evaluating and a senior consultant will share the most relevant material — or walk you through it on a call."
        primaryCta={{ label: "Request a Resource", href: "/contact" }}
        secondaryCta={{ label: "Talk to an Expert", href: "/contact" }}
      />
    </div>
  );
}
