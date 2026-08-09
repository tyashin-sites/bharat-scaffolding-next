# Bharat Scaffolding — marketing site (Tyashin)

Next.js 15 + OpenNext on Cloudflare Workers, dispatched via the Tyashin platform.

- **Customer:** Bharat Scaffolding Pvt. Ltd. (formerly presented as Preet Bharat Group)
- **Tyashin project:** `bharat-scaffolding` (id `6a78f8580d4336cd5bf428be`)
- **Domain:** preetbharat.com (cutover user-gated) · preview `bharat-scaffolding.sites.tyashin.com`
- **Archetype:** B2B manufacturer / marketing site — NO e-commerce; conversion = enquiry (call / WhatsApp / form)

## Facts discipline

Every fact on this site traces to the approved sales brochure v6.2 (precedence) or
preetbharat.com (gap-fill). See `docs/BUILD-PLAN.md` (facts ledger) and
`docs/ASSET-DEBT.md` (open placeholders). Never invent prices, codes, testimonials or stats.

## Develop

```bash
npm install
npm run dev
```

## Deploy

Pushed to `main` → GitHub Actions (canonical workflow installed by the platform's `/adopt`
endpoint — never hand-edit `deploy.yml`). See `~/.claude/skills/tyashin-nextjs-port`.
