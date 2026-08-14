---
titulo: La Brega Studio
tipo: proyecto
categoria: Personal
estado: activo
siguiente: "14-ago (fin de sesion): la V5 es la version viva. Lleva la maquetacion de la v3 (manifiesto a dos columnas y portada A SANGRE), «Como bregamos» y el CONTACTO traidos ENTEROS de la v3 (banda amarilla y sello), y EL SALTO AL CONTACTO: una estrella se acerca, una plancha amarilla cubre la web y sobre ella entra toda la secuencia de las ocho. ⚠️ CAMBIO DE RUMBO APUNTADO: en la web las estrellas NO representaran las islas, sino las AREAS DE TRABAJO (en su marca si son las islas, pero en la web no). Eso obliga a rehacer la escena entera: la linea de nombres, la frase «Son ocho porque somos ocho», el pie, el rotulo del menu y el hover. Y OJO: las estrellas son 8 pero las areas de la web son 6 - hay que decidir antes (subir a 8 areas, usar 6 estrellas o emparejar). AHORA TOCA: (1) decidir eso del numero, (2) rehacer la escena con las areas, (3) pasarle a la v5 la bateria completa (sin JS, sin tipografias, movimiento reducido), (4) elegir version y publicar en Netlify. PENDIENTE DE SIEMPRE: logo PNG original, posters en alta y confirmar los textos con Raul"
conversaciones: 5
tags: [proyecto, web, cliente, propuesta]
---

# La Brega Studio

Volver al [[Indice]]

## Cliente
**Raúl Vega** (amigo de Alejandro). Su estudio: **La Brega Estudio** — estudio de branding y dirección creativa, Canarias.
- Instagram: [@labrega_estudio](https://www.instagram.com/labrega_estudio/)
- TikTok: [@labrega.estudio](https://www.tiktok.com/@labrega.estudio)
- Email: somoslabrega@gmail.com

## Qué es
**Propuesta de web** (página de inicio) para presentarle a Raúl. Hecha **con su marca real**, investigada a partir de su Instagram.

## Su marca (revisada el 8-ago mirando su Instagram de verdad)
- **Lema:** *"No hacemos ruido. Hacemos marcas."* (es su hero).
- **Estilo:** su feed son **carteles de imprenta**. Base negra o blanca con **mucho grano**, fotografía de archivo canaria en B/N y grabados antiguos. Acentos: **amarillo canario** (marcador pintado a mano), **verde ácido** (Saltimbanqui) y el **degradado naranja→magenta→verde** (Omnia). Motivos **cósmicos** (órbitas, eclipses, diagramas con números romanos). Tipografía mezclada a propósito: grotesca muy bold + serif editorial + caligráfica + tipo tiza. Orgullo **canario** y efemérides inventadas con humor.
- **Logo:** ⚠️ **NO es una insignia circular** (eso era el recorte del avatar). Es un **logotipo apilado a la izquierda**: `LA` fino / **`BREGA`** negra / `ESTUDIO.` fino con el punto gordo. Recreado bien en la v3; la v1 y la v2 lo tienen mal.
- **Sistema gráfico:** tienen **8 estrellas/asteriscos** propios (de 8 puntas, flor de 8 pétalos, destello de 4, de 12, con anillo, con cruz…). Es su firma. En la v3 están dibujadas en **SVG**.
- **Trabajos suyos referenciados** en la web: Saltimbanqui, Omnia, "El diseño no maquilla. Revela.", Día de Brega (Día de Canarias), San Borondón 1840.

## Dónde está / cómo verla
Hay **cinco versiones**, y las cinco funcionan. Se trabaja en la **v5**; las demás **no se tocan**.

| | Archivo | En Netlify | Qué es |
|---|---|---|---|
| **v1** | `web/index.html` | `/` | La propuesta original (19-jul). Oscura, premium. |
| **v2** | `web/v2/index.html` | `/v2/` | «Ruido → señal» (8-ago, retocada el 14-ago). Oscura. Eclipse en WebGL, manifiesto que se revela, galería anclada **con sus pósters reales** y **«Cómo bregamos» sobre su fotografía**. |
| **v3** | `web/v3/index.html` | `/v3/` | «La Imprenta» (8-ago). **En papel claro.** La web se imprime delante de ti, con desregistro CMYK. **Sus pósters reales** y **cero dependencias**. |
| **v4** | `web/v4/index.html` | `/v4/` | «La Carta» (11-ago). **La oscura, a nivel Awwwards.** Su negro entendido como **lámina impresa**: luna en **semitono de puntos** (WebGL a mano), órbitas con romanos, sus 8 estrellas. Una sola regla: **la velocidad hace ruido, la calma revela.** Cero dependencias. |
| **v5** ⭐ | `web/v5/index.html` | `/v5/` | La v4 **con lo mejor de la v3** (14-ago). Rejilla del pliego en el manifiesto y en la portada (titular **a sangre**); **«Cómo bregamos» y el contacto traídos enteros de la v3** (la banda amarilla y el sello); y una sección nueva: **las ocho estrellas son las ocho islas**. |

Ábrelas con **Live Server** en VSCode (clic derecho → *Open with Live Server*). Necesitan internet (Google Fonts, y la v2 además GSAP + Lenis — si no cargan, la web sigue funcionando entera).

## Conversaciones
- [[La Brega Studio/2026-08-14 - Apuntes - la maquetacion de la v3 en la v4 (v5)|2026-08-14 · Apuntes — la maquetación de la v3 en la v4 (v5)]]
- [[La Brega Studio/2026-08-14 - La v2 se apoya en su fotografia|2026-08-14 · La v2 se apoya en su fotografía]]
- [[La Brega Studio/2026-08-11 - Version 4 de la web (La Carta)|2026-08-11 · Versión 4 de la web (La Carta)]]
- [[La Brega Studio/2026-08-08 - Version 3 de la web (La Imprenta)|2026-08-08 · Versión 3 de la web (La Imprenta)]]
- [[La Brega Studio/2026-08-08 - Version 2 de la web (Ruido a senal)|2026-08-08 · Versión 2 de la web (Ruido → señal)]]

## Qué lleva la v4 (11-ago) ⭐
Alejandro pidió *«una versión así de awwwards, **de la oscura**, que es la que más me gustó»*.

**La observación de la que sale todo:** el negro de la v1 y la v2 era *premium con degradado de neón* — pero ese degradado es **la paleta de Omnia**, un cliente, usada de papel pintado. Mirando sus carteles, **su negro es una lámina impresa**: grano y arañazos, **grabado de puntos** (su Luna), **diagrama orbital de línea fina con números romanos** (su OVNI), anotaciones a mano (San Borondón) y sus 8 estrellas. La v4 se queda en **negro + hueso + su amarillo de marcador**, y el color lo pone **su obra**.

**Una sola regla, que es su lema hecho física:** *la velocidad hace ruido, la calma revela.*
- **La luna del hero** está pintada en **semitono de puntos** con un shader escrito a mano, y **el tamaño del punto lo manda la velocidad del scroll**: rápido = se deshace en puntos gordos; quieto = nítida.
- El **titular** llega con dos fantasmas de tinta (canario y verde) que **cuadran** al parar.
- Los **carteles** se cubren de trama y el **grano** de la página sube, los dos con la velocidad.
- Medido: en reposo `--vel 0.000` / trama invisible / punto de 3 px; moviéndose `--vel 0.264` / trama al 21 % / punto de 5,4 px.

**Y hereda de la v3 lo que las oscuras no tenían:** el **logotipo real** (apilado, no la insignia circular), sus **8 estrellas** en SVG y **sus pósters reales**.

- **El taller**: galería horizontal anclada con `position:sticky` (sin GSAP), **cinco láminas** rotuladas `LÁMINA I…V`; la del centro nítida, las de los lados apagadas; al pulsar, **la lámina vuela desde su sitio hasta la ficha**.
- **Manifiesto** sobre **su fotografía** de la romería, con «bregar» subrayado por **su marcador amarillo**.
- **Efemérides** sobre **órbitas SVG que se dibujan**, con números romanos.
- **Extras**: cursor de retículo náutico, hora de Canarias en vivo, coordenadas, scroll suave propio, menú a pantalla completa.
- **El motor de animación** (segunda vuelta, tras pedirlo él con la colección *CSS & JS Animations* de Awwwards): **todo el texto sube por líneas enmascaradas** · el **logotipo vuela** desde el preloader hasta la cabecera · las **fotos se destapan con una cortina** · los **rótulos ruedan** al pasar por encima · **botones magnéticos** · las **láminas se giran en 3D** como un atlas abierto · el **hero se va ligado al scroll** · las 8 estrellas del pie entran escalonadas.
- **Cero dependencias de JS externo.**
- **Verificada: 0 fallos** en 360 / 390 / 430 / 768 / 1280 / 1440 / 1920. Contraste medido **sobre el píxel pintado** (menú 6,4:1). Aguanta **sin las tipografías**, **sin JavaScript** (la galería se apila y las 5 láminas siguen alcanzables) y con **movimiento reducido**.

## Qué lleva la v3 (8-ago) ⭐
Sale de **mirar su Instagram de verdad**: los 8 posts en alta y sus pies de foto. Como su feed es **cartelería de imprenta**, la v3 rompe con las otras dos y va **en papel claro**.
- **La idea:** *la web se imprime delante de ti*. Su *«no hacemos ruido»* se traduce en el **registro de color**: todo llega **descuadrado en CMYK** y **cuadra** al terminar de imprimirse.
- **Hero** con `BREGAR` y **desregistro CMYK reactivo** al ratón y a la velocidad del scroll · **preloader de tres pasadas de tinta** con rodillo que barre.
- **Manifiesto** con sus frases reales y la palabra «bregar» **subrayada por un marcador amarillo pintado** que se dibuja al entrar.
- **Servicios** que **se entintan enteros** al pasar por encima · **pared de carteles** escalonada donde el cartel **vuela desde su sitio** hasta la ficha.
- **Efemérides** (su cartelería propia) sobre **órbitas SVG que se dibujan** · **sello de goma** que se estampa en contacto · sus **8 estrellas** en el pie.
- **Conmutador de tinta**: cambia toda la web (Canario → Saltimbanqui → Omnia → Isla). **Cursor-rodillo** que deja rastro de tinta.
- **Dos correcciones de marca**: el **logotipo real** (apilado, no insignia circular) y sus **8 estrellas** dibujadas en SVG.
- **Sus pósters reales** como portfolio (`web/v3/img/`), ya no hay huecos. Y **cero dependencias de JS externo**.
- **Verificada: 0 fallos** en 360 / 390 / 430 / 768 / 1280 / 1440 / 1920 — sin desbordes, sin errores de consola, sin textos cortados, sin nada que se quede invisible, y aguantando **sin las tipografías de Google**.

## Qué lleva la v2 (8-ago)
El concepto no es un efecto: son **sus dos frases** convertidas en interacción.
- *«No hacemos ruido»* → **preloader de estática de verdad** (canvas, píxel a píxel) que **se va callando** mientras cuenta 000→100.
- *«El diseño no maquilla. Revela.»* → el manifiesto llega **maquillado** y el **scroll (y el ratón) lo revelan**.
- Sus **eclipses** → hero con un **eclipse en WebGL escrito a mano**, sin librerías, que se abre al bajar.
- Y además: marquee cuya velocidad manda el scroll · ficha flotante por servicio · **galería horizontal anclada** con ficha que **abre como un eclipse** desde donde pulsas · letras que huyen del ratón en contacto · **menú a pantalla completa en móvil** (la v1 no tenía) · cursor que invierte lo de debajo.
- **Verificada: 0 fallos** en 390 / 768 / 1280 / 1440 / 1920, incluida una pasada **con los CDN bloqueados** (sin ellos la galería se apila y los 4 proyectos siguen alcanzables).


### Y lo que gana el 14-ago
- **Sus pósters reales, por fin visibles.** La v2 los pedía por código desde el 8-ago, pero `web/img/` estaba vacía y se veía el arte de respaldo. Copiados ahí los cuatro: ahora la galería enseña **sus carteles**. (La **v1** también los usa: se le llenaron los huecos de paso.)
- **«Cómo bregamos» se apoya en su fotografía.** Era la única sección de solo texto y números. Ahora lleva **su romería a sangre**, en blanco y negro y apagada, con un velo que arranca y termina en el negro de la página, y **la tarjeta deja de ser un panel sólido**: el fondo lo pone la foto. Mismo tratamiento que el manifiesto de la v4. La foto **respira con el scroll** y se para con movimiento reducido.
- La foto es un **recorte propio** (`img/romeria-fondo.jpg`): solo la romería, sin la parte alta del cartel, **porque en móvil salía su titular por detrás del mío**.
- Contraste medido **sobre el píxel pintado**: 10,4:1 el titular, 7,7:1 los párrafos, 6,9:1 la etiqueta pequeña. 0 desbordes de 360 a 1920, 0 errores.

## Qué lleva la v1
Preloader, logo circular animado, cursor propio, hero con degradado de marca, marquee, botones magnéticos, grano. **Scroll premium con Lenis (suave/inercia) + GSAP ScrollTrigger** (revelados con stagger y dirección, hero con scrub, **manifiesto revelado palabra por palabra** ligado al scroll, e **inclinación de las tarjetas por velocidad de scroll**); si las librerías no cargan, cae en animaciones caseras (nada se rompe). Secciones: hero → marquee → manifiesto ("Revela") → servicios (01–06) → trabajo (4 proyectos suyos) → cómo bregamos → contacto. Verificada sin errores de JS; diseño comprobado con capturas.

## Próximos pasos
- [ ] **Abrir la v5 y verla** (`web/v5/index.html`) y decidir: ¿v1, v2, v3, v4 o v5?
- [ ] Pasarle a la v5 la **batería completa** de la v4: sin JavaScript, sin las tipografías de Google y con movimiento reducido.
- [ ] Confirmar con Raúl los **textos de las fichas de proyecto** (son recreación de sus pies de foto).
- [ ] Pasar el **logo PNG original** (en la v3 está recreado bien en CSS, pero para fidelidad total).
- [ ] Pedirle a Raúl **sus pósters en alta**: a 1920 px la foto de «Cómo bregamos» se estira ×1,92 (el original son 1000 px de ancho).
- [x] ~~Meter **imágenes reales** de sus proyectos~~ → hecho en la v3: son **sus pósters reales** del feed. Pedirle los originales en alta si sale adelante.
- [ ] Ajustar textos/servicios con Raúl tras presentarla.
- [ ] Publicar en **Netlify** para enseñarla con un enlace → guía lista en [[La Brega Studio/GUIA - publicar en internet|Guía - publicar en internet]]. Repo git ya preparado en `web/`; falta crear el repo en GitHub y pasar la URL.

> [!note] Propuesta comercial. Los textos de proyectos son recreaciones de su feed; confirmar con el cliente.
