# Lustre — API reference

## Constructor

```js
new Lustre(target, options)
```

| Argument | Type | Notes |
|---|---|---|
| `target` | `string \| Element` | CSS selector or element. Throws if not found. |
| `options` | `object` | All optional. |

The canvas is inserted as the **first child** of the target, absolutely
positioned to fill it. A `position: static` target is promoted to `relative` so
the canvas has something to anchor to.

**Give the target a height.** A `div` with no height renders a 0-pixel canvas
and you will think the library is broken.

---

## Options

### Motif and palette

| Option | Default | What it does |
|---|---|---|
| `motif` | `'caustics'` | `caustics` · `silk` · `chrome`. Changing it rebuilds the shader; the canvas and GL context are kept. |
| `palette` | `null` | `lagoon` · `dusk` · `forest` · `steel` · `magma` · `violet` · `mono`. Shorthand for `colors` + `background`. Anything passed alongside it wins. |
| `colors` | lagoon | Four stops: 0 is the highlight, 3 the deep shade. `#rgb`, `#rrggbb`, `rgb()` or `[r,g,b]` 0-255. |
| `background` | `'#030a14'` | The void behind everything. Also set on the element, so the page never flashes white. |

### Form

| Option | Default | Range | What it does |
|---|---|---|---|
| `scale` | `1` | 0.35–3 | Zoom. **Smaller means bigger shapes.** |
| `energy` | `0.5` | 0–1 | How alive the surface is. The one to drive from scroll. |
| `contrast` | `1` | 0.3–2 | Overall punch. Drop it when text sits on top. |

What `energy` does per motif:

| | |
|---|---|
| `caustics` | The water gets rougher: lines bend more, widen and brighten. |
| `silk` | The folds deepen, the cloth drifts more and the sheen sharpens. |
| `chrome` | The swell gets deeper, so the reflections bend harder. |

### Motion and texture

| Option | Default | Range | What it does |
|---|---|---|---|
| `speed` | `1` | 0–3 | Time multiplier. `0` freezes it, still fully rendered. |
| `grain` | `0.03` | 0–0.12 | Per-pixel film grain. Kills gradient banding — leave a little on. |
| `vignette` | `0.35` | 0–0.9 | Darkens the corners. Raise it to protect text near the edges. |
| `mouse` | `0.10` | 0–0.4 | Pointer parallax. `0` skips the listener entirely. |
| `intro` | `true` | | Fade up from the background on first paint. |
| `startAt` | `6` | seconds | Where in the loop the first frame lands. Also the still frame shown to reduced-motion users, so pick one you like. |

### Performance and behaviour

| Option | Default | What it does |
|---|---|---|
| `quality` | `1.75` | Device-pixel-ratio cap. `1` is noticeably faster on 4K screens. |
| `pauseOffscreen` | `true` | Stops rendering when the element leaves the viewport. |
| `respectReducedMotion` | `true` | With `prefers-reduced-motion`, paints one still frame and never loops. |
| `onFallback` | — | `(reason) => {}` when WebGL is unavailable. `'webgl-unavailable'`, `'shader-compile'`, `'program-link'`. |

### Mobile overrides

| Option | Default |
|---|---|
| `mobileBreakpoint` | `700` |
| `mobile` | `{ scale: 1.35, quality: 1.5 }` |

When the container is at or below the breakpoint, `mobile.scale` **multiplies**
your `scale` (so `scale: 0.6` becomes `0.81` on a phone, never a fixed `1.35`),
and any other key in `mobile` replaces the top-level one. Pass `mobile: {}` to
disable.

---

## Methods

```js
lustre.set(options)       // change anything except structural flags. Chainable.
lustre.energy(0.8)        // 0–1. Eases towards the value.
lustre.motif('chrome')    // rebuild the shader, keep the context
lustre.palette('magma')   // swap four colours + background
lustre.play()             // resume (and let off-screen pausing take over again)
lustre.pause()            // stop the frame loop. Stays paused until play(),
                        // even if the element scrolls back into view
lustre.destroy()          // remove listeners, loop, GL resources and canvas
```

All chainable except `destroy()`.

`set()` re-parses colours once and re-uploads uniforms — cheap enough to call
from a slider handler, which is exactly what the demo does.

---

## Properties

| | |
|---|---|
| `lustre.o` | Live options object (read it, do not mutate it — use `set()`). |
| `lustre.canvas` | The canvas, or `null` in fallback mode. |
| `lustre.gl` | The WebGL context, or `null`. |
| `lustre.destroyed` | `true` after `destroy()`. |
| `lustre.fallbackReason` | Why it fell back, if it did. |
| `Lustre.motifs` | `['caustics','silk','chrome']` |
| `Lustre.palettes` | The palette table. |
| `Lustre.version` | `'1.0.0'` |

---

## Auto-init (no JavaScript)

The `<script>` build scans for `[data-lustre]` on load and starts each one.
Attributes are camel-cased from `data-lustre-*`; numbers and booleans are
converted for you.

```html
<div data-lustre
     data-lustre-motif="silk"
     data-lustre-palette="dusk"
     data-lustre-scale="0.9"
     data-lustre-colors="#fff,#8ab,#46f,#204"
     style="height:100svh"></div>
```

The instance is stashed on the element as `el.__lustre` if you need it later. For
content added after load (page builders, modals), call `Lustre.autoInit(container)`
yourself — already-initialised elements are skipped.

---

## Notes worth knowing

- **One instance per element.** Two on the same node will fight over the canvas.
- **Many instances per page is fine.** They pause when off-screen, so a grid of
  cards costs roughly what one costs.
- **In React, always `destroy()` on unmount.** The included wrapper does it.
- **`speed: 0` still renders** a full, correct frame — it just stops moving.
- **`scale` is inverted from what you might expect:** smaller number, bigger
  shapes. It is a zoom factor on the coordinate space, not a size.
- **The shaders are yours.** `src/lustre.js` is commented and each motif is a
  separate string in the `MOTIFS` table. Add a fourth one — the engine will
  pick it up with no other changes.
