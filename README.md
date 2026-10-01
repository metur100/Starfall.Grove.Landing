# Starfall Grove · website

The landing page for Starfall Grove, with its privacy policy, terms of use, support page and imprint. It's a standalone Vite + React + TypeScript project, separate from the game.

```bash
npm install
npm run dev      # development server
npm run build    # type-check and build into dist/
npm run preview  # preview the build
```

`dist/` is a static site that you can host anywhere. Every path is relative, so it also works under a sub-path.

## Settings

`site.json` holds everything that isn't copy. At build time, every page fills `%site.key%` from it, and the scripts import it:

| Key | What it is |
| --- | --- |
| `developer`, `email`, `addressLine1`, `addressLine2`, `country` | The publisher, shown in the privacy policy, terms, support page and imprint |
| `siteUrl` | Where this website is hosted, ending in `/`. Used for canonical links and the link-preview image |
| `gameUrl` | Where the browser game is hosted, ending in `/`. Every Play button links here, and the intro films stream from `<gameUrl>intro/<hero>.mp4` |
| `playStoreUrl`, `appStoreUrl` | Store pages. A badge shows **Soon** while its link is empty |
| `updated` | The "last updated" date on the legal pages |

## The pages

- `index.html`: the landing page.
  - **Top section:** the paper diorama at night, with the logo, play and store buttons, and the five heroes standing together on the front hill.
  - **Main sections:** the story, the hero select, the four lands, features, platforms and FAQ.
  - **The hero select** copies the game's character screen. It has the rune pedestal (drag to turn the hero), traits, abilities, the roster, and each hero's story and guardians. It also has a legendary set to try on, and the hero's intro film.
- `privacy.html`, `terms.html`, `support.html`, `imprint.html`: the legal and help pages the store listings need.
  - The privacy policy describes the game as it is: saves stay on the device, and there are no accounts, ads or analytics.
  - It also names **GitHub Pages** as the host of the website and the browser game. Update section 5 if you host either somewhere else, and update the policy if the game ever starts collecting data.

## The game's art

The heroes, pedestal, portraits and diorama are drawn by the game's own code, so they always look as they do in the game. `src/game-art/` is a copy of those files from the game's `src/`, with the same folder layout, imported as `@game/…`. Don't edit them here. After the game's art, heroes or spells change, copy them again:

```bash
npm run sync-art -- ../path/to/Starfall.Grove
```

## Code

```text
index.html, privacy.html, terms.html, support.html, imprint.html
landing.css          The whole site: the game's cardstock and parchment look, phones first
site.json            Settings (above)
public/              Icons and the link-preview image
scripts/             sync-game-art.mjs
src/
  main.tsx           The landing page: diorama, cast, hero select, intro films
  lineup.ts          The five heroes on the front hill
  Select.tsx         The hero select section
  heroes.ts          Each hero's story, guardians, traits and land
  site-page.ts       What every page shares: fonts, styles, store badges, menu, reveals
  site-legal.ts      The entry point of the legal pages
  game-art/          The copy of the game's art (above)
```

Moving pieces only draw while they are on screen. On touch screens the cast is redrawn 12 times a second, like the game's pedestal, and the logo's shimmer holds still.
