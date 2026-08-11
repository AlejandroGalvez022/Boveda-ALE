---
titulo: Versión 4 de la web (La Carta)
tipo: conversacion
proyecto: La Brega Studio
fecha: 2026-08-11
tags: [conversacion, web, webgl, semitono, awwwards, propuesta]
---

# 2026-08-11 · Versión 4 de la web — «La Carta»

Proyecto: [[La Brega Studio/La Brega Studio|La Brega Studio]]

## Qué pidió Alejandro
> «hay una web llamada awwwards.com… son webs con premios. Haz una versión así de La Brega, **de la oscura, que es la que más me gustó**. Tómate el tiempo que necesites, hazlo lo mejor que puedas.»

## La observación de la que sale todo

La v1 y la v2 son oscuras, sí — pero su oscuro era **negro premium con el degradado de neón de Omnia usado de papel pintado**. Volviendo a mirar sus carteles de verdad, su negro no es eso:

| Su pieza | Qué hay en el negro |
|---|---|
| Día de la Luna | **Grabado de puntos** (semitono/puntillismo), estrellas finas, grotesca + caligráfica |
| Día del OVNI | **Diagrama orbital de línea fina** con **números romanos**, tipo tiza, anotación a mano |
| San Borondón 1840 | Archivo en B/N muy granulado, display apilada, «Ab. n1» escrito a mano |
| Las 8 estrellas | Negro **arañado**, logotipo apilado, sus ocho estrellas |

> **Su mundo oscuro es una lámina impresa: grano, arañazos, grabado de puntos, órbitas con números romanos y anotaciones.** El degradado naranja→magenta→verde es **la paleta de Omnia** (un cliente), no la identidad del estudio.

Así que la v4 tira el degradado como fondo y se queda con **negro + hueso + su amarillo de marcador**. El color lo pone **su obra**, no el papel pintado. Y se queda **el logotipo de verdad y sus 8 estrellas**, que la v3 había corregido y las oscuras no tenían.

## La idea: una sola regla para toda la web

> ### La velocidad hace ruido. La calma revela.

Su lema (*«no hacemos ruido»*) convertido en una física que gobierna la página entera:

- **La luna del hero** está pintada con un **semitono de puntos** en un shader escrito a mano. **El tamaño del punto lo manda la velocidad del scroll**: vas rápido y la luna se deshace en puntos gordos y desordenados; paras y el punto se afina hasta que la luna se ve nítida.
- **El titular** llega con **dos fantasmas de tinta** (canario y verde) que se separan al moverte y **cuadran** al parar. Desregistro de imprenta hecho con tipografía.
- **Los carteles** se cubren de trama de semitono según la velocidad.
- **El grano** de toda la página sube con la velocidad.

Todo cuelga de una sola variable, `--vel`. **Medido, no supuesto:**

| | `--vel` | trama (opacidad) | punto | grano |
|---|---|---|---|---|
| En reposo | `0.000` | `0` | 3 px | 0.055 |
| Moviéndose | `0.264` | `0.211` | 5,4 px | 0.081 |
| Al parar | `0.000` | `0` | 3 px | 0.055 |

## Qué lleva, sección a sección

- **Preloader** — la lámina se revela: grano pintado a mano en un canvas que **se calla** mientras cuenta 000→100, el logotipo real y **sus 8 estrellas encendiéndose una a una**. Frase: *«Esta tierra nos enseñó algo antes que el diseño: nos enseñó a bregar.»*
- **Hero** — la **luna en semitono** (WebGL a mano, sin librerías), iluminada desde abajo a la izquierda como en su cartel. Órbitas finas, campo de estrellas, coordenadas `28°07′N · 15°26′O` y **hora local de Canarias en vivo**.
- **Cinta** — velocidad y sentido los manda el scroll.
- **Manifiesto** — sobre **su fotografía real** (la romería de «La rebeldía de ser felices», recortada por abajo para no pelear con el rótulo original), con la palabra **bregar subrayada por su marcador amarillo** pintado a mano.
- **Lo que hacemos** — seis filas que **se entintan enteras** en amarillo al pasar, con su estrella al final.
- **El taller** ⭐ — **galería horizontal anclada** con `position:sticky` (sin GSAP): **cinco láminas** = sus cinco carteles reales, rotuladas `LÁMINA I…V`. La del centro va nítida y a tamaño; las de los lados, apagadas y más pequeñas. Al pulsar, **la lámina vuela desde su sitio hasta la ficha** (FLIP).
- **Efemérides** — su archivo sobre **órbitas SVG que se dibujan**, con números romanos, en un carril que se arrastra.
- **Cómo bregamos** — *Escuchar · Pensar y creer · Crear · Bregar*, de su propio pie de foto (*«de pensar y creer; y después crear. En ese orden»*).
- **Contacto** — `VAMOS A BREGAR` gigante, las letras se apartan del ratón.
- **Extras** — **cursor de retículo de carta náutica**, scroll suave propio, menú a pantalla completa, sus 8 estrellas en el pie, y numeración de secciones en romanos.

**Cero dependencias de JS externo** (ni GSAP ni Lenis). Solo tipografías, y aguanta sin ellas.

## Segunda vuelta: el motor de animación

Alejandro, al verla: *«lo que quería era que tuviera las animaciones que tienen estas webs»*, con la colección **[CSS & JS Animations de Awwwards](https://www.awwwards.com/awwwards/collections/css-js-animations/)** (145 piezas).

Tenía razón: el concepto estaba, pero los revelados eran de lo más básico — todo entraba con un `opacity 0 → 1` y un `translateY(30px)`. Mirando la colección, lo que repiten esas webs **no es un efecto suelto, es un vocabulario**. Se ha montado entero:

| Gesto | Dónde | De qué web sale |
|---|---|---|
| **Texto que sube por líneas enmascaradas** | todos los titulares, el manifiesto, los párrafos, los pasos | es *el* gesto común de la colección |
| **Transición de preloader**: el logotipo **vuela** desde la pantalla de carga hasta su sitio en la cabecera | preloader → hero | Malvah Studio |
| **Cortina de imagen**: la foto se destapa de abajo arriba y se posa | las 11 imágenes | Faubourg, Akaru |
| **Rótulos que ruedan**: el texto sube y entra su copia por debajo | menú, redes, pie | Reframed |
| **Botones magnéticos** | «Hablemos», «Cuéntanos tu proyecto» | clásico de la casa |
| **3D en la galería**: las láminas de los lados se giran hacia dentro, como un atlas abierto | El taller | Vionaro V8, 12 Brews |
| **Salida del hero ligada al scroll** (*scrub*): sube, se encoge y se apaga | hero | Villainy, Lusion |
| **Racimo escalonado** | las 8 estrellas del pie | Alec Tear |

**Cómo funciona el troceado.** El JS parte el texto en palabras conservando `<em>`, `<br>` y los bloques que no se pueden partir (la palabra «bregar» lleva el SVG del marcador dentro), **mide cuál ha caído en cada línea** y las agrupa con su máscara. Se rehace cuando cargan las tipografías y al cambiar de ancho, porque las líneas rompen en otro sitio.

**Medido:** 22 líneas y 111 palabras troceadas · una línea pasa de `translateY(88.3px)` a `none` al entrar · el marcador pinta **4.862 píxeles amarillos** · las 11 cortinas abren · los giros de las láminas van de **+14,91° a −14,92°** con la del centro exactamente a 0°.

### Dos trampas de esta segunda vuelta

- 🔴 **Se perdió el marcador amarillo de «BREGAR».** Su revelado lo disparaba un observador atado a esa palabra; al **rehacer el troceado** cuando cargan las tipografías, ese nodo se vuelve a crear y el observador se queda mirando un nodo suelto. Ahora lo dispara **el propio blockquote**, que nunca se destruye —solo se le cambia el contenido dentro—. Sin JS.
- 🟡 **En `TROCEAR` no pueden entrar los rótulos con `display:flex`** (`.manif .rotulo`, `.cabecera .lado`, `.contacto .rotulo`): partir en líneas convierte los hijos en bloques y destroza la fila.

Y dos detalles de cuidado: el rótulo duplicado del efecto «rueda» va en `position:absolute` **justo debajo**, no apilado, o la caja mediría dos líneas de alto; y las máscaras llevan `padding-bottom:.1em` con `margin-bottom:-.1em` para que `overflow:hidden` **no se coma las tildes** de «ENSEÑÓ» ni «CÓMO».

## Fallos reales cazados (y cómo se cazaron)

- 🔴 **Dos `smoothstep` con los bordes al revés en el shader.** `smoothstep(rad, rad-0.16, x)` con `rad = 0` es **comportamiento indefinido** en GLSL: en algunas GPU la pantalla entera se pone blanca. Los dos reescritos como `1.0 - smoothstep(a, b, x)` con `a < b` siempre.
- 🔴 **«VAMOS A BRE / GAR.»** — al partir el titular en letras `inline-block`, la línea rompía por la mitad de la palabra. Cada palabra va ahora en una caja `nowrap`. *(Es exactamente el mismo fallo que ya salió en la v2: no aprendí a la primera.)*
- 🔴 **La ficha dejaba ver la web de detrás.** `rgba(8,8,10,.98)` no es opaco: se leía el manifiesto por debajo del titular. *(También pasó en la v3.)*
- 🔴 **Trampa de scroll en el carrusel.** La rueda vertical sobre Efemérides lo movía en horizontal y bloqueaba la página: al llegar al final te quedabas atascado. Ahora la rueda vertical **siempre baja la página**; el carril se arrastra, se desliza con el dedo o con las flechas.
- 🔴 **El semitono se quedaba encendido para siempre.** La velocidad decaía exponencialmente y nunca llegaba a cero, así que la trama se quedaba a un ~15% eternamente y *«la calma revela»* no llegaba nunca. Ahora hay **suelo**: por debajo de medio píxel por fotograma, quieto es quieto.
- 🔴 **La velocidad iba por FOTOGRAMA, no por tiempo.** En un monitor de 120 Hz la web se aquietaría el doble de rápido. Normalizada a píxeles por fotograma de 60 Hz.
- 🔴 **Las láminas se dimensionaban solo por ancho.** En pantallas bajas (1280×800) la lámina no cabía en el alto y el sello se metía debajo de la cabecera. Ahora el ancho sale del **alto disponible**.
- 🔴 **El hero se revelaba por debajo del preloader**, así que al subir la pantalla de carga ya estaba todo puesto y se perdía la entrada.
- 🔴 **`<img src="">`** en la ficha apunta a la propia página y dispara un error de carga.
- 🟡 El menú caía **encima de la luna** y no se leía: 2,32:1. Medido sobre el píxel pintado.
- 🟡 `vector-effect:non-scaling-stroke` en las órbitas hacía que el `stroke-dasharray` se midiera en píxeles de pantalla y **rompía el dibujado**.
- 🟡 `font-size:11px` dentro de un `viewBox` de 200 unidades se veía a **80 px**.

## Y tres errores de mi propia medición

1. **Medí el contraste del titular sin ocultar el titular** → salió 1,01:1, que no significa nada: estaba midiendo la luminancia de sus propias letras.
2. **`pin.offsetTop` es relativo a `.taller`**, no al documento, así que la captura del taller anclado salió en el manifiesto.
3. **Perseguí un fantasma media hora**: `--vel` parecía congelada en 0,234. No lo estaba — **Chrome headless corre `requestAnimationFrame` a ~4 fps** y la velocidad decaía por fotograma. Solo se vio metiendo una sonda que contara fotogramas.

Y de propina, dos falsos positivos de mi sonda de «texto cortado»: las capas de tinta escondidas con `translateY(101%)` **sí** ensanchan el `scrollHeight`, aunque no se vea nada mal.

## Verificación

Chrome por CDP desde PowerShell (sin Node), en **360 / 390 / 430 / 768 / 1280 / 1440 / 1920**:

- **0 desbordes horizontales**, **0 errores de consola**, **0 imágenes rotas**, **0 elementos sin revelar** al llegar al fondo.
- **Contraste sobre el píxel pintado**: menú **6,4:1** en reposo y **11,2:1** el activo; bajada **4,6:1**; titular sobre un fondo de luminancia media 0,0035 (negro puro).
- **La regla, medida** (la tabla de arriba): reposo → movimiento → reposo.
- **Ficha**: abre, la lámina vuela desde su sitio, el fondo es opaco (`rgb(8,8,10)`) y cierra con ratón, botón y `Esc`.
- **Menú móvil**: tapa la pantalla entera y **ningún rótulo se sale** a 390.
- **Sin las tipografías de Google**: la web no se descuadra (cae en Helvetica/Arial) y no da errores.
- **Sin JavaScript**: la página entera sigue en pie, la galería **se apila** y las cinco láminas siguen siendo alcanzables. El hero conserva su luna porque **el respaldo en CSS es el estado por defecto** y el shader se lo quita solo si arranca.
- **Movimiento reducido**: preloader fuera, todo visible, y el shader **se apaga** y deja el respaldo.
- **Rueda sobre el carrusel**: la página baja (6303 → 8193) y el carril no se mueve. Sin trampa.

## Consumo

Se bajó a propósito después de que a Alejandro se le pusiera la CPU al 100 %: pixel del shader limitado a 1,25 y a 1800 px de ancho, el shader **se para** fuera de vista y en pestaña oculta, y la capa de grano pasó de medir casi 5 pantallas a una capa compuesta por GPU.

> ⚠️ Lo de la CPU **no era la web**: era que mi limpieza de Chrome headless usaba `Get-Process … CommandLine`, que en PowerShell 5.1 **viene vacío**, así que no mataba nada y se iban acumulando navegadores. Corregido con WMI.

## Cómo verla

`web/v4/index.html` con **Live Server** (clic derecho → *Open with Live Server*).
En Netlify quedaría: v1 en `/`, v2 en `/v2/`, v3 en `/v3/` y **v4 en `/v4/`**.

> [!todo] Verificar con Raúl
> Los textos de las **fichas de lámina** son una recreación a partir de sus publicaciones de Instagram. La propia ficha lo avisa por escrito.

> [!note] Los pósters de `web/v4/img/` son **suyos**, de su Instagram. Si sale adelante, pedirle los originales en alta.
