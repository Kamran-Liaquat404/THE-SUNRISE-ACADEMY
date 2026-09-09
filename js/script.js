/**
 * THE SUNRISE ACADEMY KHARAN
 * Official Client-Side JavaScript
 * Focused Exclusively on English Language Education
 * Location: Kharan, Pakistan
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initNavDropdown();
  initFaqAccordion();
  initScrollAnimations();
  initGalleryLightbox();
});

/* --------------------------------------------------------------------------
   1. NAVBAR SCROLL EFFECT
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   2. MOBILE NAVIGATION MENU
   -------------------------------------------------------------------------- */
function initNavDropdown() {
  const toggleBtn = document.getElementById('menu-toggle-btn');
  const navDropdown = document.getElementById('nav-dropdown');

  if (!toggleBtn || !navDropdown) return;

  const toggleDropdown = (e) => {
    e.stopPropagation();
    const isActive = navDropdown.classList.contains('active');
    if (isActive) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  const openDropdown = () => {
    toggleBtn.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    navDropdown.classList.add('active');
  };

  const closeDropdown = () => {
    toggleBtn.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    navDropdown.classList.remove('active');
  };

  toggleBtn.addEventListener('click', toggleDropdown);

  // Close when clicking an anchor link inside dropdown
  const navLinks = navDropdown.querySelectorAll('a');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeDropdown();
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (navDropdown.classList.contains('active') && !navDropdown.contains(e.target) && !toggleBtn.contains(e.target)) {
      closeDropdown();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navDropdown.classList.contains('active')) {
      closeDropdown();
    }
  });
}

/* --------------------------------------------------------------------------
   3. FAQ ACCORDION (EXACTLY 5 QUESTIONS)
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach((item) => {
    const trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isAlreadyActive = item.classList.contains('active');

      // Close other accordion items for clean single-view accordion
      faqItems.forEach((other) => {
        other.classList.remove('active');
        const otherBtn = other.querySelector('.faq-trigger');
        if (otherBtn) {
          otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      if (!isAlreadyActive) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. SIDE SLIDE & GENTLE SCROLL ANIMATIONS (ZERO BLUR)
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    '.animate-fade-up, .animate-slide-left, .animate-slide-right, .animate-img-reveal'
  );

  if (!animatedElements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    animatedElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    animatedElements.forEach((el) => el.classList.add('revealed'));
  }
}

/* --------------------------------------------------------------------------
   5. GALLERY LIGHTBOX
   -------------------------------------------------------------------------- */
function initGalleryLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const modalCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close-btn');

  if (!modal || !modalImg || !modalCaption) return;

  const imageWraps = document.querySelectorAll('.gallery-img-wrap');

  imageWraps.forEach((wrap) => {
    const openLightbox = () => {
      const fullSrc = wrap.getAttribute('data-full');
      const title = wrap.getAttribute('data-title') || '';

      if (fullSrc) {
        modalImg.src = fullSrc;
        modalImg.alt = title;
        modalCaption.textContent = title;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    };

    wrap.addEventListener('click', openLightbox);
    wrap.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox();
      }
    });
  });

  const closeLightbox = () => {
    modal.classList.remove('active');
    modalImg.src = '';
    modalCaption.textContent = '';
    document.body.style.overflow = '';
  };

  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeLightbox();
    }
  });
}
