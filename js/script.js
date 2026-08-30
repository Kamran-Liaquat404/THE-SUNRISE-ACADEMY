/**
 * THE SUNRISE ACADEMY KHARAN
 * Official Client-Side JavaScript
 * Location: Kharan, Balochistan, Pakistan
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initNavDropdown();
  initFaqAccordion();
  initActiveNavLink();
  initImageFallbacks();
  initEnquiryModal();
  initResultsSystem();
  initStudentsFilter();
});

/* --------------------------------------------------------------------------
   1. NAVBAR STICKY EFFECT
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 25) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   2. MOBILE & THREE-DOT DROPDOWN NAVIGATION MENU
   -------------------------------------------------------------------------- */
function initNavDropdown() {
  const toggleBtn = document.getElementById('menu-toggle-btn') || document.getElementById('threedot-btn');
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
      const href = link.getAttribute('href');
      if (href && (href.startsWith('#') || href.includes('#'))) {
        closeDropdown();
      }
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
   3. FAQ ACCORDION
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqButtons = document.querySelectorAll('.faq-button');
  if (!faqButtons.length) return;

  faqButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const faqItem = button.closest('.faq-item');
      if (!faqItem) return;
      
      const faqContent = faqItem.querySelector('.faq-content');
      const isOpen = faqItem.classList.contains('active');

      // Close all other items
      document.querySelectorAll('.faq-item').forEach((item) => {
        if (item !== faqItem) {
          item.classList.remove('active');
          const content = item.querySelector('.faq-content');
          if (content) content.style.maxHeight = null;
          const btn = item.querySelector('.faq-button');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current item
      if (isOpen) {
        faqItem.classList.remove('active');
        if (faqContent) faqContent.style.maxHeight = null;
        button.setAttribute('aria-expanded', 'false');
      } else {
        faqItem.classList.add('active');
        if (faqContent) faqContent.style.maxHeight = faqContent.scrollHeight + 'px';
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. SCROLL TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initScrollTop() {
  const scrollTopBtn = document.querySelector('.scroll-top-btn');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   5. ACTIVE NAVIGATION LINK ON SCROLL
   -------------------------------------------------------------------------- */
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav-links .nav-link, .nav-dropdown-item');

  if (!sections.length || !navLinks.length) return;

  const handleScroll = () => {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 140;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (href && (href === `#${currentSectionId}` || href.endsWith(`#${currentSectionId}`))) {
          link.classList.add('active');
        } else if (href && href.startsWith('#')) {
          link.classList.remove('active');
        }
      });
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
}

/* --------------------------------------------------------------------------
   6. IMAGE FALLBACKS
   -------------------------------------------------------------------------- */
function initImageFallbacks() {
  const images = document.querySelectorAll('img');

  images.forEach((img) => {
    img.addEventListener('error', () => {
      const altText = img.getAttribute('alt') || 'The Sunrise Academy';
      const wrapper = img.parentElement;

      if (wrapper && (wrapper.classList.contains('faculty-image-box') || wrapper.classList.contains('student-image-wrapper') || wrapper.classList.contains('hero-image-frame'))) {
        wrapper.style.display = 'flex';
        wrapper.style.alignItems = 'center';
        wrapper.style.justifyContent = 'center';
        wrapper.style.backgroundColor = '#132A46';
        wrapper.style.color = '#F5A623';
        wrapper.style.fontWeight = '800';
        wrapper.style.padding = '1.5rem';
        
        const initials = altText
          .split(' ')
          .map((n) => n[0])
          .join('')
          .substring(0, 3)
          .toUpperCase();

        wrapper.innerHTML = `<div style="text-align: center;">
          <div style="font-size: 2.25rem; font-family: Outfit, sans-serif; margin-bottom: 0.25rem; color: #F5A623;">${initials || 'TSA'}</div>
          <div style="font-size: 0.75rem; font-weight: 700; opacity: 0.85; text-transform: uppercase; color: #FFFFFF;">The Sunrise Academy</div>
        </div>`;
      }
    });
  });
}

/* --------------------------------------------------------------------------
   7. ADMISSION ENQUIRY MODAL
   -------------------------------------------------------------------------- */
function initEnquiryModal() {
  const modalBackdrop = document.getElementById('enquiry-modal');
  const openButtons = document.querySelectorAll('.open-enquiry-modal-btn');
  const closeBtn = document.getElementById('modal-close-btn');
  const enquiryForm = document.getElementById('enquiry-form');
  const toast = document.getElementById('toast-msg');

  if (!modalBackdrop) return;

  const openModal = (e) => {
    if (e) e.preventDefault();
    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  openButtons.forEach((btn) => btn.addEventListener('click', openModal));
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const studentName = document.getElementById('enquiry-name')?.value || 'Student';
      const grade = document.getElementById('enquiry-grade')?.value || 'General Admission';
      const phone = document.getElementById('enquiry-phone')?.value || '';
      const notes = document.getElementById('enquiry-notes')?.value || '';

      closeModal();
      enquiryForm.reset();

      // Show toast
      if (toast) {
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 4000);
      }

      // Optionally offer instant WhatsApp route to Sunrise Academy 03342266425
      const whatsappMsg = encodeURIComponent(
        `Hello The Sunrise Academy Kharan,\nI am submitting an admission enquiry for:\nStudent Name: ${studentName}\nProgram / Grade: ${grade}\nContact: ${phone}\nDetails: ${notes}`
      );
      
      const sendViaWa = confirm('Thank you for submitting! Would you also like to open WhatsApp directly with your enquiry to 0334-2266425?');
      if (sendViaWa) {
        window.open(`https://wa.me/923342266425?text=${whatsappMsg}`, '_blank');
      }
    });
  }
}

/* --------------------------------------------------------------------------
   8. INTERACTIVE RESULTS SYSTEM (results.html)
   -------------------------------------------------------------------------- */
function initResultsSystem() {
  const searchInput = document.getElementById('result-search-input');
  const classFilter = document.getElementById('result-class-filter');
  const genderFilter = document.getElementById('result-gender-filter');
  const tableRows = document.querySelectorAll('.results-table tbody tr');
  const resultsCountEl = document.getElementById('results-count-display');

  if (!tableRows.length) return;

  const filterRows = () => {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const selectedClass = classFilter ? classFilter.value : 'all';
    const selectedGender = genderFilter ? genderFilter.value : 'all';

    let visibleCount = 0;

    tableRows.forEach((row) => {
      const studentName = row.querySelector('.student-cell-name')?.textContent.toLowerCase() || '';
      const rollNo = row.getAttribute('data-roll') || '';
      const rowClass = row.getAttribute('data-class') || '';
      const rowGender = row.getAttribute('data-gender') || '';

      const matchesQuery = !query || studentName.includes(query) || rollNo.includes(query);
      const matchesClass = selectedClass === 'all' || rowClass === selectedClass;
      const matchesGender = selectedGender === 'all' || rowGender === selectedGender;

      if (matchesQuery && matchesClass && matchesGender) {
        row.style.display = '';
        visibleCount++;
      } else {
        row.style.display = 'none';
      }
    });

    if (resultsCountEl) {
      resultsCountEl.textContent = `Showing ${visibleCount} record${visibleCount === 1 ? '' : 's'}`;
    }
  };

  if (searchInput) searchInput.addEventListener('input', filterRows);
  if (classFilter) classFilter.addEventListener('change', filterRows);
  if (genderFilter) genderFilter.addEventListener('change', filterRows);
}

/* --------------------------------------------------------------------------
   9. STUDENTS DIRECTORY FILTER (students.html)
   -------------------------------------------------------------------------- */
function initStudentsFilter() {
  const filterButtons = document.querySelectorAll('.student-filter-bar .filter-btn');
  const studentCards = document.querySelectorAll('.students-grid .student-card');

  if (!filterButtons.length || !studentCards.length) return;

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter') || 'all';

      studentCards.forEach((card) => {
        const cardCategory = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || cardCategory.includes(filterValue)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}
