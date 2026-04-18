/* ============================================================
   SUNNY MODE runtime
   - Auto-injects palm-shadow overlay into every .sunny-host
   - Restores toggle state from localStorage (default: on)
   - Wires any element with id="sunny-toggle" as the toggle
   - Fades shadows in when a .sunny-host enters the viewport
   ============================================================ */

(function () {
  const root = document.documentElement;

  // The overlay markup (inline SVG fronds)
  const OVERLAY_HTML = `
  <div class="sunny-overlay" data-sunny>
    <div class="sunny-frond left-a">
      <svg viewBox="0 0 600 800" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <path d="M 20 20 C 180 120, 340 300, 520 720" stroke="#000" stroke-width="5" fill="none" stroke-linecap="round"/>
        <g>
          <path d="M 55 45  Q 100 30 190 10  Q 125 35 70 60 Z"/>
          <path d="M 72 60  Q 140 75 250 90  Q 160 80 82 78 Z"/>
          <path d="M 95 100 Q 170 70 275 45  Q 195 95 110 125 Z"/>
          <path d="M 118 140 Q 210 165 320 175 Q 225 170 130 160 Z"/>
          <path d="M 142 185 Q 220 140 340 110 Q 240 180 160 215 Z"/>
          <path d="M 168 230 Q 260 260 380 275 Q 275 265 182 252 Z"/>
          <path d="M 195 280 Q 275 225 400 195 Q 290 275 215 315 Z"/>
          <path d="M 220 330 Q 310 370 435 390 Q 320 375 238 355 Z"/>
          <path d="M 250 385 Q 330 320 455 290 Q 345 380 270 425 Z"/>
          <path d="M 278 440 Q 365 490 490 515 Q 370 495 300 470 Z"/>
          <path d="M 308 500 Q 390 430 510 400 Q 395 495 325 545 Z"/>
          <path d="M 340 565 Q 430 620 545 645 Q 420 625 358 595 Z"/>
          <path d="M 372 630 Q 450 560 560 530 Q 450 620 392 680 Z"/>
          <path d="M 405 700 Q 490 755 580 770 Q 470 755 422 730 Z"/>
        </g>
      </svg>
    </div>
    <div class="sunny-frond left-b">
      <svg viewBox="0 0 600 800" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <path d="M 10 10 C 160 180, 280 380, 480 740" stroke="#000" stroke-width="4" fill="none" stroke-linecap="round"/>
        <g>
          <path d="M 40 50  Q 105 25 210 5   Q 130 40 60 70 Z"/>
          <path d="M 75 110 Q 165 80 280 55  Q 185 115 95 145 Z"/>
          <path d="M 115 180 Q 205 210 325 225 Q 220 215 130 200 Z"/>
          <path d="M 155 255 Q 245 215 370 190 Q 260 260 175 295 Z"/>
          <path d="M 200 335 Q 290 370 420 385 Q 305 375 220 355 Z"/>
          <path d="M 245 415 Q 330 370 460 340 Q 345 420 265 465 Z"/>
          <path d="M 295 500 Q 385 540 510 555 Q 395 545 315 520 Z"/>
          <path d="M 345 590 Q 425 540 550 510 Q 430 600 365 650 Z"/>
          <path d="M 395 680 Q 470 730 570 755 Q 470 740 410 715 Z"/>
        </g>
      </svg>
    </div>
    <div class="sunny-frond right-a">
      <svg viewBox="0 0 600 800" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <path d="M 20 20 C 180 120, 340 300, 520 720" stroke="#000" stroke-width="5" fill="none" stroke-linecap="round"/>
        <g>
          <path d="M 55 45  Q 100 30 190 10  Q 125 35 70 60 Z"/>
          <path d="M 72 60  Q 140 75 250 90  Q 160 80 82 78 Z"/>
          <path d="M 95 100 Q 170 70 275 45  Q 195 95 110 125 Z"/>
          <path d="M 118 140 Q 210 165 320 175 Q 225 170 130 160 Z"/>
          <path d="M 142 185 Q 220 140 340 110 Q 240 180 160 215 Z"/>
          <path d="M 168 230 Q 260 260 380 275 Q 275 265 182 252 Z"/>
          <path d="M 195 280 Q 275 225 400 195 Q 290 275 215 315 Z"/>
          <path d="M 220 330 Q 310 370 435 390 Q 320 375 238 355 Z"/>
          <path d="M 250 385 Q 330 320 455 290 Q 345 380 270 425 Z"/>
          <path d="M 278 440 Q 365 490 490 515 Q 370 495 300 470 Z"/>
          <path d="M 308 500 Q 390 430 510 400 Q 395 495 325 545 Z"/>
          <path d="M 340 565 Q 430 620 545 645 Q 420 625 358 595 Z"/>
          <path d="M 372 630 Q 450 560 560 530 Q 450 620 392 680 Z"/>
          <path d="M 405 700 Q 490 755 580 770 Q 470 755 422 730 Z"/>
        </g>
      </svg>
    </div>
    <div class="sunny-frond right-b">
      <svg viewBox="0 0 600 800" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <path d="M 10 10 C 160 180, 280 380, 480 740" stroke="#000" stroke-width="4" fill="none" stroke-linecap="round"/>
        <g>
          <path d="M 40 50  Q 105 25 210 5   Q 130 40 60 70 Z"/>
          <path d="M 75 110 Q 165 80 280 55  Q 185 115 95 145 Z"/>
          <path d="M 115 180 Q 205 210 325 225 Q 220 215 130 200 Z"/>
          <path d="M 155 255 Q 245 215 370 190 Q 260 260 175 295 Z"/>
          <path d="M 200 335 Q 290 370 420 385 Q 305 375 220 355 Z"/>
          <path d="M 245 415 Q 330 370 460 340 Q 345 420 265 465 Z"/>
          <path d="M 295 500 Q 385 540 510 555 Q 395 545 315 520 Z"/>
          <path d="M 345 590 Q 425 540 550 510 Q 430 600 365 650 Z"/>
          <path d="M 395 680 Q 470 730 570 755 Q 470 740 410 715 Z"/>
        </g>
      </svg>
    </div>
    <div class="sunny-frond top">
      <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <path d="M 400 40 C 380 180, 300 340, 180 540" stroke="#000" stroke-width="4" fill="none" stroke-linecap="round"/>
        <path d="M 400 40 C 420 180, 500 340, 620 540" stroke="#000" stroke-width="4" fill="none" stroke-linecap="round"/>
        <g>
          <path d="M 395 80  Q 355 130 290 200 Q 360 130 405 85 Z"/>
          <path d="M 388 140 Q 320 175 230 235 Q 335 175 400 145 Z"/>
          <path d="M 375 220 Q 290 245 195 300 Q 315 245 390 225 Z"/>
          <path d="M 360 310 Q 260 330 165 380 Q 295 335 380 315 Z"/>
          <path d="M 345 400 Q 240 420 140 470 Q 280 425 370 410 Z"/>
          <path d="M 325 490 Q 225 520 130 565 Q 260 525 345 500 Z"/>
          <path d="M 405 80  Q 445 130 510 200 Q 440 130 395 85 Z"/>
          <path d="M 412 140 Q 480 175 570 235 Q 465 175 400 145 Z"/>
          <path d="M 425 220 Q 510 245 605 300 Q 485 245 410 225 Z"/>
          <path d="M 440 310 Q 540 330 635 380 Q 505 335 420 315 Z"/>
          <path d="M 455 400 Q 560 420 660 470 Q 520 425 430 410 Z"/>
          <path d="M 475 490 Q 575 520 670 565 Q 540 525 455 500 Z"/>
        </g>
      </svg>
    </div>
  </div>`;

  // Inject overlay into every .sunny-host
  document.querySelectorAll('.sunny-host').forEach(host => {
    host.insertAdjacentHTML('afterbegin', OVERLAY_HTML);
  });

  // Restore saved pref (default on)
  root.dataset.sunny = localStorage.getItem('sunny') || 'on';

  // Wire toggle button
  const btn = document.getElementById('sunny-toggle');
  if (btn) {
    const syncLabel = () => {
      btn.textContent = root.dataset.sunny === 'off' ? 'SUNNY OFF' : 'SUNNY ON';
    };
    syncLabel();
    btn.addEventListener('click', () => {
      root.dataset.sunny = root.dataset.sunny === 'off' ? 'on' : 'off';
      localStorage.setItem('sunny', root.dataset.sunny);
      syncLabel();
    });
  }

  // Fade shadows in when any .sunny-host enters the viewport
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => e.target.classList.toggle('sunny-on', e.isIntersecting));
  }, { threshold: 0.1 });
  document.querySelectorAll('.sunny-host').forEach(el => io.observe(el));
})();
