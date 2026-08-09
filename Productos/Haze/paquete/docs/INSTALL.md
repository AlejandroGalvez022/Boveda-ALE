# Haze — installing it

Pick your stack. Every route below is complete on its own.

---

## 1. Plain HTML

Copy `dist/haze.js` next to your page.

```html
<div id="hero" style="height:100svh"></div>

<script src="haze.js"></script>
<script>
  new Haze('#hero', { motif: 'caustics', palette: 'lagoon' });
</script>
```

**No JavaScript at all?** Use attributes and the script starts itself:

```html
<div data-haze data-haze-motif="ribbons" data-haze-palette="dusk" style="height:100svh"></div>
<script src="haze.js"></script>
```

---

## 2. React / Vite / Remix

Copy `dist/haze.esm.js` and `react/Haze.jsx` into your source tree, keeping them
in sibling folders (the wrapper imports `../dist/haze.esm.js` — adjust the path
if you move them).

```jsx
import HazeBackground from './Haze';

export default function Hero() {
  return (
    <HazeBackground motif="chrome" palette="steel" style={{ height: '100svh' }}>
      <h1>Your hero</h1>
    </HazeBackground>
  );
}
```

Driving energy from scroll:

```jsx
const ref = useRef(null);
useEffect(() => {
  const onScroll = () => ref.current?.energy(window.scrollY / window.innerHeight);
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}, []);

<HazeBackground ref={ref} motif="caustics" style={{ height: '100svh' }} />
```

---

## 3. Next.js

The wrapper is already SSR-safe — nothing touches `window` outside the effect —
but the file needs the client directive:

```jsx
'use client';
import HazeBackground from '@/components/Haze';
```

In the App Router, put `'use client'` at the top of `Haze.jsx` itself and import
it from a server component normally. No `dynamic()`, no `ssr: false`.

---

## 4. Framer

1. **Assets → upload `haze.esm.js`.**
2. New code component:

```jsx
import { useEffect, useRef } from 'react';
import Haze from './haze.esm.js';

export default function Background({ motif = 'caustics', palette = 'lagoon', scale = 1 }) {
  const host = useRef(null);
  useEffect(() => {
    const h = new Haze(host.current, { motif, palette, scale });
    return () => h.destroy();
  }, [motif, palette, scale]);
  return <div ref={host} style={{ width: '100%', height: '100%' }} />;
}
```

3. Add `addPropertyControls` with an enum for `motif` and `palette` so both are
   editable on the canvas.

Framer resizes frames constantly; the `ResizeObserver` inside handles it.

---

## 5. Webflow

**Project settings → Custom code → Footer:**

```html
<script src="https://YOUR-CDN/haze.js"></script>
```

Then give your section a **Custom attribute** in the Designer:

| Name | Value |
|---|---|
| `data-haze` | *(leave empty)* |
| `data-haze-motif` | `ribbons` |
| `data-haze-palette` | `dusk` |

Set the section's height in the Designer (`100vh`) and put your content in a
child div with `position: relative`.

---

## 6. WordPress / Elementor

1. Upload `haze.js` to your theme folder (or use a CDN link).
2. Enqueue it in the child theme's `functions.php`:

```php
add_action('wp_enqueue_scripts', function () {
  wp_enqueue_script('haze', get_stylesheet_directory_uri() . '/js/haze.js', [], '1.0.0', true);
});
```

3. On the Elementor Section → **Advanced → Attributes**:

```
data-haze|
data-haze-motif|chrome
data-haze-palette|steel
```

4. Give the section a minimum height and set its background to your `background`
   colour so nothing flashes while the script loads.

> Elementor builds some sections after `DOMContentLoaded`. If a section stays
> empty, call `Haze.autoInit()` once more from a small inline script at the end
> of the page.

---

## Sizing — read this before reporting a bug

The canvas fills its container, so **the container needs a height**. A `div`
with no height gives you a 0-pixel canvas and a flat rectangle.

```css
#hero { height: 100svh; }        /* good */
#hero { min-height: 620px; }     /* also good */
#hero { }                        /* nothing will render */
```

`100svh` rather than `100vh` avoids the jump when mobile browser chrome hides.

---

## Text on top

Put a veil between the motif and your copy, and put the copy above both:

```css
.hero { position: relative; }
.hero .veil { position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background: linear-gradient(180deg, rgba(3,10,20,.35), rgba(3,10,20,.1) 40%, rgba(3,10,20,.92)); }
.hero .content { position: relative; z-index: 2; }
```

Then check contrast against the **brightest pixel the motif actually reaches**,
not against your background colour. That is where heroes like this fail audits.

Lowering `contrast` and raising `vignette` are the two quickest ways to buy
headroom without changing your palette.

---

## Performance

One draw call per frame, one triangle, no allocations. If you need more headroom:

| Change | Effect |
|---|---|
| `quality: 1` | Biggest win on 4K and Retina. |
| `motif: 'ribbons'` | The cheapest of the three (no second fBm layer). |
| `speed: 0` | Static image, still rendered once. |

`chrome` is the most expensive — it evaluates the height field four extra times
per pixel to build the normal. Still one pass, but budget for it on old phones.

`pauseOffscreen` is on by default, so instances below the fold cost nothing
until they are reached.

---

## Troubleshooting

| Symptom | Cause |
|---|---|
| Flat rectangle | Container has no height. |
| Nothing at all | Target selector matched nothing — check the console. |
| Flat CSS gradient, no motion | Fallback engaged. Log it with `onFallback`. |
| Frozen but visible | `prefers-reduced-motion` is on. Working as intended. |
| Doubles up in React | Missing `destroy()` on unmount, or two instances on one node. |
| Blurry on Retina | `quality` set too low. |
| Banding | Raise `grain` to about `0.04`. |
| Pattern too busy | Lower `scale` (bigger shapes) or lower `energy`. |
