/**
 * Turns an Estimate into positioned pieces (metres; x along the length,
 * z across the width, y up from the base-jack plate). Shared by the static
 * SVG poster and the Three.js scene so both always draw the same scaffold
 * the component table describes.
 */
import type { Estimate } from '@/lib/estimator';
import { PLATFORM_WIDTH_M } from '@/lib/estimator';

export type Vec3 = [number, number, number];

export interface Segment {
  a: Vec3;
  b: Vec3;
}

export interface Slab {
  /** centre */
  c: Vec3;
  /** full size along x, y, z */
  s: Vec3;
}

export interface ScaffoldLayout {
  size: Vec3;
  posts: Segment[];
  ledgers: Segment[];
  baseJacks: Vec3[];
  uHeads: Vec3[];
  platforms: Slab[];
  toeBoards: Slab[];
  /** one entry per ladder: rails + rungs */
  ladders: { rails: Segment[]; rungs: Segment[] }[];
}

const JACK_M = 0.15;

export function layoutScaffold(e: Estimate): ScaffoldLayout {
  const { bayM: bay, baysLong: L, baysWide: W, type } = e.input;
  const top = e.postHeightM;
  const posts: Segment[] = [];
  const baseJacks: Vec3[] = [];
  const uHeads: Vec3[] = [];

  for (let i = 0; i <= L; i++) {
    for (let j = 0; j <= W; j++) {
      const x = i * bay;
      const z = j * bay;
      posts.push({ a: [x, JACK_M, z], b: [x, JACK_M + top, z] });
      baseJacks.push([x, 0, z]);
      if (type === 'support') uHeads.push([x, JACK_M + top, z]);
    }
  }

  const ledgers: Segment[] = [];
  for (const h of e.levelHeightsM) {
    const y = JACK_M + h;
    for (let j = 0; j <= W; j++)
      for (let i = 0; i < L; i++) ledgers.push({ a: [i * bay, y, j * bay], b: [(i + 1) * bay, y, j * bay] });
    for (let i = 0; i <= L; i++)
      for (let j = 0; j < W; j++) ledgers.push({ a: [i * bay, y, j * bay], b: [i * bay, y, (j + 1) * bay] });
  }

  const platforms: Slab[] = [];
  const toeBoards: Slab[] = [];
  const ladders: ScaffoldLayout['ladders'] = [];

  if (type === 'access') {
    const deckY = JACK_M + e.levelHeightsM[e.levelHeightsM.length - 1];
    const perBay = Math.floor(Math.round((bay / PLATFORM_WIDTH_M) * 100) / 100);
    const pad = (bay - perBay * PLATFORM_WIDTH_M) / 2;
    for (let i = 0; i < L; i++) {
      for (let j = 0; j < W; j++) {
        for (let k = 0; k < perBay; k++) {
          platforms.push({
            c: [i * bay + bay / 2, deckY + 0.03, j * bay + pad + PLATFORM_WIDTH_M * (k + 0.5)],
            s: [bay - 0.04, 0.05, PLATFORM_WIDTH_M - 0.02],
          });
        }
      }
    }
    const tbY = deckY + 0.075 + 0.05;
    for (let i = 0; i < L; i++) {
      toeBoards.push({ c: [i * bay + bay / 2, tbY, -0.03], s: [bay - 0.04, 0.15, 0.015] });
      toeBoards.push({ c: [i * bay + bay / 2, tbY, W * bay + 0.03], s: [bay - 0.04, 0.15, 0.015] });
    }
    for (let j = 0; j < W; j++) {
      toeBoards.push({ c: [-0.03, tbY, j * bay + bay / 2], s: [0.015, 0.15, bay - 0.04] });
      toeBoards.push({ c: [L * bay + 0.03, tbY, j * bay + bay / 2], s: [0.015, 0.15, bay - 0.04] });
    }

    // One ladder per lift, on the outside of the first bay's front face.
    const x0 = bay / 2 - 0.2;
    const x1 = bay / 2 + 0.2;
    const z = W * bay + 0.35;
    for (let k = 0; k < e.lifts; k++) {
      const y0 = JACK_M + (k === 0 ? 0 : e.levelHeightsM[k]);
      const y1 = JACK_M + e.levelHeightsM[k + 1] + 0.9;
      const rungs: Segment[] = [];
      for (let y = y0 + 0.25; y < y1 - 0.05; y += 0.25) rungs.push({ a: [x0, y, z], b: [x1, y, z] });
      ladders.push({
        rails: [
          { a: [x0, y0, z], b: [x0, y1, z] },
          { a: [x1, y0, z], b: [x1, y1, z] },
        ],
        rungs,
      });
    }
  }

  return {
    size: [L * bay, JACK_M + top, W * bay],
    posts,
    ledgers,
    baseJacks,
    uHeads,
    platforms,
    toeBoards,
    ladders,
  };
}
