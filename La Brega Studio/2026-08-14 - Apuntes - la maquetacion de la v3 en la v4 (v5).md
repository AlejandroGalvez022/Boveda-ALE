---
titulo: Apuntes - la maquetación de la v3 en la v4 (v5)
tipo: apunte
proyecto: La Brega Studio
fecha: 2026-08-14
tags: [apunte, encargo, v5, maquetacion]
---

# 2026-08-14 · Apuntes de Alejandro — la maquetación de la v3, en la v4

Proyecto: [[La Brega Studio/La Brega Studio|La Brega Studio]]

## Lo que pidió, con sus palabras
> «vamos a trabajar con la v4. haz una versión **v5**, copias entera la v4 **sin perder nada** y trabajamos ahí. La **maquetación de esta sección de la v3 en la v4** [el manifiesto]. Aparte de eso fíjate en la **maquetación del hero de la portada de la v3**… **MAQUETACIÓN NO CONTENIDO**. Necesito que la maquetación de la v3 esté en la v4.»

## La regla de este encargo
**Se porta la MAQUETACIÓN, no el contenido.** O sea: la rejilla, la jerarquía, dónde cae cada bloque, los tamaños relativos, el aire. **No** se toca el texto de la v4, ni su paleta (negro + hueso + su amarillo), ni su fotografía, ni sus mecanismos (la luna en semitono, `--vel`, las láminas).

## De qué versión sale cada cosa
- **Base:** la **v4 «La Carta»**, copiada entera a **`web/v5/index.html`** (copia verificada byte a byte, mismo hash). La v1, v2, v3 y **v4 no se tocan**.
- **Maquetación a portar:** la de la **v3 «La Imprenta»** (`web/v3/index.html`), en dos sitios:
  1. **El manifiesto** — el de la captura que mandó: filete arriba, rótulo `MANIFIESTO` a la izquierda y folio `01 / Pliego` a la derecha, el titular display enorme ocupando la columna izquierda (con `bregar` subrayado por el marcador y la palabra en cursiva caligráfica de por medio), y una **columna estrecha de texto en serif a la derecha**, más baja, con la firma en mono debajo.
  2. **El hero de la portada** — solo su maquetación.

## Estado
- [x] **v5 creada** como copia exacta de la v4 (`diff -r` sin diferencias, mismo SHA).
- [x] **Maquetación del manifiesto de la v3 → v5.** Filete arriba, `MANIFIESTO` display a la izquierda con el folio a la derecha, y dos columnas 1.15fr/.85fr: titular a la izquierda, nota estrecha (46ch) que arranca más abajo a la derecha, con la firma debajo.
- [x] **Maquetación del hero de la v3 → v5.** Bloque centrado en vertical, fila de marca (logotipo grande + sello en mono a la derecha), titular **a sangre** (98–99,5 % del ancho útil) y fila de abajo con la bajada a la izquierda y los datos a la derecha. El «baja para ver» se descuelga al pie.

> [!warning] Lo que NO se toca
> La v1, la v2, la v3 y la v4 se quedan como están. Todo el trabajo va en `web/v5/`.

## Lo que costó (fallos reales de esta sesión)
1. **El titular no llegaba al borde y luego se salía.** Estaba midiendo el ancho de `.dentro` **con su padding incluido** (1425 px) en vez del ancho útil (1293 px), así que lo agrandé de más y se comía el margen. La regla: el titular a sangre se calibra contra el **ancho de contenido**, no contra la caja.
2. **El «baja para ver» se montaba encima de la bajada.** Lo puse `position:absolute` dentro de `.dentro`, que es `position:relative` — o sea que se anclaba al bloque de texto, no a la portada. Hubo que **sacarlo fuera de `.dentro`**, como lo tiene la v3.
3. **El velo del sello dibujaba un rectángulo sobre la luna.** El radio vertical del degradado (300 % de la caja) llegaba vivo al borde: canto recto. Se arregla haciendo que **el degradado se apague dentro de su propia caja** (62 % de radio, a cero en el 80 %).
4. **El sello no se leía sobre la luna**: 1,92:1 medido sobre el píxel pintado. Se arregló con tres cosas juntas — velo local suave, el sello a `--humo` (6,6:1 sobre negro) y un halo oscuro. Queda en **4,53:1** el trazo típico contra el fondo más claro.
5. **La hora local perdió su formato** (`HORA LOCAL10:44:48`): al renombrar el contenedor de `.pie` a `.hero-datos`, la regla `.hero .pie .col{flex-direction:column}` dejó de aplicar. Regla: **si renombras un contenedor, busca quién colgaba de él**.

## Verificación
- **390 px**: h1 a 30,81 px, líneas de 327 y 311 sobre 339 de ancho útil — el mínimo medido de la v4 **se respeta** (el ensanchado solo entra a partir de 760 px). 0 desbordes.
- **1440 px**: h1 a 121,2 px, ocupa el **99,5 %**. Manifiesto en dos columnas 702/519.
- **1920 px**: h1 a 146 px (el tope), ocupa el **98,3 %**. Manifiesto 854/631. 0 desbordes.
- La v1, la v2, la v3 y la **v4 sin tocar**: `git status` solo ve `web/v5/` y esta nota.

> [!todo] Falta pasarle la batería completa de la v4
> Queda comprobar la v5 **sin JavaScript**, **sin las tipografías de Google** y con **movimiento reducido**, que es el estándar con el que se cerraron la v3 y la v4.

## Corrección (mismo día): la portada tiene que ir A SANGRE
Alejandro lo vio en su monitor ancho: *«en el hero de la v5 me refiero a que esté alineado a la izquierda como en la v3»*. Y tenía razón — se me había escapado el detalle que lo explica todo:

**El hero de la v3 NO usa `.env`.** Es la propia `<section class="hero">` la que lleva el `padding: 120px var(--borde) 40px`, así que el bloque va **a sangre**: pegado al margen izquierdo, con el sello y los datos contra el derecho. La v4 (y por tanto la v5) mete la portada en `<div class="dentro env">`, que **tapa a 1720 px y centra** — en una pantalla de 1440 no se nota, pero en un monitor de 3439 px el titular se queda **flotando en mitad de la pantalla**.

Arreglado con una línea: `.hero .dentro{max-width:none; margin-inline:0}`.

Medido a **3439 px**: logotipo, titular, bajada y «baja para ver» los cuatro a **72 px** del borde izquierdo (que es justo el margen), y sello y datos a 87 px del derecho. A 1440 px **no cambia nada** (el titular sigue ocupando el 99,5 %), porque el tope de 1720 solo estorbaba de ahí para arriba.

> [!tip] La lección
> **Un `max-width` con `margin:auto` es una decisión de diseño, no un ajuste técnico.** En anchos normales no se ve; en un monitor ancho es la diferencia entre una portada editorial y un bloque flotando en el centro. Y el sitio donde mirar si algo «no está alineado como en la otra versión» es **qué contenedor envuelve la sección**, no el `text-align`.

---

## Segunda tanda (mismo día): las ocho islas y dos secciones traídas de la v3

### 1. «Cómo bregamos», más lenta
Pidió: *«la animación del inicio hazla más lenta para que se lea la frase del inicio»*. Entraba **todo a la vez** en 1,1 s —título, lema y los cuatro pasos— y su lema se perdía. Se le dieron **turnos**: el lema arranca solo a los 0,55 s y está entero a 1,8 s; las cuatro líneas amarillas entran después, escalonadas (1,25 / 1,6 / 1,95 / 2,3 s).
> Ese trabajo quedó **descartado luego**, porque pidió traer la sección de la v3 entera. La lección se queda igual: si una sección entra de golpe, lo que se pierde es siempre la frase.

### 2. Las ocho estrellas = las ocho islas
Su encargo: *«las 8 estrellas representan las islas… haz algo súper crema»*. El **primer intento fue un mapa**: las 8 estrellas colocadas en la longitud y latitud reales de cada isla, sobre una carta de línea fina. Lo rechazó: *«quiero las 8 estrellas **juntas**… simplemente que explique que las 8 estrellas son las 8 islas. **De manera poética**, que ese es el estilo de La Brega. **No quiero que sea un mapa**»*.

> [!important] La corrección, que es la lección
> **Ser exacto no es lo mismo que ser bueno.** El mapa era verdad —las coordenadas eran reales— pero era una *infografía*, y La Brega no hace infografías: hace carteles. Lo poético no estaba en dónde cae cada isla, sino en decir «somos ocho» y callarse.

Lo que quedó: las **ocho juntas, cuatro y cuatro** como en su cartel, grandes; debajo la línea con los ocho nombres; y la frase, que es la que hace el trabajo:
> **SON OCHO PORQUE SOMOS OCHO.** *Ninguna se entiende sola.*

con «ocho» subrayado por **su marcador amarillo** (el mismo `#brocha` del manifiesto). Y un gesto que sustituye al mapa: **al pasar por una estrella se enciende su isla** en la línea de abajo, y al revés. Ese uno-a-uno es todo el argumento.

### 3. «Cómo bregamos» y el contacto, traídos de la v3 tal cual
*«Quiero sí o sí que el de la v3 esté en la v5 tal cual. Me flipa. Y el contacto también»*. Traídas **enteras**: la banda **amarilla** de «Cómo bregamos» (cabecera de pliego, la cita en serif y los cuatro pasos numerados) y el contacto (sello circular, «ESCRÍBENOS» con las letras que huyen del ratón, el correo subrayado con el marcador y las cruces de registro).

**Van dentro de un ámbito `.de-v3`**, y esto no es un capricho: los nombres chocan de frente. En la v5, **`.marca` es la fila del logotipo** de la portada, **`.sello` es el dato de coordenadas** y **`.contacto` es otra sección**. Sin el ámbito, traerlas habría reventado el hero.

> [!warning] El fallo que costó encontrarlo
> Tras el cambio aparecieron **101 px de desborde horizontal**. El culpable: **el CSS de la vieja «Cómo bregamos» de la v4 seguía en el archivo**, y su regla `.pasos{grid-template-columns:repeat(4,1fr)}` partía la lista de la v3 en cuatro columnas, tirando el cuarto paso fuera de la pantalla. **Al sustituir una sección hay que borrar su CSS, no solo su HTML**: el código muerto no es inofensivo si sus nombres son genéricos.
> Para encontrarlo: ocultar los hijos de `<body>` uno a uno y ver cuál baja el `scrollWidth`. Buscar «elementos que sobresalen» no vale, porque hay decorados que sobresalen a propósito dentro de `overflow:hidden`.

### Verificación
- **390 px**: 0 desbordes en los seis tramos de la página y ningún texto cortado.
- **1440 px**: 0 desbordes. Los cuatro pasos apilados a ancho completo (1293 px), como en la v3.
- El contacto: las 10 letras de «Escríbenos» troceadas (el efecto del ratón vive), el marcador del correo se destapa y el sello gira.
- La portada **sin contaminar**: el logotipo sigue a 58 px y su sello sigue existiendo.
- El menú pasa a **siete** entradas: las islas entran como VI y contacto como VII.
