import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ref/ui";
import LazyVideo from "@/components/ref/LazyVideo";

const NODES = [
  { label: "SAP S/4HANA", color: "#0A6ED1" },
  { label: "Oracle", color: "#C74634" },
  { label: "Business Apps", color: "#FF2A40" },
  { label: "Cloud", color: "#0EA5E9" },
  { label: "AI & Data", color: "#7C3AED" },
  { label: "Integration", color: "#0D9488" },
  { label: "Talent", color: "#E0A425" },
].map((n, i) => {
  const angle = (-90 + i * (360 / 7)) * (Math.PI / 180);
  return { ...n, x: 280 + 205 * Math.cos(angle), y: 280 + 205 * Math.sin(angle) };
});

const HEADLINE_LINES = [
  { text: "Digital Transformation", accent: false },
  { text: "Partner for", accent: false },
  { text: "Growing Businesses", accent: true },
];

const EASE = [0.22, 1, 0.36, 1];

export function HomeHero() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [4.5, -4.5]), { stiffness: 110, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-4.5, 4.5]), { stiffness: 110, damping: 18 });

  function onMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  return (
    <section
      data-testid="home-hero"
      onMouseMove={onMove}
      className="relative isolate overflow-hidden bg-brand-ink"
    >
      <div aria-hidden="true" className="absolute inset-0">
        <LazyVideo
          src="/media/hero-bg.mp4"
          webm="/media/hero-bg.webm"
          poster="/media/hero-bg.jpg"
          className="h-full w-full object-cover"
          testId="hero-bg-video"
          defer
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/40" />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-brand-red/[0.12] blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-52 -left-40 h-[520px] w-[520px] rounded-full bg-brand-red/[0.08] blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/90 to-transparent" />

      <div className="ic-container relative grid items-center gap-16 px-6 pb-20 pt-32 lg:grid-cols-[1.04fr_0.96fr] lg:gap-10 lg:px-10 lg:pb-28 lg:pt-40">
        <div>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2.5 rounded-chip border border-white/20 bg-white/10 px-3.5 py-1.5 shadow-card backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-red" />
            </span>
            <span className="font-body text-[12px] font-semibold uppercase tracking-[0.16em] text-white/85">
              SAP · Oracle · Business Apps · AI · Cloud
            </span>
          </motion.div>

          <h1 className="mt-8 font-display text-[40px] font-bold leading-[1.04] tracking-[-0.8px] text-white sm:text-[48px] lg:text-[60px]">
            {HEADLINE_LINES.map((line, i) => (
              <span key={line.text} className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
                <motion.span
                  className={`block ${line.accent ? "text-brand-red" : ""}`}
                  initial={reduce ? false : { y: "115%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.95, delay: 0.12 + i * 0.14, ease: EASE }}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease: EASE }}
            className="mt-7 max-w-xl font-body text-[16.5px] leading-relaxed text-white/80 lg:text-[18px]"
          >
            We help growing businesses modernise the way they run. Our certified consultants plan,
            build and support SAP, Oracle and business applications, with AI, cloud and enterprise
            integration, across India, the Middle East and global markets.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <Button href="/contact" size="lg" data-testid="hero-cta-consultation">
              Schedule a Consultation
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/services/digital-transformation" variant="secondary-on-dark" size="lg" data-testid="hero-cta-solutions">
              Explore Our Solutions
            </Button>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-white/15 pt-7"
          >
            {[
              "Senior-led delivery, start to finish",
              "Trusted across manufacturing, automotive & distribution",
              "India · GCC · Europe · International",
            ].map((s) => (
              <div key={s} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 flex-none rounded-full bg-brand-red" />
                <span className="font-body text-[12.5px] font-medium leading-snug text-white/65">{s}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="[perspective:1200px]">
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: EASE }}
            style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative mx-auto max-w-[560px] will-change-transform"
            data-testid="hero-constellation"
          >
            <ConstellationSvg />
            <p className="mt-2 text-center font-body text-[12.5px] uppercase tracking-[0.16em] text-white/60">
              One accountable partner, every system connected
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ConstellationSvg() {
  return (
    <svg viewBox="0 0 560 560" className="h-auto w-full" role="img" aria-label="Enterprise systems connected around your business: SAP, Oracle, business applications, cloud, AI, integration and talent" fontFamily="var(--font-ibm-plex-sans), Helvetica, Arial, sans-serif">
      <g className="ic-orbit">
        <circle cx="280" cy="280" r="205" fill="none" stroke="#E2E6EC" strokeWidth="1" strokeDasharray="2 7" />
        <circle cx="280" cy="75" r="4" fill="#FF2A40" opacity="0.8" />
      </g>
      <g className="ic-orbit-rev">
        <circle cx="280" cy="280" r="140" fill="none" stroke="#E2E6EC" strokeWidth="1" strokeDasharray="2 6" />
        <circle cx="420" cy="280" r="3" fill="#1A1F2B" opacity="0.25" />
      </g>

      {["M60 58v14M53 65h14", "M498 78v14M491 85h14", "M64 498v14M57 505h14", "M496 486v14M489 493h14"].map((d) => (
        <path key={d} d={d} stroke="#D9DEE6" strokeWidth="1.5" strokeLinecap="round" />
      ))}

      {NODES.map((n, i) => (
        <line key={`line-${n.label}`} x1="280" y1="280" x2={n.x} y2={n.y} stroke="#D9DEE6" strokeWidth="1.2" pathLength={100} className="ic-line" style={{ animationDelay: `${0.55 + i * 0.1}s` }} />
      ))}

      {NODES.map((n, i) => {
        const dur = `${4.2 + (i % 3) * 0.9}s`;
        const begin = `${1.7 + i * 0.55}s`;
        return (
          <circle key={`pulse-${n.label}`} r="3.5" fill="#FF2A40" opacity="0">
            <animateMotion dur={dur} begin={begin} repeatCount="indefinite" path={`M 280 280 L ${n.x} ${n.y}`} />
            <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.14;0.82;1" dur={dur} begin={begin} repeatCount="indefinite" />
          </circle>
        );
      })}

      <defs>
        <clipPath id="ic-center-logo-clip">
          <rect x="46" y="16" width="40" height="40" rx="10" />
        </clipPath>
      </defs>

      <g className="ic-node-pop" style={{ animationDelay: "0.45s" }}>
        <g transform="translate(214 226)" style={{ filter: "drop-shadow(0 14px 28px rgba(26,31,43,0.12))" }}>
          <rect width="132" height="108" rx="16" fill="#FFFFFF" stroke="#E2E6EC" />
          <image href="/brand/logo-mark.png" x="46" y="16" width="40" height="40" clipPath="url(#ic-center-logo-clip)" />
          <text x="66" y="74" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1A1F2B">Your Business</text>
          <text x="66" y="90" textAnchor="middle" fontSize="9.5" fill="#4A5568">at the centre</text>
        </g>
      </g>

      {NODES.map((n, i) => (
        <g key={`node-${n.label}`} className="ic-node-pop" style={{ animationDelay: `${0.85 + i * 0.12}s` }}>
          <g className="ic-node-float" style={{ animationDelay: `${i * 0.85}s`, animationDuration: `${6 + (i % 3)}s` }}>
            <g transform={`translate(${n.x - 62} ${n.y - 19})`} style={{ filter: "drop-shadow(0 6px 14px rgba(26,31,43,0.10))" }}>
              <rect width="124" height="38" rx="19" fill="#FFFFFF" stroke="#E2E6EC" />
              <circle cx="18" cy="19" r="4" fill={n.color} />
              <text x="30" y="19.5" dominantBaseline="central" fontSize="11.5" fontWeight="600" fill="#1A1F2B">{n.label}</text>
            </g>
          </g>
        </g>
      ))}
    </svg>
  );
}

export default HomeHero;
