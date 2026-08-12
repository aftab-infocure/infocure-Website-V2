import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ArrowRight, Mail, Phone, MessageCircle, CheckCircle2, MapPin } from "lucide-react";
import SEO from "@/components/site/SEO";
import { Reveal } from "@/components/ref/motion";
import { Badge } from "@/components/ref/ui";
import { SITE } from "@/data/site";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const INTERESTS = [
  "SAP Services", "Oracle Services", "Salesforce", "Digital Transformation",
  "AI & Automation", "Cyber Security", "Software Development", "Team Augmentation",
  "Enterprise Products", "Other",
];

const initial = { name: "", email: "", phone: "", company: "", interest: "", message: "" };

const inputCls =
  "w-full rounded-button border border-brand-mist bg-white px-4 py-3.5 font-body text-[15px] text-brand-ink placeholder:text-brand-slate/60 outline-none transition-colors duration-150 focus:border-brand-red";

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(`${API}/contact`, form);
      setSent(true);
      toast.success("Enquiry received — our team will respond within one business day.");
    } catch (err) {
      toast.error("Something went wrong. Please email us directly at " + SITE.email);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div data-testid="contact-page">
      <SEO
        title="Contact Us"
        description="Start your digital transformation conversation with infocure technologies. We respond within one business day."
        path="/contact"
      />

      <section className="ic-hero-grid relative isolate overflow-hidden bg-white">
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-brand-red/[0.06] blur-3xl" />
        <div className="ic-container relative px-6 pb-20 pt-32 lg:px-10 lg:pb-28 lg:pt-44">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div>
              <Reveal>
                <Badge tone="red" className="mb-6">Contact</Badge>
                <h1 className="font-display text-[36px] font-bold leading-[1.05] tracking-[-0.5px] text-brand-ink lg:text-[54px]">
                  Let's talk about what's next.
                </h1>
                <p className="mt-6 max-w-md font-body text-[16.5px] leading-relaxed text-brand-slate lg:text-[17px]">
                  Tell us where your business is headed. A senior consultant — not a sales rep —
                  will respond within one business day.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-10 space-y-5">
                  <a href={SITE.phoneHref} data-testid="contact-phone" className="group flex items-center gap-4">
                    <span className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-icon-box bg-brand-red/[0.08] text-brand-red transition-colors duration-200 group-hover:bg-brand-red group-hover:text-white">
                      <Phone className="h-[18px] w-[18px]" strokeWidth={1.8} />
                    </span>
                    <span className="font-body text-[15px] font-semibold text-brand-ink">{SITE.phone}</span>
                  </a>
                  <a href={`mailto:${SITE.email}`} data-testid="contact-email" className="group flex items-center gap-4">
                    <span className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-icon-box bg-brand-red/[0.08] text-brand-red transition-colors duration-200 group-hover:bg-brand-red group-hover:text-white">
                      <Mail className="h-[18px] w-[18px]" strokeWidth={1.8} />
                    </span>
                    <span className="font-body text-[15px] font-semibold text-brand-ink">{SITE.email}</span>
                  </a>
                  <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" data-testid="contact-whatsapp" className="group flex items-center gap-4">
                    <span className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-icon-box bg-brand-red/[0.08] text-brand-red transition-colors duration-200 group-hover:bg-brand-red group-hover:text-white">
                      <MessageCircle className="h-[18px] w-[18px]" strokeWidth={1.8} />
                    </span>
                    <span className="font-body text-[15px] font-semibold text-brand-ink">Chat on WhatsApp</span>
                  </a>
                  <div className="flex items-center gap-4">
                    <span className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-icon-box bg-brand-tint text-brand-ink">
                      <MapPin className="h-[18px] w-[18px]" strokeWidth={1.8} />
                    </span>
                    <span className="font-body text-[15px] font-semibold text-brand-ink">Mumbai · Bengaluru · UAE</span>
                  </div>
                  <p className="pt-3 font-body text-[13px] uppercase tracking-[0.14em] text-brand-slate">
                    Mon–Fri, 9 AM – 7 PM IST · Response within one business day
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              {sent ? (
                <div className="flex h-full min-h-[480px] flex-col items-center justify-center rounded-card border border-brand-mist bg-white p-12 text-center shadow-card" data-testid="contact-success">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-red/[0.08]">
                    <CheckCircle2 className="h-7 w-7 text-brand-red" />
                  </span>
                  <h2 className="mt-8 font-display text-[28px] font-semibold text-brand-ink">Enquiry received.</h2>
                  <p className="mt-4 max-w-sm font-body text-[15px] leading-relaxed text-brand-slate">
                    Thank you{form.name ? `, ${form.name.split(" ")[0]}` : ""}. A senior consultant
                    will reach out within one business day{form.email ? ` at ${form.email}` : ""}.
                  </p>
                  <button
                    data-testid="contact-send-another"
                    onClick={() => { setSent(false); setForm(initial); }}
                    className="ic-btn-secondary mt-8 h-11 px-6"
                  >
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="rounded-card border border-brand-mist bg-white p-8 shadow-card lg:p-10" data-testid="contact-form">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input required data-testid="contact-name" placeholder="Full name *" value={form.name} onChange={update("name")} className={inputCls} />
                    <input required type="email" data-testid="contact-email-input" placeholder="Work email *" value={form.email} onChange={update("email")} className={inputCls} />
                    <input data-testid="contact-phone-input" placeholder="Phone" value={form.phone} onChange={update("phone")} className={inputCls} />
                    <input data-testid="contact-company" placeholder="Company" value={form.company} onChange={update("company")} className={inputCls} />
                  </div>
                  <select
                    data-testid="contact-interest"
                    value={form.interest}
                    onChange={update("interest")}
                    className={`${inputCls} mt-4 appearance-none ${form.interest ? "text-brand-ink" : "text-brand-slate/60"}`}
                  >
                    <option value="">I'm interested in…</option>
                    {INTERESTS.map((i) => (
                      <option key={i} value={i}>{i}</option>
                    ))}
                  </select>
                  <textarea
                    required
                    data-testid="contact-message"
                    placeholder="Tell us about your project or challenge *"
                    rows={5}
                    value={form.message}
                    onChange={update("message")}
                    className={`${inputCls} mt-4 resize-none`}
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    data-testid="contact-submit"
                    className="ic-btn-primary mt-6 inline-flex h-14 w-full items-center justify-center gap-2 px-8 text-[16px] sm:w-auto"
                  >
                    {submitting ? "Sending…" : "Send enquiry"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <p className="mt-5 font-body text-[12.5px] text-brand-slate">
                    By submitting, you agree to our privacy policy. We never share your data.
                  </p>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
