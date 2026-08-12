import SEO from "@/components/site/SEO";
import { Reveal } from "@/components/ref/motion";
import { Badge } from "@/components/ref/ui";

const CONTENT = {
  privacy: {
    title: "Privacy Policy",
    seo: "How infocure technologies collects, uses and protects your personal data.",
    sections: [
      { h: "Information We Collect", p: "We collect information you provide directly — name, work email, phone number, company and project details — when you submit an enquiry. We also collect standard analytics data (pages visited, device type) to improve this website." },
      { h: "How We Use Information", p: "Enquiry details are used solely to respond to your request and, with your consent, to share relevant insights about our services. We do not sell, rent or trade personal data to third parties." },
      { h: "Data Security", p: "Data is stored in access-controlled systems with encryption in transit. Access is limited to authorized personnel bound by confidentiality obligations." },
      { h: "Data Retention", p: "Enquiry data is retained for up to 24 months for relationship management, after which it is deleted unless an engagement is active." },
      { h: "Your Rights", p: "You may request access, correction or deletion of your personal data at any time by writing to solutions@infocure.in." },
    ],
  },
  terms: {
    title: "Terms of Service",
    seo: "Terms governing use of the infocure technologies website.",
    sections: [
      { h: "Use of This Website", p: "Content on this website is provided for general information about infocure technologies and its services. It does not constitute professional advice or a binding offer." },
      { h: "Intellectual Property", p: "All content, trademarks, and materials on this site are the property of infocure technologies or its licensors and may not be reproduced without written permission." },
      { h: "Engagements", p: "Any services referenced on this site are governed by individually executed statements of work and master service agreements, not by this website." },
      { h: "Limitation of Liability", p: "While we strive for accuracy, we accept no liability for decisions made based on website content. Product metrics shown reflect typical results and may vary by engagement." },
      { h: "Governing Law", p: "These terms are governed by the laws of India. Disputes are subject to the exclusive jurisdiction of courts in Mumbai, Maharashtra." },
    ],
  },
  disclaimer: {
    title: "Disclaimer",
    seo: "Legal disclaimer for the infocure technologies website.",
    sections: [
      { h: "General", p: "The information on this website is provided in good faith for general guidance. infocure technologies makes no representation or warranty of any kind regarding completeness or accuracy." },
      { h: "Third-Party Trademarks", p: "SAP, Oracle, Salesforce, UiPath and other marks referenced are trademarks of their respective owners. Reference does not imply endorsement or affiliation unless expressly stated." },
      { h: "Results", p: "Statistics and outcomes described represent results from specific client engagements and should not be read as guarantees of future performance." },
      { h: "External Links", p: "This site may link to external websites. We are not responsible for the content or privacy practices of those sites." },
      { h: "Changes", p: "We may update this disclaimer at any time. Continued use of the site constitutes acceptance of the current version." },
    ],
  },
};

export default function Legal({ page }) {
  const doc = CONTENT[page] || CONTENT.privacy;
  return (
    <div data-testid={`legal-${page}`}>
      <SEO title={doc.title} description={doc.seo} path={`/${page}`} />
      <section className="ic-hero-grid relative isolate overflow-hidden bg-white">
        <div className="ic-container relative px-6 pb-14 pt-32 lg:px-10 lg:pt-44">
          <Reveal>
            <Badge tone="red" className="mb-6">Legal</Badge>
            <h1 className="font-display text-[36px] font-bold leading-[1.05] tracking-[-0.5px] text-brand-ink lg:text-[52px]">{doc.title}</h1>
            <p className="mt-4 font-body text-[13px] uppercase tracking-[0.14em] text-brand-slate">Last updated: January 2026</p>
          </Reveal>
        </div>
      </section>
      <section className="bg-white">
        <div className="ic-container-narrow px-6 pb-24 lg:px-0 space-y-12">
          {doc.sections.map((s, i) => (
            <Reveal key={s.h} delay={0.04 * i}>
              <div>
                <p className="mb-3 font-mono text-[12px] font-semibold tracking-[0.2em] text-brand-red">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="font-display text-[24px] font-semibold text-brand-ink">{s.h}</h2>
                <p className="mt-4 font-body text-[15.5px] leading-relaxed text-brand-slate">{s.p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
