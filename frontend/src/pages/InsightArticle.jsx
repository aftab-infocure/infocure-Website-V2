import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import SEO from "@/components/site/SEO";
import { Reveal } from "@/components/ref/motion";
import { Badge } from "@/components/ref/ui";
import { CTABand } from "@/components/ref/sections";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function InsightArticle() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    axios
      .get(`${API}/insights/${slug}`)
      .then((r) => setPost(r.data))
      .catch(() => setMissing(true));
  }, [slug]);

  if (missing) {
    return (
      <div className="ic-container px-6 py-40 text-center" data-testid="insight-not-found">
        <h1 className="font-display text-[32px] font-bold text-brand-ink">Article not found.</h1>
        <Link to="/insights" className="mt-6 inline-flex items-center gap-2 font-body text-[15px] font-semibold text-brand-red">
          <ArrowLeft className="h-4 w-4" /> Back to insights
        </Link>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="ic-container px-6 py-40 text-center" data-testid="insight-loading">
        <p className="font-body text-[15px] text-brand-slate">Loading…</p>
      </div>
    );
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image || undefined,
    author: { "@type": "Organization", name: "infocure technologies" },
  };

  return (
    <div data-testid={`insight-article-${slug}`}>
      <SEO title={post.title} description={post.excerpt} path={`/insights/${slug}`} jsonLd={articleJsonLd} />

      <section className="ic-hero-grid relative isolate overflow-hidden bg-white">
        <div className="ic-container-narrow relative px-6 pb-14 pt-32 lg:px-0 lg:pt-44">
          <Reveal>
            <Link to="/insights" data-testid="insight-back" className="mb-8 inline-flex items-center gap-2 font-body text-[13.5px] font-semibold text-brand-slate hover:text-brand-red">
              <ArrowLeft className="h-4 w-4" /> All insights
            </Link>
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="red">{post.category}</Badge>
              <span className="font-body text-[13px] text-brand-slate">{post.date} · {post.read_minutes} min read</span>
            </div>
            <h1 className="mt-6 font-display text-[32px] font-bold leading-[1.1] tracking-[-0.5px] text-brand-ink lg:text-[48px]">
              {post.title}
            </h1>
            <p className="mt-5 font-body text-[17px] leading-relaxed text-brand-slate lg:text-[18px]">{post.excerpt}</p>
          </Reveal>
        </div>
      </section>

      {post.image ? (
        <div className="ic-container-narrow px-6 lg:px-0">
          <Reveal>
            <div className="overflow-hidden rounded-card border border-brand-mist">
              <img src={post.image} alt="" className="aspect-[21/9] w-full object-cover" />
            </div>
          </Reveal>
        </div>
      ) : null}

      <section className="bg-white">
        <div className="ic-container-narrow space-y-10 px-6 py-16 lg:px-0 lg:py-20">
          {post.sections.map((s, i) => (
            <Reveal key={i} delay={0.03 * i}>
              <div>
                {s.h ? <h2 className="mb-4 font-display text-[24px] font-semibold tracking-[-0.2px] text-brand-ink">{s.h}</h2> : null}
                <p className="font-body text-[16.5px] leading-[1.8] text-brand-slate">{s.p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTABand
        eyebrow="Let's talk"
        title="Reading is the easy part. Let's discuss your programme."
        subtitle="Schedule a 30-minute working call with a senior consultant."
        primaryCta={{ label: "Schedule a Consultation", href: "/contact" }}
        secondaryCta={{ label: "Explore Services", href: "/services/digital-transformation" }}
      />
    </div>
  );
}
