/**
 * Cuplock material estimator — the quantity logic behind /scaffolding-on-rent.
 *
 * Pure functions, no imports beyond types, so the arithmetic can be tested on
 * its own (tests/estimator.test.mjs) and sent to the customer's technical team
 * for sign-off exactly as it runs (docs/ESTIMATOR-FORMULA.md).
 *
 * Every size and weight comes from the product catalogue in
 * src/data/products.ts (typed from the approved brochure v6.2). Components the
 * brochure prints no weight for are listed with quantity only and left out of
 * the tonnage — never guessed.
 *
 * The output is INDICATIVE. Real quantities come from a site visit.
 */
import type { Product } from '@/data/products';

export type ScaffoldType = 'access' | 'support';

export interface EstimatorInput {
  /** Bay size in metres, both directions (ledger size). */
  bayM: number;
  /** Number of bays along the length (L). */
  baysLong: number;
  /** Scaffold width in bays (W). */
  baysWide: number;
  /** Working height in metres (top deck for access, top of posts for support). */
  heightM: number;
  type: ScaffoldType;
}

export interface EstimateRow {
  key: 'vertical' | 'ledger' | 'baseJack' | 'uHead' | 'platform' | 'toeBoard' | 'ladder';
  component: string;
  slug: string;
  size: string;
  qty: number;
  /** Brochure weight per piece, or null when the brochure prints none. */
  unitKg: number | null;
  totalKg: number | null;
}

export interface Estimate {
  input: EstimatorInput;
  posts: number;
  postHeightM: number;
  lifts: number;
  ledgerLevels: number;
  /** Heights (m above the base-jack plate) of each ledger level, bottom first. */
  levelHeightsM: number[];
  /** Vertical pieces per post, bottom first. */
  postMakeUpM: number[];
  rows: EstimateRow[];
  /** Sum of rows that have a brochure weight. */
  knownKg: number;
  /** Components counted but left out of the tonnage (no brochure weight). */
  unweighed: string[];
}

/* ---------- configuration (all of it goes to the customer for sign-off) ---------- */

/**
 * Bay sizes offered: the lengths where a ledger, a walkway platform and a toe
 * board all exist in the brochure (ledger 1.20/1.50/1.80/2.00 m; platform and
 * toe board 1.2/1.5/1.8/2.0 m).
 */
export const BAY_SIZES_M = [1.2, 1.5, 1.8, 2.0] as const;

/** Lift height: ledgers every 2.0 m (four 500 mm cup spacings). */
export const LIFT_HEIGHT_M = 2.0;
/** Cup spacing on the vertical standard (brochure: 500 mm). */
export const CUP_SPACING_M = 0.5;
/** Height of the base ledger set above the jack plate (first cup). */
export const BASE_LEVEL_M = 0.5;
/** Walkway platform width (brochure: 300 mm). */
export const PLATFORM_WIDTH_M = 0.3;
/** Access ladder length (brochure: 3.0 m). */
export const LADDER_LENGTH_M = 3.0;

export const LIMITS = {
  baysLong: { min: 1, max: 20 },
  baysWide: { min: 1, max: 6 },
  heightM: { min: 2, max: 30, step: 0.5 },
} as const;

export const DEFAULT_INPUT: EstimatorInput = {
  bayM: 1.8,
  baysLong: 6,
  baysWide: 2,
  heightM: 6,
  type: 'access',
};

/* ---------- catalogue lookups ---------- */

/** Plain objects (not Maps) so the server page can pass them to the client. */
export interface Catalogue {
  /** vertical size key (sizeKey) → kg */
  verticalKg: Record<string, number>;
  /** ledger size key (sizeKey) → kg */
  ledgerKg: Record<string, number>;
}

export function sizeKey(m: number): string {
  return m.toFixed(2);
}

function weightTable(product: Product | undefined): Record<string, number> {
  const out: Record<string, number> = {};
  if (!product) return out;
  const sizeCol = 0;
  const kgCol = product.sizes.columns.findIndex((c) => /weight/i.test(c));
  if (kgCol < 0) return out;
  for (const row of product.sizes.rows) {
    const size = Number.parseFloat(row[sizeCol]);
    const kg = Number.parseFloat(row[kgCol]);
    if (Number.isFinite(size) && Number.isFinite(kg)) out[sizeKey(size)] = kg;
  }
  return out;
}

export function catalogueFrom(products: Product[]): Catalogue {
  const find = (slug: string) => products.find((p) => p.slug === slug);
  return {
    verticalKg: weightTable(find('cuplock-vertical-standard')),
    ledgerKg: weightTable(find('cuplock-horizontal-ledger')),
  };
}

/* ---------- arithmetic ---------- */

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function clampInt(n: number, min: number, max: number): number {
  if (!Number.isFinite(n)) return min;
  return Math.min(max, Math.max(min, Math.round(n)));
}

/** Snap any input into the supported range. */
export function normaliseInput(raw: Partial<EstimatorInput>): EstimatorInput {
  const bay = BAY_SIZES_M.find((b) => b === Number(raw.bayM)) ?? DEFAULT_INPUT.bayM;
  const h = Number(raw.heightM);
  const heightM = Number.isFinite(h)
    ? Math.min(
        LIMITS.heightM.max,
        Math.max(LIMITS.heightM.min, Math.round(h / LIMITS.heightM.step) * LIMITS.heightM.step)
      )
    : DEFAULT_INPUT.heightM;
  return {
    bayM: bay,
    baysLong: clampInt(Number(raw.baysLong ?? DEFAULT_INPUT.baysLong), LIMITS.baysLong.min, LIMITS.baysLong.max),
    baysWide: clampInt(Number(raw.baysWide ?? DEFAULT_INPUT.baysWide), LIMITS.baysWide.min, LIMITS.baysWide.max),
    heightM: round2(heightM),
    type: raw.type === 'support' ? 'support' : 'access',
  };
}

/**
 * Make one post up to `heightM` from the brochure's vertical sizes:
 * as many 3.0 m standards as fit, then one shorter standard for the rest.
 */
export function postMakeUp(heightM: number): number[] {
  const h = Math.ceil(round2(heightM) / CUP_SPACING_M) * CUP_SPACING_M;
  const pieces: number[] = [];
  let left = round2(h);
  while (left >= 3) {
    pieces.push(3);
    left = round2(left - 3);
  }
  if (left > 0) pieces.push(left);
  return pieces;
}

/** Every length here is a multiple of 0.1 m, so one decimal is exact. */
export function fmtM(m: number): string {
  return `${m.toFixed(1)} m`;
}

export function estimate(rawInput: Partial<EstimatorInput>, cat: Catalogue): Estimate {
  const input = normaliseInput(rawInput);
  const { bayM, baysLong: L, baysWide: W, heightM: H, type } = input;

  const posts = (L + 1) * (W + 1);
  const makeUp = postMakeUp(H);
  const postHeightM = round2(makeUp.reduce((a, b) => a + b, 0));

  const lifts = Math.max(1, Math.ceil(round2(H / LIFT_HEIGHT_M)));
  // Base set at the first cup, then one level per lift, the top one at H.
  const levelHeightsM = [BASE_LEVEL_M];
  for (let i = 1; i <= lifts; i++) levelHeightsM.push(round2(Math.min(H, i * LIFT_HEIGHT_M)));
  const ledgerLevels = levelHeightsM.length;
  const ledgersPerLevel = L * (W + 1) + W * (L + 1);

  const rows: EstimateRow[] = [];

  // Verticals, grouped by size.
  const bySize = new Map<number, number>();
  for (const piece of makeUp) bySize.set(piece, (bySize.get(piece) ?? 0) + posts);
  for (const [size, qty] of [...bySize.entries()].sort((a, b) => b[0] - a[0])) {
    const unitKg = cat.verticalKg[sizeKey(size)] ?? null;
    rows.push({
      key: 'vertical',
      component: 'Cuplock vertical standard',
      slug: 'cuplock-vertical-standard',
      size: fmtM(size),
      qty,
      unitKg,
      totalKg: unitKg === null ? null : round2(unitKg * qty),
    });
  }

  const ledgerQty = ledgersPerLevel * ledgerLevels;
  const ledgerKg = cat.ledgerKg[sizeKey(bayM)] ?? null;
  rows.push({
    key: 'ledger',
    component: 'Cuplock horizontal ledger',
    slug: 'cuplock-horizontal-ledger',
    size: fmtM(bayM),
    qty: ledgerQty,
    unitKg: ledgerKg,
    totalKg: ledgerKg === null ? null : round2(ledgerKg * ledgerQty),
  });

  rows.push({
    key: 'baseJack',
    component: 'Adjustable base jack',
    slug: 'adjustable-base-jack',
    size: '350 / 450 / 600 mm, to suit ground',
    qty: posts,
    unitKg: null,
    totalKg: null,
  });

  if (type === 'support') {
    rows.push({
      key: 'uHead',
      component: 'Adjustable U-head jack',
      slug: 'adjustable-u-head-jack',
      size: '350 / 450 / 600 mm',
      qty: posts,
      unitKg: null,
      totalKg: null,
    });
  } else {
    const perBay = Math.floor(round2(bayM / PLATFORM_WIDTH_M));
    rows.push({
      key: 'platform',
      component: 'Steel walkway platform',
      slug: 'steel-walkway-platform',
      size: `300 mm × ${fmtM(bayM)}`,
      qty: L * W * perBay,
      unitKg: null,
      totalKg: null,
    });
    rows.push({
      key: 'toeBoard',
      component: 'Steel toe board',
      slug: 'steel-toe-board',
      size: `150 mm × ${fmtM(bayM)}`,
      qty: 2 * (L + W),
      unitKg: null,
      totalKg: null,
    });
    rows.push({
      key: 'ladder',
      component: 'Steel access ladder',
      slug: 'steel-access-ladder',
      size: fmtM(LADDER_LENGTH_M),
      qty: lifts,
      unitKg: null,
      totalKg: null,
    });
  }

  const knownKg = round2(rows.reduce((a, r) => a + (r.totalKg ?? 0), 0));
  const unweighed = [...new Set(rows.filter((r) => r.unitKg === null).map((r) => r.component))];

  return {
    input,
    posts,
    postHeightM,
    lifts,
    ledgerLevels,
    levelHeightsM,
    postMakeUpM: makeUp,
    rows,
    knownKg,
    unweighed,
  };
}

export function tonnes(kg: number): string {
  return (kg / 1000).toFixed(2);
}

export function describeInput(i: EstimatorInput): string {
  const kind = i.type === 'support' ? 'Support (formwork) scaffold' : 'Access scaffold';
  return `${kind}: ${i.baysLong} × ${i.baysWide} bays of ${fmtM(i.bayM)}, working height ${fmtM(i.heightM)}`;
}

/** Plain-text body for the enquiry email. Labelled indicative, as required. */
export function estimateMessage(e: Estimate, note?: string): string {
  const lines: string[] = [];
  lines.push('INDICATIVE MATERIAL ESTIMATE from the /scaffolding-on-rent estimator.');
  lines.push('Not a design: quantities to be confirmed by the technical team after a site visit.');
  lines.push('');
  lines.push(describeInput(e.input));
  lines.push(
    `${e.posts} posts, ${e.lifts} lift${e.lifts === 1 ? '' : 's'} of ${fmtM(LIFT_HEIGHT_M)}, ${e.ledgerLevels} ledger levels incl. base set`
  );
  lines.push('');
  for (const r of e.rows) {
    const kg = r.totalKg === null ? 'weight not in brochure' : `${r.totalKg.toFixed(2)} kg`;
    lines.push(`- ${r.component}, ${r.size}: ${r.qty} nos (${kg})`);
  }
  lines.push('');
  lines.push(
    `Indicative tonnage (verticals + ledgers, brochure weights): ${tonnes(e.knownKg)} t`
  );
  if (e.unweighed.length) {
    lines.push(`Not in tonnage (no brochure weight): ${e.unweighed.join(', ')}`);
  }
  if (note && note.trim()) {
    lines.push('');
    lines.push(`Notes from the visitor: ${note.trim()}`);
  }
  return lines.join('\n');
}
