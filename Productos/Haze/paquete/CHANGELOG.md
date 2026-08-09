# Changelog

All notable changes to Haze. Versions follow [semver](https://semver.org/).

---

## 1.0.0 — 2026-08-09

First release.

### Motifs
- **`caustics`** — two layers of fBm, the second warped by the first, folded
  around the midpoint and raised to a high power so only the thin bright
  filaments survive. A second, slower set is mixed in so the pattern never
  reads as a single tiling.
- **`ribbons`** — four bands of light on a domain-warped coordinate, each with
  its own drift, phase and breathing thickness, plus a soft bloom around each.
- **`chrome`** — an fBm height field differentiated into a surface normal; the
  reflected ray reads the palette as if it were an environment map. Specular
  highlight and a Fresnel edge, no textures and no light sources.

### Core
- One fragment shader over one full-screen triangle: a single draw call per
  frame, nothing allocated after setup.
- `energy` (0–1): caustics sharpen, ribbons swell, chrome melts. Eased, so raw
  scroll values can be fed to it every frame.
- Pointer parallax with its own easing, independent of energy.
- Switching motif rebuilds only the shader program — the canvas, the buffer and
  the GL context are kept.

### Integration
- `dist/haze.js` — classic `<script>`, exposes `window.Haze`, auto-initialises
  `[data-haze]` elements.
- `dist/haze.esm.js` — ES module for bundlers.
- `react/Haze.jsx` — React wrapper with a ref API, SSR-safe, tears down on
  unmount. Structural options rebuild; cosmetic ones update in place.
- Seven palettes: lagoon, dusk, forest, steel, magma, violet, mono.
- Per-breakpoint mobile overrides.

### Robustness
- CSS fallback when WebGL is missing or the shader will not compile, drawn to
  match whichever motif was requested, with an `onFallback` callback carrying
  the reason.
- `prefers-reduced-motion`: one still frame, no loop ever started.
- Pauses off-screen (`IntersectionObserver`) and on hidden tabs.
- `ResizeObserver` on the container, so it works inside page builders.
- Device-pixel-ratio cap, configurable.
- `destroy()` releases listeners, the frame loop, GL program, buffer and context.

### Verified
Chromium via DevTools Protocol at 360 / 390 / 768 / 1280 / 1440 / 1920: no
console errors, no horizontal overflow, canvas correctly sized at every width.
Each motif confirmed to paint something structurally different from the others,
palettes confirmed to change the painted pixels, energy confirmed to change the
image, fallback confirmed with WebGL disabled, and reduced motion confirmed to
draw exactly one frame.
