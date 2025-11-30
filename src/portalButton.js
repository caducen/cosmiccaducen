/**
 * Portal Button Component - Mini Warp Bubble Buttons
 * Creates small animated warp bubble buttons for portal triggers
 */

import * as THREE from 'three';
import { createWarpBubble } from './warpBubble.js';

class PortalButton {
    constructor(buttonElement) {
        this.buttonElement = buttonElement;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.warpBubble = null;
        this.animationId = null;
        this.clock = new THREE.Clock();
        this.init();
    }

    init() {
        // Get button dimensions - 10px size as requested
        const size = 10;
        const canvasSize = size * 4; // Higher resolution for quality (40px canvas for 10px display)
        
        // Create small canvas for warp bubble
        const canvas = document.createElement('canvas');
        canvas.width = canvasSize;
        canvas.height = canvasSize;
        canvas.style.width = `${size}px`;
        canvas.style.height = `${size}px`;
        canvas.style.position = 'absolute';
        canvas.style.top = '50%';
        canvas.style.left = '50%';
        canvas.style.transform = 'translate(-50%, -50%)';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '1';
        canvas.style.borderRadius = '50%'; // Make canvas circular
        canvas.style.overflow = 'hidden'; // Clip to circle
        
        // Create click indicator symbol (small "+" icon)
        const indicator = document.createElement('div');
        indicator.className = 'portal-indicator';
        indicator.style.position = 'absolute';
        indicator.style.top = '50%';
        indicator.style.left = '50%';
        indicator.style.transform = 'translate(-50%, -50%)';
        indicator.style.zIndex = '2';
        indicator.style.pointerEvents = 'none';
        indicator.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        // Use "+" symbol
        indicator.innerHTML = '+';
        indicator.style.width = 'auto';
        indicator.style.height = 'auto';
        indicator.style.background = 'transparent';
        indicator.style.color = 'rgba(255, 255, 255, 0.95)';
        indicator.style.fontSize = '14px'; // Doubled from 7px to 14px
        indicator.style.fontWeight = '300';
        indicator.style.lineHeight = '1';
        indicator.style.textShadow = '0 0 3px rgba(212, 175, 55, 0.9), 0 0 6px rgba(212, 175, 55, 0.5)';
        indicator.style.fontFamily = 'system-ui, -apple-system, sans-serif';
        
        // Clear button background and add canvas and indicator
        this.buttonElement.style.background = 'transparent';
        this.buttonElement.style.border = 'none';
        this.buttonElement.style.position = 'relative';
        this.buttonElement.style.overflow = 'hidden'; // Clip button to circle too
        this.buttonElement.style.borderRadius = '50%'; // Make button circular
        this.buttonElement.appendChild(canvas);
        this.buttonElement.appendChild(indicator);
        
        // Store indicator for hover effects
        this.indicator = indicator;

        // Create Three.js scene
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000); // FOV for good view
        this.camera.position.z = 1.8; // Position camera to see the sphere clearly with all colors visible
        
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true,
            preserveDrawingBuffer: false
        });
        this.renderer.setSize(canvasSize, canvasSize);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance
        this.renderer.setClearColor(0x000000, 0); // Transparent background
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;

        // Create mini warp bubble - scale to fill the button nicely
        this.warpBubble = createWarpBubble(this.scene);
        // Scale to 0.44 as requested
        this.warpBubble.mesh.scale.set(0.44, 0.44, 0.44);
        this.warpBubble.mesh.position.set(0, 0, 0);
        
        // Add lighting for better visibility
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
        this.scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0xffffff, 1, 10);
        pointLight.position.set(2, 2, 2);
        this.scene.add(pointLight);
        
        // Add rotation animation
        this.animate();
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        
        const elapsedTime = this.clock.getElapsedTime();
        
        // Rotate the warp bubble slowly
        if (this.warpBubble && this.warpBubble.mesh) {
            this.warpBubble.mesh.rotation.y = elapsedTime * 0.5; // Slow rotation
            this.warpBubble.mesh.rotation.x = Math.sin(elapsedTime * 0.3) * 0.2; // Gentle wobble
            
            // Update warp bubble animation
            if (this.warpBubble.update) {
                this.warpBubble.update(elapsedTime);
            }
            
            // Update camera position uniform for shader (critical for fresnel effect)
            if (this.warpBubble.mesh.material && 
                this.warpBubble.mesh.material.uniforms && 
                this.warpBubble.mesh.material.uniforms.uCameraPosition) {
                this.warpBubble.mesh.material.uniforms.uCameraPosition.value.copy(this.camera.position);
            }
            
            // Ensure time uniform is updated
            if (this.warpBubble.mesh.material && 
                this.warpBubble.mesh.material.uniforms && 
                this.warpBubble.mesh.material.uniforms.uTime) {
                this.warpBubble.mesh.material.uniforms.uTime.value = elapsedTime;
            }
        }
        
        this.renderer.render(this.scene, this.camera);
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.renderer) {
            this.renderer.dispose();
        }
        if (this.warpBubble && this.warpBubble.mesh) {
            this.scene.remove(this.warpBubble.mesh);
            if (this.warpBubble.mesh.geometry) {
                this.warpBubble.mesh.geometry.dispose();
            }
            if (this.warpBubble.mesh.material) {
                this.warpBubble.mesh.material.dispose();
            }
        }
    }
}

export function initPortalButtons() {
    const portalButtons = [];
    const triggers = document.querySelectorAll('[data-portal-target]');
    
    triggers.forEach(trigger => {
        const portalButton = new PortalButton(trigger);
        portalButtons.push(portalButton);
        
        // Add hover effects to show interactivity
        trigger.addEventListener('mouseenter', () => {
            if (portalButton.indicator) {
                portalButton.indicator.style.opacity = '1';
                portalButton.indicator.style.transform = 'translate(-50%, -50%) scale(1.2)';
            }
        });
        
        trigger.addEventListener('mouseleave', () => {
            if (portalButton.indicator) {
                portalButton.indicator.style.opacity = '0.8';
                portalButton.indicator.style.transform = 'translate(-50%, -50%) scale(1)';
            }
        });
    });
    
    return portalButtons;
}

export default PortalButton;

