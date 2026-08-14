import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Trash2, ArrowRight, Eye, LogOut, Pencil, X, Upload, Save, Send } from "lucide-react";
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
  { value: "resource", label: "Resource", dest: "/insights/resources" },
];

function parseBody(body) {
  return body
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean)
    .map((b) => (b.startsWith("## ") ? { h: b.slice(3).trim(), p: "" } : { h: null, p: b.replace(/\n/g, " ") }))
    .filter((s) => s.p || s.h);
}

function bodyToText(sections) {
  return (sections || []).map((s) => (s.h ? `## ${s.h}` : s.p)).join("\n\n");
}

const initial = {
  title: "", slug: "", excerpt: "", category: "Digital Transformation", date: "",
  read_minutes: 5, image: "", body: "", type: "article", seo_title: "", meta_description: "",
};

export default function AdminIA() {
  const [token, setToken] = useState(() => localStorage.getItem("ic-admin-jwt") || "");
  const [login, setLogin] = useState({ email: "", password: "" });
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState(initial);
  const [slugTouched, setSlugTouched] = useState(false);
  const [editing, setEditing] = useState(null);
  const [preview, setPreview] = useState(false);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);
  const authed = Boolean(token);
  const auth = { headers: { Authorization: `Bearer ${token}` } };

  const load = () =>
    axios.get(`${API}/admin/insights`, auth).then((r) => setPosts(r.data)).catch(() => setPosts([]));

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

  const update = (k) => (e) => {
    const v = e.target.value;
    setForm((f) => ({
      ...f,
      [k]: v,
      ...(k === "title" && !slugTouched ? { slug: slugify(v) } : {}),
    }));
  };

  const payloadFor = (status) => ({
    slug: slugify(form.slug || form.title),
    title: form.title,
    excerpt: form.excerpt,
    category: form.category,
    type: form.type,
    date: form.date || new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    read_minutes: Number(form.read_minutes) || 5,
    image: form.image,
    status,
    seo_title: form.seo_title,
    meta_description: form.meta_description || form.excerpt,
    sections: parseBody(form.body),
  });

  const handleAuthError = (err) => {
    const s = err?.response?.status;
    if (s === 401 || s === 403) { toast.error("Session expired. Please log in again."); localStorage.removeItem("ic-admin-jwt"); setToken(""); }
    else if (s === 409) toast.error("Content with this slug already exists.");
    else toast.error(err?.response?.data?.detail || "Save failed.");
  };

  const save = async (status) => {
    if (!form.title.trim() || !form.excerpt.trim()) { toast.error("Title and excerpt are required."); return; }
    setBusy(true);
    try {
      if (editing) {
        await axios.put(`${API}/insights/${editing}`, payloadFor(status), auth);
        toast.success(status === "published" ? "Updated & published." : "Draft updated.");
      } else {
        await axios.post(`${API}/insights`, payloadFor(status), auth);
        const dest = TYPES.find((t) => t.value === form.type)?.label || "Content";
        toast.success(status === "published" ? `${dest} published.` : `${dest} saved as draft.`);
      }
      setForm({ ...initial, type: form.type });
      setEditing(null);
      setSlugTouched(false);
      load();
    } catch (err) {
      handleAuthError(err);
    } finally {
      setBusy(false);
    }
  };

  const uploadImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const { data } = await axios.post(`${API}/admin/upload`, fd, auth);
      setForm((f) => ({ ...f, image: data.url }));
      toast.success("Image uploaded.");
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Upload failed.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const startEdit = (p) => {
    setEditing(p.slug);
    setSlugTouched(true);
    setForm({
      title: p.title, slug: p.slug, excerpt: p.excerpt, category: p.category, date: p.date,
      read_minutes: p.read_minutes, image: p.image || "", body: bodyToText(p.sections),
      type: p.type || "article", seo_title: p.seo_title || "", meta_description: p.meta_description || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => { setEditing(null); setForm({ ...initial, type: form.type }); setSlugTouched(false); };

  const remove = async (slug) => {
    try {
      await axios.delete(`${API}/insights/${slug}`, auth);
      toast.success("Deleted.");
      if (editing === slug) cancelEdit();
      load();
    } catch {
      toast.error("Delete failed.");
    }
  };

  const signOut = () => { localStorage.removeItem("ic-admin-jwt"); setToken(""); setLogin({ email: "", password: "" }); };

  return (
    <div data-testid="adminia-page">
      <SEO title="Admin" description="Internal content administration." path="/adminia" robots="noindex, nofollow" />
      <section className="ic-hero-grid min-h-screen bg-white">
        <div className="ic-container-narrow px-6 pb-24 pt-32 lg:px-0 lg:pt-44">
          {!authed ? (
            <Reveal>
              <Badge tone="red" className="mb-6">Restricted</Badge>
              <h1 className="font-display text-[34px] font-bold tracking-[-0.5px] text-brand-ink">infocure admin</h1>
              <p className="mt-4 max-w-md font-body text-[15px] text-brand-slate">Sign in with your authorized admin account.</p>
              <form onSubmit={doLogin} className="mt-8 max-w-md space-y-3" data-testid="admin-login-form">
                <input type="email" required aria-label="Admin email" autoComplete="username" data-testid="admin-email" placeholder="Email" value={login.email} onChange={(e) => setLogin({ ...login, email: e.target.value })} className={inputCls} />
                <input type="password" required aria-label="Admin password" autoComplete="current-password" data-testid="admin-password" placeholder="Password" value={login.password} onChange={(e) => setLogin({ ...login, password: e.target.value })} className={inputCls} />
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
                    <h1 className="font-display text-[34px] font-bold tracking-[-0.5px] text-brand-ink">
                      {editing ? "Edit content" : "Create content"}
                    </h1>
                  </div>
                  <button data-testid="admin-logout" onClick={signOut} className="inline-flex items-center gap-2 font-body text-[13px] font-semibold text-brand-slate hover:text-brand-red">
                    <LogOut className="h-4 w-4" /> Sign out
                  </button>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="mt-10 rounded-card border border-brand-mist bg-white p-8 shadow-card" data-testid="publish-form">
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
                    <input required aria-label="Title" data-testid="publish-title" placeholder="Title *" value={form.title} onChange={update("title")} className={`${inputCls} sm:col-span-2`} />
                    <input aria-label="URL slug" data-testid="publish-slug" placeholder="url-slug" value={form.slug} onChange={(e) => { setSlugTouched(true); setForm({ ...form, slug: slugify(e.target.value) }); }} className={inputCls} disabled={Boolean(editing)} />
                    <input aria-label="Category" data-testid="publish-category" placeholder="Category (e.g. SAP, ERP, AI)" value={form.category} onChange={update("category")} className={inputCls} />
                    <input aria-label="Date" data-testid="publish-date" placeholder="Date (e.g. July 2026)" value={form.date} onChange={update("date")} className={inputCls} />
                    <input type="number" min="1" aria-label="Read minutes" data-testid="publish-readtime" placeholder="Read minutes" value={form.read_minutes} onChange={update("read_minutes")} className={inputCls} />
                    <textarea required aria-label="Excerpt" data-testid="publish-excerpt" placeholder="Excerpt (1–2 sentences) *" rows={2} value={form.excerpt} onChange={update("excerpt")} className={`${inputCls} resize-none sm:col-span-2`} />
                  </div>

                  <div className="mt-4">
                    <div className="mb-2 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-slate">Featured image</div>
                    <div className="flex flex-wrap items-center gap-3">
                      <button type="button" data-testid="upload-image-btn" onClick={() => fileRef.current?.click()} disabled={uploading} className="inline-flex h-11 items-center gap-2 rounded-button border border-brand-mist bg-white px-5 font-body text-[14px] font-semibold text-brand-ink hover:border-brand-red/40">
                        <Upload className="h-4 w-4" /> {uploading ? "Uploading…" : "Upload image"}
                      </button>
                      <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={uploadImage} className="hidden" data-testid="upload-image-input" />
                      <input aria-label="Image URL" data-testid="publish-image" placeholder="…or paste image URL" value={form.image} onChange={update("image")} className={`${inputCls} flex-1 min-w-[220px]`} />
                    </div>
                    {form.image ? (
                      <img src={form.image} alt="Featured preview" data-testid="image-preview" className="mt-3 h-32 w-auto rounded-card border border-brand-mist object-cover" />
                    ) : null}
                  </div>

                  <textarea required aria-label="Body content" data-testid="publish-body" placeholder={"Body * — blank line between paragraphs.\nStart a line with '## ' for a heading."} rows={12} value={form.body} onChange={update("body")} className={`${inputCls} mt-4 resize-y font-mono2 text-[13.5px]`} />

                  <div className="mt-6 rounded-card border border-brand-mist bg-brand-cloud p-5">
                    <div className="mb-3 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-slate">SEO</div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <input aria-label="SEO title" data-testid="publish-seo-title" placeholder="SEO title (defaults to title)" value={form.seo_title} onChange={update("seo_title")} maxLength={70} className={inputCls} />
                        <div className="mt-1 text-right font-body text-[11px] text-brand-slate">{form.seo_title.length}/70</div>
                      </div>
                      <div>
                        <input aria-label="Meta description" data-testid="publish-meta-desc" placeholder="Meta description (defaults to excerpt)" value={form.meta_description} onChange={update("meta_description")} maxLength={160} className={inputCls} />
                        <div className="mt-1 text-right font-body text-[11px] text-brand-slate">{form.meta_description.length}/160</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <button type="button" disabled={busy} data-testid="save-draft-btn" onClick={() => save("draft")} className="inline-flex h-12 items-center gap-2 rounded-button border border-brand-mist bg-white px-6 font-body text-[14.5px] font-semibold text-brand-ink hover:border-brand-red/40">
                      <Save className="h-4 w-4" /> Save as Draft
                    </button>
                    <button type="button" disabled={busy} data-testid="preview-btn" onClick={() => setPreview(true)} className="inline-flex h-12 items-center gap-2 rounded-button border border-brand-mist bg-white px-6 font-body text-[14.5px] font-semibold text-brand-ink hover:border-brand-red/40">
                      <Eye className="h-4 w-4" /> Preview
                    </button>
                    <button type="button" disabled={busy} data-testid="publish-submit" onClick={() => save("published")} className="ic-btn-primary inline-flex h-12 items-center gap-2 px-7">
                      <Send className="h-4 w-4" /> {busy ? "Working…" : editing ? "Update & Publish" : "Publish"}
                    </button>
                    {editing ? (
                      <button type="button" data-testid="cancel-edit-btn" onClick={cancelEdit} className="inline-flex h-12 items-center gap-2 rounded-button px-4 font-body text-[14px] font-semibold text-brand-slate hover:text-brand-red">
                        <X className="h-4 w-4" /> Cancel edit
                      </button>
                    ) : null}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.12}>
                <h2 className="mt-16 mb-6 font-display text-[24px] font-semibold text-brand-ink">All content</h2>
                <div className="space-y-3" data-testid="admin-content-list">
                  {posts.map((p) => (
                    <div key={p.slug} className="flex items-center justify-between gap-4 rounded-card border border-brand-mist bg-white p-5 shadow-card">
                      <div className="min-w-0">
                        <p className="truncate font-display text-[16px] font-semibold text-brand-ink">{p.title}</p>
                        <p className="mt-1 font-body text-[12.5px] text-brand-slate">
                          <span className={`rounded px-2 py-0.5 font-semibold ${p.status === "draft" ? "bg-amber-100 text-amber-700" : "bg-brand-red/10 text-brand-red"}`}>{p.status === "draft" ? "draft" : p.type || "article"}</span>
                          {" · "}{p.category} · /insights/{p.slug}
                        </p>
                      </div>
                      <div className="flex flex-none items-center gap-2">
                        <button onClick={() => startEdit(p)} data-testid={`admin-edit-${p.slug}`} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-mist text-brand-ink hover:border-brand-red hover:text-brand-red" aria-label={`Edit ${p.title}`}>
                          <Pencil className="h-4 w-4" />
                        </button>
                        {p.status !== "draft" ? (
                          <a href={`/insights/${p.slug}`} data-testid={`admin-view-${p.slug}`} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-mist text-brand-ink hover:border-brand-red hover:text-brand-red" aria-label={`View ${p.title}`}>
                            <ArrowRight className="h-4 w-4" />
                          </a>
                        ) : null}
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

      {preview ? (
        <div className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-black/60 p-6 backdrop-blur-sm" data-testid="preview-modal" onClick={() => setPreview(false)}>
          <div className="my-10 w-full max-w-3xl rounded-card bg-white p-8 shadow-2xl lg:p-12" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <Badge tone="red">Preview — not published</Badge>
              <button onClick={() => setPreview(false)} data-testid="preview-close" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-mist text-brand-ink hover:border-brand-red hover:text-brand-red" aria-label="Close preview">
                <X className="h-4 w-4" />
              </button>
            </div>
            {form.image ? <img src={form.image} alt="" className="mt-6 max-h-64 w-full rounded-card object-cover" /> : null}
            <div className="mt-6 font-body text-[12px] font-semibold uppercase tracking-[0.16em] text-brand-red">
              {TYPES.find((t) => t.value === form.type)?.label} · {form.category} · {form.date || "Today"} · {form.read_minutes} min read
            </div>
            <h1 className="mt-3 font-display text-[30px] font-bold leading-tight tracking-[-0.5px] text-brand-ink">{form.title || "Untitled"}</h1>
            <p className="mt-3 font-body text-[16px] leading-relaxed text-brand-slate">{form.excerpt}</p>
            <div className="mt-8 space-y-5 border-t border-brand-mist pt-8">
              {parseBody(form.body).map((s, i) =>
                s.h ? (
                  <h2 key={i} className="font-display text-[22px] font-semibold text-brand-ink">{s.h}</h2>
                ) : (
                  <p key={i} className="font-body text-[15.5px] leading-relaxed text-brand-slate">{s.p}</p>
                )
              )}
            </div>
            <div className="mt-8 border-t border-brand-mist pt-5 font-body text-[12px] text-brand-slate">
              SEO title: {form.seo_title || form.title || "—"} · Meta description: {form.meta_description || form.excerpt || "—"} · URL: /insights/{slugify(form.slug || form.title) || "…"}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
