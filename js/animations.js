/* =====================================================
   GARG MODULAR FURNITURE — GSAP SCROLL ANIMATIONS
   animations.js
   ===================================================== */

(function () {
  'use strict';

  // Respect prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // Check GSAP availability
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    // Fallback: make all reveal elements visible
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-group > *').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* -------------------------------------------------------
     DEFAULTS
  ------------------------------------------------------- */
  const BASE_DURATION = 0.8;
  const BASE_EASE    = 'power3.out';
  const STAGGER      = 0.1;

  /* -------------------------------------------------------
     HERO PARALLAX
  ------------------------------------------------------- */
  const heroImg = document.querySelector('.hero__bg-img');
  if (heroImg) {
    gsap.to(heroImg, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });
  }

  /* -------------------------------------------------------
     HERO CONTENT: Stagger entrance on load
  ------------------------------------------------------- */
  const heroLabel   = document.querySelector('.hero__label');
  const heroTitle   = document.querySelector('.hero__title');
  const heroSub     = document.querySelector('.hero__subtitle');
  const heroActions = document.querySelector('.hero__actions');
  const heroScroll  = document.querySelector('.hero__scroll');

  const heroEls = [heroLabel, heroTitle, heroSub, heroActions, heroScroll].filter(Boolean);
  if (heroEls.length) {
    gsap.from(heroEls, {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.12,
      delay: 0.3,
    });
  }

  /* -------------------------------------------------------
     PAGE HERO (inner pages)
  ------------------------------------------------------- */
  const pageHeroLabel = document.querySelector('.page-hero .text-label');
  const pageHeroTitle = document.querySelector('.page-hero__title');
  const pageHeroSub   = document.querySelector('.page-hero__subtitle');

  [pageHeroLabel, pageHeroTitle, pageHeroSub].filter(Boolean).forEach((el, i) => {
    gsap.from(el, {
      opacity: 0,
      y: 24,
      duration: 0.9,
      ease: 'power3.out',
      delay: 0.2 + (i * 0.12),
    });
  });

  /* -------------------------------------------------------
     GENERIC REVEAL: .reveal
  ------------------------------------------------------- */
  gsap.utils.toArray('.reveal').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: BASE_DURATION,
      ease: BASE_EASE,
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
      }
    });
  });

  /* -------------------------------------------------------
     REVEAL LEFT
  ------------------------------------------------------- */
  gsap.utils.toArray('.reveal-left').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      x: 0,
      duration: BASE_DURATION,
      ease: BASE_EASE,
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
      }
    });
  });

  /* -------------------------------------------------------
     REVEAL RIGHT
  ------------------------------------------------------- */
  gsap.utils.toArray('.reveal-right').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      x: 0,
      duration: BASE_DURATION,
      ease: BASE_EASE,
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
      }
    });
  });

  /* -------------------------------------------------------
     REVEAL SCALE
  ------------------------------------------------------- */
  gsap.utils.toArray('.reveal-scale').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      scale: 1,
      duration: BASE_DURATION,
      ease: BASE_EASE,
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
      }
    });
  });

  /* -------------------------------------------------------
     STAGGER GROUPS
  ------------------------------------------------------- */
  gsap.utils.toArray('.stagger-group').forEach(group => {
    const children = group.querySelectorAll(':scope > *');
    gsap.to(children, {
      opacity: 1,
      y: 0,
      duration: BASE_DURATION,
      ease: BASE_EASE,
      stagger: STAGGER,
      scrollTrigger: {
        trigger: group,
        start: 'top 85%',
        once: true,
      }
    });
  });

  /* -------------------------------------------------------
     IMAGE CLIP REVEAL
  ------------------------------------------------------- */
  gsap.utils.toArray('.img-reveal').forEach(el => {
    gsap.to(el, {
      clipPath: 'inset(0 0% 0 0)',
      duration: 1.1,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      }
    });
  });

  /* -------------------------------------------------------
     SECTION DIVIDER LINES: animate width
  ------------------------------------------------------- */
  gsap.utils.toArray('.divider').forEach(line => {
    gsap.from(line, {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: line,
        start: 'top 90%',
        once: true,
      }
    });
  });

  /* -------------------------------------------------------
     WHY CHOOSE US: FRAMER PROJECT-HOVER SHOWCASE
  ------------------------------------------------------- */
  const showcaseContainer = document.querySelector('.framer-project-showcase');
  if (showcaseContainer) {
    gsap.from(showcaseContainer.querySelectorAll('.framer-project-card'), {
      opacity: 0,
      x: -30,
      duration: 0.7,
      ease: BASE_EASE,
      stagger: 0.08,
      scrollTrigger: {
        trigger: showcaseContainer,
        start: 'top 85%',
        once: true,
      }
    });
  }

  /* -------------------------------------------------------
     PROCESS STEPS: LEGACY CASCADE & FRAMER STEPS FLOW
  ------------------------------------------------------- */
  const processGrid = document.querySelector('.process-grid');
  if (processGrid) {
    gsap.from(processGrid.querySelectorAll('.process-step'), {
      opacity: 0,
      y: 30,
      duration: 0.65,
      ease: BASE_EASE,
      stagger: 0.1,
      scrollTrigger: {
        trigger: processGrid,
        start: 'top 88%',
        once: true,
      }
    });
  }

  // Framer-Style Steps Flow Animation
  const stepsFlowContainers = document.querySelectorAll('.steps-flow');
  stepsFlowContainers.forEach((flowContainer) => {
    const rows = Array.from(flowContainer.querySelectorAll('.steps-flow__row'));
    if (!rows.length) return;

    const svg = flowContainer.querySelector('.steps-flow__svg');
    const trackPath = flowContainer.querySelector('.steps-flow__svg-track');
    const fillPath = flowContainer.querySelector('.steps-flow__svg-fill');
    const startDot = flowContainer.querySelector('.steps-flow__dot--start');
    const endDot = flowContainer.querySelector('.steps-flow__dot--end');
    const mobileFill = flowContainer.querySelector('.steps-flow__mobile-fill');

    function updateDesktopPath() {
      if (window.innerWidth <= 860 || !svg || !trackPath || !fillPath) return;

      const containerRect = flowContainer.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const containerHeight = containerRect.height;
      svg.setAttribute('viewBox', `0 0 ${containerWidth} ${containerHeight}`);

      const marginX = 24;
      const radius = 36;
      let pathD = '';
      const dotCoords = [];

      rows.forEach((row, i) => {
        const rowRect = row.getBoundingClientRect();
        const rowTop = rowRect.top - containerRect.top;
        const rowBottom = rowRect.bottom - containerRect.top;
        const rowCenterY = rowTop + rowRect.height / 2;
        const isReversed = row.classList.contains('steps-flow__row--reversed');

        const leftX = marginX;
        const rightX = containerWidth - marginX;
        const currentX = isReversed ? rightX : leftX;

        // Position node point on the row
        const nodePoint = row.querySelector('.steps-flow__node-point');
        if (nodePoint) {
          nodePoint.style.left = `${currentX}px`;
          nodePoint.style.top = `${rowCenterY}px`;
        }

        if (i === 0) {
          // First row start
          pathD += `M ${leftX} ${0} L ${leftX} ${rowBottom - radius}`;
          dotCoords.push({ startX: leftX, startY: 0 });
        }

        if (i < rows.length - 1) {
          const nextRow = rows[i + 1];
          const nextRowRect = nextRow.getBoundingClientRect();
          const nextRowTop = nextRowRect.top - containerRect.top;
          const turnY = (rowBottom + nextRowTop) / 2;

          if (!isReversed) {
            // Left to Right snake
            pathD += ` L ${leftX} ${turnY - radius}`;
            pathD += ` Q ${leftX} ${turnY} ${leftX + radius} ${turnY}`;
            pathD += ` L ${rightX - radius} ${turnY}`;
            pathD += ` Q ${rightX} ${turnY} ${rightX} ${turnY + radius}`;
          } else {
            // Right to Left snake
            pathD += ` L ${rightX} ${turnY - radius}`;
            pathD += ` Q ${rightX} ${turnY} ${rightX - radius} ${turnY}`;
            pathD += ` L ${leftX + radius} ${turnY}`;
            pathD += ` Q ${leftX} ${turnY} ${leftX} ${turnY + radius}`;
          }
        } else {
          // Last row end
          pathD += ` L ${currentX} ${rowBottom}`;
          dotCoords.push({ endX: currentX, endY: rowBottom });
        }
      });

      trackPath.setAttribute('d', pathD);
      fillPath.setAttribute('d', pathD);

      const totalLen = fillPath.getTotalLength();
      if (totalLen > 0) {
        fillPath.style.strokeDasharray = `${totalLen} ${totalLen}`;
        fillPath.style.strokeDashoffset = `${totalLen}`;

        // Animate fill path on scroll
        gsap.to(fillPath, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: flowContainer,
            start: 'top 70%',
            end: 'bottom 80%',
            scrub: 0.4,
            invalidateOnRefresh: true,
          }
        });
      }

      // Position Start and End Dots
      if (startDot && dotCoords[0]) {
        startDot.style.left = `${dotCoords[0].startX}px`;
        startDot.style.top = `${dotCoords[0].startY}px`;
      }
      if (endDot && dotCoords[1]) {
        endDot.style.left = `${dotCoords[1].endX}px`;
        endDot.style.top = `${dotCoords[1].endY}px`;
      }
    }

    // Initial Path Calculation after layout ready
    requestAnimationFrame(() => {
      updateDesktopPath();
      ScrollTrigger.refresh();
    });

    // Mobile Line Scroll Animation
    if (mobileFill) {
      gsap.to(mobileFill, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: flowContainer,
          start: 'top 75%',
          end: 'bottom 85%',
          scrub: 0.3,
        }
      });
    }

    // Per-Row Number Roller, Active Nodes, and Card Entrance Reveal
    rows.forEach((row) => {
      const track = row.querySelector('.steps-flow__num-track');
      const targetVal = parseInt(track?.getAttribute('data-target') || '1', 10);
      const mediaCol = row.querySelector('.steps-flow__media-col');
      const textCol = row.querySelector('.steps-flow__text-col');

      // Ticker Rolling + Active state trigger
      ScrollTrigger.create({
        trigger: row,
        start: 'top 78%',
        onEnter: () => {
          row.classList.add('is-active');
          if (track) {
            track.style.transform = `translateY(-${targetVal * 10}%)`;
          }
        }
      });

      // Media card slide-up reveal
      if (mediaCol) {
        gsap.from(mediaCol, {
          opacity: 0,
          y: 40,
          scale: 0.95,
          duration: 0.85,
          ease: BASE_EASE,
          scrollTrigger: {
            trigger: row,
            start: 'top 82%',
            once: true,
          }
        });
      }

      // Text elements reveal
      if (textCol) {
        gsap.from(textCol.children, {
          opacity: 0,
          y: 30,
          duration: 0.75,
          stagger: 0.1,
          ease: BASE_EASE,
          scrollTrigger: {
            trigger: row,
            start: 'top 82%',
            once: true,
          }
        });
      }
    });

    // Resize Handler for dynamic SVG snake path
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateDesktopPath();
      }, 150);
    });
  });

  /* -------------------------------------------------------
     SELECTED WORK: Editorial Portfolio Grid Stagger & Mobile Carousel
  ------------------------------------------------------- */
  const portfolioPreviewGrid = document.querySelector('.portfolio-preview-grid, .work-bento-grid');
  const portfolioPreviewCards = document.querySelectorAll('.portfolio-card, .work-card');
  const workCards = portfolioPreviewCards;
  const workFilterBtns = document.querySelectorAll('.work-filter-btn');

  if (portfolioPreviewGrid && portfolioPreviewCards.length > 0) {
    // Initial Stagger Entrance on Scroll
    gsap.from(portfolioPreviewCards, {
      opacity: 0,
      y: 40,
      scale: 0.97,
      duration: 0.75,
      ease: BASE_EASE,
      stagger: 0.08,
      scrollTrigger: {
        trigger: portfolioPreviewGrid,
        start: 'top 85%',
        once: true,
      }
    });

    // Mobile swipe carousel dot sync
    const mobileDots = document.querySelectorAll('.portfolio-mobile-dot');
    const mobileCounter = document.getElementById('portfolio-mobile-counter');
    if (mobileDots.length > 0) {
      portfolioPreviewGrid.addEventListener('scroll', () => {
        const scrollLeft = portfolioPreviewGrid.scrollLeft;
        const cardWidth = portfolioPreviewGrid.querySelector('.portfolio-card')?.offsetWidth || 300;
        const activeIdx = Math.min(mobileDots.length - 1, Math.max(0, Math.round(scrollLeft / (cardWidth + 14))));
        mobileDots.forEach((dot, i) => {
          dot.classList.toggle('is-active', i === activeIdx);
        });
        if (mobileCounter) {
          mobileCounter.textContent = `0${activeIdx + 1} / 0${mobileDots.length}`;
        }
      }, { passive: true });
    }

    // Category Filtering Logic
    workFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        workFilterBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const filter = btn.dataset.filter;

        workCards.forEach(card => {
          const category = card.dataset.category;
          const match = filter === 'all' || category === filter;

          if (match) {
            card.style.display = 'flex';
            gsap.to(card, {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.4,
              ease: 'power2.out',
              clearProps: 'transform'
            });
          } else {
            gsap.to(card, {
              opacity: 0,
              scale: 0.94,
              y: 15,
              duration: 0.25,
              ease: 'power2.in',
              onComplete: () => {
                card.style.display = 'none';
              }
            });
          }
        });
      });
    });
  }

  /* -------------------------------------------------------
     ARCHITECTURAL FAQ: Framer AKFaq Interactive Component
  ------------------------------------------------------- */
  const faqSection = document.getElementById('faq');
  const faqItems = document.querySelectorAll('.akfaq-item, .faq-item');
  const faqFilterBtns = document.querySelectorAll('.akfaq-tab-btn, .faq-filter-btn');
  const faqListContainer = document.querySelector('.akfaq-items-list, .faq-accordion-list');
  const faqSearchInput = document.getElementById('akfaq-search-input') || document.getElementById('faq-search-input');
  const faqSearchClear = document.getElementById('akfaq-search-clear') || document.getElementById('faq-search-clear');
  const faqNoResults = document.getElementById('akfaq-no-results') || document.getElementById('faq-no-results');

  if (faqItems.length > 0) {
    let currentCategory = 'all';
    let currentSearch = '';

    // Filter and Search update function
    const updateFaqList = () => {
      let visibleCount = 0;
      let firstVisibleItem = null;

      faqItems.forEach(item => {
        const itemCategory = item.getAttribute('data-faq-category');
        const questionText = (item.querySelector('.akfaq-question, .faq-question-text')?.textContent || '').toLowerCase();
        const answerText = (item.querySelector('.akfaq-answer, .faq-answer-body')?.textContent || '').toLowerCase();

        const tabMatch = currentCategory === 'all' || itemCategory === currentCategory;
        const searchMatch = !currentSearch || questionText.includes(currentSearch) || answerText.includes(currentSearch);

        if (tabMatch && searchMatch) {
          item.style.display = 'block';
          visibleCount++;
          if (!firstVisibleItem) firstVisibleItem = item;
        } else {
          item.style.display = 'none';
          item.classList.remove('is-open');
          const trigger = item.querySelector('.akfaq-trigger, .faq-trigger');
          if (trigger) trigger.setAttribute('aria-expanded', 'false');
        }
      });

      // Show/hide empty state
      if (faqNoResults) {
        faqNoResults.style.display = visibleCount === 0 ? 'block' : 'none';
      }

      // If nothing is open, open the first visible item
      const anyOpen = Array.from(faqItems).some(it => it.classList.contains('is-open') && it.style.display !== 'none');
      if (!anyOpen && firstVisibleItem) {
        firstVisibleItem.classList.add('is-open');
        const firstTrigger = firstVisibleItem.querySelector('.akfaq-trigger, .faq-trigger');
        if (firstTrigger) firstTrigger.setAttribute('aria-expanded', 'true');
      }

      setTimeout(() => {
        if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
      }, 320);
    };

    // Live Search Input Listener
    if (faqSearchInput) {
      faqSearchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value.trim().toLowerCase();
        if (faqSearchClear) {
          faqSearchClear.style.display = currentSearch ? 'flex' : 'none';
        }
        updateFaqList();
      });

      if (faqSearchClear) {
        faqSearchClear.addEventListener('click', () => {
          faqSearchInput.value = '';
          currentSearch = '';
          faqSearchClear.style.display = 'none';
          faqSearchInput.focus();
          updateFaqList();
        });
      }
    }

    // Category Tabs Listener
    faqFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-faq-filter');
        currentCategory = filter;

        // Update active tab states
        faqFilterBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        updateFaqList();
      });
    });

    // Accordion Click Interactions
    faqItems.forEach(item => {
      const trigger = item.querySelector('.akfaq-trigger, .faq-trigger');
      if (!trigger) return;

      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');

        // Close other open items
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('is-open')) {
            otherItem.classList.remove('is-open');
            const otherTrigger = otherItem.querySelector('.akfaq-trigger, .faq-trigger');
            if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current item
        if (isOpen) {
          item.classList.remove('is-open');
          trigger.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
        }

        setTimeout(() => {
          if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
        }, 360);
      });
    });

    // GSAP Entrance
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.from('.akfaq-search-wrap, .akfaq-tabs, .akfaq-item', {
        opacity: 0,
        y: 25,
        duration: 0.6,
        ease: BASE_EASE,
        stagger: 0.05,
        scrollTrigger: {
          trigger: '.faq-editorial-section',
          start: 'top 85%',
          once: true,
        }
      });
    }
  }

  /* -------------------------------------------------------
     SELECTED WORK: Project Quick Specs Lightbox Modal
  ------------------------------------------------------- */
  const projectModal = document.getElementById('project-specs-modal');
  const projectModalClose = document.getElementById('project-modal-close');
  const openSpecBtns = document.querySelectorAll('.open-quick-specs');

  const projectDatabase = {
    // Kitchens
    'kitchen-01': {
      title: 'The Sage Green & Calacatta Island Kitchen',
      category: 'Modular Kitchen Architecture',
      location: '📍 C-Scheme, Jaipur',
      img: 'assets/kitchen videos-20260910T104310Z-1-001/kitchen videos/3d/5/1.jpg',
      summary: 'An expansive open-concept island kitchen engineered with handleless German Gola profiles, integrated appliance garages, Calacatta quartz island, and warm backlit vitrine display cabinets.',
      core: '100% Calibrated Marine-Grade BWP Plywood (Boiling Water Proof)',
      finish: 'Anti-Fingerprint Super-Matt PU & Natural Fluted Oak Veneer',
      hardware: 'Blum Austria Tandembox Soft-Close Runners & Lift-up Aventos',
      duration: '35 Working Days (Turnkey Delivery)',
      enquiryLink: 'contact.html?subject=The+Sage+Green+Kitchen'
    },
    'kitchen-02': {
      title: 'The Smoked Oak & Vitrine Appliance Wall',
      category: 'Modular Kitchen Architecture',
      location: '📍 Vaishali Nagar, Jaipur',
      img: 'assets/kitchen videos-20260910T104310Z-1-001/kitchen videos/3d/2/1.jpg',
      summary: 'Floor-to-ceiling built-in appliance unit with smoked glass vitrines, dark oak cabinetry, and integrated oven housing.',
      core: '100% Marine-Grade BWP Plywood (IS 710)',
      finish: 'Smoked Oak Veneer & Brushed Brass Gola',
      hardware: 'Hafele Soft-Close Hinges & Gola Channels',
      duration: '30 Working Days',
      enquiryLink: 'contact.html?subject=Smoked+Oak+Appliance+Wall'
    },
    'kitchen-03': {
      title: 'The Olive Shaker & Marble Breakfast Kitchen',
      category: 'Modular Kitchen Architecture',
      location: '📍 Malviya Nagar, Jaipur',
      img: 'assets/kitchen videos-20260910T104310Z-1-001/kitchen videos/3d/views/01.jpg',
      summary: 'Sophisticated olive green matte kitchen with marble backsplash, fluted glass upper units, and breakfast counter.',
      core: 'High-Density Calibrated BWP Substrate',
      finish: 'European Matte Acrylic & Nano Anti-Fingerprint Coat',
      hardware: 'Blum Aventos HK-S & Magic Corner Carousels',
      duration: '28 Working Days',
      enquiryLink: 'contact.html?subject=Olive+Shaker+Kitchen'
    },
    'kitchen-04': {
      title: 'The Walnut & Sage Ergonomic Kitchen',
      category: 'Modular Kitchen Architecture',
      location: '📍 Mansarovar, Jaipur',
      img: 'assets/kitchen videos-20260910T104310Z-1-001/kitchen videos/opulux/WhatsApp Image 2026-05-07 at 2.21.14 PM.jpeg',
      summary: 'Warm natural walnut base cabinetry paired with sage green wall units and spacious central work island.',
      core: '100% BWP Marine Plywood Core',
      finish: 'High-Gloss Acrylic & Natural American Walnut',
      hardware: 'Blum Soft-Close Tandembox Runners',
      duration: '30 Working Days',
      enquiryLink: 'contact.html?subject=Walnut+Sage+Kitchen'
    },
    'kitchen-05': {
      title: 'The Luxury Cream Acrylic U-Shaped Suite',
      category: 'Modular Kitchen Architecture',
      location: '📍 Tonk Road, Jaipur',
      img: 'assets/kitchen videos-20260910T104310Z-1-001/kitchen videos/opulux/WhatsApp Image 2026-05-07 at 2.21.16 PM.jpeg',
      summary: 'High-gloss cream acrylic U-shaped kitchen layout with seamless quartz countertops and soft-close pull-outs.',
      core: 'Calibrated IS 710 Marine Ply',
      finish: 'Champagne Metallic Acrylic & Quartz Countertop',
      hardware: 'Smart Proximity Sensor LEDs & Tandem Runners',
      duration: '25 Working Days',
      enquiryLink: 'contact.html?subject=Cream+Acrylic+Kitchen'
    },
    'kitchen-06': {
      title: 'The Neoclassical Statuario Marble Suite',
      category: 'Modular Kitchen Architecture',
      location: '📍 Raja Park, Jaipur',
      img: 'assets/kitchen videos-20260910T104310Z-1-001/kitchen videos/2da929ff-bd43-4e01-82f4-fc47e3fcba52.jpeg',
      summary: 'Timeless neoclassical island kitchen with Statuario marble waterfall island and integrated dual ovens.',
      core: '100% Calibrated BWP Marine Ply',
      finish: 'Venetian Deep Emerald PU & Fluted Glass',
      hardware: 'German Lift-Ups & Soft-Close Pantry Units',
      duration: '35 Working Days',
      enquiryLink: 'contact.html?subject=Neoclassical+Marble+Kitchen'
    },
    // Wardrobes
    'wardrobe-01': {
      title: 'The Bronze Glass Walk-In Dressing Suite',
      category: 'Modular Wardrobe Architecture',
      location: '📍 Vaishali Nagar, Jaipur',
      img: 'assets/kitchen videos-20260910T104310Z-1-001/kitchen videos/wardrobes/0d0ae31d-0a58-401f-8fbd-ccc2a59622e1.jpeg',
      summary: 'Walk-in dressing atelier crafted with bronze aluminum profile glass shutters, warm internal LED strip lighting, and drawer organizers.',
      core: 'Calibrated IS 710 Hardwood Marine Ply',
      finish: 'Bronze Aluminum Profile Glass & Velvet Drawer Lining',
      hardware: 'Push-to-Open Concealed Slides & Sensor Lights',
      duration: '25 Working Days',
      enquiryLink: 'contact.html?subject=Bronze+Glass+Wardrobe'
    },
    'wardrobe-02': {
      title: 'The 4-Door Beige & Oak Display Wardrobe',
      category: 'Modular Wardrobe Architecture',
      location: '📍 C-Scheme, Jaipur',
      img: 'assets/kitchen videos-20260910T104310Z-1-001/kitchen videos/wardrobes/1edfe2f2-1c28-4c15-ba7b-d8ac5755b6ed.jpeg',
      summary: 'Floor-to-ceiling 4-door beige profile wardrobe featuring a central open oak display tower and integrated lofts.',
      core: 'Calibrated IS 710 Hardwood Marine Ply',
      finish: 'Super-Matt Beige Shutter & Natural Oak Veneer',
      hardware: 'Hafele Integrated LED Rails, Soft-Close Concealed Hinges',
      duration: '28 Working Days',
      enquiryLink: 'contact.html?subject=Beige+Oak+Wardrobe'
    },
    'wardrobe-03': {
      title: 'The Glass Profile Walk-In with Hydraulic Lifter',
      category: 'Modular Wardrobe Architecture',
      location: '📍 Malviya Nagar, Jaipur',
      img: 'assets/kitchen videos-20260910T104310Z-1-001/kitchen videos/wardrobes/446e46cb-9a23-4c0d-ab07-88577c1ec841.jpeg',
      summary: 'Walk-in closet system featuring pull-down hydraulic hanger rails, smoked glass doors, and velvet jewelry drawers.',
      core: '100% Calibrated Marine-Grade Plywood',
      finish: 'Smoked Glass Aluminum Profile & Bronze Mirror',
      hardware: 'Pull-Down Hydraulic Wardrobe Lifter & Concealed Hinges',
      duration: '26 Working Days',
      enquiryLink: 'contact.html?subject=Hydraulic+Lifter+Wardrobe'
    },
    'wardrobe-04': {
      title: 'The Master Bedroom Hinged Wardrobe Suite',
      category: 'Modular Wardrobe Architecture',
      location: '📍 Mansarovar, Jaipur',
      img: 'assets/kitchen videos-20260910T104310Z-1-001/kitchen videos/wardrobes/4a609f84-e1e3-4f5d-8b63-e88d7dc7d219.jpeg',
      summary: 'Full-height master bedroom wardrobe with lower glass display drawers, internal organizing racks, and warm lighting.',
      core: 'Calibrated BWP Marine Core',
      finish: 'High-Gloss Italian Lacquer & Brushed Gold Hardware',
      hardware: '180-Degree Wide Opening Soft-Close Hinges',
      duration: '20 Working Days',
      enquiryLink: 'contact.html?subject=Master+Hinged+Wardrobe'
    },
    'wardrobe-05': {
      title: 'The Fluted Glass Profile LED Wardrobe',
      category: 'Modular Wardrobe Architecture',
      location: '📍 Tonk Road, Jaipur',
      img: 'assets/kitchen videos-20260910T104310Z-1-001/kitchen videos/wardrobes/55d1b694-86b5-40d1-938e-6952c68ed007.jpeg',
      summary: 'Contemporary wardrobe featuring fluted glass profile doors, vertical concealed LED channels, and soft-close hinges.',
      core: '100% Moisture-Proof Marine Plywood',
      finish: 'Fluted Profile Glass & Vertical Concealed LED',
      hardware: 'Soft-Close Telescopic Runners & Loft Hinges',
      duration: '24 Working Days',
      enquiryLink: 'contact.html?subject=Fluted+Glass+Wardrobe'
    },
    'wardrobe-06': {
      title: 'The Full-Height Master Wardrobe with Oak Cubbies',
      category: 'Modular Wardrobe Architecture',
      location: '📍 Raja Park, Jaipur',
      img: 'assets/kitchen videos-20260910T104310Z-1-001/kitchen videos/wardrobes/fc18e24e-d688-4edc-9023-af5758003e4b.jpeg',
      summary: 'Multi-functional bedroom wardrobe with extensive internal shelving, open oak cubbies, and integrated top lofts.',
      core: 'IS 710 Marine-Grade Structural Timber',
      finish: 'Matte Cashmere Laminate & Natural Oak Cubbies',
      hardware: 'Integrated Motion LED Hanger Bars & Watch Drawers',
      duration: '25 Working Days',
      enquiryLink: 'contact.html?subject=Master+Wardrobe+Oak+Cubbies'
    },
    // Living
    'living-01': {
      title: 'The Emerald Marble & Fluted Oak Media Wall',
      category: 'Living Spaces & TV Lounges',
      location: '📍 Malviya Nagar, Jaipur',
      img: 'assets/kitchen videos-20260910T104310Z-1-001/kitchen videos/3d/13/1.jpg',
      summary: 'Floor-to-ceiling entertainment wall with emerald marble slab, fluted oak paneling, and floating media credenza.',
      core: 'Moisture-Resistant High-Density Substrate & Natural Oak',
      finish: 'Emerald Marble Slab & Fluted Oak Slats',
      hardware: 'Concealed Zero-Wire Wall Conduits & Push Latches',
      duration: '18 Working Days',
      enquiryLink: 'contact.html?subject=Emerald+Marble+Media+Wall'
    },
    'living-02': {
      title: 'The Midnight Calacatta & Brass TV Suite',
      category: 'Living Spaces & TV Lounges',
      location: '📍 C-Scheme, Jaipur',
      img: 'assets/kitchen videos-20260910T104310Z-1-001/kitchen videos/3d/10/1.jpg',
      summary: 'Sophisticated midnight Calacatta marble wall with floating storage credenza, brass trims, and LED cove lighting.',
      core: '100% Calibrated BWP Marine Ply',
      finish: 'Midnight Calacatta Slab & Brushed Brass Trims',
      hardware: 'Floating Heavy-Duty Anchor Brackets',
      duration: '20 Working Days',
      enquiryLink: 'contact.html?subject=Midnight+Calacatta+TV+Suite'
    },
    'living-03': {
      title: 'The Italian Porcelain & Teak Slat Media Wall',
      category: 'Living Spaces & TV Lounges',
      location: '📍 Vaishali Nagar, Jaipur',
      img: 'assets/kitchen videos-20260910T104310Z-1-001/kitchen videos/3d/views/03.jpg',
      summary: 'Architectural entertainment media wall featuring seamless Italian porcelain slab backing and natural teak slats.',
      core: 'Moisture-Resistant High-Density Substrate & Natural Timber Slats',
      finish: 'Matte Italian Porcelain Tile & Natural Golden Teak Slats',
      hardware: 'Push-to-Open Concealed Tracks & Integrated Soundbar Cavity',
      duration: '20 Working Days',
      enquiryLink: 'contact.html?subject=Italian+Porcelain+Media+Wall'
    },
    'living-04': {
      title: 'The Slate Grey Floating Media Console Wall',
      category: 'Living Spaces & TV Lounges',
      location: '📍 Mansarovar, Jaipur',
      img: 'assets/kitchen videos-20260910T104310Z-1-001/kitchen videos/opulux/WhatsApp Image 2026-05-07 at 2.21.48 PM.jpeg',
      summary: 'Monochromatic slate grey wall-hung TV console with geometric wall paneling and concealed cable conduits.',
      core: 'Solid Hardwood Marine Plywood Frame',
      finish: 'Dual-Face Veneer & Black Powdercoated Trims',
      hardware: 'Integrated Cable Race-Ways & Heavy Mounts',
      duration: '22 Working Days',
      enquiryLink: 'contact.html?subject=Slate+Grey+Media+Wall'
    },
    'living-05': {
      title: 'The Contemporary Living Lounge Credenza',
      category: 'Living Spaces & TV Lounges',
      location: '📍 Tonk Road, Jaipur',
      img: 'assets/kitchen videos-20260910T104310Z-1-001/kitchen videos/opulux/WhatsApp Image 2026-05-07 at 2.21.50 PM.jpeg',
      summary: 'Modern minimalist living room wall storage with low-profile credenza and architectural gallery backdrop.',
      core: 'Calibrated BWP Marine Ply',
      finish: 'Matte Charcoal PU & Warm Diffused LEDs',
      hardware: 'Concealed Floating Shelf Anchors',
      duration: '16 Working Days',
      enquiryLink: 'contact.html?subject=Living+Lounge+Credenza'
    },
    'living-06': {
      title: 'The Panoramic Designer Living Lounge',
      category: 'Living Spaces & TV Lounges',
      location: '📍 Raja Park, Jaipur',
      img: 'assets/kitchen videos-20260910T104310Z-1-001/kitchen videos/65f9c0d6-3113-4f65-b416-ffca545dac5c.jpeg',
      summary: 'Clean architectural living suite with horizontal floating media unit and textured wall paneling.',
      core: '100% Marine Grade Plywood (IS 710)',
      finish: 'Architectural Micro-Cement & Natural Walnut',
      hardware: 'Soft-Close Push-Release Drawers',
      duration: '18 Working Days',
      enquiryLink: 'contact.html?subject=Panoramic+Living+Lounge'
    },
    // Office
    'office-01': {
      title: 'The Collaborative Executive Workspace',
      category: 'Office Furniture & Workspaces',
      location: '📍 C-Scheme, Jaipur',
      img: 'assets/kitchen videos-20260910T104310Z-1-001/kitchen videos/3d/9/1.jpg',
      summary: 'Ergonomic executive workstation system with acoustic dividers, modesty panels, and integrated wire conduits.',
      core: 'Heavy Commercial Grade BWP Substrate & Steel Framing',
      finish: 'Anti-Scratch Melamine & Brushed Brass Trims',
      hardware: 'Concealed Cable Ducts & Soft-Close Lateral Files',
      duration: '22 Working Days',
      enquiryLink: 'contact.html?subject=Collaborative+Executive+Workspace'
    },
    'office-02': {
      title: 'The Corporate Director Conference Suite',
      category: 'Office Furniture & Workspaces',
      location: '📍 Vaishali Nagar, Jaipur',
      img: 'assets/kitchen videos-20260910T104310Z-1-001/kitchen videos/3d/9/3.jpg',
      summary: 'Executive conference and director suite with bespoke meeting joinery and architectural lighting.',
      core: 'Calibrated Hardwood Marine Ply',
      finish: 'Synchronized Woodgrain & Sound-Dampening Felt',
      hardware: 'Full-Extension Soft-Close File Drawers',
      duration: '20 Working Days',
      enquiryLink: 'contact.html?subject=Corporate+Conference+Suite'
    },
    'office-03': {
      title: 'The Contemporary Open Studio Lounge',
      category: 'Office Furniture & Workspaces',
      location: '📍 Malviya Nagar, Jaipur',
      img: 'assets/kitchen videos-20260910T104310Z-1-001/kitchen videos/opulux/WhatsApp Image 2026-05-07 at 2.21.44 PM.jpeg',
      summary: 'Spacious open studio workspace featuring modular desking, display shelving, and breakout seating.',
      core: 'High-Durability Commercial Substrate',
      finish: 'Acoustic Fabric Screens & High-Wear Tops',
      hardware: 'Integrated Central Data & Power Modules',
      duration: '25 Working Days',
      enquiryLink: 'contact.html?subject=Open+Studio+Lounge'
    },
    'office-04': {
      title: 'The Architectural Joinery Library & Study Wall',
      category: 'Office Furniture & Workspaces',
      location: '📍 Mansarovar, Jaipur',
      img: 'assets/kitchen videos-20260910T104310Z-1-001/kitchen videos/opulux/WhatsApp Image 2026-05-07 at 2.21.45 PM.jpeg',
      summary: 'Custom floor-to-ceiling library wall with integrated study desk, closed lower cabinetry, and task lighting.',
      core: '100% Calibrated BWP Marine Ply',
      finish: 'Nordic Ash Laminate & Warm Task LEDs',
      hardware: 'Hydraulic Soft-Close Overhead Lift-Ups',
      duration: '15 Working Days',
      enquiryLink: 'contact.html?subject=Architectural+Library+Study'
    },
    'office-05': {
      title: 'The Executive Wood Veneer Dining & Work Suite',
      category: 'Office Furniture & Workspaces',
      location: '📍 Tonk Road, Jaipur',
      img: 'assets/kitchen videos-20260910T104310Z-1-001/kitchen videos/164b0085-4161-41c6-87d1-2308091e4050.jpeg',
      summary: 'Bespoke executive joinery suite in natural wood veneer suitable for multipurpose conference and dining.',
      core: 'Structural Steel Core & Marine Plywood',
      finish: 'Natural American Oak Veneer',
      hardware: 'Heavy-Duty Cantilever Wall Mounts',
      duration: '24 Working Days',
      enquiryLink: 'contact.html?subject=Executive+Veneer+Suite'
    },
    'office-06': {
      title: 'The Arched Study Alcove & Writing Nook',
      category: 'Office Furniture & Workspaces',
      location: '📍 Raja Park, Jaipur',
      img: 'assets/kitchen videos-20260910T104310Z-1-001/kitchen videos/d10b9493-59ba-4974-a595-47b261134e31.jpeg',
      summary: 'Minimalist arched study nook with floating writing desk, task lighting, and overhead display shelving.',
      core: 'Moisture-Proof BWP Marine Ply',
      finish: 'Matte White Melamine & Oak Accents',
      hardware: 'Compact Gas Struts & Magnetic Latches',
      duration: '14 Working Days',
      enquiryLink: 'contact.html?subject=Arched+Study+Alcove'
    },
    // Vanity
    'vanity-01': {
      title: 'The Terracotta Ceramic Fluted Powder Vanity',
      category: 'Vanity & Bathroom Units',
      location: '📍 Vaishali Nagar, Jaipur',
      img: 'assets/kitchen videos-20260910T104310Z-1-001/kitchen videos/opulux/WhatsApp Image 2026-05-07 at 2.21.51 PM.jpeg',
      summary: 'Moisture-proof floating powder room vanity with fluted terracotta ceramic basin, quartz counter, and mirror.',
      core: '100% Marine Ply IS 710 (Boiling Water Proof)',
      finish: 'Fluted Ceramic & Anti-Moisture PUR',
      hardware: 'Blum Tandembox Stainless Steel Runners',
      duration: '15 Working Days',
      enquiryLink: 'contact.html?subject=Terracotta+Fluted+Vanity'
    },
    'vanity-02': {
      title: 'The Fluted Ceramic Basin & Open Joinery Vanity',
      category: 'Vanity & Bathroom Units',
      location: '📍 C-Scheme, Jaipur',
      img: 'assets/kitchen videos-20260910T104310Z-1-001/kitchen videos/opulux/WhatsApp Image 2026-05-07 at 2.21.52 PM.jpeg',
      summary: 'Contemporary bathroom vanity unit with fluted ceramic vessel sink, lower open joinery storage, and backlit mirror.',
      core: 'BWP Marine-Grade Structural Timber',
      finish: 'Anti-Fingerprint Matte PU & Backlit Mirror',
      hardware: 'Hafele Soft-Close Dampers',
      duration: '16 Working Days',
      enquiryLink: 'contact.html?subject=Fluted+Ceramic+Vanity'
    },
    'vanity-03': {
      title: 'The Rose Gold Oval Vessel Basin Vanity',
      category: 'Vanity & Bathroom Units',
      location: '📍 Malviya Nagar, Jaipur',
      img: 'assets/kitchen videos-20260910T104310Z-1-001/kitchen videos/opulux/WhatsApp Image 2026-05-07 at 2.21.53 PM (1).jpeg',
      summary: 'Luxury powder room console featuring an oval vessel basin, rose gold hardware accents, and marble wall panel.',
      core: '100% Marine Plywood Substrate',
      finish: 'Calacatta Quartz Counter & Rose Gold Trims',
      hardware: 'Waterproof Concealed Drawer Systems',
      duration: '20 Working Days',
      enquiryLink: 'contact.html?subject=Rose+Gold+Oval+Vanity'
    },
    'vanity-04': {
      title: 'The Master Suite Fluted Oak Double Vanity',
      category: 'Vanity & Bathroom Units',
      location: '📍 Mansarovar, Jaipur',
      img: 'assets/kitchen videos-20260910T104310Z-1-001/kitchen videos/opulux/WhatsApp Image 2026-05-07 at 2.23.37 PM.jpeg',
      summary: 'Grand floating double-sink vanity in moisture-proof fluted oak with dual LED backlit mirrors and quartz top.',
      core: 'Anti-Moisture BWP Substrate',
      finish: 'Natural Fluted Oak Woodgrain & Polyurethane Seal',
      hardware: 'Blum Tandem Soft-Close Runners',
      duration: '22 Working Days',
      enquiryLink: 'contact.html?subject=Fluted+Oak+Double+Vanity'
    },
    'vanity-05': {
      title: 'The Emerald & Black Marquina Marble Vanity',
      category: 'Vanity & Bathroom Units',
      location: '📍 Tonk Road, Jaipur',
      img: 'assets/kitchen videos-20260910T104310Z-1-001/kitchen videos/opulux/WhatsApp Image 2026-05-07 at 2.23.41 PM.jpeg',
      summary: 'Opulent dark emerald vanity with black Marquina marble top, brushed brass hardware, and smart anti-fog mirror.',
      core: '100% BWP Marine Ply Core',
      finish: 'Dark Emerald PU & Black Marquina Marble',
      hardware: 'Concealed 110-Degree Soft Hinges',
      duration: '18 Working Days',
      enquiryLink: 'contact.html?subject=Emerald+Marquina+Vanity'
    },
    'vanity-06': {
      title: 'The Monolithic Terrazzo & Walnut Suspended Basin',
      category: 'Vanity & Bathroom Units',
      location: '📍 Raja Park, Jaipur',
      img: 'assets/kitchen videos-20260910T104310Z-1-001/kitchen videos/62f5a47e-8079-431a-9a3e-8084f3cc005c.jpeg',
      summary: 'Minimalist suspended grey terrazzo washbasin paired with a lower fluted natural walnut storage drawer.',
      core: 'IS 710 Calibrated Marine Core',
      finish: 'Monolithic Grey Terrazzo & Natural Walnut',
      hardware: 'Moisture-Proof Blum Motion Runners',
      duration: '18 Working Days',
      enquiryLink: 'contact.html?subject=Terrazzo+Walnut+Basin'
    },
    // Custom
    'custom-01': {
      title: 'The Illuminated Gold Glass Crockery Vitrine',
      category: 'Custom Modular Interiors',
      location: '📍 C-Scheme, Jaipur',
      img: 'assets/kitchen videos-20260910T104310Z-1-001/kitchen videos/3d/views/02.jpg',
      summary: 'Bespoke dining room tall crockery vitrine with champagne gold glass doors and warm LED shelf illumination.',
      core: '100% Calibrated BWP Marine Ply',
      finish: 'Fluted Tempered Glass & Champagne Gold Frames',
      hardware: 'Hafele Vitrine Hinges & Warm LED Strips',
      duration: '22 Working Days',
      enquiryLink: 'contact.html?subject=Gold+Glass+Crockery+Vitrine'
    },
    'custom-02': {
      title: 'The Luxury Walnut Bar Counter & Wine Storage',
      category: 'Custom Modular Interiors',
      location: '📍 Vaishali Nagar, Jaipur',
      img: 'assets/kitchen videos-20260910T104310Z-1-001/kitchen videos/3d/views/04.jpg',
      summary: 'Custom home bar unit featuring natural walnut shelving, stemware racks, wine storage niches, and prep counter.',
      core: 'Solid Hardwood & BWP Marine Plywood',
      finish: 'Natural Walnut Veneer & Quartz Prep Counter',
      hardware: 'Soft-Close Wine Drawer Guides & Stemware Rails',
      duration: '20 Working Days',
      enquiryLink: 'contact.html?subject=Walnut+Bar+Counter'
    },
    'custom-03': {
      title: 'The Rolling Shutter Appliance Garage & Pantry',
      category: 'Custom Modular Interiors',
      location: '📍 Malviya Nagar, Jaipur',
      img: 'assets/kitchen videos-20260910T104310Z-1-001/kitchen videos/opulux/WhatsApp Image 2026-05-07 at 2.21.53 PM.jpeg',
      summary: 'Specialized pantry unit with metallic rolling shutter appliance garage, wicker vegetable baskets, and quartz counter.',
      core: 'High-Density Moisture-Resistant Board',
      finish: 'Metallic Rolling Shutter & Natural Wicker Baskets',
      hardware: 'Smooth Glide Counterbalance Shutter & Full Extension Slides',
      duration: '16 Working Days',
      enquiryLink: 'contact.html?subject=Rolling+Shutter+Pantry'
    },
    'custom-04': {
      title: 'The Smoked Glass Architectural Vitrine Tower',
      category: 'Custom Modular Interiors',
      location: '📍 Mansarovar, Jaipur',
      img: 'assets/kitchen videos-20260910T104310Z-1-001/kitchen videos/opulux/WhatsApp Image 2026-05-07 at 2.21.54 PM.jpeg',
      summary: 'Floor-to-ceiling smoked glass display cabinet with vertical LED edge lighting for luxury dinnerware.',
      core: '100% Marine-Grade Plywood (IS 710)',
      finish: 'Smoked Glass & Matte Bronze Profiles',
      hardware: 'Integrated LED Channels & Magnetic Push-to-Open',
      duration: '18 Working Days',
      enquiryLink: 'contact.html?subject=Smoked+Glass+Vitrine+Tower'
    },
    'custom-05': {
      title: 'The Sleek Vertical Vitrine Display Showcase',
      category: 'Custom Modular Interiors',
      location: '📍 Tonk Road, Jaipur',
      img: 'assets/kitchen videos-20260910T104310Z-1-001/kitchen videos/opulux/WhatsApp Image 2026-05-07 at 2.23.38 PM.jpeg',
      summary: 'Slimline glass display vitrine with integrated LED illumination, lower storage drawers, and champagne frame.',
      core: 'BWP Marine Plywood & Aluminum Profiles',
      finish: 'Champagne Aluminum Frame & Clear Glass',
      hardware: 'Soft-Close Drawer Runners & Vitrine Pivots',
      duration: '18 Working Days',
      enquiryLink: 'contact.html?subject=Vertical+Vitrine+Showcase'
    },
    'custom-06': {
      title: 'The Teal Mosaic Breakfast Bar & Wine Rack',
      category: 'Custom Modular Interiors',
      location: '📍 Raja Park, Jaipur',
      img: 'assets/kitchen videos-20260910T104310Z-1-001/kitchen videos/opulux/WhatsApp Image 2026-05-07 at 2.23.39 PM.jpeg',
      summary: 'Custom breakfast bar counter featuring teal mosaic detailing, suspended overhead wine glass rack, and fluted joinery.',
      core: '100% Calibrated Marine Ply',
      finish: 'Teal Mosaic Ceramic & Natural Wood Joinery',
      hardware: 'Suspended Steel Stemware Rack & Soft Drawers',
      duration: '22 Working Days',
      enquiryLink: 'contact.html?subject=Teal+Mosaic+Breakfast+Bar'
    },
  };

  if (projectModal) {
    const modalImg = document.getElementById('project-modal-img');
    const modalCategory = document.getElementById('project-modal-category');
    const modalTitle = document.getElementById('project-modal-title');
    const modalLoc = document.getElementById('project-modal-loc');
    const modalSummary = document.getElementById('project-modal-summary');
    const modalCore = document.getElementById('project-modal-core');
    const modalFinish = document.getElementById('project-modal-finish');
    const modalHardware = document.getElementById('project-modal-hardware');
    const modalDuration = document.getElementById('project-modal-duration');
    const modalEnquireBtn = document.getElementById('project-modal-enquire-btn');

    function openProjectModal(projectId, triggerCard) {
      const data = projectDatabase[projectId];
      
      if (data) {
        if (modalImg) modalImg.src = data.img;
        if (modalCategory) modalCategory.textContent = data.category;
        if (modalTitle) modalTitle.textContent = data.title;
        if (modalLoc) modalLoc.textContent = data.location;
        if (modalSummary) modalSummary.textContent = data.summary;
        if (modalCore) modalCore.textContent = data.core;
        if (modalFinish) modalFinish.textContent = data.finish;
        if (modalHardware) modalHardware.textContent = data.hardware;
        if (modalDuration) modalDuration.textContent = data.duration;
        if (modalEnquireBtn) modalEnquireBtn.href = data.enquiryLink;
      } else if (triggerCard) {
        // Fallback reading from card DOM elements
        const cardImg = triggerCard.querySelector('img');
        const cardTitle = triggerCard.querySelector('.project-card__title, .work-card__title');
        const cardCategory = triggerCard.querySelector('.project-card__category-tag, .work-card__category-tag');
        const cardLoc = triggerCard.querySelector('.project-card__location-pill, .work-card__location-pill');
        const cardDesc = triggerCard.querySelector('.project-card__desc, .work-card__desc');
        
        if (modalImg && cardImg) modalImg.src = cardImg.src;
        if (modalCategory && cardCategory) modalCategory.textContent = cardCategory.textContent;
        if (modalTitle && cardTitle) modalTitle.textContent = cardTitle.textContent;
        if (modalLoc && cardLoc) modalLoc.textContent = cardLoc.textContent;
        if (modalSummary && cardDesc) modalSummary.textContent = cardDesc.textContent;
        if (modalCore) modalCore.textContent = '100% Calibrated Marine-Grade BWP Plywood';
        if (modalFinish) modalFinish.textContent = 'European Acrylic / PU / Natural Veneer';
        if (modalHardware) modalHardware.textContent = 'Blum Austria / Hafele Soft-Close Hardware';
        if (modalDuration) modalDuration.textContent = '25–35 Working Days';
        if (modalEnquireBtn) modalEnquireBtn.href = `contact.html?subject=${encodeURIComponent(cardTitle ? cardTitle.textContent : 'Project Enquiry')}`;
      }

      projectModal.classList.add('is-open');
      projectModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeProjectModal() {
      projectModal.classList.remove('is-open');
      projectModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    openSpecBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const projectId = btn.dataset.targetProject;
        const parentCard = btn.closest('.project-card, .work-card');
        openProjectModal(projectId, parentCard);
      });
    });

    // Delegate in case cards are added dynamically
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.open-quick-specs, .project-btn-specs, .work-btn-specs');
      if (btn) {
        e.preventDefault();
        e.stopPropagation();
        const projectId = btn.dataset.targetProject || btn.getAttribute('data-target-project');
        const parentCard = btn.closest('.project-card, .work-card');
        openProjectModal(projectId, parentCard);
      }
    });

    if (projectModalClose) {
      projectModalClose.addEventListener('click', closeProjectModal);
    }

    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && projectModal.classList.contains('is-open')) {
        closeProjectModal();
      }
    });
  }

  // Legacy projects-grid fallback
  const projectsGrid = document.querySelector('.projects-grid');
  if (projectsGrid) {
    gsap.from(projectsGrid.querySelectorAll('.project-card'), {
      opacity: 0,
      y: 40,
      scale: 0.97,
      duration: 0.7,
      ease: BASE_EASE,
      stagger: 0.09,
      scrollTrigger: {
        trigger: projectsGrid,
        start: 'top 85%',
        once: true,
      }
    });
  }

  /* -------------------------------------------------------
     HORIZONTAL SCROLL (mobile project strip)
  ------------------------------------------------------- */
  // Note: handled purely via CSS overflow-x scroll on mobile

  /* -------------------------------------------------------
     COUNTER ANIMATION for numbers
  ------------------------------------------------------- */
  gsap.utils.toArray('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.from({ val: 0 }, {
          val: target,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate: function () {
            el.textContent = Math.round(this.targets()[0].val) + (el.dataset.suffix || '');
          }
        });
      }
    });
  });

  /* -------------------------------------------------------
     MARQUEE: pause on visibility
  ------------------------------------------------------- */
  // Handled via CSS animation, no GSAP needed

  /* -------------------------------------------------------
     LENIS SMOOTH SCROLL INTEGRATION
  ------------------------------------------------------- */
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
    window.lenis = lenis;
  }

  /* -------------------------------------------------------
     MAGNETIC CURSOR SYSTEM
  ------------------------------------------------------- */
  const cursor = document.querySelector('.custom-cursor');
  const cursorDot = document.querySelector('.custom-cursor__dot');
  const cursorRing = document.querySelector('.custom-cursor__ring');
  const cursorLabel = document.querySelector('.custom-cursor__label');

  if (cursor && cursorDot && cursorRing) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(cursorDot, { x: mouseX, y: mouseY, duration: 0.1, ease: 'power2.out' });
    });

    gsap.ticker.add(() => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      gsap.set(cursorRing, { x: ringX, y: ringY });
    });

    // Hover triggers
    const hoverTargets = document.querySelectorAll('[data-cursor-label], a, button, .service-card, .project-card, .work-card, .work-btn-specs, .swatch-item, .transformation-slider, .framer-project-card, .framer-project-showcase');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('is-hovering');
        const labelText = el.getAttribute('data-cursor-label') || '';
        if (labelText && cursorLabel) {
          cursorLabel.textContent = labelText;
        } else if (cursorLabel) {
          cursorLabel.textContent = '';
        }
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('is-hovering');
        if (cursorLabel) cursorLabel.textContent = '';
      });
    });
  }

  /* -------------------------------------------------------
     3D CARD TILT & SPOTLIGHT GLARE EFFECT
  ------------------------------------------------------- */
  const tiltCards = document.querySelectorAll('.tilt-card, .service-card, .project-card, .work-card, .why-card, .framer-glass-card');
  tiltCards.forEach(card => {
    card.classList.add('spotlight-card');
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Update spotlight CSS vars
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // Calculate 3D tilt angles
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1000,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
  });

  /* -------------------------------------------------------
     MAGNETIC BUTTONS EFFECT
  ------------------------------------------------------- */
  const magneticBtns = document.querySelectorAll('.btn, .nav__cta, .transformation-slider__handle-btn');
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const deltaX = e.clientX - (rect.left + rect.width / 2);
      const deltaY = e.clientY - (rect.top + rect.height / 2);

      gsap.to(btn, {
        x: deltaX * 0.25,
        y: deltaY * 0.25,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.4)'
      });
    });
  });

  /* -------------------------------------------------------
     INTERACTIVE BEFORE / AFTER SLIDER
  ------------------------------------------------------- */
  const slider = document.querySelector('.transformation-slider');
  if (slider) {
    const beforeContainer = slider.querySelector('.transformation-slider__before');
    const handle = slider.querySelector('.transformation-slider__handle');
    const beforeImg = beforeContainer ? beforeContainer.querySelector('img') : null;

    let isDragging = false;

    function syncDimensions() {
      if (beforeImg && slider) {
        beforeImg.style.width = `${slider.offsetWidth}px`;
      }
    }

    syncDimensions();
    window.addEventListener('load', syncDimensions);

    function updateSliderPosition(clientX) {
      const rect = slider.getBoundingClientRect();
      let offsetX = clientX - rect.left;
      if (offsetX < 0) offsetX = 0;
      if (offsetX > rect.width) offsetX = rect.width;

      const percentage = (offsetX / rect.width) * 100;
      if (beforeContainer) beforeContainer.style.width = `${percentage}%`;
      if (handle) handle.style.left = `${percentage}%`;
      if (beforeImg) beforeImg.style.width = `${rect.width}px`;
    }

    slider.addEventListener('mousedown', (e) => {
      isDragging = true;
      updateSliderPosition(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      updateSliderPosition(e.clientX);
    });

    window.addEventListener('mouseup', () => { isDragging = false; });

    // Touch events
    slider.addEventListener('touchstart', (e) => {
      isDragging = true;
      updateSliderPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      updateSliderPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => { isDragging = false; });

    // Resize sync
    window.addEventListener('resize', syncDimensions);
  }

  /* -------------------------------------------------------
     INTERACTIVE MATERIAL CUSTOMIZER (4-STATE BRAND PALETTE)
  ------------------------------------------------------- */
  const customizerCard = document.querySelector('#craftsmanship-card');
  const swatches = document.querySelectorAll('.swatch-item');
  const stateImgs = document.querySelectorAll('.material-state-img');
  const dots = document.querySelectorAll('.material-dot');
  const counterNum = document.querySelector('#material-current-num');
  const previewTitle = document.querySelector('#material-preview-title');
  const previewDesc = document.querySelector('#material-preview-desc');
  const previewTags = document.querySelector('#material-preview-tags');

  if (customizerCard && stateImgs.length) {
    let activeStateIndex = 0;

    const statesData = [
      {
        title: "Japanese Indigo Finish",
        desc: "Deep Japanese Indigo (#1E424D) cabinetry & architectural fluted panels balanced with soft Flax and Iceberg accents.",
        tags: "Japanese Indigo · Matte Acrylic · Smoked Core"
      },
      {
        title: "Iceberg Horizon Finish",
        desc: "Luminous Iceberg (#77B5D3) tones harmonized with deep Japanese Indigo cabinetry and ambient Flax illumination.",
        tags: "Iceberg Blue · High-Gloss Marble · Soft-Close Tandem"
      },
      {
        title: "Warm Flax Oak Finish",
        desc: "Warm Flax (#E5D595) champagne veneer and velvet upholstery anchored with Dark Brown and Japanese Indigo accents.",
        tags: "Warm Flax · Natural Grain Veneer · Champagne Gola"
      },
      {
        title: "Royal Gamboge Amber Finish",
        desc: "Vibrant Gamboge (#E19E11) architectural accents and warm golden lighting balanced with Dark Brown and Indigo depths.",
        tags: "Gamboge Gold · Fluted Glass · Blum Motion"
      }
    ];

    function setCustomizerState(index) {
      if (index < 0 || index >= statesData.length || index === activeStateIndex) return;
      activeStateIndex = index;

      // Update image crossfade stack
      stateImgs.forEach((img, i) => {
        if (i === index) {
          img.classList.add('active');
        } else {
          img.classList.remove('active');
        }
      });

      // Update swatches
      swatches.forEach((s, i) => {
        s.classList.toggle('active', i === index);
      });

      // Update indicator dots & counter
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
      if (counterNum) {
        counterNum.textContent = `0${index + 1}`;
      }

      // Smoothly update captions
      const data = statesData[index];
      if (previewTitle && previewDesc && previewTags) {
        gsap.to([previewTitle, previewDesc, previewTags], {
          opacity: 0.3,
          duration: 0.15,
          onComplete: () => {
            previewTitle.textContent = data.title;
            previewDesc.textContent = data.desc;
            previewTags.textContent = data.tags;
            gsap.to([previewTitle, previewDesc, previewTags], {
              opacity: 1,
              duration: 0.25,
              ease: 'power2.out'
            });
          }
        });
      }
    }

    // 1. Swatch interactions (Click & Hover)
    swatches.forEach((swatch, i) => {
      swatch.addEventListener('click', () => setCustomizerState(i));
      swatch.addEventListener('mouseenter', () => setCustomizerState(i));
    });

    // 2. Dots interactions
    dots.forEach((dot, i) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        setCustomizerState(i);
      });
    });

    // 3. Desktop Hover Across Image
    customizerCard.addEventListener('mousemove', (e) => {
      const rect = customizerCard.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const fraction = Math.max(0, Math.min(0.999, offsetX / rect.width));
      const targetIndex = Math.floor(fraction * 4);
      setCustomizerState(targetIndex);
    });

    // 4. Mobile Swipe & Tap Interaction
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    customizerCard.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
    }, { passive: true });

    customizerCard.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      const deltaTime = Date.now() - touchStartTime;

      // Check horizontal swipe
      if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX < 0) {
          // Swipe Left -> Next
          setCustomizerState((activeStateIndex + 1) % 4);
        } else {
          // Swipe Right -> Prev
          setCustomizerState((activeStateIndex - 1 + 4) % 4);
        }
      } else if (Math.abs(deltaX) < 15 && Math.abs(deltaY) < 15 && deltaTime < 300) {
      }
    });
  }



  /* -------------------------------------------------------
     WHY CHOOSE US: FRAMER PROJECT-HOVER INTERACTION
  ------------------------------------------------------- */
  const framerCards = document.querySelectorAll('.framer-project-card');
  const framerBgImages = document.querySelectorAll('.framer-project-bg');
  const framerWhyNum = document.querySelector('#framer-why-num');
  const framerWhyTag = document.querySelector('#framer-why-tag');
  const framerShowcase = document.querySelector('.framer-project-showcase');

  if (framerCards.length && framerBgImages.length) {
    let activeFramerIndex = 0;

    const framerData = [
      { num: "01", tag: "Bespoke Spatial Architecture" },
      { num: "02", tag: "European Hardware & Plywood" },
      { num: "03", tag: "Micron-Accurate CNC Engineering" },
      { num: "04", tag: "Smart Ergonomics & Storage" },
      { num: "05", tag: "White-Glove Master Fitting" },
      { num: "06", tag: "Guaranteed 45-Day Handover" }
    ];

    function setFramerShowcaseActive(index) {
      if (index < 0 || index >= framerData.length || index === activeFramerIndex) return;
      activeFramerIndex = index;

      // Update card active classes
      framerCards.forEach((card, i) => {
        const isActive = i === index;
        card.classList.toggle('active', isActive);
        card.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      // Update background image crossfade
      framerBgImages.forEach((img, i) => {
        img.classList.toggle('active', i === index);
      });

      // Update floating info badge
      if (framerWhyNum) framerWhyNum.textContent = framerData[index].num;
      if (framerWhyTag) {
        gsap.to(framerWhyTag, {
          opacity: 0.2,
          duration: 0.15,
          onComplete: () => {
            framerWhyTag.textContent = framerData[index].tag;
            gsap.to(framerWhyTag, {
              opacity: 1,
              duration: 0.25,
              ease: 'power2.out'
            });
          }
        });
      }
    }

    // Hover & Click triggers on cards
    framerCards.forEach((card, i) => {
      card.addEventListener('mouseenter', () => setFramerShowcaseActive(i));
      card.addEventListener('click', () => setFramerShowcaseActive(i));
    });

    // Mobile touch / swipe on showcase frame
    if (framerShowcase) {
      let touchStartX = 0;
      let touchStartY = 0;
      let touchStartTime = 0;

      framerShowcase.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
      }, { passive: true });

      framerShowcase.addEventListener('touchend', (e) => {
        const deltaX = e.changedTouches[0].clientX - touchStartX;
        const deltaY = e.changedTouches[0].clientY - touchStartY;
        const deltaTime = Date.now() - touchStartTime;

        if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
          if (deltaX < 0) {
            setFramerShowcaseActive((activeFramerIndex + 1) % framerData.length);
          } else {
            setFramerShowcaseActive((activeFramerIndex - 1 + framerData.length) % framerData.length);
          }
        }
      });
    }
  }

  /* -------------------------------------------------------
     MODULAR COST ESTIMATOR MODAL & CALCULATION
  ------------------------------------------------------- */
  const estimatorTriggers = document.querySelectorAll('[data-open-estimator]');
  const estimatorOverlay = document.querySelector('#estimate-modal-overlay');
  const estimatorClose = document.querySelector('#estimate-modal-close');
  const priceDisplay = document.querySelector('#estimate-price-display');

  if (estimatorOverlay) {
    estimatorTriggers.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        estimatorOverlay.classList.add('is-active');
        document.body.style.overflow = 'hidden';
      });
    });

    estimatorClose && estimatorClose.addEventListener('click', () => {
      estimatorOverlay.classList.remove('is-active');
      document.body.style.overflow = '';
    });

    estimatorOverlay.addEventListener('click', (e) => {
      if (e.target === estimatorOverlay) {
        estimatorOverlay.classList.remove('is-active');
        document.body.style.overflow = '';
      }
    });

    // Estimation Logic
    const roomChips = document.querySelectorAll('.chip-room');
    const finishChips = document.querySelectorAll('.chip-finish');
    const sizeChips = document.querySelectorAll('.chip-size');

    let baseRoom = 120000;
    let finishMultiplier = 1.0;
    let sizeMultiplier = 1.0;

    function recalculateEstimate() {
      const activeRoom = document.querySelector('.chip-room.active');
      const activeFinish = document.querySelector('.chip-finish.active');
      const activeSize = document.querySelector('.chip-size.active');

      if (activeRoom) baseRoom = parseInt(activeRoom.dataset.base, 10);
      if (activeFinish) finishMultiplier = parseFloat(activeFinish.dataset.mult);
      if (activeSize) sizeMultiplier = parseFloat(activeSize.dataset.mult);

      const total = Math.round(baseRoom * finishMultiplier * sizeMultiplier);

      if (priceDisplay) {
        gsap.to({ val: parseInt(priceDisplay.textContent.replace(/[^0-9]/g, '') || 0, 10) }, {
          val: total,
          duration: 0.8,
          ease: 'power2.out',
          onUpdate: function () {
            priceDisplay.textContent = '₹' + Math.round(this.targets()[0].val).toLocaleString('en-IN');
          }
        });
      }
    }

    [...roomChips, ...finishChips, ...sizeChips].forEach(chip => {
      chip.addEventListener('click', () => {
        const group = chip.dataset.group;
        document.querySelectorAll(`[data-group="${group}"]`).forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        recalculateEstimate();
      });
    });
  }

  /* -------------------------------------------------------
     FRAMER SLIDING TAB INDICATOR FOR FILTERS
  ------------------------------------------------------- */
  const filterWrapper = document.querySelector('.filter-tabs-wrapper');
  if (filterWrapper) {
    const indicator = document.createElement('div');
    indicator.className = 'filter-pill-indicator';
    filterWrapper.prepend(indicator);

    function updatePillPosition(activeBtn) {
      const wrapperRect = filterWrapper.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      const leftOffset = btnRect.left - wrapperRect.left;

      indicator.style.width = `${btnRect.width}px`;
      indicator.style.transform = `translateX(${leftOffset - 4}px)`;
    }

    const activeFilter = filterWrapper.querySelector('.filter-btn.active') || filterWrapper.querySelector('.filter-btn');
    if (activeFilter) {
      setTimeout(() => updatePillPosition(activeFilter), 100);
    }

    filterWrapper.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        updatePillPosition(btn);
      });
    });
  }

  /* -------------------------------------------------------
     TOAST NOTIFICATION UTILITY
  ------------------------------------------------------- */
  window.showToast = function (message) {
    let toast = document.querySelector('.toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-notification';
      toast.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg><span></span>`;
      document.body.appendChild(toast);
    }
    toast.querySelector('span').textContent = message;
    toast.classList.add('is-visible');

    setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 3200);
  };

  /* -------------------------------------------------------
     TEAM SPOTLIGHT LIGHTBOX MODAL
  ------------------------------------------------------- */
  const teamCards = document.querySelectorAll('.team-card');
  const teamOverlay = document.querySelector('#team-modal-overlay');
  const teamClose = document.querySelector('#team-modal-close');

  const teamData = {
    "1": {
      name: "Ramesh Garg",
      role: "Founder & Principal Craftsman",
      badge: "30+ Yrs Master Artisan",
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
      bio: "Founding pioneer of custom modular woodworking in Jaipur. With over 30 years of hands-on joinery experience, Ramesh ensures every project uses high-grade HDMR marine plywood and structural timber built to last decades.",
      specs: "Solid Wood Joinery · HDMR BWP Plywood · Heavy Duty Hinges · Jaipur Master Projects"
    },
    "2": {
      name: "Ananya Sharma",
      role: "Head of 3D Modular Architecture",
      badge: "10+ Yrs Spatial Design",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      bio: "Ananya translates client vision into photo-realistic 3D walkthroughs. Specialized in European ergonomic kitchen triangles, soft-close tandem drawers, integrated LED lighting, and Italian handle-less Gola shutters.",
      specs: "3D Photorealistic Renders · Gola Profiles · Anti-Fingerprint Acrylic · Pantry Architecture"
    },
    "3": {
      name: "Vikram Garg",
      role: "Lead Project Director",
      badge: "12+ Yrs Project Director",
      img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
      bio: "Vikram leads manufacturing operations and on-site delivery in Jaipur. He ensures strict quality control from raw panel cutting to zero-gap installation at customer sites.",
      specs: "CNC Precision Cutting · Site Laser Surveying · Quality Supervision · On-Time Delivery"
    },
    "4": {
      name: "Rajesh Kumawat",
      role: "Senior Hardware & Fitting Lead",
      badge: "15+ Yrs Hardware Engineer",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      bio: "Master of hardware precision. Rajesh is certified in German Blum & Hettich mechanism calibration, hydraulic lift-ups, corner carousel fittings, and soft-close wardrobe sliders.",
      specs: "Blum Motion · Hettich Sensys · Corner Pull-Outs · Soft-Close Wardrobe Sliders"
    }
  };

  if (teamOverlay && teamCards.length) {
    teamCards.forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.teamId;
        const info = teamData[id] || teamData["1"];

        const img = document.querySelector('#team-modal-img');
        const name = document.querySelector('#team-modal-name');
        const role = document.querySelector('#team-modal-role');
        const badge = document.querySelector('#team-modal-badge');
        const bio = document.querySelector('#team-modal-bio');
        const specs = document.querySelector('#team-modal-specs');

        if (img) img.src = info.img;
        if (name) name.textContent = info.name;
        if (role) role.textContent = info.role;
        if (badge) badge.textContent = info.badge;
        if (bio) bio.textContent = `"${info.bio}"`;
        if (specs) specs.textContent = info.specs;

        teamOverlay.classList.add('is-active');
        document.body.style.overflow = 'hidden';
      });
    });

    teamClose && teamClose.addEventListener('click', () => {
      teamOverlay.classList.remove('is-active');
      document.body.style.overflow = '';
    });

    teamOverlay.addEventListener('click', (e) => {
      if (e.target === teamOverlay) {
        teamOverlay.classList.remove('is-active');
        document.body.style.overflow = '';
      }
    });
  }

  /* -------------------------------------------------------
     SECTION 7: CTA Consultation Contact Form Handling
  ------------------------------------------------------- */
  const ctaForm = document.getElementById('cta-contact-form');
  const ctaSuccess = document.getElementById('cta-form-success');

  if (ctaForm) {
    const showError = (field, msg) => {
      const group = field.closest('.cta-field-group');
      if (!group) return;
      group.classList.add('has-error');
      let err = group.querySelector('.cta-field-error');
      if (!err) {
        err = document.createElement('span');
        err.className = 'cta-field-error';
        group.appendChild(err);
      }
      err.textContent = msg;
    };

    const clearError = (field) => {
      const group = field.closest('.cta-field-group');
      if (!group) return;
      group.classList.remove('has-error');
      const err = group.querySelector('.cta-field-error');
      if (err) err.remove();
    };

    const validateCtaField = (field) => {
      const val = field.value.trim();
      if (field.required && !val) {
        showError(field, 'This field is required.');
        return false;
      }
      if (field.name === 'phone' && val && !/^[\+]?[\d\s\-]{7,15}$/.test(val)) {
        showError(field, 'Please enter a valid phone number.');
        return false;
      }
      clearError(field);
      return true;
    };

    ctaForm.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('blur', () => validateCtaField(field));
      field.addEventListener('input', () => {
        if (field.closest('.cta-field-group')?.classList.contains('has-error')) {
          validateCtaField(field);
        }
      });
    });

    ctaForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      ctaForm.querySelectorAll('input[required], select[required]').forEach(field => {
        if (!validateCtaField(field)) isValid = false;
      });

      if (!isValid) return;

      const submitBtn = document.getElementById('cta-submit-btn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Scheduling Session...</span>`;
      }

      setTimeout(() => {
        ctaForm.style.opacity = '0';
        ctaForm.style.transform = 'translateY(-10px)';
        ctaForm.style.transition = 'all 0.35s ease';

        setTimeout(() => {
          ctaForm.style.display = 'none';
          if (ctaSuccess) {
            ctaSuccess.style.display = 'flex';
            requestAnimationFrame(() => {
              ctaSuccess.style.opacity = '1';
              ctaSuccess.style.transform = 'translateY(0)';
            });
          }
          if (typeof window.showToast === 'function') {
            window.showToast('Consultation request sent successfully!');
          }
        }, 350);
      }, 1000);
    });
  }

  /* -------------------------------------------------------
     ScrollTrigger refresh after fonts load
  ------------------------------------------------------- */
  document.fonts.ready.then(() => ScrollTrigger.refresh());

})();

