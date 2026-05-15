/**
 * Provisions Repaint
 * Shared cross-page color repaint mechanic.
 * Apply any of the 48 nation palettes to the page; persist across navigation.
 *
 * Usage:
 *   <script src="./repaint.js" defer></script>
 *   Auto-injects a floating button + modal on every page.
 *   To skip the button on a page, set:
 *     <script src="./repaint.js" data-skip-button defer></script>
 *
 * Public API on window.Repaint:
 *   .open()   open the modal
 *   .close()  close the modal
 *   .set(code [, save]) apply a team's palette by FIFA code
 *   .reset()  clear saved team, restore default Provisions palette
 *   .current() return the currently applied team code (or null)
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'provisions.team';

  const WC_TEAMS = [
    ['USA','United States','#0A2D5C',['#C8334B','#FFFFFF']],
    ['MEX','Mexico','#006847',['#FFFFFF','#CE1126']],
    ['CAN','Canada','#D52B1E',['#FFFFFF']],
    ['ENG','England','#C8102E',['#FFFFFF','#012169']],
    ['FRA','France','#0055A4',['#FFFFFF','#EF4135']],
    ['GER','Germany','#000000',['#FFCE00','#DD0000']],
    ['ESP','Spain','#AA151B',['#F6BE13','#1A2D5C']],
    ['POR','Portugal','#C8102E',['#1E5631','#FCD116']],
    ['NED','Netherlands','#E55A1C',['#000000','#FFFFFF']],
    ['BEL','Belgium','#C8102E',['#000000','#FAE042']],
    ['CRO','Croatia','#D90F1B',['#FFFFFF','#171796']],
    ['SUI','Switzerland','#D52B1E',['#FFFFFF']],
    ['AUT','Austria','#ED2939',['#FFFFFF']],
    ['NOR','Norway','#BA0C2F',['#FFFFFF','#00205B']],
    ['SCO','Scotland','#0A2D5C',['#FFFFFF']],
    ['SWE','Sweden','#FECC00',['#006AA7']],
    ['TUR','Türkiye','#E30A17',['#FFFFFF']],
    ['BIH','Bosnia & Herzegovina','#002395',['#FECB00','#FFFFFF']],
    ['CZE','Czechia','#D7141A',['#FFFFFF','#11457E']],
    ['MAR','Morocco','#C1272D',['#006233']],
    ['SEN','Senegal','#00853F',['#FDEF42','#E31B23']],
    ['TUN','Tunisia','#E70013',['#FFFFFF']],
    ['ALG','Algeria','#006233',['#FFFFFF','#D21034']],
    ['EGY','Egypt','#CE1126',['#FFFFFF','#000000']],
    ['GHA','Ghana','#CE1126',['#FCD116','#006B3F','#000000']],
    ['CIV',"Côte d'Ivoire",'#F77F00',['#FFFFFF','#009E60']],
    ['CPV','Cape Verde','#6CACDE',['#FFFFFF','#C8102E']],
    ['RSA','South Africa','#FFB81C',['#007749','#FFFFFF']],
    ['COD','DR Congo','#4FA8DC',['#CE1021','#F7D618']],
    ['JPN','Japan','#0A2D5C',['#FFFFFF','#BC002D']],
    ['IRN','Iran','#239F40',['#DA0000','#FFFFFF']],
    ['KOR','South Korea','#CD2E3A',['#0047A0','#FFFFFF']],
    ['AUS','Australia','#FFCD00',['#00843D']],
    ['KSA','Saudi Arabia','#006C35',['#FFFFFF']],
    ['QAT','Qatar','#8A1538',['#FFFFFF']],
    ['UZB','Uzbekistan','#0099B5',['#1EB53A','#FFFFFF']],
    ['JOR','Jordan','#CE1126',['#000000','#007A3D','#FFFFFF']],
    ['IRQ','Iraq','#007A3D',['#CE1126','#000000','#FFFFFF']],
    ['ARG','Argentina','#74ACDF',['#FFFFFF','#000000']],
    ['BRA','Brazil','#FFCB05',['#0F4A2E','#1F4FB0']],
    ['URU','Uruguay','#5DA9DD',['#FFFFFF','#000000']],
    ['COL','Colombia','#FCD116',['#003893','#CE1126']],
    ['ECU','Ecuador','#FFD100',['#003893','#CE1126']],
    ['PAR','Paraguay','#D52B1E',['#FFFFFF','#0038A8']],
    ['PAN','Panama','#D32B1E',['#FFFFFF','#0066B3']],
    ['CUW','Curaçao','#002B7F',['#F9E300']],
    ['HAI','Haiti','#00209F',['#D21034','#FFFFFF']],
    ['NZL','New Zealand','#000000',['#FFFFFF','#012169']]
  ];

  const FIFA_TO_ISO = {
    USA:'us',MEX:'mx',CAN:'ca',ENG:'gb-eng',FRA:'fr',GER:'de',ESP:'es',POR:'pt',
    NED:'nl',BEL:'be',CRO:'hr',SUI:'ch',AUT:'at',NOR:'no',SCO:'gb-sct',SWE:'se',
    TUR:'tr',BIH:'ba',CZE:'cz',MAR:'ma',SEN:'sn',TUN:'tn',ALG:'dz',EGY:'eg',
    GHA:'gh',CIV:'ci',CPV:'cv',RSA:'za',COD:'cd',JPN:'jp',IRN:'ir',KOR:'kr',
    AUS:'au',KSA:'sa',QAT:'qa',UZB:'uz',JOR:'jo',IRQ:'iq',ARG:'ar',BRA:'br',
    URU:'uy',COL:'co',ECU:'ec',PAR:'py',PAN:'pa',CUW:'cw',HAI:'ht',NZL:'nz'
  };

  // ── Color helpers ──
  function _hexToRgb(hex) {
    const h = hex.replace('#','');
    return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
  }
  function _rgbToHex(r,g,b) {
    return '#' + [r,g,b].map(n => Math.max(0,Math.min(255,Math.round(n))).toString(16).padStart(2,'0')).join('');
  }
  function _lum(hex) {
    const [r,g,b] = _hexToRgb(hex);
    return (0.299*r + 0.587*g + 0.114*b) / 255;
  }
  function _shade(hex, amt) {
    const [r,g,b] = _hexToRgb(hex);
    return _rgbToHex(r+amt, g+amt, b+amt);
  }
  function _mix(c1, c2, w) {
    const a = _hexToRgb(c1), b = _hexToRgb(c2);
    return _rgbToHex(a[0]*(1-w)+b[0]*w, a[1]*(1-w)+b[1]*w, a[2]*(1-w)+b[2]*w);
  }
  function _onColor(hex) { return _lum(hex) > 0.55 ? '#1A1A1A' : '#FFFFFF'; }

  function paletteFromKit(primary, accents) {
    const pLum = _lum(primary);
    const isWhite = pLum > 0.93;
    const isLight = pLum > 0.55;
    // Pop accent must land in a readable luminance window so it works as
    // small text and button background. If no accent qualifies (e.g., kit is
    // just black/white), derive a readable pop by lightening or darkening
    // the primary.
    let popAccent = accents.find(a => _lum(a) > 0.22 && _lum(a) < 0.82 && a !== '#FFFFFF');
    if (!popAccent) {
      popAccent = pLum > 0.6 ? _mix(primary, '#000000', 0.45) : _mix(primary, '#FFFFFF', 0.5);
    }
    const darkAccent = accents.find(a => _lum(a) < 0.35 && a !== '#000000') || _shade(popAccent, -45);

    if (isWhite) {
      return {
        parchment: '#FAF8F2', parchmentEl: '#EFEAE0',
        leather: darkAccent, leatherMid: '#1A1A1A',
        terracotta: popAccent, terracottaLight: _shade(popAccent, 22),
        textSoft: '#7A6E5E', border: '#DAD3C5'
      };
    }
    if (isLight) {
      return {
        parchment: primary, parchmentEl: _mix(primary, '#000000', 0.06),
        leather: darkAccent, leatherMid: '#1A1A1A',
        terracotta: popAccent, terracottaLight: _shade(popAccent, 22),
        textSoft: 'rgba(26,26,26,0.6)', border: _mix(primary, '#000000', 0.18)
      };
    }
    return {
      parchment: primary, parchmentEl: _mix(primary, '#FFFFFF', 0.06),
      leather: _mix(primary, '#000000', 0.32), leatherMid: '#F0E9DC',
      terracotta: popAccent, terracottaLight: _shade(popAccent, 22),
      textSoft: 'rgba(240,233,220,0.78)', border: 'rgba(240,233,220,0.14)'
    };
  }

  function applyPalette(p) {
    const r = document.documentElement.style;
    r.setProperty('--parchment', p.parchment);
    r.setProperty('--parchment-el', p.parchmentEl);
    r.setProperty('--leather', p.leather);
    r.setProperty('--leather-mid', p.leatherMid);
    r.setProperty('--terracotta', p.terracotta);
    r.setProperty('--terracotta-light', p.terracottaLight);
    r.setProperty('--text-soft', p.textSoft);
    r.setProperty('--border', p.border);
    r.setProperty('--on-accent', _onColor(p.terracotta));
    r.setProperty('--on-leather', _onColor(p.leatherMid));
  }

  function resetPalette() {
    const r = document.documentElement.style;
    ['--parchment','--parchment-el','--leather','--leather-mid','--terracotta',
     '--terracotta-light','--text-soft','--border','--on-accent','--on-leather']
      .forEach(v => r.removeProperty(v));
  }

  // ── Flag chip renderer ──
  function chipHtml(primary, accents, w, h, code) {
    const iso = code ? FIFA_TO_ISO[code] : null;
    if (iso) {
      const ALLOWED = [20,40,80,160,320];
      const target = w * 4;
      const cdnW = ALLOWED.find(x => x >= target) || 320;
      return `<span class="rpt-chip" style="width:${w}px;height:${h}px"><img src="https://flagcdn.com/w${cdnW}/${iso}.png" alt="" style="width:100%;height:100%;object-fit:cover;display:block" loading="lazy"></span>`;
    }
    return `<span class="rpt-chip" style="width:${w}px;height:${h}px;background:${primary}"></span>`;
  }

  // ── State ──
  let _currentCode = null;

  function setTeam(code, save) {
    const team = WC_TEAMS.find(t => t[0] === code);
    if (!team) return;
    _currentCode = code;
    applyPalette(paletteFromKit(team[2], team[3]));
    if (save !== false) {
      try { localStorage.setItem(STORAGE_KEY, code); } catch (e) {}
    }
    updateButtonChip();
    updateActiveInGrid();
    document.dispatchEvent(new CustomEvent('provisions:repaint', { detail: { code, team } }));
  }

  function reset() {
    _currentCode = null;
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    resetPalette();
    updateButtonChip();
    updateActiveInGrid();
    document.dispatchEvent(new CustomEvent('provisions:repaint', { detail: { code: null } }));
  }

  function current() { return _currentCode; }

  // ── DOM injection ──
  function injectStyles() {
    if (document.getElementById('rpt-styles')) return;
    const css = `
      .rpt-fab {
        position: fixed; right: 16px; bottom: 16px; z-index: 99;
        display: inline-flex; align-items: center; gap: 8px;
        padding: 9px 14px 9px 9px;
        background: var(--leather, #2C2118); color: #fff;
        border: 1.5px solid var(--leather-mid, #4A3D32);
        border-radius: 30px;
        font-family: 'Syne', sans-serif; font-weight: 700;
        font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
        cursor: pointer;
        box-shadow: 0 14px 30px -16px rgba(0,0,0,0.55);
        transition: transform 0.18s ease, box-shadow 0.18s ease;
      }
      .rpt-fab:hover { transform: translateY(-2px); box-shadow: 0 18px 38px -16px rgba(0,0,0,0.7); }
      .rpt-fab .rpt-chip { display: inline-block; border-radius: 4px; overflow: hidden; border: 1px solid rgba(255,255,255,0.25); }
      .rpt-fab .rpt-chip { width: 22px; height: 14px; background: var(--terracotta, #A0422A); }
      .rpt-fab .rpt-label { white-space: nowrap; }

      .rpt-modal {
        position: fixed; inset: 0; z-index: 200;
        display: flex; align-items: center; justify-content: center;
        padding: 32px 16px;
      }
      .rpt-modal[hidden] { display: none; }
      .rpt-scrim {
        position: absolute; inset: 0;
        background: rgba(0,0,0,0.55);
        opacity: 0;
        transition: opacity 0.22s ease;
      }
      .rpt-modal.open .rpt-scrim { opacity: 1; }
      .rpt-modal-card {
        position: relative; z-index: 1;
        max-width: 720px; width: 100%;
        max-height: calc(100vh - 64px);
        overflow-y: auto;
        padding: 28px 26px 22px;
        background: var(--parchment-el, #F8F5EF);
        border: 2px solid var(--leather-mid, #4A3D32);
        border-radius: 8px;
        box-shadow: 0 28px 60px -22px rgba(0,0,0,0.5);
        transform: translateY(10px) scale(0.98);
        opacity: 0;
        transition: opacity 0.22s ease, transform 0.22s ease;
      }
      .rpt-modal.open .rpt-modal-card { transform: translateY(0) scale(1); opacity: 1; }
      .rpt-close {
        position: absolute; top: 14px; right: 14px;
        width: 30px; height: 30px;
        appearance: none; cursor: pointer;
        background: transparent;
        border: 1.5px solid var(--border, #DDD7CC);
        border-radius: 50%;
        color: var(--leather-mid, #4A3D32);
        display: flex; align-items: center; justify-content: center;
        transition: all 0.15s;
      }
      .rpt-close:hover { background: var(--leather-mid, #4A3D32); color: #fff; border-color: var(--leather-mid, #4A3D32); }
      .rpt-head {
        text-align: center;
        margin-bottom: 18px;
      }
      .rpt-tag {
        font-family: 'Syne', sans-serif; font-weight: 700;
        font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase;
        color: var(--terracotta, #A0422A);
        margin-bottom: 8px;
      }
      .rpt-title {
        font-family: 'Syne', sans-serif; font-weight: 800;
        font-size: clamp(28px, 4.5vw, 38px); line-height: 1.05;
        letter-spacing: -0.02em;
        color: var(--leather, #2C2118);
        margin-bottom: 4px;
      }
      .rpt-sub {
        font-family: 'Inter', sans-serif; font-weight: 400;
        font-size: 13px; line-height: 1.4;
        color: var(--text-soft, #6B6259);
      }
      .rpt-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 8px;
      }
      .rpt-grid button {
        appearance: none; cursor: pointer;
        background: var(--parchment, #F5F1EB);
        border: 1.5px solid var(--border, #DDD7CC);
        border-radius: 5px;
        padding: 10px 8px;
        font-family: 'Syne', sans-serif; font-weight: 700;
        font-size: 11px; letter-spacing: 0.04em;
        color: var(--leather, #2C2118);
        display: flex; flex-direction: column; align-items: center; gap: 6px;
        transition: all 0.15s ease;
      }
      .rpt-grid button:hover { border-color: var(--leather-mid, #4A3D32); transform: translateY(-1px); }
      .rpt-grid button.active {
        border-color: var(--terracotta, #A0422A);
        background: rgba(160,66,42,0.06);
      }
      .rpt-grid button .code {
        font-size: 10px; letter-spacing: 0.18em; color: var(--text-soft, #6B6259);
      }
      .rpt-grid button .nm { font-size: 11px; text-align: center; line-height: 1.15; }
      .rpt-grid .rpt-chip { border-radius: 3px; overflow: hidden; border: 1px solid var(--border, #DDD7CC); }
      .rpt-foot {
        margin-top: 16px; padding-top: 14px;
        border-top: 1px solid var(--border, #DDD7CC);
        display: flex; align-items: center; justify-content: space-between; gap: 10px;
        font-family: 'Syne', sans-serif; font-weight: 700;
        font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
      }
      .rpt-reset {
        appearance: none; cursor: pointer; background: transparent;
        border: 1.5px solid var(--leather-mid, #4A3D32);
        color: var(--leather-mid, #4A3D32);
        padding: 8px 14px; border-radius: 4px;
        font-family: 'Syne', sans-serif; font-weight: 700;
        font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase;
        transition: all 0.15s;
      }
      .rpt-reset:hover { background: var(--leather-mid, #4A3D32); color: #fff; }
      @media (max-width: 480px) {
        .rpt-fab { right: 12px; bottom: 12px; padding: 8px 12px 8px 8px; font-size: 10px; }
        .rpt-grid { grid-template-columns: repeat(auto-fill, minmax(96px, 1fr)); }
      }
    `;
    const style = document.createElement('style');
    style.id = 'rpt-styles';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function injectButton() {
    if (document.getElementById('rptFab')) return;
    const btn = document.createElement('button');
    btn.id = 'rptFab';
    btn.className = 'rpt-fab';
    btn.setAttribute('aria-label', 'Repaint the page in a team\'s colors');
    btn.innerHTML = `<span class="rpt-chip" id="rptFabChip"></span><span class="rpt-label">Repaint</span>`;
    btn.addEventListener('click', open);
    document.body.appendChild(btn);
    updateButtonChip();
  }

  function updateButtonChip() {
    const chip = document.getElementById('rptFabChip');
    if (!chip) return;
    if (!_currentCode) {
      chip.style.background = 'var(--terracotta, #A0422A)';
      chip.innerHTML = '';
      return;
    }
    const team = WC_TEAMS.find(t => t[0] === _currentCode);
    if (!team) return;
    const iso = FIFA_TO_ISO[team[0]];
    chip.style.background = team[2];
    chip.innerHTML = iso
      ? `<img src="https://flagcdn.com/w40/${iso}.png" alt="" style="width:100%;height:100%;object-fit:cover;display:block">`
      : '';
  }

  function buildGrid() {
    const grid = document.getElementById('rptGrid');
    if (!grid) return;
    grid.innerHTML = WC_TEAMS.map(t => {
      const [code, name, primary, accents] = t;
      const active = code === _currentCode ? ' active' : '';
      return `<button type="button" data-code="${code}" class="${active.trim()}">
        ${chipHtml(primary, accents, 28, 18, code)}
        <span class="code">${code}</span>
        <span class="nm">${name}</span>
      </button>`;
    }).join('');
    grid.querySelectorAll('button').forEach(b => {
      b.addEventListener('click', () => {
        setTeam(b.dataset.code);
        close();
      });
    });
  }

  function updateActiveInGrid() {
    const grid = document.getElementById('rptGrid');
    if (!grid) return;
    grid.querySelectorAll('button').forEach(b => {
      b.classList.toggle('active', b.dataset.code === _currentCode);
    });
  }

  function injectModal() {
    if (document.getElementById('rptModal')) return;
    const modal = document.createElement('div');
    modal.id = 'rptModal';
    modal.className = 'rpt-modal';
    modal.setAttribute('hidden', '');
    modal.innerHTML = `
      <div class="rpt-scrim" id="rptScrim"></div>
      <div class="rpt-modal-card" role="dialog" aria-modal="true" aria-labelledby="rptTitle">
        <button class="rpt-close" aria-label="Close" id="rptCloseBtn">
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 2L12 12M12 2L2 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        </button>
        <div class="rpt-head">
          <div class="rpt-tag">★ The Repaint</div>
          <h3 class="rpt-title" id="rptTitle">Pick your country.</h3>
          <p class="rpt-sub">Watch the page repaint behind you. We'll remember it.</p>
        </div>
        <div class="rpt-grid" id="rptGrid"></div>
        <div class="rpt-foot">
          <span style="color:var(--text-soft, #6B6259);">Persists across pages</span>
          <button class="rpt-reset" id="rptResetBtn">Reset</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('rptScrim').addEventListener('click', close);
    document.getElementById('rptCloseBtn').addEventListener('click', close);
    document.getElementById('rptResetBtn').addEventListener('click', () => { reset(); close(); });
    buildGrid();
  }

  function open() {
    injectModal();
    buildGrid();
    const modal = document.getElementById('rptModal');
    modal.removeAttribute('hidden');
    requestAnimationFrame(() => modal.classList.add('open'));
    document.body.style.overflow = 'hidden';
  }
  function close() {
    const modal = document.getElementById('rptModal');
    if (!modal || modal.hasAttribute('hidden')) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => modal.setAttribute('hidden', ''), 240);
  }

  // ── Init ──
  function init() {
    injectStyles();
    // Hydrate saved team
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && WC_TEAMS.some(t => t[0] === saved)) {
        setTeam(saved, false);
      }
    } catch (e) {}

    // Find the script tag for this file and check for opt-out attributes
    const scripts = document.querySelectorAll('script[src*="repaint.js"]');
    const tag = scripts[scripts.length - 1];
    const skipButton = tag && tag.hasAttribute('data-skip-button');
    if (!skipButton) injectButton();
    injectModal();

    // ESC closes
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Public API
  window.Repaint = {
    open, close, set: setTeam, reset, current,
    teams: WC_TEAMS, isoMap: FIFA_TO_ISO,
    paletteFromKit, applyPalette
  };
})();
