# Warp Bubble Visualization Project - Project Summary for Claude

## Project Overview
**Name:** warp-bubble-viz  
**Type:** Vite + Three.js 3D Visualization  
**Location:** `~/Projects/warp-bubble-viz`  
**Status:** Running on localhost:5173

## Project Purpose
A 3D web visualization exploring concepts of consciousness, quantum mechanics, and the "Field of Frequency" through an interactive warp bubble visualization. The project combines:
- Three.js 3D graphics with custom shaders
- Philosophical content about Panpsychism, Orch-OR theory, and consciousness
- An immersive cosmic environment with Caduceus imagery

## Tech Stack
- **Build Tool:** Vite 7.2.4
- **3D Library:** Three.js 0.181.2
- **Language:** JavaScript (ES Modules)
- **Styling:** CSS

## Project Structure

```
warp-bubble-viz/
├── index.html              # Main HTML file with overlay content
├── main.js                 # Three.js scene setup and animation loop
├── style.css               # Main stylesheet
├── package.json            # Project dependencies and scripts
├── public/                 # Static assets
│   ├── bedroom.png
│   ├── caduceus_bg.png
│   ├── caduceus_isolated.png
│   ├── cosmic_bg.png
│   ├── cosmic_universe.png
│   └── vite.svg
└── src/                    # Source files
    ├── environment.js      # Creates 3D environment (universe, Caduceus, particles)
    ├── warpBubble.js       # Warp bubble shader implementation with Simplex noise
    ├── counter.js          # Counter component (legacy)
    ├── main.js             # Alternative entry point (legacy)
    └── style.css           # Additional styles
```

## Key Files Explained

### 1. `index.html`
- Contains the full HTML structure with philosophical content
- Three main sections: "The Source", "The Bridge", "The Receiver"
- Overlay content about consciousness, quantum mechanics, and the brain as a receiver
- References `/main.js` as the entry point

### 2. `main.js` (Root)
- Sets up Three.js scene, camera, renderer
- Imports `createEnvironment` from `src/environment.js`
- Configures OrbitControls for camera interaction
- Animation loop that updates environment
- Appends renderer to `#app` div

### 3. `src/environment.js`
- Creates layered 3D environment:
  - **Layer 1:** Static universe background (`cosmic_universe.png`) at z=-6
  - **Layer 2:** Pulsing Caduceus (`caduceus_isolated.png`) at z=-5
  - **Particles:** 300 floating gold particles for "star dust" effect
- Returns update function for animations (pulsing, floating, particle rotation)

### 4. `src/warpBubble.js`
- Exports `createWarpBubble(scene)` function
- Custom shader material with:
  - **Vertex Shader:** Simplex noise-based vertex displacement for "breathing" effect
  - **Fragment Shader:** Iridescent colors (purple, blue, pink) with Fresnel effect
- Creates a sphere geometry (1.5 radius, 64x64 segments)
- Updates rotation and time uniform in animation loop

### 5. `style.css`
- Styles for the overlay content
- Hero section, navigation, content columns
- Scroll indicators and detail sections
- Responsive design considerations

## Current Features
- ✅ 3D cosmic environment with universe background
- ✅ Animated Caduceus symbol with pulsing effect
- ✅ Floating particle system (star dust)
- ✅ Warp bubble shader (defined but not currently used in main.js)
- ✅ Philosophical content overlay
- ✅ Responsive design
- ✅ OrbitControls for camera interaction

## Dependencies
```json
{
  "dependencies": {
    "three": "^0.181.2"
  },
  "devDependencies": {
    "vite": "^7.2.4"
  }
}
```

## Scripts
- `npm run dev` - Start development server (localhost:5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Notes for Collaboration
1. **Warp Bubble:** The `createWarpBubble` function exists but is not currently imported/used in `main.js`. This could be integrated.
2. **Content:** The HTML contains extensive philosophical content about consciousness that could be enhanced or expanded.
3. **Visual Effects:** The project uses custom shaders for visual effects - opportunities for enhancement.
4. **Interactivity:** Currently uses OrbitControls - could add more interactive elements.

## File Locations (Full Paths)
- Project Root: `/Users/oscarcaducen/Projects/warp-bubble-viz/`
- Main Entry: `/Users/oscarcaducen/Projects/warp-bubble-viz/main.js`
- HTML: `/Users/oscarcaducen/Projects/warp-bubble-viz/index.html`

## Current State
- ✅ All files present and verified
- ✅ Dependencies installed
- ✅ Development server running successfully
- ✅ No errors detected

---

**Ready for collaboration!** Claude can now understand the project structure and help co-create enhancements.

