/* ──────────────────────────────────────────────────────────────
 * Provisions motion layer · motion.js
 * Shared by every page on provisions.soccer. Pairs with motion.css.
 *
 * Public API on window.Motion:
 *   Motion.transition(fn)        — run fn inside a view transition (sweep)
 *   Motion.splitFlapBoard(el, c) — build a split-flap board, returns {set}
 *   Motion.sfx.thunk()           — stamp press sound (caller gates it)
 *   Motion.sfx.clack()           — flap sound (caller gates it)
 *   Motion.reduced               — prefers-reduced-motion
 *
 * Opt-in via data attributes:
 *   data-stamp    — rubber-stamp entrance when scrolled into view
 *   data-ink      — ink-bleed reveal (blur soaks into the page)
 *   data-drift    — slow sine drift, amplitude follows scroll velocity
 *   data-inkpress — cursor-proximity ink darkening, per character
 *   data-wash     — halftone watermark of the Provisions mark (on a section)
 * ────────────────────────────────────────────────────────────── */
(() => {
  'use strict';

  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE = window.matchMedia('(pointer: fine)').matches;
  const root = document.documentElement;

  /* ── Sound: tiny mechanical noises, synthesized, no assets ── */
  const sfx = (() => {
    let ctx = null;
    function ensure() {
      if (ctx) return ctx;
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      return ctx;
    }
    // Browsers only allow audio after a gesture; warm the context on the first one.
    ['pointerdown', 'keydown'].forEach(ev =>
      window.addEventListener(ev, () => { const c = ensure(); if (c && c.state === 'suspended') c.resume(); }, { once: true, passive: true })
    );
    function ok() {
      if (REDUCED) return false;
      try { if (localStorage.getItem('m-sfx-off')) return false; } catch (e) {}
      const c = ensure();
      return !!(c && c.state === 'running');
    }
    function noise(c, dur) {
      const buf = c.createBuffer(1, Math.ceil(c.sampleRate * dur), c.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      const src = c.createBufferSource();
      src.buffer = buf;
      return src;
    }
    function thunk() {
      if (!ok()) return;
      const c = ctx, t = c.currentTime;
      const osc = c.createOscillator();
      const og = c.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(110, t);
      osc.frequency.exponentialRampToValueAtTime(48, t + 0.12);
      og.gain.setValueAtTime(0.10, t);
      og.gain.exponentialRampToValueAtTime(0.0004, t + 0.14);
      osc.connect(og).connect(c.destination);
      osc.start(t); osc.stop(t + 0.15);
      const n = noise(c, 0.035);
      const lp = c.createBiquadFilter();
      lp.type = 'lowpass'; lp.frequency.value = 420;
      const ng = c.createGain();
      ng.gain.setValueAtTime(0.05, t);
      ng.gain.exponentialRampToValueAtTime(0.0004, t + 0.035);
      n.connect(lp).connect(ng).connect(c.destination);
      n.start(t);
    }
    function clack() {
      if (!ok()) return;
      const c = ctx, t = c.currentTime;
      const n = noise(c, 0.02);
      const bp = c.createBiquadFilter();
      bp.type = 'bandpass'; bp.frequency.value = 2300; bp.Q.value = 1.1;
      const g = c.createGain();
      g.gain.setValueAtTime(0.06, t);
      g.gain.exponentialRampToValueAtTime(0.0004, t + 0.02);
      n.connect(bp).connect(g).connect(c.destination);
      n.start(t);
    }
    return { thunk, clack };
  })();

  /* ── View transition sweep ── */
  function transition(fn) {
    if (!REDUCED && document.startViewTransition) document.startViewTransition(fn);
    else fn();
  }

  /* ── Ink-bleed reveal ── */
  let inkCount = 0;
  function inkFilterFor(el) {
    const id = 'm-ink-' + (++inkCount);
    const ns = 'http://www.w3.org/2000/svg';
    let host = document.getElementById('m-ink-defs');
    if (!host) {
      host = document.createElementNS(ns, 'svg');
      host.id = 'm-ink-defs';
      host.setAttribute('width', '0');
      host.setAttribute('height', '0');
      host.style.position = 'absolute';
      host.setAttribute('aria-hidden', 'true');
      document.body.appendChild(host);
    }
    const filter = document.createElementNS(ns, 'filter');
    filter.id = id;
    filter.setAttribute('x', '-20%'); filter.setAttribute('y', '-20%');
    filter.setAttribute('width', '140%'); filter.setAttribute('height', '140%');
    const blur = document.createElementNS(ns, 'feGaussianBlur');
    blur.setAttribute('in', 'SourceGraphic');
    blur.setAttribute('stdDeviation', '0');
    const ct = document.createElementNS(ns, 'feComponentTransfer');
    const fa = document.createElementNS(ns, 'feFuncA');
    fa.setAttribute('type', 'table');
    fa.setAttribute('tableValues', '0 0 0.05 1 1');
    ct.appendChild(fa);
    filter.appendChild(blur);
    filter.appendChild(ct);
    host.appendChild(filter);
    return { id, blur };
  }
  function inkReveal(el) {
    el.classList.add('m-ink-on');
    if (REDUCED) return;
    const { id, blur } = inkFilterFor(el);
    const D = 850, start = performance.now();
    el.style.filter = 'url(#' + id + ')';
    function frame(now) {
      const p = Math.min(1, (now - start) / D);
      const e = 1 - Math.pow(1 - p, 3);
      blur.setAttribute('stdDeviation', String(7 * (1 - e)));
      el.style.opacity = String(Math.min(1, p * 5));
      if (p < 1) requestAnimationFrame(frame);
      else { el.style.filter = ''; el.style.opacity = ''; }
    }
    requestAnimationFrame(frame);
  }

  /* ── Halftone watermark (Provisions mark as a dot print) ── */
  function washInit(section) {
    const SRC = '/images/provisions-mark.png';
    const canvas = document.createElement('canvas');
    canvas.className = 'm-wash';
    canvas.setAttribute('aria-hidden', 'true');
    section.insertBefore(canvas, section.firstChild);
    const img = new Image();
    img.src = SRC;
    const CELLS = 44;
    let dots = null, size = 0;
    function sample() {
      const s = document.createElement('canvas');
      s.width = CELLS; s.height = CELLS;
      const sc = s.getContext('2d', { willReadFrequently: true });
      sc.drawImage(img, 0, 0, CELLS, CELLS);
      let data;
      try { data = sc.getImageData(0, 0, CELLS, CELLS).data; } catch (e) { return null; }
      const out = [];
      for (let y = 0; y < CELLS; y++) {
        for (let x = 0; x < CELLS; x++) {
          const a = data[(y * CELLS + x) * 4 + 3] / 255;
          if (a > 0.08) out.push({ x, y, a, j: Math.random() });
        }
      }
      return out;
    }
    function draw(progress) {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = canvas.getBoundingClientRect().width || 480;
      size = w;
      canvas.width = w * dpr; canvas.height = w * dpr;
      canvas.style.height = w + 'px';
      const c = canvas.getContext('2d');
      c.scale(dpr, dpr);
      const cell = w / CELLS;
      const ink = getComputedStyle(root).getPropertyValue('--leather-mid').trim() || '#4A3D32';
      c.fillStyle = ink;
      for (const d of dots) {
        const local = Math.max(0, Math.min(1, (progress - d.j * 0.7) / 0.3));
        if (!local) continue;
        const r = (cell * 0.5) * Math.sqrt(d.a) * (1 - Math.pow(1 - local, 2));
        c.beginPath();
        c.arc(d.x * cell + cell / 2, d.y * cell + cell / 2, r, 0, Math.PI * 2);
        c.fill();
      }
    }
    function develop() {
      if (!dots) dots = sample();
      if (!dots) { canvas.remove(); return; }
      if (REDUCED) { draw(1); return; }
      const D = 1400, start = performance.now();
      function frame(now) {
        const p = Math.min(1, (now - start) / D);
        draw(p);
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }
    // Repaint events recolor the print instantly.
    document.addEventListener('provisions:repaint', () => { if (dots) draw(1); });
    return { develop: () => { if (img.complete) develop(); else img.onload = develop; } };
  }

  /* ── Scroll-velocity drift ── */
  function driftInit(els) {
    if (REDUCED || !els.length) return;
    let lastY = window.scrollY, vel = 0, phase = 0;
    function frame() {
      const y = window.scrollY;
      const dy = Math.min(60, Math.abs(y - lastY));
      lastY = y;
      vel += (dy - vel) * 0.1;
      phase += 0.016;
      els.forEach((el, i) => {
        const amp = 1.1 + vel * 0.16;
        const ty = Math.sin(phase * 0.9 + i * 1.7) * amp;
        const rot = Math.sin(phase * 0.6 + i * 1.7) * amp * 0.035;
        el.style.transform = 'translateY(' + ty.toFixed(2) + 'px) rotate(' + rot.toFixed(3) + 'deg)';
      });
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ── Cursor-proximity ink press ── */
  function charify(el) {
    const walk = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        for (const ch of node.textContent) {
          if (/\s/.test(ch)) { frag.appendChild(document.createTextNode(ch)); continue; }
          const s = document.createElement('span');
          s.className = 'm-ch';
          s.textContent = ch;
          frag.appendChild(s);
        }
        node.parentNode.replaceChild(frag, node);
      } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'BR') {
        [...node.childNodes].forEach(walk);
      }
    };
    el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
    const wrap = document.createElement('span');
    wrap.setAttribute('aria-hidden', 'true');
    while (el.firstChild) wrap.appendChild(el.firstChild);
    el.appendChild(wrap);
    [...wrap.childNodes].forEach(walk);
    return [...el.querySelectorAll('.m-ch')];
  }
  function inkpressInit(el) {
    if (REDUCED || !FINE) return;
    const chars = charify(el);
    if (!chars.length) return;
    const press = new Array(chars.length).fill(0);
    let mx = -1e4, my = -1e4, raf = 0, idleFrames = 0;
    const R = 150;
    function frame() {
      raf = 0;
      let live = false;
      for (let i = 0; i < chars.length; i++) {
        const r = chars[i].getBoundingClientRect();
        const dx = mx - (r.left + r.width / 2);
        const dy = my - (r.top + r.height / 2);
        const d = Math.sqrt(dx * dx + dy * dy);
        const target = d > R ? 0 : Math.pow(1 - d / R, 1.6);
        press[i] += (target - press[i]) * 0.22;
        const p = press[i];
        if (p > 0.004) {
          live = true;
          chars[i].style.color = 'rgba(16, 11, 7, ' + (p * 0.92).toFixed(3) + ')';
          chars[i].style.transform = 'translateY(' + (p * 1.1).toFixed(2) + 'px)';
          chars[i].style.textShadow = '0 0 ' + (p * 7).toFixed(1) + 'px rgba(16,11,7,' + (p * 0.35).toFixed(3) + ')';
        } else if (press[i] !== 0) {
          chars[i].style.color = '';
          chars[i].style.transform = '';
          chars[i].style.textShadow = '';
          press[i] = 0;
        }
      }
      idleFrames = live ? 0 : idleFrames + 1;
      if (idleFrames < 3) raf = requestAnimationFrame(frame);
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };
    window.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; kick(); }, { passive: true });
    window.addEventListener('scroll', kick, { passive: true });
  }
  /* Chars near the cursor darken toward near-black ink over the headline's
     own color, so the effect survives every team repaint. */

  /* ── Split-flap ── */
  const SF_CHARS = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·:*\'';
  function sfCell() {
    const cell = document.createElement('div');
    cell.className = 'sf-cell';
    cell.innerHTML =
      '<div class="sf-half sf-top"><span> </span></div>' +
      '<div class="sf-half sf-bot"><span> </span></div>' +
      '<div class="sf-flap"><div class="sf-half sf-fl-front"><span> </span></div><div class="sf-half sf-fl-back"><span> </span></div></div>';
    cell._top = cell.children[0].firstChild;
    cell._bot = cell.children[1].firstChild;
    cell._flap = cell.children[2];
    cell._flFront = cell._flap.children[0].firstChild;
    cell._flBack = cell._flap.children[1].firstChild;
    cell._ch = ' ';
    cell._busy = false;
    return cell;
  }
  function sfStep(cell, next, dur) {
    return new Promise((res) => {
      const cur = cell._ch;
      cell._top.textContent = next;
      cell._bot.textContent = cur;
      cell._flFront.textContent = cur;
      cell._flBack.textContent = next;
      cell._flap.classList.add('is-on');
      const anim = cell._flap.animate(
        [{ transform: 'rotateX(0deg)' }, { transform: 'rotateX(-180deg)' }],
        { duration: dur, easing: 'cubic-bezier(0.5, 0, 0.6, 0.45)' }
      );
      anim.onfinish = () => {
        cell._flap.classList.remove('is-on');
        cell._bot.textContent = next;
        cell._ch = next;
        res();
      };
    });
  }
  async function sfFlipTo(cell, target, clatter) {
    if (cell._busy) { cell._pending = target; return; }
    if (cell._ch === target) return;
    cell._busy = true;
    const from = SF_CHARS.indexOf(cell._ch);
    const to = SF_CHARS.indexOf(target);
    let path = [];
    if (clatter && from >= 0 && to >= 0 && from !== to) {
      const dist = (to - from + SF_CHARS.length) % SF_CHARS.length;
      const hops = Math.min(dist, 3 + Math.floor(Math.random() * 3));
      for (let h = 1; h < hops; h++) {
        path.push(SF_CHARS[(from + Math.round((dist * h) / hops)) % SF_CHARS.length]);
      }
    }
    path.push(target);
    for (const ch of path) await sfStep(cell, ch, 85);
    cell._busy = false;
    if (cell._pending != null) {
      const p = cell._pending;
      cell._pending = null;
      if (p !== cell._ch) sfFlipTo(cell, p, false);
    }
  }
  function splitFlapBoard(mount, rowCols) {
    const rows = rowCols.map((cols) => {
      const row = document.createElement('div');
      row.className = 'sf-row';
      const cells = [];
      for (let i = 0; i < cols; i++) { const c = sfCell(); row.appendChild(c); cells.push(c); }
      mount.appendChild(row);
      return cells;
    });
    function pad(text, cols) {
      let t = (text || '').toUpperCase();
      t = [...t].map(c => (SF_CHARS.includes(c) ? c : ' ')).join('');
      if (t.length > cols) t = t.slice(0, cols);
      const lead = Math.floor((cols - t.length) / 2);
      return ' '.repeat(lead) + t + ' '.repeat(cols - t.length - lead);
    }
    function set(lines, opts) {
      const clatter = !!(opts && opts.clatter) && !REDUCED;
      const sound = !!(opts && opts.sound);
      let changed = 0;
      rows.forEach((cells, r) => {
        const text = pad(lines[r] || '', cells.length);
        cells.forEach((cell, i) => {
          const ch = text[i];
          if (cell._ch === ch) return;
          changed++;
          if (REDUCED) {
            cell._top.textContent = ch; cell._bot.textContent = ch; cell._ch = ch;
            return;
          }
          const delay = clatter ? i * 42 + r * 130 + Math.random() * 40 : Math.random() * 120;
          setTimeout(() => sfFlipTo(cell, ch, clatter), delay);
        });
      });
      if (sound && changed && !REDUCED) {
        for (let k = 0; k < Math.min(4, changed); k++) setTimeout(() => sfx.clack(), 60 + k * 140);
      }
    }
    return { set };
  }

  /* ── Reveal engine ── */
  function init() {
    root.classList.add('m-ready');
    if (REDUCED) root.classList.add('m-static');

    const stamps = [...document.querySelectorAll('[data-stamp]')];
    const inks = [...document.querySelectorAll('[data-ink]')];
    const washes = [...document.querySelectorAll('[data-wash]')].map(s => ({ s, w: washInit(s) }));

    if (REDUCED) {
      stamps.forEach(el => el.classList.add('m-stamped'));
      inks.forEach(el => el.classList.add('m-ink-on'));
      washes.forEach(({ w }) => w.develop());
      const mo = new MutationObserver((muts) => {
        for (const m of muts) for (const n of m.addedNodes) {
          if (n.nodeType !== 1) continue;
          if (n.matches('[data-stamp]')) n.classList.add('m-stamped');
          if (n.matches('[data-ink]')) n.classList.add('m-ink-on');
          n.querySelectorAll('[data-stamp]').forEach(el => el.classList.add('m-stamped'));
          n.querySelectorAll('[data-ink]').forEach(el => el.classList.add('m-ink-on'));
        }
      });
      mo.observe(document.body, { childList: true, subtree: true });
    } else {
      const io = new IntersectionObserver((entries) => {
        for (const en of entries) {
          if (!en.isIntersecting) continue;
          const el = en.target;
          io.unobserve(el);
          if (el.hasAttribute('data-stamp')) {
            el.classList.add('m-stamped');
            if (el.hasAttribute('data-stamp-sound') && window.__anthemPlaying) {
              setTimeout(() => sfx.thunk(), 200);
            }
          } else if (el.hasAttribute('data-ink')) {
            inkReveal(el);
          } else {
            const hit = washes.find(x => x.s === el);
            if (hit) hit.w.develop();
          }
        }
      }, { threshold: 0.25 });
      stamps.forEach(el => io.observe(el));
      inks.forEach(el => io.observe(el));
      washes.forEach(({ s }) => io.observe(s));
      // Pages render content after load (schedule rounds, quiz results);
      // observe anything that arrives carrying a reveal attribute.
      const mo = new MutationObserver((muts) => {
        for (const m of muts) for (const n of m.addedNodes) {
          if (n.nodeType !== 1) continue;
          if (n.matches('[data-stamp],[data-ink]')) io.observe(n);
          n.querySelectorAll('[data-stamp],[data-ink]').forEach(el => io.observe(el));
        }
      });
      mo.observe(document.body, { childList: true, subtree: true });
    }

    driftInit([...document.querySelectorAll('[data-drift]')]);
    [...document.querySelectorAll('[data-inkpress]')].forEach(inkpressInit);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.Motion = { transition, splitFlapBoard, sfx, reduced: REDUCED };
})();
