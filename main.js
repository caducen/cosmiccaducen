import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createEnvironment } from './src/environment.js';
import { createWarpBubble } from './src/warpBubble.js';
import './src/portal.js'; // Initialize portal component system
import { initPortalButtons } from './src/portalButton.js'; // Initialize warp bubble portal buttons
import { initScrollAnimations } from './src/scrollAnimations.js';
import { initUIEnhancements } from './src/uiEnhancements.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;
// FIXED: Append to #app div instead of body so it respects the fixed positioning
document.querySelector('#app').appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enabled = !('ontouchstart' in window); // Disable on touch devices
controls.enableZoom = false; // Disable zoom to prevent accidental changes

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040, 2); // Soft white light
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Environment
const environment = createEnvironment(scene);

// Warp Bubble - Currently inactive/deactivated
// Uncomment below to activate warp bubble:
// const warpBubble = createWarpBubble(scene);
// warpBubble.mesh.position.z = -6;
// warpBubble.mesh.position.y = 0;
// warpBubble.mesh.position.x = 0;
// warpBubble.mesh.scale.set(4, 4, 4);

camera.position.z = 13; // Lucky 13 - perfect cosmic view

// Handle Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation Loop
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    controls.update();

    if (environment && environment.update) {
        environment.update(elapsedTime);
    }

    // Warp Bubble animation - currently inactive
    // if (warpBubble && warpBubble.update) {
    //     warpBubble.update(elapsedTime);
    //     if (warpBubble.mesh.material.uniforms.uCameraPosition) {
    //         warpBubble.mesh.material.uniforms.uCameraPosition.value.copy(camera.position);
    //     }
    // }


    renderer.render(scene, camera);
}

animate();

// Initialize portal buttons with warp bubble effect
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.portalButtons = initPortalButtons();
        initScrollAnimations(environment);
        initUIEnhancements();
    });
} else {
    window.portalButtons = initPortalButtons();
    initScrollAnimations(environment);
    initUIEnhancements();
}

// Update parallax based on scroll
let scrollParallaxTicking = false;
window.addEventListener('scroll', () => {
    if (!scrollParallaxTicking) {
        window.requestAnimationFrame(() => {
            const scrollY = window.pageYOffset || document.documentElement.scrollTop;
            if (environment && environment.scrollParallax !== undefined) {
                environment.scrollParallax = scrollY * 0.0003;
            }
            scrollParallaxTicking = false;
        });
        scrollParallaxTicking = true;
    }
}, { passive: true });
