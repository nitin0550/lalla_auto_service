/**
 * LALLA AUTO SERVICE - BUDAUN
 * Main Application Logic: Navigation UX, Mobile Drawer, 30 FPS Canvas Scroll,
 * Workshop Services & Booking Modals
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigationUX();
  initLetsScrollCanvasWorld();
  initServicesSection();
  initBookingModal();
  initPickupModal();
  initQuickContactButtons();
});

/* ============================================================================
   1. Unified Navigation UX: Mobile Drawer, Smooth Offset Scrolling & Scroll Spy
   ========================================================================== */
function initNavigationUX() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const closeBtn = document.getElementById('mobile-menu-close');
  const drawer = document.getElementById('mobile-nav-drawer');
  const overlay = document.getElementById('mobile-drawer-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const desktopLinks = document.querySelectorAll('#desktop-nav-links .nav-link');

  function openDrawer() {
    if (!drawer || !overlay) return;
    drawer.classList.add('is-open');
    overlay.classList.add('is-open');
    if (toggleBtn) {
      toggleBtn.classList.add('is-active');
      toggleBtn.setAttribute('aria-expanded', 'true');
    }
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (!drawer || !overlay) return;
    drawer.classList.remove('is-open');
    overlay.classList.remove('is-open');
    if (toggleBtn) {
      toggleBtn.classList.remove('is-active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = drawer && drawer.classList.contains('is-open');
      if (isOpen) closeDrawer();
      else openDrawer();
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });

  // Mobile links click handler
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Smooth offset scrolling for in-page anchor links (avoid header overlap)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#' || targetId.includes('modal')) return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        closeDrawer();
        const headerOffset = 64;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });
      }
    });
  });

  // Active section scroll spy
  const sectionIds = ['top', 'services', 'standards', 'pickup', 'contact'];
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

  function onScrollNavSpy() {
    const scrollPos = window.scrollY + 140;
    let currentId = 'top';

    for (let i = sections.length - 1; i >= 0; i--) {
      const sec = sections[i];
      if (sec && sec.offsetTop <= scrollPos) {
        currentId = sec.id;
        break;
      }
    }

    desktopLinks.forEach(link => {
      const target = link.getAttribute('data-section');
      link.classList.toggle('is-active', target === currentId);
    });

    mobileLinks.forEach(link => {
      const target = link.getAttribute('data-section');
      link.classList.toggle('is-active', target === currentId);
    });
  }

  window.addEventListener('scroll', onScrollNavSpy, { passive: true });
  onScrollNavSpy();
}

/* ============================================================================
   2. Initialize lets-scroll 30 FPS Canvas Image Sequence (Snappy 2.2 Runway)
   ========================================================================== */
function initLetsScrollCanvasWorld() {
  const worldContainer = document.getElementById('world');
  if (!worldContainer || typeof mountLetsScrollCanvas !== 'function') return;

  mountLetsScrollCanvas(worldContainer, {
    scrollRunway: 2.4, // Smooth, comfortable 3D revolving carousel rotation runway
    brand: {
      name: 'Lalla Auto Service',
      href: '#top'
    },
    cta: {
      label: 'Book on WhatsApp',
      href: '#booking-modal'
    },
    hint: 'SWIPE / DRAG HORIZONTALLY ↻ • SCROLL DOWN FOR SERVICES ↓',
    sections: [
      {
        id: 'workshop-hub',
        label: 'Gateway',
        shortLabel: 'Gateway',
        accent: '#dc2626',
        image: 'assets/images/scene_workshop.webp',
        eyebrow: "Budaun's Premier 2-Wheeler Hub",
        title: 'Precision Care & 100% Genuine Spares.',
        body: 'Specializing in Hero, Bajaj, TVS, and Honda motorcycles. Water Works Road, near Budaun Roadways (opp. Hanuman Mandir). Certified mechanics, hydraulic bays, and doorstep pickup.',
        tags: ['Hero · Bajaj · TVS · Honda', 'Water Works Road', 'Near Roadways Bus Stand', 'Open All 7 Days'],
        cta: {
          primary: { label: '💬 Book on WhatsApp', href: '#booking-modal' },
          secondary: { label: 'Explore Services ↓', href: '#services' }
        }
      },
      {
        id: 'mechanical-bay',
        label: 'Repairs',
        shortLabel: 'Repairs',
        accent: '#d97706',
        image: 'assets/images/scene_repair.webp',
        eyebrow: 'Precision Mechanical Bay',
        title: 'Engine Rebuilds, Clutch & Safety Brakes.',
        body: 'Specialist diagnostics for smoke, compression loss, hard gearshifts, and brake squeal using genuine OEM factory parts, micrometers, and precision diagnostic tools.',
        tags: ['28-Point Inspection', 'Engine Overhaul', 'Clutch Plates', 'Same-Day Turnaround'],
        cta: {
          primary: { label: 'View Repairs', href: '#services' },
          secondary: { label: 'Ask Mechanic', href: '#booking-modal' }
        }
      },
      {
        id: 'spares-vault',
        label: 'Spares',
        shortLabel: 'Spares',
        accent: '#ea580c',
        image: 'assets/images/scene_spares.webp',
        eyebrow: '100% Original Spare Parts Shop',
        title: 'Hero · Bajaj · TVS · Honda Spares.',
        body: 'Ready inventory of genuine brake shoes, heavy-duty chain sprockets, clutch plates, air/oil filters, cables, and 4T synthetic oils in our Budaun shop.',
        tags: ['100% Original Spares', 'Ready in Budaun Shop', 'Retail & Wholesale', 'Zero Counterfeits'],
        cta: {
          primary: { label: '💬 Inquire on WhatsApp', href: '#booking-modal' },
          secondary: { label: 'Explore Services ↓', href: '#services' }
        }
      },
      {
        id: 'doorstep-pickup',
        label: 'Pickup',
        shortLabel: 'Pickup',
        accent: '#2563eb',
        image: 'assets/images/scene_pickup.webp',
        eyebrow: 'Doorstep Convenience Across Budaun',
        title: 'We Collect & Deliver Your Bike.',
        body: 'Cannot visit the shop? We pick up your motorcycle anywhere in Budaun (Civil Lines, Awas Vikas, Bareilly Rd, etc.), complete service, and deliver it back clean.',
        tags: ['Doorstep Collection', 'Safe Transit', 'Digital Inspection', 'Budaun Wide'],
        cta: {
          primary: { label: 'Request Pickup', href: '#pickup-modal' },
          secondary: { label: 'How It Works', href: '#pickup' }
        }
      },
      {
        id: 'live-tracking',
        label: 'Updates',
        shortLabel: 'Updates',
        accent: '#16a34a',
        image: 'assets/images/scene_tracking.webp',
        eyebrow: 'Direct WhatsApp Updates',
        title: 'Real-Time Photos & Inspection.',
        body: 'No surprises or hidden charges. Receive photos of required repairs, genuine parts verification, and job progress updates directly on your WhatsApp.',
        tags: ['Direct WhatsApp Updates', 'Photo Inspection', 'Complete Transparency', 'Zero Hidden Fees'],
        cta: {
          primary: { label: '💬 Chat on WhatsApp', href: '#booking-modal' },
          secondary: { label: 'Explore Services ↓', href: '#services' }
        }
      },
      {
        id: 'finale-hero',
        label: 'Showroom',
        shortLabel: 'Showroom',
        accent: '#dc2626',
        image: 'assets/images/scene_finale.webp',
        eyebrow: 'Lalla Auto Service City Budaun',
        title: 'Ride Smooth. Ride With Confidence.',
        body: 'Located at Water Works Road, near Budaun Roadways, opp. Hanuman Mandir lane. Call or WhatsApp 9045009676 for immediate assistance.',
        tags: ['Open 7 Days (8:30 AM - 8:30 PM)', 'Phone: 9045009676', 'Budaun, UP', '100% Satisfaction'],
        cta: {
          primary: { label: 'Book on WhatsApp', href: '#booking-modal' },
          secondary: { label: 'Shop Location & Map', href: '#contact' }
        }
      }
    ]
  });
}

/* ============================================================================
   3. Workshop Services Section (Visual-First, Minimal Text)
   ========================================================================== */
function initServicesSection() {
  const container = document.getElementById('services-grid');
  if (!container) return;

  container.innerHTML = WORKSHOP_SERVICES.map(svc => `
    <div class="service-card" data-service-id="${svc.id}">
      <!-- Visual 3D Media Banner -->
      <div class="service-card__media">
        <img src="${svc.image}" alt="${svc.title}" loading="lazy" class="service-card__img">
        <div class="service-card__media-overlay"></div>
        <div class="service-card__badge-tag">${svc.badge}</div>
        <div class="service-card__time-tag">⏱️ ${svc.time}</div>
      </div>

      <!-- Card Body -->
      <div class="service-card__body">
        <div class="service-card__title-row">
          <div class="service-card__icon-bubble">${svc.icon}</div>
          <div class="service-card__title-meta">
            <h3 class="service-card__title">${svc.title}</h3>
            <div class="service-card__hindi">${svc.hindiTitle}</div>
          </div>
        </div>

        <p class="service-card__tagline">${svc.tagline}</p>

        <!-- Visual Feature Chips (Icons + Concise Tags) -->
        <div class="service-card__chips">
          ${(svc.visualHighlights || []).map(vh => `
            <div class="service-chip">
              <span class="service-chip__icon">${vh.icon}</span>
              <span class="service-chip__text">${vh.text}</span>
            </div>
          `).join('')}
        </div>

        <!-- Visual Brand Badges Strip -->
        <div class="service-card__brands-strip">
          <span class="brands-label">Fits:</span>
          <span class="brand-pill">Hero</span>
          <span class="brand-pill">Bajaj</span>
          <span class="brand-pill">TVS</span>
          <span class="brand-pill">Honda</span>
        </div>

        <!-- Visual CTA Button -->
        <button type="button" class="btn btn--primary btn--full book-service-btn" data-service-title="${svc.title}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.79 14.12c-.24.68-1.4 1.28-1.92 1.33-.5.05-1.12.07-3.25-.8-2.73-1.12-4.48-3.9-4.62-4.08-.13-.19-1.1-1.47-1.1-2.8 0-1.33.7-1.98.95-2.25.24-.27.53-.34.71-.34.18 0 .36 0 .52.01.17.01.4.07.61.58.24.57.81 1.98.88 2.13.07.15.11.32.02.5-.09.18-.14.29-.27.46-.14.16-.29.35-.41.48-.14.13-.28.28-.12.56.16.27.7 1.15 1.5 1.86 1.03.92 1.9 1.2 2.17 1.34.27.13.43.11.59-.07.16-.19.68-.79.86-1.06.18-.27.36-.23.61-.14.25.09 1.58.74 1.85.88.27.14.45.21.52.32.07.12.07.7-.17 1.38z"/>
          </svg>
          <span>Book on WhatsApp</span>
          <span class="btn-arrow">→</span>
        </button>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.book-service-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const serviceTitle = e.currentTarget.getAttribute('data-service-title');
      openBookingModal(serviceTitle);
    });
  });
}

/* ============================================================================
   4. Interactive WhatsApp Service Booking Modal
   ========================================================================== */
function initBookingModal() {
  const modal = document.getElementById('booking-modal');
  const closeBtn = document.getElementById('close-booking-modal');
  const bookingForm = document.getElementById('service-booking-form');
  const pickupCheckbox = document.getElementById('bk-pickup-toggle');
  const pickupDetailsDiv = document.getElementById('bk-pickup-details');
  const waPreviewArea = document.getElementById('bk-whatsapp-preview');

  if (!modal) return;

  function updatePreview() {
    if (!waPreviewArea) return;
    const name = document.getElementById('bk-name')?.value || '[Your Name]';
    const phone = document.getElementById('bk-phone')?.value || '[Your Phone]';
    const brand = document.getElementById('bk-brand')?.value || 'Hero';
    const model = document.getElementById('bk-model')?.value || 'Splendor Plus';
    const regNo = document.getElementById('bk-reg')?.value || 'UP 24 ...';
    const service = document.getElementById('bk-service')?.value || 'General Servicing';
    const date = document.getElementById('bk-date')?.value || 'Tomorrow';
    const time = document.getElementById('bk-time')?.value || 'Morning (10:00 AM)';
    const isPickup = pickupCheckbox?.checked || false;
    const address = document.getElementById('bk-address')?.value || 'Budaun';
    const notes = document.getElementById('bk-notes')?.value || 'None';

    const msg = 
`*NEW MOTORCYCLE SERVICE INQUIRY*
*Lalla Auto Service City, Budaun*

👤 Customer Name: ${name}
📱 WhatsApp Phone: ${phone}
🏍️ Bike Brand: ${brand}
🛵 Bike Model: ${model}
🔢 Registration No: ${regNo}
🔧 Required Service: ${service}
📅 Preferred Date: ${date}
⏰ Preferred Time: ${time}
🚚 Doorstep Pickup: ${isPickup ? `YES (${address})` : 'NO (Walk-in to Water Works Road)'}
📝 Problem / Notes: ${notes}

_Please confirm my booking slot and technician availability._`;

    waPreviewArea.textContent = msg;
    return msg;
  }

  if (bookingForm) {
    bookingForm.addEventListener('input', updatePreview);
  }

  if (pickupCheckbox && pickupDetailsDiv) {
    pickupCheckbox.addEventListener('change', () => {
      pickupDetailsDiv.style.display = pickupCheckbox.checked ? 'block' : 'none';
      updatePreview();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('is-open');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('is-open');
  });

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = updatePreview();
      const newBookingId = 'LAS-' + Math.floor(1000 + Math.random() * 9000);

      const name = document.getElementById('bk-name')?.value || 'Customer';
      const phone = document.getElementById('bk-phone')?.value || '9045009676';
      const brand = document.getElementById('bk-brand')?.value || 'Hero';
      const model = document.getElementById('bk-model')?.value || 'Motorcycle';
      const regNo = document.getElementById('bk-reg')?.value || 'UP 24 ...';
      const service = document.getElementById('bk-service')?.value || 'General Servicing';
      const isPickup = pickupCheckbox?.checked || false;

      try {
        const local = JSON.parse(localStorage.getItem('lalla_bookings') || '{}');
        local[newBookingId] = {
          id: newBookingId,
          customerName: name,
          phone: phone,
          bikeBrand: brand,
          bikeModel: model,
          regNo: regNo,
          serviceType: service,
          status: 'REQUESTED',
          statusStep: 1,
          pickupRequired: isPickup,
          updatedAt: 'Just now',
          mechanicNotes: 'New service inquiry received via website. Awaiting workshop confirmation.'
        };
        localStorage.setItem('lalla_bookings', JSON.stringify(local));
      } catch (err) {}

      const waUrl = createWhatsAppLink(msg + `\n\n[Booking Reference: #${newBookingId}]`);
      window.open(waUrl, '_blank');

      modal.classList.remove('is-open');
      alert(`Booking inquiry created! Reference ID: #${newBookingId}\nOpening WhatsApp to send your request to Lalla Auto Service (9045009676).`);
    });
  }
}

function openBookingModal(preselectedService) {
  const modal = document.getElementById('booking-modal');
  if (!modal) return;
  if (preselectedService) {
    const serviceSelect = document.getElementById('bk-service');
    if (serviceSelect) {
      serviceSelect.value = preselectedService;
    }
  }
  modal.classList.add('is-open');
  document.getElementById('service-booking-form')?.dispatchEvent(new Event('input'));
}

/* ============================================================================
   5. Doorstep Pickup Quick Modal
   ========================================================================== */
function initPickupModal() {
  const modal = document.getElementById('pickup-modal');
  const closeBtn = document.getElementById('close-pickup-modal');
  const form = document.getElementById('pickup-request-form');

  if (!modal) return;

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.remove('is-open'));
  }
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('is-open');
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('pk-name')?.value;
      const phone = document.getElementById('pk-phone')?.value;
      const bike = document.getElementById('pk-bike')?.value;
      const address = document.getElementById('pk-address')?.value;
      const landmark = document.getElementById('pk-landmark')?.value;
      const time = document.getElementById('pk-time')?.value;
      const problem = document.getElementById('pk-problem')?.value;

      const msg = 
`*DOORSTEP MOTORCYCLE PICKUP REQUEST*
*Lalla Auto Service City, Budaun*

👤 Name: ${name}
📱 WhatsApp Phone: ${phone}
🏍️ Motorcycle: ${bike}
📍 Pickup Address: ${address}
🚩 Landmark: ${landmark}
⏰ Preferred Pickup Time: ${time}
🔧 Problem / Service: ${problem}

_Please assign a pickup driver in Budaun for my bike._`;

      window.open(createWhatsAppLink(msg), '_blank');
      modal.classList.remove('is-open');
    });
  }
}

/* ============================================================================
   6. Quick Action Triggers
   ========================================================================== */
function initQuickContactButtons() {
  document.querySelectorAll('a[href="#booking-modal"], .mobile-modal-btn').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openBookingModal();
    });
  });

  const openPickupBtn = document.getElementById('open-pickup-modal-btn');
  if (openPickupBtn) {
    openPickupBtn.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('pickup-modal')?.classList.add('is-open');
    });
  }

  document.querySelectorAll('a[href="#pickup-modal"]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('pickup-modal')?.classList.add('is-open');
    });
  });
}
