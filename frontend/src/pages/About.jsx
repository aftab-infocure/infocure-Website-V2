import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Target, Lightbulb, Heart, Building2, Users, Globe, ShieldCheck, ArrowUpRight } from "lucide-react";
import SEO from "@/components/site/SEO";
import { Reveal } from "@/components/ref/motion";
import { Badge } from "@/components/ref/ui";
import { StatBand, FeatureGrid, CTABand } from "@/components/ref/sections";

const LEADERSHIP = [
  { role: "Founder & Chief Executive", focus: "Sets the vision — technology that serves the business, never the other way around." },
  { role: "Delivery Leadership", focus: "Senior practice heads across SAP, Oracle, Salesforce and engineering — every account led by someone who has delivered it before." },
  { role: "Customer Success", focus: "A named, accountable executive on every engagement — benefits tracked to your P&L, not our project plan." },
];

const CAREERS_POINTS = [
  "Work on enterprise programmes across 12+ countries",
  "Certification-backed growth paths across SAP, Oracle, Salesforce and cloud",
  "Senior-mentored teams — you learn from people who have shipped at scale",
];

const TIMELINE = [
  { year: "2014", text: "Founded with a simple mission: make technology work for businesses, not the other way around." },
  { year: "2018", text: "Expanded globally — delivery presence across India, the GCC and beyond." },
  { year: "Today", text: "A trusted transformation partner across 12+ countries and a dozen industries." },
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

const IMPACT = [
  { value: "100+", label: "Trusted clients across sectors" },
  { value: "12+", label: "Countries served" },
  { value: "85%", label: "Client retention rate" },
  { value: "500+", label: "Certifications held by our consultants" },
];

export default function About() {
  const { hash, key } = useLocation();
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
        description="infocure technologies: a decade of enterprise delivery across SAP, Oracle, Salesforce, AI and custom engineering. 100+ clients, 12+ countries."
        path="/about"
      />

      {/* Hero — light */}
      <section className="ic-hero-grid relative isolate overflow-hidden bg-white">
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-brand-red/[0.06] blur-3xl" />
        <div className="ic-container relative px-6 pb-16 pt-32 lg:px-10 lg:pb-20 lg:pt-44">
          <Reveal>
            <Badge tone="red" className="mb-6">Established 2014</Badge>
            <h1 className="max-w-4xl font-display text-[36px] font-bold leading-[1.05] tracking-[-0.5px] text-brand-ink lg:text-[56px]">
              Innovation beyond digital transformation.
            </h1>
            <p className="mt-6 max-w-2xl font-body text-[17px] leading-relaxed text-brand-slate lg:text-[18px]">
              What began as a small team with bold ideas is now a trusted technology partner for
              organizations worldwide — guided by ethics, engineered for measurable impact.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Journey */}
      <section className="bg-brand-cloud border-y border-brand-mist">
        <div className="ic-container px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-24">
            <Reveal>
              <div className="mb-4 font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-red">Our journey</div>
              <h2 className="ic-h2">Built on the belief that technology should serve the business.</h2>
              <p className="mt-6 font-body text-[16px] leading-relaxed text-brand-slate lg:text-[17px]">
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

      <StatBand items={IMPACT} tone="dark" />

      <Reveal>
        <FeatureGrid
          eyebrow="Our difference"
          title="Why infocure."
          subtitle="We combine deep technical expertise with business acumen to deliver solutions that drive real transformation and results."
          items={WHY.map((w) => ({ title: w.title, description: w.description }))}
          columns={3}
        />
      </Reveal>

      {/* Mission / Vision / Values */}
      <section className="bg-brand-cloud border-t border-brand-mist">
        <div className="ic-container px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-4 lg:grid-cols-2">
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

      {/* Leadership */}
      <section id="leadership" data-testid="about-leadership" className="bg-white border-t border-brand-mist scroll-mt-[90px]">
        <div className="ic-container px-6 py-20 lg:px-10 lg:py-24">
          <Reveal>
            <div className="mb-4 font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-red">Leadership</div>
            <h2 className="ic-h2 mb-4">Senior-led, always.</h2>
            <p className="mb-12 max-w-2xl font-body text-[16px] leading-relaxed text-brand-slate">
              The people who scope your programme are the people accountable for delivering it.
            </p>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {LEADERSHIP.map((l, i) => (
              <Reveal key={l.role} delay={0.06 * i} className="h-full">
                <div className="flex h-full flex-col rounded-card border border-brand-mist bg-white p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
                  <h3 className="font-display text-[20px] font-semibold text-brand-ink">{l.role}</h3>
                  <p className="mt-3 font-body text-[15px] leading-relaxed text-brand-slate">{l.focus}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Careers */}
      <section id="careers" data-testid="about-careers" className="bg-brand-cloud border-t border-brand-mist scroll-mt-[90px]">
        <div className="ic-container px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20 items-center">
            <Reveal>
              <div className="mb-4 font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-red">Careers</div>
              <h2 className="ic-h2">Build your career on work that matters.</h2>
              <p className="mt-5 font-body text-[16px] leading-relaxed text-brand-slate">
                We hire consultants and engineers who want enterprise-scale problems, senior mentorship
                and clients who measure outcomes. If that sounds like you, we would like to talk.
              </p>
              <Link
                to="/contact"
                data-testid="careers-cta"
                className="mt-8 inline-flex items-center gap-2 rounded-button bg-[#D6182B] px-6 py-3 font-body text-[15px] font-semibold text-white hover:bg-[#B91424]"
              >
                Explore Opportunities
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="space-y-4">
                {CAREERS_POINTS.map((c, i) => (
                  <li key={c} className="flex items-start gap-4 rounded-card border border-brand-mist bg-white p-5 shadow-card">
                    <span className="font-mono text-[18px] font-semibold text-brand-red">{String(i + 1).padStart(2, "0")}</span>
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
