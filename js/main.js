// ===================================
// Navigation Scroll Effect
// ===================================
const navbar = document.querySelector('.navbar');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===================================
// Cursor Glow Effect
// ===================================
const cursorGlow = document.getElementById('cursorGlow');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorGlow.classList.add('active');
});

document.addEventListener('mouseleave', () => {
    cursorGlow.classList.remove('active');
});

// Smooth cursor follow
function animateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    
    cursorX += dx * 0.1;
    cursorY += dy * 0.1;
    
    cursorGlow.style.left = cursorX + 'px';
    cursorGlow.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Mobile menu toggle
menuToggle?.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle?.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        menuToggle?.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===================================
// Smooth Scroll
// ===================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===================================
// Intersection Observer for Animations
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with initial hidden state
const animatedElements = document.querySelectorAll('.project-card, .timeline-item, .contact-method, .skill-tag');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Stagger animation for skills
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach((tag, index) => {
    tag.style.transitionDelay = `${index * 0.05}s`;
});

// ===================================
// Profile Card Interactive Glow
// ===================================
const profileCard = document.querySelector('.profile-card');
if (profileCard) {
    profileCard.addEventListener('mousemove', (e) => {
        const rect = profileCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const glow = profileCard.querySelector('.card-glow');
        if (glow) {
            glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 240, 255, 0.4) 0%, transparent 50%)`;
        }
        
        // 3D tilt effect
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        profileCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    profileCard.addEventListener('mouseleave', () => {
        profileCard.style.transform = '';
        const glow = profileCard.querySelector('.card-glow');
        if (glow) {
            glow.style.background = '';
        }
    });
}

// ===================================
// Magnetic Button Effect
// ===================================
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = '';
    });
});

// ===================================
// Project Cards Tilt Effect
// ===================================
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ===================================
// Active Section Highlight
// ===================================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ===================================
// Preload Images
// ===================================
window.addEventListener('load', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        }
    });
});

// ===================================
// Performance: Reduce animations on low-end devices
// ===================================
if (navigator.hardwareConcurrency <= 4) {
    document.body.classList.add('low-performance');
}

// ===================================
// Console Easter Egg
// ===================================
console.log(`
%c
 █████╗ ██╗   ██╗ █████╗ ███╗   ██╗██╗███████╗██╗  ██╗
██╔══██╗██║   ██║██╔══██╗████╗  ██║██║██╔════╝██║  ██║
███████║██║   ██║███████║██╔██╗ ██║██║███████╗███████║
██╔══██║╚██╗ ██╔╝██╔══██║██║╚██╗██║██║╚════██║██╔══██║
██║  ██║ ╚████╔╝ ██║  ██║██║ ╚████║██║███████║██║  ██║
╚═╝  ╚═╝  ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝╚══════╝╚═╝  ╚═╝

%cHey there! 👋
Looking for something? Let's build something cool together!
Reach out: avanishkasar57@gmail.com

`, 'color: #00f0ff; font-weight: bold;', 'color: #a1a1aa; font-size: 14px;');

// ===================================
// Page Load Animation
// ===================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Preload images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
        }
    });
});

// ===================================
// Smooth Scroll to Top
// ===================================
let scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    border-radius: 12px;
    background: rgba(0, 240, 255, 0.9);
    color: var(--bg-primary);
    border: 1px solid rgba(0, 240, 255, 0.3);
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
`;
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.transform = 'translateY(0)';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.transform = 'translateY(20px)';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'translateY(-3px) scale(1.05)';
    scrollTopBtn.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.4)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'translateY(0) scale(1)';
    scrollTopBtn.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3)';
});
