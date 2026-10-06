// Bakes the game's world map, fully explored, for the map modal on the landing page. It builds the valley with the
// game's own world code and paints the parchment map with the game's own map painter (at 2.5× the game's resolution, so
// it stays sharp when you zoom in), then writes one picture per land and the places and markers drawn over them.
// Run it after the game's world changes:  npm run bake-maps -- <path to the Starfall Grove game repo>
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';
import { chromium } from 'playwright';

/** How many times sharper than the game's own map canvas the pictures are. */
const SHARPNESS = 2.5;

const game = process.argv[2];
if (!game) { console.error('Usage: npm run bake-maps -- <path to the game repo>'); process.exit(1); }
const root = resolve(game), here = resolve(dirname(fileURLToPath(import.meta.url)), '..');
if (!existsSync(join(root, 'src/game/render.ts'))) { console.error(`No Starfall Grove sources in ${root}/src`); process.exit(1); }

// The map painter is private to the game's renderer, so it is exported here, and paints into a sharper canvas.
const CANVAS = `const c = document.createElement('canvas'); c.width = Math.ceil(world.width * S); c.height = Math.ceil(world.height * S);
  const m = c.getContext('2d')!;`;
const openPainter = {
  name: 'open-map-painter',
  enforce: 'pre',
  transform(code, id) {
    if (!id.replace(/\\/g, '/').endsWith('/src/game/render.ts')) return;
    const src = code.replace(/\r\n/g, '\n');
    if (!src.includes(CANVAS)) throw new Error('The map painter in render.ts has changed; update scripts/bake-maps.mjs to match.');
    return src.replace(CANVAS, `const c = document.createElement('canvas'); c.width = Math.ceil(world.width * S * ${SHARPNESS}); c.height = Math.ceil(world.height * S * ${SHARPNESS});
  const m = c.getContext('2d')!; m.scale(${SHARPNESS}, ${SHARPNESS});`) + '\nexport { worldMapCanvas };\n';
  },
};

// What runs in the browser: build the valley, paint it, cut it into lands and list what the map shows.
const ENTRY = `
import { getWorld } from '/src/game/worlds.ts';
import { worldMapCanvas } from '/src/game/render.ts';
const w = getWorld(), map = worldMapCanvas(w), k = map.width / w.width;
const lands = w.regions.map(r => {
  const x0 = Math.round(r.x0 * k), x1 = Math.round(r.x1 * k), c = document.createElement('canvas');
  c.width = x1 - x0; c.height = map.height; c.getContext('2d').drawImage(map, x0, 0, c.width, c.height, 0, 0, c.width, c.height);
  return { id: r.id, chapter: r.chapter, title: r.title, levels: r.levels, x0: r.x0, x1: r.x1, accent: r.palette.accent, keyLabel: r.script.keyLabel,
    image: c.toDataURL('image/webp', .86) };
});
const at = p => [Math.round(p.x), Math.round(p.y)];
// Only the valley: the depths beneath the Dawn Forge are a surprise, and lie off the map anyway.
const inValley = p => p.x >= 0 && p.x <= w.width;
const markers = [];
for (const o of w.objects) {
  if (o.hiddenBy || !inValley(o)) continue;
  const kind = { key: 'key', chest: 'chest', shrine: 'shrine', finale: 'finale', campfire: 'camp', fountain: 'fountain' }[o.kind];
  if (kind) markers.push([kind, ...at(o)]);
}
const SHOPS = new Set(['merchant', 'smith', 'armorer', 'inn']);
for (const n of w.npcs) if (!n.hero && !n.after && inValley(n)) markers.push([SHOPS.has(n.role) ? 'shop' : 'folk', ...at(n)]);
for (const e of w.enemies) if (!inValley(e)) continue; else if (e.boss) markers.push(['boss', ...at(e)]); else if (e.heroic) markers.push(['heroic', ...at(e)]);
window.__baked = { width: w.width, height: w.height, lands, pois: w.pois.filter(inValley).map(p => ({ name: p.name, kind: p.kind, x: Math.round(p.x), y: Math.round(p.y) })), markers };
`;
const bakePage = {
  name: 'bake-page',
  resolveId: id => id === 'virtual:bake' ? '\0virtual:bake' : undefined,
  load: id => id === '\0virtual:bake' ? ENTRY : undefined,
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url !== '/__bake') return next();
      res.setHeader('Content-Type', 'text/html');
      res.end('<!doctype html><meta charset="utf-8"><script type="module" src="/@id/__x00__virtual:bake"></script>');
    });
  },
};

const server = await createServer({ root, configFile: false, logLevel: 'warn', plugins: [openPainter, bakePage], optimizeDeps: { noDiscovery: true, include: [] }, server: { port: 0 } });
await server.listen();
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  page.on('pageerror', e => console.error(e));
  await page.goto(`${server.resolvedUrls.local[0]}__bake`);
  await page.waitForFunction(() => window.__baked, null, { timeout: 120000 });
  const baked = await page.evaluate(() => window.__baked);
  mkdirSync(join(here, 'public/maps'), { recursive: true });
  for (const l of baked.lands) {
    writeFileSync(join(here, `public/maps/${l.id}.webp`), Buffer.from(l.image.split(',')[1], 'base64'));
    delete l.image;
  }
  writeFileSync(join(here, 'src/maps.json'), JSON.stringify(baked) + '\n');
  console.log(`Baked ${baked.lands.length} lands, ${baked.pois.length} places and ${baked.markers.length} markers into public/maps/ and src/maps.json.`);
} finally {
  await browser.close(); await server.close();
}
