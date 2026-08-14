---
name: labrega-studio
description: Cliente La Brega Estudio (Raúl Vega) — propuesta de web hecha con su marca real
metadata: 
  node_type: memory
  type: project
  originSessionId: a38d008c-192b-4c01-8820-2faaa5ce4909
  modified: 2026-08-11T18:34:28.261Z
---

**La Brega Estudio** — estudio de branding/dirección creativa (Canarias) de **Raúl Vega**, amigo y cliente de Alejandro. Alejandro le prepara una **propuesta de web** (la presentó ~2026-07-19).

⚠️ **Está en la bóveda personal, NO en la de Reload**: `C:\Users\galve\Documents\Ale\La Brega Studio\` (repo `Boveda-ALE`). La ruta antigua `BOVEDA/RELOAD/Webs/...` ya no existe.

**Hay CUATRO versiones de la web** (11-ago-2026), las cuatro funcionando y las anteriores sin tocar:
- **v1** — `web/index.html`. La propuesta original (un archivo, mismas animaciones que la demo [[Estudio Alisio]]).
- **v2 «Ruido → señal»** — `web/v2/index.html`. Sale de **sus dos frases**: *«No hacemos ruido»* → la web **empieza siendo ruido** (estática de verdad en canvas que se calla contando 000→100); *«El diseño no maquilla. Revela.»* → el manifiesto llega **maquillado** y el scroll (y el ratón) lo **revelan**. Sus **eclipses** → hero con un **eclipse en WebGL escrito a mano**, sin librerías. Además: galería horizontal anclada con ficha que abre como un eclipse, ficha flotante en servicios, letras que huyen del ratón, y **menú móvil** (la v1 no tenía). Verificada con 0 fallos, incluida una pasada con los CDN bloqueados.
  ⭐ **Ampliada el 9-ago-2026** con **10 animaciones de scroll** (manifiesto **anclado** —la sección se para y el revelador baja—, galería con **foco** en la tarjeta central, servicios que llegan **desintonizados** en dos canales de color, el sol del final que crece, el **grano que sube con la velocidad de scroll**) y una **portada nueva** con una sola idea: *hay un astro de verdad ahí y todo le obedece* — el titular **se curva** alrededor del eclipse y **se enciende con el color exacto de su corona**, más tres aros orbitando.
  🔑 **Dos reglas de esa portada, que costó descubrir:** (1) **«ruido» va JUNTO**, se va de una pieza — partido en letras parecía roto, no diseñado; (2) la lente **solo mueve en vertical**: en horizontal separa las letras y **abre las palabras**. Y para comprobarlo hay que medir con **`offsetLeft`**, no con `getBoundingClientRect`, que se ensancha solo al ladear una letra.
- **v3 «La Imprenta»** ⭐ — `web/v3/index.html`. Sale de **mirar su Instagram de verdad**. Como su feed es **cartelería de imprenta**, va **en papel claro** (las otras dos son oscuras) y la idea es que **la web se imprime delante de ti**: todo llega **descuadrado en CMYK** (el ruido) y **cuadra** al terminar (la marca). Desregistro reactivo al ratón, marcador amarillo pintado que se dibuja, servicios que se entintan, pared de carteles con el cartel que vuela a la ficha, órbitas SVG, sello de goma, **conmutador de tinta**, cursor-rodillo con rastro. **Cero dependencias de JS externo** y **sus pósters reales** como portfolio. Verificada con 0 fallos en 360→1920 y sin las tipografías de Google.

- **v4 «La Carta»** ⭐ — `web/v4/index.html` (11-ago-2026). Pidió *«una versión así de awwwards.com, **de la oscura**, que es la que más me gustó»*.
  🔑 **La observación que lo cambia todo: el degradado naranja→magenta→violeta NO es su identidad, es la paleta de OMNIA, que es un cliente suyo.** La v1 y la v2 lo usaban de papel pintado. Su negro de verdad es **una lámina impresa**: grano, arañazos, **grabado de puntos** (su Luna), **órbitas de línea fina con números romanos** (su OVNI), anotaciones a mano (San Borondón) y sus 8 estrellas. La v4 va en **negro + hueso + su amarillo de marcador**, y el color lo pone **su obra**. Hereda de la v3 el logotipo real, las 8 estrellas y sus pósters.
  🔑 **Una sola regla gobierna la web, y es su lema: LA VELOCIDAD HACE RUIDO, LA CALMA REVELA.** La luna del hero va en **semitono de puntos** (shader a mano) y **el tamaño del punto lo manda la velocidad del scroll**; el titular lleva dos fantasmas de tinta que cuadran al parar; los carteles se traman; el grano sube. Todo de la variable `--vel`.
  ⚠️ Ese decaimiento **debe llevar suelo** (por debajo de ~medio píxel por fotograma, quieto es quieto) o la trama se queda encendida para siempre; y **normalizado a tiempo**, no a fotogramas.
  🎞️ **Motor de animación** (2.ª vuelta, que pidió él con la colección *CSS & JS Animations* de Awwwards porque *«los revelados eran un opacity y un translateY»*): texto que **sube por líneas enmascaradas**, el **logotipo vuela** del preloader a la cabecera, **cortina** que destapa las fotos, **rótulos que ruedan**, **botones magnéticos**, **3D** en la galería (las láminas de los lados giran hacia dentro), **salida del hero ligada al scroll** y las 8 estrellas del pie escalonadas.
  El taller es una **galería anclada con `position:sticky`, sin GSAP**. Cero dependencias. Verificada 360→1920, **sin tipografías, sin JavaScript y con movimiento reducido**.


- **v5 «la maquetación de la v3 dentro de la v4»** — `web/v5/index.html` (14-ago-2026). Pidió: *«haz una versión v5, copias entera la v4 sin perder nada y trabajamos ahí»* + *«la maquetación de esta sección de la v3 en la v4… **MAQUETACIÓN NO CONTENIDO**»*. Copia byte a byte de la v4 y encima la **rejilla del pliego** en el manifiesto (filete arriba, rótulo display + folio, dos columnas 1.15fr/.85fr con la nota estrecha a 46ch arrancando más abajo) y en la **portada** (bloque centrado, fila de marca con logotipo grande + sello en mono a la derecha, titular **a sangre**, fila de abajo con bajada izq y datos der, «baja» descolgado al pie). **Ni un texto nuevo**: los datos son los de la v4 recolocados.
  🔑 **«A sangre» se calibra contra el ancho de CONTENIDO, no contra la caja.** Medí `.dentro` con su padding dentro (1425 px en vez de 1293) y el titular primero se quedó corto y luego se salió. Queda en 99,5 % a 1440 y 98,3 % a 1920, con el ensanchado **solo desde 760 px** para no romper el mínimo ya medido de la v4 en móvil (a 390 px el titular tiene que caber en una línea con `nowrap`).
  🔑 **Un `position:absolute` es tan bueno como su ancestro posicionado.** El «baja para ver» colgaba de `.dentro` (que es relative) y se montaba sobre la bajada: si va al pie de la sección, tiene que ser **hijo de la sección**.
  🔑 **Un degradado de velo tiene que apagarse DENTRO de su propia caja** o dibuja un canto recto: con el radio vertical al 300 % llegaba vivo al borde y partía la luna con una línea.
  ⚠️ **Si renombras un contenedor, busca quién colgaba de él**: al pasar `.pie` a `.hero-datos`, la hora local perdió el `flex-direction:column` y salió `HORA LOCAL10:44:48`.

En Netlify: v1 en `/`, v2 en `/v2/`, v3 en `/v3/`, **v4 en `/v4/`**.

Nota: [[La Brega Studio]].

**Contacto:** IG @labrega_estudio · TikTok @labrega.estudio · somoslabrega@gmail.com.

**Su marca (revisada el 8-ago mirando su Instagram, para no reinvestigar):** lema *"No hacemos ruido. Hacemos marcas."*. Su feed son **carteles de imprenta**: base negra o blanca con **mucho grano**, foto de archivo canaria en B/N y grabados antiguos; acentos **amarillo canario** (marcador pintado a mano), **verde ácido** (Saltimbanqui) y **degradado naranja→magenta→verde** (Omnia); motivos cósmicos (órbitas, eclipses, números romanos); tipografía mezclada a propósito (grotesca muy bold + serif editorial + caligráfica + tipo tiza); efemérides inventadas con humor; orgullo canario.
⚠️ **Dos cosas que la v1 y la v2 tienen MAL** (descubierto el 8-ago): (1) su **logo NO es una insignia circular** —eso era el recorte del avatar—, es el **apilado a la izquierda `LA` fino / `BREGA` negra / `ESTUDIO.` fino con el punto gordo**; (2) tienen un **sistema de 8 estrellas/asteriscos** que es su firma gráfica (en la v3 están dibujadas en SVG).
Proyectos suyos: Saltimbanqui, Omnia, "El diseño no maquilla. Revela.", Día de Brega, San Borondón 1840.
**Su voz** (de sus pies de foto): *«Venimos a crear. Venimos a construir. Venimos a bregar.»* · *«De pensar y creer; y después crear. En ese orden.»*

⚠️ **Y una lección que ya me ha costado tres veces EN ESTE MISMO PROYECTO:** antes de escribir la siguiente versión, **releer los fallos de la anterior**. En la v4 repetí los tres que ya estaban documentados: la palabra partida por la mitad al trocear un titular en letras `inline-block`, el modal semitransparente que deja ver la web de detrás, y los revelados disparándose por debajo del preloader. Y una regla nueva de la v4: **si un nodo se puede regenerar (troceo de texto que se rehace al cargar tipografías o al cambiar de ancho), no le cuelgues estado ni observadores — cuélgaselos a su contenedor**, que no se destruye.


**🔁 Retoque de la v2 (14-ago-2026)** — la v1, la v3 y la v4 sin tocar:
- **Sus cuatro pósters ya se ven en la v2 (y en la v1).** Los pedía por código desde el 8-ago con un `onerror` que los quita si faltan, pero **`web/img/` estaba vacía** (los originales vivían solo en `v3/img/` y `v4/img/`), así que siempre se vio el arte generado. ⚠️ **Un respaldo silencioso esconde el fallo**: la web se veía «bien» y por eso nadie notó que faltaban sus carteles.
- **«Cómo bregamos» va sobre su fotografía de la romería** (lo pidió él: *«que en algún sitio haya una foto de fondo, que a mi cliente le gustan mucho esas secciones»*). Foto a sangre en blanco y negro apagada, velo que **arranca y acaba en el negro de la página**, `.valores` con fondo transparente (deja de ser panel sólido) y parallax del 7 % que se para con movimiento reducido. **Es el tratamiento del manifiesto de la v4 portado, no un lenguaje nuevo.**
- 🔑 **El encuadre de una foto de fondo NO se resuelve con `object-position`.** En móvil la sección se estira, `object-fit:cover` deja de recortar por arriba y **sale el titular y el logotipo del propio cartel por detrás del texto**. Lo que hay que recortar es **el archivo**: `img/romeria-fondo.jpg` (1000×630, solo la romería).
- 🔑 **El velo va en la sección, no en la capa que se mueve.** Si cuelga de la capa con `inset:-14%`, en el borde real de la sección el degradado sigue siendo semitransparente y **se ve la costura**.
- Contraste medido **sobre el píxel pintado** (canvas rehaciendo filtro + encuadre + velo): 10,4:1 titular, 7,7:1 párrafos, 6,9:1 la etiqueta de 12 px. 0 desbordes y 0 errores de 360 a 1920.
- ⚠️ A 1920 px la foto se estira **×1,92** (sus originales son de 1000 px): otro motivo para pedirle **los pósters en alta**.

**Pendiente:** que Alejandro **vea la v4 y elija** entre v1, v2, v3 y v4; logo PNG real; **confirmar con Raúl los textos de las fichas de proyecto**, que son recreación de sus pies de foto; y desplegar en Netlify. (Las **imágenes reales ya están**: son sus pósters del feed, en `web/v3/img/` y `web/v4/img/`.) Relacionado: [[user-profile]], [[preview-web-changes]], [[boveda-alejandro-personal]].
