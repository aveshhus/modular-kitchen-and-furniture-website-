/* =====================================================
   SHARED NAV + FOOTER PARTIAL TEMPLATE
   This file is included in all pages inline for now.
   main.js — Navigation & shared behavior
   ===================================================== */

(function () {
  'use strict';

  /* -------------------------------------------------------
     NAV: Transparent → Scrolled
  ------------------------------------------------------- */
  const nav = document.querySelector('.nav');

  function updateNav() {
    if (!nav) return;
    if (nav.classList.contains('nav--solid')) return; // Don't override solid nav on inner pages

    if (window.scrollY > 60) {
      nav.classList.add('nav--scrolled');
      nav.classList.remove('nav--transparent');
    } else {
      nav.classList.remove('nav--scrolled');
      nav.classList.add('nav--transparent');
    }
  }

  // Initial call
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });

  /* -------------------------------------------------------
     NAV: Active Page Indicator
  ------------------------------------------------------- */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav__link, .mobile-menu__link');

  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPath ||
        (currentPath === '' && linkHref === 'index.html') ||
        (currentPath === 'index.html' && linkHref === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* -------------------------------------------------------
     MOBILE MENU
  ------------------------------------------------------- */
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link');

  function openMenu() {
    hamburger && hamburger.classList.add('is-open');
    mobileMenu && mobileMenu.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    hamburger && hamburger.setAttribute('aria-expanded', 'true');
    hamburger && hamburger.setAttribute('aria-label', 'Close menu');
  }

  function closeMenu() {
    hamburger && hamburger.classList.remove('is-open');
    mobileMenu && mobileMenu.classList.remove('is-open');
    document.body.style.overflow = '';
    hamburger && hamburger.setAttribute('aria-expanded', 'false');
    hamburger && hamburger.setAttribute('aria-label', 'Open menu');
  }

  hamburger && hamburger.addEventListener('click', () => {
    if (hamburger.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu on link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Close on outside click
  mobileMenu && mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) closeMenu();
  });

  /* -------------------------------------------------------
     SMOOTH SCROLL for anchor links
  ------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        closeMenu();
        const navHeight = nav ? nav.offsetHeight : 0;
        if (window.lenis) {
          window.lenis.scrollTo(target, { offset: -navHeight - 20, duration: 1.2 });
        } else {
          const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
          window.scrollTo({ top: targetTop, behavior: 'smooth' });
        }
      }
    });
  });

  /* -------------------------------------------------------
     PROJECT FILTER (projects page)
  ------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('[data-category]');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = '';
            requestAnimationFrame(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            });
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.96)';
            setTimeout(() => { card.style.display = 'none'; }, 350);
          }
        });
      });
    });
  }

  /* -------------------------------------------------------
     VIDEO PLACEHOLDER: Click to play
  ------------------------------------------------------- */
  const videoPlaceholders = document.querySelectorAll('.video-placeholder');
  videoPlaceholders.forEach(vp => {
    vp.addEventListener('click', () => {
      vp.classList.toggle('playing');
    });
  });

  /* -------------------------------------------------------
     FRAMER EDITORIAL TEAM CAROUSEL
  ------------------------------------------------------- */
  function initTeamCarousel() {
    const track = document.querySelector('.team-carousel-track');
    const cards = document.querySelectorAll('.team-framer-card');
    const prevBtn = document.getElementById('team-prev');
    const nextBtn = document.getElementById('team-next');

    if (!track || !cards.length) return;

    let currentIndex = 0;
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let hasDragged = false;

    function activateCard(targetCard, autoScroll = false) {
      if (!targetCard) return;
      cards.forEach(c => c.classList.remove('is-expanded'));
      targetCard.classList.add('is-expanded');
      currentIndex = Array.from(cards).indexOf(targetCard);

      if (autoScroll) {
        const cardLeft = targetCard.offsetLeft;
        const trackWidth = track.clientWidth;
        const cardWidth = targetCard.offsetWidth || 620;
        const scrollTo = cardLeft - (trackWidth / 2) + (cardWidth / 2);
        track.scrollTo({ left: Math.max(0, scrollTo), behavior: 'smooth' });
      }
    }

    // Direct hover on each card — expands immediately on mouseenter / pointerenter
    cards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        if (isDown) return;
        activateCard(card, false);
      });

      card.addEventListener('pointerenter', () => {
        if (isDown) return;
        activateCard(card, false);
      });

      card.addEventListener('click', (e) => {
        if (hasDragged) {
          hasDragged = false;
          return;
        }
        if (e.target.closest('.team-framer-card__close-btn')) {
          e.stopPropagation();
          card.classList.remove('is-expanded');
          return;
        }
        if (e.target.closest('a')) {
          return; // Let links work
        }
        activateCard(card, true);
      });
    });

    // Mouse drag scrolling
    track.addEventListener('mousedown', (e) => {
      if (e.target.closest('.team-framer-card__editorial') || e.target.closest('button') || e.target.closest('a')) {
        return;
      }
      isDown = true;
      hasDragged = false;
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
      track.classList.add('is-dragging');
    });

    window.addEventListener('mouseup', () => {
      if (!isDown) return;
      isDown = false;
      track.classList.remove('is-dragging');
      setTimeout(() => { hasDragged = false; }, 60);
    });

    track.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.5;
      if (Math.abs(walk) > 6) {
        hasDragged = true;
      }
      track.scrollLeft = scrollLeft - walk;
    });

    // Arrow navigation
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
          currentIndex--;
        } else {
          currentIndex = cards.length - 1;
        }
        activateCard(cards[currentIndex], true);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentIndex < cards.length - 1) {
          currentIndex++;
        } else {
          currentIndex = 0;
        }
        activateCard(cards[currentIndex], true);
      });
    }

    // Default activate card 1
    if (cards[0]) {
      activateCard(cards[0], false);
    }
  }

  // Initialize carousel on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTeamCarousel);
  } else {
    initTeamCarousel();
  }

})();



/* =====================================================
   SLEEK REFERENCE COMPONENTS CONTROLLER
   ===================================================== */
(function() {
  'use strict';

  // 1. HERO QUICK CONSULTATION FORM
  function initHeroQuickForm() {
    const form = document.getElementById('hero-quick-form');
    const successView = document.getElementById('hero-form-success');
    if (!form) return;

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = form.querySelector('[name="name"]');
      const phone = form.querySelector('[name="phone"]');

      if (!name || !name.value.trim()) {
        if (name) name.focus();
        return;
      }
      if (!phone || !phone.value.trim() || phone.value.trim().length < 8) {
        if (phone) phone.focus();
        return;
      }

      // Show in-card success
      const wrapper = form.closest('.hero-sleek-form-wrapper');
      const header = wrapper ? wrapper.querySelector('.hero-sleek-form-header') : null;
      if (header) header.style.display = 'none';
      form.style.display = 'none';
      if (successView) {
        successView.style.display = 'block';
        successView.classList.remove('dsp-none');
        successView.classList.add('is-visible');
      }
    });
  }

  // 1B. MID-PAGE CONSULTATION FORM
  function initMidConsultationForm() {
    const form = document.getElementById('mid-quick-form');
    const successView = document.getElementById('mid-form-success');
    if (!form) return;

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = form.querySelector('[name="name"]');
      const phone = form.querySelector('[name="phone"]');

      if (!name || !name.value.trim()) {
        if (name) name.focus();
        return;
      }
      if (!phone || !phone.value.trim() || phone.value.trim().length < 8) {
        if (phone) phone.focus();
        return;
      }

      // Hide header and form, show in-card success
      const wrapper = form.closest('.mid-consultation-card');
      const header = wrapper ? wrapper.querySelector('.mid-consultation-header') : null;
      if (header) header.style.display = 'none';
      form.style.display = 'none';
      if (successView) {
        successView.style.display = 'block';
        successView.classList.remove('dsp-none');
        successView.classList.add('is-visible');
      }
    });
  }

  // 2. KITCHEN LAYOUT EXPLORER (ASIAN PAINTS SLEEK 50/50 EDITORIAL SYSTEM)
  function initLayoutExplorer() {
    const section = document.querySelector('.layout-explorer-section');
    if (!section) return;

    const tabs = section.querySelectorAll('.exp-kitchen-tab');
    const dots = section.querySelectorAll('.sleek-kitchen-dot');
    const slides = section.querySelectorAll('.sleek-kitchen-slide');

    function switchLayout(targetId) {
      if (!targetId) return;

      // Update tabs
      tabs.forEach(tab => {
        const isMatch = tab.getAttribute('data-layout-target') === targetId;
        tab.classList.toggle('is-active', isMatch);
        tab.setAttribute('aria-selected', isMatch ? 'true' : 'false');
      });

      // Update dots
      dots.forEach(dot => {
        const isMatch = dot.getAttribute('data-layout-target') === targetId;
        dot.classList.toggle('is-active', isMatch);
      });

      // Update slides with smooth transition
      slides.forEach(slide => {
        if (slide.id === targetId) {
          slide.classList.add('is-active');
          slide.style.opacity = '0';
          setTimeout(() => {
            slide.style.opacity = '1';
          }, 20);
        } else {
          slide.classList.remove('is-active');
        }
      });

      if (window.ScrollTrigger) {
        ScrollTrigger.refresh();
      }
    }

    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        const targetId = this.getAttribute('data-layout-target');
        switchLayout(targetId);
      });
    });

    dots.forEach(dot => {
      dot.addEventListener('click', function() {
        const targetId = this.getAttribute('data-layout-target');
        switchLayout(targetId);
      });
    });
  }

  // 3. EVERYDAY RHYTHM (EXACT ASIAN PAINTS SLEEK SYSTEM: COMPONENTS & ZONES)
  function initEverydayRhythm() {
    const section = document.querySelector('.rhythm-interactive-section');
    if (!section) return;

    // A. Main Underline Tabs (Components vs Zones)
    const modeTabs = section.querySelectorAll('.iwpk-tab');
    const compView = section.querySelector('#iwpk-components-view');
    const zonesView = section.querySelector('#iwpk-zones-view');
    const zoneOverlay = section.querySelector('#iwpk-zone-overlay');
    const pins = section.querySelectorAll('.iwpk-pin');
    const hud = section.querySelector('#iwpk-pin-hud');

    modeTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        const mode = this.getAttribute('data-rhythm-mode');
        modeTabs.forEach(t => {
          t.classList.remove('is-active');
          t.setAttribute('aria-selected', 'false');
        });
        this.classList.add('is-active');
        this.setAttribute('aria-selected', 'true');

        if (mode === 'components') {
          if (compView) compView.style.display = 'grid';
          if (zonesView) zonesView.classList.add('is-hidden');
          if (zoneOverlay) zoneOverlay.classList.add('is-hidden');
          pins.forEach(p => p.style.display = 'flex');
          if (hud) hud.style.display = 'flex';
        } else {
          if (compView) compView.style.display = 'none';
          if (zonesView) zonesView.classList.remove('is-hidden');
          if (zoneOverlay) zoneOverlay.classList.remove('is-hidden');
          pins.forEach(p => p.style.display = 'none');
          if (hud) hud.style.display = 'none';

          // Activate first zone by default
          const firstZone = section.querySelector('.iwpk-teaser-container[data-zone-target="cooking"]');
          if (firstZone) firstZone.click();
        }

        if (window.ScrollTrigger) {
          ScrollTrigger.refresh();
        }
      });
    });

    // B. Hotspot Pins Synchronization (Components Mode)
    const teaserCards = section.querySelectorAll('.iwpk-cards-teaser');
    const hudBadge = section.querySelector('.iwpk-hud-badge');
    const hudTitle = section.querySelector('.iwpk-hud-title');
    const cardsContainer = section.querySelector('.iwpk-cards-container');

    const pinTitles = {
      'pin-1': '01. Blum Aventos Lift-Up Oak Cabinet',
      'pin-2': '02. Blum Tandembox 65kg Soft-Close Drawers',
      'pin-3': '03. German Gola Anodized Handleless Profile',
      'pin-4': '04. Flush Induction Cooktop & Ceiling Extraction',
      'pin-5': '05. 90-Degree Corner Swivel Carousel Storage Unit',
      'pin-6': '06. Undermount Composite Sink & Brass Faucet',
      'pin-7': '07. 100% Waterproof IS 710 Marine Ply Sink Unit',
      'pin-8': '08. Integrated 4000K Sensor LED Profile Lighting'
    };

    function activatePin(pinId, scrollContainer) {
      pins.forEach(p => p.classList.remove('is-active'));
      teaserCards.forEach(c => c.classList.remove('is-active'));

      const activePin = section.querySelector(`.iwpk-pin[data-pin-id="${pinId}"]`);
      const activeCard = section.querySelector(`.iwpk-cards-teaser[data-card-id="${pinId}"]`);

      if (activePin) {
        activePin.classList.add('is-active');
        const num = pinId.replace('pin-', '');
        if (hudBadge) hudBadge.textContent = num;
        if (hudTitle && pinTitles[pinId]) hudTitle.textContent = pinTitles[pinId];
      }

      if (activeCard) {
        activeCard.classList.add('is-active');
        if (scrollContainer && cardsContainer) {
          const cardTop = activeCard.offsetTop - cardsContainer.offsetTop;
          cardsContainer.scrollTo({
            top: cardTop - 12,
            behavior: 'smooth'
          });
        }
      }
    }

    pins.forEach(pin => {
      pin.addEventListener('click', function() {
        const pinId = this.getAttribute('data-pin-id');
        activatePin(pinId, true);
      });
    });

    teaserCards.forEach(card => {
      card.addEventListener('click', function() {
        const cardId = this.getAttribute('data-card-id');
        activatePin(cardId, false);
      });
    });

    // C. Zone Cards Synchronization (Zones Mode)
    const zoneCards = section.querySelectorAll('.iwpk-teaser-container');
    const zoneHighlights = section.querySelectorAll('.iwpk-zone-highlight');

    zoneCards.forEach(card => {
      card.addEventListener('click', function() {
        const zoneTarget = this.getAttribute('data-zone-target');
        zoneCards.forEach(c => c.classList.remove('is-active'));
        zoneHighlights.forEach(h => h.classList.remove('is-active'));

        this.classList.add('is-active');
        const activeHighlight = section.querySelector(`.iwpk-zone-highlight[data-zone="${zoneTarget}"]`);
        if (activeHighlight) {
          activeHighlight.classList.add('is-active');
        }
      });
    });
  }


  // 4. FINISHES & MATERIALS TAB CONTROLLER
  function initFinishesMaterials() {
    const section = document.querySelector('.finishes-materials-section');
    if (!section) return;

    const tabs = section.querySelectorAll('.editorial-tab[data-tab-target]');
    const panels = section.querySelectorAll('.editorial-tab-panel');

    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        const targetId = this.getAttribute('data-tab-target');
        tabs.forEach(t => {
          t.classList.remove('is-active');
          t.setAttribute('aria-selected', 'false');
        });
        panels.forEach(p => {
          p.classList.remove('is-active');
          p.style.display = 'none';
        });

        this.classList.add('is-active');
        this.setAttribute('aria-selected', 'true');
        const activePanel = document.getElementById(targetId);
        if (activePanel) {
          activePanel.classList.add('is-active');
          activePanel.style.display = 'block';
        }

        if (window.ScrollTrigger) {
          ScrollTrigger.refresh();
        }
      });
    });
  }

  // 5. UNITS & ACCESSORIES FILTER CONTROLLER
  function initUnitsFilter() {
    const section = document.querySelector('.units-accessories-section');
    if (!section) return;

    const filterBtns = section.querySelectorAll('.editorial-tab[data-filter]');
    const unitCards = section.querySelectorAll('.unit-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const filterVal = this.getAttribute('data-filter');
        filterBtns.forEach(b => b.classList.remove('is-active'));
        this.classList.add('is-active');

        unitCards.forEach(card => {
          const cardCat = card.getAttribute('data-category');
          if (filterVal === 'all' || cardCat === filterVal) {
            card.style.display = 'flex';
            card.style.opacity = '1';
          } else {
            card.style.display = 'none';
            card.style.opacity = '0';
          }
        });

        if (window.ScrollTrigger) {
          ScrollTrigger.refresh();
        }
      });
    });
  }

  // Initialize all controllers
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initHeroQuickForm();
    initMidConsultationForm();
      initLayoutExplorer();
      initEverydayRhythm();
      initFinishesMaterials();
      initUnitsFilter();
    });
  } else {
    initHeroQuickForm();
    initMidConsultationForm();
    initLayoutExplorer();
    initEverydayRhythm();
      initFinishesMaterials();
      initUnitsFilter();
  }
})();
