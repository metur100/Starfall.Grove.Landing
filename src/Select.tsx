import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { HEROES, HERO_ORDER, SPELLS } from '@game/game/spells';
import { SLOT_ORDER, makeGear, seeded } from '@game/game/gear';
import type { GearItem, GearSlot, HeroId, SpellId } from '@game/game/types';
import TitleBackdrop from '@game/TitleBackdrop';
import HeroStage from '@game/ui/HeroStage';
import { HeroFace } from '@game/ui/icons';
import site from '../site.json';
import { PITCH, TRAITS } from './heroes';
import { ui } from './i18n';

// The game's character select, as a section of the landing page: the chosen hero on the rune pedestal (drag to turn
// them), their traits and abilities on the left, the roster on the right, and below, the story only they play and the
// guardians they meet. "Legendary set" dresses them in a full set of legendary gear, as found in the Ember Wastes.
// While the section is off screen nothing is drawn: the backdrop and the pedestal are only mounted while it shows.
// The words come in the page's language (src/i18n); names, and in English the game's own descriptions, from the game.

export type Worn = Partial<Record<GearSlot, GearItem>>;
const legendary = (hero: HeroId): Worn => Object.fromEntries(SLOT_ORDER.map(slot => [slot, makeGear({ ilvl: 25, rarity: 'legendary', slot, hero, rand: seeded(`${hero}-${slot}`), uid: `${hero}-${slot}` })]));
const NONE: Worn = {};

export default function Select({ visible, onFilm }: { visible: boolean; onFilm: (hero: HeroId) => void }) {
  const [hero, setHero] = useState<HeroId>('mira');
  const [shown, setShown] = useState<SpellId | null>(null);
  const [dressed, setDressed] = useState(false);
  const info = HEROES[hero], pitch = PITCH[hero], words = ui.hero[hero], spell = shown && SPELLS[shown];
  const gear = useMemo(() => dressed ? legendary(hero) : NONE, [hero, dressed]);
  useEffect(() => setShown(null), [hero]);
  // The cast in the hero section picks a hero here.
  useEffect(() => {
    const pick = (e: Event) => { const id = (e as CustomEvent<HeroId>).detail; if (HERO_ORDER.includes(id)) setHero(id); };
    window.addEventListener('sg:hero', pick); return () => window.removeEventListener('sg:hero', pick);
  }, []);
  return <div className={`sel hero-${hero}`} onClick={() => setShown(null)}>
    <div className="sel-backdrop" aria-hidden="true">{visible && <TitleBackdrop key={pitch.land} level={pitch.land} />}</div>
    <div className="select-vignette" aria-hidden="true" />
    <div className="sel-grid">
      <nav className="roster" aria-label={ui.heroes}>
        {HERO_ORDER.map(id => {
          const h = HEROES[id];
          return <button key={id} type="button" className={`roster-card ${id === hero ? 'on' : ''}`} aria-pressed={id === hero} onClick={e => { e.stopPropagation(); setHero(id); }}>
            <span className="rc-face portrait"><HeroFace hero={id} /></span>
            <span className="rc-text"><b>{h.name}</b><em>{ui.hero[id].title ?? h.title}</em><small>{ui.hero[id].epithet}</small></span>
          </button>;
        })}
      </nav>
      <div className="sel-center">
        {visible ? <HeroStage hero={hero} gear={gear} mode="select" className="sel-stage" /> : <div className="sel-stage hero-stage" />}
        <div className="sel-stage-bar">
          <span className="sel-hint">{ui.dragToTurn(info.name)}</span>
          <button type="button" className={`gear-toggle ${dressed ? 'on' : ''}`} aria-pressed={dressed} onClick={e => { e.stopPropagation(); setDressed(d => !d); }}>
            <i aria-hidden="true">✦</i>{dressed ? ui.legendarySet : ui.tryLegendary}
          </button>
        </div>
      </div>
      <section className="select-info" key={`info-${hero}`} aria-live="polite">
        <small>{words.title ?? info.title} · {words.epithet}</small>
        <h3>{info.name}</h3>
        <p>{words.description ?? info.description}</p>
        <dl className="traits">{TRAITS[hero].map(([k, v]) => <div key={k}><dt>{ui.trait[k]}</dt><dd aria-label={ui.ofFive(v)}>{[1, 2, 3, 4, 5].map(n => <i key={n} className={n <= v ? 'on' : ''} />)}</dd></div>)}</dl>
        <div className="select-abilities">
          <div className="select-spells">{info.spells.map(id => <button type="button" key={id} className={`spell-chip ${shown === id ? 'on' : ''}`} aria-label={SPELLS[id].name} aria-expanded={shown === id} style={{ '--spell': SPELLS[id].color } as CSSProperties}
            onClick={e => { e.stopPropagation(); setShown(s => s === id ? null : id); }}><b>{SPELLS[id].icon}</b><small>{ui.map.lv} {SPELLS[id].level}</small></button>)}</div>
          {spell ? <div className="ability-card" role="dialog" aria-label={spell.name} style={{ '--spell': spell.color } as CSSProperties} onClick={e => { e.stopPropagation(); setShown(null); }}>
            <header><b>{spell.icon}</b><span><strong>{spell.name}</strong><em>{ui.learnedAt(spell.level)}{spell.cost ? ` · ${spell.cost} ${ui.resource[info.resource] ?? info.resource.toLowerCase()}` : ` · ${ui.free}`}{spell.cast ? ` · ${ui.cast(spell.cast)}` : ''}{spell.cooldown >= 1 ? ` · ${ui.cooldown(spell.cooldown)}` : ''}</em></span><i aria-hidden="true">✕</i></header>
            <p>{ui.spells[shown!] ?? spell.description}</p>
          </div> : <p className="sel-tip">{ui.tapAbility}</p>}
        </div>
      </section>
    </div>
    <article className="sel-story page" key={`story-${hero}`}>
      <div className="sel-story-text">
        <small className="page-eyebrow">{ui.ownStory(info.name)}</small>
        <p>{words.story}</p>
        {words.companion && <p className="sel-companion">{ui.travelsWith(words.companion)}</p>}
      </div>
      <div className="sel-guardians">
        <small className="page-eyebrow">{ui.guardiansOf(info.name)}</small>
        <ol>{pitch.guardians.map((g, i) => <li key={g} className={i === 4 ? 'final' : ''}><span>{['I', 'II', 'III', 'IV', '✹'][i]}</span>{g}</li>)}</ol>
      </div>
      <div className="sel-actions">
        <a className="btn primary" href={site.gameUrl}>{ui.playNow} <b>→</b></a>
        <button type="button" className="btn ghost" onClick={e => { e.stopPropagation(); onFilm(hero); }}><i className="play-dot" aria-hidden="true" />{ui.watchIntro(info.name)}</button>
      </div>
    </article>
  </div>;
}
