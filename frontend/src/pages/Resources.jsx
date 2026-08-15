import { useEffect, useState } from "react";
import axios from "axios";
import SEO from "@/components/site/SEO";
import Hero from "@/components/ref/Hero";
import { Reveal } from "@/components/ref/motion";
import { CTABand } from "@/components/ref/sections";
import { FileText, BookOpen, ListChecks, BookMarked, FileDown, BarChart3, Download, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const DOCUMENTS = [
  {
    icon: FileText,
    kind: "Whitepaper",
    title: "The Executive Guide to S/4HANA Readiness",
    desc: "The readiness framework boards should apply before committing to a migration programme — decision gates, data rehearsals and governance that replaces optimism with evidence.",
    file: "/resources/whitepaper-s4hana-readiness.pdf",
  },
  {
    icon: BookOpen,
    kind: "Guide",
    title: "Digital Transformation Roadmap: A Leader's Guide",
    desc: "How to sequence transformation around business risk — value mapping before vendor selection, and quarterly value releases instead of big-bang delivery.",
    file: "/resources/guide-digital-transformation-roadmap.pdf",
  },
  {
    icon: ListChecks,
    kind: "Checklist",
    title: "ERP Programme Readiness Checklist",
    desc: "A practical one-page discipline for leadership teams about to commit to an ERP programme. Every 'not yet' answer is a risk to retire before kickoff.",
    file: "/resources/checklist-erp-programme-readiness.pdf",
  },
  {
    icon: BookMarked,
    kind: "Brochure",
    title: "Infocure Corporate Overview",
    desc: "The consulting portfolio, the business application suite, and team augmentation engagement models — across India, the GCC, Europe and international markets.",
    file: "/resources/brochure-infocure-corporate.pdf",
  },
  {
    icon: FileDown,
    kind: "eBook",
    title: "E-Invoicing Compliance Playbook for India",
    desc: "The full e-invoice lifecycle — IRN workflows, validation, exception handling and ERP integration patterns documented for SAP, Oracle and Tally landscapes.",
    file: "/resources/ebook-einvoicing-compliance-india.pdf",
  },
  {
    icon: BarChart3,
    kind: "Industry Report",
    title: "Manufacturing Technology Adoption Report",
    desc: "A sector-level view of how manufacturers sequence technology investment — production planning, dealer digitization and the integration patterns that compound.",
    file: "/resources/report-manufacturing-technology-adoption.pdf",
  },
];

export default function Resources() {
  const [published, setPublished] = useState([]);
  useEffect(() => {
    axios.get(`${API}/insights?type=resource`).then((r) => setPublished(r.data)).catch(() => setPublished([]));
  }, []);
  return (
    <div data-testid="resources-page">
      <SEO
        title="Resources | Whitepapers, Guides & Checklists | Infocure"
        description="Executive resources from Infocure — whitepapers, guides, checklists, brochures, eBooks and industry reports on enterprise technology and digital transformation."
        path="/insights/resources"
      />

      <Hero
        eyebrow="Insights · Resources"
        headline="Resources for Technology Decision-Makers"
        subhead="Whitepapers, guides, checklists and executive briefings from Infocure's consulting and product practices — practical material for leaders planning enterprise technology investments."
        primaryCta={{ label: "Browse the Library", href: "#library" }}
        secondaryCta={{ label: "Talk to an Expert", href: "/contact" }}
        trustLine="Written by practitioners, not marketers"
        video="/media/method-bg.mp4"
        videoWebm="/media/method-bg.webm"
        image="/img-digital-transformation.webp"
      />

      <section id="library" className="bg-white scroll-mt-[90px]">
        <div className="ic-container px-6 py-16 lg:px-10 lg:py-20">
          <Reveal>
            <div className="mb-4 font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-red">Resource Library</div>
            <h2 className="ic-h2 mb-4">Premium, Practical, Practitioner-Written</h2>
            <p className="mb-12 max-w-2xl font-body text-[16px] leading-relaxed text-brand-slate">
              Every resource is produced by the consultants and architects who deliver our engagements.
              Download any title directly — no forms, no gates.
            </p>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {DOCUMENTS.map((r, i) => (
              <Reveal key={r.file} delay={0.05 * i} className="h-full">
                <div
                  data-testid={`resource-${r.kind.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  className="group flex h-full flex-col rounded-card border border-brand-mist bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-brand-red/40 hover:shadow-card-hover lg:p-7"
                >
                  <div className="flex items-center justify-between">
                    <r.icon className="h-6 w-6 text-brand-red" />
                    <span className="rounded-full bg-brand-cloud px-3 py-1 font-body text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-slate">
                      {r.kind}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-[19px] font-semibold leading-snug text-brand-ink">{r.title}</h3>
                  <p className="mt-3 flex-1 font-body text-[14.5px] leading-relaxed text-brand-slate">{r.desc}</p>
                  <a
                    href={r.file}
                    download
                    data-testid={`download-${r.file.split("/").pop().replace(".pdf", "")}`}
                    className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-button bg-[#D6182B] px-5 font-body text-[14px] font-semibold text-white transition-colors duration-200 hover:bg-[#B91424]"
                  >
                    <Download className="h-4 w-4" />
                    Download PDF
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {published.length > 0 ? (
        <section className="border-t border-brand-mist bg-brand-cloud">
          <div className="ic-container px-6 py-16 lg:px-10 lg:py-20">
            <Reveal>
              <div className="mb-4 font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-red">Latest Resources</div>
              <h2 className="ic-h2 mb-12">Published Resources</h2>
            </Reveal>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {published.map((r, i) => (
                <Reveal key={r.slug} delay={0.05 * i} className="h-full">
                  <div
                    data-testid={`published-resource-${r.slug}`}
                    className="group flex h-full flex-col rounded-card border border-brand-mist bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-brand-red/40 hover:shadow-card-hover lg:p-7"
                  >
                    <div className="font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-red">{r.category}</div>
                    <h3 className="mt-3 font-display text-[19px] font-semibold text-brand-ink">{r.title}</h3>
                    <p className="mt-3 flex-1 font-body text-[14.5px] leading-relaxed text-brand-slate">{r.excerpt}</p>
                    <div className="mt-5 flex flex-wrap items-center gap-4">
                      {r.pdf_url ? (
                        <a
                          href={r.pdf_url}
                          download
                          data-testid={`published-resource-download-${r.slug}`}
                          className="inline-flex items-center gap-1.5 font-body text-[13.5px] font-semibold text-brand-red"
                        >
                          <Download className="h-3.5 w-3.5" />
                          Download PDF
                        </a>
                      ) : null}
                      <Link
                        to={`/insights/${r.slug}`}
                        data-testid={`published-resource-read-${r.slug}`}
                        className="inline-flex items-center gap-1.5 font-body text-[13.5px] font-semibold text-brand-ink"
                      >
                        Read resource
                        <ArrowUpRight className="h-3.5 w-3.5 text-brand-red transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CTABand
        eyebrow="Insights · Resources"
        title="Looking for a specific topic?"
        subtitle="Tell us what you're evaluating and a senior consultant will share the most relevant material — or walk you through it on a call."
        primaryCta={{ label: "Request a Resource", href: "/contact" }}
        secondaryCta={{ label: "Talk to an Expert", href: "/contact" }}
      />
    </div>
  );
}
