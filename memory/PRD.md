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

## Backlog / Next
- P1: Server-side 301 for /services/team-augmentation if SEO demands it (currently client-side redirect).
- P2: Admin-editable flagship page content.
- P2: Analytics events on section-nav usage.
