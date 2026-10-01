// The words the scripts write into the page (the hero select, the map, the films and the legal pages' frame), in
// English. ui.de.ts and ui.bs.ts are the same in German and Bosnian. Where English leaves something out (a hero's
// title and description, the spells), the page shows the game's own words.
import type { HeroId, LevelId, SpellId } from '@game/game/types';

export type TraitId = 'range' | 'toughness' | 'magic' | 'might' | 'control' | 'burst' | 'companion' | 'speed';
export type HeroWords = { title?: string; description?: string; epithet: string; story: string; companion?: string };

export type UI = {
  heroes: string; dragToTurn: (name: string) => string; legendarySet: string; tryLegendary: string;
  learnedAt: (level: number) => string; free: string; cast: (s: number) => string; cooldown: (s: number) => string;
  tapAbility: string; ownStory: (name: string) => string; travelsWith: (who: string) => string; guardiansOf: (name: string) => string;
  playNow: string; watchIntro: (name: string) => string; ofFive: (n: number) => string;
  trait: Record<TraitId, string>; resource: Record<string, string>;
  hero: Record<HeroId, HeroWords>; spells: Partial<Record<SpellId, string>>;
  map: { wholeValley: string; allLands: (n: number) => string; lv: string; chapter: string; keyLabel: Partial<Record<LevelId, string>>;
    shopChest: string; campfire: string; fountain: string; guardian: string; heroic: string; dragPinch: string; dragScroll: string };
  legal: { skip: string; home: string; site: string; story: string; heroes: string; world: string; support: string; menu: string;
    tagline: string; rights: string; email: string; legalNav: string; languages: string };
};

export const ui: UI = {
  heroes: 'Heroes',
  dragToTurn: n => `Drag to turn ${n}`,
  legendarySet: 'Legendary set',
  tryLegendary: 'Try the legendary set',
  learnedAt: l => `Learned at level ${l}`,
  free: 'free',
  cast: s => `${s} s cast`,
  cooldown: s => `${s} s cooldown`,
  tapAbility: 'Tap an ability to see what it does.',
  ownStory: n => `${n}’s own story`,
  travelsWith: c => `Travels with ${c}.`,
  guardiansOf: n => `The guardians ${n} faces`,
  playNow: 'Play now',
  watchIntro: n => `Watch ${n}’s intro`,
  ofFive: n => `${n} of 5`,
  trait: { range: 'Range', toughness: 'Toughness', magic: 'Magic', might: 'Might', control: 'Control', burst: 'Burst', companion: 'Companion', speed: 'Speed' },
  resource: { Magic: 'magic', Stamina: 'stamina', Energy: 'energy', Focus: 'focus' },
  hero: {
    mira: { epithet: 'The Apprentice', companion: 'Tuft the fox', story: 'Master Orrin vanished the night the star fell. With Tuft the fox on his scent, Mira follows his trail across the valley and learns what the three lights were lit to hold back.' },
    kael: { epithet: 'The Oathsworn', story: 'Ser Aldric made his last stand the night the Beacon died. Kael musters the farms and the city guard, finds the Wardens’ lost hall and swears to bring his knight home.' },
    lyra: { epithet: 'Winter’s Daughter', story: 'Her sister Nessa vanished on the lake road, her letters scattered in the snow. Following them, Lyra learns her family are Rimewards, frost-singers, and that some songs need two voices.' },
    riven: { epithet: 'The Foundling', story: 'His last contract for the Hushed ended in black feathers and a shadow he knew. Riven steals the Beacon’s crystals back, finds the foundling house he grew up in and faces a double wearing his face.' },
    wren: { epithet: 'The Pack', companion: 'Fenn the wolf', story: 'The valley blames the wolves. Wren knows better: her pack ran into the shadow the night the star fell. With Fenn at her heel she hunts the truth and goes looking for Moonfang.' },
  },
  spells: {},
  map: {
    wholeValley: 'Whole valley', allLands: n => `All ${n} lands`, lv: 'Lv', chapter: 'Chapter', keyLabel: {},
    shopChest: 'Shop &amp; chest', campfire: 'Campfire', fountain: 'Fountain', guardian: 'Guardian', heroic: 'Heroic foe',
    dragPinch: 'Drag · pinch to zoom', dragScroll: 'Drag · scroll to zoom',
  },
  legal: {
    skip: 'Skip to content', home: 'Starfall Grove home', site: 'Site', story: 'Story', heroes: 'Heroes', world: 'World', support: 'Support', menu: 'Menu',
    tagline: 'A pop-up storybook action RPG for browser, Android and iOS.', rights: 'All rights reserved.', email: 'Email', legalNav: 'Legal and help', languages: 'Language',
  },
};
