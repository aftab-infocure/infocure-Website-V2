import { Helmet } from "react-helmet-async";
import { SITE } from "@/data/site";

export default function SEO({ title, description, path = "/", jsonLd }) {
  const url = `${SITE.domain}${path}`;
  const fullTitle = title ? `${title} | infocure technologies` : "infocure technologies — Enterprise Digital Transformation Consulting";
  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={url} />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
}
