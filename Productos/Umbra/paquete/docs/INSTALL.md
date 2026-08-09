# Umbra — installing it

Pick your stack. Every route below is complete on its own.

---

## 1. Plain HTML

Copy `dist/umbra.js` next to your page.

```html
<div id="hero" style="height:100svh"></div>

<script src="umbra.js"></script>
<script>
  new Umbra('#hero', { preset: 'eclipse' });
</script>
```

**No JavaScript at all?** Use attributes and the script starts itself:

```html
<div data-umbra data-umbra-preset="ember" style="height:100svh"></div>
<script src="umbra.js"></script>
```

---

## 2. React / Vite / Remix

Copy `dist/umbra.esm.js` and `react/Umbra.jsx` into your source tree, keeping
them in sibling folders (the wrapper imports `../dist/umbra.esm.js` — adjust the
path if you move them).

```jsx
import UmbraBackground from './Umbra';

export default function Hero() {
  return (
    <UmbraBackground preset="nebula" style={{ height: '100svh' }}>
      <h1>Your hero</h1>
    </UmbraBackground>
  );
}
```

Opening it on scroll:

```jsx
const ref = useRef(null);
useEffect(() => {
  const onScroll = () => ref.current?.open(window.scrollY / window.innerHeight);
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}, []);

<UmbraBackground ref={ref} preset="eclipse" style={{ height: '100svh' }} />
```

---

## 3. Next.js

The wrapper is already SSR-safe — nothing touches `window` outside the effect —
but the file needs the client directive:

```jsx
'use client';
import UmbraBackground from '@/components/Umbra';
```

In the App Router, put `'use client'` at the top of `Umbra.jsx` itself and
import it from a server component normally. No `dynamic()`, no `ssr: false`.

---

## 4. Framer

1. **Assets → upload `umbra.esm.js`.**
2. New code component:

```jsx
import { useEffect, useRef } from 'react';
import Umbra from './umbra.esm.js';

export default function Eclipse({ preset = 'nebula', radius = 0.3 }) {
  const host = useRef(null);
  useEffect(() => {
    const u = new Umbra(host.current, { preset, radius });
    return () => u.destroy();
  }, [preset, radius]);
  return <div ref={host} style={{ width: '100%', height: '100%' }} />;
}
```

3. Add `addPropertyControls` for `preset` and `radius` so it is editable on the
   canvas.

Framer resizes frames constantly; the `ResizeObserver` inside handles it.

---

## 5. Webflow

**Project settings → Custom code → Footer:**

```html
<script src="https://YOUR-CDN/umbra.js"></script>
```

Then give your section a **Custom attribute** in the Designer:

| Name | Value |
|---|---|
| `data-umbra` | *(leave empty)* |
| `data-umbra-preset` | `eclipse` |
| `data-umbra-radius` | `0.32` |

Set the section's height in the Designer (`100vh`) and put your content in a
child div with `position: relative`.

---

## 6. WordPress / Elementor

1. Upload `umbra.js` to your theme folder (or use a CDN link).
2. Enqueue it in the child theme's `functions.php`:

```php
add_action('wp_enqueue_scripts', function () {
  wp_enqueue_script('umbra', get_stylesheet_directory_uri() . '/js/umbra.js', [], '1.0.0', true);
});
```

3. On the Elementor Section → **Advanced → Attributes**:

```
data-umbra|
data-umbra-preset|solar
```

4. Give the section a minimum height and set its background to your `background`
   colour so nothing flashes while the script loads.

> Elementor builds some sections after `DOMContentLoaded`. If a section stays
> empty, call `Umbra.autoInit()` once more from a small inline script at the end
> of the page.

---

## Sizing — read this before reporting a bug

The canvas fills its container, so **the container needs a height**. A `div`
with no height gives you a 0-pixel canvas and a black rectangle.

```css
#hero { height: 100svh; }        /* good */
#hero { min-height: 620px; }     /* also good */
#hero { }                        /* nothing will render */
```

`100svh` rather than `100vh` avoids the jump when mobile browser chrome hides.

---

## Text on top

Put a veil between the corona and your copy, and put the copy above both:

```css
.hero { position: relative; }
.hero .veil { position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background: linear-gradient(100deg, rgba(8,8,11,.92), rgba(8,8,11,.75) 40%, rgba(8,8,11,.15)); }
.hero .content { position: relative; z-index: 2; }
```

Then check contrast against the **brightest pixel the corona actually reaches**,
not against your background colour. That is where heroes like this fail audits.

---

## Performance

One draw call per frame, one triangle, no allocations. If you need more headroom:

| Change | Effect |
|---|---|
| `quality: 1` | Biggest win on 4K and Retina. |
| `orbits: 0` | Removes a three-iteration loop per pixel. |
| `stars: 0` | Removes a hash and a branch per pixel. |
| `speed: 0` | Static image, still rendered once. |

`pauseOffscreen` is on by default, so instances below the fold cost nothing
until they are reached.

---

## Troubleshooting

| Symptom | Cause |
|---|---|
| Black rectangle | Container has no height. |
| Nothing at all | Target selector matched nothing — check the console. |
| Flat CSS gradient, no motion | Fallback engaged. Log it with `onFallback`. |
| Frozen but visible | `prefers-reduced-motion` is on. Working as intended. |
| Doubles up in React | Missing `destroy()` on unmount, or two instances on one node. |
| Blurry on Retina | `quality` set too low. |
| Banding in the corona | Raise `grain` to about `0.04`. |
