/**
 * Portal Component - Expandable content overlay
 * Usage: Add data-portal-target="unique-id" to trigger button
 *       Add id="unique-id" to portal content container
 */

class Portal {
    constructor() {
        this.activePortal = null;
        this.init();
    }

    init() {
        // Find all portal triggers
        const triggers = document.querySelectorAll('[data-portal-target]');
        
        triggers.forEach(trigger => {
            // Ensure minimum 44px touch target
            this.ensureTouchTarget(trigger);
            
            // Click handler
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const targetId = trigger.getAttribute('data-portal-target');
                this.open(targetId);
            });

            // Keyboard support (Enter and Space keys)
            trigger.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.stopPropagation();
                    const targetId = trigger.getAttribute('data-portal-target');
                    this.open(targetId);
                }
            });
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.activePortal) {
                this.close();
            }
        });
    }

    ensureTouchTarget(element) {
        const rect = element.getBoundingClientRect();
        const minSize = 44;
        
        if (rect.width < minSize || rect.height < minSize) {
            const padding = Math.max(0, (minSize - rect.width) / 2, (minSize - rect.height) / 2);
            element.style.padding = `${padding}px`;
        }
    }

    open(targetId) {
        // Close any existing portal
        if (this.activePortal) {
            this.close();
        }

        const portalContent = document.getElementById(targetId);
        if (!portalContent) {
            console.warn(`Portal target not found: ${targetId}`);
            return;
        }

        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'portal-overlay';
        overlay.setAttribute('aria-hidden', 'false');
        
        // Create portal container
        const container = document.createElement('div');
        container.className = 'portal-container';
        container.setAttribute('role', 'dialog');
        container.setAttribute('aria-modal', 'true');
        container.setAttribute('aria-labelledby', `${targetId}-title`);

        // Clone content
        const content = portalContent.cloneNode(true);
        content.id = `${targetId}-content`;
        content.className = 'portal-content';
        // Remove display: none from cloned content so it's visible in portal
        content.style.display = '';

        // Create close button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'portal-close';
        closeBtn.innerHTML = '✕';
        closeBtn.setAttribute('aria-label', 'Close portal');
        closeBtn.setAttribute('type', 'button');
        this.ensureTouchTarget(closeBtn);
        
        closeBtn.addEventListener('click', () => this.close());
        
        // Keyboard support for close button
        closeBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.close();
            }
        });

        // Assemble structure
        container.appendChild(closeBtn);
        container.appendChild(content);
        overlay.appendChild(container);
        document.body.appendChild(overlay);

        // Store reference
        this.activePortal = overlay;
        this.activeContent = content;

        // Trigger animation
        requestAnimationFrame(() => {
            overlay.classList.add('portal-open');
            container.classList.add('portal-container-open');
        });

        // Close on overlay click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.close();
            }
        });

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    close() {
        if (!this.activePortal) return;

        const overlay = this.activePortal;
        const container = overlay.querySelector('.portal-container');

        // Trigger close animation
        overlay.classList.remove('portal-open');
        container.classList.remove('portal-container-open');

        // Remove after animation
        setTimeout(() => {
            overlay.remove();
            document.body.style.overflow = '';
            this.activePortal = null;
            this.activeContent = null;
        }, 300);
    }
}

// Initialize portal system when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.portal = new Portal();
    });
} else {
    window.portal = new Portal();
}

export default Portal;

