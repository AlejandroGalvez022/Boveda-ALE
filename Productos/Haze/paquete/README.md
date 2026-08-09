# Haze

**Three atmospheric WebGL backgrounds, hand-written in one file.**
No dependencies. No build step. 22 KB.

```html
<script src="haze.js"></script>
<div id="hero" style="height:100svh"></div>
<script>new Haze('#hero', { motif: 'caustics', palette: 'lagoon' });</script>
```

That is the whole integration.

---

## The three motifs

| | |
|---|---|
| **`caustics`** | The light on the floor of a pool. Two layers of fBm, the second warped by the first, folded around the midpoint so smooth blobs become thin bright filaments. |
| **`ribbons`** | Four bands of light drifting and crossing. Domain-warped: each band is drawn on a coordinate that has already been bent by noise, which is what turns a sine wave into cloth. |
| **`chrome`** | Liquid metal. An fBm height field differentiated into a surface normal, then that normal reads the palette as if it were an environment map. No textures, no lights. |

Swap between them at runtime with `.motif('ribbons')` — the canvas and the GL
context are kept, only the shader is rebuilt.

---

## What you get

```
haze/
├── dist/
│   ├── haze.js           ← drop-in <script>. Sets window.Haze + auto-init.
│   └── haze.esm.js       ← ES module, for bundlers.
├── react/Haze.jsx        ← React / Next.js / Framer wrapper.
├── src/haze.js           ← commented source. Yours to modify.
├── demo/
│   ├── index.html        ← live control room: every knob, plus copyable code.
│   └── examples/
│       ├── minimal.html  ← zero lines of JS, data- attributes only
│       ├── scroll.html   ← energy driven by scroll
│       └── card.html     ← all three motifs on one page
├── docs/
│   ├── INSTALL.md        ← plain HTML, React, Next, Webflow, Framer, WordPress
│   └── API.md            ← every option and method
├── build.ps1             ← rebuilds dist/ from src/
├── CHANGELOG.md
└── LICENSE.md
```

**Open `demo/index.html` first.** Drag the sliders until it looks like your
brand, then press *Copy to clipboard* — it hands you the exact code for what
you built.

---

## Why it is not just another canvas snippet

Each motif is a **single fragment shader** drawn over one oversized triangle:
one draw call per frame, nothing allocated, nothing garbage-collected. But most
of the work went into the parts you only notice when they are missing:

| | |
|---|---|
| **No WebGL?** | Falls back to a CSS approximation of the same motif. Never a blank hero. |
| **Shader refuses to compile?** | Same fallback, plus an `onFallback` callback so you can log it. |
| **Scrolled out of view?** | Stops rendering. So does a hidden tab. |
| **`prefers-reduced-motion`?** | Draws one still frame and never starts a loop. |
| **Container resized?** | `ResizeObserver`, so it works in flex, grid and page builders. |
| **Retina?** | Device pixel ratio is capped (configurable) — sharp without melting laptops. |
| **Component unmounted?** | `destroy()` removes listeners, kills the loop and releases the GL context. |

---

## The one option that matters

`energy` (0 → 1) is how alive the surface is: caustics sharpen and brighten,
ribbons swell and wander further, chrome goes from polished to molten. Wire it
to scroll and you have the effect people actually buy this for:

```js
const bg = new Haze('#hero', { motif: 'caustics' });
addEventListener('scroll', () => {
  bg.energy(scrollY / innerHeight);
}, { passive: true });
```

`.energy()` eases towards whatever number you give it, so raw scroll values
every frame are fine. No throttling, no easing library.

---

## Palettes

`lagoon` · `dusk` · `forest` · `steel` · `magma` · `violet` · `mono`

Each sets four stops and a matching background. Stop 0 is the highlight, stop 3
the deep shade. Anything you pass alongside a palette overrides it, so
`{ palette: 'dusk', scale: 1.6 }` does what it looks like.

---

## Keeping text readable on top

These motifs are bright and they move, so **do not put pale text straight on
top.** Put a veil between them — one gradient, and the problem is gone for good:

```css
.hero { position: relative; }
.hero .veil {
  position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background: linear-gradient(180deg, rgba(3,10,20,.35), rgba(3,10,20,.1) 40%, rgba(3,10,20,.92));
}
.hero .content { position: relative; z-index: 2; }
```

Every example in `demo/examples/` does this. Check your own contrast against the
**brightest pixel the motif actually reaches**, not against your background
colour — that is where this kind of hero usually fails an accessibility audit.

---

## Browser support

Chrome, Edge, Firefox, Safari 12+, and every mobile browser with WebGL 1.
Anything older gets the CSS fallback automatically. No polyfills, ever.

---

## Rebuilding

Edit `src/haze.js`, then:

```powershell
powershell -ExecutionPolicy Bypass -File build.ps1
```

It regenerates both files in `dist/`. No Node, no npm, no bundler —
deliberately. The product promises zero dependencies; so does its build.

---

## Licence

One licence per end product. Commercial use included, source included and
modifiable. Reselling it as a component library is not. Full terms in
[LICENSE.md](LICENSE.md).

Support is the documentation plus email. No chat, no Discord — that is why it
costs what it costs.
