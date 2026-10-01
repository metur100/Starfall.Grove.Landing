# Starfall Grove · website

The landing page for Starfall Grove, with its privacy policy, terms of use, support page and imprint. It's a standalone Vite + React + TypeScript project, separate from the game.

```bash
npm install
npm run dev      # development server
npm run build    # type-check and build into dist/
npm run preview  # preview the build
```

`dist/` is a static site. Every push to `master` builds it and publishes it to GitHub Pages (`.github/workflows/deploy.yml`). In the repository settings, set **Pages → Source** to **GitHub Actions** once.

All paths start from the path in `siteUrl` (for example `/Starfall.Grove.Landing/`), so in development the site is at `http://localhost:5173/Starfall.Grove.Landing/`. If you move the site to a custom domain, change `siteUrl` and everything follows.

## Settings

`site.json` holds everything that isn't copy. At build time, the HTML fills `%site.key%` from it, and the scripts and pages import it:

| Key | What it is |
| --- | --- |
| `developer`, `email`, `addressLine1`, `addressLine2`, `country` | The publisher, shown in the privacy policy, terms, support page and imprint |
| `siteUrl` | Where this website is hosted, ending in `/`. Used for canonical links, the link-preview image and the base path of every asset and route |
| `gameUrl` | Where the browser game is hosted, ending in `/`. Every Play button links here, and the intro films stream from `<gameUrl>intro/<hero>.mp4` |
| `playStoreUrl`, `appStoreUrl` | Store pages. A badge shows **Soon** while its link is empty |
| `updated` | The "last updated" date on the legal pages |

## The pages

- `index.html`: the landing page.
  - **Top section:** the paper diorama at night, with the logo, the play button, the intro film (`public/Intro.mp4`), the store links, and the five heroes standing together on the front hill.
  - **Main sections:** the story, the hero select, the four lands, features, platforms and FAQ.
  - **The lands:** each card opens the map of that land, fully explored, as the game's map screen shows it. You can switch to another land or the whole valley, drag to pan and pinch or scroll to zoom.
  - **The hero select** copies the game's character screen. It has the rune pedestal (drag to turn the hero), traits, abilities, the roster, and each hero's story and guardians. It also has a legendary set to try on, and the hero's intro film.
- `/privacy/`, `/terms/`, `/support/`, `/imprint/`: the legal and help pages the store listings need. Each is a React component in `src/legal/`. Every route is served from one shell, `legal.html`, which the build copies to `<route>/index.html` with that route's title and description (from `src/legal/routes.ts`). To add a page, add it to `routes.ts` and to the `pages` map in `src/legal/main.tsx`.
  - The privacy policy describes the game as it is: saves stay on the device, and there are no accounts, ads or analytics.
  - It also names **GitHub Pages** as the host of the website and the browser game. Update section 5 if you host either somewhere else, and update the policy if the game ever starts collecting data.

## The game's art

The heroes, pedestal, portraits and diorama are drawn by the game's own code, so they always look as they do in the game. `src/game-art/` is a copy of those files from the game's `src/`, with the same folder layout, imported as `@game/…`. Don't edit them here. After the game's art, heroes or spells change, copy them again:

```bash
npm run sync-art -- ../path/to/Starfall.Grove
```

The map is baked from the game too. `npm run bake-maps` builds the valley with the game's world code in a headless browser (Playwright's Chromium; run `npx playwright install chromium` once). It paints the game's parchment map and writes one picture per land to `public/maps/`, plus the places and markers to `src/maps.json`. The landing page draws the names and markers over the pictures. Bake again after the game's world changes:

```bash
npm run bake-maps -- ../path/to/Starfall.Grove
```

## The intro film

`public/Intro.mp4` is the website's own intro film, opened by **Watch the intro**. Its music and sound effects are written in `scripts/intro-score.js` for the film's five shots (the timings are listed at the top of that file), with the game's own instruments. `npm run score-intro` renders the score in a headless browser and puts it under the film, replacing its sound, and re-encodes a heavy picture once so it streams well on phones. It needs [ffmpeg](https://ffmpeg.org) on PATH, or its path in `FFMPEG`. If the film is re-cut, update the timings in the score and run it again.

## Code

```text
index.html           The landing page
legal.html           The shell of the legal and help routes
landing.css          The whole site: the game's cardstock and parchment look, phones first
site.json            Settings (above)
public/              Icons, the link-preview image and the baked maps (maps/)
scripts/             sync-game-art.mjs, bake-maps.mjs, intro-score.js and score-intro.mjs
src/
  main.tsx           The landing page: diorama, cast, hero select, intro films
  lineup.ts          The five heroes on the front hill
  Select.tsx         The hero select section
  heroes.ts          Each hero's story, guardians, traits and land
  worldMap.ts        The map modal: the baked lands with their names and markers, pan and zoom
  maps.json          The places and markers on the map (from bake-maps)
  site-page.ts       What every page shares: fonts, styles, store badges, menu, reveals
  legal/             The legal and help pages: routes, the shared layout, one component per page
  game-art/          The copy of the game's art (above)
```

Moving pieces only draw while they are on screen. On touch screens the cast is redrawn 12 times a second, like the game's pedestal, and the logo's shimmer holds still.
