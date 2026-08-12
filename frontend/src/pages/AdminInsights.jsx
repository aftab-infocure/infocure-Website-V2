import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Trash2, ArrowRight, Eye } from "lucide-react";
import SEO from "@/components/site/SEO";
import { Reveal } from "@/components/ref/motion";
import { Badge } from "@/components/ref/ui";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const inputCls =
  "w-full rounded-button border border-brand-mist bg-white px-4 py-3 font-body text-[15px] text-brand-ink placeholder:text-brand-slate/60 outline-none transition-colors duration-150 focus:border-brand-red";

const slugify = (s) =>
  s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");

const initial = { title: "", excerpt: "", category: "Perspective", date: "", read_minutes: 5, image: "", body: "" };

function parseBody(body) {
  return body
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) =>
      block.startsWith("## ")
        ? { h: block.slice(3).trim(), p: "" }
        : { h: null, p: block.replace(/\n/g, " ") }
    )
    .filter((s) => s.p || s.h);
}

export default function AdminInsights() {
  const [key, setKey] = useState(() => localStorage.getItem("ic-admin-key") || "");
  const [keyInput, setKeyInput] = useState("");
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState(initial);
  const [publishing, setPublishing] = useState(false);

  const authed = Boolean(key);

  const load = () =>
    axios.get(`${API}/insights`).then((r) => setPosts(r.data)).catch(() => setPosts([]));

  useEffect(() => {
    if (authed) load();
  }, [authed]);

  const saveKey = (e) => {
    e.preventDefault();
    localStorage.setItem("ic-admin-key", keyInput);
    setKey(keyInput);
  };

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const publish = async (e) => {
    e.preventDefault();
    setPublishing(true);
    try {
      const payload = {
        slug: slugify(form.title),
        title: form.title,
        excerpt: form.excerpt,
        category: form.category,
        date: form.date || new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
        read_minutes: Number(form.read_minutes) || 5,
        image: form.image,
        sections: parseBody(form.body),
      };
      await axios.post(`${API}/insights`, payload, { headers: { "X-Admin-Key": key } });
      toast.success("Article published.");
      setForm(initial);
      load();
    } catch (err) {
      const status = err?.response?.status;
      if (status === 401) toast.error("Invalid admin key.");
      else if (status === 409) toast.error("An article with this slug already exists.");
      else toast.error("Publishing failed. Please try again.");
    } finally {
      setPublishing(false);
    }
  };

  const remove = async (slug) => {
    try {
      await axios.delete(`${API}/insights/${slug}`, { headers: { "X-Admin-Key": key } });
      toast.success("Article deleted.");
      load();
    } catch {
      toast.error("Delete failed.");
    }
  };

  return (
    <div data-testid="admin-insights-page">
      <SEO title="Insights Publisher" description="Internal article publishing." path="/admin/insights" />
      <section className="ic-hero-grid min-h-screen bg-white">
        <div className="ic-container-narrow px-6 pb-24 pt-32 lg:px-0 lg:pt-44">
          {!authed ? (
            <Reveal>
              <Badge tone="red" className="mb-6">Restricted</Badge>
              <h1 className="font-display text-[34px] font-bold tracking-[-0.5px] text-brand-ink">Insights publisher</h1>
              <p className="mt-4 max-w-md font-body text-[15px] text-brand-slate">Enter the admin key to manage articles.</p>
              <form onSubmit={saveKey} className="mt-8 flex max-w-md gap-3" data-testid="admin-key-form">
                <input
                  type="password"
                  required
                  data-testid="admin-key-input"
                  placeholder="Admin key"
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                  className={inputCls}
                />
                <button type="submit" data-testid="admin-key-submit" className="ic-btn-primary h-12 flex-none px-6">
                  Continue
                </button>
              </form>
            </Reveal>
          ) : (
            <>
              <Reveal>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <Badge tone="red" className="mb-4">Publisher</Badge>
                    <h1 className="font-display text-[34px] font-bold tracking-[-0.5px] text-brand-ink">Publish a new insight</h1>
                  </div>
                  <button
                    data-testid="admin-logout"
                    onClick={() => { localStorage.removeItem("ic-admin-key"); setKey(""); setKeyInput(""); }}
                    className="font-body text-[13px] font-semibold text-brand-slate hover:text-brand-red"
                  >
                    Sign out
                  </button>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <form onSubmit={publish} className="mt-10 rounded-card border border-brand-mist bg-white p-8 shadow-card" data-testid="publish-form">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input required data-testid="publish-title" placeholder="Article title *" value={form.title} onChange={update("title")} className={`${inputCls} sm:col-span-2`} />
                    <textarea required data-testid="publish-excerpt" placeholder="Excerpt (1–2 sentences) *" rows={2} value={form.excerpt} onChange={update("excerpt")} className={`${inputCls} resize-none sm:col-span-2`} />
                    <input data-testid="publish-category" placeholder="Category (e.g. Executive Guide)" value={form.category} onChange={update("category")} className={inputCls} />
                    <input data-testid="publish-date" placeholder="Date (e.g. July 2026)" value={form.date} onChange={update("date")} className={inputCls} />
                    <input type="number" min="1" data-testid="publish-readtime" placeholder="Read minutes" value={form.read_minutes} onChange={update("read_minutes")} className={inputCls} />
                    <input data-testid="publish-image" placeholder="Image URL (optional)" value={form.image} onChange={update("image")} className={inputCls} />
                  </div>
                  <textarea
                    required
                    data-testid="publish-body"
                    placeholder={"Body * — blank line between paragraphs.\nStart a line with '## ' for a heading."}
                    rows={12}
                    value={form.body}
                    onChange={update("body")}
                    className={`${inputCls} mt-4 resize-y font-mono2 text-[13.5px]`}
                  />
                  <button type="submit" disabled={publishing} data-testid="publish-submit" className="ic-btn-primary mt-6 inline-flex h-12 items-center gap-2 px-7">
                    {publishing ? "Publishing…" : "Publish article"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              </Reveal>

              <Reveal delay={0.12}>
                <h2 className="mt-16 mb-6 font-display text-[24px] font-semibold text-brand-ink">Published articles</h2>
                <div className="space-y-3" data-testid="admin-articles-list">
                  {posts.map((p) => (
                    <div key={p.slug} className="flex items-center justify-between gap-4 rounded-card border border-brand-mist bg-white p-5 shadow-card">
                      <div className="min-w-0">
                        <p className="truncate font-display text-[16px] font-semibold text-brand-ink">{p.title}</p>
                        <p className="mt-1 font-body text-[12.5px] text-brand-slate">{p.category} · {p.date} · /insights/{p.slug}</p>
                      </div>
                      <div className="flex flex-none items-center gap-2">
                        <a
                          href={`/insights/${p.slug}`}
                          data-testid={`admin-view-${p.slug}`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-mist text-brand-ink hover:border-brand-red hover:text-brand-red"
                          aria-label={`View ${p.title}`}
                        >
                          <Eye className="h-4 w-4" />
                        </a>
                        <button
                          onClick={() => remove(p.slug)}
                          data-testid={`admin-delete-${p.slug}`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-mist text-brand-ink hover:border-brand-red hover:bg-brand-red hover:text-white"
                          aria-label={`Delete ${p.title}`}
                        >
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
