# Cuplock material estimator: formula for technical sign-off

**For:** Bharat Scaffolding technical team
**Page:** `/scaffolding-on-rent` (not live; held until this document is signed off)
**Code:** `src/lib/estimator.ts`. The worked examples below are pinned by `tests/estimator.test.mjs`, so the page produces exactly these numbers.

The page asks a visitor for five things and gives back a component list with an indicative tonnage. The visitor can send that list to you as an enquiry. Every list is labelled **indicative**: on the page, in the table and in the enquiry email. No prices appear anywhere.

Please check the rules and the three examples, answer the questions at the end, and reply "approved" or send corrections.

## Inputs

| Input | Options |
|---|---|
| Scaffold type | Access, or Support (formwork) |
| Bay length | 1.2, 1.5, 1.8 or 2.0 m. These are the lengths where a ledger, a walkway platform and a toe board all appear in brochure v6.2. The same ledger length is used in both directions (square bays). |
| Bays long (L) | 1 to 20 |
| Width in bays (W) | 1 to 6 |
| Working height (H) | 2.0 to 30.0 m, in 0.5 m steps |

## Rules

1. **Posts** = (L + 1) × (W + 1).
2. **Vertical standards per post:** as many 3.0 m verticals as fit in H, plus one shorter vertical (0.5 to 2.5 m) for the remainder. Example: 7.5 m = 3.0 + 3.0 + 1.5.
3. **Lifts** N = H ÷ 2.0 m, rounded up. One ledger level at each lift, the top one at H, plus a **base set** at the first cup (0.5 m). So there are N + 1 ledger levels.
4. **Ledgers per level** = L × (W + 1) + W × (L + 1). Total ledgers = that × (N + 1).
5. **Base jacks** = one per post.
6. **U-head jacks** = one per post, on support (formwork) scaffolds only.
7. **Access scaffolds only:**
   - one working deck, at the top lift;
   - **walkway platforms** = L × W × (number of 300 mm platforms that fit across one bay: 4 for 1.2 m, 5 for 1.5 m, 6 for 1.8 m, 6 for 2.0 m), each the bay length;
   - **toe boards** = 2 × (L + W), round the deck edge, each the bay length;
   - **access ladders (3.0 m)** = one per lift, in one access bay.
8. **Tonnage** = quantity × brochure weight, for vertical standards (2.25 to 13.50 kg) and ledgers (5.10 / 6.30 / 7.40 / 8.20 kg for 1.2 / 1.5 / 1.8 / 2.0 m). Brochure v6.2 prints no weight for base jacks, U-heads, platforms, toe boards or ladders, so they are counted but **not** in the tonnage. The tonnage row itself is labelled partial and names what is left out, and the enquiry email says the same on its tonnage line.
9. **Not included:** guardrails above the deck, bracing, ties to the structure, couplers, spare material.

## Worked example A: access scaffold along a facade

Access, 1.8 m bays, 10 bays long, 1 bay wide, 6.0 m working height.

- Posts: 11 × 2 = **22**. Lifts: 6 ÷ 2 = 3, so 4 ledger levels.

| Component | Size | Qty | Weight |
|---|---|---|---|
| Cuplock vertical standard | 3.0 m | 44 | 594.00 kg |
| Cuplock horizontal ledger | 1.8 m | 124 = (10×2 + 1×11) × 4 | 917.60 kg |
| Adjustable base jack | 350/450/600 mm | 22 | not in brochure |
| Steel walkway platform | 300 mm × 1.8 m | 60 = 10 bays × 6 | not in brochure |
| Steel toe board | 150 mm × 1.8 m | 22 = 2 × (10 + 1) | not in brochure |
| Steel access ladder | 3.0 m | 3 | not in brochure |
| **Indicative tonnage** | | | **1.51 t** (1,511.60 kg) |

## Worked example B: access tower block

Access, 1.5 m bays, 6 bays long, 2 bays wide, 7.5 m working height.

- Posts: 7 × 3 = **21**. Each post: 3.0 + 3.0 + 1.5 m. Lifts: 7.5 ÷ 2 = 3.75, so 4 lifts and 5 ledger levels (0.5, 2, 4, 6, 7.5 m).

| Component | Size | Qty | Weight |
|---|---|---|---|
| Cuplock vertical standard | 3.0 m | 42 | 567.00 kg |
| Cuplock vertical standard | 1.5 m | 21 | 141.75 kg |
| Cuplock horizontal ledger | 1.5 m | 160 = (6×3 + 2×7) × 5 | 1,008.00 kg |
| Adjustable base jack | 350/450/600 mm | 21 | not in brochure |
| Steel walkway platform | 300 mm × 1.5 m | 60 = 12 bays × 5 | not in brochure |
| Steel toe board | 150 mm × 1.5 m | 16 = 2 × (6 + 2) | not in brochure |
| Steel access ladder | 3.0 m | 4 | not in brochure |
| **Indicative tonnage** | | | **1.72 t** (1,716.75 kg) |

## Worked example C: slab support (formwork) scaffold

Support, 1.2 m bays, 4 × 4 bays, 4.0 m to the top of the posts.

- Posts: 5 × 5 = **25**. Each post: 3.0 + 1.0 m. Lifts: 2, so 3 ledger levels.

| Component | Size | Qty | Weight |
|---|---|---|---|
| Cuplock vertical standard | 3.0 m | 25 | 337.50 kg |
| Cuplock vertical standard | 1.0 m | 25 | 112.50 kg |
| Cuplock horizontal ledger | 1.2 m | 120 = (4×5 + 4×5) × 3 | 612.00 kg |
| Adjustable base jack | 350/450/600 mm | 25 | not in brochure |
| Adjustable U-head jack | 350/450/600 mm | 25 | not in brochure |
| **Indicative tonnage** | | | **1.06 t** (1,062.00 kg) |

## Questions for the technical team

1. Is a **2.0 m lift** right for both access and support scaffolds, or should support scaffolds use a different spacing?
2. Is a **base ledger set at the first cup (0.5 m)** your standard?
3. **Guardrails:** should access scaffolds get posts extended 1.0 m above the deck with guardrail ledgers on the outer faces? They are left out today.
4. **Decking:** one working deck at the top lift only, or a deck on every lift?
5. **Ladders:** one 3.0 m ladder per lift in one access bay. Is that how you would supply it?
6. **Square bays:** the page uses the same ledger length in both directions. Do you want a separate width (for example 1.2 m wide × 2.0 m long)?
7. **Weights:** can you supply per-piece weights for base jacks, U-heads, platforms, toe boards and ladders, so the tonnage can include them?
8. Anything else a contractor usually forgets that the list should carry (bracing, couplers, spares)?

Until this is approved the page is deployed but hidden: reachable by direct link only, not linked from the home page, `/products` or the footer, not in the sitemap, marked `noindex`, and no ads point at it. It does **not** go live with the domain cutover. After written approval, `ESTIMATOR_SIGNED_OFF` in `src/config/launch-gates.ts` is set to `true`, which turns all of that on in one change.

If you can answer only one question, please make it question 7: those weights turn the partial tonnage into a complete one.
