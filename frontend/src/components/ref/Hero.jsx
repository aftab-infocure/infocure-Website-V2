import { ArrowRight } from "lucide-react";
import { Badge, Button } from "@/components/ref/ui";
import LazyVideo from "@/components/ref/LazyVideo";

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

export function Hero({
  eyebrow,
  headline,
  subhead,
  primaryCta,
  secondaryCta,
  image,
  imageAlt = "",
  variant = "executive",
  trustLine,
  visual,
  className,
  video,
  videoWebm,
  videoPoster,
  accent,
}) {
  if (variant === "split") {
    return (
      <section className={cx("relative bg-white", className)}>
        <div className="ic-container grid gap-12 px-6 pb-16 pt-32 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:pb-24 lg:pt-44">
          <div className="flex flex-col justify-center">
            {eyebrow ? <Badge tone="red" className="mb-6">{eyebrow}</Badge> : null}
            <h1 className="font-display text-[36px] font-bold leading-[1.05] tracking-[-0.5px] text-brand-ink lg:text-[54px]">
              {headline}
            </h1>
            {subhead ? (
              <p className="mt-6 max-w-xl font-body text-[17px] leading-relaxed text-brand-slate lg:text-[18px]">{subhead}</p>
            ) : null}
            {(primaryCta || secondaryCta) && (
              <div className="mt-8 flex flex-wrap gap-4">
                {primaryCta ? (
                  <Button href={primaryCta.href} size="lg" data-testid="hero-cta-primary">
                    {primaryCta.label}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : null}
                {secondaryCta ? (
                  <Button href={secondaryCta.href} variant="secondary" size="lg" data-testid="hero-cta-secondary">
                    {secondaryCta.label}
                  </Button>
                ) : null}
              </div>
            )}
            {trustLine ? (
              <p className="mt-8 font-body text-[13px] uppercase tracking-[0.14em] text-brand-slate">{trustLine}</p>
            ) : null}
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-card lg:aspect-auto lg:min-h-[520px]">
            <img src={image} alt={imageAlt} className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </div>
      </section>
    );
  }

  if (visual) {
    return (
      <section className={cx("relative isolate overflow-hidden bg-brand-ink", className)}>
        {video ? (
          <div aria-hidden="true" className="absolute inset-0">
            <LazyVideo
              src={video}
              webm={videoWebm}
              poster={videoPoster}
              className="h-full w-full object-cover opacity-30"
              testId="hero-inner-video"
            />
            <div className="absolute inset-0 bg-brand-ink/60" />
          </div>
        ) : null}
        <div className="ic-hero-grid-dark absolute inset-0" />
        <div className="pointer-events-none absolute -right-40 top-0 h-[480px] w-[480px] rounded-full bg-brand-red/10 blur-3xl" />
        {accent ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full blur-3xl opacity-[0.07]"
            style={{ backgroundColor: accent }}
          />
        ) : null}
        <div className="relative">
          <div className="ic-container grid items-center gap-12 px-6 pb-24 pt-36 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:pb-32 lg:pt-48">
            <div className="max-w-2xl">
              {eyebrow ? (
                <Badge tone="on-dark" className="mb-8 border border-white/15">{eyebrow}</Badge>
              ) : null}
              <h1 className="font-display text-[38px] font-bold leading-[1.05] tracking-[-0.5px] text-white lg:text-[60px]">
                {headline}
              </h1>
              {subhead ? (
                <p className="mt-6 font-body text-[17px] leading-relaxed text-white/80 lg:text-[18px]">{subhead}</p>
              ) : null}
              {(primaryCta || secondaryCta) && (
                <div className="mt-10 flex flex-wrap gap-4">
                  {primaryCta ? (
                    <Button href={primaryCta.href} size="lg" data-testid="hero-cta-primary">
                      {primaryCta.label}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  ) : null}
                  {secondaryCta ? (
                    <Button href={secondaryCta.href} variant="secondary-on-dark" size="lg" data-testid="hero-cta-secondary">
                      {secondaryCta.label}
                    </Button>
                  ) : null}
                </div>
              )}
              {trustLine ? (
                <p className="mt-12 font-body text-[13px] uppercase tracking-[0.14em] text-white/50">{trustLine}</p>
              ) : null}
            </div>
            <div className="hidden lg:block">{visual}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cx("relative isolate overflow-hidden bg-brand-ink", className)}>
      <div className="absolute inset-0">
        {video ? (
          <LazyVideo
            src={video}
            webm={videoWebm}
            poster={image}
            className="h-full w-full object-cover"
            testId="hero-inner-video"
          />
        ) : null}
        <img src={image} alt={imageAlt} className={cx("h-full w-full object-cover", video ? "absolute inset-0 opacity-30" : "opacity-55")} />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-ink via-brand-ink/85 to-brand-black/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/95 via-transparent to-transparent" />
      </div>
      <div className="relative">
        <div className="ic-container px-6 pb-24 pt-36 lg:px-10 lg:pb-36 lg:pt-52">
          <div className="max-w-3xl">
            {eyebrow ? (
              <Badge tone="on-dark" className="mb-8 border border-white/15">{eyebrow}</Badge>
            ) : null}
            <h1 className="font-display text-[38px] font-bold leading-[1.05] tracking-[-0.5px] text-white lg:text-[64px]">
              {headline}
            </h1>
            {subhead ? (
              <p className="mt-6 max-w-2xl font-body text-[17px] leading-relaxed text-white/80 lg:text-[19px]">{subhead}</p>
            ) : null}
            {(primaryCta || secondaryCta) && (
              <div className="mt-10 flex flex-wrap gap-4">
                {primaryCta ? (
                  <Button href={primaryCta.href} size="lg" data-testid="hero-cta-primary">
                    {primaryCta.label}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : null}
                {secondaryCta ? (
                  <Button href={secondaryCta.href} variant="secondary-on-dark" size="lg" data-testid="hero-cta-secondary">
                    {secondaryCta.label}
                  </Button>
                ) : null}
              </div>
            )}
            {trustLine ? (
              <p className="mt-12 max-w-xl font-body text-[13px] uppercase tracking-[0.14em] text-white/50">{trustLine}</p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
