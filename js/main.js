// ===================================
// AVANISH KASAR — Portfolio JS
// Premium interactions & animations
// ===================================

(function () {
    'use strict';

    // ===================================
    // Preloader
    // ===================================
    const preloader = document.getElementById('preloader');
    const counter = document.getElementById('preloaderCounter');
    let count = 0;

    function updateCounter() {
        if (count < 100) {
            count += Math.floor(Math.random() * 10) + 1;
            if (count > 100) count = 100;
            counter.textContent = count;

            if (count < 100) {
                setTimeout(updateCounter, 50 + Math.random() * 50);
            } else {
                counter.textContent = '100';
                setTimeout(() => {
                    preloader.classList.add('done');
                    document.body.style.overflow = '';
                    initRevealAnimations();
                    initCountUp();
                }, 400);
            }
        }
    }

    // Prevent scroll during preloader
    document.body.style.overflow = 'hidden';
    setTimeout(updateCounter, 300);

    // ===================================
    // Custom Cursor
    // ===================================
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursorFollower');
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    if (cursor && cursorFollower && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        function animateFollower() {
            followerX += (mouseX - followerX) * 0.12;
            followerY += (mouseY - followerY) * 0.12;
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
            requestAnimationFrame(animateFollower);
        }
        animateFollower();

        // Hover effects on interactive elements
        const hoverTargets = document.querySelectorAll('a, button, [data-magnetic]');
        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                cursorFollower.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                cursorFollower.classList.remove('hover');
            });
        });
    }

    // ===================================
    // Magnetic Elements
    // ===================================
    const magneticElements = document.querySelectorAll('[data-magnetic]');

    if (window.innerWidth > 768) {
        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = '';
                el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
                setTimeout(() => {
                    el.style.transition = '';
                }, 500);
            });
        });
    }

    // ===================================
    // Navigation
    // ===================================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    // Scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show on scroll direction
        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close mobile menu on link click
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ===================================
    // Smooth Scroll
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPos = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: targetPos,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================
    // Reveal on Scroll (Intersection Observer)
    // ===================================
    function initRevealAnimations() {
        const reveals = document.querySelectorAll('.reveal-text');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Stagger children within same parent
                    const parent = entry.target.closest('.about-stats, .contact-links, .hero-socials, .exp-tags, .project-tech-stack');
                    if (parent) {
                        const siblings = parent.querySelectorAll('.reveal-text');
                        siblings.forEach((sibling, i) => {
                            setTimeout(() => {
                                sibling.classList.add('visible');
                            }, i * 100);
                        });
                    } else {
                        entry.target.classList.add('visible');
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -60px 0px'
        });

        reveals.forEach((el, index) => {
            // Add stagger delay based on position in parent
            const parent = el.closest('section');
            if (parent) {
                const siblings = parent.querySelectorAll('.reveal-text');
                const idx = Array.from(siblings).indexOf(el);
                el.style.transitionDelay = `${idx * 0.05}s`;
            }
            observer.observe(el);
        });
    }

    // ===================================
    // Count Up Animation
    // ===================================
    function initCountUp() {
        const counters = document.querySelectorAll('[data-count]');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-count'));
                    const duration = 2000;
                    const start = performance.now();

                    function update(now) {
                        const elapsed = now - start;
                        const progress = Math.min(elapsed / duration, 1);

                        // Ease out expo
                        const eased = 1 - Math.pow(2, -10 * progress);
                        const current = Math.round(eased * target);

                        el.textContent = current;

                        if (progress < 1) {
                            requestAnimationFrame(update);
                        } else {
                            el.textContent = target;
                        }
                    }

                    requestAnimationFrame(update);
                    observer.unobserve(el);
                }
            });
        }, {
            threshold: 0.5
        });

        counters.forEach(counter => observer.observe(counter));
    }

    // ===================================
    // Active Section Highlight
    // ===================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ===================================
    // Project Item Tilt Effect
    // ===================================
    if (window.innerWidth > 768) {
        const projectItems = document.querySelectorAll('.project-visual');
        projectItems.forEach(item => {
            item.addEventListener('mousemove', (e) => {
                const rect = item.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;

                item.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
            });

            item.addEventListener('mouseleave', () => {
                item.style.transform = '';
                item.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
                setTimeout(() => {
                    item.style.transition = '';
                }, 500);
            });
        });
    }

    // ===================================
    // Experience Item Hover Line
    // ===================================
    const expItems = document.querySelectorAll('.experience-item');
    expItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const h3 = item.querySelector('h3');
            if (h3) {
                h3.style.color = '#00f0ff';
                h3.style.transition = 'color 0.3s ease';
            }
        });
        item.addEventListener('mouseleave', () => {
            const h3 = item.querySelector('h3');
            if (h3) {
                h3.style.color = '';
            }
        });
    });

    // ===================================
    // Console Art
    // ===================================
    console.log(`
%c
 █████╗ ██╗  ██╗
██╔══██╗██║ ██╔╝
███████║█████╔╝ 
██╔══██║██╔═██╗ 
██║  ██║██║  ██╗
╚═╝  ╚═╝╚═╝  ╚═╝

%cAvanish Kasar — Software Developer & AI Engineer
%cavanishkasar57@gmail.com

`, 'color: #00f0ff; font-weight: bold; font-size: 14px;', 
   'color: #e8e8e8; font-size: 12px; font-weight: bold;',
   'color: #888; font-size: 11px;');

    // ===================================
    // Performance: Reduce animations
    // ===================================
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
        document.body.classList.add('low-performance');
        const noiseOverlay = document.querySelector('.noise-overlay');
        if (noiseOverlay) noiseOverlay.style.display = 'none';
    }

})();
