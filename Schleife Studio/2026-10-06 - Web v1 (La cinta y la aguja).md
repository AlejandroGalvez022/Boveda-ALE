---
titulo: "Web v1 de Schleife: La cinta y la aguja"
tipo: conversacion
proyecto: Schleife Studio
fuente: claude-code
fecha: 2026-10-06
tags: [conversacion, web, propuesta]
---

Proyecto: [[Schleife Studio/Schleife Studio|Schleife Studio]]

# Web v1 de Schleife: «La cinta y la aguja»

> [!quote] El encargo
> *«Quiero una web del nivel de La Brega Studio. Es una amiga de hace muchísimos años, le tengo mucho cariño y quiero que se vea reflejado. No quiero ni un fallo.»* Y después: busca en Awwwards webs de estudios de tatuaje, para el nivel, pero **sin calcar La Brega**.

## Cómo se hizo
1. **Su material, de su Instagram.** La descarga directa da error 429, pero el perfil se puede abrir con Chrome sin iniciar sesión: salen sus **12 últimas publicaciones**, con **19 fotos a tamaño completo** (de 896 a 3.000 px) y sus textos. Están en `material/originales-instagram/`.
2. **Tres preguntas a Alejandro:** las citas van **por Instagram**, la llamamos **Leonor** y se hace **como La Brega** (HTML a mano y Netlify).
3. **Dirección** (skill *impeccable*, semilla 7ddb5254): siete ideas sacadas de su mundo. Calco térmico, hoja de flash, tinteros, manga japonesa, sesiones, banderín y caja de luz. Le tocó **el banderín**, unido a su logo. Alejandro la eligió en la página de decisión, frente a «Del calco a la tinta» y seis más.
4. **Referencias de Awwwards** (las buscó un agente): las premiadas tienen **una sola interacción de firma**, no diez efectos, y la cita se plantea **como un proceso**. El cliché es la rejilla de Instagram con «Reserva ya». Lo mejor del sector es Monolith Studio (SOTD), y en Las Palmas ya hay listón: Momday Club (HM, de Fugu).

## Qué tiene
- **Portada:** su **tigre** recortado de su propio negro, para que la cinta pueda pasarle **por detrás**. El hilo sale del ojo de una aguja, se abre en cinta magenta y rodea el brazo; en el panel de delante pone **SCHLEIFE**. A la izquierda: «Tatuajes de **Leonor** (en gótica) en Gran Canaria» y el botón «Escríbeme por Instagram».
- **Tattoos:** 10 piezas con **su propio texto** de Instagram («Segunda sesión de esta manga 😭💕», «Cover 🩷»…), la zona, la fecha y el enlace a la publicación. En escritorio, la cinta baja por un canal entre las dos columnas y pasa **por detrás** de las fotos claras.
- **Diseños:** sus tres dibujos sobre papel. Ahí la cinta lleva **contorno negro**, como un banderín de *flash*.
- **Leonor:** foto en el estudio, en primera persona, y los estilos enlazados a la pieza que los demuestra.
- **Cita:** campo magenta y **tres pasos llanos**. La cinta se vuelve **blanca**, como en su logo, cruza como la cinta de un regalo y **se anuda en un lazo** sobre el botón. La aguja lo atraviesa, como en el monograma.
- **Sin inventar nada:** ni precios, ni dirección, ni horarios, ni reseñas.

## Verificado (Chrome por CDP; en este PC no hay Node)
| Prueba | Resultado |
|---|---|
| 9 tamaños, de 320×640 a 1920×1080 | 0 errores, 0 desbordes; el botón de la portada, en la primera pantalla en todos |
| La cinta encima de un texto | 0 solapes (prueba punto a punto sobre cada texto) |
| Sin JavaScript | banderines de respaldo en magenta, todas las fotos visibles |
| Movimiento reducido | la cinta sale entera y quieta |
| A doble clic | las 4 fuentes cargan y no hay errores |
| Menú del móvil con teclado | se abre, el foco va al primer enlace, Escape cierra y devuelve el foco |
| Fluidez, móvil con CPU ×4 | 3 tirones de 710 fotogramas (eran 232 antes de optimizar el pintado) |

## Fallos que salieron y se arreglaron
- En móvil, el brazo se salía 8 px y el botón quedaba bajo la primera pantalla.
- La cinta de los banderines que entran por la derecha enseñaba el revés detrás de la palabra (se multiplicaba dos veces por la dirección).
- En móvil, los cruces de la galería caían sobre los pies de foto (el margen del `figure` se colapsa fuera del `li`).
- Con movimiento reducido, la cinta solo se dibujaba hasta la pantalla actual.
- La precarga de fuentes daba error a doble clic: quitada.
- La entrada de la portada no se veía: el scroll inicial ya pedía la cinta entera.
- Rendimiento: ahora solo se redibuja la punta que crece, lo hecho va por zonas y el rayado es a 45°.

## Segunda tanda (6-oct, noche)
> [!quote] Alejandro
> *«Las fotos tardan en cargar, arréglalo. Haz que tengan una animación crema. Y maquétala lo mejor que puedas para móvil: su primera impresión será en móvil.»*

- **Fotos:** no pesaban, se destapaban tarde: solo al entrar un 12 % en pantalla y con un barrido de 1,25 s. Ahora cada foto lleva **una miniatura desenfocada de 40 px dentro del propio HTML** que ocupa su hueco desde el primer instante. La foto buena **se descarga y se decodifica pantalla y media antes** y, al asomar, aparece fundiéndose y asentándose encima, un **enfoque suave**. Con `filter: blur` animado iba más bonito pero a tirones en móvil (42 de 745 fotogramas); con la miniatura ya desenfocada de fábrica y solo opacidad y escala, **12 de 745**.
- **Móvil primero:**
  - El tigre ocupa **todo el ancho** de la pantalla y el botón sigue dentro de la primera pantalla de 320×640 a 414×896.
  - **«Escríbeme» siempre a mano** en la cabecera, con el menú solo como icono.
  - Las piezas grandes (manga, cerezo, humo, sol y luna, tigre) y la foto de Leonor van **de lado a lado**.
  - En tablet en vertical y en móvil en horizontal, el botón también cabe.

## La revisión independiente (skill *impeccable*)
Un agente que no vio cómo se hizo revisó las capturas y el código. Primer veredicto: **«fix»**, con 6 arreglos.

| Arreglo | Qué se hizo |
|---|---|
| El lazo | Las lazadas doblan en la punta y vuelven de cara; el nudo es un reloj de arena separado por un hueco magenta, como en su monograma; la etiqueta del botón tiene un canto del mismo magenta, sin sombra ni negro |
| La aguja y el hilo | La aguja tiene un ojo de verdad (un hueco); el hilo pasa por detrás, asoma por el ojo y se abre en cinta |
| Los giros de la galería | Solo en los tramos rectos del canal; en los rodeos por detrás de las fotos la cinta no gira |
| Cerezo | Recortada al brazo y en una columna entera: ya es de las piezas más grandes |
| Diseños | El bufón recortado a su dibujo: los tres al mismo tamaño |
| Foto del estudio | El texto alternativo nombra a Leonor (falta que confirme que es ella) |

Tras dos rondas más (el nudo, la sombra y el contorno negro del botón): **«ship»**, con todo resuelto.
