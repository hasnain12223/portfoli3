/* ============================================
   HASNAIN PORTFOLIO - Enhanced Main JavaScript
   Premium animations, interactions & effects
   ============================================ */

// ===== SCROLL THROTTLE UTILITY =====
function throttle(fn, limit) {
    let inThrottle = false;
    return function() {
        if (!inThrottle) {
            fn.apply(this, arguments);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== DEBOUNCE UTILITY =====
function debounce(fn, delay) {
    let timer;
    return function() {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, arguments), delay);
    };
}

// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', function() {
    initLoadingScreen();
});

// ===== 1. LOADING SCREEN =====
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const loaderProgress = document.getElementById('loader-progress');
    const loaderPercentage = document.getElementById('loader-percentage');
    const mainContent = document.getElementById('main-content');
    
    if (!loadingScreen || !mainContent) return;
    
    const circumference = 263.89;
    let progress = 0;
    
    document.body.style.overflow = 'hidden';
    
    const loadingInterval = setInterval(function() {
        progress += Math.random() * 12 + 3;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            setTimeout(function() {
                loadingScreen.classList.add('hidden');
                mainContent.style.display = 'block';
                document.body.style.overflow = 'auto';
                
                // Initialize all features
                initTypingEffect();
                initTextScramble();
                initScrollReveal();
                initSkillBars();
                initCounters();
                initNavbar();
                initParticles();
                initCursor();
                initParallax();
                initMagneticButtons();
                initRippleEffect();
                initTiltEffect();
                initTestimonialCarousel();
                initBackToTop();
                initSmoothScroll();
                initContactForm();
                initNavLinksActive();
                initFloatingIcons();
                initScrollProgressBar();
                initImageZoom();
                initAutoHideNavbar();
            }, 600);
        }
        
        if (loaderProgress) {
            const offset = circumference - (progress / 100) * circumference;
            loaderProgress.style.strokeDashoffset = offset;
        }
        if (loaderPercentage) {
            loaderPercentage.textContent = Math.round(progress) + '%';
        }
    }, 180);
}

// ===== 2. TYPING EFFECT (Enhanced) =====
function initTypingEffect() {
    const el = document.getElementById('typed-text');
    if (!el) return;
    
    const phrases = [
        'Full Stack Developer',
        'UI/UX Designer',
        'Problem Solver',
        'Creative Thinker',
        'Code Enthusiast'
    ];
    
    let phraseIndex = 0, charIndex = 0, isDeleting = false, isPaused = false;
    
    function type() {
        const current = phrases[phraseIndex];
        if (isPaused) { isPaused = false; setTimeout(type, 2000); return; }
        
        el.textContent = isDeleting ? current.substring(0, charIndex - 1) : current.substring(0, charIndex + 1);
        charIndex += isDeleting ? -1 : 1;
        
        let speed = isDeleting ? 40 : 80;
        if (!isDeleting && charIndex === current.length) { speed = 2000; isPaused = true; isDeleting = true; }
        else if (isDeleting && charIndex === 0) { isDeleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; speed = 400; }
        
        setTimeout(type, speed);
    }
    setTimeout(type, 800);
}

// ===== 3. TEXT SCRAMBLE EFFECT =====
function initTextScramble() {
    const el = document.querySelector('.hero-title .gradient-text');
    if (!el) return;
    
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()';
    const originalText = el.textContent;
    let iteration = 0;
    let maxIterations = 10;
    
    const interval = setInterval(() => {
        el.textContent = originalText.split('').map((char, index) => {
            if (index < iteration) return originalText[index];
            return letters[Math.floor(Math.random() * letters.length)];
        }).join('');
        
        if (iteration >= originalText.length) clearInterval(interval);
        iteration += 1 / 3;
    }, 50);
}

// ===== 4. SCROLL REVEAL (Enhanced with stagger) =====
function initScrollReveal() {
    document.querySelectorAll('.section-header, .skill-category, .project-card, .service-card, .achievement-card, .blog-card, .timeline-item, .testimonials-carousel, .contact-info-section, .contact-form').forEach(function(el) {
        if (!el.classList.contains('reveal') && !el.classList.contains('reveal-left') && !el.classList.contains('reveal-right') && !el.classList.contains('slide-up')) {
            el.classList.add('reveal');
        }
    });
    
    const aboutImg = document.querySelector('.about-image');
    const aboutContent = document.querySelector('.about-content');
    if (aboutImg && !aboutImg.classList.contains('reveal-left')) aboutImg.classList.add('reveal-left');
    if (aboutContent && !aboutContent.classList.contains('reveal-right')) aboutContent.classList.add('reveal-right');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Stagger children if container has stagger class
                if (entry.target.classList.contains('slide-up-stagger')) {
                    const items = entry.target.querySelectorAll('.slide-up-item');
                    items.forEach(function(item, i) {
                        setTimeout(function() {
                            item.classList.add('active');
                        }, i * 100);
                    });
                }
                
                if (entry.target.closest && entry.target.closest('.skills')) {
                    animateSkillBars();
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .slide-up, .slide-up-item, .slide-up-stagger').forEach(function(el) {
        observer.observe(el);
    });
}

// ===== 5. SKILL BARS =====
function initSkillBars() {
    document.querySelectorAll('.skill-progress').forEach(function(bar) {
        bar.style.width = '0';
    });
}

function animateSkillBars() {
    document.querySelectorAll('.skill-progress').forEach(function(bar, i) {
        const val = bar.getAttribute('data-progress');
        if (val && !bar.dataset.animated) {
            bar.dataset.animated = 'true';
            setTimeout(function() { bar.style.width = val + '%'; }, 200 + i * 80);
        }
    });
}

// ===== 6. COUNTERS (Enhanced with easing) =====
function initCounters() {
    document.querySelectorAll('.stat-number').forEach(function(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        if (isNaN(target)) return;
        
        const observer = new IntersectionObserver(function(entries) {
            if (entries[0].isIntersecting) {
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        }, { threshold: 0.5 });
        observer.observe(counter);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const isPercent = target === 100;
    const duration = 2000;
    const startTime = performance.now();
    
    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutCubic(progress);
        current = Math.round(easedProgress * target);
        
        element.textContent = current + (isPercent ? '%' : '');
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target + (isPercent ? '%' : '');
        }
    }
    
    requestAnimationFrame(update);
}

// ===== 7. NAVBAR =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    if (!navbar) return;
    
    window.addEventListener('scroll', throttle(function() {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, 100), { passive: true });
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        });
        
        navMenu.querySelectorAll('.nav-link').forEach(function(link) {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }
}

// ===== 8. AUTO-HIDE NAVBAR =====
function initAutoHideNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', throttle(function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 200) {
            if (currentScrollY > lastScrollY) {
                // Scrolling down - hide
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up - show
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    }, 50), { passive: true });
}

// ===== 9. PARTICLES (Optimized) =====
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animId;
    let mouseX = -1000, mouseY = -1000;
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    const count = Math.min(Math.floor(window.innerWidth * 0.02), 25);
    const connDistSq = 70 * 70;
    const repelDistSq = 100 * 100;
    let counter = 0;
    
    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.8 + 0.5,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: (Math.random() - 0.5) * 0.3,
            opacity: Math.random() * 0.25 + 0.05,
            color: Math.random() > 0.5 ? '#3B82F6' : '#8B5CF6'
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        counter++;
        const doHeavy = counter % 3 === 0;
        
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.speedX;
            p.y += p.speedY;
            
            if (doHeavy) {
                const dx = p.x - mouseX;
                const dy = p.y - mouseY;
                const distSq = dx * dx + dy * dy;
                if (distSq < repelDistSq) {
                    const force = (repelDistSq - distSq) / repelDistSq;
                    const invDist = 1 / Math.sqrt(distSq + 0.01);
                    p.x += dx * invDist * force;
                    p.y += dy * invDist * force;
                }
            }
            
            if (p.x < -10) p.x = canvas.width + 10;
            else if (p.x > canvas.width + 10) p.x = -10;
            if (p.y < -10) p.y = canvas.height + 10;
            else if (p.y > canvas.height + 10) p.y = -10;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.opacity;
            ctx.fill();
            
            if (doHeavy) {
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx2 = p.x - p2.x;
                    const dy2 = p.y - p2.y;
                    if (dx2 * dx2 + dy2 * dy2 < connDistSq) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = p.color;
                        ctx.globalAlpha = 0.06;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        }
        ctx.globalAlpha = 1;
        animId = requestAnimationFrame(animate);
    }
    animate();
    
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) cancelAnimationFrame(animId);
        else animate();
    });
}

// ===== 10. MOUSE FOLLOWER (Enhanced) =====
function initCursor() {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
    });
    
    function animateRing() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';
        requestAnimationFrame(animateRing);
    }
    ringX = mouseX;
    ringY = mouseY;
    animateRing();
    
    // Click effect
    document.addEventListener('mousedown', function() {
        dot.style.transform = 'translate(-50%, -50%) scale(0.6)';
        ring.style.transform = 'translate(-50%, -50%) scale(1.5)';
        ring.style.borderColor = 'rgba(139, 92, 246, 0.6)';
        ring.style.background = 'rgba(139, 92, 246, 0.12)';
    });
    
    document.addEventListener('mouseup', function() {
        dot.style.transform = 'translate(-50%, -50%) scale(1)';
        ring.style.transform = 'translate(-50%, -50%) scale(1)';
        ring.style.borderColor = 'rgba(59, 130, 246, 0.4)';
        ring.style.background = 'transparent';
    });
    
    // Hover effects
    const interactive = document.querySelectorAll('a, button, .btn, .social-icon, .contact-social, .project-card, .service-card, .blog-card, .achievement-card, .nav-link, .overlay-link, input, textarea, select');
    interactive.forEach(function(el) {
        el.addEventListener('mouseenter', function() {
            dot.classList.add('hovered');
            ring.classList.add('hovered');
        });
        el.addEventListener('mouseleave', function() {
            dot.classList.remove('hovered');
            ring.classList.remove('hovered');
        });
    });
}

// ===== 11. PARALLAX =====
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const content = hero.querySelector('.hero-container');
    const shapes = hero.querySelectorAll('.shape');
    let heroHeight = hero.offsetHeight;
    
    window.addEventListener('resize', function() { heroHeight = hero.offsetHeight; });
    
    window.addEventListener('scroll', throttle(function() {
        const scrolled = window.pageYOffset;
        if (scrolled < heroHeight) {
            if (content) {
                content.style.transform = 'translateY(' + (scrolled * 0.08) + 'px)';
                content.style.opacity = 1 - (scrolled / heroHeight) * 0.3;
            }
            for (let i = 0; i < shapes.length; i++) {
                shapes[i].style.transform = 'translateY(' + (scrolled * (0.02 + i * 0.01)) + 'px)';
            }
        }
    }, 50), { passive: true });
}

// ===== 12. MAGNETIC BUTTONS =====
function initMagneticButtons() {
    document.querySelectorAll('.magnetic-btn').forEach(function(btn) {
        btn.addEventListener('mousemove', function(e) {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = 'translate(' + (x * 0.3) + 'px, ' + (y * 0.3) + 'px)';
        });
        btn.addEventListener('mouseleave', function() {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

// ===== 13. RIPPLE EFFECT =====
function initRippleEffect() {
    document.querySelectorAll('.btn, .overlay-link, .social-icon, .contact-social').forEach(function(el) {
        el.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = el.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = 'position:absolute;width:' + size + 'px;height:' + size + 'px;left:' + x + 'px;top:' + y + 'px;background:rgba(255,255,255,0.3);border-radius:50%;transform:scale(0);animation:rippleAnim 0.6s ease-out;pointer-events:none;';
            el.style.position = 'relative';
            el.style.overflow = 'hidden';
            el.appendChild(ripple);
            
            setTimeout(function() { ripple.remove(); }, 600);
        });
    });
}

// ===== 14. TILT EFFECT =====
function initTiltEffect() {
    document.querySelectorAll('.tilt-card').forEach(function(card) {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rx = (y - rect.height / 2) / (rect.height / 2) * -8;
            const ry = (x - rect.width / 2) / (rect.width / 2) * 8;
            card.style.transform = 'perspective(1000px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) scale3d(1.02, 1.02, 1.02)';
        });
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// ===== 15. TESTIMONIAL CAROUSEL =====
function initTestimonialCarousel() {
    const track = document.getElementById('testimonialsTrack');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    const dotsContainer = document.getElementById('testimonialDots');
    if (!track) return;
    
    const cards = track.querySelectorAll('.testimonial-card');
    const total = cards.length;
    let current = 0;
    let autoSlide;
    
    for (let i = 0; i < total; i++) {
        const dot = document.createElement('button');
        dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
        dot.dataset.index = i;
        dot.addEventListener('click', function() { goTo(parseInt(this.dataset.index)); resetAuto(); });
        dotsContainer.appendChild(dot);
    }
    
    function goTo(index) {
        current = index;
        track.style.transform = 'translateX(-' + (current * 100) + '%)';
        dotsContainer.querySelectorAll('.testimonial-dot').forEach(function(d, i) {
            d.classList.toggle('active', i === current);
        });
    }
    
    function nextSlide() { goTo((current + 1) % total); }
    function prevSlide() { goTo((current - 1 + total) % total); }
    function resetAuto() { clearInterval(autoSlide); autoSlide = setInterval(nextSlide, 5000); }
    
    if (prevBtn) prevBtn.addEventListener('click', function() { prevSlide(); resetAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', function() { nextSlide(); resetAuto(); });
    
    autoSlide = setInterval(nextSlide, 5000);
    
    let touchStartX = 0;
    track.addEventListener('touchstart', function(e) { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
    track.addEventListener('touchend', function(e) {
        const diff = touchStartX - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 50) { diff > 0 ? nextSlide() : prevSlide(); resetAuto(); }
    }, { passive: true });
}

// ===== 16. BACK TO TOP =====
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    
    window.addEventListener('scroll', throttle(function() {
        btn.classList.toggle('visible', window.scrollY > 500);
    }, 200), { passive: true });
    
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== 17. SMOOTH SCROLL =====
function initSmoothScroll() {
    const navbar = document.getElementById('navbar');
    
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;
        const href = link.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (!target) return;
        
        const offset = navbar ? navbar.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
        history.pushState(null, null, href);
    });
}

// ===== 18. SCROLL PROGRESS BAR =====
function initScrollProgressBar() {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress-bar';
    document.body.appendChild(bar);
    
    window.addEventListener('scroll', throttle(function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const percent = (scrollTop / docHeight) * 100;
        bar.style.width = percent + '%';
    }, 20), { passive: true });
}

// ===== 19. IMAGE ZOOM / LIGHTBOX =====
function initImageZoom() {
    const images = document.querySelectorAll('.hero-img, .about-img');
    
    images.forEach(function(img) {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            const overlay = document.createElement('div');
            overlay.className = 'image-lightbox';
            overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.95);z-index:100000;display:flex;justify-content:center;align-items:center;cursor:pointer;opacity:0;transition:opacity 0.3s ease;';
            
            const clone = document.createElement('img');
            clone.src = this.src;
            clone.style.cssText = 'max-width:90%;max-height:90%;border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,0.5);transform:scale(0.8);transition:transform 0.3s ease;';
            
            overlay.appendChild(clone);
            document.body.appendChild(overlay);
            
            requestAnimationFrame(function() {
                overlay.style.opacity = '1';
                clone.style.transform = 'scale(1)';
            });
            
            overlay.addEventListener('click', function() {
                overlay.style.opacity = '0';
                clone.style.transform = 'scale(0.8)';
                setTimeout(function() { overlay.remove(); }, 300);
            });
            
            document.body.style.overflow = 'hidden';
            
            overlay.addEventListener('click', function() {
                document.body.style.overflow = 'auto';
            });
        });
    });
}

// ===== 20. CONTACT FORM (Enhanced) =====
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    // Real-time validation
    form.querySelectorAll('input, textarea').forEach(function(field) {
        field.addEventListener('blur', function() {
            validateField(this);
        });
        field.addEventListener('input', function() {
            if (this.classList.contains('error') || this.classList.contains('success')) {
                validateField(this);
            }
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        const parent = field.parentElement;
        const existingMsg = parent.querySelector('.field-msg');
        if (existingMsg) existingMsg.remove();
        
        if (!value) {
            field.style.borderColor = 'rgba(239,68,68,0.5)';
            return false;
        }
        
        if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            field.style.borderColor = 'rgba(239,68,68,0.5)';
            return false;
        }
        
        field.style.borderColor = 'rgba(16,185,129,0.5)';
        return true;
    }
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill in all fields', 'error');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showFormMessage('Please enter a valid email address', 'error');
            return;
        }
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        setTimeout(function() {
            showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
            form.querySelectorAll('input, textarea').forEach(function(f) {
                f.style.borderColor = '';
            });
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

function showFormMessage(text, type) {
    const existing = document.querySelector('.form-message');
    if (existing) existing.remove();
    
    const msg = document.createElement('div');
    msg.className = 'form-message';
    msg.textContent = text;
    msg.style.cssText = 'padding:12px 16px;border-radius:8px;margin-top:15px;font-size:0.85rem;font-weight:500;';
    
    if (type === 'success') {
        msg.style.background = 'rgba(16,185,129,0.1)';
        msg.style.border = '1px solid rgba(16,185,129,0.2)';
        msg.style.color = '#10B981';
    } else {
        msg.style.background = 'rgba(239,68,68,0.1)';
        msg.style.border = '1px solid rgba(239,68,68,0.2)';
        msg.style.color = '#EF4444';
    }
    
    document.getElementById('contactForm').appendChild(msg);
    setTimeout(function() { msg.style.opacity = '0'; msg.style.transition = 'opacity 0.3s'; setTimeout(function() { msg.remove(); }, 300); }, 4000);
}

// ===== 21. NAV LINKS ACTIVE STATE =====
function initNavLinksActive() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    if (!sections.length || !navLinks.length) return;
    
    window.addEventListener('scroll', throttle(function() {
        let current = '';
        const scrollPos = window.pageYOffset + 100;
        sections.forEach(function(section) {
            const top = section.offsetTop;
            const h = section.offsetHeight;
            if (scrollPos >= top && scrollPos < top + h) current = section.getAttribute('id');
        });
        navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) link.classList.add('active');
        });
    }, 150), { passive: true });
}

// ===== 22. FLOATING ICONS =====
function initFloatingIcons() {
    document.querySelectorAll('.floating-icon').forEach(function(icon, i) {
        icon.style.animationDelay = (i * 0.5) + 's';
    });
}

// ===== 23. DYNAMIC STYLES =====
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .form-message { animation: fadeIn 0.3s ease; }
    
    @keyframes rippleAnim {
        to { transform: scale(4); opacity: 0; }
    }
    
    .scroll-progress-bar {
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899);
        z-index: 100000;
        transition: width 0.1s linear;
        box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
    }
    
    .cursor-ring {
        transition: width 0.3s ease, height 0.3s ease, border-color 0.3s ease, background 0.3s ease, transform 0.15s ease;
    }
    
    .cursor-dot {
        transition: width 0.15s ease, height 0.15s ease, background 0.15s ease, transform 0.1s ease;
    }
    
    .navbar {
        transition: transform 0.3s ease, background 0.3s ease, padding 0.3s ease;
    }
`;
document.head.appendChild(styleSheet);

// ===== 24. CONSOLE EASTER EGG =====
console.log('%c Hasnain Portfolio v2.0 ', 'background: linear-gradient(135deg, #3B82F6, #8B5CF6); color: #fff; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 4px;');
console.log('%c Built with ❤️ using HTML, CSS & JavaScript ', 'color: #94a3b8; font-size: 12px;');
console.log('%c 🔥 Check out the projects section for live demos! ', 'color: #F59E0B; font-size: 11px;');