---
titulo: La v2 se apoya en su fotografía
tipo: conversacion
proyecto: La Brega Studio
fecha: 2026-08-14
tags: [conversacion, web, v2, fotografia, contraste]
---

# 2026-08-14 · La v2 se apoya en su fotografía

Proyecto: [[La Brega Studio/La Brega Studio|La Brega Studio]]

## Qué pidió Alejandro
> «me gustaría que en algún sitio haya una foto de fondo en una sección, fotos de los proyectos de La Brega, ya que a mi cliente le gustan mucho esas secciones».

Antes de eso, sesión corta sobre la **v2**, que es la que quería mirar hoy.

## 1. Sus pósters, que faltaban en la v2 (y en la v1)
La v2 pedía sus cuatro carteles por código (`../img/saltimbanqui.jpg`, `omnia.jpg`, `revela.jpg`, `dia-de-brega.jpg`) **con respaldo automático**: si el archivo no está, el `onerror` quita la imagen y se ve el arte generado. Y **`web/img/` estaba vacía**, así que nunca se habían visto. Sus pósters reales sí estaban, pero solo dentro de `v3/img/` y `v4/img/`.

Copiados a `web/img/` los cuatro (`dia-de-canarias.jpg` → `dia-de-brega.jpg`, que es como los llama la v2). **Entraron solos, sin tocar el HTML.** La **v1 también los usa**, así que se le llenaron los huecos de paso.

## 2. La foto de fondo: «Cómo bregamos»
La sección elegida es **«Cómo bregamos»** porque era la única que solo tenía **texto y números** — el caso exacto en el que lo que falta es una foto. Y el tratamiento **no se inventa**: es el mismo que el manifiesto de la **v4** ya usa sobre su fotografía.

- La foto va **a sangre** en toda la sección, en blanco y negro, apagada (`grayscale(1) contrast(1.06) brightness(.58)`).
- Un **velo** en degradado que **arranca y termina en el negro de la página**, para que la sección no se vea como un parche pegado.
- **La tarjeta deja de ser un panel sólido**: `.valores` pasa a fondo transparente y ahora el fondo lo pone la foto. Su halo de degradado (el `::before`) se queda, bajado al 10 %, y es el único color de la sección.
- La foto **respira con el scroll** (7 % de recorrido, siempre por dentro del margen del `inset:-14%`, medido: nunca se descubre el borde). Se apaga con **movimiento reducido**.

## Tres fallos reales cazados por el camino
1. **En móvil salía su titular por detrás del mío.** Al estirarse la sección en vertical, `object-fit:cover` dejaba de recortar por arriba y enseñaba **la parte alta del cartel**, que trae su logotipo y su titular en amarillo — pisándose con «CÓMO BREGAMOS». **El encuadre por CSS no vale**, porque depende de la proporción de la caja. Arreglado **recortando el JPG de verdad** (`img/romeria-fondo.jpg`, 1000×630, solo la romería: el papahuevo, la gente y sus 8 estrellas). Encuadre el que encuadre, ya no puede salir texto suyo.
2. **Costura visible en el borde de arriba.** El velo colgaba de la capa que se mueve, que **sobresale un 14 % por arriba y por abajo**; en el borde real de la sección el degradado todavía era semitransparente y se veía la línea. El velo pasa a la **sección** (`.foto-sec::after`), que sí coincide con lo que se ve.
3. **La foto se quedaba en penumbra.** El primer ajuste (`brightness .42`) era tan oscuro que su fotografía no se leía. Medí el contraste **antes** de tocarlo y sobraba (9,9:1 en el peor píxel), así que subí la foto a `.58` y aligeré el velo. Su fotografía se ve y el texto sigue de sobra.

## Verificación
Medido **sobre el píxel pintado**, no sobre el CSS: se rehace en un canvas el filtro real de la imagen, el encuadre `cover` y el velo, y se muestrea **toda la caja de cada texto** en rejilla.

| Texto | Tamaño | Peor contraste |
|---|---|---|
| «Cómo bregamos» | 54 px | **10,4:1** |
| Títulos 01–03 | 26 px | **11,0:1** |
| Párrafos | 15 px | **7,7:1** |
| «(Nuestra forma)» | 12 px | **6,9:1** |
| Números 01–03 (naranja) | 34 px | **4,1:1** (texto grande: pide 3:1) |

- **360 / 390 / 430 / 768 / 1280 / 1440 / 1920**: sin desbordes, sin textos cortados, la foto cubre la sección en todos.
- El recorrido del scroll llega a **57 px** como mucho, con **56 px de margen** aún sin gastar: no se descubre el borde nunca.
- **0 errores de consola.** Sin JavaScript la foto se ve igual (es HTML y CSS); el movimiento es lo único que se pierde.

> [!todo] Verificar
> A **1920 px la foto se estira ×1,92** (el original son 1000 px de ancho). Con el grano y el blanco y negro cuela, pero es un argumento más para **pedirle a Raúl los originales en alta**.
