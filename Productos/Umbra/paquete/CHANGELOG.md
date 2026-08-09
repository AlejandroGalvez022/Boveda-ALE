# Changelog

All notable changes to Umbra. Versions follow [semver](https://semver.org/).

---

## 1.0.0 — 2026-08-09

First release.

### Core
- Single fragment shader over one full-screen triangle: one draw call per frame,
  nothing allocated after setup.
- Eclipse disc with a noise-perturbed rim, so it never reads as a plain circle.
- Corona coloured by angle from a four-stop palette, modulated by five-octave fBm.
- Three orbital rings with dots running at different speeds.
- Twinkling starfield, film grain, radial vignette.
- `open` aperture (0–1): the disc shrinks and the corona swells. Eased, so raw
  scroll values can be fed to it every frame.
- Pointer parallax with its own easing, independent of the aperture.

### Integration
- `dist/umbra.js` — classic `<script>`, exposes `window.Umbra`, auto-initialises
  `[data-umbra]` elements.
- `dist/umbra.esm.js` — ES module for bundlers.
- `react/Umbra.jsx` — React wrapper with a ref API, SSR-safe, tears down on
  unmount. Structural options rebuild; cosmetic ones update in place.
- Seven presets: eclipse, solar, nebula, ice, ember, toxic, mono.
- Per-breakpoint mobile overrides.

### Robustness
- CSS fallback when WebGL is missing or the shader will not compile, with an
  `onFallback` callback carrying the reason.
- `prefers-reduced-motion`: one still frame, no loop ever started.
- Pauses off-screen (`IntersectionObserver`) and on hidden tabs.
- `ResizeObserver` on the container, so it works inside page builders.
- Device-pixel-ratio cap, configurable.
- `destroy()` releases listeners, the frame loop, GL program, buffer and context.
- Radius measured against container **height**, so the composition survives
  resizes rather than drifting off the edge.

### Verified
Chromium via DevTools Protocol at 360 / 390 / 768 / 1280 / 1440 / 1920:
no console errors, no horizontal overflow, canvas correctly sized at every
width, fallback confirmed with WebGL disabled, and reduced motion confirmed to
draw exactly one frame.
