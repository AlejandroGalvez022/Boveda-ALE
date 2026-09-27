# Lustre — installing it

Pick your stack. Every route below is complete on its own.

---

## 1. Plain HTML

Copy `dist/lustre.js` next to your page.

```html
<div id="hero" style="height:100svh"></div>

<script src="lustre.js"></script>
<script>
  new Lustre('#hero', { motif: 'caustics', palette: 'lagoon' });
</script>
```

**No JavaScript at all?** Use attributes and the script starts itself:

```html
<div data-lustre data-lustre-motif="silk" data-lustre-palette="dusk" style="height:100svh"></div>
<script src="lustre.js"></script>
```

---

## 2. React / Vite / Remix

Copy `dist/lustre.esm.js` and `react/Lustre.jsx` into your source tree, keeping them
in sibling folders (the wrapper imports `../dist/lustre.esm.js` — adjust the path
if you move them).

```jsx
import LustreBackground from './Lustre';

export default function Hero() {
  return (
    <LustreBackground motif="chrome" palette="steel" style={{ height: '100svh' }}>
      <h1>Your hero</h1>
    </LustreBackground>
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

<LustreBackground ref={ref} motif="caustics" style={{ height: '100svh' }} />
```

---

## 3. Next.js

The wrapper is already SSR-safe — nothing touches `window` outside the effect —
but the file needs the client directive:

```jsx
'use client';
import LustreBackground from '@/components/Lustre';
```

In the App Router, put `'use client'` at the top of `Lustre.jsx` itself and import
it from a server component normally. No `dynamic()`, no `ssr: false`.

---

## 4. Framer

Framer gets its own file, `dist/Lustre.framer.tsx`: the whole engine and a
ready-made component with every option in the properties panel. Nothing to
install, nothing to import.

1. In Framer: **Assets → Code → “+” → New file**, name it **Lustre**.
2. Open `dist/Lustre.framer.tsx` in any text editor, copy all of it, paste it
   over Framer's template and save.
3. **Lustre** now appears under Code in your Assets. Drag it into your hero, set
   width and height to **Fill**, and send it to the back so your content sits
   on top.

| Control | What it does |
|---|---|
| Motif | Caustics, Silk or Chrome. |
| Palette | One of the seven, or **Custom** — then four colours and a background appear. Colour styles from your project work too. |
| Energy | How alive it is, 0–1. |
| Scroll → Drives it | Energy rises from the value above to 1 as the page scrolls. **Full at** sets how many screens that takes. |
| Scale · Speed · Contrast · Grain · Vignette · Mouse | As in the [API](API.md). |
| Quality | Pixel-density cap. Lower it for very large sections. |
| On canvas | **Still** (default) paints one frame in the editor so Framer stays fast; **Animate** runs it live. The preview and the published site always animate. |

Framer resizes frames constantly; the `ResizeObserver` inside handles it.

---

## 5. Webflow

**Project settings → Custom code → Footer:**

```html
<script src="https://YOUR-CDN/lustre.js"></script>
```

Then give your section a **Custom attribute** in the Designer:

| Name | Value |
|---|---|
| `data-lustre` | *(leave empty)* |
| `data-lustre-motif` | `silk` |
| `data-lustre-palette` | `dusk` |

Set the section's height in the Designer (`100vh`) and put your content in a
child div with `position: relative`.

---

## 6. WordPress / Elementor

1. Upload `lustre.js` to your theme folder (or use a CDN link).
2. Enqueue it in the child theme's `functions.php`:

```php
add_action('wp_enqueue_scripts', function () {
  wp_enqueue_script('lustre', get_stylesheet_directory_uri() . '/js/lustre.js', [], '1.0.0', true);
});
```

3. On the Elementor Section → **Advanced → Attributes**:

```
data-lustre|
data-lustre-motif|chrome
data-lustre-palette|steel
```

4. Give the section a minimum height and set its background to your `background`
   colour so nothing flashes while the script loads.

> Elementor builds some sections after `DOMContentLoaded`. If a section stays
> empty, call `Lustre.autoInit()` once more from a small inline script at the end
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
| `motif: 'chrome'` | The cheapest of the three. |
| `speed: 0` | Static image, still rendered once. |

`caustics` is the most expensive — it finds the nearest cells of two moving
networks for every pixel. Still one pass, but on old phones consider
`mobile: { quality: 1 }`.

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
