import * as THREE from 'three';

const vertexShader = `
uniform float uTime;
varying vec2 vUv;

void main() {
  vUv = uv;
  
  // Subtle distortion for "bending walls"
  vec3 newPosition = position;
  newPosition.x += sin(position.y * 0.5 + uTime * 0.5) * 0.5;
  newPosition.y += cos(position.x * 0.5 + uTime * 0.5) * 0.5;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D uTexture;
varying vec2 vUv;

void main() {
  vec4 color = texture2D(uTexture, vUv);
  gl_FragColor = color;
}
`;

export function createEnvironment(scene) {
    const textureLoader = new THREE.TextureLoader();

    // LAYER 1: Static Universe Background (far back)
    // REMOVED: Background layer removed for more subtle design
    // If you want to restore it, uncomment the code below and set backgroundType and backgroundSource
    /*
    const backgroundType = 'image'; // or 'video'
    const backgroundSource = '/your-background.png'; // or '/your-video.mp4'
    
    const universeGeometry = new THREE.PlaneGeometry(35, 22);
    
    let universeTexture;
    
    if (backgroundType === 'video') {
        const video = document.createElement('video');
        video.src = backgroundSource;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.play().catch(err => console.log('Video autoplay prevented:', err));
        
        universeTexture = new THREE.VideoTexture(video);
        universeTexture.minFilter = THREE.LinearFilter;
        universeTexture.magFilter = THREE.LinearFilter;
    } else {
        universeTexture = textureLoader.load(backgroundSource);
    }
    
    universeTexture.colorSpace = THREE.SRGBColorSpace;
    const universeMaterial = new THREE.MeshBasicMaterial({
        map: universeTexture,
        side: THREE.DoubleSide
    });
    const universeMesh = new THREE.Mesh(universeGeometry, universeMaterial);
    universeMesh.position.z = -6;
    scene.add(universeMesh);
    
    if (backgroundType === 'video') {
        universeMesh.userData.video = video;
    }
    */

    // LAYER 2: Pulsing Caduceus (foreground)
    // Corrected back to square aspect ratio to preserve sacred geometry circles
    const caduceusSize = 22.5; // 75% of original 30, maintaining 1:1 ratio
    const caduceusGeometry = new THREE.PlaneGeometry(caduceusSize, caduceusSize);
    const caduceusTexture = textureLoader.load('/caduceus_isolated.png');
    caduceusTexture.colorSpace = THREE.SRGBColorSpace;
    const caduceusMaterial = new THREE.MeshBasicMaterial({
        map: caduceusTexture,
        side: THREE.DoubleSide,
        transparent: true
    });
    const caduceusMesh = new THREE.Mesh(caduceusGeometry, caduceusMaterial);
    caduceusMesh.position.z = -5; // Back to original position - in front of universe
    scene.add(caduceusMesh);

    // Add some floating particles for "star dust" effect
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 300; // Increased count
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 20;
    }

    // Generate a simple circle texture for particles
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const context = canvas.getContext('2d');
    context.beginPath();
    context.arc(16, 16, 16, 0, Math.PI * 2);
    context.fillStyle = '#ffffff';
    context.fill();
    const particleTexture = new THREE.CanvasTexture(canvas);

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.15, // Slightly larger since it's a soft circle now
        color: 0xffaa00, // Deeper, richer Gold
        map: particleTexture,
        transparent: true,
        opacity: 0.9, // More visible
        blending: THREE.AdditiveBlending,
        depthWrite: false // Fix transparency sorting issues
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    const environmentObj = {
        mesh: caduceusMesh,
        particles: particlesMesh,
        scrollParallax: 0, // Will be updated by scroll handler
        update: function(time) {

            // Universe stays completely still (no animation)

            // Only the Caduceus floats and pulses
            caduceusMesh.position.y = Math.sin(time * 0.2) * 0.2;

            // Pulse effect for "Frequency" - only on the Caduceus
            const pulse = 1 + Math.sin(time * 2.0) * 0.01;
            caduceusMesh.scale.set(pulse, pulse, 1);

            // Particles drift and pulse with parallax influence
            const parallaxRotation = this.scrollParallax || 0;
            particlesMesh.rotation.y = -time * 0.05 + parallaxRotation * 0.5;
            particlesMesh.rotation.x = time * 0.01 + parallaxRotation * 0.3;
            particlesMaterial.size = 0.08 + Math.sin(time * 5.0) * 0.02;
        }
    };

    return environmentObj;
}
