/**
 * Animations Controller
 * 
 * Handles scroll-triggered animations, intersection observers,
 * and other animation orchestration.
 * 
 * Architecture:
 * - Uses IntersectionObserver for efficient scroll detection
 * - Staggers animations for visual interest
 * - Respects prefers-reduced-motion for accessibility
 */

class AnimationController {
  constructor() {
    // Check for reduced motion preference
    this.prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Don't initialize animations if user prefers reduced motion
    if (this.prefersReducedMotion) {
      this.showAllContent();
      return;
    }

    this.init();
  }

  init() {
    this.setupScrollReveal();
    this.setupTextAnimations();
    this.setupProjectCards();
    this.setupCounterAnimations();
  }

  /**
   * Show all content immediately for reduced motion users
   */
  showAllContent() {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
      el.classList.add('revealed');
    });
  }

  /**
   * Setup IntersectionObserver for scroll-triggered reveals
   */
  setupScrollReveal() {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px',  // Trigger slightly before element enters
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          
          // Add stagger delays to children if present
          const children = entry.target.querySelectorAll('[data-stagger]');
          children.forEach((child, index) => {
            child.style.transitionDelay = `${index * 100}ms`;
            setTimeout(() => {
              child.classList.add('revealed');
            }, 50);
          });
          
          // Unobserve after animation (performance)
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
      section.classList.add('reveal');
      observer.observe(section);
    });

    // Observe skill tags
    document.querySelectorAll('.skill-category').forEach((category, index) => {
      category.classList.add('reveal');
      category.style.transitionDelay = `${index * 100}ms`;
      observer.observe(category);
    });

    // Observe project cards
    document.querySelectorAll('.project-card').forEach((card, index) => {
      card.classList.add('reveal');
      card.style.transitionDelay = `${index * 150}ms`;
      observer.observe(card);
    });

    // Observe highlight cards
    document.querySelectorAll('.highlight-card').forEach((card, index) => {
      card.classList.add('reveal-scale');
      card.style.transitionDelay = `${index * 100}ms`;
      observer.observe(card);
    });

    // Observe community activities
    document.querySelectorAll('.community__activity').forEach((activity, index) => {
      activity.classList.add('reveal');
      activity.style.transitionDelay = `${index * 100}ms`;
      observer.observe(activity);
    });
  }

  /**
   * Setup text split animations for headings
   */
  setupTextAnimations() {
    // Animate hero title words
    const heroWords = document.querySelectorAll('.hero__title-word');
    heroWords.forEach((word, index) => {
      word.style.animationDelay = `${index * 150}ms`;
    });
  }

  /**
   * Setup project card hover effects
   */
  setupProjectCards() {
    const cards = document.querySelectorAll('.project-card[data-tilt]');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `
          perspective(1000px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          translateY(-4px)
        `;
        
        // Move glow to follow cursor
        const glow = card.querySelector('.project-card__glow');
        if (glow) {
          glow.style.background = `
            radial-gradient(
              circle at ${x}px ${y}px,
              rgba(0, 240, 255, 0.15) 0%,
              transparent 50%
            )
          `;
        }
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        
        const glow = card.querySelector('.project-card__glow');
        if (glow) {
          glow.style.background = '';
        }
      });
    });
  }

  /**
   * Setup counter animations for stats
   */
  setupCounterAnimations() {
    const observerOptions = {
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.highlight-card__number').forEach(counter => {
      observer.observe(counter);
    });
  }

  /**
   * Animate a counter from 0 to target value
   */
  animateCounter(element) {
    const text = element.textContent;
    
    // Handle non-numeric values (like ∞)
    if (isNaN(parseInt(text))) return;
    
    const target = parseInt(text.replace(/\D/g, ''));
    const suffix = text.replace(/\d/g, '');
    const duration = 1500;
    const start = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out quad
      const easeOut = 1 - (1 - progress) * (1 - progress);
      
      const current = Math.floor(easeOut * target);
      element.textContent = current + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new AnimationController();
});
