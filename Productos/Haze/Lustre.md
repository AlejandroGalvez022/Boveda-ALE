---
titulo: Lustre
tipo: proyecto
categoria: Producto
estado: activo
siguiente: "13-oct (tarde): FRAMER HECHO por Alejandro: proyecto Lustre con el componente pegado, página de vista previa publicada (https://pink-whoever-169999.framer.app/, 0 fallos, WebGL a pantalla completa) y URL del componente para el Marketplace: https://framer.com/m/Lustre-3DWw9y.js@4F35kGMa8Oe6rDg3WmZI. FALTA: Lemon Squeezy en modo real y luego el anuncio. 13-oct, 19:18: LEMON SQUEEZY SIGUE EN REVISIÓN («Your application has been received and will be reviewed as soon as possible»), en Test mode, 16 días después del alta (27-sep): mirar que no quede nada en Setup y, si está todo, preguntar a su soporte. Hasta entonces NO enviar el anuncio de Framer (se publica al instante, sin revisión). 13-oct: COMPROBADO en la ayuda de Framer que NO HAY REVISIÓN (el componente se publica al enviarlo) y que vale cualquier enlace directo de pago: ORDEN = (a) mirar si Lemon Squeezy ya aprobó la identidad y pasar la tienda a modo real, (b) la cuenta de Framer, el componente y su página de vista previa (eso ya se puede ir haciendo), (c) enviar el anuncio SOLO con el enlace de pago real. Pasos en Ficha de venta. 27-sep (noche) PARADOS EN FRAMER. Hecho: web en https://lustre-backgrounds.netlify.app (precios, condiciones, licencia, botones a Lemon Squeezy); tienda Lemon Squeezy alejandrogalvez (USD, logo AG, W-8BEN, IBAN Revolut) con producto Single 24 / Unlimited 59 y ZIP; compra de prueba OK. SIGUIENTE: 1) Framer: el crea cuenta + proyecto Lustre, pega Desktop/LUSTRE - PARA FRAMER/Lustre.framer.tsx, pagina de preview y envio al Marketplace (miniatura sin texto); 2) cuando Lemon Squeezy apruebe identidad: Activate store + Copy to live mode + cambiar enlace en venta/config.json y resubir Netlify; 3) anadir el Component URL de Framer en Links del producto de Lemon Squeezy; 4) renombrar carpeta Productos/Haze -> Productos/Lustre (VS Code la bloquea)."
conversaciones: 0
tags: [proyecto, producto, webgl, pasivo, marketplace]
---

# ✨ Lustre

Volver al [[Indice]]

> [!info] Hasta el 27-sep-2026 se llamó **Lustre**. Se cambió porque «haze» es neblina y ningún fondo lo es; «lustre» es el brillo de una superficie, que es lo que comparten el agua, la seda y el metal. (Autodesk Lustre se retiró en abril de 2024; en Framer hay una **plantilla** gratis con ese nombre, pero los componentes van aparte.)

## Qué es

**Tres fondos atmosféricos en WebGL escritos a mano**, empaquetados como producto
para vender en marketplaces. Un archivo, sin dependencias, 23 KB.

No es una web: es **la primera pieza del catálogo**. La idea de negocio son
ingresos pasivos — construyes una pieza, la subes a una tienda que ya tiene
público, y vende sola.

| Motivo | Qué es |
|---|---|
| **`caustics`** | La luz del fondo de una piscina: una **red** de líneas finas y brillantes que se juntan en nudos más brillantes, doblada por el agua y con el filo de arcoíris que tiene la luz de verdad. Son dos redes de Voronoi en movimiento, a distinta escala. |
| **`silk`** | Una **tela de seda tornasolada drapeada**: pliegues largos que se cruzan, sombra en los valles, brillo en las crestas y el color cambiando con la inclinación de la tela. (Hasta el 27-sep se llamaba `ribbons` y eran cintas.) |
| **`chrome`** | Metal líquido que refleja un **estudio de fotos** hecho con la paleta (cielo, suelo, horizonte y dos focos). Los bordes duros de ese estudio son los que hacen que parezca metal y no plástico. |

![[Productos/Haze/venta/portadas/01-haze-portada-1600x1200.png]]

## 🔁 27-sep-2026 — Rehecho como producto estrella

Alejandro pidió tratarlo como **producto estrella**. Mirado con ojos de comprador, **la v1 no lo era**: caustics parecía un mapa topográfico turbio, ribbons un rayo borroso y chrome una mancha gris, y hay fondos **gratis** (ShaderGradient, Vanta) que se veían mejor. El motor sí era bueno; **el dibujo, no**.

| | Qué se hizo |
|---|---|
| 🎨 **Los 3 fondos, rehechos de cero** | Ver la tabla de arriba. Probados a tamaño de cabecera (no en miniatura: en miniatura todo parece nítido), en 7 paletas, en varios momentos y con la energía a 0 y a 1 |
| ⚡ **Coste** | El caustics nuevo costaba **2,7×** el viejo; con el truco de sacar el arcoíris del grosor de la línea (y no de tres muestras) queda en ~1,3×. Chrome es ahora el más barato |
| 🧩 **Componente de Framer** | `dist/Lustre.framer.tsx`: un solo archivo con el motor dentro y **todos los controles en el panel** (motivo, paleta o colores propios con los tokens de Framer, energía, «Scroll lo mueve», etc.). En el lienzo del editor pinta **una imagen quieta** para no ralentizar Framer; en la vista previa y en la web, anima. Lo genera `build.ps1` |
| 🐛 **3 fallos del motor que venían de la v1** | (1) El componente de **React congelaba la animación**: pasaba `speed: undefined` y el motor lo tomaba por 0. Con el motor nuevo además la habría pintado en negro (`contrast` 0). (2) **`pause()` no servía**: al volver el fondo a la pantalla o la pestaña, el motor arrancaba solo. (3) **`onFallback` nunca avisaba**: el motor solo guarda las opciones que conoce y esa no estaba en la lista |
| 🔤 **`dist/` con caracteres rotos** | El build leía el fuente como ANSI (la trampa de PowerShell 5.1): 8 `â€”` en el archivo que recibe el comprador. Ahora lee y escribe en UTF-8 y **se niega a terminar** si encuentra uno |
| 📱 **La demo se salía 10 px en móvil** | Rejilla con `1fr` que no encogía: `minmax(0,1fr)` |
| ➕ **Opción nueva `startAt`** | El fotograma con el que arranca, que es también el que ve quien tiene activado «reducir movimiento» |
| 📦 **Venta** | [[Productos/Haze/venta/Ficha de venta\|Ficha de venta]]: canal, precio, textos en inglés, portadas, ZIP, demo pública y los pasos para publicar |

**Verificado** con `pruebas/pruebas.ps1` (se puede relanzar siempre): **63 comprobaciones, 0 fallos**. Mide los píxeles del propio WebGL: que pinta, que no es negro ni se quema en blanco, que se mueve, que la energía y la paleta cambian el dibujo, que los 3 motivos son distintos entre sí, `pause`/`play`/`destroy`, el respaldo sin WebGL y su aviso, el movimiento reducido, los tokens de Framer y las 4 páginas de la demo a 1440 y a 390 px (0 errores y 0 desbordes). Además compila el componente de Framer como lo hace Framer, con un `framer` simulado, y el de React.

## 🔬 27-sep-2026 (tarde) — Investigación de mercado y segunda vuelta

Alejandro: *«trátalo como producto estrella, investiga y haz todo lo posible»*. Dos investigaciones en paralelo y, con lo que salió, a por lo que más pesa.

**Lo que dijo el mercado** (fuentes en la conversación de ese día):

| | |
|---|---|
| ✅ **Canal confirmado** | Framer Marketplace deja vender componentes de pago, **no se lleva nada** y enlaza a tu pago (doc oficial). Lemon Squeezy **sigue aceptando altas** y sigue siendo *merchant of record*; algún día pedirá pasarse a *Stripe Managed Payments* (mismo Stripe, sin prisa). Alternativa más barata y más joven: Creem (3,9 % + 0,40 $) |
| 🆕 **Envato** | Desde el 1-jul-2026 ya **no exige exclusividad**, pero se queda el **50 %** a todos. Canal secundario, en paralelo si Framer funciona |
| ⚠️ **Lo gratis es bueno** | Paper Shaders (30+ efectos, licencia libre, incluye un *liquid metal*), Vanta, ShaderGradient y varios fondos gratis en Framer. **Un degradado o un metal abstracto no se vende.** Lo que NO hay gratis son **motivos reconocibles** (la luz de piscina): ese es el hueco |
| 🏷️ **Nombre** | En npm están cogidos `haze` y todos los nombres cortos probados (lustre, sheen, glint, verglas, lumen, glaze…). No importa: se vende en Framer y un paquete con usuario delante siempre está libre. **Pendiente de él:** si se queda «Lustre» o se cambia (ver abajo) |

**Lo que se hizo:**

| | |
|---|---|
| 🧵 **`ribbons` → `silk`, rehecho** | Las cintas parecían tubos de plástico o un fondo de Windows Vista. Ahora es **una tela de seda tornasolada drapeada**: pliegues largos con aristas en el fondo, sombra en los valles, brillo en las crestas y el color que cambia con la inclinación de la tela. Probado en 4 paletas. Renombrado en código, Framer, React, demo, documentación, pruebas y ficha. El respaldo sin WebGL también: bandas satinadas con la misma inclinación |
| 🐛 **Fallo: en móvil se pisaba la escala del comprador** | Con el contenedor por debajo de 700 px, `mobile.scale` (1,35) **sustituía** la escala que hubiera puesto. Quien pusiera `scale: 0.6` en una tarjeta pequeña la perdía sin aviso (le pasaba al propio `card.html`). Ahora **multiplica**: 0,6 → 0,81. Documentado en `API.md` y con prueba nueva |
| 🎬 **Vídeo de la ficha** | `venta/haze-video-1920x1080.mp4`: los tres motivos con la energía subiendo y cierre con el nombre. Un fondo animado se vende en movimiento. Lo genera `venta/video.ps1` |
| 🖼️ **Portadas** | La franja de seda de la portada principal pasa a violeta (en dusk y en una columna estrecha se leía borrosa) |
| 🔎 **chrome** | Mirado en 4 paletas: en lagoon y mono es metal líquido convincente. Se le subió la curvatura. No se toca más |

**Verificado:** `pruebas/pruebas.ps1` → **64 comprobaciones, 0 fallos** (una más que antes: la de la escala en móvil).

## ⚠️ Por qué NO es un eclipse

**Porque el eclipse es de [[La Brega Studio/La Brega Studio|La Brega]], y La Brega
es un cliente de verdad.**

La primera versión de este producto **era** el eclipse de su v2, reescrito de cero
y con otra paleta. Alejandro lo vio y lo cortó en un segundo: *«es igual que el de
La Brega, y La Brega es un cliente que ya tengo»*.

Tenía razón, y el error estaba en el sitio equivocado: yo me había asegurado de que
**el código** fuese nuevo, que es lo que no importa. Lo que importa es **cómo se ve**.
Si Raúl acepta esa web y luego cualquiera puede comprar su portada por 39 €, **se le
ha devaluado la identidad a un cliente**. Eso no se arregla pidiéndole permiso.

> [!warning] La regla que queda para todo el catálogo
> **Lo que se vende no puede parecerse a lo que se le ha entregado a un cliente.**
> No basta con que el código sea nuevo: tiene que **verse distinto**.

Lo que sí se conservó es **el motor** —respaldos, pausado, movimiento reducido,
envoltorio de React, build, sala de control—, que es genérico y era el 80% del
trabajo. Solo cambió el motivo. Y de paso el producto salió más fuerte: en vez de
un fondo, tres.

## Dónde está

`Productos/Haze/paquete/` — eso es literalmente lo que se sube a la tienda.

| | |
|---|---|
| `demo/index.html` | **Ábrela primero.** Sala de control: cambia de motivo y de paleta, mueve todos los mandos, y un botón te copia el código de lo que hayas montado. Esto es lo que vende. |
| `demo/examples/` | `minimal` (cero líneas de JS), `scroll` (la energía sube al bajar), `card` (los tres motivos a la vez) |
| `dist/lustre.js` | El `<script>` de toda la vida. Deja `window.Lustre` y arranca solo los `[data-haze]` |
| `dist/lustre.esm.js` | Módulo ES, para quien use empaquetador |
| `react/Lustre.jsx` | Envoltorio de React / Next / Framer, seguro en servidor y con limpieza al desmontar |
| `src/lustre.js` | El fuente comentado. **Es el único sitio donde se edita.** Cada motivo es una entrada de la tabla `MOTIFS`: si añades una cuarta, el motor la coge sin tocar nada más |
| `build.ps1` | Regenera `dist/` desde `src/`. Sin Node ni empaquetador: el producto promete cero dependencias y su build también |
| `dist/Lustre.framer.tsx` | **El componente de Framer.** El comprador lo pega en un archivo de código nuevo y ya está. Lo genera `build.ps1` a partir de `src/framer.tsx` |
| `../pruebas/` | **Fuera del paquete.** `pruebas.ps1` lanza la batería completa (63 comprobaciones). Relanzarla después de tocar cualquier cosa |
| `../venta/` | **Fuera del paquete.** ZIP, demo pública, portadas y la [[Productos/Haze/venta/Ficha de venta\|ficha de venta]] |
| `docs/` | `INSTALL.md` (HTML, React, Next, Framer, Webflow, WordPress) y `API.md` |
| `LICENSE.md` | ⚠️ Borrador. Si quiere, que la mire su madre (abogada) |

## Qué lo hace vendible (y no un script más)

Un shader bonito lo tiene cualquiera. Lo que se paga es lo que pasa **cuando algo
va mal**:

- **Sin WebGL** → pinta un respaldo en CSS **del motivo que le hayas pedido**. El comprador nunca ve un hero vacío.
- **El shader no compila** → mismo respaldo, más un aviso `onFallback`.
- **Fuera de pantalla o pestaña oculta** → deja de dibujar.
- **`prefers-reduced-motion`** → un fotograma quieto y **no arranca el bucle nunca**.
- **Contenedor redimensionado** → `ResizeObserver`, así funciona dentro de Webflow o Elementor.
- **Al desmontar** → `destroy()` quita escuchadores, bucle, programa, búfer y suelta el contexto.
- **Cambiar de motivo** reconstruye solo el shader: el canvas y el contexto se mantienen.

Y una sola opción es la que de verdad compran: **`energy`** (0→1). La enganchas al
scroll y la superficie se despierta. Va suavizada, así que puedes darle el `scrollY`
en crudo cada fotograma.

## Verificado (v1, 9-ago — sustituido por la batería de arriba)

Chromium por CDP, **0 fallos**:

- 360 / 390 / 768 / 1280 / 1440 / 1920 → canvas del tamaño correcto, sin desbordes, 0 errores de consola.
- **Pinta de verdad**: 132–159 tonos distintos (un rectángulo plano daría 1).
- **Los tres motivos son distintos entre sí** (distancia de color 15,9 / 58,9 / 49,1).
- **Ninguno dibuja un disco oscuro rodeado de luz** — comprobación explícita para que nada recuerde a La Brega.
- **Las paletas cambian el dibujo** (lagoon→magma: 132,4).
- **La energía cambia el dibujo** (13,3), y sube con el scroll en el ejemplo (54,6).
- `pause()`, `play()` y `destroy()` hacen lo que dicen; `destroy()` no deja restos.
- **Sin WebGL**: el canvas se retira y aparece el respaldo.
- **Movimiento reducido**: dos capturas con 1,8 s de diferencia salen **idénticas**.

🐛 **Dos fallos reales cazados**: (1) en la demo, `codeEl` se declaraba *después*
del bucle de sliders, que llama a `paintCode()` nada más crearse → `var` sin
asignar → `TypeError` en las 6 resoluciones; (2) **el motivo `chrome` salía como
estática de televisión** — cinco octavas de fBm y un épsilon minúsculo daban
derivadas tan bruscas que la normal cambiaba en cada píxel. Tres octavas suaves y
un épsilon ancho, y ya es una superficie.

## La estrategia

Alejandro pidió **ingresos pasivos**. Un SaaS paga más (~6.000 €/mes) pero
**nunca es pasivo**: altas, bajas, caídas y correos. Un catálogo de piezas paga
menos pero **sí lo es**.

El precio de lo pasivo es siempre el mismo: **le regalas la distribución a otro y
él se lleva su parte**. Quien pone el tráfico (Framer, Envato, UI8) se queda el
30–50%. A cambio, tú desapareces.

> [!warning] Con 3 piezas esto no funciona. Con 12, sí.
> Realista a 2 años: **800–2.500 €/mes**. Hay quien saca mucho más y mucha gente
> que saca 50 €. Y **no es recurrente**: si dejas de añadir, decae despacio.

Dónde venderlo (**actualizado 27-sep**): **Framer Marketplace** como escaparate
(Framer no cobra, enlaza a tu pago) + **Lemon Squeezy** para cobrar (5 % + 0,50 $,
y gestiona el IVA de cada país: *merchant of record*). Precio **24 $ / 59 $**.
Envato CodeCanyon, más adelante y solo si Framer funciona. Todo en la
[[Productos/Haze/venta/Ficha de venta|ficha de venta]].

## Antes de publicar

> [!tip] La lista buena ahora es la de la [[Productos/Haze/venta/Ficha de venta|ficha de venta]] (pasos 1-9). Esta se queda por historia.

- [ ] **Abrir `demo/index.html`** y cambiar de motivo y de paleta. Si no te gusta, no se publica.
- [ ] **Comprobar que el nombre está libre**: dominio, y buscar "Lustre" en Envato, Framer y npm.
- [ ] Poner tu **email** en `LICENSE.md` (pone `[your email here]`) y decidir el precio.
- [x] ~~Gestor~~ **Descartado (27-sep):** lo fiscal lo declara él en la renta; la licencia, si acaso, la mira su madre (abogada). Es un borrador escrito para ser claro, no para ser a prueba de balas.
- [ ] Ojo: si vendes por marketplace, **su licencia manda sobre la tuya**.
- [x] Fiscal: **lo lleva él** (27-sep). Lemon Squeezy cobra el IVA de cada comprador. Nota vieja: **Canarias → IGIC, no IVA**. Si vendes a la UE, mira con tu gestor si compensa un *merchant of record* (Lemon Squeezy, Paddle).
- [ ] Nada de esto toca Reload. El fuente es nuevo y es tuyo — pero **revisa tu contrato** por si hay cláusula de exclusividad.

## Próximos pasos

- [ ] Publicar la v1 en Framer Marketplace.
- [ ] **60 días sin tocar nada** y mirar cuánto vende. Ese número es la única respuesta real.
- [ ] Si vende → una pieza nueva al mes hasta llegar a 12. Y cada una pasa el mismo filtro: **que no se parezca a nada entregado a un cliente**.
- [ ] Si no vende → se descarta habiendo perdido un mes y cero euros.
