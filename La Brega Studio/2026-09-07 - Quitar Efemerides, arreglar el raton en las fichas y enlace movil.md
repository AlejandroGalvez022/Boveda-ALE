---
titulo: Quitar Efemérides, arreglar el ratón en las fichas y enlace móvil
tipo: conversacion
proyecto: La Brega Studio
fecha: 2026-09-07
tags: [conversacion, web, v5, arreglo]
---

# 2026-09-07 · Quitar Efemérides, arreglar el ratón en las fichas y enlace móvil

Nota-resumen: [[La Brega Studio/La Brega Studio|La Brega Studio]] · Volver al [[Indice]]

Archivo tocado: `web/v5_DEF/index.html`.

## 1. Fuera la sección EFEMÉRIDES
Lo que dijo: *«EFEMÉRIDES quítalo porque ya los proyectos están arriba en EL TALLER justo encima.»*

- **Borrada entera**: el HTML de la sección, su CSS y sus dos módulos de JS (el carril que se arrastraba y el `IntersectionObserver` que dibujaba las órbitas `orbitasEfem`).
- **Renumerado** lo que quedó descuadrado al quitarla: el menú pasa a **I–VI** (Manifiesto · Lo que hacemos · El taller · Cómo bregamos · Ocho estrellas · Contacto) y los comentarios internos de las secciones (CSS y JS).
- **Verificado**: sonda `{"efem":false,"carril":false,"orbitasEfem":false,"lams":5}` · **0 fallos** a 390 px y 1440 px.
- **Quedan sin usar** en `web/v5_DEF/img/` cinco fotos que solo salían aquí: `luna.jpg`, `ovni.jpg`, `estrellas.jpg`, `omnia-aplicaciones.jpg`, `saltimbanqui-logo.jpg`. No las he borrado.

## 2. El ratón desaparecía al abrir una ficha de EL TALLER
Lo que dijo: *«cuando entras en el taller a uno de los proyectos el ratón desaparece y se ve solo cuando pasas por algún botón.»*

- **Causa**: la ficha (capa negra a pantalla completa, `z-index:9300`) se pintaba **por encima** del cursor de retículo (`.reticulo`, que estaba a `9200`). Y como el CSS esconde el cursor real del sistema (`cursor:none`), no se veía nada; solo asomaba el del sistema sobre los `<button>`.
- **Arreglo**: subir `.reticulo` a `z-index:9400` (sigue por debajo del preloader, `9500`). Un cambio de una línea de CSS.
- **Verificado**: sonda con una ficha abierta → `{"fichaZ":"9300","retZ":"9400","retVis":"1"}` y captura (`ficha-reticulo.png`): el retículo se ve sobre la capa negra.

## 3. Redes — pendiente de él
Lo que pidió: *«mira las redes y actualiza los proyectos.»*

- **No se puede automáticamente**: Instagram (`labrega_estudio`) y TikTok (`@labrega.estudio`) piden login y no devuelven ni bio ni publicaciones a una petición normal. La búsqueda web solo saca estudios canarios que no son este.
- Los textos de las fichas de EL TALLER **siguen siendo la recreación** a partir de su feed (ya lo avisa un recuadro dentro de la propia web: *«hay que confirmarlos antes de publicar»*).
- **Hace falta que él pegue** los nombres/textos de los proyectos actuales o confirme los que hay. No se inventan.

## 4. Enlace para verla en el móvil
- Publicada la `web/v5_DEF/index.html` como **artifact privado** de Claude, con las 6 fotos incrustadas dentro del propio archivo (2,8 MB): **https://claude.ai/code/artifact/8e61629b-748f-42b2-9c10-9ea691f764a8**
- Se abre desde su cuenta de Claude en el móvil. Es una copia del momento: si se vuelve a tocar la web, hay que volver a publicarla.

## Pendiente
> [!todo] Cosas abiertas
> - Pegar/confirmar los textos de los proyectos de EL TALLER (punto 3).
> - Decidir si se borran las 5 fotos que quedaron sin usar.
> - Datos fiscales de la factura (ver [[La Brega Studio/2026-09-07 - Presupuesto y factura explicada (web v5)|nota del presupuesto]]).
> - Elegir dominio y publicar en Netlify.
