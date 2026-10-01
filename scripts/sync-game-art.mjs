// Copies the game's paper art into src/game-art/, so the website draws the heroes exactly as the game does.
// Run it after the game's art, heroes or spells change:  npm run sync-art -- <path to the Starfall Grove game repo>
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/** Every game file the website uses, and what they import in turn (paths inside the game's src/). */
const FILES = [
  'TitleBackdrop.tsx',
  'game/art/animals.ts', 'game/art/bust.ts', 'game/art/color.ts', 'game/art/cutout.ts', 'game/art/heroes.ts',
  'game/art/people.ts', 'game/art/rig.ts',
  'game/gear.ts', 'game/graphics.ts', 'game/items.ts', 'game/spells.ts', 'game/types.ts',
  'ui/HeroStage.tsx', 'ui/icons.tsx', 'ui/paperStage.ts',
];

const game = process.argv[2];
if (!game) { console.error('Usage: npm run sync-art -- <path to the game repo>'); process.exit(1); }
const from = resolve(game, 'src'), to = resolve(dirname(fileURLToPath(import.meta.url)), '../src/game-art');
if (!existsSync(join(from, 'game/art/rig.ts'))) { console.error(`No Starfall Grove sources in ${from}`); process.exit(1); }
for (const f of FILES) { mkdirSync(dirname(join(to, f)), { recursive: true }); copyFileSync(join(from, f), join(to, f)); }
console.log(`Copied ${FILES.length} files into src/game-art/. Run npm run build to check they still fit together.`);
