---
titulo: Versión 2 de la web (Ruido → señal)
tipo: conversacion
proyecto: La Brega Studio
fecha: 2026-08-08
tags: [conversacion, web, webgl, gsap, propuesta]
---

# 2026-08-08 · Versión 2 de la web — «Ruido → señal»

Proyecto: [[La Brega Studio/La Brega Studio|La Brega Studio]]

## Qué pidió Alejandro
> «coge la web de La Brega y crea otra COGIENDO LA QUE YA TENEMOS, dale una vuelta enorme, quiero una versión muy loca, con animaciones espectaculares, DE TODO».

## La idea (sale de su marca, no de un catálogo de efectos)
La v2 no inventa un lenguaje nuevo: coge **las dos frases de Raúl** y las convierte en interacción.

| Su frase | Qué hace la web |
|---|---|
| *«No hacemos ruido.»* | La web **empieza siendo ruido**: estática de televisión de verdad (canvas, píxel a píxel) que **baja de amplitud** mientras cuenta 000→100. Al llegar: silencio, aparece la insignia y la pantalla sube. |
| *«El diseño no maquilla. Revela.»* | El manifiesto llega **maquillado** (plano, apagado, con una película crema encima) y el **scroll lo revela** en el degradado de marca. El ratón abre además un círculo que revela a su paso. |
| Soles, órbitas, **eclipses** (su universo visual) | El hero es un **eclipse en WebGL escrito a mano**, sin librerías: disco negro, corona con su degradado, borde que respira con ruido, estrellas y grano. Se abre al bajar. |

## Qué lleva, sección a sección
1. **Preloader** — estática que se calla (canvas) + contador + «Bajando el ruido… / Quitando el humo… / Buscando la señal… / Silencio.»
2. **Hero** — eclipse WebGL (shader propio), titular que sube desde una máscara, la palabra *ruido* apagada a propósito.
3. **Marquee** — la **velocidad y el sentido los manda el scroll**.
4. **Manifiesto** — el revelador (scroll + ratón), con la línea de revelado en degradado.
5. **Servicios** — lista editorial, barrido de color que entra desde abajo y **ficha flotante** que sigue al ratón (una por servicio).
6. **Trabajo** — **galería horizontal anclada** (pin + desplazamiento lateral con GSAP) con contador 01/04 y barra de avance. Al pulsar, la **ficha del proyecto se abre como un eclipse** desde donde has hecho clic.
7. **Cómo bregamos** — igual que la v1, con un halo de marca detrás.
8. **Contacto** — «VAMOS A BREGAR» gigante; **las letras se apartan del ratón**.
9. **Menú a pantalla completa en móvil** — la v1 **no tenía menú en móvil** (fallo real que se arregla aquí).
10. **Cursor propio** que invierte lo que hay debajo (es «revelar» hecho puntero) y se abre con etiqueta *Abrir* / *Ver*.

## Fallos reales cazados durante el trabajo
- **Las dos capas del manifiesto no encajaban.** El ancho estaba en `.stack` (donde `1ch` es la letra pequeña del cuerpo) en vez de en `.big` (donde `1ch` es enorme): cada capa partía la línea por otro sitio y el texto salía **doblado y desplazado**. Ahora encajan **al píxel** (dx 0, dw 0, dh 0, verificado).
- **Todas las filas de servicios salían encendidas.** El barrido escondido (`translateY(101%)`) se veía dentro de la fila de **abajo** porque faltaba `overflow:hidden`.
- **La ficha de proyecto salía en blanco.** Los estilos del arte colgaban de `.proj`, y la ficha **clona esa pieza fuera de la galería**. Ahora `.art` es independiente.
- **Las secciones iban a sangre.** `.sec-pad` usaba el atajo `padding: X 0`, que **borra el margen lateral** de `.wrap` (las dos clases van en el mismo elemento). Los números 01–06 quedaban cortados contra el borde.
- **Sin GSAP, tres de los cuatro proyectos eran inalcanzables.** Si el CDN falla, la tira horizontal no la mueve nadie y se quedan dentro del `overflow`. Ahora, sin GSAP, **la galería se apila en vertical**. Salió porque en una pasada el CDN se cayó de verdad.
- El cursor con `mix-blend-mode:difference` al crecer daba **morado ilegible** sobre el verde de Saltimbanqui. Al crecer ya no invierte.

## Y mis propias mediciones me engañaron cuatro veces
Todas del chequeo, no de la web:
1. **«5 barridos se salen de su fila»** — falso: `overflow:hidden` recorta **lo pintado**, pero no cambia la caja de `getBoundingClientRect`.
2. **«La sección no queda anclada»** — falso: medía justo en el borde donde el anclaje aún no ha entrado.
3. **«El contenido se queda invisible sin CDN»** — falso: medía **arriba del todo**, donde los revelados *deben* estar ocultos.
4. **«Todas las secciones van a sangre»** — falso: `getPropertyValue('--gutter')` devuelve el `clamp(...)` **sin resolver**.

Y una de manual: usé `$s` como variable en PowerShell y **machacó `$S`**, que era la sesión de Chrome (las variables no distinguen mayúsculas).

## Verificación
Herramienta nueva: **control remoto de Chrome por CDP desde PowerShell**, sin Node (que no está instalado). Permite emular **390px de móvil de verdad** (con táctil, así `hover:hover` es falso como en un móvil), ejecutar JS en la página, leer errores y medir píxeles.

Resultado final: **0 fallos**.
- 1440 / 768 / 1280 / 1920 y 390 móvil: **sin desborde, 0 errores de JS**.
- El shader **compila** (no cae al respaldo CSS) y el eclipse **pinta color**.
- Titular sobre su fondo: **5,63:1**.
- El revelador va de 0 a 1 con el scroll; las capas encajan al píxel.
- La galería se ancla y se desplaza; la ficha abre y **cierra con Escape**.
- **Pasada con los CDN bloqueados**: 0 errores, preloader termina, galería apilada y **los 4 proyectos alcanzables**.

## Dónde está
- Código: `La Brega Studio/web/v2/index.html` (un solo archivo, como la v1).
- La **v1 no se ha tocado**: sigue en `La Brega Studio/web/index.html`.
- En Netlify las dos conviven: la v1 en `/` y la v2 en **`/v2/`**.

> [!todo] Verificar con Raúl
> Los textos de las **fichas de proyecto** (Saltimbanqui, Omnia, Revela, Día de Brega) son una **recreación** a partir de su feed para que la propuesta se vea completa. Hay que confirmarlos antes de publicar. La propia ficha lo avisa por escrito.

> [!note] Sigue pendiente de la v1
> El **logo PNG original** y las **imágenes reales** de los proyectos. La v2 ya tiene los huecos puestos (`../img/saltimbanqui.jpg`, `omnia.jpg`, `revela.jpg`, `dia-de-brega.jpg`): en cuanto existan, entran solas sin tocar código.
