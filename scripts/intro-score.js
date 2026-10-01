// The score of the landing page's intro film (public/Intro.mp4), with its sound effects, written for the film's five
// shots. It uses the game's own instruments (harp, flute, string pads, bass, bells, brass and drums, as in the game's
// src/game/music.ts), renders offline in a browser and returns a 16-bit stereo WAV as base64.
// `npm run score-intro` renders it and puts it under the film.
//
// The film's shots, and what the music and the effects follow (seconds):
//   0.0  The night the star fell  · a quiet paper valley; a shooting star crosses at 0.7, a second one falls onto
//                                   the hill at 3.0 and lands at 3.55
//   5.9  The lights are going out · the beacon tower dims (7.4), purple shadow spreads (8.0–10.4), the lantern goes out (9.45)
//  11.77 Five heroes               · a storybook; the heroes pop up out of it at 11.8, 12.35, 12.8, 14.0 and 14.5
//  17.63 One valley, four lands    · the camera pans across meadow, woods, summit and the lava of the Ember Wastes
//  23.5  Starfall Grove            · a star grows and bursts (24.3), paper pages fan open (24.75–26.3), the title (26.6)
// Every shot is 5.87 s, so the tempo is set to make each shot exactly two bars of 4/4.
window.renderIntroScore = async function renderIntroScore() {
  const SR = 48000, END = 29.4, ac = new OfflineAudioContext(2, Math.ceil(SR * END), SR);
  const SHOT = [0, 5.9, 11.767, 17.633, 23.5], B = 5.8667 / 8; // B: one beat
  const at = (shot, beat) => SHOT[shot] + beat * B;
  let seed = 7; const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };

  // ─────────── notes
  const PC = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  const hz = n => { const m = /^([A-G])([#b]?)(-?\d)$/.exec(n); return 440 * 2 ** ((12 * (+m[3] + 1) + PC[m[1]] + (m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0) - 69) / 12); };

  // ─────────── the mixer: master, a hall reverb, and buses
  const comp = ac.createDynamicsCompressor(); comp.threshold.value = -14; comp.ratio.value = 3; comp.attack.value = .01; comp.release.value = .25;
  // The low end is kept light, so the score stays clear on phone and laptop speakers.
  const hp = ac.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 32; const shelf = ac.createBiquadFilter(); shelf.type = 'lowshelf'; shelf.frequency.value = 160; shelf.gain.value = -5;
  const master = ac.createGain(); master.gain.value = .9; master.connect(hp); hp.connect(shelf); shelf.connect(comp); comp.connect(ac.destination);
  master.gain.setValueAtTime(.9, END - 1.1); master.gain.linearRampToValueAtTime(0, END - .02);
  const impulse = (dur, decay) => {
    const b = ac.createBuffer(2, Math.ceil(SR * dur), SR);
    for (let c = 0; c < 2; c++) { const d = b.getChannelData(c); for (let i = 0; i < d.length; i++) d[i] = (rnd() * 2 - 1) * (1 - i / d.length) ** decay; }
    return b;
  };
  const conv = ac.createConvolver(); conv.buffer = impulse(3.2, 3); const wet = ac.createGain(); wet.gain.value = .55;
  conv.connect(wet); wet.connect(master);
  const noise = kind => {
    const b = ac.createBuffer(1, SR * 3, SR), d = b.getChannelData(0); let l = 0, b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < d.length; i++) {
      const w = rnd() * 2 - 1;
      if (kind === 'white') d[i] = w;
      else if (kind === 'brown') { l = (l + .02 * w) / 1.02; d[i] = l * 3.5; }
      else { b0 = .99765 * b0 + w * .099; b1 = .963 * b1 + w * .2965; b2 = .57 * b2 + w * 1.0527; d[i] = (b0 + b1 + b2 + w * .1848) * .2; }
    }
    return b;
  };
  const N = { white: noise('white'), pink: noise('pink'), brown: noise('brown') };
  const bus = (vol, rev, pan = 0, type = '', freq = 0) => {
    const g = ac.createGain(); g.gain.value = vol; let head = g;
    if (type) { const f = ac.createBiquadFilter(); f.type = type; f.frequency.value = freq; g.connect(f); head = f; }
    const p = ac.createStereoPanner(); p.pan.value = pan; head.connect(p); p.connect(master);
    if (rev) { const s = ac.createGain(); s.gain.value = rev; p.connect(s); s.connect(conv); }
    return g;
  };
  const BUS = {
    harp: bus(.11, .4, -.25, 'lowpass', 4200), lead: bus(.12, .45, .05, 'lowpass', 6000), pad: bus(.07, .4, 0, 'lowpass', 1500),
    dark: bus(.07, .5, 0, 'lowpass', 900), bass: bus(.12, .06, 0, 'lowpass', 1000), bell: bus(.07, .55, .3), brass: bus(.085, .25, -.12),
    drum: bus(.2, .12), shk: bus(.045, .08, .25, 'highpass', 7000),
  };

  // ─────────── instruments (as in the game)
  const pw = h => { const im = new Float32Array([0, ...h]); return ac.createPeriodicWave(new Float32Array(im.length), im); };
  const WV = { harp: pw([1, .5, .28, .14, .08, .04]), bright: pw([0, .3, .2, .15, .1, .08, .06]), flute: pw([1, .18, .06, .02]) };
  const osc = (type, f, t, end, det = 0) => { const o = ac.createOscillator(); if (typeof type === 'string') o.type = type; else o.setPeriodicWave(type); o.frequency.value = f; o.detune.value = det; o.start(t); o.stop(end); return o; };
  const amp = out => { const g = ac.createGain(); g.gain.value = 0; g.connect(out); return g; };
  const pluck = (g, t, v, d, a = .004) => { g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + a); g.gain.exponentialRampToValueAtTime(.0001, t + d); };
  const sus = (g, t, v, a, d, rel, fall = 1) => { const h = t + Math.max(a, d); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + a); g.gain.linearRampToValueAtTime(v * fall, h); g.gain.setTargetAtTime(0, h, rel / 4); };
  const src = (buf, t, dur) => { const s = ac.createBufferSource(); s.buffer = buf; s.start(t, rnd() * 1.5, dur + .05); return s; };

  const harp = (o, t, f, d, v) => { const g1 = amp(o), g2 = amp(o); osc(WV.harp, f, t, t + d + .05).connect(g1); osc(WV.bright, f, t, t + .4).connect(g2); pluck(g1, t, v, d); pluck(g2, t, v * .4, .3); };
  const flute = (o, t, f, d, v) => {
    const g = amp(o), end = t + Math.max(.075, d) + .35, x = osc(WV.flute, f, t, end); x.connect(g);
    x.detune.setValueAtTime(-16, t); x.detune.linearRampToValueAtTime(0, t + .07); sus(g, t, v, .075, d, .25, .8);
    if (d > .4) { const l = osc('sine', 5.4, t, end), lg = ac.createGain(); lg.gain.value = 0; lg.gain.setValueAtTime(0, t + .24); lg.gain.linearRampToValueAtTime(12, t + .65); l.connect(lg); lg.connect(x.detune); }
    const n = src(N.white, t, .2), bp = ac.createBiquadFilter(), ng = amp(o); bp.type = 'bandpass'; bp.frequency.value = Math.min(9000, f * 2.5); bp.Q.value = 1.4; n.connect(bp); bp.connect(ng); pluck(ng, t, v * .22, .16, .02);
  };
  const pad = (o, t, f, d, v, att = .9) => { const g = amp(o), end = t + Math.max(att, d) + 1.6; for (const det of [-7, 7]) osc('sawtooth', f, t, end, det + (rnd() - .5) * 3).connect(g); sus(g, t, v * .5, att, d, 1.4); };
  const bass = (o, t, f, d, v) => { const g = amp(o), end = t + d + .35, tg = ac.createGain(); osc('sine', f, t, end).connect(g); tg.gain.value = .35; osc('triangle', f, t, end).connect(tg); tg.connect(g); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + .012); g.gain.setTargetAtTime(v * .55, t + .012, .18); g.gain.setTargetAtTime(0, t + d, .06); };
  const bell = (o, t, f, d, v) => { [[1, 1], [2.76, .35], [5.4, .15]].forEach(([m, a], j) => { if (j && f * m > 15000) return; const dd = d / Math.sqrt(m), g = amp(o); osc('sine', f * m, t, t + dd + .05).connect(g); pluck(g, t, v * a, dd, .003); }); };
  const brass = (o, t, f, d, v, bright = 2400) => {
    const g = amp(o), lp = ac.createBiquadFilter(), end = t + Math.max(.03, d) + .35;
    lp.type = 'lowpass'; lp.Q.value = 1.6; lp.frequency.setValueAtTime(Math.max(300, f), t); lp.frequency.linearRampToValueAtTime(bright, t + .05); lp.frequency.setTargetAtTime(bright * .4 + f, t + .06, .22); lp.connect(g);
    for (const det of [-6, 6]) osc('sawtooth', f, t, end, det).connect(lp); sus(g, t, v * .5, .03, d, .25, .8);
  };
  const kick = (o, t, v) => { const g = amp(o), x = osc('sine', 120, t, t + .45); x.frequency.setValueAtTime(120, t); x.frequency.exponentialRampToValueAtTime(45, t + .13); x.connect(g); pluck(g, t, v, .4, .002); };
  const tom = (o, t, f, v, d = .4) => { const g = amp(o), x = osc('sine', f, t, t + d + .05), ng = amp(o); x.frequency.setValueAtTime(f, t); x.frequency.exponentialRampToValueAtTime(f * .62, t + .25); x.connect(g); pluck(g, t, v, d, .002); src(N.brown, t, .15).connect(ng); pluck(ng, t, v * .5, .13, .002); };
  const shaker = (o, t, v, d = .045) => { const g = amp(o); src(N.white, t, d).connect(g); pluck(g, t, v, d, .008); };

  // ─────────── sound effects
  /** A panned effect chain: returns its input; pan can move from `p0` to `p1` between t0 and t1. */
  const fx = (vol, rev, p0 = 0, p1 = p0, t0 = 0, t1 = 0) => {
    const g = ac.createGain(); g.gain.value = vol; const p = ac.createStereoPanner(); p.pan.setValueAtTime(p0, Math.max(0, t0)); if (t1 > t0) p.pan.linearRampToValueAtTime(p1, t1);
    g.connect(p); p.connect(master); if (rev) { const s = ac.createGain(); s.gain.value = rev; p.connect(s); s.connect(conv); } return g;
  };
  const filtered = (buf, t, dur, type, f0, f1, q, out) => {
    const s = src(buf, t, dur), f = ac.createBiquadFilter(); f.type = type; f.Q.value = q; f.frequency.setValueAtTime(f0, t); f.frequency.exponentialRampToValueAtTime(f1, t + dur);
    const g = amp(out); s.connect(f); f.connect(g); return g;
  };
  /** Air rushing past, with a glittering trail. */
  const whoosh = (t0, t1, p0, p1, f0, f1, v) => {
    const out = fx(1, .5, p0, p1, t0, t1), g = filtered(N.pink, t0, t1 - t0, 'bandpass', f0, f1, 1.8, out), pk = t0 + (t1 - t0) * .6;
    g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(v, pk); g.gain.exponentialRampToValueAtTime(.001, t1);
    const glit = ['D7', 'A6', 'F#6', 'E7', 'B6', 'D7', 'F#7', 'A6'];
    for (let i = 0; i < 9; i++) bell(out, t0 + (t1 - t0) * (.15 + i * .09), hz(glit[i % glit.length]), .6, v * .12 * (1 - i / 12));
  };
  const sparkle = (t, dur, n, pan, v, notes = ['D6', 'F#6', 'A6', 'B6', 'D7', 'E7', 'F#7', 'A7']) => {
    const out = fx(1, .6, pan); for (let i = 0; i < n; i++) bell(out, t + rnd() * dur, hz(notes[Math.floor(rnd() * notes.length)]), .5 + rnd() * .6, v * (.5 + rnd() * .5));
  };
  /** A soft landing thump with a low tail. */
  const impact = (t, v, f = 90, pan = 0) => {
    const out = fx(1, .45, pan), g = amp(out), x = osc('sine', f, t, t + 1.4); x.frequency.setValueAtTime(f, t); x.frequency.exponentialRampToValueAtTime(f * .38, t + .7); x.connect(g); pluck(g, t, v, 1.3, .004);
    const n = filtered(N.brown, t, .9, 'lowpass', 900, 120, .7, out); pluck(n, t, v * .7, .8, .004);
  };
  const crash = (t, v, d = 2.8) => { const out = fx(1, .5, 0), g = filtered(N.white, t, d, 'highpass', 5200, 3000, .5, out); pluck(g, t, v, d, .003); const s = filtered(N.white, t, d * .7, 'bandpass', 9000, 6000, 3, out); pluck(s, t, v * .5, d * .7, .01); };
  /** A reverse-cymbal swell, cut at t1. */
  const swell = (t0, t1, v, f = 3200, pan = 0) => { const out = fx(1, .35, pan), g = filtered(N.white, t0, t1 - t0 + .05, 'highpass', f * .6, f * 1.6, .7, out); g.gain.setValueAtTime(.0001, t0); g.gain.exponentialRampToValueAtTime(v, t1 - .02); g.gain.linearRampToValueAtTime(0, t1 + .03); };
  /** A small flame flickering: sparse crackles. */
  const crackle = (t0, t1, rate, v, pan) => { const out = fx(1, .15, pan); for (let t = t0; t < t1; t += rnd() * 2 / rate) { const g = filtered(N.white, t, .012, 'bandpass', 2400 + rnd() * 2600, 2000, 1.2, out); pluck(g, t, v * (.3 + rnd() * .7), .01 + rnd() * .012, .001); } };
  /** A lantern blown out. */
  const puff = (t, v, pan) => { const out = fx(1, .3, pan), g = filtered(N.pink, t, .5, 'lowpass', 1800, 160, .8, out); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + .04); g.gain.exponentialRampToValueAtTime(.001, t + .48); };
  /** A paper figure popping up out of the book: a quick flap and a soft thump. */
  const paperPop = (t, v, pan) => {
    const out = fx(1, .3, pan), g = filtered(N.white, t, .09, 'bandpass', 700, 3800, 1.3, out); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + .015); g.gain.exponentialRampToValueAtTime(.001, t + .09);
    const th = amp(out), x = osc('sine', 170, t + .03, t + .2); x.frequency.setValueAtTime(170, t + .03); x.frequency.exponentialRampToValueAtTime(80, t + .15); x.connect(th); pluck(th, t + .03, v * .8, .14, .003);
  };
  /** Paper pages turning: a run of rustles and a flap at the end. */
  const rustle = (t0, t1, v, pan, flaps = 1) => {
    const out = fx(1, .25, pan);
    for (let t = t0; t < t1; t += .018 + rnd() * .03) { const g = filtered(N.white, t, .05, 'bandpass', 1800 + rnd() * 3500, 2400, 1, out); pluck(g, t, v * (.2 + rnd() * .5) * Math.sin(Math.PI * (t - t0) / (t1 - t0)), .04, .004); }
    for (let i = 0; i < flaps; i++) { const t = t0 + (t1 - t0) * (i + 1) / flaps - .04, g = filtered(N.pink, t, .12, 'bandpass', 900, 2600, .9, out); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v * .9, t + .02); g.gain.exponentialRampToValueAtTime(.001, t + .12); }
  };
  const wind = (t0, t1, v, f, pan = 0) => { const out = fx(1, .3, pan), g = filtered(N.pink, t0, t1 - t0, 'bandpass', f, f * 1.4, .9, out); g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(v, t0 + (t1 - t0) * .4); g.gain.linearRampToValueAtTime(0, t1); };
  const chirp = (t, v, pan) => { const out = fx(1, .3, pan); for (let i = 0; i < 2 + Math.floor(rnd() * 3); i++) { const s = t + i * .09, g = amp(out), x = osc('sine', 3000, s, s + .08), f = 2600 + rnd() * 1400; x.frequency.setValueAtTime(f, s); x.frequency.exponentialRampToValueAtTime(f * 1.45, s + .05); x.connect(g); pluck(g, s, v, .07, .004); } };
  const rumble = (t0, t1, v, pan) => { const out = fx(1, .2, pan), g = filtered(N.brown, t0, t1 - t0, 'lowpass', 260, 180, .7, out); g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(v, t0 + .6); g.gain.linearRampToValueAtTime(v * .8, t1 - .3); g.gain.linearRampToValueAtTime(0, t1); };
  const bubbles = (t0, t1, n, v, pan) => { const out = fx(1, .2, pan); for (let i = 0; i < n; i++) { const t = t0 + rnd() * (t1 - t0), f = 110 + rnd() * 140, g = amp(out), x = osc('sine', f, t, t + .14); x.frequency.setValueAtTime(f, t); x.frequency.exponentialRampToValueAtTime(f * 2.2, t + .1); x.connect(g); pluck(g, t, v * (.5 + rnd() * .5), .12, .006); } };

  // ─────────── helpers for writing the parts
  const chordAt = (o, t, notes, d, v, att) => notes.forEach(n => pad(o, t, hz(n), d, v, att));
  const line = (ins, o, shot, start, notes, v, scale = 1) => { let b = start; for (const tok of notes.split(/\s+/)) { const [n, len] = tok.split(':'); if (n !== 'r') ins(o, at(shot, b), hz(n), +len * B * scale, v); b += +len; } };
  const arp = (o, shot, b0, b1, notes, step, v, dec = 1.6, ins = harp) => { let i = 0; for (let b = b0; b < b1 - 1e-6; b += step) ins(o, at(shot, b), hz(notes[i++ % notes.length]), dec, v); };

  // ═══════════ Shot 1 · The night the star fell — a music box in D, wondering
  chordAt(BUS.pad, at(0, 0), ['D3', 'F#3', 'A3', 'E4'], 4 * B, .5, 1.6);
  chordAt(BUS.pad, at(0, 4), ['G3', 'B3', 'D4', 'F#4'], 2 * B, .5, .8);
  chordAt(BUS.pad, at(0, 6), ['A3', 'D4', 'E4'], 2 * B, .45, .6);
  bass(BUS.bass, at(0, 0), hz('D2'), 4 * B, .35); bass(BUS.bass, at(0, 4), hz('G2'), 2 * B, .35); bass(BUS.bass, at(0, 6), hz('A2'), 2 * B, .32);
  arp(BUS.harp, 0, .5, 4, ['D4', 'F#4', 'A4', 'D5', 'E5', 'D5', 'A4', 'F#4'], .5, .32);
  arp(BUS.harp, 0, 4, 6, ['G4', 'B4', 'D5', 'F#5'], .5, .32);
  arp(BUS.harp, 0, 6, 8, ['A4', 'D5', 'E5', 'A5'], .5, .3);
  line(bell, BUS.bell, 0, 2, 'A5:1 D6:1 C#6:.5 B5:.5 A5:1 B5:1 E5:1.5 r:.5', .5, 2.2);
  wind(0, 5.9, .05, 700, -.3);
  for (let i = 0; i < 6; i++) sparkle(.4 + i * .9, .5, 1, (rnd() - .5) * 1.2, .14); // petals drifting
  whoosh(.55, 1.75, -.2, .9, 900, 4200, .22);   // the first star streaks across the top
  sparkle(.8, .9, 6, .5, .22);
  whoosh(2.75, 3.6, .7, 0, 4800, 700, .26);     // the second falls onto the hill…
  impact(3.55, .5, 85, 0);                      // …and lands
  bell(fx(1, .7, 0), 3.56, hz('D6'), 3, .2); bell(fx(1, .7, 0), 3.58, hz('A6'), 2.6, .14); sparkle(3.6, 1.6, 10, 0, .2);
  swell(4.6, 5.9, .05, 2000);

  // ═══════════ Shot 2 · The lights are going out — D minor, a flute alone, then the shadow
  for (const [n, v] of [['D2', .3], ['A2', .2]]) { const g = amp(BUS.dark); osc('sine', hz(n), at(1, 0), END).connect(g); g.gain.setValueAtTime(0, at(1, 0)); g.gain.linearRampToValueAtTime(v, at(1, 2)); g.gain.linearRampToValueAtTime(v * 1.5, 10.4); g.gain.linearRampToValueAtTime(0, 11.9); }
  chordAt(BUS.pad, at(1, 0), ['D3', 'F3', 'A3'], 3 * B, .48, 1);
  arp(BUS.harp, 1, 0, 3, ['D4', 'F4', 'A4', 'D5', 'A4', 'F4'], .5, .3, 2.2);
  line(flute, BUS.lead, 1, .5, 'A4:1.5 F4:1 E4:.5 D4:1.5', .65);
  crackle(5.95, 9.45, 22, .1, .45);              // the lantern's flame
  for (let i = 0; i < 4; i++) bell(BUS.bell, 7.45 + i * .22, hz(['A5', 'F5', 'D5', 'A4'][i]), 1.6, .32 - i * .04); // the tower light dims
  chordAt(BUS.dark, 8.0, ['Bb2', 'A3', 'E4', 'Bb4'], 2.4, .6, 1.8);   // the purple shadow spreads
  swell(8.0, 10.35, .09, 900); wind(7.8, 11.5, .12, 260, 0);
  for (let i = 0; i < 4; i++) { const t = at(1, 2 + i * 1.5); tom(BUS.drum, t, 58, .25 + i * .07, .6); tom(BUS.drum, t + .26, 52, .16 + i * .05, .6); } // a heartbeat
  puff(9.45, .3, .45); bell(fx(1, .6, .45), 9.5, hz('F5'), 1.4, .08);   // the lantern goes out
  impact(10.38, .45, 60, 0);
  swell(10.9, 11.76, .12, 4200);                 // breath in before the heroes
  arp(BUS.harp, 1, 7.2, 8, ['D4', 'G4', 'B4', 'D5', 'G5', 'B5', 'D6'], .11, .3, 1.4);

  // ═══════════ Shot 3 · Five heroes — G major, the light comes back, each hero pops up with a note
  chordAt(BUS.pad, at(2, 0), ['G3', 'B3', 'D4'], 2 * B, .5, .4);
  chordAt(BUS.pad, at(2, 2), ['E3', 'G3', 'B3', 'D4'], 2 * B, .5, .5);
  chordAt(BUS.pad, at(2, 4), ['C3', 'E3', 'G3', 'C4'], 2 * B, .52, .5);
  chordAt(BUS.pad, at(2, 6), ['D3', 'F#3', 'A3', 'D4'], 2 * B, .55, .5);
  [['G2', 0], ['E2', 2], ['C2', 4], ['D2', 6]].forEach(([n, b]) => { bass(BUS.bass, at(2, b), hz(n), B * .9, .4); bass(BUS.bass, at(2, b + 1), hz(n), B * .9, .3); });
  arp(BUS.harp, 2, 0, 2, ['G4', 'D5', 'G5', 'B5'], .5, .3); arp(BUS.harp, 2, 2, 4, ['E4', 'B4', 'E5', 'G5'], .5, .3);
  arp(BUS.harp, 2, 4, 6, ['C5', 'G5', 'C6', 'E6'], .5, .3); arp(BUS.harp, 2, 6, 8, ['D5', 'A5', 'D6', 'F#6'], .5, .3);
  for (let b = 2; b < 8; b += .5) shaker(BUS.shk, at(2, b), b % 1 ? .5 : .8);
  rustle(11.78, 12.25, .14, -.3, 1);             // a page turns
  [[11.8, 'D5', .55], [12.35, 'G5', -.2], [12.8, 'B5', .05], [14.0, 'D6', .3], [14.5, 'G6', -.4]].forEach(([t, n, p]) => {
    paperPop(t, .3, p); bell(fx(1, .6, p), t + .02, hz(n), 2, .2); bell(fx(1, .6, p), t + .05, hz(n) * 2, 1.2, .06);
  });
  sparkle(14.5, .8, 5, -.3, .16);
  line(flute, BUS.lead, 2, 4, 'E5:.5 G5:.5 C6:1 B5:.5 A5:.5 F#5:.5 A5:.5', .55);
  brass(BUS.brass, at(2, 6), hz('D4'), 2 * B, .45); brass(BUS.brass, at(2, 6), hz('F#4'), 2 * B, .4); brass(BUS.brass, at(2, 6), hz('A4'), 2 * B, .4);
  tom(BUS.drum, at(2, 7), 130, .3); tom(BUS.drum, at(2, 7.5), 110, .35); swell(at(2, 6.5), at(3, 0), .06, 3600);

  // ═══════════ Shot 4 · One valley, four lands — the adventure theme, and each land's sound as the camera passes
  const LANDS = [['D3', 'F#3', 'A3', 'D4'], ['B2', 'D3', 'F#3', 'B3'], ['G2', 'B2', 'D3', 'G3'], ['A2', 'C#3', 'E3', 'A3']];
  LANDS.forEach((c, i) => chordAt(BUS.pad, at(3, i * 2), c, 2 * B, .65, .25));
  ['D2', 'B1', 'G1', 'A1'].forEach((n, i) => { for (let k = 0; k < 4; k++) bass(BUS.bass, at(3, i * 2 + k * .5), hz(n) * (k === 2 ? 2 : 1), B * .45, k ? .32 : .45); });
  for (let b = 0; b < 8; b++) { kick(BUS.drum, at(3, b), b % 2 ? .42 : .65); if (b % 2) kick(BUS.drum, at(3, b + .5), .28); }
  for (let b = 0; b < 8; b += .5) shaker(BUS.shk, at(3, b), b % 1 ? .55 : .85);
  tom(BUS.drum, at(3, 7), 150, .35); tom(BUS.drum, at(3, 7.25), 130, .35); tom(BUS.drum, at(3, 7.5), 110, .4); tom(BUS.drum, at(3, 7.75), 90, .45);
  line((o, t, f, d, v) => brass(o, t, f, d, v, 2800), BUS.brass, 3, 0, 'D5:1.5 E5:.5 F#5:1 D5:.5 E5:.5 G5:1.5 F#5:.5 E5:1 A5:1', .7);
  line(flute, BUS.lead, 3, 0, 'D6:1.5 E6:.5 F#6:1 D6:.5 E6:.5 G6:1.5 F#6:.5 E6:1 A6:1', .4);
  arp(BUS.harp, 3, 0, 8, ['D5', 'A5', 'F#5', 'A5', 'B4', 'F#5', 'D5', 'F#5', 'G4', 'D5', 'B4', 'D5', 'A4', 'E5', 'C#5', 'E5'], .5, .22, 1);
  for (let i = 0; i < 6; i++) chirp(17.8 + i * .28 + rnd() * .1, .045, -.7 + rnd() * .3);   // birds in the meadow
  sparkle(19.0, 1.6, 7, -.25, .1, ['A6', 'D7', 'E7', 'F#7']);                               // the lanterns of the woods
  wind(19.9, 22.2, .09, 1200, .1); sparkle(20.4, 1.4, 6, .2, .09, ['E7', 'F#7', 'A7', 'B7']); // frost on the summit
  rumble(21.0, 23.6, .2, .6); bubbles(21.3, 23.4, 9, .1, .65); crackle(21.2, 23.4, 14, .08, .7); // lava in the Ember Wastes
  swell(22.3, 23.5, .1, 3000);

  // ═══════════ Shot 5 · Starfall Grove — the star grows and bursts, the pages fan open, and the title rings out
  chordAt(BUS.pad, 23.5, ['A2', 'D3', 'E3', 'A3'], .85, .45, .3);
  bass(BUS.bass, 23.5, hz('A1'), .8, .4);
  ['D5', 'F#5', 'A5', 'D6', 'E6', 'F#6', 'A6', 'D7', 'F#7'].forEach((n, i) => bell(BUS.bell, 23.5 + .78 * (1 - (1 - i / 9) ** 1.6), hz(n), .8, .25)); // the star grows
  swell(23.5, 24.3, .14, 2600);
  crash(24.3, .2); impact(24.3, .55, 70, 0);                                                 // it bursts
  ['D7', 'A6', 'F#6', 'D6', 'A5', 'F#5', 'D5'].forEach((n, i) => bell(fx(1, .7, (i % 2 ? .3 : -.3)), 24.32 + i * .07, hz(n), 1.6, .18));
  sparkle(24.35, 2.2, 18, 0, .12);
  chordAt(BUS.pad, 24.3, ['D3', 'A3', 'E4', 'F#4'], 2.2, .4, .5);
  rustle(24.75, 25.5, .13, -.35, 2); rustle(25.4, 26.3, .14, .35, 2);                        // the pages fan open
  arp(BUS.harp, 4, 3.4, 4.2, ['A4', 'D5', 'E5', 'F#5', 'A5', 'D6'], .135, .26, 1.2);
  const T = 26.6;                                                                             // the title
  tom(BUS.drum, T, 62, .7, 1.4); kick(BUS.drum, T, .5); crash(T, .14, 3);
  chordAt(BUS.pad, T, ['D3', 'A3', 'D4', 'F#4', 'A4'], END - T, .6, .15);
  [['D4', .45], ['F#4', .4], ['A4', .4], ['D5', .38]].forEach(([n, v]) => brass(BUS.brass, T, hz(n), 1.6, v, 3000));
  bass(BUS.bass, T, hz('D2'), END - T, .5);
  [['D6', .4], ['A6', .3], ['D7', .2]].forEach(([n, v]) => bell(BUS.bell, T, hz(n), 3, v));
  line(flute, BUS.lead, 4, 4.5, 'A5:1 F#5:.5 A5:.5 D6:2', .4);
  arp(BUS.harp, 4, 4.9, 8, ['D5', 'F#5', 'A5', 'D6', 'A5', 'F#5'], .5, .2, 2);
  sparkle(T + .2, END - T - .6, 14, 0, .1);

  // ─────────── render to 16-bit WAV
  const buf = await ac.startRendering(), L = buf.getChannelData(0), R = buf.getChannelData(1), n = L.length;
  let peak = 0; for (let i = 0; i < n; i++) peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
  const k = peak > 0 ? .89 / peak : 1, out = new DataView(new ArrayBuffer(44 + n * 4));
  const str = (o, s) => [...s].forEach((c, i) => out.setUint8(o + i, c.charCodeAt(0)));
  str(0, 'RIFF'); out.setUint32(4, 36 + n * 4, true); str(8, 'WAVEfmt '); out.setUint32(16, 16, true); out.setUint16(20, 1, true); out.setUint16(22, 2, true);
  out.setUint32(24, SR, true); out.setUint32(28, SR * 4, true); out.setUint16(32, 4, true); out.setUint16(34, 16, true); str(36, 'data'); out.setUint32(40, n * 4, true);
  for (let i = 0; i < n; i++) { out.setInt16(44 + i * 4, Math.max(-1, Math.min(1, L[i] * k)) * 32767, true); out.setInt16(46 + i * 4, Math.max(-1, Math.min(1, R[i] * k)) * 32767, true); }
  const bytes = new Uint8Array(out.buffer); let bin = ''; for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
};
