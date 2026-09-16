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

