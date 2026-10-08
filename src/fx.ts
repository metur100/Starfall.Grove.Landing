// The page's motion, shared by every page: a progress thread along the top, layers that drift at their own speed as
// the page scrolls (data-parallax), paper cards that tilt toward the pointer with a glint of light (data-tilt), cards
// that rise in one after another (.stagger) or slide in from a side (data-reveal), numbers that count up
// (data-count), and a trail of little stars behind the mouse over the top section.
//
// Everything is skipped for people who ask their system for less motion. Tilting and the star trail only run with a
// mouse; phones get the scroll effects, which cost one transform per layer per frame.

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = () => matchMedia('(hover: hover) and (pointer: fine)').matches;

export function setupFx() {
  // Cards in a .stagger group arrive one after another.
  document.querySelectorAll('.stagger').forEach(g => Array.from(g.children).forEach((c, i) => (c as HTMLElement).style.setProperty('--i', String(i))));
  if (reduced()) { document.querySelectorAll('[data-count]').forEach(el => { el.textContent = (el as HTMLElement).dataset.count!; }); return; }

  // ── the scroll thread along the top
  const thread = document.createElement('div');
  thread.className = 'scroll-thread';
  thread.setAttribute('aria-hidden', 'true');
  document.body.appendChild(thread);

  // ── parallax layers, moved only while on screen
  const layers = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]')).map(el => ({ el, k: Number(el.dataset.parallax) || 0, on: true }));
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { const l = layers.find(x => x.el === e.target); if (l) l.on = e.isIntersecting; }), { rootMargin: '200px' });
    layers.forEach(l => io.observe(l.el));
  }
  let queued = false;
  const onScroll = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      const y = window.scrollY, max = document.documentElement.scrollHeight - innerHeight;
      thread.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      for (const l of layers) {
        if (!l.on) continue;
        const r = l.el.parentElement?.getBoundingClientRect();
        // Relative to where the layer's section sits, so a layer far down the page starts where it was drawn.
        const off = r ? -r.top : y;
        l.el.style.translate = `0 ${(off * l.k).toFixed(1)}px`;
      }
      document.body.classList.toggle('scrolled', y > innerHeight * .5);
    });
  };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  onScroll();

  // ── numbers that count up when they come into view
  const counters = document.querySelectorAll<HTMLElement>('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      const el = e.target as HTMLElement, to = Number(el.dataset.count), t0 = performance.now();
      const step = (t: number) => { const k = Math.min(1, (t - t0) / 900); el.textContent = String(Math.round(to * (1 - Math.pow(1 - k, 3)))); if (k < 1) requestAnimationFrame(step); };
      el.textContent = '0';
      requestAnimationFrame(step);
    }), { threshold: .6 });
    counters.forEach(c => io.observe(c));
  }

  if (!finePointer()) return;

  // ── paper cards tilting toward the pointer, with a glint where it is
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach(el => {
    el.classList.add('tilt');
    let raf = 0;
    el.addEventListener('pointermove', e => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        el.style.setProperty('--rx', `${((.5 - y) * 7).toFixed(2)}deg`);
        el.style.setProperty('--ry', `${((x - .5) * 9).toFixed(2)}deg`);
        el.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
        el.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
        el.classList.add('tilting');
      });
    });
    el.addEventListener('pointerleave', () => { cancelAnimationFrame(raf); el.classList.remove('tilting'); el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); });
  });

  // ── a trail of little stars behind the mouse over the top section
  const top = document.querySelector<HTMLElement>('.hero, .mr-hero');
  if (top) {
    let last = 0;
    top.addEventListener('pointermove', e => {
      const now = performance.now();
      if (now - last < 45) return;
      last = now;
      const s = document.createElement('i');
      s.className = 'spark';
      s.style.left = `${e.clientX}px`; s.style.top = `${e.clientY}px`;
      s.style.setProperty('--dx', `${(Math.random() - .5) * 40}px`);
      s.style.setProperty('--rot', `${Math.round(Math.random() * 180)}deg`);
      document.body.appendChild(s);
      s.addEventListener('animationend', () => s.remove());
    });
  }
}
