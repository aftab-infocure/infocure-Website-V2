import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SEO from "@/components/site/SEO";
import Hero from "@/components/ref/Hero";
import SectionNav from "@/components/site/SectionNav";
import { Reveal } from "@/components/ref/motion";
import { StatBand, FAQAccordion, CTABand } from "@/components/ref/sections";

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

function SectionBlock({ section, index }) {
  const dark = section.kind === "dark";
  const bg = dark ? "bg-brand-ink text-white" : index % 2 === 0 ? "bg-white" : "bg-brand-cloud";
  return (
    <section id={section.id} data-testid={`section-${section.id}`} className={cx(bg, "scroll-mt-[132px]")}>
      <div className="ic-container px-6 py-16 lg:px-10 lg:py-20">
        <div className="max-w-3xl">
          <Reveal>
            {section.eyebrow ? (
              <div className="mb-4 font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-red">{section.eyebrow}</div>
            ) : null}
            <h2 className={dark ? "font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.3px] text-white lg:text-[38px]" : "ic-h2"}>
              {section.title}
            </h2>
            {section.desc ? (
              <p className={cx("mt-4 max-w-2xl font-body text-[16px] leading-relaxed lg:text-[17px]", dark ? "text-white/70" : "text-brand-slate")}>
                {section.desc}
              </p>
            ) : null}
          </Reveal>
        </div>

        {section.kind === "chips" ? (
          <div className="mt-10 flex flex-wrap gap-3">
            {section.items.map((it, i) => (
              <Reveal key={it.title || it} delay={0.03 * i}>
                <span
                  data-testid={`chip-${section.id}-${i}`}
                  className="inline-flex items-center rounded-chip border border-brand-mist bg-white px-5 py-2.5 font-body text-[14.5px] font-semibold text-brand-ink shadow-card"
                >
                  {it.title || it}
                </span>
              </Reveal>
            ))}
          </div>
        ) : null}

        {section.kind === "steps" ? (
          <ol className="mt-10 grid gap-4 md:grid-cols-2">
            {section.items.map((s, i) => (
              <li key={s.title} className="rounded-card border border-brand-mist bg-white p-6 shadow-card lg:p-7">
                <Reveal delay={0.06 * i}>
                  <div className="grid grid-cols-[auto_1fr] gap-5">
                    <div className="font-mono text-[26px] font-semibold text-brand-red">{String(i + 1).padStart(2, "0")}</div>
                    <div>
                      <div className="font-display text-[19px] font-semibold text-brand-ink">{s.title}</div>
                      <div className="mt-2 font-body text-[14.5px] leading-relaxed text-brand-slate">{s.desc}</div>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        ) : null}

        {section.kind === "timeline" ? (
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 xl:gap-5">
            {section.items.map((s, i) => (
              <li key={s.title}>
                <Reveal delay={0.05 * i}>
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-red font-mono text-[13px] font-semibold text-white">
                      {i + 1}
                    </span>
                    {i < section.items.length - 1 ? <span className="hidden h-px flex-1 bg-brand-mist xl:block" /> : null}
                  </div>
                  <div className="mt-4 font-display text-[16px] font-semibold text-brand-ink">{s.title}</div>
                  <p className="mt-2 font-body text-[13.5px] leading-relaxed text-brand-slate">{s.desc}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        ) : null}

        {section.kind === "cards" || section.kind === "dark" ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {section.items.map((f, i) => (
              <Reveal key={f.title} delay={0.05 * i} className="h-full">
                <div
                  className={cx(
                    "flex h-full flex-col rounded-card border p-6 transition-all duration-200 hover:-translate-y-1 lg:p-7",
                    dark
                      ? "border-white/10 bg-white/[0.04] hover:border-brand-red/50"
                      : "border-brand-mist bg-white shadow-card hover:border-brand-red/40 hover:shadow-card-hover"
                  )}
                >
                  <h3 className={cx("font-display text-[19px] font-semibold", dark ? "text-white" : "text-brand-ink")}>{f.title}</h3>
                  {f.desc ? (
                    <p className={cx("mt-3 font-body text-[14.5px] leading-relaxed", dark ? "text-white/65" : "text-brand-slate")}>{f.desc}</p>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default function FlagshipPage({ config }) {
  const { hash, key } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 320);
    }
  }, [hash, key]);

  const navItems = [
    ...config.sections.map((s) => ({ id: s.id, label: s.label })),
    ...(config.faqs ? [{ id: "faq", label: "FAQs" }] : []),
  ];

  return (
    <div data-testid={config.testId}>
      <SEO title={config.seo.title} description={config.seo.description} path={config.path} jsonLd={config.seo.jsonLd} />

      <Hero
        eyebrow={config.hero.eyebrow}
        headline={config.hero.headline}
        subhead={config.hero.subhead}
        primaryCta={{ label: config.hero.primaryLabel || "Talk to an Expert", href: "/contact" }}
        secondaryCta={{ label: config.hero.secondaryLabel || "Request a Proposal", href: "/contact" }}
        trustLine={config.hero.trustLine}
        image={config.hero.image}
        video={config.hero.video}
        videoWebm={config.hero.videoWebm}
      />

      <SectionNav items={navItems} />

      {config.stats ? <StatBand items={config.stats} /> : null}

      {config.sections.map((s, i) => (
        <SectionBlock key={s.id} section={s} index={i} />
      ))}

      {config.faqs ? (
        <div id="faq" className="scroll-mt-[132px]">
          <Reveal>
            <FAQAccordion title="Frequently asked questions" subtitle={config.faqSubtitle} items={config.faqs} />
          </Reveal>
        </div>
      ) : null}

      <CTABand
        eyebrow="Let's begin"
        title={config.cta.title}
        subtitle={config.cta.subtitle}
        primaryCta={{ label: config.cta.primaryLabel || "Talk to an Expert", href: "/contact" }}
        secondaryCta={{ label: config.cta.secondaryLabel || "Request a Proposal", href: "/contact" }}
      />
    </div>
  );
}
