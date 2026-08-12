import { useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion, animate } from "framer-motion";

export const EASE = [0.16, 1, 0.3, 1];

export function Reveal({ children, delay = 0, y = 32, className = "", as = "div" }) {
  const Comp = motion[as] || motion.div;
  const reduce = useReducedMotion();
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

export function MaskedLines({ lines, className = "", lineClassName = "", as: Tag = "h1" }) {
  const reduce = useReducedMotion();
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className={`block ${lineClassName}`}
            initial={reduce ? false : { y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.1, delay: 0.15 + i * 0.13, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function CountUp({ value, suffix = "", duration = 1.8, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!inView || !ref.current) return;
    if (reduce) {
      ref.current.textContent = `${value}${suffix}`;
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: EASE,
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix, duration, reduce]);
  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}

export function Marquee({ items, className = "", itemClassName = "" }) {
  const row = [...items, ...items];
  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <div className="marquee-track flex w-max items-center">
        {row.map((item, i) => (
          <span key={i} className={`flex items-center whitespace-nowrap ${itemClassName}`}>
            {item}
            <span className="mx-10 inline-block h-1.5 w-1.5 rounded-full bg-cure/70" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function SectionTag({ children, dark = false }) {
  return (
    <Reveal>
      <span
        className={`inline-flex items-center gap-2.5 rounded-full border px-4 py-1.5 font-mono2 text-[11px] uppercase tracking-[0.25em] ${
          dark ? "border-white/15 text-zinc-400" : "border-black/10 text-zinc-500"
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-cure" />
        {children}
      </span>
    </Reveal>
  );
}
