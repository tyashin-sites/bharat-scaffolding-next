/**
 * The 3D layer of the estimator. Loaded ONLY through dynamic import() from
 * ScaffoldViewer, after first paint and on viewport/interaction, so Three.js
 * never sits in the page's initial bundle.
 *
 * Vanilla three, one InstancedMesh per component type (posts, ledgers, jacks,
 * planks, toe boards, ladders) — a few draw calls however big the scaffold.
 * Renders on demand: frames are drawn only while building, auto-rotating,
 * or being dragged, and never while the canvas is off screen.
 */
import {
  AmbientLight,
  BoxGeometry,
  Color,
  CylinderGeometry,
  DirectionalLight,
  GridHelper,
  HemisphereLight,
  InstancedMesh,
  Matrix4,
  MeshStandardMaterial,
  Object3D,
  PerspectiveCamera,
  Quaternion,
  Scene,
  Vector3,
  WebGLRenderer,
  type BufferGeometry,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { ScaffoldLayout, Segment, Slab, Vec3 } from '@/lib/scaffold-layout';

export interface SceneHandle {
  update(layout: ScaffoldLayout): void;
  dispose(): void;
}

const TUBE_R = 0.0483 / 2;
const UP = new Vector3(0, 1, 0);

const COLORS = {
  steel: 0x9b2c24,
  ledger: 0xa8382f,
  deck: 0x8f8a84,
  dark: 0x3d3a38,
  bg: 0xfaf8f5,
};

interface Piece {
  m: Matrix4;
  y: number;
}

function segmentMatrix(s: Segment, radius: number): Piece {
  const a = new Vector3(...s.a);
  const b = new Vector3(...s.b);
  const dir = b.clone().sub(a);
  const len = dir.length();
  const q = new Quaternion().setFromUnitVectors(UP, dir.normalize());
  const m = new Matrix4().compose(a.clone().add(b).multiplyScalar(0.5), q, new Vector3(radius, len, radius));
  return { m, y: Math.min(a.y, b.y) };
}

function slabMatrix(s: Slab): Piece {
  const o = new Object3D();
  o.position.set(...s.c);
  o.scale.set(...s.s);
  o.updateMatrix();
  return { m: o.matrix.clone(), y: s.c[1] };
}

function pointMatrix(p: Vec3, scale: Vec3, yOffset = 0): Piece {
  const o = new Object3D();
  o.position.set(p[0], p[1] + yOffset, p[2]);
  o.scale.set(...scale);
  o.updateMatrix();
  return { m: o.matrix.clone(), y: p[1] };
}

export function createScaffoldScene(
  container: HTMLElement,
  opts: { reducedMotion: boolean; onFirstFrame?: () => void }
): SceneHandle {
  const renderer = new WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setClearColor(COLORS.bg);
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  renderer.domElement.style.touchAction = 'none';
  container.appendChild(renderer.domElement);

  const scene = new Scene();
  scene.add(new HemisphereLight(0xffffff, 0xd9d2ca, 1.6));
  scene.add(new AmbientLight(0xffffff, 0.35));
  const sun = new DirectionalLight(0xffffff, 1.8);
  sun.position.set(8, 14, 6);
  scene.add(sun);

  const camera = new PerspectiveCamera(35, 1, 0.1, 500);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = !opts.reducedMotion;
  controls.dampingFactor = 0.12;
  controls.enablePan = false;
  controls.minPolarAngle = 0.15;
  controls.maxPolarAngle = Math.PI / 2 - 0.05;
  controls.autoRotate = !opts.reducedMotion;
  controls.autoRotateSpeed = 0.6;

  // Unit geometries, scaled per instance. Low segment counts for phones.
  const tube = new CylinderGeometry(1, 1, 1, 8, 1, true);
  const box = new BoxGeometry(1, 1, 1);
  const mats = {
    post: new MeshStandardMaterial({ color: COLORS.steel, roughness: 0.55, metalness: 0.35 }),
    ledger: new MeshStandardMaterial({ color: COLORS.ledger, roughness: 0.55, metalness: 0.35 }),
    deck: new MeshStandardMaterial({ color: COLORS.deck, roughness: 0.8, metalness: 0.3 }),
    dark: new MeshStandardMaterial({ color: COLORS.dark, roughness: 0.6, metalness: 0.4 }),
  };

  let grid: GridHelper | null = null;
  let meshes: { mesh: InstancedMesh; ys: number[] }[] = [];
  let buildStart = 0;
  let buildTop = 0;
  let building = false;
  let visible = true;
  let raf = 0;
  let firstFrame = true;
  let userTouched = false;

  function addMesh(geo: BufferGeometry, mat: MeshStandardMaterial, pieces: Piece[]) {
    if (pieces.length === 0) return;
    pieces.sort((p, q) => p.y - q.y);
    const mesh = new InstancedMesh(geo, mat, pieces.length);
    pieces.forEach((p, i) => mesh.setMatrixAt(i, p.m));
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
    scene.add(mesh);
    meshes.push({ mesh, ys: pieces.map((p) => p.y) });
  }

  function clear() {
    for (const { mesh } of meshes) {
      scene.remove(mesh);
      mesh.dispose();
    }
    meshes = [];
    if (grid) {
      scene.remove(grid);
      grid.dispose();
      grid = null;
    }
  }

  function frame(layout: ScaffoldLayout, keepView: boolean) {
    const [sx, sy, sz] = layout.size;
    const centre = new Vector3(sx / 2, sy / 2, sz / 2);
    const radius = Math.max(2, Math.hypot(sx, sy, sz) / 2);
    const fov = (camera.fov * Math.PI) / 180;
    const aspect = camera.aspect || 1;
    const fitH = radius / Math.sin(fov / 2);
    const fitW = radius / Math.sin(Math.atan(Math.tan(fov / 2) * aspect));
    const dist = Math.max(fitH, fitW) * 1.05;
    let dir = new Vector3(1, 0.75, 1.15).normalize();
    if (keepView) dir = camera.position.clone().sub(controls.target).normalize();
    controls.target.copy(centre);
    camera.position.copy(centre.clone().add(dir.multiplyScalar(dist)));
    camera.near = Math.max(0.05, dist / 100);
    camera.far = dist * 10;
    camera.updateProjectionMatrix();
    controls.minDistance = radius * 0.8;
    controls.maxDistance = dist * 2.5;
    controls.update();

    const g = Math.ceil(Math.max(sx, sz) + 4);
    grid = new GridHelper(g, g, new Color(0xc9c1b8), new Color(0xe4dfd9));
    grid.position.set(sx / 2, 0, sz / 2);
    scene.add(grid);
  }

  function setReveal(height: number) {
    for (const { mesh, ys } of meshes) {
      let n = 0;
      while (n < ys.length && ys[n] <= height) n++;
      mesh.count = n;
    }
  }

  function render() {
    renderer.render(scene, camera);
    if (firstFrame) {
      firstFrame = false;
      opts.onFirstFrame?.();
    }
  }

  function loop(now: number) {
    raf = 0;
    if (!visible) return;
    let more = false;
    if (building) {
      const t = Math.min(1, (now - buildStart) / 1100);
      const eased = 1 - Math.pow(1 - t, 3);
      setReveal(-0.01 + eased * (buildTop + 0.02));
      if (t >= 1) building = false;
      else more = true;
    }
    const moved = controls.update();
    if (controls.autoRotate || moved) more = true;
    render();
    // controls 'change' may already have queued a frame via kick(); never queue two.
    if (more && !raf) raf = requestAnimationFrame(loop);
  }

  function kick() {
    if (!raf && visible) raf = requestAnimationFrame(loop);
  }

  function resize() {
    const w = container.clientWidth || 1;
    const h = container.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    kick();
  }

  let hasLayout = false;
  function update(layout: ScaffoldLayout) {
    clear();
    addMesh(tube, mats.post, layout.posts.map((s) => segmentMatrix(s, TUBE_R)));
    addMesh(tube, mats.ledger, layout.ledgers.map((s) => segmentMatrix(s, TUBE_R * 0.95)));
    addMesh(box, mats.dark, layout.baseJacks.map((p) => pointMatrix(p, [0.15, 0.012, 0.15], 0.006)));
    addMesh(tube, mats.dark, layout.baseJacks.map((p) => segmentMatrix({ a: p, b: [p[0], p[1] + 0.15, p[2]] }, 0.015)));
    addMesh(box, mats.dark, layout.uHeads.map((p) => pointMatrix(p, [0.1, 0.1, 0.1], 0.05)));
    addMesh(box, mats.deck, layout.platforms.map(slabMatrix));
    addMesh(box, mats.post, layout.toeBoards.map(slabMatrix));
    addMesh(
      tube,
      mats.dark,
      layout.ladders.flatMap((l) => [...l.rails, ...l.rungs]).map((s) => segmentMatrix(s, 0.012))
    );
    frame(layout, hasLayout && userTouched);
    hasLayout = true;

    if (opts.reducedMotion) {
      setReveal(Infinity);
    } else {
      buildTop = layout.size[1] + 1.5;
      buildStart = performance.now();
      building = true;
      setReveal(-1);
    }
    kick();
  }

  controls.addEventListener('start', () => {
    userTouched = true;
    controls.autoRotate = false;
    kick();
  });
  controls.addEventListener('change', kick);

  const ro = new ResizeObserver(resize);
  ro.observe(container);
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) kick();
  });
  io.observe(container);
  resize();

  return {
    update,
    dispose() {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      controls.dispose();
      clear();
      tube.dispose();
      box.dispose();
      Object.values(mats).forEach((m) => m.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
