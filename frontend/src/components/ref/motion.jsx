import { motion, useReducedMotion } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

export function Reveal({ children, className, delay = 0, y = 28 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Marquee({ items, className }) {
  const row = [...items, ...items];
  return (
    <div className={`ic-marquee relative overflow-hidden ${className ?? ""}`} aria-hidden="true">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-brand-cloud to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-brand-cloud to-transparent" />
      <div className="ic-marquee-track flex w-max items-center gap-10 py-5" aria-hidden="true">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="whitespace-nowrap font-display text-[15px] font-semibold uppercase tracking-[0.18em] text-brand-slate">
              {item}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-brand-red/70" />
          </span>
        ))}
      </div>
    </div>
  );
}
