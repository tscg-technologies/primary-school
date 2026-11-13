/**
 * PRIMARY SCHOOL WEBSITE — INTERACTIVE SCRIPT
 * Vanilla JavaScript (ES6+)
 * 
 * Includes:
 * 1. Sticky Navigation & Scroll State
 * 2. Responsive Mobile Drawer Menu
 * 3. Active Nav Link Highlighting (ScrollSpy)
 * 4. Smooth Anchor Scrolling with Header Offset
 * 5. About Section Philosophy/Mission/Vision Tabs
 * 6. Animated Stat Counters
 * 7. Academic Programs Modal with Curriculum Details
 * 8. Interactive Gallery Category Filtering
 * 9. Full-Featured Lightbox with Keyboard Nav
 * 10. Testimonials Slider (Arrows, Dots, Auto-Play & Pause)
 * 11. Admission Enquiry Form Validation (Indian Mobile & Email)
 * 12. WhatsApp & Social Demo Dialogs
 * 13. Back to Top Floating Button
 * 14. Scroll Reveal Animations via IntersectionObserver
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. Sticky Navigation & Header Shrink
     ========================================================================== */
  const siteHeader = document.getElementById('site-header');
  const backToTopBtn = document.getElementById('back-to-top');

  const handleScroll = () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    
    // Header shadow/shrink
    if (scrollY > 50) {
      siteHeader.classList.add('is-scrolled');
    } else {
      siteHeader.classList.remove('is-scrolled');
    }

    // Back to top visibility
    if (scrollY > 400) {
      backToTopBtn.classList.add('is-visible');
    } else {
      backToTopBtn.classList.remove('is-visible');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ==========================================================================
     2. Responsive Mobile Drawer Menu
     ========================================================================== */
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const drawerClose = document.getElementById('drawer-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav__link, .drawer-admission-btn');

  const openMobileMenu = () => {
    mobileDrawer.classList.add('is-open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    menuToggle.classList.add('is-active');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileMenu = () => {
    mobileDrawer.classList.remove('is-open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    menuToggle.classList.remove('is-active');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('is-open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (drawerClose) drawerClose.addEventListener('click', closeMobileMenu);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeMobileMenu);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  /* ==========================================================================
     3. Active Nav Link Highlighting (ScrollSpy)
     ========================================================================== */
  const sections = document.querySelectorAll('section[id], header[id="home"]');
  const desktopNavLinks = document.querySelectorAll('.nav__link');

  const updateActiveNavLink = () => {
    const scrollPosition = (window.pageYOffset || document.documentElement.scrollTop) + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Desktop nav update
        desktopNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });

        // Mobile nav update
        mobileNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  /* ==========================================================================
     4. Smooth Anchor Scrolling
     ========================================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Back to top button action
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ==========================================================================
     5. About Section Tabs (Philosophy / Mission / Vision)
     ========================================================================== */
  const tabButtons = document.querySelectorAll('.about-tab-btn');
  const tabPanels = document.querySelectorAll('.about-tab-panel');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Deactivate all
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      tabPanels.forEach(panel => {
        panel.classList.remove('active');
        panel.hidden = true;
      });

      // Activate clicked
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');
      const targetPanelId = button.getAttribute('aria-controls');
      const targetPanel = document.getElementById(targetPanelId);
      if (targetPanel) {
        targetPanel.classList.add('active');
        targetPanel.hidden = false;
      }
    });
  });

  /* ==========================================================================
     6. Animated Counter for Demonstration Statistics
     ========================================================================== */
  const statNumbers = document.querySelectorAll('.stat-card__number');
  let statsCounted = false;

  const animateStats = () => {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      const duration = 1800; // ms
      const stepTime = 30;
      const totalSteps = duration / stepTime;
      const increment = target / totalSteps;
      let current = 0;

      const counterInterval = setInterval(() => {
        current += increment;
        if (current >= target) {
          stat.textContent = `${target}+`;
          clearInterval(counterInterval);
        } else {
          stat.textContent = `${Math.floor(current)}+`;
        }
      }, stepTime);
    });
  };

  const statsSection = document.querySelector('.stats-strip');
  if (statsSection && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsCounted) {
          animateStats();
          statsCounted = true;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    statsObserver.observe(statsSection);
  }

  /* ==========================================================================
     7. Academic Programs Modal (Curriculum Explorer)
     ========================================================================== */
  const curriculumData = {
    'pre-primary': {
      title: 'Pre-Primary Program (Nursery & Playgroup)',
      subtitle: 'Ages 2.5 – 3.5 Years • Foundational Wonder & Sensory Growth',
      badge: 'Early Years Foundation',
      body: `
        <h4 style="color: var(--color-primary); margin-bottom: 0.5rem;">Daily Schedule & Timings</h4>
        <p><strong>Timing:</strong> 9:00 AM – 12:30 PM (Monday through Friday)</p>
        <p><strong>Educator Ratio:</strong> 1 Teacher + 1 Caregiver for every 8 children</p>
        
        <h4 style="color: var(--color-primary); margin-top: 1.25rem; margin-bottom: 0.5rem;">Core Learning Pillars</h4>
        <ul style="list-style: disc; margin-left: 1.25rem; margin-bottom: 1rem;">
          <li><strong>Sensory & Motor Mastery:</strong> Clay molding, water exploration, bean sorting, and gentle balancing activities.</li>
          <li><strong>Language Immersion:</strong> Rhythm circles, bilingual nursery rhymes, conversational puppets, and large visual flashcards.</li>
          <li><strong>Emotional Security:</strong> Warm greeting routines, turn-taking play, and self-help habits (snack time hygiene, shoe rack organization).</li>
        </ul>
        <div style="background-color: var(--color-bg-light); padding: 0.85rem; border-radius: 8px; font-size: 0.85rem;">
          💡 <em>Child readiness is evaluated via gentle milestone observations, with zero stressful exams or formal marks.</em>
        </div>
      `,
      formGradeValue: 'Pre-Primary (Playgroup / Nursery)'
    },
    'kindergarten': {
      title: 'Kindergarten Program (LKG & UKG)',
      subtitle: 'Ages 3.5 – 5.5 Years • Phonics, Numbers & Creative Logic',
      badge: 'Kindergarten Stage',
      body: `
        <h4 style="color: var(--color-primary); margin-bottom: 0.5rem;">Daily Schedule & Timings</h4>
        <p><strong>Timing:</strong> 8:45 AM – 1:30 PM (Monday through Friday)</p>
        <p><strong>Educator Ratio:</strong> 1 Certified Educator : 12 Learners</p>
        
        <h4 style="color: var(--color-primary); margin-top: 1.25rem; margin-bottom: 0.5rem;">Core Learning Pillars</h4>
        <ul style="list-style: disc; margin-left: 1.25rem; margin-bottom: 1rem;">
          <li><strong>Synthetic Phonics:</strong> Jolly Phonics methodology, letter sound blending, sight words, and illustrated storybooks.</li>
          <li><strong>Concrete Mathematics:</strong> Counting beads, spatial geometry blocks, pattern sequencing, and basic addition with counters.</li>
          <li><strong>Discovery & Nature:</strong> Butterfly gardens, germination cups, weather wheels, and environmental kindness.</li>
        </ul>
        <div style="background-color: var(--color-bg-light); padding: 0.85rem; border-radius: 8px; font-size: 0.85rem;">
          💡 <em>Kindergarteners take part in weekly drama workshops and bi-monthly show-and-tell assemblies.</em>
        </div>
      `,
      formGradeValue: 'Kindergarten (UKG)'
    },
    'primary': {
      title: 'Primary Education (Classes 1 to 5)',
      subtitle: 'Ages 6 – 11 Years • Comprehensive Foundational Excellence',
      badge: 'Primary School Stage',
      body: `
        <h4 style="color: var(--color-primary); margin-bottom: 0.5rem;">Daily Schedule & Timings</h4>
        <p><strong>Timing:</strong> 8:30 AM – 3:15 PM (Monday through Saturday, 2nd & 4th Sat Off)</p>
        <p><strong>Classroom Structure:</strong> Capped at 25 students with 1:15 mentorship</p>
        
        <h4 style="color: var(--color-primary); margin-top: 1.25rem; margin-bottom: 0.5rem;">Core Academic Subjects</h4>
        <ul style="list-style: disc; margin-left: 1.25rem; margin-bottom: 1rem;">
          <li><strong>English & Literacy:</strong> Reading comprehension, creative narrative writing, grammar fundamentals, and public elocution.</li>
          <li><strong>Mathematics:</strong> Conceptual numeracy, mental arithmetic, geometry visualization, and word problems.</li>
          <li><strong>General Science & Social Studies:</strong> Ecosystems, Indian culture & heritage, maps, matter, and experimental inquiry.</li>
          <li><strong>Second Language:</strong> Hindi / Regional Language proficiency with phonetics and expressive prose.</li>
        </ul>
        <div style="background-color: var(--color-bg-light); padding: 0.85rem; border-radius: 8px; font-size: 0.85rem;">
          💡 <em>Includes comprehensive assessments through thematic projects, experiential quizzes, and continuous evaluation.</em>
        </div>
      `,
      formGradeValue: 'Primary Grade 1'
    },
    'activity-based': {
      title: 'Activity-Based & STEAM Learning',
      subtitle: 'All Grade Levels • Hands-On Robotics, Coding & Discovery',
      badge: 'Enrichment Curriculum',
      body: `
        <h4 style="color: var(--color-primary); margin-bottom: 0.5rem;">Integrated Weekly Enrichment</h4>
        <p>Integrated seamlessly into every learner's weekly timetable with 6 hours dedicated to hands-on projects.</p>
        
        <h4 style="color: var(--color-primary); margin-top: 1.25rem; margin-bottom: 0.5rem;">Curriculum Modules</h4>
        <ul style="list-style: disc; margin-left: 1.25rem; margin-bottom: 1rem;">
          <li><strong>Junior STEAM Lab:</strong> Simple gear mechanisms, circuit pens, magnetism puzzles, and miniature solar models.</li>
          <li><strong>Creative Coding (Grades 2–5):</strong> Scratch visual programming, algorithmic logic puzzles, and child-safe digital creativity.</li>
          <li><strong>Eco-Warriors Club:</strong> On-campus organic vegetable patch, waste segregation drills, and bird-feeder craft.</li>
          <li><strong>Design Thinking & Maker Space:</strong> 3D paper crafts, cardboard architecture, and inventive problem-solving challenges.</li>
        </ul>
      `,
      formGradeValue: 'Primary Grade 3'
    }
  };

  const curriculumModal = document.getElementById('curriculum-modal');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalClose = document.getElementById('modal-close');
  const modalBtnClose = document.getElementById('modal-btn-close');
  const modalBtnEnquire = document.getElementById('modal-btn-enquire');
  const modalBadge = document.getElementById('modal-program-badge');
  const modalTitle = document.getElementById('modal-program-title');
  const modalSubtitle = document.getElementById('modal-program-subtitle');
  const modalBody = document.getElementById('modal-program-body');

  let activeProgramGradeValue = '';

  const openCurriculumModal = (programKey) => {
    const data = curriculumData[programKey];
    if (!data) return;

    modalBadge.textContent = data.badge;
    modalTitle.textContent = data.title;
    modalSubtitle.textContent = data.subtitle;
    modalBody.innerHTML = data.body;
    activeProgramGradeValue = data.formGradeValue;

    curriculumModal.hidden = false;
    document.body.style.overflow = 'hidden';
  };

  const closeCurriculumModal = () => {
    curriculumModal.hidden = true;
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.program-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const programKey = btn.getAttribute('data-program');
      openCurriculumModal(programKey);
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeCurriculumModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeCurriculumModal);
  if (modalBtnClose) modalBtnClose.addEventListener('click', closeCurriculumModal);

  if (modalBtnEnquire) {
    modalBtnEnquire.addEventListener('click', () => {
      closeCurriculumModal();
      // Pre-select program in the admission form dropdown
      const applyingSelect = document.getElementById('applying-for');
      if (applyingSelect && activeProgramGradeValue) {
        for (let i = 0; i < applyingSelect.options.length; i++) {
          if (applyingSelect.options[i].value.includes(activeProgramGradeValue) || activeProgramGradeValue.includes(applyingSelect.options[i].value)) {
            applyingSelect.selectedIndex = i;
            break;
          }
        }
      }
    });
  }

  /* ==========================================================================
     8. Interactive Gallery Category Filtering
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active filter button
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');

        if (filterValue === 'all' || itemCategory === filterValue) {
          item.classList.remove('is-hidden');
          item.style.display = 'block';
        } else {
          item.classList.add('is-hidden');
          item.style.display = 'none';
        }
      });
    });
  });

  /* ==========================================================================
     9. Interactive Gallery Lightbox with Keyboard Nav
     ========================================================================== */
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxOverlay = document.getElementById('lightbox-overlay');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTag = document.getElementById('lightbox-tag');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCounter = document.getElementById('lightbox-counter');

  let visibleGalleryItems = [];
  let currentLightboxIndex = 0;

  const getCurrentlyVisibleItems = () => {
    return Array.from(document.querySelectorAll('.gallery-item:not(.is-hidden)'));
  };

  const updateLightboxContent = (index) => {
    if (!visibleGalleryItems.length) return;
    
    // Bounds wrap-around
    if (index < 0) index = visibleGalleryItems.length - 1;
    if (index >= visibleGalleryItems.length) index = 0;
    currentLightboxIndex = index;

    const currentItem = visibleGalleryItems[currentLightboxIndex];
    const imgEl = currentItem.querySelector('img');
    const titleEl = currentItem.querySelector('.gallery-item__title');
    const categoryEl = currentItem.querySelector('.gallery-item__category');

    lightboxImg.src = imgEl.src;
    lightboxImg.alt = imgEl.alt;
    lightboxTitle.textContent = titleEl ? titleEl.textContent : 'Campus Gallery';
    lightboxTag.textContent = categoryEl ? categoryEl.textContent : 'Gallery';
    lightboxCounter.textContent = `${currentLightboxIndex + 1} of ${visibleGalleryItems.length}`;
  };

  const openLightbox = (clickedItem) => {
    visibleGalleryItems = getCurrentlyVisibleItems();
    currentLightboxIndex = visibleGalleryItems.indexOf(clickedItem);
    if (currentLightboxIndex === -1) currentLightboxIndex = 0;

    updateLightboxContent(currentLightboxIndex);
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.hidden = true;
    document.body.style.overflow = '';
  };

  // Attach click listeners to gallery items
  galleryItems.forEach(item => {
    const thumb = item.querySelector('.gallery-item__thumb');
    if (thumb) {
      thumb.addEventListener('click', () => openLightbox(item));
    }
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      updateLightboxContent(currentLightboxIndex - 1);
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      updateLightboxContent(currentLightboxIndex + 1);
    });
  }

  // Keyboard Navigation: Escape, ArrowLeft, ArrowRight
  document.addEventListener('keydown', (e) => {
    if (!lightbox.hidden) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') updateLightboxContent(currentLightboxIndex - 1);
      if (e.key === 'ArrowRight') updateLightboxContent(currentLightboxIndex + 1);
    }
    if (!curriculumModal.hidden && e.key === 'Escape') {
      closeCurriculumModal();
    }
    const successModal = document.getElementById('success-modal');
    if (successModal && !successModal.hidden && e.key === 'Escape') {
      successModal.hidden = true;
      document.body.style.overflow = '';
    }
    const waModal = document.getElementById('whatsapp-modal');
    if (waModal && !waModal.hidden && e.key === 'Escape') {
      waModal.hidden = true;
      document.body.style.overflow = '';
    }
  });

  /* ==========================================================================
     10. Testimonials Slider Carousel
     ========================================================================== */
  const testimonialTrack = document.getElementById('testimonial-track');
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const testPrevBtn = document.getElementById('test-prev');
  const testNextBtn = document.getElementById('test-next');
  const testDotsContainer = document.getElementById('test-dots');

  let currentSlide = 0;
  const totalSlides = testimonialCards.length;
  let autoplayTimer = null;

  // Generate dots dynamically
  if (testDotsContainer) {
    testDotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('button');
      dot.classList.add('test-dot');
      if (i === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `Go to testimonial slide ${i + 1}`);
      dot.setAttribute('role', 'tab');
      dot.addEventListener('click', () => goToSlide(i));
      testDotsContainer.appendChild(dot);
    }
  }

  const updateDots = (index) => {
    const dots = document.querySelectorAll('.test-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === index);
      dot.setAttribute('aria-selected', idx === index ? 'true' : 'false');
    });
  };

  const goToSlide = (index) => {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentSlide = index;

    if (testimonialTrack) {
      testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    updateDots(currentSlide);
  };

  if (testPrevBtn) {
    testPrevBtn.addEventListener('click', () => {
      goToSlide(currentSlide - 1);
      resetAutoplay();
    });
  }

  if (testNextBtn) {
    testNextBtn.addEventListener('click', () => {
      goToSlide(currentSlide + 1);
      resetAutoplay();
    });
  }

  // Autoplay functionality
  const startAutoplay = () => {
    if (!autoplayTimer) {
      autoplayTimer = setInterval(() => {
        goToSlide(currentSlide + 1);
      }, 5500);
    }
  };

  const stopAutoplay = () => {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  };

  const resetAutoplay = () => {
    stopAutoplay();
    startAutoplay();
  };

  const sliderWrapper = document.getElementById('testimonial-slider');
  if (sliderWrapper) {
    sliderWrapper.addEventListener('mouseenter', stopAutoplay);
    sliderWrapper.addEventListener('mouseleave', startAutoplay);
    sliderWrapper.addEventListener('focusin', stopAutoplay);
    sliderWrapper.addEventListener('focusout', startAutoplay);
  }

  startAutoplay();

  /* ==========================================================================
     11. Admission Enquiry Form Validation
     ========================================================================== */
  const admissionForm = document.getElementById('admission-form');
  const parentNameInput = document.getElementById('parent-name');
  const childNameInput = document.getElementById('child-name');
  const parentEmailInput = document.getElementById('parent-email');
  const phoneNumberInput = document.getElementById('phone-number');
  const applyingForSelect = document.getElementById('applying-for');
  const submitBtn = document.getElementById('btn-submit-admission');

  // Error placeholders
  const errParentName = document.getElementById('err-parentName');
  const errChildName = document.getElementById('err-childName');
  const errParentEmail = document.getElementById('err-parentEmail');
  const errPhoneNumber = document.getElementById('err-phoneNumber');
  const errApplyingFor = document.getElementById('err-applyingFor');

  // Validation rules
  const validateParentName = () => {
    const val = parentNameInput.value.trim();
    if (!val) {
      setError(parentNameInput, errParentName, 'Please enter parent / guardian full name.');
      return false;
    }
    if (val.length < 3) {
      setError(parentNameInput, errParentName, 'Name must be at least 3 characters.');
      return false;
    }
    clearError(parentNameInput, errParentName);
    return true;
  };

  const validateChildName = () => {
    const val = childNameInput.value.trim();
    if (!val) {
      setError(childNameInput, errChildName, 'Please enter child full name.');
      return false;
    }
    if (val.length < 2) {
      setError(childNameInput, errChildName, 'Child name must be at least 2 characters.');
      return false;
    }
    clearError(childNameInput, errChildName);
    return true;
  };

  const validateEmail = () => {
    const val = parentEmailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!val) {
      setError(parentEmailInput, errParentEmail, 'Please provide an email address for communication.');
      return false;
    }
    if (!emailRegex.test(val)) {
      setError(parentEmailInput, errParentEmail, 'Please enter a valid email format (e.g., name@example.com).');
      return false;
    }
    clearError(parentEmailInput, errParentEmail);
    return true;
  };

  const validatePhone = () => {
    const val = phoneNumberInput.value.trim();
    // Indian 10-digit mobile number starting with 6, 7, 8, or 9
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!val) {
      setError(phoneNumberInput, errPhoneNumber, 'Please enter a 10-digit mobile number.');
      return false;
    }
    if (!phoneRegex.test(val)) {
      setError(phoneNumberInput, errPhoneNumber, 'Please enter a valid 10-digit Indian mobile number (starts with 6-9).');
      return false;
    }
    clearError(phoneNumberInput, errPhoneNumber);
    return true;
  };

  const validateApplyingFor = () => {
    const val = applyingForSelect.value;
    if (!val) {
      setError(applyingForSelect, errApplyingFor, 'Please select the grade or learning level.');
      return false;
    }
    clearError(applyingForSelect, errApplyingFor);
    return true;
  };

  const setError = (inputEl, errorEl, message) => {
    inputEl.classList.add('is-invalid');
    inputEl.classList.remove('is-valid');
    if (errorEl) errorEl.textContent = message;
  };

  const clearError = (inputEl, errorEl) => {
    inputEl.classList.remove('is-invalid');
    inputEl.classList.add('is-valid');
    if (errorEl) errorEl.textContent = '';
  };

  // Real-time input listeners
  if (parentNameInput) parentNameInput.addEventListener('input', validateParentName);
  if (childNameInput) childNameInput.addEventListener('input', validateChildName);
  if (parentEmailInput) parentEmailInput.addEventListener('input', validateEmail);
  if (phoneNumberInput) {
    // Only allow numbers to be typed
    phoneNumberInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '');
      validatePhone();
    });
  }
  if (applyingForSelect) applyingForSelect.addEventListener('change', validateApplyingFor);

  // Form submit handling
  if (admissionForm) {
    admissionForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateParentName();
      const isChildValid = validateChildName();
      const isEmailValid = validateEmail();
      const isPhoneValid = validatePhone();
      const isGradeValid = validateApplyingFor();

      if (isNameValid && isChildValid && isEmailValid && isPhoneValid && isGradeValid) {
        // Show realistic loading animation
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        const btnIcon = submitBtn.querySelector('.btn-icon');

        submitBtn.disabled = true;
        btnText.hidden = true;
        btnIcon.hidden = true;
        btnLoader.hidden = false;

        setTimeout(() => {
          // Reset button
          submitBtn.disabled = false;
          btnText.hidden = false;
          btnIcon.hidden = false;
          btnLoader.hidden = true;

          // Open Success Modal with submitted details
          const successModal = document.getElementById('success-modal');
          const successParent = document.getElementById('success-parent-name');
          const successChild = document.getElementById('success-child-name');

          if (successParent) successParent.textContent = parentNameInput.value.trim();
          if (successChild) successChild.textContent = childNameInput.value.trim();

          if (successModal) {
            successModal.hidden = false;
            document.body.style.overflow = 'hidden';
          }

          // Reset form fields
          admissionForm.reset();
          document.querySelectorAll('.form-control').forEach(el => {
            el.classList.remove('is-valid', 'is-invalid');
          });
        }, 900);
      } else {
        // Focus first invalid element
        const firstInvalid = admissionForm.querySelector('.is-invalid');
        if (firstInvalid) firstInvalid.focus();
      }
    });
  }

  // Success Modal close listeners
  const btnCloseSuccess = document.getElementById('btn-close-success');
  const successOverlay = document.getElementById('success-overlay');
  const successModal = document.getElementById('success-modal');

  const closeSuccessModal = () => {
    if (successModal) {
      successModal.hidden = true;
      document.body.style.overflow = '';
    }
  };

  if (btnCloseSuccess) btnCloseSuccess.addEventListener('click', closeSuccessModal);
  if (successOverlay) successOverlay.addEventListener('click', closeSuccessModal);

  /* ==========================================================================
     12. WhatsApp & Social Demonstration Dialogs
     ========================================================================== */
  const btnWhatsappDemo = document.getElementById('btn-whatsapp-demo');
  const whatsappModal = document.getElementById('whatsapp-modal');
  const waOverlay = document.getElementById('wa-overlay');
  const btnCloseWa = document.getElementById('btn-close-wa');

  const openWaModal = () => {
    if (whatsappModal) {
      whatsappModal.hidden = false;
      document.body.style.overflow = 'hidden';
    }
  };

  const closeWaModal = () => {
    if (whatsappModal) {
      whatsappModal.hidden = true;
      document.body.style.overflow = '';
    }
  };

  if (btnWhatsappDemo) btnWhatsappDemo.addEventListener('click', openWaModal);
  if (btnCloseWa) btnCloseWa.addEventListener('click', closeWaModal);
  if (waOverlay) waOverlay.addEventListener('click', closeWaModal);

  // Social Links Demo Notification
  document.querySelectorAll('.demo-tooltip-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('This is a demonstration school profile link. Fictional demo environment.');
    });
  });

  /* ==========================================================================
     13. Scroll Reveal Animations via Intersection Observer
     ========================================================================== */
  const revealElements = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-delay') || 0;
          setTimeout(() => {
            entry.target.classList.add('is-revealed');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

});

