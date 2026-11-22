import type { ScaffoldLayout, Vec3 } from '@/lib/scaffold-layout';

/**
 * Static isometric line drawing of the scaffold. Server-rendered in place of
 * the 3D canvas until Three.js loads (and kept if WebGL is unavailable), so
 * the first paint never waits on a canvas and no poster image is downloaded.
 */
const COS = Math.cos(Math.PI / 6);
const SIN = 0.5;

function iso([x, y, z]: Vec3): [number, number] {
  return [(x - z) * COS, (x + z) * SIN - y];
}

export function ScaffoldPoster({ layout, className }: { layout: ScaffoldLayout; className?: string }) {
  const pts: [number, number][] = [];
  const seg = (a: Vec3, b: Vec3) => {
    const p = iso(a);
    const q = iso(b);
    pts.push(p, q);
    return `M${p[0].toFixed(3)} ${p[1].toFixed(3)}L${q[0].toFixed(3)} ${q[1].toFixed(3)}`;
  };

  const posts = layout.posts.map((s) => seg(s.a, s.b)).join('');
  const ledgers = layout.ledgers.map((s) => seg(s.a, s.b)).join('');
  const ladders = layout.ladders
    .flatMap((l) => [...l.rails, ...l.rungs])
    .map((s) => seg(s.a, s.b))
    .join('');
  const decks = layout.platforms
    .map(({ c, s }) => {
      const [cx, cy, cz] = c;
      const hx = s[0] / 2;
      const hz = s[2] / 2;
      const corners: Vec3[] = [
        [cx - hx, cy, cz - hz],
        [cx + hx, cy, cz - hz],
        [cx + hx, cy, cz + hz],
        [cx - hx, cy, cz + hz],
      ];
      const p = corners.map(iso);
      pts.push(...p);
      return `M${p.map((q) => `${q[0].toFixed(3)} ${q[1].toFixed(3)}`).join('L')}Z`;
    })
    .join('');

  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  const pad = 0.6;
  const minX = Math.min(...xs) - pad;
  const minY = Math.min(...ys) - pad;
  const w = Math.max(...xs) - minX + pad;
  const h = Math.max(...ys) - minY + pad;
  const stroke = Math.max(w, h) / 260;

  return (
    <svg
      viewBox={`${minX.toFixed(2)} ${minY.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)}`}
      className={className}
      role="img"
      aria-label="Isometric drawing of the Cuplock scaffold described in the table"
      preserveAspectRatio="xMidYMid meet"
    >
      <path d={decks} fill="hsl(25 6% 60% / 0.55)" stroke="none" />
      <path d={ledgers} stroke="hsl(4 62% 37%)" strokeWidth={stroke} strokeLinecap="round" fill="none" />
      <path d={posts} stroke="hsl(4 62% 30%)" strokeWidth={stroke * 1.4} strokeLinecap="round" fill="none" />
      <path d={ladders} stroke="hsl(20 5% 23%)" strokeWidth={stroke * 0.8} fill="none" />
    </svg>
  );
}
