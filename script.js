// ============================================
// MODERN INTERACTIVE JAVASCRIPT
// Animations, Scroll Effects & Interactions
// ============================================

document.addEventListener("DOMContentLoaded", function () {
    // Load Navigation
    loadNavigation();

    // Initialize all animations and interactions
    initScrollReveal();
    initNavbarScroll();
    initSmoothScroll();
    initCounterAnimation();
    initParallaxEffect();
    initTypingEffect();

    // Add floating orbs to body
    createFloatingOrbs();
});

// ============================================
// NAVIGATION LOADER
// ============================================
function loadNavigation() {
    fetch('menue.html')
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById("nav-placeholder").innerHTML = data;
            initHamburgerMenu();
            highlightActiveNav();
        })
        .catch(error => {
            console.error('Error loading the menu:', error);
        });
}

// ============================================
// HAMBURGER MENU
// ============================================
function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
}

// ============================================
// HIGHLIGHT ACTIVE NAV
// ============================================
function highlightActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
function initNavbarScroll() {
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        const currentScroll = window.pageYOffset;

        if (navbar) {
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        lastScroll = currentScroll;
    });
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    // Also add reveal class to common elements
    const autoRevealSelectors = [
        '.feature',
        '.stat-item',
        '.content .text',
        '.content img',
        '.contact-form',
        '.contact-card',
        '.section-header'
    ];

    autoRevealSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            if (!el.classList.contains('reveal') &&
                !el.classList.contains('reveal-left') &&
                !el.classList.contains('reveal-right')) {
                el.classList.add('reveal');
            }
        });
    });

    const allRevealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    const revealOnScroll = () => {
        allRevealElements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                // Add staggered delay based on element position in viewport
                setTimeout(() => {
                    element.classList.add('active');
                }, index * 100 % 500);
            }
        });
    };

    // Use Intersection Observer for better performance
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        allRevealElements.forEach(el => observer.observe(el));
    } else {
        // Fallback for older browsers
        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll();
    }
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// COUNTER ANIMATION
// ============================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');

    if (counters.length === 0) return;

    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target')) || parseInt(counter.textContent);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current).toLocaleString() + (counter.getAttribute('data-suffix') || '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString() + (counter.getAttribute('data-suffix') || '');
            }
        };

        updateCounter();
    };

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }
}

// ============================================
// PARALLAX EFFECT
// ============================================
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });

        // Subtle parallax on orbs
        const orbs = document.querySelectorAll('.orb');
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.03;
            orb.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ============================================
// TYPING EFFECT
// ============================================
function initTypingEffect() {
    const typingElements = document.querySelectorAll('[data-typing]');

    typingElements.forEach(element => {
        const text = element.getAttribute('data-typing') || element.textContent;
        const speed = parseInt(element.getAttribute('data-typing-speed')) || 100;

        element.textContent = '';
        element.style.borderRight = '2px solid var(--primary)';

        let i = 0;
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                // Remove cursor after typing
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        };

        // Start typing when element is visible
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        type();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(element);
        } else {
            type();
        }
    });
}

// ============================================
// FLOATING ORBS BACKGROUND
// ============================================
function createFloatingOrbs() {
    // Check if orbs already exist
    if (document.querySelector('.floating-orbs')) return;

    const orbsContainer = document.createElement('div');
    orbsContainer.className = 'floating-orbs';

    for (let i = 1; i <= 4; i++) {
        const orb = document.createElement('div');
        orb.className = `orb orb-${i}`;
        orbsContainer.appendChild(orb);
    }

    document.body.prepend(orbsContainer);
}

// ============================================
// FORM VALIDATION WITH ANIMATIONS
// ============================================
function initFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            // Add focus animation
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('focused');
                if (input.value) {
                    input.parentElement.classList.add('filled');
                } else {
                    input.parentElement.classList.remove('filled');
                }
            });
        });

        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Add success animation
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.textContent = '✓ Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

                setTimeout(() => {
                    submitBtn.textContent = 'Send Message';
                    submitBtn.style.background = '';
                    form.reset();
                }, 3000);
            }
        });
    });
}

// Initialize form validation when DOM is ready
document.addEventListener('DOMContentLoaded', initFormValidation);

// ============================================
// BUTTON RIPPLE EFFECT
// ============================================
document.addEventListener('click', (e) => {
    const button = e.target.closest('.btn');
    if (!button) return;

    const ripple = document.createElement('span');
    ripple.className = 'ripple';

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
    ripple.style.top = e.clientY - rect.top - size / 2 + 'px';

    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
});

// Add ripple styles dynamically
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-effect 0.6s ease-out;
        pointer-events: none;
    }
    @keyframes ripple-effect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyles);

// ============================================
// PAGE TRANSITION
// ============================================
document.querySelectorAll('a:not([href^="#"]):not([href^="http"])').forEach(link => {
    link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.endsWith('.html')) {
            e.preventDefault();
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.3s ease';

            setTimeout(() => {
                window.location.href = href;
            }, 300);
        }
    });
});

// Fade in on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
});