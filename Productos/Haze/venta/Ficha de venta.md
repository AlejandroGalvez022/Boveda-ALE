---
titulo: Haze — ficha de venta
tipo: nota
proyecto: "[[Productos/Haze/Haze|Haze]]"
tags: [producto, venta, haze]
---

# 🛒 Haze — ficha de venta

Volver a [[Productos/Haze/Haze|Haze]]

## Cómo se vende (decidido el 27-sep-2026)

| | |
|---|---|
| **Escaparate** | **Framer Marketplace**, como componente. Framer **no cobra**: pone el botón «Buy» y lo manda a tu pago. Se queda un 0 % |
| **Cobro** | **Lemon Squeezy**. Se queda un 5 % + 0,50 $ y es *merchant of record*: cobra y declara el IVA de cada país por ti. Eso resuelve lo del IGIC y la UE que estaba pendiente con el gestor |
| **Demo pública** | `venta/sitio/` en Netlify. La licencia promete que todo se puede probar antes de comprar, así que **tiene que estar en internet** |
| **Precio** | **24 $** para un proyecto · **59 $** para proyectos ilimitados |
| **Segundo canal (más adelante)** | Envato CodeCanyon: trae mucho tráfico pero se queda el 37,5 % y revisa con lupa. Solo si Framer funciona |

> [!info] Por qué ese precio
> Los fondos sueltos parecidos cuestan **10-15 $** (*Gradients Shader* 10 $, *Mesh Grain Gradients* 14,99 $). Haze son tres, con respaldo sin WebGL, React y un componente de Framer con todos los controles: se puede cobrar algo más, pero sin irse lejos del mercado. La licencia ya dice «un proyecto por licencia»: la de 59 $ es la «de agencia» que menciona.

## Qué hay en `venta/`

| Archivo | Qué es |
|---|---|
| `Haze-v1.0.0.zip` | Lo que recibe el comprador. **Se regenera** con `python empaquetar.py` |
| `sitio/` | La demo pública, lista para arrastrar a Netlify. Se regenera con el mismo script |
| `config.json` | Aquí va el enlace de compra de Lemon Squeezy (`buy_url`). Con él puesto, la demo sale con el botón «Buy Haze — $24» |
| `portadas/` | 8 imágenes para la ficha: 1600×1200 (formato 4:3) y una de 1920×1080. Se regeneran con `portadas.ps1` |
| `portada.html` | El generador de esas portadas |
| `haze-video-1920x1080.mp4` | **El vídeo de la ficha** (18,5 s): caustics → silk → chrome con la energía subiendo, y cierre con los tres y el nombre. Se regenera con `video.ps1` (necesita `pip install imageio-ffmpeg`) |
| `video.html` | El guion del vídeo. Pinta cada fotograma en un instante exacto, así que sale sin tirones aunque la captura sea lenta |

> [!todo] Verificar: el tamaño exacto que pide Framer para las imágenes de la ficha. Las he hecho a 1600×1200 y a 1920×1080 porque es lo habitual, pero no está comprobado en su documentación.

---

## ✍️ Textos para pegar (en inglés)

**Nombre:** Haze

**Frase corta (tagline):**
> Three living WebGL backgrounds. One file, zero dependencies.

**Descripción corta (Framer, ~160 caracteres):**
> Pool caustics, draped silk and liquid chrome. Hand-written WebGL, 9 KB gzipped, every option in the properties panel, scroll-reactive.

**Descripción larga:**

> **Haze is three atmospheric backgrounds, hand-written in WebGL and shipped as one file.**
>
> - **Caustics** — the light on the floor of a pool: a network of thin bright lines, bent by the water, with the faint rainbow fringe real caustics have.
> - **Silk** — a sheet of shot silk, draped in long folds, with a sheen on every crest and colour that turns with the angle of the cloth.
> - **Chrome** — liquid metal reflecting a studio built from your palette.
>
> Seven palettes, or your own four colours (Framer colour styles work). One control — **Energy** — makes the surface come alive, and you can let the scroll drive it.
>
> **Built to not break your site.** It sizes itself, pauses when it is off-screen or the tab is hidden, falls back to a CSS gradient of the same motif where WebGL is missing, and shows a still frame to anyone who asked their system to reduce motion. On the Framer canvas it paints one still frame so the editor stays fast; in preview and on your site it animates.
>
> **What you get:** the Framer component (one file, paste and go), a plain `<script>` for any site, an ES module, a React wrapper, the fully commented source, a live control room that writes your code for you, and docs for HTML, React, Next.js, Framer, Webflow and WordPress.
>
> 9 KB gzipped · zero dependencies · one draw call per frame.

**Preguntas frecuentes:**

> **Does it work without Framer?** Yes. The download includes a plain `<script>`, an ES module and a React component.
>
> **Will it slow my site down?** It is one draw call per frame, it stops when nobody can see it, and the pixel density is capped. On very large sections you can lower Quality.
>
> **What if the visitor's browser has no WebGL?** They see a CSS gradient in the same motif and colours. Never an empty hero.
>
> **Can I use it for client work?** Yes: one licence per end product. For unlimited projects, take the unlimited licence.
>
> **Can I change the colours?** Seven palettes built in, or pick your own four colours and background.

---

## ✅ Pasos para publicarlo (lo que te toca)

1. **Mirar los fondos** en `Productos/Haze/paquete/demo/index.html` con Live Server. Si alguno no te gusta, no se publica: me dices cuál y lo cambio.
2. **Tu email** en `paquete/LICENSE.md`, última línea, donde pone `[your email here]`. Mejor uno solo para esto, no el de Reload.
3. **La licencia, al gestor o a un abogado.** Cuando den el visto bueno, se quita el aviso de *Draft* del principio. `empaquetar.py` avisa mientras siga ahí.
4. **Comprobar que «Haze» está libre**: busca «Haze» en Framer Marketplace, Envato y npm. Si está cogido, me dices otro nombre y lo cambio en todo el paquete.
5. **Lemon Squeezy:** crear la cuenta, crear el producto «Haze» con **dos variantes** (Single project 24 $ y Unlimited 59 $), subir `venta/Haze-v1.0.0.zip` como archivo del producto y copiar el enlace de compra.
6. Pegar ese enlace en `venta/config.json` → `"buy_url": "…"` y lanzar `python empaquetar.py` desde la carpeta `venta/`.
7. **Netlify:** arrastrar la carpeta `venta/sitio/` a app.netlify.com/drop. Guardar la URL que te dé.
8. **Framer Marketplace:** darte de alta como creador y publicar el componente con las imágenes de `venta/portadas/`, los textos de arriba, el enlace a la demo (paso 7) y el botón «Buy» apuntando a Lemon Squeezy (paso 5).
9. **Y la regla que acordamos: 60 días sin tocar nada.** Luego se mira cuánto ha vendido, y ese número decide si se hace la pieza 2.

> [!todo] Verificar: los requisitos para darse de alta como creador en Framer (si revisan a mano o piden algo desde España). No aparecieron en la investigación.
