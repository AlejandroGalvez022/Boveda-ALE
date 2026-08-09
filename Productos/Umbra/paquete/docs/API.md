# Umbra — API reference

## Constructor

```js
new Umbra(target, options)
```

| Argument | Type | Notes |
|---|---|---|
| `target` | `string \| Element` | CSS selector or element. Throws if not found. |
| `options` | `object` | All optional. See below. |

The canvas is inserted as the **first child** of the target, absolutely
positioned to fill it. If the target is `position: static` it is promoted to
`relative` so the canvas has something to anchor to.

**Give the target a height.** A `div` with no height renders a 0-pixel canvas
and you will think the library is broken.

---

## Options

### Palette

| Option | Default | What it does |
|---|---|---|
| `preset` | `null` | `eclipse` · `solar` · `nebula` · `ice` · `ember` · `toxic` · `mono`. Shorthand for `colors` + `background`. Anything you pass alongside it wins. |
| `colors` | eclipse palette | Four colours, corona centre → outer edge. `#rgb`, `#rrggbb`, `rgb()` or `[r,g,b]` 0-255. |
| `background` | `'#08080b'` | The void behind everything. Also set on the element, so the page never flashes white. |

### Shape

| Option | Default | Range | What it does |
|---|---|---|---|
| `x` | `0.5` | 0–1 | Disc centre across the container. |
| `y` | `0.45` | 0–1 | Disc centre down the container. |
| `radius` | `0.30` | 0.05–0.6 | **Relative to container height**, so the composition survives resizes. |
| `open` | `0` | 0–1 | Aperture. Disc shrinks, corona swells. The one to drive from scroll. |

### Motion and texture

| Option | Default | Range | What it does |
|---|---|---|---|
| `speed` | `1` | 0–3 | Time multiplier. `0` freezes it, still fully rendered. |
| `orbits` | `0.8` | 0–2 | Three rings of dots circling the disc. `0` removes them. |
| `stars` | `0.8` | 0–2 | Twinkling starfield density. |
| `grain` | `0.03` | 0–0.12 | Per-pixel film grain. Kills gradient banding — leave a little on. |
| `vignette` | `0.35` | 0–0.9 | Darkens the corners. Raise it to protect text near the edges. |
| `mouse` | `0.12` | 0–0.4 | Pointer parallax. `0` skips the listener entirely. |
| `intro` | `true` | | Fade up from the background on first paint. |

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
| `mobile` | `{ radius: 0.245, y: 0.36, quality: 1.5 }` |

Any key in `mobile` replaces the top-level one when the container is at or
below the breakpoint. Pass `mobile: {}` to disable.

---

## Methods

```js
umbra.set(options)     // change anything except structural flags. Chainable.
umbra.open(0.4)        // aperture 0–1. Eases towards the value.
umbra.preset('ember')  // swap palette + background in one call.
umbra.play()           // resume
umbra.pause()          // stop the frame loop
umbra.destroy()        // remove listeners, loop, GL resources and canvas
```

All chainable except `destroy()`.

`set()` re-parses colours once and re-uploads uniforms — it is cheap enough to
call from a slider handler, which is exactly what the demo does.

---

## Properties

| | |
|---|---|
| `umbra.o` | Live options object (read it, do not mutate it — use `set()`). |
| `umbra.canvas` | The canvas, or `null` in fallback mode. |
| `umbra.gl` | The WebGL context, or `null`. |
| `umbra.destroyed` | `true` after `destroy()`. |
| `umbra.fallbackReason` | Why it fell back, if it did. |
| `Umbra.presets` | The preset table. |
| `Umbra.version` | `'1.0.0'` |

---

## Auto-init (no JavaScript)

The `<script>` build scans for `[data-umbra]` on load and starts each one.
Attributes are camel-cased from `data-umbra-*`, and numbers and booleans are
converted for you.

```html
<div data-umbra
     data-umbra-preset="nebula"
     data-umbra-radius="0.34"
     data-umbra-orbits="0"
     data-umbra-colors="#fff,#8ab,#46f,#204"
     style="height:100svh"></div>
```

The instance is stashed on the element as `el.__umbra` if you need it later.
For content added after load (page builders, modals), call
`Umbra.autoInit(container)` yourself — already-initialised elements are skipped.

---

## Notes worth knowing

- **One instance per element.** Two on the same node will fight over the canvas.
- **Many instances per page is fine.** They pause when off-screen, so a grid of
  cards costs roughly what one costs.
- **In React, always `destroy()` on unmount.** The included wrapper does it.
- **`speed: 0` still renders.** For a truly static image also set `orbits: 0`
  and `stars: 0` — those move on their own.
- **The shader is yours.** `src/umbra.js` is commented; the fragment shader is
  in the `FRAG` array. Add a ring, change the falloff, whatever you need.
