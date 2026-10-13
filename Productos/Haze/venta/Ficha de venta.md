---
titulo: Lustre — ficha de venta
tipo: nota
proyecto: "[[Productos/Haze/Lustre|Lustre]]"
tags: [producto, venta, lustre]
---

# 🛒 Lustre — ficha de venta

Volver a [[Productos/Haze/Lustre|Lustre]]

## Cómo se vende (decidido el 27-sep-2026)

| | |
|---|---|
| **Escaparate** | **Framer Marketplace**, como componente. Framer **no cobra**: pone el botón «Buy» y lo manda a tu pago. Se queda un 0 % |
| **Cobro** | **Lemon Squeezy**. Se queda un 5 % + 0,50 $ y es *merchant of record*: cobra y declara el IVA de cada país por ti. Eso resuelve lo del IGIC y la UE que estaba pendiente con el gestor |
| **Demo pública** | **https://lustre-backgrounds.netlify.app/** (cuenta de Netlify personal, 27-sep). Se sube arrastrando `venta/sitio/` (el motor va en `js/`, NO en `dist/`: Netlify Drop se salta las carpetas `dist`). La licencia promete que todo se puede probar antes de comprar, así que **tiene que estar en internet** |
| **Precio** | **24 $** para un proyecto · **59 $** para proyectos ilimitados |
| **Segundo canal (más adelante)** | Envato CodeCanyon: trae mucho tráfico pero se queda el 37,5 % y revisa con lupa. Solo si Framer funciona |

> [!info] Por qué ese precio
> Los fondos sueltos parecidos cuestan **10-15 $** (*Gradients Shader* 10 $, *Mesh Grain Gradients* 14,99 $). Lustre son tres, con respaldo sin WebGL, React y un componente de Framer con todos los controles: se puede cobrar algo más, pero sin irse lejos del mercado. La licencia ya dice «un proyecto por licencia»: la de 59 $ es la «de agencia» que menciona.

## Qué hay en `venta/`

| Archivo | Qué es |
|---|---|
| `Lustre-v1.0.0.zip` | Lo que recibe el comprador. **Se regenera** con `python empaquetar.py` |
| `sitio/` | La demo pública, lista para arrastrar a Netlify. Se regenera con el mismo script |
| `config.json` | Aquí va el enlace de compra de Lemon Squeezy (`buy_url`). Con él puesto, la demo sale con el botón «Buy Lustre — $24» |
| `portadas/` | 8 imágenes para la ficha: 1600×1200 (formato 4:3) y una de 1920×1080. Se regeneran con `portadas.ps1` |
| `portada.html` | El generador de esas portadas |
| `lustre-video-1920x1080.mp4` | **El vídeo de la ficha** (18,5 s): caustics → silk → chrome con la energía subiendo, y cierre con los tres y el nombre. Se regenera con `video.ps1` (necesita `pip install imageio-ffmpeg`) |
| `video.html` | El guion del vídeo. Pinta cada fotograma en un instante exacto, así que sale sin tirones aunque la captura sea lenta |

> [!check] Comprobado (13-oct) en la ayuda oficial de Framer: no fija un tamaño para las imágenes, pero la **vista previa en vivo del Marketplace es 4:3**, así que las de 1600×1200 (4:3) encajan. La vista previa carga **una página pública de Framer tuya**, con el componente centrado en un contenedor de **100vh** y el body con altura **Fit**. ([Cómo enviar un componente](https://www.framer.com/help/articles/how-to-submit-a-component-to-the-marketplace))

---

## 🍋 Estado de Lemon Squeezy (27-sep-2026)

| | |
|---|---|
| Tienda | `alejandrogalvez.lemonsqueezy.com` · nombre «Alejandro Gálvez Braña» · logo AG (`Productos/Tienda/logo-a.png`) · moneda **USD** |
| Identidad | Enviada, **en revisión** |
| Fiscal | W-8BEN enviado (persona física, no residente en EE. UU.) |
| Cobros | Al IBAN de Revolut en EUR · mínimo 50 $ por transferencia |
| Producto | «Lustre — WebGL backgrounds for Framer, React & HTML»: variantes **Single project 24 $** y **Unlimited 59 $**, las dos con el ZIP · categoría *Digital Goods or Services* · 4 imágenes 1600×1200 |
| Enlace de compra | **MODO PRUEBA:** `https://alejandrogalvez.lemonsqueezy.com/checkout/buy/4adac8a0-ce7d-4311-bb3e-fa2ff64fd66a` (el del producto: el comprador elige la licencia en el pago). Metido en `config.json` para los dos botones |
| ⚠️ Pendiente | Cuando activen la tienda: **Copy to live mode** y cambiar el enlace en `config.json` (+ regenerar y subir a Netlify). Mejor aún: un enlace por variante, para que «Buy unlimited» llegue con la de 59 $ marcada |

## ✍️ Textos para pegar (en inglés)

**Nombre:** Lustre

**Frase corta (tagline):**
> Three living WebGL backgrounds. One file, zero dependencies.

**Descripción corta (Framer, ~160 caracteres):**
> Pool caustics, draped silk and liquid chrome. Hand-written WebGL, 9 KB gzipped, every option in the properties panel, scroll-reactive.

**Descripción larga:**

> **Lustre is three atmospheric backgrounds, hand-written in WebGL and shipped as one file.**
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
2. ~~Tu email en la licencia~~ ✅ **Hecho (27-sep):** galvezbranaa@gmail.com en `LICENSE.md` y en el soporte del `README.md`.
3. ~~La licencia~~ ✅ **Hecho (27-sep):** quitado el aviso de *Draft* (era una nota para ti y la habría visto el comprador). Si quieres, que la mire tu madre.
4. ~~Comprobar el nombre~~ ✅ **Hecho (27-sep)**: se llama **Lustre** (antes Haze). En Framer solo hay una *plantilla* gratis con ese nombre (los componentes van aparte) y Autodesk Lustre se retiró en 2024. En npm `lustre` está cogido: si algún día se publica ahí, con usuario delante (`@tuusuario/lustre`).
5. **Lemon Squeezy:** crear la cuenta, crear el producto «Lustre» con **dos variantes** (Single project 24 $ y Unlimited 59 $), subir `venta/Lustre-v1.0.0.zip` como archivo del producto y copiar el enlace de compra.
6. Pegar ese enlace en `venta/config.json` → `"buy_url": "…"` y lanzar `python empaquetar.py` desde la carpeta `venta/`.
7. **Netlify:** arrastrar la carpeta `venta/sitio/` a app.netlify.com/drop. Guardar la URL que te dé.
8. **Framer Marketplace:** darte de alta como creador y publicar el componente con las imágenes de `venta/portadas/`, los textos de arriba, el enlace a la demo (paso 7) y el botón «Buy» apuntando a Lemon Squeezy (paso 5).
9. **Y la regla que acordamos: 60 días sin tocar nada.** Luego se mira cuánto ha vendido, y ese número decide si se hace la pieza 2.

> [!check] Comprobado (13-oct) en la ayuda oficial de Framer:
> - **No hay revisión:** el componente se publica **en cuanto se envía**. Por eso el botón de compra tiene que llevar ya al pago **real**, no al de prueba.
> - Publicar en el Marketplace te mete solo en el **Creator Program**; no hay alta aparte.
> - **Pago:** Framer no cobra ni procesa nada. Vale «cualquier plataforma con enlace directo de pago»: nombra Contra, Stripe y Gumroad, y **no nombra Lemon Squeezy**, pero su enlace de compra cumple. El pago tiene que ir directo, sin pasos de más; enseñar el producto y el precio, el **mismo** del anuncio; ser público, sin iniciar sesión, y tener una **política de reembolso** clara.
> - **Entrega:** la haces tú, con la URL del componente o un enlace de *remix* y las instrucciones. Ya estaba previsto: el enlace de Framer va en los Links del producto de Lemon Squeezy.
> - Fuentes: [Cobrar en la Community](https://www.framer.com/help/articles/accept-payments-in-the-community/) · [Creator Program](https://www.framer.com/help/articles/how-the-creator-program-works/)
