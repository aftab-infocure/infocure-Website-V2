import { Link } from "react-router-dom";
import { Linkedin, Youtube, Mail, MapPin, Phone, ArrowUpRight, MessageCircle } from "lucide-react";
import { NAV_SERVICES, NAV_PRODUCTS, NAV_INDUSTRIES, SITE } from "@/data/site";

const columns = [
  {
    heading: "Services",
    links: [
      ...NAV_SERVICES.map((s) => ({ label: s.name, href: s.href })),
      { label: "Team Augmentation", href: "/services/team-augmentation" },
    ],
  },
  {
    heading: "Products",
    links: NAV_PRODUCTS.map((p) => ({ label: p.name, href: p.href })),
  },
  {
    heading: "Industries",
    links: NAV_INDUSTRIES.map((i) => ({ label: i.name, href: i.href })),
  },
  {
    heading: "Insights",
    links: [
      { label: "Articles", href: "/insights" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Resources", href: "/insights/resources" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Leadership", href: "/about#leadership" },
      { label: "Careers", href: "/about#careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const legal = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-ink text-white" data-testid="site-footer">
      <div className="ic-container px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Link to="/" aria-label="infocure technologies" data-testid="footer-logo" className="group inline-flex flex-none items-center gap-3 py-1">
              <img src="/brand/logo-mark.png" alt="" className="h-[42px] w-auto rounded-[7px] lg:h-[48px]" />
              <span className="font-display text-[21px] font-bold leading-none tracking-[-0.02em] text-white lg:text-[24px]">
                info<span className="text-brand-red">cure</span>
                <span className="ml-1.5 font-body text-[11.5px] font-medium uppercase tracking-[0.26em] text-white/60">
                  technologies
                </span>
              </span>
            </Link>
            <p className="mt-6 max-w-md font-body text-[15px] leading-relaxed text-white/70">
              infocure technologies helps growing businesses modernize their operations through SAP
              and Oracle consulting, ready-to-deploy business applications, and certified technology
              talent across India and the Middle East.
            </p>
            <div className="mt-8 space-y-3 text-[14px] text-white/70">
              <a href={`mailto:${SITE.email}`} data-testid="footer-email" className="flex items-center gap-3 hover:text-white">
                <Mail className="h-4 w-4" />
                {SITE.email}
              </a>
              <a href={SITE.phoneHref} data-testid="footer-phone" className="flex items-center gap-3 hover:text-white">
                <Phone className="h-4 w-4" />
                {SITE.phone}
              </a>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" data-testid="footer-whatsapp" className="flex items-center gap-3 hover:text-white">
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp
              </a>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4" />
                Mumbai · Bengaluru · UAE
              </div>
            </div>
            <div className="mt-8 flex items-center gap-3">
              <a
                aria-label="infocure technologies on LinkedIn"
                href="https://www.linkedin.com/company/infocure-technologies"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-linkedin"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 hover:border-white hover:text-white"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                aria-label="infocure technologies on YouTube"
                href="https://www.youtube.com/@infocuretechnologies"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-youtube"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 hover:border-white hover:text-white"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {columns.map((col) => (
              <div key={col.heading}>
                <div className="font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-white/60">
                  {col.heading}
                </div>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.href + l.label}>
                      <Link to={l.href} className="text-[14px] text-white/80 hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-card border border-white/10 bg-white/5 p-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-white/60">
                Ready to talk?
              </div>
              <div className="mt-2 font-display text-[22px] font-semibold text-white lg:text-[26px]">
                Schedule a 30-minute consultation with a senior infocure consultant.
              </div>
            </div>
            <Link
              to="/contact"
              data-testid="footer-cta"
              className="inline-flex items-center gap-2 rounded-button bg-[#D6182B] px-6 py-3 font-body text-[15px] font-semibold text-white hover:bg-[#B91424]"
            >
              Talk to an Expert
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="ic-container flex flex-col items-start justify-between gap-4 px-6 py-6 text-[13px] text-white/60 md:flex-row md:items-center lg:px-10">
          <div>© {new Date().getFullYear()} infocure technologies. All rights reserved.</div>
          <div className="flex items-center gap-6">
            {legal.map((l) => (
              <Link key={l.href} to={l.href} data-testid={`footer-${l.label.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-white">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
