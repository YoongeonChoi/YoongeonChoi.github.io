/**
 * Portfolio Site - Main JavaScript
 * 슬라이드 네비게이션, 터치 스와이프, 키보드 지원
 */

(function() {
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
    
    switch(index) {
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
    switch(e.key) {
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
  // Name Hover Effect Enhancement
  // ========================================
  function initNameEffect() {
    const mainName = document.getElementById('mainName');
    if (!mainName) return;

    const nameText = mainName.querySelector('.name-text');
    if (!nameText) return;

    // Add character-by-character animation on hover
    const text = nameText.textContent;
    nameText.innerHTML = '';
    
    [...text].forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.transition = `color 0.3s ease ${index * 0.03}s, transform 0.3s ease ${index * 0.03}s`;
      nameText.appendChild(span);
    });

    nameText.addEventListener('mouseenter', () => {
      const chars = nameText.querySelectorAll('span');
      chars.forEach((char, index) => {
        setTimeout(() => {
          char.style.color = '#B0A6DF';
          char.style.transform = 'translateY(-2px)';
        }, index * 30);
      });
    });

    nameText.addEventListener('mouseleave', () => {
      const chars = nameText.querySelectorAll('span');
      chars.forEach((char, index) => {
        setTimeout(() => {
          char.style.color = '';
          char.style.transform = '';
        }, index * 20);
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

    // Expose goToSlide globally for inline onclick handlers
    window.goToSlide = goToSlide;

    console.log('🚀 Portfolio site initialized');
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
