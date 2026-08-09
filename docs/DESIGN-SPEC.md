# Bharat Scaffolding — Design Spec (single source of truth; deviations are bugs)

## Thesis

**"Engineered steel, delivered on time."** The site should feel like the product: precise,
load-bearing, unornamented strength. Every screen answers a project director's only three
questions — *can they supply at my scale, can I trust the material, how fast can I get it.*

**Anti-goals:** no e-commerce pretence (no carts, no prices — hire is by written quotation);
no stock construction photos; no invented testimonials/stats; no playful/startup tone; no
rainbow gradients.

## Audience

Infrastructure EPC contractors, metro/govt project engineers, real-estate developers,
industrial plant maintenance heads. They arrive from a referral, a tender search, or the
brochure. Decision horizon: weeks. Conversion = an enquiry (call / WhatsApp / form), never a
transaction.

## Color system (tokens in `globals.css`, mapped in `tailwind.config.ts`)

| Token | Hex | Usage |
|---|---|---|
| `--primary` (brick) | `#9B2C24` | CTAs, accents, section labels — ~10% of any screen |
| `--charcoal` | `#211E1C` | Text, dark "steel" sections |
| `--steel` | `#3D3A38` | Secondary dark surface, logo charcoal |
| `--background` (paper) | `#FAF8F5` | Page base |
| `--surface` | `#FFFFFF` | Cards |
| `--muted` | `#6B6560` | Secondary text |
| `--border` | `#E4DFD9` | Rules, hairlines |
| `--brick-deep` | `#7A1F19` | Hover states on primary |

Matches the published Tyashin brand kit exactly. The brochure's product renders are
oxide-red steel on white — the site palette is the same world.
**FORBIDDEN:** blues, purples, teals, neon, multi-hue gradients, pure black `#000`.

## Typography

- Display: **Archivo** (700/800, tight tracking, uppercase for section labels) via `next/font`.
- Body: **Inter** (400/500/600) via `next/font`.
- Scale: hero `clamp(2.5rem,6vw,4.5rem)`; section heads `clamp(1.75rem,3.5vw,2.75rem)`; body 16–18px.
- Hard text budgets: hero headline ≤ 8 words; section intro ≤ 30 words; card body ≤ 28 words.

## Spacing / grid / surfaces

12-col grid, max-w-7xl, generous `py-20 md:py-28` sections. Radius small (`0.25rem`) —
architectural, not bubbly. Hairline borders over shadows; one shadow tier for lifted cards.
Section rhythm alternates paper → white → **charcoal "steel" showroom sections** (dark
sections carry the red accents and white type — audit contrast, no black-on-black).

## Motion (tiers; all behind `prefers-reduced-motion`)

1. **Reveal-on-scroll** — IntersectionObserver adds `.in-view`; CSS transforms
   (translateY 24px→0 + fade, 500ms, staggered 60ms per child). No JS animation lib —
   performance budget wins.
2. **Counters** — stat numbers (45+, 750, 5, 6) count up once on first view.
3. **Marquee** — client names scroll in a slow CSS marquee (pausable, reduced-motion static).
4. **Micro** — CTA hover lift 2px, card hover border→brick, image scale 1.03.
5. **Hero** — staged entrance (headline lines rise, stat bar slides), pure CSS keyframes.

Banned: parallax scroll-jack, cursor followers, 3D tilt, autoplay video.

## Imagery

Only brochure-extracted assets (product spec cards, cover art) and CSS-built texture
(steel-grid pattern via repeating-linear-gradient). No stock photos, no AI photo-realism.
Product renders appear on their oxide-red/white spec cards from the approved brochure v6.2.

## Signature components

- **Stat bar** — 45+ Years · 750 T/Day · 5 Manufacturing Units · 6 Cities (counters).
- **Process rail** — 6-step Enquiry→Pickup horizontal rail with connecting line.
- **Rent-vs-Buy ledger** — two-column comparison, brick ticks vs muted crosses.
- **Client wall** — text-set client names (DMRC, ISRO, DLF…) as engraved plates; no logos
  (we hold no logo usage rights).
- **Floating enquiry dock** — call + WhatsApp buttons, bottom-right, dismiss-aware.

## Page blueprints (one intent per URL)

| Route | Intent | Key sections |
|---|---|---|
| `/` | "India-scale scaffolding partner" | hero+stats, client marquee, why-us (6), sectors (8), product preview (6 of 14), process rail, rent-vs-buy, sustainability strip, CTA |
| `/products` | index of all 14 systems | intro, grid by group (Cuplock / Shuttering & Formwork / Access & Safety / Components) |
| `/products/[slug]` | one system's full spec | breadcrumb, overview, spec + sizes tables (typed from brochure), applications, features, brochure card image, related grid, enquiry CTA |
| `/about` | trust: 45 years, 3 generations | story, chairman's desk (Jhujhar Singh & Chandeep Singh), manufacturing (5 units, machine list), safety commitment, sustainability |
| `/projects` | proof of national scale | landmark projects grid (9 from brochure), sectors served, client wall |
| `/catalog` | give the brochure | download card (PDF), page highlights |
| `/contact` | start the enquiry | form (platform lead capture), 6 office cards with addresses, phones, email |
| `/blog` | dormant until posts | native blog per platform pattern |

## UX laws

One primary CTA per screen ("Get a Quote" / "Talk to Us"). 5-second test: any page must
communicate *scaffolding rental & manufacturing, pan-India, since 1981* in 5s. WCAG AA
contrast everywhere (brick on paper = 6.4:1 ✓; on charcoal sections only white/paper text).
No ghost links; nav and footer only link built routes.

## Performance budget (design constraint — if an idea breaks it, the idea loses)

- No client-side animation framework; motion = CSS + one ~1KB IntersectionObserver hook.
- LCP element = hero headline (text) — no hero image blocking.
- Brochure page images served resized/AVIF-ready via `next/image`, lazy below fold.
- JS budget: no added deps beyond scaffold (lucide icons tree-shaken).
- Catalogue PDF < 25 MiB (CF static asset cap) — compressed from the 39 MB master.

## Facts discipline

Every number/name on the site traces to the approved brochure v6.2 (precedence) or
preetbharat.com (fallback). Placeholders and unconfirmed items live in `ASSET-DEBT.md` and
block go-live until cleared.
