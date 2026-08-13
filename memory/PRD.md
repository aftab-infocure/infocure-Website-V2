# PRD — infocure technologies Website

## Original Problem Statement
Full-stack corporate website for infocure technologies (SAP/Oracle/Salesforce consulting, enterprise products, team augmentation). Latest mandate (FINAL, LOCKED IA): restructure navigation & page hierarchy only — no redesign of homepage, UI, layout, typography, colors, buttons, cards, animations, footer/header design, or responsive behaviour.

## Final Locked Navigation (do not change)
HOME · SERVICES (Digital Transformation, SAP Consulting, Oracle Consulting, Salesforce Consulting, Build & Cloud) · TEAM AUGMENTATION (no dropdown) · PRODUCTS (product names only) · INDUSTRIES (industry names only) · INSIGHTS (Articles, Case Studies, Blog) · ABOUT (Company, Leadership, Careers, Contact) · CONTACT · TALK TO AN EXPERT (CTA)

## Architecture
- Frontend: React (CRA/craco), Tailwind, framer-motion, Lenis. `/app/frontend`
- Backend: FastAPI + MongoDB (motor), JWT admin auth, Resend email for contact form. `/app/backend`
- Key files: `src/data/site.js` (locked nav data), `src/data/flagship.js` (flagship page configs), `src/pages/FlagshipPage.jsx` (generic flagship renderer), `src/components/site/SectionNav.jsx` (sticky anchor nav), `src/components/site/Header.jsx`, `Footer.jsx`

## User Personas
- CIO/CTO/CFO evaluating enterprise consulting partners
- Business owners researching ERP/products
- HR/delivery leads seeking team augmentation
- Marketing admin publishing insights (/adminia)

## Implemented
- 2026-08 (earlier): Full site — Home, About, Contact, products (9), industries (6), insights/articles/blog/case-studies, solutions pages, SAP/Oracle/general capability pages, admin insights manager, contact form.
- 2026-08-12: FINAL IA LOCK —
  - Top nav rebuilt to locked structure; all dropdowns standardized (same 300px panel, padding, radius, shadow, animation, left-aligned below parent).
  - 5 flagship service landing pages with sticky section nav: /services/digital-transformation (uses /media/dt-hero.mp4 hero video), /services/sap-consulting (16 sections), /services/oracle-consulting, /services/salesforce-consulting, /services/build-cloud.
  - Team Augmentation moved to top-level /team-augmentation (9 merged sections); /services/team-augmentation redirects.
  - About page gained Leadership & Careers anchor sections.
  - Footer links updated to flagship pages. Sitemap updated with new URLs.
  - Legacy capability pages (/services/sap/*, /services/oracle/*, /services/ai, /rpa, /software-development, /cyber-security, /salesforce, /solutions/*) retained for SEO, removed from navigation.

- 2026-08-13: PRODUCTION-READY QA PASS —
  - Contact enquiries now email annie@infocure.in + aftab@infocure.in via Emergent managed email (EMERGENT_EMAIL_KEY in backend/.env; template + guardrail gate server-side).
  - Form hardening: server + client phone validation, blank-field rejection, ARIA labels, autocomplete attrs.
  - SEO: SEO.jsx now emits og:type/image/site_name + Twitter cards on every page; static duplicate canonical removed from index.html (one correct canonical per page); all pages have unique title/description/H1; sitemap.xml + robots.txt verified.
  - Accessibility: skip-to-content link, Escape closes menus, focus-visible ring already global, all images have alt.
  - Performance: LazyVideo everywhere, DT hero poster wired, code splitting (24 lazy chunks), prod build 0 warnings, main bundle 169.66 kB gzip.
  - Cleanup: removed duplicate AdminInsights page (/admin/insights redirects to /adminia) and unused constants/testIds; no console.logs; no console errors.
  - Responsive: zero horizontal overflow on 8 key pages × 7 widths (320–1920).

- 2026-08-13: DT PAGE EXECUTIVE CONTENT PASS — /services/digital-transformation rewritten with executive-level messaging (design unchanged): new hero headline/subhead/CTAs, Business Challenges (10), Business-First Approach (10 steps), 10 Capability cards, 10 Business Outcomes, 8 Industry Expertise cards, 10 Technology Ecosystem cards, 8-stage horizontal Methodology timeline, Why Infocure (8 highlights), 9 FAQs, new final CTA, SEO meta title/description per spec. FlagshipPage renderer now supports per-page CTA labels and a "timeline" section kind; SEO.jsx no longer double-brands titles.

- 2026-08-13: EXECUTIVE CONTENT PASS (SAP + ORACLE) — /services/sap-consulting rewritten per spec (challenges chips, 14 service cards, 12 expertise cards, Why-SAP highlights, 9-stage methodology timeline, 8 industry cards, 10 benefit chips, 8 dark Why-Infocure cards, 10 FAQs, new CTAs, spec SEO meta). /services/oracle-consulting rewritten per spec (challenges, 12 service cards, 10 expertise cards, approach highlights, 9-stage timeline, 8 industries, 10 benefits, 8 Why-Infocure cards, 10 FAQs, new CTAs, spec SEO meta). Salesforce/Build&Cloud/TA copy also upgraded to executive tone. Design untouched throughout.

- 2026-08-13: EXECUTIVE CONTENT PASS (SALESFORCE) — /services/salesforce-consulting rewritten per spec (9 challenge chips, 12 service cards, 10 expertise cards, 7 approach highlights, 9-stage methodology timeline, 8 industry cards, 10 benefit chips, 8 dark Why-Infocure cards, 10 FAQs, spec hero/final CTAs, spec SEO meta). Design untouched.

- 2026-08-13: EXECUTIVE CONTENT PASS (BUILD & CLOUD) — /services/build-cloud rewritten per spec (10 challenge chips, 9 capability cards with spec copy, 8-stage Idea-to-Production timeline, 9 Cloud & Modernization cards, 8 Enterprise Integration cards, 8 Technology Areas cards, 10 outcome chips, 8 dark Why-Infocure cards, 4 Delivery Models cards, 10 FAQs, spec CTAs/SEO). URL /services/build-cloud preserved per redirect strategy instruction. TEAM_AUGMENTATION config restored after splice (regression-checked).

- 2026-08-13: EXECUTIVE CONTENT PASS (TEAM AUGMENTATION) — single landing page rewritten per spec; canonical URL now /services/team-augmentation (nav + footer + sitemap updated; /team-augmentation redirects to it). Sections: challenge chips (8), 10 advantage cards, 4 grouped technology-expertise cards (SAP/Oracle/CRM/Engineering&Cloud), 3 engagement model cards, 6 delivery-coverage cards (delivery capability only — no office claims), 6-stage How-It-Works timeline, 10 use-case chips, 9 dark Why-Infocure cards, Traditional Hiring vs Team Augmentation comparison, 10 FAQs, Hire Consultants CTAs, spec SEO meta. Removed timeline-guarantee stat (2wks → 3 engagement models).

- 2026-08-13: EXECUTIVE CONTENT PASS (CRM) — /products/crm rewritten per spec: new hero headline/subhead/CTAs, 11 sections (challenges chips ×9, solution cards ×7, lead channels incl. website/email/WhatsApp/IndiaMART, 7-stage pipeline timeline, Customer 360 ×8, management dashboards ×8, benefit chips ×10, integration ×8, industry cards ×5, 7-stage implementation timeline, dark Why-Infocure ×7) + 10 FAQs + spec CTA/SEO. ProductPage now renders rich sections+SectionNav+FAQ when a product config defines them (other product pages unchanged). Percentage-based stats/metrics removed from CRM per "no unverified claims" rule.

- 2026-08-13: EXECUTIVE CONTENT PASS (OMS) — /products/oms rewritten per spec: operations-focused messaging distinct from CRM (hero "Orchestrate Every Order From Placement to Fulfillment", 10 challenge chips, 8 capability cards, 8-stage order lifecycle timeline, 6 channel cards, 7 inventory/fulfillment cards, 9 integration cards, 9 management-visibility cards, 10 benefit chips, 7 industry cards, 7-stage implementation timeline, 7 dark Why cards, 10 FAQs, spec CTAs/SEO). URL /products/oms preserved; unverified % stats removed.

- 2026-08-13: EXECUTIVE CONTENT PASS (DMS) — /products/dms rewritten per spec with automotive channel affinity (hero "Connect Your Dealer Network. Strengthen Your Business.", 10 challenge chips, 8 capability cards, 8-stage dealer lifecycle timeline, 10 network-visibility cards, 7 channel-ops cards, 8 automotive cards, 8 integration cards framed with the approved "designed to work with your existing enterprise technology environment" positioning, 8 management-dashboard cards, 10 benefit chips, 8 dark Why cards, 8-stage implementation timeline, 5 industry cards with automotive primary, 10 FAQs, spec CTAs/SEO). URL /products/dms preserved.

- 2026-08-13: EXECUTIVE CONTENT PASS (HRMS) — /products/hrms rewritten per spec (hero "Simplify Workforce Management. Empower Your People.", 10 challenge chips, 8 capability cards, 6-stage employee lifecycle timeline, 7 self-service cards, 8 visibility cards, 8 automation cards, 10 benefit chips, 8 integration cards, 7 industry cards, 8-stage implementation timeline, 8 dark Why cards, 10 FAQs, spec CTAs/SEO). URL /products/hrms preserved.

- 2026-08-13: EXECUTIVE CONTENT PASS (VEHICLE TRACKING) — /products/vehicle-tracking rewritten per spec (hero "Know Where Your Fleet Is. Control How It Operates.", 9 challenge chips, 8 capability cards, 7 fleet-visibility cards, 7 route/trip cards, 8 fleet-operations cards, Logistics/Construction/FMCG scenario sections, 9 management cards, 10 benefit chips, 9 integration cards with SAP-compatibility positioning, 8 dark Why cards, 7-stage implementation timeline, 3 industry cards, 10 FAQs, spec CTAs/SEO). URL /products/vehicle-tracking preserved; unverified % stats removed.

- 2026-08-13: EXECUTIVE CONTENT PASS (PPC) — /products/ppc rewritten per spec (manufacturing-focused hero, 10 challenge chips, 8 capability cards, 8-stage production lifecycle timeline, 9 production-visibility cards, 8 manufacturing-ops cards, 7 SAP/enterprise integration cards with approved compatibility positioning, Manufacturing + Engineering industry cards, 9 management cards, 10 benefit chips, 8 dark Why cards, 8-stage implementation timeline, Related Capabilities section with 6 working cross-links per the Manufacturing → S/4HANA + PPC + Vehicle Tracking + SAP Integration model, 10 FAQs, spec CTAs/SEO). SectionBlock now supports linked cards (design unchanged). URL /products/ppc preserved.

- 2026-08-13: EXECUTIVE CONTENT PASS (EXIM + E-INVOICING) — /products/exim rewritten per spec (hero, 10 challenge chips, 8 capability cards, 8-stage export + 7-stage import lifecycle timelines, documentation/compliance/logistics cards, 9 integration cards with SAP positioning + DGFT/e-BRC, 9 management cards, 10 benefits, 4 industry cards, 8 dark Why cards, 8-stage implementation, 7 cross-links, 10 FAQs, spec CTAs/SEO). /products/e-invoicing rewritten as E-Invoicing Cockpit (hero, 10 challenge chips, 8 capability cards, 8-stage e-invoice lifecycle timeline, 8 validation cards, 8 monitoring cards, 5-stage exception workflow, 9 integration cards (SAP/Oracle/Tally documented), 9 finance-visibility cards, 10 benefits, 7 industry cards, 8 dark Why cards, 8-stage implementation, 6 cross-links, 10 FAQs, spec CTAs/SEO). URLs preserved.

## Backlog / Next
- P1: Server-side 301 for /services/team-augmentation if SEO demands it (currently client-side redirect).
- P2: Admin-editable flagship page content.
- P2: Analytics events on section-nav usage.
