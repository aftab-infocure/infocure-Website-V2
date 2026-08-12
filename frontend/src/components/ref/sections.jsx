import * as React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Quote, Plus, Minus, Compass, Database, Server, LayoutGrid, Users, Cpu, Workflow, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ref/ui";
import LazyVideo from "@/components/ref/LazyVideo";

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

/* TrustStrip */
const TRUST_CAPS = [
  { icon: Compass, label: "Digital Transformation" },
  { icon: Database, label: "SAP Consulting" },
  { icon: Server, label: "Oracle Solutions" },
  { icon: LayoutGrid, label: "Business Applications" },
  { icon: Users, label: "Resource Augmentation" },
  { icon: Cpu, label: "AI & Cloud" },
  { icon: Workflow, label: "Enterprise Integration" },
  { icon: BadgeCheck, label: "Certified Consultants" },
];

export function TrustStrip() {
  return (
    <section data-testid="trust-strip" className="border-y border-brand-mist bg-white">
      <div className="ic-container px-6 py-12 lg:px-10 lg:py-14">
        <div className="mb-8 text-center font-body text-[12px] font-semibold uppercase tracking-[0.2em] text-brand-slate">
          Core capabilities, under one roof
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
          {TRUST_CAPS.map(({ icon: Icon, label }) => (
            <div key={label} className="group flex items-center gap-3.5">
              <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-[10px] bg-brand-red/[0.08] text-brand-red transition-colors duration-200 group-hover:bg-brand-red group-hover:text-white">
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
              </span>
              <span className="font-body text-[13.5px] font-semibold leading-snug text-brand-ink">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* StatBand */
export function StatBand({ items, tone = "light" }) {
  const isDark = tone === "dark";
  return (
    <section className={isDark ? "bg-brand-ink text-white" : "bg-brand-cloud text-brand-ink"}>
      <div className="ic-container px-6 py-14 lg:px-10 lg:py-16">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-10">
          {items.map((s) => (
            <div key={s.label} className="border-l border-brand-mist/60 pl-5 md:border-l-2">
              <div className="ic-stat-lg text-brand-red">{s.value}</div>
              <div className={cx("mt-3 font-body text-[13px] leading-snug", isDark ? "text-white/70" : "text-brand-slate")}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* FeatureGrid */
export function FeatureGrid({ eyebrow, title, subtitle, items, columns = 3, dark = false }) {
  const colClass = columns === 2 ? "md:grid-cols-2" : columns === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-2 lg:grid-cols-3";
  return (
    <section className={dark ? "bg-brand-ink text-white" : "bg-white"}>
      <div className="ic-container px-6 py-20 lg:px-10 lg:py-24">
        <div className="max-w-3xl">
          {eyebrow ? (
            <div className="mb-4 font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-red">{eyebrow}</div>
          ) : null}
          <h2 className={dark ? "font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.3px] text-white lg:text-[40px]" : "ic-h2"}>{title}</h2>
          {subtitle ? (
            <p className={cx("mt-4 max-w-2xl font-body text-[16px] leading-relaxed lg:text-[17px]", dark ? "text-white/70" : "text-brand-slate")}>{subtitle}</p>
          ) : null}
        </div>
        <div className={`mt-12 grid gap-6 ${colClass} lg:gap-8`}>
          {items.map((f) => {
            const inner = (
              <div className={cx(
                "flex h-full flex-col rounded-card border p-7 transition-all duration-200 hover:-translate-y-1 lg:p-8",
                dark
                  ? "border-white/10 bg-white/[0.04] hover:border-brand-red/50"
                  : "border-brand-mist bg-white shadow-card hover:border-brand-red/40 hover:shadow-card-hover"
              )}>
                {f.kicker ? (
                  <div className="font-body text-[11.5px] font-semibold uppercase tracking-[0.16em] text-brand-red">{f.kicker}</div>
                ) : null}
                <h3 className={cx("mt-3 font-display text-[20px] font-semibold lg:text-[22px]", dark ? "text-white" : "text-brand-ink")}>{f.title}</h3>
                <p className={cx("mt-3 font-body text-[15px] leading-relaxed", dark ? "text-white/65" : "text-brand-slate")}>{f.description}</p>
                {f.outcomes && f.outcomes.length > 0 ? (
                  <ul className={cx("mt-5 space-y-2 border-t pt-5", dark ? "border-white/10" : "border-brand-mist")}>
                    {f.outcomes.map((o) => (
                      <li key={o} className={cx("flex items-start gap-2 font-body text-[14px]", dark ? "text-white/85" : "text-brand-ink")}>
                        <span className="mt-2 inline-block h-1.5 w-1.5 flex-none rounded-full bg-brand-red" />
                        {o}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {f.href ? (
                  <div className="mt-6 inline-flex items-center gap-2 font-body text-[14px] font-semibold text-brand-red">
                    Explore <ArrowUpRight className="h-4 w-4" />
                  </div>
                ) : null}
              </div>
            );
            return f.href ? (
              <Link key={f.title} to={f.href} className="block h-full" data-testid={`feature-${f.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                {inner}
              </Link>
            ) : (
              <div key={f.title}>{inner}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* Testimonial */
export function Testimonial({ items }) {
  return (
    <section className="bg-brand-cloud">
      <div className="ic-container px-6 py-20 lg:px-10 lg:py-24">
        <div className="grid gap-8 md:grid-cols-2">
          {items.map((t) => (
            <figure key={t.name + t.company} className="rounded-card border border-brand-mist bg-white p-8 shadow-card lg:p-10">
              <Quote className="h-8 w-8 text-brand-red" />
              <blockquote className="mt-6 font-display text-[20px] font-medium leading-[1.4] text-brand-ink lg:text-[22px]">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-8 border-t border-brand-mist pt-6">
                <div className="font-body text-[15px] font-semibold text-brand-ink">{t.name}</div>
                <div className="mt-1 font-body text-[13px] text-brand-slate">{t.company}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* CTABand */
export function CTABand({ eyebrow, title, subtitle, primaryCta, secondaryCta, backgroundImage, backgroundVideo, backgroundVideoWebm }) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-ink text-white" data-testid="cta-band">
      {backgroundVideo ? (
        <div className="absolute inset-0">
          <LazyVideo
            src={backgroundVideo}
            webm={backgroundVideoWebm}
            poster={backgroundImage}
            className="h-full w-full object-cover"
            testId="cta-band-video"
          />
          <div className="absolute inset-0 bg-brand-ink/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-ink/70 to-brand-ink/30" />
        </div>
      ) : backgroundImage ? (
        <div className="absolute inset-0">
          <img src={backgroundImage} alt="" className="h-full w-full object-cover opacity-25" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-ink/85 to-brand-ink/40" />
        </div>
      ) : null}
      <div className="relative ic-container px-6 py-20 lg:px-10 lg:py-24">
        <div className="max-w-3xl">
          {eyebrow ? (
            <div className="mb-4 font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-red">{eyebrow}</div>
          ) : null}
          <h2 className="font-display text-[30px] font-semibold leading-[1.15] text-white lg:text-[42px]">{title}</h2>
          {subtitle ? (
            <p className="mt-5 max-w-2xl font-body text-[16px] leading-relaxed text-white/75 lg:text-[18px]">{subtitle}</p>
          ) : null}
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={primaryCta.href} size="lg" data-testid="cta-band-primary">
              {primaryCta.label}
              <ArrowRight className="h-4 w-4" />
            </Button>
            {secondaryCta ? (
              <Button href={secondaryCta.href} variant="secondary-on-dark" size="lg" data-testid="cta-band-secondary">
                {secondaryCta.label}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

/* FAQAccordion */
export function FAQAccordion({ items, title, subtitle }) {
  const [open, setOpen] = React.useState(0);
  return (
    <section className="bg-white">
      <div className="ic-container px-6 py-20 lg:px-10 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            {title ? <h2 className="ic-h2">{title}</h2> : null}
            {subtitle ? <p className="mt-4 max-w-md font-body text-[16px] leading-relaxed text-brand-slate">{subtitle}</p> : null}
          </div>
          <div className="divide-y divide-brand-mist border-y border-brand-mist">
            {items.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    data-testid={`faq-item-${i}`}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-display text-[18px] font-semibold text-brand-ink lg:text-[20px]">{item.q}</span>
                    <span className={cx(
                      "inline-flex h-9 w-9 flex-none items-center justify-center rounded-full border",
                      isOpen ? "border-brand-red bg-brand-red text-white" : "border-brand-mist text-brand-ink"
                    )}>
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                  <div className={cx(
                    "grid overflow-hidden font-body text-[15.5px] leading-relaxed text-brand-slate transition-all duration-300",
                    isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"
                  )}>
                    <div className="min-h-0">{item.a}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
