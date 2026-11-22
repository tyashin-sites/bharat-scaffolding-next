'use client';

import { useEffect, useRef, useState } from 'react';
import { Move3d } from 'lucide-react';
import type { ScaffoldLayout } from '@/lib/scaffold-layout';
import type { SceneHandle } from '@/lib/scaffold-scene';
import { ScaffoldPoster } from '@/components/rent/ScaffoldPoster';

/**
 * Poster first, 3D second. The isometric SVG is in the server HTML; Three.js
 * is fetched by dynamic import only after the page has loaded AND the viewer
 * is near the viewport (or the visitor touches the estimator). If WebGL is
 * missing, the poster simply stays.
 */
function webglAvailable(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

function afterLoad(fn: () => void) {
  const idle = () => {
    if (typeof window.requestIdleCallback === 'function') window.requestIdleCallback(fn, { timeout: 1500 });
    else setTimeout(fn, 200);
  };
  if (document.readyState === 'complete') idle();
  else window.addEventListener('load', idle, { once: true });
}

export function ScaffoldViewer({
  layout,
  activate,
}: {
  layout: ScaffoldLayout;
  /** Set true on the visitor's first interaction with the estimator. */
  activate: boolean;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<SceneHandle | null>(null);
  const layoutRef = useRef(layout);
  const [want, setWant] = useState(false);
  const [live, setLive] = useState(false);

  layoutRef.current = layout;

  // Decide when to load: near viewport after page load, or on interaction.
  useEffect(() => {
    if (activate) setWant(true);
  }, [activate]);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    let io: IntersectionObserver | null = null;
    afterLoad(() => {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            setWant(true);
            io?.disconnect();
          }
        },
        { rootMargin: '200px' }
      );
      io.observe(el);
    });
    return () => io?.disconnect();
  }, []);

  useEffect(() => {
    if (!want || handleRef.current || !mountRef.current) return;
    if (!webglAvailable()) return;
    let cancelled = false;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    import('@/lib/scaffold-scene')
      .then(({ createScaffoldScene }) => {
        if (cancelled || !mountRef.current) return;
        const h = createScaffoldScene(mountRef.current, {
          reducedMotion,
          onFirstFrame: () => setLive(true),
        });
        handleRef.current = h;
        h.update(layoutRef.current);
      })
      .catch(() => {
        /* keep the poster */
      });
    return () => {
      cancelled = true;
    };
  }, [want]);

  useEffect(() => {
    handleRef.current?.update(layout);
  }, [layout]);

  useEffect(
    () => () => {
      handleRef.current?.dispose();
      handleRef.current = null;
    },
    []
  );

  return (
    <div
      ref={boxRef}
      className="border-border relative aspect-[4/3] w-full overflow-hidden rounded-md border bg-background"
    >
      <ScaffoldPoster
        layout={layout}
        className={`absolute inset-0 h-full w-full p-4 transition-opacity duration-300 ${live ? 'opacity-0' : 'opacity-100'}`}
      />
      <div ref={mountRef} className={`absolute inset-0 ${live ? '' : 'pointer-events-none'}`} />
      {live && (
        <p className="text-muted-foreground pointer-events-none absolute bottom-2 left-3 flex items-center gap-1.5 text-xs">
          <Move3d className="h-3.5 w-3.5" aria-hidden /> Drag to turn, pinch to zoom
        </p>
      )}
    </div>
  );
}
