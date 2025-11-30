# CosmicCaducen.com - A Field of Frequency

A cosmic, immersive website exploring consciousness as a field of frequency, featuring interactive 3D graphics, depth portals, and philosophical content.

## 🌌 Features

- **3D Cosmic Scene**: Three.js-powered universe background with Caduceus symbol and floating particles
- **Interactive Portals**: Clickable warp bubble buttons that expand to reveal detailed content
- **Scroll Animations**: Smooth fade-in animations as content enters the viewport
- **Parallax Effects**: 3D scene responds to scroll for immersive depth
- **Mobile Responsive**: Fully responsive design with hamburger menu for mobile devices
- **Accessibility**: Keyboard navigation, ARIA labels, and focus states
- **Performance Optimized**: Uses Intersection Observer for efficient scroll handling

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The site will be available at `http://localhost:5173` (or the next available port).

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
warp-bubble-viz/
├── index.html          # Main HTML file
├── main.js             # Three.js scene setup and initialization
├── style.css           # Global styles
├── src/
│   ├── environment.js      # Universe background, Caduceus, particles
│   ├── warpBubble.js       # Warp bubble shader effect (currently inactive)
│   ├── portal.js           # Portal component system
│   ├── portalButton.js     # Mini warp bubble buttons for portals
│   ├── scrollAnimations.js # Scroll-triggered animations
│   └── uiEnhancements.js   # UI enhancements (loading, back-to-top, etc.)
└── public/
    ├── cosmic_universe.png  # Universe background image
    └── caduceus_isolated.png # Caduceus symbol
```

## 🎨 Key Technologies

- **Three.js**: 3D graphics and WebGL rendering
- **Vite**: Build tool and development server
- **Vanilla JavaScript**: No frameworks, pure JS for performance
- **CSS3**: Modern CSS with animations and backdrop filters

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Sections

- **The Source**: Philosophy of consciousness and panpsychism
- **The Bridge**: Quantum mechanics and consciousness theories
- **The Receiver**: The brain as a receiver of consciousness

## 📝 Notes

- The main warp bubble is currently inactive but can be activated by uncommenting code in `main.js`
- Portal buttons use mini Three.js scenes for the warp bubble effect
- All animations respect `prefers-reduced-motion` for accessibility

## 📄 License

Copyright © 2025 Aethereal. All rights reserved.

