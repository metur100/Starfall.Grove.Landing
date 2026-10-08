// The Mini Rift page: everything you read is plain HTML in minirift.html. This adds the shared page behaviour (menu,
// store badges, reveals and motion), the game playing through its screenshots inside the phone at the top, and the
// screenshot gallery you can swipe, drag or step through.
import { setupPage } from './site-page';

setupPage();
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── the phone at the top: its screenshots cross-fade, while the top section is on screen
const device = document.querySelector('.mr-device');
if (device && !reduced) {
  const shots = Array.from(device.querySelectorAll('img'));
  let i = 0, visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(device);
  setInterval(() => {
    if (!visible || document.hidden) return;
    shots[i].classList.remove('on');
    i = (i + 1) % shots.length;
    shots[i].classList.add('on');
  }, 3200);
}

// ── the gallery: a row of screenshots that snaps, with arrows, dots, keys and mouse dragging
const track = document.querySelector<HTMLElement>('.gallery-track');
const dots = document.querySelector<HTMLElement>('.gallery-dots');
if (track && dots) {
  const figs = Array.from(track.querySelectorAll('figure'));
  figs.forEach((_, n) => { const d = document.createElement('i'); d.addEventListener('click', () => go(n)); dots.appendChild(d); });
  const current = () => { const mid = track.scrollLeft + track.clientWidth / 2; let best = 0, bd = Infinity; figs.forEach((f, n) => { const c = f.offsetLeft + f.offsetWidth / 2, d = Math.abs(c - mid); if (d < bd) { bd = d; best = n; } }); return best; };
  const go = (n: number) => { const f = figs[Math.max(0, Math.min(figs.length - 1, n))]; track.scrollTo({ left: f.offsetLeft - (track.clientWidth - f.offsetWidth) / 2, behavior: reduced ? 'auto' : 'smooth' }); };
  const mark = () => { const c = current(); Array.from(dots.children).forEach((d, n) => d.classList.toggle('on', n === c)); figs.forEach((f, n) => f.classList.toggle('on', n === c)); };
  track.addEventListener('scroll', () => requestAnimationFrame(mark), { passive: true });
  document.querySelectorAll<HTMLButtonElement>('.gallery-nav [data-dir]').forEach(b => b.addEventListener('click', () => go(current() + Number(b.dataset.dir))));
  track.addEventListener('keydown', e => { if (e.key === 'ArrowRight') { e.preventDefault(); go(current() + 1); } if (e.key === 'ArrowLeft') { e.preventDefault(); go(current() - 1); } });
  // Dragging with a mouse (touch screens scroll it natively).
  let drag: { x: number; left: number } | null = null;
  track.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; drag = { x: e.clientX, left: track.scrollLeft }; track.classList.add('dragging'); });
  addEventListener('pointermove', e => { if (drag) track.scrollLeft = drag.left - (e.clientX - drag.x); });
  addEventListener('pointerup', () => { if (!drag) return; drag = null; track.classList.remove('dragging'); go(current()); });
  mark();
}
