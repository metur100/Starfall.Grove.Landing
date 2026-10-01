import type { HeroId, LevelId } from '@game/game/types';
import type { TraitId } from './i18n/ui.en';

// What the landing page shows about each hero beyond the game's own hero data (spells.ts): the guardians Umbra's
// shadow becomes for them and the land shown behind them. Their epithet, story and companion are words, so they are
// in src/i18n/ui.*.ts.

export type HeroPitch = { guardians: string[]; land: LevelId };

export const PITCH: Record<HeroId, HeroPitch> = {
  mira: { guardians: ['Mossback', 'Bramble Warden', 'The Hollow Star', 'Pyrrhus', 'The Eclipse Sovereign'], land: 'summit' },
  kael: { guardians: ['The Hollow Bulwark', 'Ser Briarthorn', 'The Frost Marshal', 'The Iron Colossus', 'The Black Oath'], land: 'meadow' },
  lyra: { guardians: ['Gloamgill', 'The Pale Huntress', 'Queen Hoarfrost', 'Cinderwyrm', 'The Endless Winter Night'], land: 'woods' },
  riven: { guardians: ['Corvane', 'Silkmother Vesh', 'Nullface', 'The Ashen Broker', 'The Shadow That Chose'], land: 'ember' },
  wren: { guardians: ['Gorehide', 'Duskmane', 'Starhorn', 'The Duneworm', 'The Moon-Eater'], land: 'meadow' },
};

/** How each hero plays, as the game's own select screen shows it (pips out of five). */
export const TRAITS: Record<HeroId, Array<[TraitId, number]>> = {
  mira: [['range', 5], ['toughness', 1], ['magic', 5], ['speed', 3]],
  kael: [['range', 1], ['toughness', 5], ['might', 5], ['speed', 3]],
  lyra: [['range', 5], ['toughness', 2], ['control', 5], ['speed', 3]],
  riven: [['range', 2], ['toughness', 3], ['burst', 5], ['speed', 4]],
  wren: [['range', 5], ['toughness', 3], ['companion', 5], ['speed', 5]],
};
