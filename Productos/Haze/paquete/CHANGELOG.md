# Changelog

All notable changes to Lustre. Versions follow [semver](https://semver.org/).

---

## 1.0.0 — 2026-08-09

First release.

### Motifs
- **`caustics`** — the edge set of two moving Voronoi networks at different
  scales, bent by a slow noise field the way water bends light. Where the
  networks cross the light adds up; each colour channel draws the lines a
  touch wider or thinner for the rainbow fringe of real caustics.
- **`silk`** — a height field of long, curving folds with creased troughs,
  lit as satin: deep shade in the troughs, a sharp sheen on the crests, and
  shot-silk colour that turns with the angle of the cloth.
- **`chrome`** — a smooth swell of crossing waves differentiated into a normal,
  reflecting a studio built from the palette (sky, floor, hard horizon, two
  soft-boxes). The hard edges of that studio keep the reflections crisp.
- A soft shoulder at white in the shared finish, so bright light never burns
  into flat blobs whatever the palette.

### Core
- One fragment shader over one full-screen triangle: a single draw call per
  frame, nothing allocated after setup.
- `energy` (0–1): the water roughens, the silk folds deeper, chrome swells. Eased, so raw
  scroll values can be fed to it every frame.
- Pointer parallax with its own easing, independent of energy.
- Switching motif rebuilds only the shader program — the canvas, the buffer and
  the GL context are kept.

### Integration
- `dist/lustre.js` — classic `<script>`, exposes `window.Lustre`, auto-initialises
  `[data-lustre]` elements.
- `dist/lustre.esm.js` — ES module for bundlers.
- `dist/Lustre.framer.tsx` — a Framer code component with the engine inlined and
  every option in the properties panel (colour styles included). Paints a
  still frame on the Framer canvas, animates in preview and on the site.
- `react/Lustre.jsx` — React wrapper with a ref API, SSR-safe, tears down on
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
