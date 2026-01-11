/**
 * Main Application Controller
 * 
 * Handles core site functionality:
 * - Navigation behavior
 * - Smooth scrolling
 * - Cursor glow effect
 * - Mobile menu
 * - Performance optimizations
 */

class App {
  constructor() {
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupSmoothScroll();
    this.setupCursorGlow();
    this.setupMobileMenu();
    this.setupActiveNavigation();
  }

  /**
   * Navigation scroll behavior
   * Adds background on scroll
   */
  setupNavigation() {
    const nav = document.getElementById('nav');
    if (!nav) return;

    let lastScroll = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
      lastScroll = window.scrollY;

      if (!ticking) {
        requestAnimationFrame(() => {
          if (lastScroll > 50) {
            nav.classList.add('nav--scrolled');
          } else {
            nav.classList.remove('nav--scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /**
   * Smooth scroll for anchor links
   */
  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (!target) return;

        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobileMenu');
        const menuBtn = document.getElementById('menuBtn');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
          mobileMenu.classList.remove('active');
          menuBtn.classList.remove('active');
        }

        // Smooth scroll to target
        const navHeight = 100;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      });
    });
  }

  /**
   * Cursor glow effect that follows mouse
   */
  setupCursorGlow() {
    const glow = document.getElementById('cursorGlow');
    if (!glow) return;

    // Check for touch device
    if ('ontouchstart' in window) {
      glow.style.display = 'none';
      return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;
    let rafId = null;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Hide glow when mouse leaves window
    document.addEventListener('mouseleave', () => {
      glow.classList.add('cursor-glow--hidden');
    });

    document.addEventListener('mouseenter', () => {
      glow.classList.remove('cursor-glow--hidden');
    });

    // Smooth animation loop
    const animate = () => {
      // Lerp for smooth following
      glowX += (mouseX - glowX) * 0.1;
      glowY += (mouseY - glowY) * 0.1;

      glow.style.left = `${glowX}px`;
      glow.style.top = `${glowY}px`;

      rafId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
      if (rafId) cancelAnimationFrame(rafId);
    });
  }

  /**
   * Mobile menu toggle
   */
  setupMobileMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      document.body.style.overflow = 
        mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click (handled in smooth scroll)
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        menuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  /**
   * Highlight active navigation item based on scroll position
   */
  setupActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link, .mobile-menu__link');

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
  }
}

/**
 * Performance Optimizations
 */
class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.lazyLoadImages();
    this.deferNonCritical();
  }

  /**
   * Lazy load images
   */
  lazyLoadImages() {
    if ('loading' in HTMLImageElement.prototype) {
      // Native lazy loading supported
      document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.dataset.src;
        img.loading = 'lazy';
      });
    } else {
      // Fallback to IntersectionObserver
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            imageObserver.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  /**
   * Defer non-critical operations
   */
  deferNonCritical() {
    // Run after initial paint
    requestIdleCallback(() => {
      // Preload links on hover
      document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('mouseenter', () => {
          const preloadLink = document.createElement('link');
          preloadLink.rel = 'prefetch';
          preloadLink.href = link.href;
          document.head.appendChild(preloadLink);
        }, { once: true });
      });
    });
  }
}

// Polyfill for requestIdleCallback
window.requestIdleCallback = window.requestIdleCallback || function(cb) {
  return setTimeout(cb, 1);
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new App();
  new PerformanceOptimizer();
});

// Add loaded class after all resources are loaded
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});
