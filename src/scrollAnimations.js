// Scroll-triggered animations and scroll-based enhancements
// Uses Intersection Observer for performance

export function initScrollAnimations(environment) {
    // 1. Scroll-triggered fade-in animations for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections and subsections
    const sectionsToAnimate = document.querySelectorAll(
        '.detail-section, .subsection, .quote-box, .mission-brief, .triad-card'
    );
    sectionsToAnimate.forEach(section => {
        section.classList.add('fade-in-hidden');
        fadeInObserver.observe(section);
    });

    // 2. Staggered content reveal animations
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('reveal-visible');
                }, index * 100); // Stagger by 100ms
                staggerObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const paragraphs = document.querySelectorAll('.subsection p, .quote-box');
    paragraphs.forEach((p, index) => {
        p.classList.add('reveal-hidden');
        staggerObserver.observe(p);
    });

    // 3. Active section highlighting in navigation
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const sections = document.querySelectorAll('.detail-section');

    const navObserver = new IntersectionObserver((entries) => {
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
    }, {
        threshold: 0.3,
        rootMargin: '-100px 0px -50% 0px'
    });

    sections.forEach(section => navObserver.observe(section));

    // 4. Scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    let ticking = false;
    function updateProgress() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
        progressBar.style.width = `${progress}%`;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateProgress);
            ticking = true;
        }
    }, { passive: true });

    // 5. Parallax effect for 3D scene
    let lastScrollY = window.pageYOffset;
    let parallaxTicking = false;

    function updateParallax() {
        const scrollY = window.pageYOffset;
        const scrollDelta = scrollY - lastScrollY;
        
        if (environment && environment.mesh) {
            // Subtle parallax movement based on scroll
            const parallaxAmount = scrollY * 0.0005; // Very subtle
            environment.mesh.position.y += parallaxAmount * 0.1;
            
            // Particles rotation speed changes slightly with scroll
            if (environment.particles) {
                const baseRotation = scrollY * 0.0001;
                // This will be handled in the animation loop
            }
        }
        
        lastScrollY = scrollY;
        parallaxTicking = false;
    }

    window.addEventListener('scroll', () => {
        if (!parallaxTicking) {
            window.requestAnimationFrame(updateParallax);
            parallaxTicking = true;
        }
    }, { passive: true });

    return {
        updateParallax: (scrollY) => {
            if (environment && environment.mesh) {
                const parallaxAmount = scrollY * 0.0003;
                // Store scroll position for use in animation loop
                environment.scrollParallax = parallaxAmount;
            }
        }
    };
}

