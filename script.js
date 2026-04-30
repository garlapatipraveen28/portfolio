// Enhanced Professional Portfolio JavaScript

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initScrollAnimations();
    handleNavHighlighting();
    initMobileMenu();
    initSmoothScroll();
    initFormValidation();
    handleHeaderScroll();
    initScrollProgress();
    initTypingAnimation();
    initParallaxEffects();
});

/**
 * Scroll Progress Indicator
 */
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

/**
 * Enhanced Typing Animation for Hero Section
 */
function initTypingAnimation() {
    const tagline = document.querySelector('.tagline');
    if (!tagline) return;

    const text = tagline.textContent;
    tagline.textContent = '';
    tagline.style.borderRight = '2px solid var(--primary-color)';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            tagline.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        } else {
            setTimeout(() => {
                tagline.style.borderRight = 'none';
            }, 1000);
        }
    };
    
    // Start typing animation after a delay
    setTimeout(typeWriter, 1000);
}

/**
 * Parallax Effects for Background Elements
 */
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.bg-blur');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.3;
            element.style.transform = `translateY(${rate * speed}px)`;
        });
    });
}

/**
 * Check if element is in viewport with enhanced options
 */
function isElementInViewport(element, offset = 100) {
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    
    return (
        rect.top <= windowHeight + offset &&
        rect.bottom >= -offset &&
        rect.left <= windowWidth + offset &&
        rect.right >= -offset
    );
}

/**
 * Enhanced scroll animations with stagger effect
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.section-animation');
    const cards = document.querySelectorAll('.project-card, .skill-card, .education-card');
    
    // Initial check
    checkAnimations();
    
    // Throttled scroll listener
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                checkAnimations();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    function checkAnimations() {
        animatedElements.forEach((element, index) => {
            if (isElementInViewport(element, 50)) {
                setTimeout(() => {
                    element.classList.add('visible');
                }, index * 100);
            }
        });
        
        // Stagger card animations
        cards.forEach((card, index) => {
            if (isElementInViewport(card, 100)) {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }
}

/**
 * Enhanced navigation highlighting
 */
function handleNavHighlighting() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNav() {
        let current = '';
        const scrollPosition = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Throttled scroll listener
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveNav();
                ticking = false;
            });
            ticking = true;
        }
    });
}

/**
 * Enhanced mobile menu with animations
 */
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-nav .nav-link, .mobile-nav .contact-btn');
    
    if (!mobileToggle || !mobileNav) return;
    
    mobileToggle.addEventListener('click', () => {
        const isActive = mobileNav.classList.contains('active');
        
        if (isActive) {
            mobileNav.classList.remove('active');
            mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        } else {
            mobileNav.classList.add('active');
            mobileToggle.innerHTML = '<i class="fas fa-times"></i>';
            document.body.style.overflow = 'hidden';
        }
    });
    
    // Close mobile menu when clicking on links
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        });
    });
}

/**
 * Enhanced smooth scrolling with offset
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Skip mailto: and tel: links
            if (href.startsWith('mailto:') || href.startsWith('tel:')) {
                return;
            }
            
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Enhanced form validation with real-time feedback
 */
function initFormValidation() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    const fields = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        subject: document.getElementById('subject'),
        message: document.getElementById('message')
    };
    
    const submitBtn = document.getElementById('submit-btn');
    const formMessage = document.getElementById('form-message');
    
    // Real-time validation
    Object.entries(fields).forEach(([fieldName, field]) => {
        if (!field) return;
        
        field.addEventListener('blur', () => validateField(fieldName, field));
        field.addEventListener('input', () => clearFieldError(fieldName, field));
    });
    
    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            await handleFormSubmission();
        }
    });
    
    function validateField(fieldName, field) {
        const value = field.value.trim();
        const formGroup = field.closest('.form-group');
        const errorElement = document.getElementById(`${fieldName}-error`);
        
        let isValid = true;
        let errorMessage = '';
        
        // Required field validation
        if (!value) {
            isValid = false;
            errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
        }
        
        // Email validation
        if (fieldName === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        // Message length validation
        if (fieldName === 'message' && value && value.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters long';
        }
        
        // Update UI
        if (isValid) {
            formGroup.classList.remove('error');
            if (errorElement) errorElement.textContent = '';
        } else {
            formGroup.classList.add('error');
            if (errorElement) errorElement.textContent = errorMessage;
        }
        
        return isValid;
    }
    
    function clearFieldError(fieldName, field) {
        const formGroup = field.closest('.form-group');
        const errorElement = document.getElementById(`${fieldName}-error`);
        
        if (field.value.trim()) {
            formGroup.classList.remove('error');
            if (errorElement) errorElement.textContent = '';
        }
    }
    
    function validateForm() {
        let isFormValid = true;
        
        Object.entries(fields).forEach(([fieldName, field]) => {
            if (field && !validateField(fieldName, field)) {
                isFormValid = false;
            }
        });
        
        return isFormValid;
    }
    
    async function handleFormSubmission() {
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<span class="loading"></span> Sending...';
        submitBtn.disabled = true;
        
        try {
            // Simulate form submission (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Success state
            showMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon.', 'success');
            form.reset();
            
        } catch (error) {
            showMessage('Sorry, there was an error sending your message. Please try again or contact me directly.', 'error');
        } finally {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }
    
    function showMessage(text, type) {
        formMessage.innerHTML = `<div class="message ${type}">${text}</div>`;
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Auto-hide success messages
        if (type === 'success') {
            setTimeout(() => {
                formMessage.innerHTML = '';
            }, 5000);
        }
    }
}

/**
 * Enhanced header scroll effects
 */
function handleHeaderScroll() {
    const header = document.getElementById('navbar');
    if (!header) return;
    
    let lastScrollY = window.pageYOffset;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.pageYOffset;
        
        // Add scrolled class for styling
        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header based on scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

/**
 * Initialize all enhanced features
 */
function initEnhancedFeatures() {
    // Set initial card states for animation
    const cards = document.querySelectorAll('.project-card, .skill-card, .education-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
    });
}

// Initialize enhanced features after DOM is ready
document.addEventListener('DOMContentLoaded', initEnhancedFeatures);