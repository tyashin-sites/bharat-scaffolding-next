# Bharat Scaffolding — Build Plan (gated phases)

Project: `bharat-scaffolding` (id `6a78f8580d4336cd5bf428be`) · Repo: `tyashin-sites/bharat-scaffolding-next` (PUBLIC)
Worker: `site-bharat-scaffolding-next` · Preview: `bharat-scaffolding.sites.tyashin.com` · Future domain: `preetbharat.com`

| Phase | Deliverables | Exit gate |
|---|---|---|
| 0 Guardrails | Scaffold from wonderlyar-next base; wrangler/next.config rewired; ROBOTS_NOINDEX=true; spec docs committed | qa: config review |
| 1 Design system | globals.css tokens, tailwind map, fonts, reveal/counter/marquee primitives | design: token audit vs DESIGN-SPEC |
| 2 Core pages | `/`, `/products`, `/products/[slug]` ×14, `/about`, `/projects`, `/contact`, `/catalog` | design+brand: page audit; qa: typecheck+build |
| 3 SEO/LLM surface | seo.ts identity, per-page metadata, knowledge graph (Organization+knowsAbout), sitemap-pages.xml, link-mesh check | seo: coverage gate (routes vs sitemap = zero misses; every page ≥1 inbound link) |
| 4 Trust/compliance | Legal wrappers (platform HTML), footer bar, Tyashin attribution, contact form wired to platform lead capture | brand+qa |
| 5 Perf/hardening | PDF < 25MiB, images optimized, reduced-motion audit, dark-section contrast audit | qa: build + local preview smoke |
| 6 Ship | push → `/adopt` (fresh JWT) → build webhook → verify worker + blog ownership → CUSTOMERS.md + safe-deploy registry | user-gated: domain cutover + SEO Co-Pilot install + ROBOTS flip |

Every change names the KPI it serves (enquiries started / brochure downloads / organic
impressions). Anything serving none is cut.

## Facts ledger (source of truth per fact)

- Brochure v6.2 (approved, precedence): name "Bharat Scaffolding Pvt. Ltd.", since 1981 /
  45+ years / three generations, 5 manufacturing units, 750 T/day, 6 cities + full
  addresses, phones +91-9990560300 / +91-9811560300, hire@preetbharat.com, LinkedIn
  "Preet Bharat Group", client + project rosters, all 14 product spec sheets, 6-step
  process, sustainability claims (incl. ~80% CO₂ recycled-steel stat), machine list.
- preetbharat.com (fallback for gaps): landline 011-43090300, 250+ employees, 50+ clients,
  principles "Trust, Integrity, Quality".
- Conflicts resolved to brochure: 45+ years (not 40+), 6 locations incl. Mumbai (not 5),
  Ahmedabad PIN 382170 (not 382210).
