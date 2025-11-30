# Warp Bubble Visualization Project - Current Status for Claude

## Project Overview
**Name:** warp-bubble-viz  
**Type:** Vite + Three.js 3D Visualization  
**Location:** `~/Projects/warp-bubble-viz`  
**Current Server:** Running on `localhost:5182` (or check with `lsof -ti:5173`)

## Current State - What's Active

### ✅ Currently Active in Scene:
1. **Universe Background** (`cosmic_universe.png`)
   - Position: z = -6
   - Static, no animation
   - Material: MeshBasicMaterial

2. **Caduceus Symbol** (`caduceus_isolated.png`)
   - Position: z = -5 (in front of universe)
   - **Animations:**
     - Floats up/down: `position.y = Math.sin(time * 0.2) * 0.2`
     - Pulses: `scale = 1 + sin(time * 2.0) * 0.01`
   - Material: MeshBasicMaterial (transparent)

3. **Particle System** (300 gold particles)
   - Position: Distributed randomly in 3D space
   - **Animations:**
     - Rotation: `rotation.y = -time * 0.05`, `rotation.x = time * 0.01`
     - Size pulses: `size = 0.08 + sin(time * 5.0) * 0.02`
   - Color: Gold (#ffaa00)
   - Blending: AdditiveBlending

4. **Camera**
   - Position: z = 13
   - OrbitControls enabled (for desktop, disabled on touch devices)
   - Zoom disabled

### ⏸️ Currently Inactive (Deactivated):
**Warp Bubble Sphere** - Fully implemented but commented out
- **Location:** `src/warpBubble.js` - complete shader implementation
- **Status:** Code exists and is ready, but not active in scene
- **Features when activated:**
  - Custom vertex shader with Simplex noise for "breathing" effect
  - Custom fragment shader with iridescent colors (purple, blue, pink)
  - Fresnel effect for shimmering edges
  - Transparent material (opacity 0.8)
  - Rotation animation

## How to Activate Warp Bubble

To activate the warp bubble, uncomment these sections in `main.js`:

**1. In main.js around line 34-40:**
```javascript
// Currently commented out - uncomment to activate:
const warpBubble = createWarpBubble(scene);
warpBubble.mesh.position.z = -6;
warpBubble.mesh.position.y = 0;
warpBubble.mesh.position.x = 0;
warpBubble.mesh.scale.set(4, 4, 4);
```

**2. In animation loop around line 65-71:**
```javascript
// Currently commented out - uncomment to activate:
if (warpBubble && warpBubble.update) {
    warpBubble.update(elapsedTime);
    if (warpBubble.mesh.material.uniforms.uCameraPosition) {
        warpBubble.mesh.material.uniforms.uCameraPosition.value.copy(camera.position);
    }
}
```

## Recent Changes Made

1. **Fixed shader issue:** Added `uCameraPosition` uniform to warp bubble shader
2. **Fixed environment.js:** Removed `emissive` and `emissiveIntensity` from MeshBasicMaterial (they're not supported)
3. **Position adjustments:** Tested various z-positions for optimal layering
4. **Final configuration:**
   - Camera: z = 13
   - Caduceus: z = -5
   - Universe: z = -6
   - Warp bubble: Inactive (was at z = -6 when active)

## Project Structure

```
warp-bubble-viz/
├── index.html              # Main HTML with overlay content
├── main.js                 # Three.js scene setup (warp bubble commented out)
├── style.css               # Styles for overlay (opacity normal)
├── package.json            # Dependencies: Three.js, Vite
├── src/
│   ├── environment.js     # Creates universe, Caduceus, particles
│   ├── warpBubble.js       # Warp bubble shader implementation (ready but inactive)
│   └── [other files]
└── public/                 # Assets (images, textures)
```

## Key Files

### `main.js`
- Sets up Three.js scene, camera, renderer
- Creates environment (universe, Caduceus, particles)
- Warp bubble code is commented out but preserved
- Animation loop updates environment and (if active) warp bubble

### `src/environment.js`
- `createEnvironment(scene)` - Creates all active scene elements
- Returns update function for animations
- Current positions: Universe z=-6, Caduceus z=-5

### `src/warpBubble.js`
- `createWarpBubble(scene)` - Creates warp bubble with custom shaders
- Returns mesh and update function
- Currently not called/used in main.js

## Current Visual Result

- **Background:** Static cosmic universe image
- **Foreground:** Pulsing, floating Caduceus symbol
- **Ambiance:** 300 floating gold particles creating "star dust" effect
- **Interaction:** Camera can be rotated with mouse (OrbitControls)
- **Overlay:** Philosophical text content about consciousness, quantum mechanics

## Notes for Collaboration

1. **Warp bubble is ready** - All code exists and works, just needs to be uncommented
2. **Shader is complete** - Includes Simplex noise, Fresnel effect, iridescent colors
3. **Position tested** - Various z-positions were tested; current inactive state uses original positions
4. **No errors** - All Three.js warnings have been resolved

## Next Steps (If Needed)

- Activate warp bubble by uncommenting code
- Adjust warp bubble size/position if needed
- Modify shader parameters for different visual effects
- Add more interactive elements
- Enhance particle system

---

**Status:** Project is stable, all active elements working correctly. Warp bubble is preserved and ready for future activation.

