# Umbra

**A hand-written WebGL eclipse for your hero section.**
One file. No dependencies. No build step. 20 KB.

```html
<script src="umbra.js"></script>
<div id="hero" style="height:100svh"></div>
<script>new Umbra('#hero', { preset: 'nebula' });</script>
```

That is the whole integration.

---

## What you get

```
umbra/
├── dist/
│   ├── umbra.js          ← drop-in <script>. Sets window.Umbra + auto-init.
│   └── umbra.esm.js      ← ES module, for bundlers.
├── react/Umbra.jsx       ← React / Next.js / Framer wrapper.
├── src/umbra.js          ← commented source. Yours to modify.
├── demo/
│   ├── index.html        ← live control room: every knob, plus copyable code.
│   └── examples/
│       ├── minimal.html  ← zero lines of JS, data- attributes only
│       ├── scroll.html   ← the eclipse opens as you scroll
│       └── card.html     ← three instances on one page
├── docs/
│   ├── INSTALL.md        ← plain HTML, React, Next, Webflow, Framer, WordPress
│   └── API.md            ← every option and method
├── build.ps1             ← rebuilds dist/ from src/
├── CHANGELOG.md
└── LICENSE.md
```

**Open `demo/index.html` first.** Drag the sliders until it looks like your brand,
then press *Copy to clipboard* — it hands you the exact code for what you built.

---

## Why it is not just another canvas snippet

It is a **single fragment shader** drawn over one oversized triangle: one draw call
per frame, nothing allocated, nothing garbage-collected. But most of the work went
into the parts you only notice when they are missing:

| | |
|---|---|
| **No WebGL?** | Falls back to the same eclipse painted in CSS. Never a blank hero. |
| **Shader refuses to compile?** | Same fallback, plus an `onFallback` callback so you can log it. |
| **Scrolled out of view?** | Stops rendering. So does a hidden tab. |
| **`prefers-reduced-motion`?** | Draws one still frame and never starts a loop. |
| **Container resized?** | `ResizeObserver`, so it works in flex, grid and page builders. |
| **Retina?** | Device pixel ratio is capped (configurable) — sharp without melting laptops. |
| **Component unmounted?** | `destroy()` removes listeners, kills the loop and releases the GL context. |

The radius is measured against the container **height**, not its width, so the
composition survives a resize instead of drifting off the edge.

---

## The one option that matters

`open` (0 → 1) is the aperture: the disc shrinks and the corona swells. Wire it
to scroll and you have the effect people actually buy this for:

```js
const eclipse = new Umbra('#hero', { preset: 'eclipse' });
addEventListener('scroll', () => {
  eclipse.open(scrollY / innerHeight);
}, { passive: true });
```

`.open()` eases towards whatever number you give it, so raw scroll values every
frame are fine. No throttling, no easing library.

---

## Presets

`eclipse` · `solar` · `nebula` · `ice` · `ember` · `toxic` · `mono`

Each sets a four-stop palette and a matching background. Anything you pass
alongside a preset overrides it, so `{ preset: 'ice', radius: 0.4 }` does what
it looks like.

---

## Keeping text readable on top

The corona is bright and it moves, so **do not put pale text straight on top of
it.** Put a veil between them — one gradient, and the problem is gone for good:

```css
.hero { position: relative; }
.hero .veil {
  position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background: linear-gradient(100deg, rgba(8,8,11,.92), rgba(8,8,11,.75) 40%, rgba(8,8,11,.15));
}
.hero .content { position: relative; z-index: 2; }
```

Every example in `demo/examples/` does this. Check your own contrast against the
**brightest pixel the corona reaches**, not against your background colour —
that is where this kind of hero usually fails an accessibility audit.

---

## Browser support

Chrome, Edge, Firefox, Safari 12+, and every mobile browser with WebGL 1.
Anything older gets the CSS fallback automatically. No polyfills, ever.

---

## Rebuilding

Edit `src/umbra.js`, then:

```powershell
powershell -ExecutionPolicy Bypass -File build.ps1
```

It regenerates both files in `dist/`. There is no Node, no npm, no bundler —
deliberately. The product promises zero dependencies; so does its build.

---

## Licence

One licence per end product. Commercial use included, source included and
modifiable. Reselling it as a component library is not. Full terms in
[LICENSE.md](LICENSE.md).

Support is the documentation plus email. There is no chat and no Discord — that
is why it costs what it costs.
