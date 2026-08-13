import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Globe, Menu, X, Check } from "lucide-react";
import { NAV_SERVICES, NAV_PRODUCTS, NAV_INDUSTRIES, NAV_INSIGHTS, NAV_ABOUT, REGIONS } from "@/data/site";
import { EASE } from "@/components/site/motion";

export function Wordmark({ dark = false, compact = false }) {
  return (
    <span className="font-display font-bold leading-none tracking-[-0.02em] whitespace-nowrap select-none">
      <span className={`text-[21px] ${dark ? "text-white" : "text-brand-ink"}`}>info</span>
      <span className="text-[21px] text-brand-red">cure</span>
      {!compact && (
        <span className={`ml-1.5 hidden sm:inline font-body text-[11px] font-medium uppercase tracking-[0.26em] ${dark ? "text-white/60" : "text-brand-slate"}`}>
          technologies
        </span>
      )}
    </span>
  );
}

// FINAL LOCKED IA — primary navigation
const NAV = [
  { label: "Home", href: "/" },
  { label: "Services", items: NAV_SERVICES },
  { label: "Team Augmentation", href: "/team-augmentation" },
  { label: "Products", items: NAV_PRODUCTS },
  { label: "Industries", items: NAV_INDUSTRIES },
  { label: "Insights", items: NAV_INSIGHTS },
  { label: "About", items: NAV_ABOUT },
  { label: "Contact", href: "/contact" },
];

const idFor = (label) => label.toLowerCase().replace(/\s+/g, "-");

// Standardized dropdown — every menu uses this exact panel:
// same width, spacing, padding, shadow, radius, animation, aligned below its parent.
function DropdownPanel({ items }) {
  return (
    <div className="w-[300px] p-2">
      {items.map((item) => (
        <Link
          key={item.href + item.name}
          to={item.href}
          data-testid={`nav-dropdown-${item.href.replace(/\//g, "-").replace(/^-+|-+$/g, "").replace(/#/g, "-")}`}
          className="group flex items-center justify-between rounded-xl px-4 py-3 text-[13.5px] font-medium text-zinc-300 transition-colors duration-200 hover:bg-white/5 hover:text-white"
        >
          {item.name}
          <ArrowUpRight className="h-3.5 w-3.5 text-zinc-600 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        </Link>
      ))}
    </div>
  );
}

function RegionSelector() {
  const [open, setOpen] = useState(false);
  const [region, setRegion] = useState(() => {
    if (typeof window === "undefined") return REGIONS[0];
    const saved = window.localStorage.getItem("ic-region");
    return REGIONS.find((r) => r.code === saved) || REGIONS[0];
  });

  const choose = (r) => {
    setRegion(r);
    setOpen(false);
    try { window.localStorage.setItem("ic-region", r.code); } catch (e) {}
  };

  return (
    <div className="relative" onMouseLeave={() => setOpen(false)}>
      <button
        data-testid="region-selector"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label="Select region"
        className="flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-2 text-[13px] font-medium text-zinc-300 transition-colors duration-200 hover:text-white hover:border-white/30"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden xl:inline">{region.label}</span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="absolute right-0 top-full z-50 mt-2 w-48 rounded-2xl border border-white/10 bg-[#101010]/95 p-2 backdrop-blur-2xl shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]"
          >
            {REGIONS.map((r) => (
              <button
                key={r.code}
                data-testid={`region-option-${r.code.toLowerCase()}`}
                onClick={() => choose(r)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-[13.5px] font-medium text-zinc-300 transition-colors duration-200 hover:bg-white/5 hover:text-white"
              >
                {r.label}
                {region.code === r.code && <Check className="h-3.5 w-3.5 text-cure" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMobileOpen(false);
    setOpen(null);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50" onMouseLeave={() => setOpen(null)}>
      <a
        href="#main-content"
        data-testid="skip-to-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-cure focus:px-5 focus:py-2.5 focus:text-[13px] focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>
      <div className="border-b border-white/10 bg-ink/95 backdrop-blur-2xl">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
          <div className="flex h-[72px] items-center justify-between gap-2">
            <Link to="/" className="flex items-center gap-2.5" data-testid="header-logo" aria-label="infocure technologies">
              <img src="/brand/logo-mark.png" alt="" className="h-8 w-auto rounded-[6px]" draggable={false} />
              <Wordmark dark />
            </Link>

            <nav className="hidden lg:flex items-center gap-0.5" aria-label="Primary">
              {NAV.map((item) =>
                item.href ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    data-testid={`nav-${idFor(item.label)}`}
                    className="rounded-full px-2.5 py-2 text-[13px] font-medium text-zinc-400 transition-colors duration-200 hover:text-white whitespace-nowrap"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <div key={item.label} className="relative" onMouseEnter={() => setOpen(item.label)}>
                    <button
                      data-testid={`nav-${idFor(item.label)}`}
                      className={`flex items-center gap-1 rounded-full px-2.5 py-2 text-[13px] font-medium transition-colors duration-200 whitespace-nowrap ${
                        open === item.label ? "text-white bg-white/10" : "text-zinc-400 hover:text-white"
                      }`}
                      onClick={() => setOpen(open === item.label ? null : item.label)}
                      aria-expanded={open === item.label}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${open === item.label ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {open === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.24, ease: EASE }}
                          className="absolute left-0 top-full z-50 pt-3"
                        >
                          <div className="rounded-2xl border border-white/10 bg-[#101010]/95 backdrop-blur-2xl shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]">
                            <DropdownPanel items={item.items} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              )}
            </nav>

            <div className="hidden lg:flex items-center gap-2.5">
              <RegionSelector />
              <Link
                to="/contact"
                data-testid="header-cta"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-4 py-2.5 text-[13px] font-semibold text-ink transition-transform duration-300 hover:scale-[1.03] whitespace-nowrap"
              >
                <span className="absolute inset-0 bg-cure translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0" />
                <span className="relative transition-colors duration-300 group-hover:text-white">Talk to an Expert</span>
                <ArrowUpRight className="relative h-4 w-4 transition-colors duration-300 group-hover:text-white" />
              </Link>
            </div>

            <button
              data-testid="mobile-menu-button"
              className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 top-[72px] z-40 bg-ink overflow-y-auto"
            data-testid="mobile-menu"
          >
            <div className="px-6 py-8 space-y-2 pb-24">
              {NAV.map((item) =>
                item.href ? (
                  <div key={item.label} className="border-b border-white/10">
                    <button
                      data-testid={`mobile-nav-${idFor(item.label)}`}
                      onClick={() => navigate(item.href)}
                      className="flex w-full items-center justify-between py-5 font-display text-2xl font-medium text-white"
                    >
                      {item.label}
                      <ArrowUpRight className="h-5 w-5 text-zinc-500" />
                    </button>
                  </div>
                ) : (
                  <div key={item.label} className="border-b border-white/10">
                    <button
                      data-testid={`mobile-nav-${idFor(item.label)}`}
                      className="flex w-full items-center justify-between py-5 font-display text-2xl font-medium text-white"
                      onClick={() => setMobileSection(mobileSection === item.label ? null : item.label)}
                      aria-expanded={mobileSection === item.label}
                    >
                      {item.label}
                      <ChevronDown className={`h-5 w-5 text-zinc-500 transition-transform duration-300 ${mobileSection === item.label ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {mobileSection === item.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <div className="pb-5 space-y-1">
                            {item.items.map((sub) => (
                              <button
                                key={sub.href + sub.name}
                                data-testid={`mobile-nav-${idFor(item.label)}-${sub.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                                onClick={() => navigate(sub.href)}
                                className="block w-full text-left rounded-lg px-3 py-2.5 text-[15px] text-zinc-400 hover:text-white hover:bg-white/5 transition-colors duration-200"
                              >
                                {sub.name}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              )}
              <div className="pt-6">
                <div className="mb-2 font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Region</div>
                <div className="flex flex-wrap gap-2">
                  {REGIONS.map((r) => (
                    <button
                      key={r.code}
                      data-testid={`mobile-region-${r.code.toLowerCase()}`}
                      onClick={() => { try { window.localStorage.setItem("ic-region", r.code); } catch (e) {} }}
                      className="rounded-full border border-white/15 px-4 py-2 text-[13px] font-medium text-zinc-300 hover:text-white hover:border-white/30"
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
              <button
                data-testid="mobile-cta"
                onClick={() => navigate("/contact")}
                className="mt-8 w-full rounded-full bg-cure py-4 text-center text-[15px] font-semibold text-white"
              >
                Talk to an Expert
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
