/**
 * Portfolio Site - Main JavaScript
 * 슬라이드 네비게이션, 터치 스와이프, 키보드 지원
 */

(function () {
  'use strict';

  // ========================================
  // Configuration
  // ========================================
  const CONFIG = {
    swipeThreshold: 50,
    transitionDuration: 800,
    slides: ['portfolio', 'main', 'blog'],
    initialSlide: 1 // main
  };

  // ========================================
  // State
  // ========================================
  let currentSlide = CONFIG.initialSlide;
  let isAnimating = false;
  let touchStartX = 0;
  let touchEndX = 0;

  // ========================================
  // DOM Elements
  // ========================================
  const sliderContainer = document.getElementById('sliderContainer');
  const navLeft = document.getElementById('navLeft');
  const navRight = document.getElementById('navRight');
  const indicators = document.querySelectorAll('.indicator');

  // ========================================
  // Slide Navigation
  // ========================================
  function goToSlide(index) {
    if (isAnimating || index === currentSlide) return;
    if (index < 0 || index >= CONFIG.slides.length) return;

    isAnimating = true;
    currentSlide = index;

    // Update slider position
    sliderContainer.classList.remove('slide-left', 'slide-center', 'slide-right');

    switch (index) {
      case 0:
        sliderContainer.classList.add('slide-left');
        break;
      case 1:
        sliderContainer.classList.add('slide-center');
        break;
      case 2:
        sliderContainer.classList.add('slide-right');
        break;
    }

    // Update indicators
    updateIndicators();

    // Reset animation lock
    setTimeout(() => {
      isAnimating = false;
    }, CONFIG.transitionDuration);
  }

  function goToNextSlide() {
    goToSlide(currentSlide + 1);
  }

  function goToPrevSlide() {
    goToSlide(currentSlide - 1);
  }

  // ========================================
  // Indicators
  // ========================================
  function updateIndicators() {
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentSlide);
    });
  }

  function initIndicators() {
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => goToSlide(index));
    });
  }

  // ========================================
  // Navigation Areas (Hover Zones)
  // ========================================
  function initNavAreas() {
    if (navLeft) {
      navLeft.addEventListener('click', goToPrevSlide);
    }

    if (navRight) {
      navRight.addEventListener('click', goToNextSlide);
    }
  }

  // ========================================
  // Touch / Swipe Support
  // ========================================
  function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
  }

  function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }

  function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) < CONFIG.swipeThreshold) return;

    if (swipeDistance > 0) {
      // Swiped right → go to previous slide (left)
      goToPrevSlide();
    } else {
      // Swiped left → go to next slide (right)
      goToNextSlide();
    }
  }

  function initTouchEvents() {
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
  }

  // ========================================
  // Keyboard Navigation
  // ========================================
  function handleKeydown(e) {
    switch (e.key) {
      case 'ArrowLeft':
        goToPrevSlide();
        break;
      case 'ArrowRight':
        goToNextSlide();
        break;
      case 'Home':
        goToSlide(1); // Go to main
        break;
    }
  }

  function initKeyboardNav() {
    document.addEventListener('keydown', handleKeydown);
  }

  // ========================================
  // Mouse Wheel Navigation (optional)
  // ========================================
  let wheelTimeout = null;

  function handleWheel(e) {
    // Debounce wheel events
    if (wheelTimeout) return;

    wheelTimeout = setTimeout(() => {
      wheelTimeout = null;
    }, 500);

    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      // Horizontal scroll
      if (e.deltaX > 0) {
        goToNextSlide();
      } else {
        goToPrevSlide();
      }
    }
  }

  function initWheelNav() {
    document.addEventListener('wheel', handleWheel, { passive: true });
  }

  // ========================================
  // Name Hover Effect Enhancement - Brush Stroke
  // ========================================
  function initNameEffect() {
    const mainName = document.getElementById('mainName');
    if (!mainName) return;

    const nameText = mainName.querySelector('.name-text');
    if (!nameText) return;

    // Add character-by-character for brush stroke effect
    const text = nameText.textContent;
    nameText.innerHTML = '';

    [...text].forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.transition = 'color 0.2s ease, transform 0.2s ease';
      span.style.color = '#000000';
      span.dataset.timeout = '';
      nameText.appendChild(span);
    });

    // Brush stroke effect - color changes as mouse passes over each character
    nameText.addEventListener('mousemove', (e) => {
      const chars = nameText.querySelectorAll('span');
      const rect = nameText.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;

      chars.forEach((char, index) => {
        const charRect = char.getBoundingClientRect();
        const charCenterX = charRect.left + charRect.width / 2 - rect.left;
        const distance = Math.abs(mouseX - charCenterX);

        // If mouse is close to this character
        if (distance < 30) {
          // Clear existing timeout
          if (char.dataset.timeout) {
            clearTimeout(parseInt(char.dataset.timeout));
          }

          // Apply brush stroke color
          char.style.color = '#B0A6DF';
          char.style.transform = 'translateY(-2px)';

          // Set timeout to revert after 2 seconds
          const timeoutId = setTimeout(() => {
            char.style.color = '#000000';
            char.style.transform = 'translateY(0)';
            char.dataset.timeout = '';
          }, 2000);

          char.dataset.timeout = timeoutId.toString();
        }
      });
    });

    // Reset all on mouse leave (after 2 seconds)
    nameText.addEventListener('mouseleave', () => {
      const chars = nameText.querySelectorAll('span');
      chars.forEach((char) => {
        if (char.dataset.timeout) {
          clearTimeout(parseInt(char.dataset.timeout));
        }

        const timeoutId = setTimeout(() => {
          char.style.color = '#000000';
          char.style.transform = 'translateY(0)';
          char.dataset.timeout = '';
        }, 2000);

        char.dataset.timeout = timeoutId.toString();
      });
    });
  }

  // ========================================
  // Parallax Background Effect
  // ========================================
  function initParallax() {
    const mainSlide = document.getElementById('mainSlide');
    if (!mainSlide) return;

    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;

      mainSlide.style.backgroundPosition = `${50 + x * 0.1}% ${50 + y * 0.1}%`;
    });
  }

  // ========================================
  // Modal Functions
  // ========================================
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Initialize magnetic effect when skills modal opens
      if (modalId === 'skillsModal') {
        setTimeout(() => initMagneticEffect(), 100);
      }
    }
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Open blog modal with post content
  function openBlogModal(title, date, content) {
    const titleEl = document.getElementById('blogModalTitle');
    const dateEl = document.getElementById('blogModalDate');
    const contentEl = document.getElementById('blogModalContent');

    if (titleEl) titleEl.textContent = title;
    if (dateEl) dateEl.textContent = date;
    if (contentEl) {
      // Decode HTML entities and set content
      const decodedContent = content
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
      contentEl.innerHTML = decodedContent;
    }

    openModal('blogModal');
  }

  // Initialize blog card click handlers
  function initBlogCards() {
    const blogCards = document.querySelectorAll('.blog-post-card');
    blogCards.forEach(card => {
      card.addEventListener('click', () => {
        const title = card.dataset.title || '';
        const date = card.dataset.date || '';
        const content = card.dataset.content || '';
        openBlogModal(title, date, content);
      });
    });
  }

  // Close modal on Escape key
  function initModalKeyboard() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        });
      }
    });
  }

  // ========================================
  // Magnetic Effect for Skills
  // ========================================
  function initMagneticEffect() {
    const skillItems = document.querySelectorAll('.skill-item');

    skillItems.forEach(item => {
      const rect = item.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Store original position
      item.dataset.originalX = '0';
      item.dataset.originalY = '0';

      item.addEventListener('mousemove', (e) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenterX = itemRect.left + itemRect.width / 2;
        const itemCenterY = itemRect.top + itemRect.height / 2;

        // Calculate offset from center
        const deltaX = e.clientX - itemCenterX;
        const deltaY = e.clientY - itemCenterY;

        // Apply magnetic pull (move towards mouse)
        const magnetStrength = 0.3;
        const translateX = deltaX * magnetStrength;
        const translateY = deltaY * magnetStrength;

        item.style.transform = `translate(${translateX}px, ${translateY}px)`;
      });

      item.addEventListener('mouseleave', () => {
        // Spring back to original position
        item.style.transform = 'translate(0, 0)';
      });
    });
  }

  // Global magnetic effect when mouse moves near skills container
  function initSkillsContainerMagnetic() {
    const skillsModal = document.getElementById('skillsModal');
    if (!skillsModal) return;

    const container = skillsModal.querySelector('.skills-container');
    if (!container) return;

    container.addEventListener('mousemove', (e) => {
      const skillItems = container.querySelectorAll('.skill-item');
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      skillItems.forEach(item => {
        const itemRect = item.getBoundingClientRect();
        const itemCenterX = itemRect.left + itemRect.width / 2;
        const itemCenterY = itemRect.top + itemRect.height / 2;

        // Calculate distance from mouse to item center
        const distance = Math.sqrt(
          Math.pow(mouseX - itemCenterX, 2) +
          Math.pow(mouseY - itemCenterY, 2)
        );

        // Magnetic effect range
        const magnetRange = 200;

        if (distance < magnetRange && distance > 0) {
          // Calculate pull strength based on distance
          const strength = (1 - distance / magnetRange) * 20;

          // Direction towards mouse
          const dirX = (mouseX - itemCenterX) / distance;
          const dirY = (mouseY - itemCenterY) / distance;

          const translateX = dirX * strength;
          const translateY = dirY * strength;

          // 3D rotation based on mouse position relative to item
          const rotateX = (mouseY - itemCenterY) / 10;
          const rotateY = -(mouseX - itemCenterX) / 10;

          item.style.transform = `translate(${translateX}px, ${translateY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        } else {
          // Reset with smooth transition when outside range
          item.style.transform = 'translate(0, 0) rotateX(0) rotateY(0) scale(1)';
        }
      });
    });

    container.addEventListener('mouseleave', () => {
      const skillItems = container.querySelectorAll('.skill-item');
      skillItems.forEach(item => {
        // Spring back with slight delay for each item
        item.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        item.style.transform = 'translate(0, 0) rotateX(0) rotateY(0) scale(1)';

        // Reset transition after animation
        setTimeout(() => {
          item.style.transition = 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow var(--transition-fast) ease, border-color var(--transition-fast) ease';
        }, 500);
      });
    });
  }

  // ========================================
  // Initialize
  // ========================================
  function init() {
    // Set initial state
    sliderContainer.classList.add('slide-center');

    // Initialize all features
    initIndicators();
    initNavAreas();
    initTouchEvents();
    initKeyboardNav();
    initWheelNav();
    initNameEffect();
    initParallax();
    initModalKeyboard();
    initSkillsContainerMagnetic();
    initBlogCards();

    // Expose functions globally for inline onclick handlers
    window.goToSlide = goToSlide;
    window.openModal = openModal;
    window.closeModal = closeModal;
    window.openBlogModal = openBlogModal;

    console.log('🚀 Portfolio site initialized');
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
