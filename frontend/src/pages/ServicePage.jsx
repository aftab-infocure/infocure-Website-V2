import { useParams, useLocation, Link, Navigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SEO from "@/components/site/SEO";
import { Reveal } from "@/components/ref/motion";
import { FeatureGrid, FAQAccordion, CTABand } from "@/components/ref/sections";
import { ThemedVisual } from "@/components/ref/visuals";
import Hero from "@/components/ref/Hero";
import { getService } from "@/data/services";

const VISUALS = {
  "/services/sap/consultation": { center: "SAP Advisory", nodes: [{ label: "Assess" }, { label: "Roadmap" }, { label: "Licensing" }, { label: "Business Case" }, { label: "RISE" }, { label: "Governance" }] },
  "/services/sap/implementation": { center: "S/4HANA", nodes: [{ label: "Explore" }, { label: "Realize" }, { label: "Data" }, { label: "Test" }, { label: "Deploy" }, { label: "Run" }] },
  "/services/sap/hana-migration": { center: "HANA", nodes: [{ label: "DMO" }, { label: "NZDT" }, { label: "Code" }, { label: "Cloud" }, { label: "Validate" }, { label: "Fallback" }] },
  "/services/sap/hana-upgrade": { center: "Upgrade", nodes: [{ label: "Release" }, { label: "Regression" }, { label: "Fiori" }, { label: "Shadow" }, { label: "Tune" }, { label: "Support" }] },
  "/services/sap/integration": { center: "Integration", nodes: [{ label: "CPI" }, { label: "APIs" }, { label: "Events" }, { label: "EDI" }, { label: "Monitor" }, { label: "PI/PO" }] },
  "/services/sap/ams": { center: "AMS", nodes: [{ label: "L1–L3" }, { label: "Basis" }, { label: "Monitor" }, { label: "Improve" }, { label: "Enhance" }, { label: "SLA" }] },
  "/services/sap/audit": { center: "Audit", nodes: [{ label: "Performance" }, { label: "Security" }, { label: "License" }, { label: "Code" }, { label: "Process" }, { label: "Roadmap" }] },
  "/services/oracle/ebs": { center: "EBS", nodes: [{ label: "Financials" }, { label: "SCM" }, { label: "R12.2" }, { label: "CEMLI" }, { label: "OCI" }, { label: "Support" }] },
  "/services/oracle/fusion": { center: "Fusion", nodes: [{ label: "ERP" }, { label: "HCM" }, { label: "SCM" }, { label: "EPM" }, { label: "OIC" }, { label: "Updates" }] },
  "/services/digital-transformation": { center: "Transform", nodes: [{ label: "Strategy" }, { label: "Process" }, { label: "Platforms" }, { label: "Data" }, { label: "Change" }, { label: "Value" }] },
  "/services/ai": { center: "AI", nodes: [{ label: "Copilots" }, { label: "Predict" }, { label: "Documents" }, { label: "Vision" }, { label: "MLOps" }, { label: "Governance" }] },
  "/services/rpa": { center: "RPA", nodes: [{ label: "Assess" }, { label: "Build" }, { label: "Attended" }, { label: "Unattended" }, { label: "IDP" }, { label: "Run" }] },
  "/services/salesforce": { center: "Salesforce", nodes: [{ label: "Sales" }, { label: "Service" }, { label: "CPQ" }, { label: "Integrate" }, { label: "Data" }, { label: "Admin" }] },
  "/services/software-development": { center: "Engineering", nodes: [{ label: "Web" }, { label: "Mobile" }, { label: "APIs" }, { label: "DevOps" }, { label: "QA" }, { label: "Modernize" }] },
  "/services/team-augmentation": { center: "Talent", nodes: [{ label: "SAP" }, { label: "Oracle" }, { label: "Engineers" }, { label: "Architects" }, { label: "Pods" }, { label: "BOT" }] },
  "/services/cyber-security": { center: "Security", nodes: [{ label: "VAPT" }, { label: "SAP GRC" }, { label: "MDR" }, { label: "IAM" }, { label: "Compliance" }, { label: "Awareness" }] },
};

export default function ServicePage() {
  const params = useParams();
  const location = useLocation();
  const service = getService(location.pathname);

  if (!service) return <Navigate to="/" replace />;

  const visual = VISUALS[service.path];

  return (
    <div data-testid={`service-page-${params.slug}`}>
      <SEO title={service.seo.title} description={service.seo.description} path={service.path} />

      <Hero
        eyebrow={service.eyebrow}
        headline={service.title}
        subhead={service.heroCopy}
        primaryCta={{ label: "Discuss your project", href: "/contact" }}
        secondaryCta={{ label: service.related[0].name, href: service.related[0].href }}
        trustLine="Senior-led delivery · Fixed-scope engagements · Enterprise-grade governance"
        video="/media/method-bg.mp4"
        videoWebm="/media/method-bg.webm"
        videoPoster="/media/method-bg.jpg"
        visual={visual ? <ThemedVisual center={visual.center} nodes={visual.nodes} caption={service.title} /> : undefined}
        image={service.image}
      />

      <Reveal>
        <FeatureGrid
          eyebrow="Capabilities"
          title="What this practice covers."
          subtitle={service.tagline}
          items={service.capabilities.map((c) => ({ title: c.title, description: c.desc }))}
          columns={3}
        />
      </Reveal>

      {/* Delivery model + outcomes — dark */}
      <section className="bg-brand-ink text-white">
        <div className="ic-container px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr]">
            <Reveal>
              <div className="mb-4 font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-red">Delivery model</div>
              <h2 className="font-display text-[30px] font-semibold leading-[1.15] text-white lg:text-[40px]">
                How an engagement unfolds.
              </h2>
              <p className="mt-6 max-w-lg font-body text-[16px] leading-relaxed text-white/70">
                A proven, gated delivery path. Each phase closes with evidence — not promises — before the next begins.
              </p>
            </Reveal>
            <ol className="grid gap-4">
              {service.process.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[auto_1fr] gap-6 rounded-card border border-white/10 bg-white/[0.04] p-6 lg:p-7">
                  <Reveal delay={0.07 * i}>
                    <div className="grid grid-cols-[auto_1fr] gap-6">
                      <div className="font-mono text-[28px] font-semibold text-brand-red">{String(i + 1).padStart(2, "0")}</div>
                      <div>
                        <div className="font-display text-[20px] font-semibold text-white">{s.title}</div>
                        <div className="mt-2 font-body text-[15px] leading-relaxed text-white/70">{s.desc}</div>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <Reveal>
        <FAQAccordion title="Common questions" subtitle={`What leaders ask us before starting a ${service.title} engagement.`} items={service.faqs} />
      </Reveal>

      {/* Related */}
      <section className="bg-brand-cloud">
        <div className="ic-container px-6 py-20 lg:px-10 lg:py-24">
          <Reveal>
            <div className="mb-4 font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-red">Continue exploring</div>
            <h2 className="ic-h2 mb-10">Related capabilities.</h2>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {service.related.map((r, i) => (
              <Reveal key={r.href} delay={0.06 * i} className="h-full">
                <Link
                  to={r.href}
                  data-testid={`related-${r.href.replace(/\//g, "-")}`}
                  className="group flex h-full items-center justify-between rounded-card border border-brand-mist bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:border-brand-red/40 hover:shadow-card-hover"
                >
                  <span className="font-display text-[17px] font-semibold text-brand-ink">{r.name}</span>
                  <ArrowUpRight className="h-4 w-4 flex-none text-brand-red transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        eyebrow="Let's begin"
        title="Every engagement starts with an honest conversation."
        subtitle="Schedule a 30-minute call with a senior consultant. No sales pitch — a working discussion about your landscape and what it will take."
        primaryCta={{ label: "Schedule a Consultation", href: "/contact" }}
        secondaryCta={{ label: "Request a Proposal", href: "/contact" }}
      />
    </div>
  );
}
