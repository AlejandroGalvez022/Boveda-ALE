---
titulo: "Isla Blanca, rediseño a nivel de premio"
tipo: conversacion
proyecto: Plantillas Framer
fecha: 2026-10-13
tags: [conversacion, framer, plantillas, diseño]
---

# 2026-10-13 — Isla Blanca: rediseño a nivel de premio

Volver a [[Productos/Plantillas Framer/Plantillas Framer|Plantillas Framer]]

## Qué pidió

- Primera versión hecha y vista: «me parece súper fácil». Quería algo **más espectacular**, mirando webs premiadas.
- Eligió dos movimientos para las **cuatro páginas**: **entrar por el arco** y **todo a pantalla completa**.

## Referencias (Awwwards, hostelería)

| Web | Qué se cogió |
|---|---|
| Faith Ibiza (HM, sep-2026) | Un arco que se abre hasta llenar la pantalla |
| White Desert (SOTD, sep-2026) | Una palabra gigante de borde a borde |
| Tengile (SOTD, oct-2026) | Letra enorme sobre foto a sangre |

## Qué quedó (carpeta `villas/`)

- **Inicio.** Una pared encalada con la sombra de la pérgola, y en el centro un arco con Can Sal Blanca (se ven la fachada, las ventanas en arco y la piscina). Al bajar, el arco se abre hasta llenar la pantalla. Las palabras se apartan a los lados como dos hojas de puerta y el azulejo con el nombre viaja a la esquina. Debajo:
  - la piscina con «A pool of your own» de borde a borde;
  - una arcada de seis arcos a todo el ancho;
  - «A house, not a hotel»;
  - el calendario de doce arcos;
  - «How booking works» en añil;
  - la petición una sola vez: la pared junto a la piscina, con un canto de piedra entre las dos.
- **Villas.** Cada casa es una pantalla: la foto a sangre con el nombre gigante, y debajo, en la pared, las mismas cifras en el mismo sitio. El filtro de islas va en una cápsula; en móvil es una sola fila que se desliza.
- **Ficha.** La foto a pantalla completa con el nombre de borde a borde y «A fourteen-metre pool» en el agua. Después, galería, cuerpo con panel de reserva fijo y otras casas.
- **Contacto.** Media pantalla con la puerta azul fija y el formulario al lado.
- **Pie.** «Isla Blanca» medido para ir exactamente de margen a margen.

## Revisión (agente revisor, 2 pasadas)

- 1.ª pasada: **8 arreglos**: arco mal encuadrado, cajas centradas, listado en zigzag, cifras en el héroe, agua vacía como separador, el nombre del pie cortado, filtro en tres filas en móvil y la clave de la semilla sin respaldo. **Los 8, resueltos** en la 2.ª pasada.
- La 2.ª pasada encontró **3 regresiones**, que **quedan pendientes**:
  - **A.** El velo del listado oscurece las fotos (en móvil, casi entera). Hay que dejarlo solo detrás del nombre, abajo a la izquierda.
  - **B.** El lugar («Ibiza · Sant Josep») va **encima** del nombre. Va **debajo**, como en el azulejo y en la ficha. La descripción y los botones bajan a la franja de la pared.
  - **C.** En móvil, bajo la petición queda un bloque de agua vacío. Hay que quitarlo en móvil.

## Comprobado

- `web-check.mjs`: **0 fallos** en las 4 páginas a 390, 810, 1199, 1200 y 1440 (antes de las regresiones A-C).
- Contraste medido sobre el píxel pintado:
  - el peor destello del agua bajo «A pool of your own» da **3,22:1**: se le puso una capa azul en *multiply* («la parte honda»);
  - la letra sobre la pared, **8,4-10,4**.
- Fotos: 15 de 15 con su procedencia. La clave de la semilla del diseño (`05a5d8bb`) queda comprobada en `.impeccable/questions/`.

## Falta

1. Arreglar A, B y C, y pedir el visto bueno final al revisor.
2. `DESIGN.md` (el documentador).
3. La guía paso a paso para pasarla a Framer.
4. Decidir el nombre, la licencia de las fotos y si la reserva va con motor o con formulario.
