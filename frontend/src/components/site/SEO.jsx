import { Helmet } from "react-helmet-async";
import { SITE } from "@/data/site";

const OG_IMAGE = `${SITE.domain}/images/og-image.jpg`;

export default function SEO({ title, description, path = "/", jsonLd }) {
  const url = `${SITE.domain}${path}`;
  const fullTitle = title
    ? /infocure/i.test(title) ? title : `${title} | infocure technologies`
    : "infocure technologies — Enterprise Digital Transformation Consulting";
  const desc = description || "SAP, Oracle, Salesforce, AI and enterprise products — engineered end to end for global enterprises since 2014.";
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="infocure technologies" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:alt" content="infocure technologies — enterprise digital transformation consulting" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={OG_IMAGE} />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
}
