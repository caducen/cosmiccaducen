// UI enhancements: loading animation, back-to-top button, etc.

export function initUIEnhancements() {
    // 7. Loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.classList.add('hero-loaded');
        }
    });

    // 9. Back-to-top button
    const backToTopButton = document.createElement('button');
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'Scroll to top');
    backToTopButton.innerHTML = '↑';
    backToTopButton.style.display = 'none';
    document.body.appendChild(backToTopButton);

    let scrollTicking = false;
    function toggleBackToTop() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollY > 300) {
            backToTopButton.style.display = 'flex';
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
            setTimeout(() => {
                if (!backToTopButton.classList.contains('visible')) {
                    backToTopButton.style.display = 'none';
                }
            }, 300);
        }
        scrollTicking = false;
    }

    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            window.requestAnimationFrame(toggleBackToTop);
            scrollTicking = true;
        }
    }, { passive: true });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 12. Keyboard navigation improvements
    document.addEventListener('keydown', (e) => {
        // ESC key closes portals
        if (e.key === 'Escape') {
            const openPortal = document.querySelector('.portal-overlay.active');
            if (openPortal) {
                const closeButton = openPortal.querySelector('.portal-close');
                if (closeButton) {
                    closeButton.click();
                }
            }
        }

        // Arrow keys for navigation (when not in input/textarea)
        if (!['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
            if (e.key === 'ArrowDown' && e.ctrlKey) {
                e.preventDefault();
                const sections = document.querySelectorAll('.detail-section');
                const currentSection = Array.from(sections).find(section => {
                    const rect = section.getBoundingClientRect();
                    return rect.top >= 0 && rect.top < window.innerHeight / 2;
                });
                if (currentSection) {
                    const index = Array.from(sections).indexOf(currentSection);
                    if (index < sections.length - 1) {
                        sections[index + 1].scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            } else if (e.key === 'ArrowUp' && e.ctrlKey) {
                e.preventDefault();
                const sections = document.querySelectorAll('.detail-section');
                const currentSection = Array.from(sections).find(section => {
                    const rect = section.getBoundingClientRect();
                    return rect.top >= 0 && rect.top < window.innerHeight / 2;
                });
                if (currentSection) {
                    const index = Array.from(sections).indexOf(currentSection);
                    if (index > 0) {
                        sections[index - 1].scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            }
        }
    });

    // Focus visible states for accessibility
    const focusableElements = document.querySelectorAll(
        'a, button, [data-portal-target], .portal-close'
    );
    focusableElements.forEach(el => {
        el.addEventListener('focus', () => {
            el.classList.add('keyboard-focus');
        });
        el.addEventListener('blur', () => {
            el.classList.remove('keyboard-focus');
        });
    });
}

