import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionTag } from "@/components/site/motion";

export default function CTASection({ title = "Let's build what your enterprise runs on next.", sub, accent = "#CC0000" }) {
  return (
    <section className="relative overflow-hidden bg-ink text-white noise" data-testid="cta-section">
      <div className="absolute inset-0 bg-grid-dark opacity-50" />
      <div
        className="absolute -bottom-56 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full blur-[140px]"
        style={{ background: `${accent}26` }}
      />
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 py-28 lg:py-40">
        <div className="max-w-3xl">
          <SectionTag dark>Next Step</SectionTag>
          <Reveal delay={0.05}>
            <h2 className="mt-8 font-display text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.02] tracking-tight text-balance">
              {title}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-zinc-400">
              {sub || "Tell us where your business is headed. We'll bring the architecture, engineering and delivery discipline to get you there."}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                data-testid="cta-primary-button"
                className="group inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-ink transition-transform duration-300 hover:scale-[1.03]"
              >
                Start a conversation
                <ArrowUpRight className="h-4.5 w-4.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <a
                href="tel:+919136180148"
                data-testid="cta-phone-link"
                className="inline-flex items-center gap-2.5 rounded-full border border-white/20 px-7 py-3.5 text-[15px] font-medium text-white transition-colors duration-300 hover:border-white/50"
              >
                +91 91361 80148
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
