/**
 * LALLA AUTO SERVICE - BUDAUN
 * 3D Revolving Turntable Carousel Hero Engine
 * (Horizontal Swipe/Scroll to Switch 3D Hero Images • Vertical Swipe/Scroll to Enter Workshop Services)
 */

function mountLetsScrollCanvas(container, config) {
  const SECTIONS = config.sections || [];
  const N = SECTIONS.length;

  if (!N || !container) return;

  injectCSS();
  container.classList.add('sw-root');

  // DOM Elements
  const sky = el('div', 'sw-sky');
  sky.appendChild(el('div', 'sw-sky__grad'));
  sky.appendChild(el('div', 'sw-sky__glow'));

  // 3D Perspective Stage Viewport
  const stageViewport = el('div', 'sw-stage-viewport');
  const stageCenter = el('div', 'sw-stage-center');

  // Turntable base with glowing concentric circles
  const turntable = el('div', 'sw-turntable-base');
  turntable.innerHTML = `
    <div class="sw-turntable-ring sw-turntable-ring--outer"></div>
    <div class="sw-turntable-ring sw-turntable-ring--middle"></div>
    <div class="sw-turntable-ring sw-turntable-ring--inner"></div>
    <div class="sw-turntable-glow"></div>
  `;
  stageCenter.appendChild(turntable);

  // 3D Revolving Carousel Container
  const carousel = el('div', 'sw-carousel-3d');
  stageCenter.appendChild(carousel);
  stageViewport.appendChild(stageCenter);

  // Build 3D Cards
  const cards = [];
  SECTIONS.forEach((s, i) => {
    const card = el('div', 'sw-card-3d');
    card.setAttribute('data-index', String(i));
    card.style.setProperty('--card-accent', s.accent || '#dc2626');

    const inner = el('div', 'sw-card-inner');
    const img = document.createElement('img');
    img.src = s.image || 'assets/images/scene_workshop.webp';
    img.alt = s.title || `Scene ${i + 1}`;
    img.loading = i === 0 ? 'eager' : 'lazy';

    const shine = el('div', 'sw-card-shine');
    const badge = el('div', 'sw-card-badge');
    badge.innerHTML = `<span class="badge-num">0${i + 1}</span><span class="badge-name">${esc(s.shortLabel || s.label)}</span>`;

    inner.appendChild(img);
    inner.appendChild(shine);
    inner.appendChild(badge);
    card.appendChild(inner);

    // Click on side card to rotate directly to it
    card.addEventListener('click', (e) => {
      e.stopPropagation();
      jumpToSection(i);
    });

    carousel.appendChild(card);
    cards.push(card);
  });

  // Progress line positioned directly below the fixed site header
  const scrollbar = el('div', 'sw-scrollbar');
  const scrollbarFill = el('span');
  scrollbar.appendChild(scrollbarFill);

  // Story copy layer (left side on desktop, bottom card on mobile)
  const copylayer = el('div', 'sw-copylayer');
  const copies = [];
  SECTIONS.forEach((s, i) => {
    const c = el('article', 'sw-copy');
    c.style.setProperty('--sw-accent', s.accent || '#dc2626');
    c.innerHTML = `
      <div class="sw-copy__glass">
        <div class="sw-copy__meta">
          <span class="sw-copy__num">0${i + 1} / 0${N}</span>
          <span class="sw-copy__badge">BUDAUN WORKSHOP</span>
        </div>
        ${s.eyebrow ? `<span class="sw-copy__eyebrow">${esc(s.eyebrow)}</span>` : ''}
        ${s.title ? `<h2 class="sw-copy__title">${esc(s.title)}</h2>` : ''}
        ${s.body ? `<p class="sw-copy__body">${esc(s.body)}</p>` : ''}
        ${s.tags && s.tags.length ? `<ul class="sw-copy__tags">${s.tags.map(t => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}
        ${s.cta ? `<div class="sw-copy__cta">${ctaBtns(s.cta)}</div>` : ''}
      </div>
    `;
    copylayer.appendChild(c);
    copies.push(c);
  });

  // Waypoint Dots (Right side on desktop, bottom-centered on mobile)
  const route = el('div', 'sw-route');
  const dots = [];
  SECTIONS.forEach((s, i) => {
    const dot = el('button', 'sw-route__dot');
    dot.setAttribute('type', 'button');
    dot.setAttribute('aria-label', s.label || `Scene ${i + 1}`);
    dot.style.setProperty('--sw-accent', s.accent || '#dc2626');
    dot.innerHTML = `<span class="sw-route__label">${esc(s.label || '')}</span><i></i>`;
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      jumpToSection(i);
    });
    route.appendChild(dot);
    dots.push(dot);
  });

  // Floating Quick Navigation Arrows (‹ and ›)
  const navArrows = el('div', 'sw-nav-arrows');
  const prevBtn = el('button', 'sw-arrow-btn sw-arrow-btn--prev');
  prevBtn.setAttribute('type', 'button');
  prevBtn.setAttribute('aria-label', 'Previous Workshop Scene');
  prevBtn.innerHTML = `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  `;
  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    jumpToSection(activeSectionIdx - 1);
  });

  const nextBtn = el('button', 'sw-arrow-btn sw-arrow-btn--next');
  nextBtn.setAttribute('type', 'button');
  nextBtn.setAttribute('aria-label', 'Next Workshop Scene');
  nextBtn.innerHTML = `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  `;
  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    jumpToSection(activeSectionIdx + 1);
  });

  navArrows.appendChild(prevBtn);
  navArrows.appendChild(nextBtn);
  stageCenter.appendChild(navArrows);

  // Scroll / Swipe Hint
  const hint = el('div', 'sw-hint');
  hint.innerHTML = `<span>${config.hint}</span><i></i>`;

  // Skip pill to scroll down into workshop services
  const skipPill = el('button', 'sw-skip-pill');
  skipPill.setAttribute('type', 'button');
  skipPill.innerHTML = `<span>Explore Services</span><span class="sw-skip-arrow">↓</span>`;
  skipPill.addEventListener('click', (e) => {
    e.preventDefault();
    scrollToServices();
  });

  // Append all layers into root container
  [sky, stageViewport, scrollbar, copylayer, route, hint, skipPill].forEach(n => container.appendChild(n));

  // State & 3D Math Setup
  let activeSectionIdx = 0;
  let targetAngle = 0;
  let currentAngle = 0;
  let cardRadius = 420;
  let cardWidth = 460;
  let cardHeight = 310;
  const ANGLE_STEP = 360 / N; // 60 deg for 6 scenes

  function scrollToServices() {
    const sec = document.getElementById('services');
    if (sec) {
      const headerOffset = 64;
      const targetY = sec.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: Math.max(0, targetY),
        behavior: 'smooth'
      });
    }
  }

  function updateGeometry() {
    const vh = window.innerHeight;
    const vw = window.innerWidth;
    const isMobile = vw <= 860;
    const isTiny = vw <= 380;

    if (isTiny) {
      cardWidth = Math.min(265, Math.round(vw * 0.74));
      cardHeight = Math.round(cardWidth * 0.62);
      cardRadius = Math.round((cardWidth / 2) / Math.tan(Math.PI / N) * 0.88);
    } else if (isMobile) {
      cardWidth = Math.min(300, Math.round(vw * 0.74));
      cardHeight = Math.round(cardWidth * 0.62);
      cardRadius = Math.round((cardWidth / 2) / Math.tan(Math.PI / N) * 0.90);
    } else {
      cardWidth = Math.min(500, Math.round(vw * 0.40));
      cardHeight = Math.round(cardWidth * 0.68);
      cardRadius = Math.round((cardWidth / 2) / Math.tan(Math.PI / N) * 1.05);
    }

    container.style.setProperty('--card-w', (cardWidth / 2) + 'px');
    container.style.setProperty('--card-h', (cardHeight / 2) + 'px');

    cards.forEach((card, i) => {
      card.style.width = cardWidth + 'px';
      card.style.height = cardHeight + 'px';
      card.style.marginLeft = (-cardWidth / 2) + 'px';
      card.style.marginTop = (-cardHeight / 2) + 'px';
      card.dataset.theta = String(i * ANGLE_STEP);
    });
  }

  function clamp(val, min = 0, max = 1) {
    return Math.min(max, Math.max(min, val));
  }

  function jumpToSection(idx) {
    const clampedIdx = clamp(idx, 0, N - 1);
    if (clampedIdx === activeSectionIdx && targetAngle === -activeSectionIdx * ANGLE_STEP) return;
    activeSectionIdx = clampedIdx;
    targetAngle = -activeSectionIdx * ANGLE_STEP;
    updateSceneUI();
  }

  function updateSceneUI() {
    // Cross-fade text copy cards in sync with active scene
    for (let i = 0; i < N; i++) {
      const c = copies[i];
      if (i === activeSectionIdx) {
        c.classList.add('is-active');
        c.classList.remove('is-prev', 'is-next');
      } else if (i < activeSectionIdx) {
        c.classList.remove('is-active', 'is-next');
        c.classList.add('is-prev');
      } else {
        c.classList.remove('is-active', 'is-prev');
        c.classList.add('is-next');
      }
    }

    dots.forEach((d, k) => d.classList.toggle('is-active', k === activeSectionIdx));
    container.style.setProperty('--sw-accent', SECTIONS[activeSectionIdx].accent || '#dc2626');
    prevBtn.classList.toggle('is-disabled', activeSectionIdx <= 0);
    nextBtn.classList.toggle('is-disabled', activeSectionIdx >= N - 1);
    scrollbarFill.style.transform = `scaleX(${(activeSectionIdx + 1) / N})`;
  }

  // Centrifugal banking roll & interactive cursor parallax variables
  let prevAngle = 0;
  let bankRoll = 0;
  let targetBankRoll = 0;
  let cardTiltX = 0;
  let cardTiltY = 0;
  let targetTiltX = 0;
  let targetTiltY = 0;

  // Track cursor position for holographic tilt on front card (desktop)
  stageViewport.addEventListener('pointermove', (e) => {
    if (isDragging || window.innerWidth <= 860) return;
    const rect = stageViewport.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    targetTiltX = -ny * 7;
    targetTiltY = nx * 8;
  });

  stageViewport.addEventListener('pointerleave', () => {
    targetTiltX = 0;
    targetTiltY = 0;
  });

  // Animation Loop with physical lerp for buttery-smooth round rotation
  function renderCarousel() {
    const diff = targetAngle - currentAngle;
    if (Math.abs(diff) > 0.005) {
      currentAngle += diff * 0.12;
    } else {
      currentAngle = targetAngle;
    }

    // Velocity-based dynamic centrifugal banking roll
    const angularVelocity = currentAngle - prevAngle;
    prevAngle = currentAngle;
    targetBankRoll = clamp(angularVelocity * 0.45, -5.5, 5.5);
    bankRoll += (targetBankRoll - bankRoll) * 0.15;

    // Interactive holographic mouse tilt smoothing
    cardTiltX += (targetTiltX - cardTiltX) * 0.1;
    cardTiltY += (targetTiltY - cardTiltY) * 0.1;

    // Rotate 3D carousel cylinder with dynamic banking
    carousel.style.transform = `rotateZ(${bankRoll.toFixed(2)}deg) rotateY(${currentAngle}deg)`;

    // Rotate turntable disc on ground
    turntable.style.transform = `rotateX(75deg) rotateZ(${currentAngle}deg)`;

    // Dynamic depth, scale & lighting for each card in the ring
    const isMobile = window.innerWidth <= 860;
    cards.forEach((card, i) => {
      const baseTheta = i * ANGLE_STEP;
      const effectiveAngle = ((baseTheta + currentAngle) % 360 + 540) % 360 - 180;
      const absAngle = Math.abs(effectiveAngle);

      // Real-time focal depth
      if (absAngle < 28) {
        // Front focal card with holographic cursor tilt
        card.classList.add('is-active');
        card.classList.remove('is-side', 'is-back');
        card.style.opacity = '1';
        card.style.filter = 'brightness(1.02)';
        card.style.zIndex = '12';
        card.style.transform = `rotateY(${baseTheta}deg) translateZ(${cardRadius}px) rotateX(${cardTiltX.toFixed(2)}deg) rotateY(${cardTiltY.toFixed(2)}deg)`;
      } else if (absAngle < 85) {
        // Angled side cards
        card.classList.add('is-side');
        card.classList.remove('is-active', 'is-back');
        const fade = isMobile 
          ? Math.max(0.25, 0.65 - ((absAngle - 28) / (85 - 28)) * 0.4) 
          : (1 - ((absAngle - 28) / (85 - 28)) * 0.45);
        card.style.opacity = String(fade);
        card.style.filter = isMobile ? 'brightness(0.88)' : 'brightness(0.9)';
        card.style.zIndex = '6';
        card.style.transform = `rotateY(${baseTheta}deg) translateZ(${cardRadius}px)`;
      } else {
        // Far back cards
        card.classList.add('is-back');
        card.classList.remove('is-active', 'is-side');
        card.style.opacity = isMobile ? '0.1' : '0.22';
        card.style.filter = 'brightness(0.72) blur(1.5px)';
        card.style.zIndex = '1';
        card.style.transform = `rotateY(${baseTheta}deg) translateZ(${cardRadius}px)`;
      }
    });

    requestAnimationFrame(renderCarousel);
  }

  // Horizontal Swipe / Drag on 3D Carousel & Vertical Swipe to Services
  let isDragging = false;
  let isHorizontalGesture = null;
  let startX = 0;
  let startY = 0;
  let dragDeltaX = 0;
  let dragDeltaY = 0;
  let dragStartAngle = 0;

  stageViewport.addEventListener('pointerdown', (e) => {
    if (e.button && e.button !== 0) return;
    isDragging = true;
    isHorizontalGesture = null;
    startX = e.clientX;
    startY = e.clientY;
    dragDeltaX = 0;
    dragDeltaY = 0;
    dragStartAngle = targetAngle;
  });

  stageViewport.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    dragDeltaX = dx;
    dragDeltaY = dy;

    // Detect gesture direction within initial 8px of movement
    if (isHorizontalGesture === null) {
      if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
        isHorizontalGesture = Math.abs(dx) >= Math.abs(dy);
        if (isHorizontalGesture) {
          try { stageViewport.setPointerCapture(e.pointerId); } catch (_) {}
        }
      }
    }

    // Horizontal drag directly scrubs the carousel angle for tactile feedback
    if (isHorizontalGesture === true) {
      const angleDelta = (dx / window.innerWidth) * ANGLE_STEP * 1.3;
      targetAngle = dragStartAngle + angleDelta;
    }
  });

  const endDrag = (e) => {
    if (!isDragging) return;
    isDragging = false;
    const wasHorizontal = isHorizontalGesture === true;
    const wasVertical = isHorizontalGesture === false;
    isHorizontalGesture = null;
    try { stageViewport.releasePointerCapture(e.pointerId); } catch (_) {}

    if (wasHorizontal) {
      // Horizontal swipe check: threshold 25px
      if (Math.abs(dragDeltaX) > 25) {
        if (dragDeltaX < -25) {
          jumpToSection(activeSectionIdx + 1);
        } else {
          jumpToSection(activeSectionIdx - 1);
        }
      } else {
        // Snap back to current active section
        targetAngle = -activeSectionIdx * ANGLE_STEP;
      }
    } else if (wasVertical) {
      // Vertical swipe: swiping upward (dy < -35) scrolls to services section!
      if (dragDeltaY < -35 && (window.scrollY || window.pageYOffset) <= 40) {
        scrollToServices();
      }
    }
  };

  stageViewport.addEventListener('pointerup', endDrag);
  stageViewport.addEventListener('pointercancel', endDrag);

  // Wheel handling: Horizontal wheel switches images, Vertical wheel scrolls to services
  let wheelThrottle = false;
  stageViewport.addEventListener('wheel', (e) => {
    const absX = Math.abs(e.deltaX);
    const absY = Math.abs(e.deltaY);

    if (absX > absY && absX > 10) {
      // Horizontal trackpad / wheel swipe switches 3D images
      e.preventDefault();
      if (wheelThrottle) return;
      wheelThrottle = true;
      setTimeout(() => { wheelThrottle = false; }, 320);

      if (e.deltaX > 0) {
        jumpToSection(activeSectionIdx + 1);
      } else {
        jumpToSection(activeSectionIdx - 1);
      }
    } else if (absY > absX && e.deltaY > 20 && (window.scrollY || window.pageYOffset) <= 20) {
      // Vertical scroll down scrolls into workshop services
      e.preventDefault();
      if (wheelThrottle) return;
      wheelThrottle = true;
      setTimeout(() => { wheelThrottle = false; }, 600);
      scrollToServices();
    }
  }, { passive: false });

  // Keyboard Navigation: Left/Right switches scene, Down scrolls to services
  window.addEventListener('keydown', (e) => {
    if ((window.scrollY || window.pageYOffset) > window.innerHeight * 0.8) return;
    if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) return;

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      jumpToSection(activeSectionIdx + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      jumpToSection(activeSectionIdx - 1);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      scrollToServices();
    }
  });

  // Window Listeners
  window.addEventListener('resize', updateGeometry);
  window.addEventListener('orientationchange', updateGeometry);

  updateGeometry();
  updateSceneUI();
  requestAnimationFrame(renderCarousel);

  window.letsScrollJump = jumpToSection;

  function el(tag, cls) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    return n;
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  }
  function ctaBtns(cta) {
    let h = '';
    if (cta.primary) {
      h += `<a class="sw-btn sw-btn--primary" href="${esc(cta.primary.href || '#')}">${esc(cta.primary.label)}</a>`;
    }
    if (cta.secondary) {
      h += `<a class="sw-btn sw-btn--ghost" href="${esc(cta.secondary.href || '#')}">${esc(cta.secondary.label)}</a>`;
    }
    return h;
  }
}

function injectCSS() {
  if (document.getElementById('sw-carousel-css')) return;
  const css = `
  .sw-root {
    --sw-bg: #f8fafc;
    --sw-ink: #0f172a;
    --sw-ink-soft: #64748b;
    --sw-accent: #dc2626;
    --sw-font-display: "Outfit", system-ui, -apple-system, sans-serif;
    --sw-font-body: "Inter", system-ui, -apple-system, sans-serif;
    color: var(--sw-ink);
    font-family: var(--sw-font-body);
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: var(--sw-bg);
  }

  .sw-sky {
    position: absolute; inset: 0; z-index: 0; overflow: hidden; pointer-events: none;
    background: var(--sw-bg);
  }
  .sw-sky__grad {
    position: absolute; inset: -10%;
    background: radial-gradient(circle at 65% 30%, rgba(220, 38, 38, 0.06) 0%, transparent 60%),
                linear-gradient(180deg, #f8fafc 0%, #edf2f7 50%, #f8fafc 100%);
  }
  .sw-sky__glow {
    position: absolute; inset: 0;
    background: radial-gradient(60% 45% at 70% 35%, color-mix(in srgb, var(--sw-accent) 12%, transparent), transparent 70%);
  }

  /* 3D Perspective Stage Viewport */
  .sw-stage-viewport {
    position: absolute; inset: 0; z-index: 10;
    perspective: 1400px;
    perspective-origin: 66% 50%;
    overflow: hidden;
    cursor: grab;
    user-select: none;
    touch-action: pan-y;
  }
  .sw-stage-viewport:active { cursor: grabbing; }

  /* 3D Center Anchor */
  .sw-stage-center {
    position: absolute;
    left: 66%;
    top: 50%;
    width: 0; height: 0;
    transform-style: preserve-3d;
  }

  /* Illuminated Turntable Base */
  .sw-turntable-base {
    position: absolute;
    width: 720px; height: 720px;
    left: 50%; top: 50%;
    margin-left: -360px;
    margin-top: 40px;
    transform: rotateX(75deg);
    border-radius: 50%;
    pointer-events: none;
    transition: opacity 0.3s;
  }
  .sw-turntable-ring {
    position: absolute; inset: 0; border-radius: 50%;
  }
  .sw-turntable-ring--outer {
    border: 2px dashed rgba(220, 38, 38, 0.25);
    box-shadow: 0 0 30px rgba(220, 38, 38, 0.1);
  }
  .sw-turntable-ring--middle {
    inset: 70px;
    border: 1.5px solid rgba(15, 23, 42, 0.1);
  }
  .sw-turntable-ring--inner {
    inset: 150px;
    border: 1px solid rgba(220, 38, 38, 0.2);
    background: radial-gradient(circle, rgba(220, 38, 38, 0.05) 0%, transparent 70%);
  }
  .sw-turntable-glow {
    position: absolute; inset: -40px; border-radius: 50%;
    background: radial-gradient(circle, rgba(220, 38, 38, 0.08) 0%, transparent 65%);
    filter: blur(20px);
  }

  /* 3D Carousel Cylinder */
  .sw-carousel-3d {
    position: absolute;
    left: 0; top: 0;
    width: 0; height: 0;
    transform-style: preserve-3d;
    will-change: transform;
    pointer-events: auto;
  }

  /* 3D Cards */
  .sw-card-3d {
    position: absolute;
    top: 0; left: 0;
    transform-origin: 50% 50%;
    border-radius: 24px;
    cursor: pointer;
    transform-style: preserve-3d;
    transition: opacity 0.3s ease, filter 0.3s ease;
  }
  .sw-card-inner {
    position: relative;
    width: 100%; height: 100%;
    border-radius: 24px;
    overflow: hidden;
    background: #ffffff;
    border: 1.5px solid rgba(15, 23, 42, 0.1);
    box-shadow: 0 16px 40px rgba(15, 23, 42, 0.12);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .sw-card-3d.is-active .sw-card-inner {
    border-color: var(--card-accent);
    box-shadow: 0 24px 60px rgba(15, 23, 42, 0.2), 0 0 35px color-mix(in srgb, var(--card-accent) 25%, transparent);
    transform: scale(1.04);
  }
  .sw-card-inner img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
    user-select: none;
    -webkit-user-drag: none;
  }
  .sw-card-shine {
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.35) 0%, transparent 60%);
    pointer-events: none;
  }
  .sw-card-badge {
    position: absolute; top: 16px; left: 16px;
    display: inline-flex; align-items: center; gap: 8px;
    padding: 6px 14px; border-radius: 999px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(15, 23, 42, 0.1);
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
  }
  .sw-card-badge .badge-num {
    font-family: ui-monospace, Menlo, monospace;
    font-weight: 800; font-size: 0.78rem;
    color: var(--card-accent);
  }
  .sw-card-badge .badge-name {
    font-weight: 700; font-size: 0.78rem;
    color: #0f172a; text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  /* Progress indicator below master header */
  .sw-scrollbar {
    position: absolute; top: 64px; left: 0; right: 0; height: 3px; z-index: 95;
    background: rgba(15, 23, 42, 0.08);
  }
  .sw-scrollbar span {
    display: block; height: 100%; width: 100%; transform-origin: 0 50%;
    transform: scaleX(0.166); background: linear-gradient(90deg, #dc2626, #f59e0b, #16a34a);
    box-shadow: 0 0 10px rgba(220, 38, 38, 0.4);
    transition: transform 0.35s ease;
  }

  /* Story Copy Layer (Left side on desktop) */
  .sw-copylayer {
    position: absolute;
    inset: 0;
    z-index: 25;
    pointer-events: none;
  }
  .sw-copy {
    position: absolute;
    left: clamp(20px, 4vw, 56px);
    top: 50%;
    transform: translateY(-50%) translateY(16px);
    width: min(40vw, 470px);
    max-height: calc(100vh - 120px);
    display: flex;
    flex-direction: column;
    opacity: 0;
    will-change: opacity, transform;
    pointer-events: none;
    transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .sw-copy.is-active {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(-50%) translateY(0);
  }
  .sw-copy.is-prev {
    opacity: 0;
    pointer-events: none;
    transform: translateY(-50%) translateY(-16px);
  }
  .sw-copy.is-next {
    opacity: 0;
    pointer-events: none;
    transform: translateY(-50%) translateY(16px);
  }
  .sw-copy__glass {
    background: rgba(255, 255, 255, 0.96);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.95);
    border-radius: 20px;
    padding: clamp(16px, 2vw, 24px) clamp(18px, 2.2vw, 26px);
    box-shadow: 0 16px 42px rgba(15, 23, 42, 0.10), 0 2px 6px rgba(15, 23, 42, 0.04);
    max-height: calc(100vh - 120px);
    overflow-y: auto;
    overscroll-behavior: contain;
    scrollbar-width: thin;
    scrollbar-color: rgba(15, 23, 42, 0.2) transparent;
  }
  .sw-copy__glass::-webkit-scrollbar {
    width: 4px;
  }
  .sw-copy__glass::-webkit-scrollbar-thumb {
    background: rgba(15, 23, 42, 0.2);
    border-radius: 4px;
  }
  .sw-copy__meta { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; }
  .sw-copy__num {
    font-family: ui-monospace, Menlo, monospace; font-size: 0.78rem; font-weight: 800;
    letter-spacing: 0.14em; color: var(--sw-accent);
  }
  .sw-copy__badge {
    font-size: 0.68rem; font-weight: 800; letter-spacing: 0.1em;
    padding: 3px 8px; border-radius: 999px; background: rgba(220, 38, 38, 0.08);
    color: #dc2626; border: 1px solid rgba(220, 38, 38, 0.2);
  }
  .sw-copy__eyebrow {
    display: block; font-family: var(--sw-font-display); font-weight: 800;
    font-size: 0.76rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--sw-accent);
  }
  .sw-copy__title {
    font-family: var(--sw-font-display); font-weight: 800; color: #0f172a;
    font-size: clamp(1.45rem, 2.2vw, 2.05rem); line-height: 1.18; margin: 6px 0 0;
    letter-spacing: -0.02em;
  }
  .sw-copy__body {
    margin-top: 10px; font-size: clamp(0.88rem, 1vw, 0.96rem); line-height: 1.55;
    color: #475569; max-width: 44ch;
  }
  .sw-copy__tags { list-style: none; display: flex; flex-wrap: wrap; gap: 6px; margin: 12px 0 0; padding: 0; }
  .sw-copy__tags li {
    font-size: 0.72rem; font-weight: 600; color: #0f172a; padding: 3px 10px;
    border-radius: 999px; background: rgba(15, 23, 42, 0.05);
    border: 1px solid rgba(15, 23, 42, 0.10);
  }
  .sw-copy__cta { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; pointer-events: auto; }
  .sw-btn {
    text-decoration: none; font-weight: 700; font-size: 0.86rem; padding: 10px 18px;
    border-radius: 999px; transition: transform 0.2s, box-shadow 0.2s; display: inline-flex;
    align-items: center; justify-content: center; gap: 8px;
  }
  .sw-btn--primary {
    color: #fff; background: linear-gradient(135deg, #dc2626, #b91c1c);
    box-shadow: 0 4px 14px rgba(220, 38, 38, 0.32);
  }
  .sw-btn--primary:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(220, 38, 38, 0.45); }
  .sw-btn--ghost {
    color: #0f172a; background: #f1f5f9; border: 1.5px solid #cbd5e1;
  }
  .sw-btn--ghost:hover { transform: translateY(-2px); background: #e2e8f0; border-color: #94a3b8; }

  /* Right-side Waypoint Dots */
  .sw-route {
    position: absolute; right: clamp(14px, 2.4vw, 30px); top: 50%; z-index: 40;
    transform: translateY(-50%); display: flex; flex-direction: column; gap: 18px;
    padding: 16px 8px;
  }
  .sw-route::before {
    content: ""; position: absolute; left: 50%; top: 20px; bottom: 20px; width: 2px;
    transform: translateX(-50%); background: rgba(15, 23, 42, 0.12);
  }
  .sw-route__dot {
    position: relative; border: 0; background: transparent; cursor: pointer;
    width: 18px; height: 18px; display: grid; place-items: center; padding: 0;
  }
  .sw-route__dot i {
    width: 9px; height: 9px; border-radius: 50%; background: rgba(15, 23, 42, 0.3);
    transition: transform 0.3s, background 0.3s, box-shadow 0.3s;
  }
  .sw-route__dot:hover i { transform: scale(1.3); background: #0f172a; }
  .sw-route__dot.is-active i {
    background: var(--sw-accent); transform: scale(1.4);
    box-shadow: 0 0 0 5px color-mix(in srgb, var(--sw-accent) 30%, transparent);
  }
  .sw-route__label {
    position: absolute; right: 28px; top: 50%; transform: translateY(-50%) translateX(6px);
    white-space: nowrap; font-size: 0.78rem; font-weight: 700; color: #0f172a;
    background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px);
    padding: 6px 14px; border-radius: 999px; opacity: 0; pointer-events: none;
    transition: opacity 0.25s, transform 0.25s; border: 1px solid rgba(15, 23, 42, 0.1);
    box-shadow: 0 4px 16px rgba(15, 23, 42, 0.1);
  }
  .sw-route__dot:hover .sw-route__label, .sw-route__dot.is-active .sw-route__label {
    opacity: 1; transform: translateY(-50%) translateX(0);
  }

  /* Skip pill to scroll down into workshop services */
  .sw-skip-pill {
    position: absolute; bottom: 24px; left: 50%; transform: translateX(-50%); z-index: 50;
    display: inline-flex; align-items: center; gap: 8px; font-size: 0.82rem; font-weight: 700;
    color: #0f172a; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(15, 23, 42, 0.12);
    padding: 10px 22px; border-radius: 999px; box-shadow: 0 8px 24px rgba(15, 23, 42, 0.1);
    cursor: pointer; transition: all 0.2s ease;
  }
  .sw-skip-pill:hover {
    background: var(--sw-accent); border-color: var(--sw-accent);
    transform: translateX(-50%) translateY(-2px); box-shadow: 0 10px 28px rgba(220, 38, 38, 0.4);
    color: #fff;
  }
  .sw-skip-arrow {
    display: inline-block; animation: sw-bounce 1.5s ease-in-out infinite;
  }
  @keyframes sw-bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(4px); }
  }

  .sw-hint {
    position: absolute; left: 50%; bottom: 68px; z-index: 30; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 8px; font-size: 0.72rem;
    font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #64748b;
    pointer-events: none; text-align: center;
  }
  .sw-hint i {
    width: 18px; height: 28px; border-radius: 12px; border: 2px solid rgba(15, 23, 42, 0.3);
    position: relative;
  }
  .sw-hint i::after {
    content: ""; position: absolute; left: 50%; top: 5px; width: 3px; height: 6px;
    border-radius: 2px; background: var(--sw-accent); transform: translateX(-50%);
    animation: sw-wheel 1.7s ease-in-out infinite;
  }
  @keyframes sw-wheel {
    0% { opacity: 0; top: 5px; }
    40% { opacity: 1; }
    100% { opacity: 0; top: 14px; }
  }

  /* Floating Quick Navigation Arrows */
  .sw-nav-arrows {
    position: absolute;
    top: 0; left: 0; width: 0; height: 0;
    pointer-events: none;
    z-index: 35;
  }
  .sw-arrow-btn {
    position: absolute;
    top: -24px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.94);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1.5px solid rgba(15, 23, 42, 0.1);
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.12), 0 2px 6px rgba(15, 23, 42, 0.05);
    color: #0f172a;
    display: grid;
    place-items: center;
    cursor: pointer;
    pointer-events: auto;
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s, box-shadow 0.25s, opacity 0.25s;
    user-select: none;
    padding: 0;
  }
  .sw-arrow-btn:hover:not(.is-disabled) {
    background: #ffffff;
    color: var(--sw-accent);
    transform: scale(1.12);
    box-shadow: 0 12px 30px rgba(220, 38, 38, 0.25), 0 2px 8px rgba(15, 23, 42, 0.08);
    border-color: rgba(220, 38, 38, 0.3);
  }
  .sw-arrow-btn:active:not(.is-disabled) {
    transform: scale(0.94);
  }
  .sw-arrow-btn.is-disabled {
    opacity: 0.22;
    cursor: not-allowed;
    pointer-events: none;
  }
  .sw-arrow-btn--prev {
    left: calc(-1 * var(--card-w) - 52px);
  }
  .sw-arrow-btn--next {
    left: calc(var(--card-w) + 12px);
  }

  /* Mobile Layout (< 860px) */
  @media (max-width: 860px) {
    .sw-stage-viewport {
      perspective: 1100px;
      perspective-origin: 50% 32%;
    }
    .sw-stage-center {
      left: 50%;
      top: 32%;
    }
    .sw-turntable-base {
      width: 320px; height: 320px;
      margin-left: -160px;
      margin-top: 15px;
    }
    .sw-nav-arrows {
      position: absolute;
      top: 32%;
      left: 0;
      right: 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
      box-sizing: border-box;
      pointer-events: none;
    }
    .sw-arrow-btn {
      position: relative;
      top: -22px;
      width: 44px;
      height: 44px;
      background: rgba(255, 255, 255, 0.96);
      box-shadow: 0 6px 20px rgba(15, 23, 42, 0.18);
      pointer-events: auto;
    }
    .sw-arrow-btn--prev {
      left: auto;
    }
    .sw-arrow-btn--next {
      left: auto;
      right: auto;
    }
    .sw-copy {
      left: 12px; right: 12px; top: auto;
      bottom: calc(18px + env(safe-area-inset-bottom));
      transform: translateY(0);
      width: auto; max-width: 440px; margin: 0 auto;
      max-height: calc(48vh - 20px - env(safe-area-inset-bottom));
    }
    .sw-copy.is-active {
      transform: translateY(0);
    }
    .sw-copy.is-prev {
      transform: translateY(-10px);
    }
    .sw-copy.is-next {
      transform: translateY(10px);
    }
    .sw-copy__glass {
      padding: 13px 15px; border-radius: 16px;
      box-shadow: 0 8px 24px rgba(15, 23, 42, 0.12);
      max-height: inherit;
    }
    .sw-copy__meta { margin-bottom: 4px; gap: 8px; }
    .sw-copy__num { font-size: 0.72rem; }
    .sw-copy__badge { font-size: 0.64rem; padding: 2px 7px; }
    .sw-copy__eyebrow { font-size: 0.70rem; }
    .sw-copy__title { font-size: clamp(1.15rem, 4.4vw, 1.38rem); margin: 3px 0 0; line-height: 1.2; }
    .sw-copy__body {
      font-size: 0.80rem; line-height: 1.38; margin-top: 5px;
      display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
    }
    .sw-copy__tags { display: none; }
    .sw-copy__cta { margin-top: 10px; gap: 8px; }
    .sw-copy__cta .sw-btn { padding: 8px 14px; font-size: 0.80rem; flex: 1; text-align: center; }
    .sw-hint { display: none; }
    .sw-skip-pill { display: none; }
    .sw-route { display: none; }
  }
  `;
  const style = document.createElement('style');
  style.id = 'sw-carousel-css';
  style.textContent = css;
  document.head.appendChild(style);
}

if (typeof module !== 'undefined' && module.exports) module.exports = { mountLetsScrollCanvas };
if (typeof window !== 'undefined') window.mountLetsScrollCanvas = mountLetsScrollCanvas;
