import { useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Target, Lightbulb, Heart, Building2, Users, Globe, ShieldCheck, ArrowUpRight, ArrowDown } from "lucide-react";
import SEO from "@/components/site/SEO";
import { Reveal, EASE } from "@/components/ref/motion";
import { Badge } from "@/components/ref/ui";
import { CTABand } from "@/components/ref/sections";

const LEADERSHIP = [
  { role: "Founder & Chief Executive", focus: "Sets the vision — technology that serves the business, never the other way around." },
  { role: "Delivery Leadership", focus: "Senior practice heads across SAP, Oracle, Salesforce and engineering — every account led by someone who has delivered it before." },
  { role: "Customer Success", focus: "A named, accountable executive on every engagement — benefits tracked to your P&L, not our project plan." },
];

const CAREERS_POINTS = [
  "Work on enterprise programmes across India, the GCC and international markets",
  "Certification-backed growth paths across SAP, Oracle, Salesforce and cloud",
  "Senior-mentored teams — you learn from people who have shipped at scale",
];

const TIMELINE = [
  { year: "2014", text: "Founded with a simple mission: make technology work for businesses, not the other way around." },
  { year: "2018", text: "Expanded globally — delivery presence across India, the GCC and beyond." },
  { year: "Today", text: "A trusted transformation partner for growing businesses across regions and industries." },
];

const WHY = [
  { icon: Building2, title: "Proven track record", description: "A decade of delivering mission-critical technology solutions." },
  { icon: Target, title: "Comprehensive services", description: "From strategy and development to optimization and support." },
  { icon: Globe, title: "Global experience", description: "Successful engagements across multiple regions and industries." },
  { icon: Lightbulb, title: "Innovation-driven", description: "Business insight fused with emerging technology." },
  { icon: Users, title: "Client-centric", description: "Solutions tailored to your goals, not technology standards." },
  { icon: ShieldCheck, title: "Outcome obsessed", description: "Benefits measured on your P&L, not our project plan." },
];

const VALUES = [
  { title: "Excellence", desc: "We relentlessly pursue quality and exceed expectations in everything we do." },
  { title: "Integrity", desc: "We build trust through honesty, transparency and ethical practice." },
  { title: "Innovation", desc: "We challenge conventions to solve complex problems." },
  { title: "Collaboration", desc: "We succeed together by combining diverse strengths." },
];

const MARQUEE_ITEMS = [
  "Technology that serves the business",
  "Senior-led, always",
  "Outcomes on your P&L",
  "Ethics before expedience",
  "Built to compound",
];

/* Masked line-by-line reveal — the signature on-load moment */
function MaskedLine({ children, delay = 0, className = "" }) {
  const reduce = useReducedMotion();
  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block"
        initial={reduce ? false : { y: "112%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* Numbered manifesto chapter header */
function Chapter({ index, eyebrow, title, dark = false }) {
  return (
    <Reveal>
      <div className="flex items-start gap-5 lg:gap-8">
        <span
          aria-hidden="true"
          className="pt-2 font-mono2 text-[15px] font-semibold leading-none text-brand-red"
        >
          {index}
        </span>
        <div>
          <div className="mb-3 font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-red">
            {eyebrow}
          </div>
          <h2 className={dark
            ? "font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.3px] text-white lg:text-[40px]"
            : "ic-h2"
          }>
            {title}
          </h2>
        </div>
      </div>
    </Reveal>
  );
}

export default function About() {
  const { hash, key } = useLocation();
  const heroRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const fadeY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const fadeOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.15]);

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 320);
    }
  }, [hash, key]);

  return (
    <div data-testid="about-page">
      <SEO
        title="About Us — Enterprise IT Partner Since 2014"
        description="infocure technologies: a decade of enterprise delivery across SAP, Oracle, Salesforce, AI and custom engineering — senior-led, outcome-obsessed, trusted across regions."
        path="/about"
      />

      {/* Kinetic hero — dark, masked line reveal, parallax glow */}
      <section ref={heroRef} className="ic-hero-grid-dark relative isolate overflow-hidden bg-brand-ink">
        <motion.div
          aria-hidden="true"
          style={reduce ? undefined : { y: glowY }}
          className="pointer-events-none absolute -right-48 -top-48 h-[560px] w-[560px] rounded-full bg-brand-red/[0.14] blur-3xl"
        />
        <motion.div
          aria-hidden="true"
          style={reduce ? undefined : { y: glowY }}
          className="pointer-events-none absolute -left-40 bottom-0 h-[380px] w-[380px] rounded-full bg-brand-red/[0.07] blur-3xl"
        />
        <motion.div
          style={reduce ? undefined : { y: fadeY, opacity: fadeOpacity }}
          className="ic-container relative px-6 pb-24 pt-40 lg:px-10 lg:pb-32 lg:pt-56"
        >
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <Badge tone="red" className="mb-8">Established 2014</Badge>
          </motion.div>
          <h1 className="max-w-5xl font-display text-[40px] font-bold leading-[1.04] tracking-[-0.5px] text-white sm:text-[56px] lg:text-[76px]">
            <MaskedLine delay={0.1}>Innovation beyond</MaskedLine>
            <MaskedLine delay={0.22}>
              <span className="text-brand-red">digital transformation.</span>
            </MaskedLine>
          </h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
            className="mt-8 max-w-2xl font-body text-[17px] leading-relaxed text-white/70 lg:text-[18px]"
          >
            What began as a small team with bold ideas is now a trusted technology partner for
            organizations worldwide — guided by ethics, engineered for measurable impact.
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-14 flex items-center gap-3 font-mono2 text-[11px] uppercase tracking-[0.3em] text-white/40"
          >
            <ArrowDown className="h-4 w-4 animate-bounce text-brand-red" />
            The story, in five chapters
          </motion.div>
        </motion.div>
      </section>

      {/* Slow editorial marquee */}
      <div className="overflow-hidden border-b border-white/10 bg-brand-ink py-6" aria-hidden="true">
        <div className="ic-marquee relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-brand-ink to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-brand-ink to-transparent" />
          <div className="ic-marquee-track flex w-max items-center gap-12">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span key={i} className="flex items-center gap-12">
                <span className="whitespace-nowrap font-display text-[15px] font-semibold uppercase tracking-[0.18em] text-white/50">
                  {item}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-brand-red/80" />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Chapter 01 — Journey */}
      <section className="border-b border-brand-mist bg-brand-cloud">
        <div className="ic-container px-6 py-20 lg:px-10 lg:py-28">
          <Chapter index="01" eyebrow="Our journey" title="Built on the belief that technology should serve the business." />
          <div className="mt-12 grid gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-24">
            <Reveal delay={0.08}>
              <p className="font-body text-[16px] leading-relaxed text-brand-slate lg:text-[17px]">
                Our purpose has always been clear: help businesses navigate complex challenges,
                rethink operations, and build the agility to thrive in a fast-changing landscape.
                We've grown from a specialized consultancy into a comprehensive technology company
                spanning enterprise applications, custom development and emerging technologies.
              </p>
            </Reveal>
            <div className="relative pl-8">
              <div className="absolute left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-brand-red/60 via-brand-red/25 to-transparent" />
              {TIMELINE.map((t, i) => (
                <Reveal key={t.year} delay={0.1 * i}>
                  <div className="relative mb-10 last:mb-0">
                    <span className="absolute -left-8 top-1 h-[19px] w-[19px] rounded-full border-2 border-brand-red bg-white" />
                    <p className="font-display text-[22px] font-semibold text-brand-red">{t.year}</p>
                    <p className="mt-2 font-body text-[14.5px] leading-relaxed text-brand-slate">{t.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 02 — Why infocure */}
      <section className="bg-white">
        <div className="ic-container px-6 py-20 lg:px-10 lg:py-28">
          <Chapter index="02" eyebrow="Our difference" title="Why infocure." />
          <Reveal delay={0.06}>
            <p className="mt-5 max-w-2xl font-body text-[16px] leading-relaxed text-brand-slate lg:text-[17px]">
              We combine deep technical expertise with business acumen to deliver solutions that drive real transformation and results.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={0.05 * i} className="h-full">
                <div className="group flex h-full flex-col rounded-card border border-brand-mist bg-white p-7 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-brand-red/40 hover:shadow-card-hover">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-icon-box bg-brand-red/[0.08] transition-colors duration-200 group-hover:bg-brand-red">
                    <w.icon className="h-5 w-5 text-brand-red transition-colors duration-200 group-hover:text-white" />
                  </span>
                  <h3 className="mt-6 font-display text-[19px] font-semibold text-brand-ink">{w.title}</h3>
                  <p className="mt-3 font-body text-[14.5px] leading-relaxed text-brand-slate">{w.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Chapter 03 — Mission / Vision / Values */}
      <section className="border-t border-brand-mist bg-brand-cloud">
        <div className="ic-container px-6 py-20 lg:px-10 lg:py-28">
          <Chapter index="03" eyebrow="What we stand for" title="Mission, vision and the values that govern both." />
          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-card border border-brand-mist bg-white p-8 shadow-card lg:p-10">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-icon-box bg-brand-red/[0.08]">
                  <Target className="h-5 w-5 text-brand-red" />
                </span>
                <h3 className="mt-6 font-display text-[24px] font-semibold text-brand-ink">Our mission</h3>
                <p className="mt-4 font-display text-[19px] font-medium leading-[1.5] text-brand-ink">
                  "To redefine what's possible for businesses with technology that empowers,
                  simplifies, and inspires growth."
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-card border border-brand-mist bg-white p-8 shadow-card lg:p-10">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-icon-box bg-brand-tint">
                  <Lightbulb className="h-5 w-5 text-brand-ink" />
                </span>
                <h3 className="mt-6 font-display text-[24px] font-semibold text-brand-ink">Our vision</h3>
                <p className="mt-4 font-body text-[15.5px] leading-relaxed text-brand-slate">
                  To be the catalyst that empowers organizations worldwide to harness the full
                  potential of technology — creating agile, resilient and future-ready enterprises.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.05}>
            <div className="mt-4 rounded-card border border-brand-mist bg-white p-8 shadow-card lg:p-10">
              <div className="mb-8 flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-icon-box bg-brand-red/[0.08]">
                  <Heart className="h-5 w-5 text-brand-red" />
                </span>
                <h3 className="font-display text-[24px] font-semibold text-brand-ink">Core values</h3>
              </div>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {VALUES.map((v) => (
                  <div key={v.title}>
                    <p className="flex items-center gap-2.5 font-display text-[17px] font-semibold text-brand-ink">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
                      {v.title}
                    </p>
                    <p className="mt-2.5 font-body text-[14px] leading-relaxed text-brand-slate">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Chapter 04 — Leadership */}
      <section id="leadership" data-testid="about-leadership" className="scroll-mt-[90px] border-t border-brand-mist bg-white">
        <div className="ic-container px-6 py-20 lg:px-10 lg:py-28">
          <Chapter index="04" eyebrow="Leadership" title="Senior-led, always." />
          <Reveal delay={0.06}>
            <p className="mt-5 max-w-2xl font-body text-[16px] leading-relaxed text-brand-slate">
              The people who scope your programme are the people accountable for delivering it.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {LEADERSHIP.map((l, i) => (
              <Reveal key={l.role} delay={0.06 * i} className="h-full">
                <div className="flex h-full flex-col rounded-card border border-brand-mist bg-white p-7 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-brand-red/40 hover:shadow-card-hover">
                  <span className="font-mono2 text-[13px] font-semibold text-brand-red">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-4 font-display text-[20px] font-semibold text-brand-ink">{l.role}</h3>
                  <p className="mt-3 font-body text-[15px] leading-relaxed text-brand-slate">{l.focus}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Chapter 05 — Careers */}
      <section id="careers" data-testid="about-careers" className="scroll-mt-[90px] border-t border-brand-mist bg-brand-cloud">
        <div className="ic-container px-6 py-20 lg:px-10 lg:py-28">
          <Chapter index="05" eyebrow="Careers" title="Build your career on work that matters." />
          <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <Reveal>
              <p className="font-body text-[16px] leading-relaxed text-brand-slate">
                We hire consultants and engineers who want enterprise-scale problems, senior mentorship
                and clients who measure outcomes. If that sounds like you, we would like to talk.
              </p>
              <Link
                to="/contact"
                data-testid="careers-cta"
                className="mt-8 inline-flex items-center gap-2 rounded-button bg-[#D6182B] px-6 py-3 font-body text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-[#B91424]"
              >
                Explore Opportunities
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="space-y-4">
                {CAREERS_POINTS.map((c, i) => (
                  <li key={c} className="flex items-start gap-4 rounded-card border border-brand-mist bg-white p-5 shadow-card">
                    <span className="font-mono2 text-[18px] font-semibold text-brand-red">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-body text-[15px] leading-relaxed text-brand-ink">{c}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <CTABand
        eyebrow="Work with us"
        title="Meet the team behind a decade of delivery."
        subtitle="Talk to a senior consultant about where your business is headed — and what it will take to get there."
        primaryCta={{ label: "Partner With Us", href: "/contact" }}
        secondaryCta={{ label: "Explore Services", href: "/services/digital-transformation" }}
      />
    </div>
  );
}
