import { useEffect, useState } from "react";

export default function SectionNav({ items }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-25% 0px -65% 0px" }
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [items]);

  const go = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav data-testid="section-nav" aria-label="On this page" className="sticky top-[71px] z-40 border-b border-brand-mist bg-white/90 backdrop-blur-xl">
      <div className="ic-container flex gap-1 overflow-x-auto px-6 py-3 lg:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((i) => (
          <button
            key={i.id}
            data-testid={`section-nav-${i.id}`}
            onClick={() => go(i.id)}
            className={`whitespace-nowrap rounded-full px-4 py-2 font-body text-[13px] font-medium transition-colors duration-200 ${
              active === i.id ? "bg-brand-ink text-white" : "text-brand-slate hover:bg-brand-cloud hover:text-brand-ink"
            }`}
          >
            {i.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
