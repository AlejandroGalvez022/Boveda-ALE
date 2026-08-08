---
titulo: Versión 3 de la web (La Imprenta)
tipo: conversacion
proyecto: La Brega Studio
fecha: 2026-08-08
tags: [conversacion, web, instagram, cartel, propuesta]
---

# 2026-08-08 · Versión 3 de la web — «La Imprenta»

Proyecto: [[La Brega Studio/La Brega Studio|La Brega Studio]]

## Qué pidió Alejandro
> «entra en las redes sociales de La Brega, en Instagram, para que veas sus nuevos posts. Y fíjate en TODO el estilo usado EN TODOS LOS POSTS. Y lo que quiero que hagas con eso es una V3: una web loca, pero **con otro estilo**, animaciones por todos lados.»

## Lo primero: mirar su Instagram de verdad
Entré en [@labrega_estudio](https://www.instagram.com/labrega_estudio/) con Chrome por CDP y me bajé **los 8 posts públicos en alta**, con sus pies de foto. No es lo mismo suponer su estilo que verlo.

### Lo que hay en el feed
| Post | Qué es |
|---|---|
| **La rebeldía de ser felices** (04.08) | Foto de archivo canaria en B/N (papahuevos, romería) + **rótulo de marcador amarillo pintado a mano** + su fila de estrellas. |
| **San Borondón 1840** (29.07) | B/N muy granulado, tipografía **display apilada y solapada**, anotaciones a mano («Ab. n1»). |
| **Saltimbanqui** (05.07) | **Verde ácido con grano** y logotipo amarillo pálido; segunda pieza con la tipografía a sangre y una figura en **semitono de puntos**. |
| **Día Internacional de la Luna** (20.07) | Grabado antiguo de la luna sobre negro; **condensada + caligráfica** mezcladas. |
| **El diseño no maquilla. Revela.** (03.07) | **Fondo blanco con marco**, escultura clásica, serif editorial y la palabra clave en **caja negra invertida**. |
| **Día Internacional del OVNI** (02.07) | **Diagrama orbital** en línea fina sobre negro, números romanos, tipo tiza. |
| **Omnia** (26.06) | **Eclipse negro sobre degradado naranja → magenta → verde**, mucho grano; logotipo modular blanco. |
| **Día de Canarias / Día de Brega** (30.05) | Bandera negra con sus estrellas y un canario amarillo. Segunda pieza: **el logotipo + las 8 estrellas**. |

### Dos correcciones importantes que salieron de mirar
1. **El logotipo NO es una insignia circular.** Eso era el recorte del avatar. El real es un **logotipo apilado a la izquierda**: `LA` fino / **`BREGA`** negra / `ESTUDIO.` fino con el punto gordo. La v1 y la v2 lo recrearon mal.
2. **Tienen un sistema de 8 estrellas** (estrella de 8 puntas, flor de 8 pétalos, destello de 4, estrella de 12, con anillo, con cruz…). Es su firma gráfica y no estaba en ninguna versión. En la v3 están **dibujadas en SVG**, no como imagen, para poder animarlas.

### Su voz (de los pies de foto, literal)
- *«Esta tierra nos enseñó algo antes que el diseño: nos enseñó a bregar.»* · *«No venimos a seguir tendencias. No venimos a hacer ruido. Venimos a crear. Venimos a construir. Venimos a bregar.»*
- *«De pensar y creer; y después crear. En ese orden.»* ← de aquí sale entera la sección **Cómo bregamos**.
- *«Hay marcas que pisan fuerte. Que aterrizan de pie.»* (Saltimbanqui) · *«Algo potente y divertido como sus fiestas de afro-techno.»* (Omnia)

## La idea de la v3
La v1 y la v2 son **oscuras**. Su feed, en cambio, es **cartelería de imprenta** — y su post más rotundo («Revela») es **blanco con marco**. Así que la v3 va **en papel**, y el concepto es literal:

> **La web se imprime delante de ti.**

Y su lema encaja solo: *«No hacemos ruido»* se traduce aquí en el **registro de color**. Todo llega **descuadrado en CMYK** (eso es el ruido) y **cuadra** cuando termina de imprimirse (eso es la marca).

## Qué lleva, sección a sección
- **Preloader** — tres pasadas de tinta con contador, y un **rodillo** que barre en amarillo, verde y negro al entrar.
- **Hero** — `BREGAR` a pantalla completa con **desregistro CMYK reactivo**: tres fantasmas de tinta (canario, verde, magenta) que se separan con el ratón y con la velocidad del scroll, y cuadran al parar. Estrellas girando y las letras que se imprimen una a una.
- **Cintas** — dos marquesinas cuya velocidad y sentido manda el scroll.
- **Manifiesto** — sus frases reales, línea a línea, con la palabra «bregar» **subrayada por un marcador amarillo pintado** que se dibuja al entrar, y «antes que» en caligráfica.
- **Lo que hacemos** — seis filas que **se entintan enteras** al pasar por encima, con la estrella que gira al final.
- **El taller** — **pared de carteles** escalonada con sus 4 trabajos reales, con parallax; al pulsar, el cartel **vuela desde su sitio** hasta la ficha y se abre con el texto real de su Instagram.
- **Efemérides** — su cartelería propia (Luna, OVNI, Rebeldía, Revela y las 8 estrellas) en un carrusel que se arrastra, sobre **órbitas SVG que se dibujan** al entrar.
- **Cómo bregamos** — pliego amarillo, cuatro pasos: *Escuchar · Pensar y creer · Crear · Bregar*.
- **Contacto** — **sello de goma** con su texto en círculo que se estampa al pasar el ratón, «ESCRÍBENOS» con las letras que saltan y el correo en marcador amarillo.
- **Pie** — sus 8 estrellas, cada una a su ritmo.
- **Extras** — **conmutador de tinta** (Canario → Saltimbanqui → Omnia → Isla, cambia toda la web), **cursor-rodillo que deja rastro de tinta**, marcas de registro de imprenta en las esquinas, grano de papel, barra superior que se tiñe según el pliego, y menú a pantalla completa en móvil.

## Diferencias con lo que ya había
| | v1 | v2 | **v3** |
|---|---|---|---|
| Fondo | Oscuro | Oscuro | **Papel hueso** (alterna con negro y amarillo) |
| Idea | Web premium | Ruido → señal | **Se imprime delante de ti** |
| Dependencias | GSAP + Lenis | GSAP + Lenis | **Ninguna** (solo tipografías) |
| Imágenes | Recreadas en CSS | Recreadas en CSS | **Sus pósters reales del feed** |
| Logotipo | Insignia circular | Insignia circular | **El de verdad, apilado** |

## Fallos reales cazados al verificarla
- **`aspect-ratio` ignorado**: el marco de los carteles era un `<span>` (inline), y en inline el `aspect-ratio` **no se aplica** — los carteles salían con la proporción de la foto en vez de la suya. Faltaba `display:block`.
- **`max-width: 20ch` medido con la letra equivocada**: el `ch` se calcula con el tamaño de fuente **del propio elemento**, no del párrafo gigante de dentro → el manifiesto se recortaba a 180 px y se leía «EST… TIE… NOS…».
- **El marcador salía negro**: el `<path>` del pincel no tenía `fill`, así que usaba el negro por defecto en vez de heredar el amarillo. Y sobre el pliego negro el `mix-blend-mode: multiply` se lo comía entero.
- **Un texto que se quedaba invisible para siempre**: con un scroll rápido, el `IntersectionObserver` puede **saltarse** un elemento entre dos fotogramas, y ese trozo ya no se revelaba nunca (le pasó al párrafo de Efemérides a 1280×800). Ahora hay una **red de seguridad** que repasa cada pocos fotogramas lo que ya quedó por encima del pliegue.
- **La barra superior en `mix-blend-mode: difference`** ponía el punto de tinta **azul** (amarillo invertido sobre papel). Cambiado por un cambio de color según el pliego que pasa por debajo.
- **Desborde horizontal** de 8–26 px en 390/768/1280: lo provocaba el diagrama de órbitas con `inset: -6% -2%`.
- **El `<button>` de cada cartel** conservaba el `padding: 1px 6px` del navegador y descuadraba los carteles respecto al título.
- Y el modal dejaba ver la web detrás por ser semitransparente.

## Verificación
Chrome por CDP, en **360 / 390 / 430 / 768 / 1280 / 1440 / 1920**:
- **0 desbordes horizontales**, **0 errores de consola**, **0 imágenes rotas**, **0 textos cortados**.
- **0 elementos sin revelar** al llegar al fondo (probado con scroll a saltos, que es lo que rompía antes).
- **Menú móvil**: tapa la pantalla y ningún rótulo se sale, en los cuatro anchos.
- **Ficha de proyecto**: abre, carga la imagen, bloquea el scroll y cierra bien (ratón, botón y `Esc`).
- **Conmutador de tinta**: cambia la paleta entera.
- **Con las tipografías de Google bloqueadas**: la web **no se descuadra** (cae en Helvetica/Arial) y no da errores.

## Cómo verla
`web/v3/index.html` con **Live Server** (clic derecho → *Open with Live Server*).
En Netlify quedaría: v1 en `/`, v2 en `/v2/`, **v3 en `/v3/`**.

> [!note] Los pósters de `web/v3/img/` son **suyos**, descargados de su propio Instagram para esta propuesta. Si la web sale adelante, mejor pedirle los originales en alta.
