import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Trash2, ArrowRight, Eye, LogOut } from "lucide-react";
import SEO from "@/components/site/SEO";
import { Reveal } from "@/components/ref/motion";
import { Badge } from "@/components/ref/ui";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const inputCls =
  "w-full rounded-button border border-brand-mist bg-white px-4 py-3 font-body text-[15px] text-brand-ink placeholder:text-brand-slate/60 outline-none transition-colors duration-150 focus:border-brand-red";

const slugify = (s) =>
  s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");

const TYPES = [
  { value: "article", label: "Article", dest: "/insights" },
  { value: "blog", label: "Blog", dest: "/insights/blog" },
  { value: "case-study", label: "Case Study", dest: "/case-studies" },
];

function parseBody(body) {
  return body
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean)
    .map((b) => (b.startsWith("## ") ? { h: b.slice(3).trim(), p: "" } : { h: null, p: b.replace(/\n/g, " ") }))
    .filter((s) => s.p || s.h);
}

const initial = { title: "", excerpt: "", category: "Digital Transformation", date: "", read_minutes: 5, image: "", body: "", type: "article" };

export default function AdminIA() {
  const [token, setToken] = useState(() => localStorage.getItem("ic-admin-jwt") || "");
  const [login, setLogin] = useState({ email: "", password: "" });
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState(initial);
  const [busy, setBusy] = useState(false);
  const authed = Boolean(token);
  const auth = { headers: { Authorization: `Bearer ${token}` } };

  const load = () => axios.get(`${API}/insights`).then((r) => setPosts(r.data)).catch(() => setPosts([]));

  useEffect(() => {
    if (!authed) return;
    axios.get(`${API}/admin/me`, auth).then(load).catch(() => { localStorage.removeItem("ic-admin-jwt"); setToken(""); });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed]);

  const doLogin = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const { data } = await axios.post(`${API}/admin/login`, login);
      localStorage.setItem("ic-admin-jwt", data.token);
      setToken(data.token);
      toast.success("Welcome back.");
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Login failed.");
    } finally {
      setBusy(false);
    }
  };

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const publish = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const payload = {
        slug: slugify(form.title),
        title: form.title,
        excerpt: form.excerpt,
        category: form.category,
        type: form.type,
        date: form.date || new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
        read_minutes: Number(form.read_minutes) || 5,
        image: form.image,
        sections: parseBody(form.body),
      };
      await axios.post(`${API}/insights`, payload, auth);
      const dest = TYPES.find((t) => t.value === form.type)?.label || "Content";
      toast.success(`${dest} published.`);
      setForm({ ...initial, type: form.type });
      load();
    } catch (err) {
      const s = err?.response?.status;
      if (s === 401 || s === 403) { toast.error("Session expired. Please log in again."); localStorage.removeItem("ic-admin-jwt"); setToken(""); }
      else if (s === 409) toast.error("Content with this slug already exists.");
      else toast.error("Publishing failed.");
    } finally {
      setBusy(false);
    }
  };

  const remove = async (slug) => {
    try {
      await axios.delete(`${API}/insights/${slug}`, auth);
      toast.success("Deleted.");
      load();
    } catch {
      toast.error("Delete failed.");
    }
  };

  const signOut = () => { localStorage.removeItem("ic-admin-jwt"); setToken(""); setLogin({ email: "", password: "" }); };

  return (
    <div data-testid="adminia-page">
      <SEO title="Admin" description="Internal content administration." path="/adminia" />
      <section className="ic-hero-grid min-h-screen bg-white">
        <div className="ic-container-narrow px-6 pb-24 pt-32 lg:px-0 lg:pt-44">
          {!authed ? (
            <Reveal>
              <Badge tone="red" className="mb-6">Restricted</Badge>
              <h1 className="font-display text-[34px] font-bold tracking-[-0.5px] text-brand-ink">infocure admin</h1>
              <p className="mt-4 max-w-md font-body text-[15px] text-brand-slate">Sign in with your authorized admin account.</p>
              <form onSubmit={doLogin} className="mt-8 max-w-md space-y-3" data-testid="admin-login-form">
                <input type="email" required data-testid="admin-email" placeholder="Email" value={login.email} onChange={(e) => setLogin({ ...login, email: e.target.value })} className={inputCls} />
                <input type="password" required data-testid="admin-password" placeholder="Password" value={login.password} onChange={(e) => setLogin({ ...login, password: e.target.value })} className={inputCls} />
                <button type="submit" disabled={busy} data-testid="admin-login-submit" className="ic-btn-primary h-12 w-full px-6">
                  {busy ? "Signing in…" : "Sign in"}
                </button>
              </form>
            </Reveal>
          ) : (
            <>
              <Reveal>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <Badge tone="red" className="mb-4">Publisher</Badge>
                    <h1 className="font-display text-[34px] font-bold tracking-[-0.5px] text-brand-ink">Create content</h1>
                  </div>
                  <button data-testid="admin-logout" onClick={signOut} className="inline-flex items-center gap-2 font-body text-[13px] font-semibold text-brand-slate hover:text-brand-red">
                    <LogOut className="h-4 w-4" /> Sign out
                  </button>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <form onSubmit={publish} className="mt-10 rounded-card border border-brand-mist bg-white p-8 shadow-card" data-testid="publish-form">
                  <div className="mb-5">
                    <div className="mb-2 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-slate">Publish to</div>
                    <div className="flex flex-wrap gap-3" data-testid="content-type-selector">
                      {TYPES.map((t) => (
                        <label key={t.value} data-testid={`type-${t.value}`} className={`flex cursor-pointer items-center gap-2 rounded-chip border px-4 py-2.5 font-body text-[14px] font-semibold transition-colors ${form.type === t.value ? "border-brand-red bg-brand-red/10 text-brand-red" : "border-brand-mist text-brand-slate hover:border-brand-red/40"}`}>
                          <input type="radio" name="ctype" value={t.value} checked={form.type === t.value} onChange={update("type")} className="accent-brand-red" />
                          {t.label}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input required data-testid="publish-title" placeholder="Title *" value={form.title} onChange={update("title")} className={`${inputCls} sm:col-span-2`} />
                    <textarea required data-testid="publish-excerpt" placeholder="Excerpt (1–2 sentences) *" rows={2} value={form.excerpt} onChange={update("excerpt")} className={`${inputCls} resize-none sm:col-span-2`} />
                    <input data-testid="publish-category" placeholder="Category (e.g. SAP, ERP, AI)" value={form.category} onChange={update("category")} className={inputCls} />
                    <input data-testid="publish-date" placeholder="Date (e.g. July 2026)" value={form.date} onChange={update("date")} className={inputCls} />
                    <input type="number" min="1" data-testid="publish-readtime" placeholder="Read minutes" value={form.read_minutes} onChange={update("read_minutes")} className={inputCls} />
                    <input data-testid="publish-image" placeholder="Image URL (optional)" value={form.image} onChange={update("image")} className={inputCls} />
                  </div>
                  <textarea required data-testid="publish-body" placeholder={"Body * — blank line between paragraphs.\nStart a line with '## ' for a heading."} rows={12} value={form.body} onChange={update("body")} className={`${inputCls} mt-4 resize-y font-mono2 text-[13.5px]`} />
                  <button type="submit" disabled={busy} data-testid="publish-submit" className="ic-btn-primary mt-6 inline-flex h-12 items-center gap-2 px-7">
                    {busy ? "Publishing…" : "Publish"} <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              </Reveal>

              <Reveal delay={0.12}>
                <h2 className="mt-16 mb-6 font-display text-[24px] font-semibold text-brand-ink">Published content</h2>
                <div className="space-y-3" data-testid="admin-content-list">
                  {posts.map((p) => (
                    <div key={p.slug} className="flex items-center justify-between gap-4 rounded-card border border-brand-mist bg-white p-5 shadow-card">
                      <div className="min-w-0">
                        <p className="truncate font-display text-[16px] font-semibold text-brand-ink">{p.title}</p>
                        <p className="mt-1 font-body text-[12.5px] text-brand-slate">
                          <span className="rounded bg-brand-red/10 px-2 py-0.5 font-semibold text-brand-red">{p.type || "article"}</span>
                          {" · "}{p.category} · /insights/{p.slug}
                        </p>
                      </div>
                      <div className="flex flex-none items-center gap-2">
                        <a href={`/insights/${p.slug}`} data-testid={`admin-view-${p.slug}`} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-mist text-brand-ink hover:border-brand-red hover:text-brand-red" aria-label={`View ${p.title}`}>
                          <Eye className="h-4 w-4" />
                        </a>
                        <button onClick={() => remove(p.slug)} data-testid={`admin-delete-${p.slug}`} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-mist text-brand-ink hover:border-brand-red hover:bg-brand-red hover:text-white" aria-label={`Delete ${p.title}`}>
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
