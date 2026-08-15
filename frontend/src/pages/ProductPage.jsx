import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SEO from "@/components/site/SEO";
import { Reveal } from "@/components/ref/motion";
import { FeatureGrid, CTABand, FAQAccordion } from "@/components/ref/sections";
import Hero from "@/components/ref/Hero";
import SectionNav from "@/components/site/SectionNav";
import { SectionBlock } from "@/pages/FlagshipPage";
import {
  CrmVisual, OmsVisual, DmsVisual, HrmsVisual, PpcVisual,
  EximVisual, VtsVisual, EinvVisual, ThemedVisual,
} from "@/components/ref/visuals";
import { getProduct, PRODUCTS } from "@/data/products";

const PRODUCT_VISUALS = {
  crm: <CrmVisual />,
  oms: <OmsVisual />,
  dms: <DmsVisual />,
  hrms: <HrmsVisual />,
  ppc: <PpcVisual />,
  exim: <EximVisual />,
  "vehicle-tracking": <VtsVisual />,
  "e-invoicing": <EinvVisual />,
  erp: (
    <ThemedVisual
      center="ERP"
      caption="One enterprise backbone"
      nodes={[
        { label: "Finance" }, { label: "HR" }, { label: "Procure" },
        { label: "Produce" }, { label: "Sell" }, { label: "Report" },
      ]}
    />
  ),
};

export default function ProductPage() {
  const { slug } = useParams();
  const product = getProduct(slug);
  if (!product) return <Navigate to="/" replace />;

  const others = PRODUCTS.filter((x) => x.slug !== slug).slice(0, 3);

  return (
    <div data-testid={`product-page-${slug}`}>
      <SEO title={product.seo.title} description={product.seo.description} path={`/products/${slug}`} />

      <Hero
        eyebrow={product.fullName}
        headline={product.tagline}
        subhead={product.heroCopy}
        primaryCta={{ label: product.heroPrimary || "Request a demo", href: "/contact" }}
        secondaryCta={{ label: product.heroSecondary || "Talk to an expert", href: "/contact" }}
        trustLine="Production-grade · ERP-integrated · Deployed in weeks"
        visual={PRODUCT_VISUALS[slug]}
        image="/img-dashboard.webp"
        accent={product.accent}
      />

      {product.sections ? (
        <SectionNav
          items={[
            ...product.sections.map((s) => ({ id: s.id, label: s.label })),
            ...(product.faqs ? [{ id: "faq", label: "FAQs" }] : []),
          ]}
        />
      ) : null}

      {product.sections ? (
        product.sections.map((s, i) => <SectionBlock key={s.id} section={s} index={i} />)
      ) : (
        <Reveal>
          <FeatureGrid
            eyebrow="Modules"
            title={`Everything ${product.name} should do — and rarely does.`}
            subtitle="Depth where it matters, without the bloat that slows growing enterprises down."
            items={product.modules.map((m) => ({ title: m.title, description: m.desc }))}
            columns={3}
          />
        </Reveal>
      )}

      {/* Stack chips */}
      <section className="bg-brand-cloud border-y border-brand-mist">
        <div className="ic-container px-6 py-14 lg:px-10">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <span className="mr-2 font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-slate">Built on</span>
              {product.stack.map((t) => (
                <span key={t} className="rounded-chip border border-brand-mist bg-white px-4 py-1.5 font-body text-[13.5px] font-medium text-brand-ink">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {product.faqs ? (
        <div id="faq" className="scroll-mt-[132px]">
          <Reveal>
            <FAQAccordion title="Frequently asked questions" subtitle={product.faqSubtitle} items={product.faqs} />
          </Reveal>
        </div>
      ) : null}

      {/* Other products */}
      <section className="bg-white">
        <div className="ic-container px-6 py-20 lg:px-10 lg:py-24">
          <Reveal>
            <div className="mb-4 font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-red">Product suite</div>
            <h2 className="ic-h2 mb-10">Explore the suite.</h2>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {others.map((o, i) => (
              <Reveal key={o.slug} delay={0.06 * i} className="h-full">
                <Link
                  to={`/products/${o.slug}`}
                  data-testid={`related-product-${o.slug}`}
                  className="group flex h-full flex-col rounded-card border border-brand-mist bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:border-brand-red/40 hover:shadow-card-hover"
                >
                  <div className="font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-red">{o.fullName}</div>
                  <div className="mt-3 font-display text-[18px] font-semibold text-brand-ink">{o.name}</div>
                  <p className="mt-2 flex-1 font-body text-[14px] leading-relaxed text-brand-slate">{o.tagline}</p>
                  <div className="mt-4 inline-flex items-center gap-1.5 font-body text-[13.5px] font-semibold text-brand-red">
                    Learn more <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        eyebrow="See it live"
        title={product.cta?.title || `See what ${product.fullName} does for your operation.`}
        subtitle={product.cta?.subtitle || "A 30-minute working demo on your own scenarios — not a slideware walkthrough."}
        primaryCta={{ label: product.cta?.primaryLabel || "Request a Demo", href: "/contact" }}
        secondaryCta={{ label: product.cta?.secondaryLabel || "Talk to an Expert", href: "/contact" }}
      />
    </div>
  );
}
