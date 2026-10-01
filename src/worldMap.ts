// The map of the valley, as the game's map screen shows it once every corner has been explored: the parchment map,
// each land's name across its top, every place by name and the markers for keys, chests, shops and guardians.
// The parchment is the game's own map, baked by `npm run bake-maps` into public/maps/ (one picture per land, loaded
// when it first comes into view); the names and markers are drawn over it here, as src/game/render.ts does in the game.
// Drag to pan, pinch or scroll to zoom. It only draws when something changes, so an open map costs a phone nothing.
import maps from './maps.json';

type LandId = 'meadow' | 'woods' | 'summit' | 'ember';
type Land = (typeof maps.lands)[number];
type Marker = [string, number, number];

const W = maps.width, H = maps.height, LAND_W = maps.lands[0].x1 - maps.lands[0].x0;
const TAU = Math.PI * 2;
const PAPER = '#efe0c0', INK = '#3b2a2f';
const DISPLAY = 'Cinzel, Georgia, serif', UI = 'Nunito, "Trebuchet MS", sans-serif';
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const alpha = (hex: string, a: number) => `rgba(${[1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16)).join(',')},${a})`;
const landAt = (x: number) => maps.lands[clamp(Math.floor(x / LAND_W), 0, maps.lands.length - 1)];

/** The markers as the game draws them: [radius, colour] (an accent colour comes from the land), and a glow for some. */
const DOT: Record<string, { r: number; c?: string; glow?: [number, string] }> = {
  chest: { r: 2, c: '#ffd35c' }, shop: { r: 1.8, c: '#ffd35c' }, folk: { r: 1.8, c: '#fff7df' },
  camp: { r: 2, c: '#ffb347' }, fountain: { r: 2, c: '#9fd8ff' }, shrine: { r: 3 }, key: { r: 3, glow: [10, ''] },
  boss: { r: 3.4, c: '#ff6b5b', glow: [10, '#ff6b5b'] }, heroic: { r: 2.8, c: '#e8a0ff', glow: [8, '#c98aff'] },
};

const glowCache = new Map<string, HTMLCanvasElement>();
function glowSprite(color: string) {
  let c = glowCache.get(color);
  if (!c) {
    c = document.createElement('canvas'); c.width = c.height = 64;
    const g = c.getContext('2d')!, grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, alpha(color, 1)); grad.addColorStop(.25, alpha(color, .55)); grad.addColorStop(1, alpha(color, 0));
    g.fillStyle = grad; g.fillRect(0, 0, 64, 64); glowCache.set(color, c);
  }
  return c;
}

export function setupWorldMap(base: string) {
  const dialog = document.getElementById('map') as HTMLDialogElement | null;
  const canvas = dialog?.querySelector('canvas');
  const ctx = canvas?.getContext('2d');
  if (!dialog || !canvas || !ctx) return;
  const tabs = dialog.querySelector<HTMLElement>('.map-tabs')!, legend = dialog.querySelector<HTMLElement>('.map-legend')!;

  // Each land's parchment, fetched the first time it is in view.
  const images = new Map<LandId, HTMLImageElement>();
  const image = (l: Land) => {
    let img = images.get(l.id as LandId);
    if (!img) { img = new Image(); img.decoding = 'async'; img.onload = draw; img.src = `${base}maps/${l.id}.webp`; images.set(l.id as LandId, img); }
    return img;
  };

  // cx, cy: the world point at the centre of the view; S: screen px per world px.
  const view = { cx: W / 2, cy: H / 2, S: 0 };
  let w = 1, h = 1, here: LandId | 'all' = 'meadow';
  const fitAll = () => Math.min((w - 16) / W, (h - 16) / H);
  /** A land fills the view; on a tall phone it fills the height, and you pan across it. */
  const fitLand = () => { const contain = Math.min((w - 16) / LAND_W, (h - 16) / H); return w < h ? (h - 16) / H : contain; };
  const maxS = () => Math.max(fitLand() * 3, .15);
  const clampView = () => {
    view.S = clamp(view.S, fitAll(), maxS());
    const hw = w / 2 / view.S, hh = h / 2 / view.S;
    view.cx = hw * 2 >= W ? W / 2 : clamp(view.cx, hw, W - hw);
    view.cy = hh * 2 >= H ? H / 2 : clamp(view.cy, hh, H - hh);
  };

  let queued = 0;
  function draw() { if (!queued) queued = requestAnimationFrame(paint); }
  function paint() {
    queued = 0;
    const r = canvas!.getBoundingClientRect(), d = Math.min(2, devicePixelRatio || 1);
    if (!r.width || !r.height) return;
    if (canvas!.width !== Math.round(r.width * d) || canvas!.height !== Math.round(r.height * d)) { canvas!.width = Math.round(r.width * d); canvas!.height = Math.round(r.height * d); }
    if (w !== r.width || h !== r.height) { w = r.width; h = r.height; if (!view.S) jump(here, false); }
    clampView();
    const g = ctx!, S = view.S, ox = w / 2 - view.cx * S, oy = h / 2 - view.cy * S, mw = W * S, mh = H * S;
    const P = (x: number, y: number) => [ox + x * S, oy + y * S] as const;
    g.setTransform(d, 0, 0, d, 0, 0);
    g.clearRect(0, 0, w, h);
    g.save();
    g.beginPath();
    const cx0 = Math.max(0, ox), cy0 = Math.max(0, oy), cw = Math.min(w, ox + mw) - cx0, ch = Math.min(h, oy + mh) - cy0;
    if (g.roundRect) g.roundRect(cx0, cy0, cw, ch, 14); else g.rect(cx0, cy0, cw, ch);
    g.clip();
    g.imageSmoothingEnabled = true;
    for (const l of maps.lands) {
      const [x0] = P(l.x0, 0), [x1] = P(l.x1, 0);
      if (x1 < 0 || x0 > w) continue;
      const img = image(l);
      if (img.complete && img.naturalWidth) g.drawImage(img, x0, oy, x1 - x0 + .5, mh);
      else { g.fillStyle = PAPER; g.fillRect(x0, oy, x1 - x0 + .5, mh); }
    }
    g.textAlign = 'center';
    // Borders between the lands.
    g.strokeStyle = alpha(INK, .4); g.lineWidth = 1.5; g.setLineDash([6, 8]);
    for (const l of maps.lands.slice(1)) { const [x] = P(l.x0, 0); g.beginPath(); g.moveTo(x, oy); g.lineTo(x, oy + mh); g.stroke(); }
    g.setLineDash([]);
    // Every place by name. Cities always; the rest once you are close enough to read them.
    const named = S * 140 >= 9;
    for (const p of maps.pois) {
      const big = p.kind === 'city';
      if (!named && !big) continue;
      const [x, y] = P(p.x, p.y);
      if (x < -120 || x > w + 120 || y < -40 || y > h + 40) continue;
      g.font = `${big ? 900 : 700} ${Math.round(clamp(S * (big ? 190 : 140), big ? 12 : 10, big ? 20 : 16))}px ${DISPLAY}`;
      g.lineWidth = 3.5; g.strokeStyle = alpha(PAPER, .9); g.strokeText(p.name, x, y - 10);
      g.fillStyle = big ? '#6a2a1a' : INK; g.fillText(p.name, x, y - 10);
    }
    // The markers.
    const size = clamp(S * 18, .9, 1.5);
    for (const [kind, mx, my] of maps.markers as Marker[]) {
      const [x, y] = P(mx, my);
      if (x < -12 || x > w + 12 || y < -12 || y > h + 12) continue;
      if (kind === 'finale') { g.fillStyle = '#fff1b8'; star(g, x, y, 5 * size); g.fill(); continue; }
      const m = DOT[kind]; if (!m) continue;
      const color = m.c ?? landAt(mx).accent;
      if (m.glow) {
        const gr = m.glow[0] * size;
        g.globalCompositeOperation = 'lighter'; g.globalAlpha = kind === 'key' ? .9 : .7;
        g.drawImage(glowSprite(m.glow[1] || color), x - gr, y - gr, gr * 2, gr * 2);
        g.globalCompositeOperation = 'source-over'; g.globalAlpha = 1;
      }
      dot(g, x, y, (m.r + .9) * size, INK); dot(g, x, y, m.r * size, color);
    }
    // Each land's name across its top, bigger when zoomed out.
    for (const l of maps.lands) {
      const [x] = P((l.x0 + l.x1) / 2, 0), fs = Math.round(clamp(S * 420, 13, 26));
      if (x < -300 || x > w + 300) continue;
      const y = Math.max(oy, 0) + fs + 8, sub = `Chapter ${l.chapter} · Lv ${l.levels[0]}–${l.levels[1]}`;
      g.font = `900 ${fs}px ${DISPLAY}`; g.lineWidth = 4; g.strokeStyle = alpha(PAPER, .92);
      g.strokeText(l.title, x, y); g.fillStyle = '#7a3322'; g.fillText(l.title, x, y);
      g.font = `800 ${Math.max(10, fs * .5)}px ${UI}`; g.strokeText(sub, x, y + fs * .75); g.fillStyle = alpha(INK, .75); g.fillText(sub, x, y + fs * .75);
    }
    g.restore();
    g.strokeStyle = INK; g.lineWidth = 2; g.beginPath();
    if (g.roundRect) g.roundRect(ox, oy, mw, mh, 14); else g.rect(ox, oy, mw, mh);
    g.stroke();
  }

  // The tabs: the whole valley, or one land.
  const tabFor = (id: string) => tabs.querySelector<HTMLButtonElement>(`[data-land="${id}"]`);
  tabs.innerHTML = [`<button type="button" data-land="all">Whole valley<small>All ${maps.lands.length} lands</small></button>`,
    ...maps.lands.map(l => `<button type="button" data-land="${l.id}">${l.title}<small>Lv ${l.levels[0]}–${l.levels[1]}</small></button>`)].join('');
  function jump(id: LandId | 'all', redraw = true) {
    here = id;
    if (id === 'all') { view.S = fitAll(); view.cx = W / 2; view.cy = H / 2; }
    else { const l = maps.lands.find(x => x.id === id)!; view.S = fitLand(); view.cx = (l.x0 + l.x1) / 2; view.cy = H / 2; }
    tabs.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.land === id)));
    tabFor(id)?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    setLegend(id === 'all' ? maps.lands[0] : maps.lands.find(x => x.id === id)!);
    if (redraw) draw();
  }
  tabs.addEventListener('click', e => { const id = (e.target as HTMLElement).closest<HTMLElement>('[data-land]')?.dataset.land as LandId | 'all' | undefined; if (id) jump(id); });

  const touch = matchMedia('(pointer: coarse)').matches;
  function setLegend(l: Land) {
    const item = (c: string, label: string) => `<span><i style="background:${c}"></i>${label}</span>`;
    legend.innerHTML = item(l.accent, l.keyLabel) + item('#ffd35c', 'Shop &amp; chest') + item('#ffb347', 'Campfire') + item('#9fd8ff', 'Fountain')
      + item('#ff6b5b', 'Guardian') + item('#e8a0ff', 'Heroic foe') + `<span class="map-how">${touch ? 'Drag · pinch to zoom' : 'Drag · scroll to zoom'}</span>`;
  }

  // Drag to pan, two fingers or the wheel to zoom, or the buttons.
  const zoomAt = (f: number, sx: number, sy: number) => {
    const S0 = view.S, wx = view.cx + (sx - w / 2) / S0, wy = view.cy + (sy - h / 2) / S0;
    view.S = clamp(S0 * f, fitAll(), maxS());
    view.cx = wx - (sx - w / 2) / view.S; view.cy = wy - (sy - h / 2) / view.S;
    draw();
  };
  const pts = new Map<number, { x: number; y: number }>();
  let pinch = 0;
  canvas.addEventListener('pointerdown', e => { canvas.setPointerCapture(e.pointerId); pts.set(e.pointerId, { x: e.offsetX, y: e.offsetY }); if (pts.size === 2) { const [a, b] = [...pts.values()]; pinch = Math.hypot(a.x - b.x, a.y - b.y); } });
  canvas.addEventListener('pointermove', e => {
    const p = pts.get(e.pointerId); if (!p) return;
    if (pts.size === 1) { view.cx -= (e.offsetX - p.x) / view.S; view.cy -= (e.offsetY - p.y) / view.S; draw(); }
    pts.set(e.pointerId, { x: e.offsetX, y: e.offsetY });
    if (pts.size === 2) { const [a, b] = [...pts.values()], d2 = Math.hypot(a.x - b.x, a.y - b.y); if (pinch > 0) zoomAt(d2 / pinch, (a.x + b.x) / 2, (a.y + b.y) / 2); pinch = d2; }
  });
  const up = (e: PointerEvent) => { pts.delete(e.pointerId); pinch = 0; };
  canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', up);
  canvas.addEventListener('wheel', e => { e.preventDefault(); zoomAt(Math.pow(1.0015, -e.deltaY), e.offsetX, e.offsetY); }, { passive: false });
  dialog.querySelectorAll<HTMLButtonElement>('[data-zoom]').forEach(b => b.addEventListener('click', () => zoomAt(Number(b.dataset.zoom) > 0 ? 1.5 : 1 / 1.5, w / 2, h / 2)));
  canvas.addEventListener('keydown', e => {
    const step = 120 / view.S, keys: Record<string, () => void> = {
      ArrowLeft: () => { view.cx -= step; }, ArrowRight: () => { view.cx += step; }, ArrowUp: () => { view.cy -= step; }, ArrowDown: () => { view.cy += step; },
      '+': () => zoomAt(1.5, w / 2, h / 2), '=': () => zoomAt(1.5, w / 2, h / 2), '-': () => zoomAt(1 / 1.5, w / 2, h / 2),
    };
    if (keys[e.key]) { e.preventDefault(); keys[e.key](); draw(); }
  });

  new ResizeObserver(() => { if (dialog.open) draw(); }).observe(canvas);
  document.fonts?.ready.then(draw);
  dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
  dialog.querySelector('[data-map-close]')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => document.documentElement.classList.remove('map-open'));

  const open = (id: LandId | 'all') => {
    dialog.showModal(); document.documentElement.classList.add('map-open');
    const r = canvas.getBoundingClientRect(); w = r.width || w; h = r.height || h;
    jump(id);
  };
  document.querySelectorAll<HTMLElement>('[data-map]').forEach(b => b.addEventListener('click', () => open(b.dataset.map as LandId | 'all')));
}

function dot(g: CanvasRenderingContext2D, x: number, y: number, r: number, c: string) { g.fillStyle = c; g.beginPath(); g.arc(x, y, Math.max(.1, r), 0, TAU); g.fill(); }
function star(g: CanvasRenderingContext2D, x: number, y: number, r: number, points = 5, inner = .45) {
  g.beginPath();
  for (let i = 0; i < points * 2; i++) { const a = (i / (points * 2)) * TAU - Math.PI / 2, rr = i % 2 ? r * inner : r; g.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); }
  g.closePath();
}
