# Haze — API reference

## Constructor

```js
new Haze(target, options)
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
| `motif` | `'caustics'` | `caustics` · `ribbons` · `chrome`. Changing it rebuilds the shader; the canvas and GL context are kept. |
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
| `ribbons` | Ribbons widen, spread apart and the folds flare. |
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

Any key in `mobile` replaces the top-level one when the container is at or below
the breakpoint. Pass `mobile: {}` to disable.

---

## Methods

```js
haze.set(options)       // change anything except structural flags. Chainable.
haze.energy(0.8)        // 0–1. Eases towards the value.
haze.motif('chrome')    // rebuild the shader, keep the context
haze.palette('magma')   // swap four colours + background
haze.play()             // resume (and let off-screen pausing take over again)
haze.pause()            // stop the frame loop. Stays paused until play(),
                        // even if the element scrolls back into view
haze.destroy()          // remove listeners, loop, GL resources and canvas
```

All chainable except `destroy()`.

`set()` re-parses colours once and re-uploads uniforms — cheap enough to call
from a slider handler, which is exactly what the demo does.

---

## Properties

| | |
|---|---|
| `haze.o` | Live options object (read it, do not mutate it — use `set()`). |
| `haze.canvas` | The canvas, or `null` in fallback mode. |
| `haze.gl` | The WebGL context, or `null`. |
| `haze.destroyed` | `true` after `destroy()`. |
| `haze.fallbackReason` | Why it fell back, if it did. |
| `Haze.motifs` | `['caustics','ribbons','chrome']` |
| `Haze.palettes` | The palette table. |
| `Haze.version` | `'1.0.0'` |

---

## Auto-init (no JavaScript)

The `<script>` build scans for `[data-haze]` on load and starts each one.
Attributes are camel-cased from `data-haze-*`; numbers and booleans are
converted for you.

```html
<div data-haze
     data-haze-motif="ribbons"
     data-haze-palette="dusk"
     data-haze-scale="0.9"
     data-haze-colors="#fff,#8ab,#46f,#204"
     style="height:100svh"></div>
```

The instance is stashed on the element as `el.__haze` if you need it later. For
content added after load (page builders, modals), call `Haze.autoInit(container)`
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
- **The shaders are yours.** `src/haze.js` is commented and each motif is a
  separate string in the `MOTIFS` table. Add a fourth one — the engine will
  pick it up with no other changes.
