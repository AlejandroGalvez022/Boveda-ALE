---
name: schleife-studio
description: "Clienta personal Leonor (tatuadora, Gran Canaria, estudio SCHLEIFE) — su marca real, la web v1 «La cinta y la aguja» y las trampas que salieron construyéndola"
metadata:
  node_type: memory
  type: project
  originSessionId: da86720f-3a47-4a31-9f51-35aa106b0584
  modified: 2026-10-06T19:55:34.352Z
---

**Leonor**, tatuadora y amiga de Alejandro de hace muchos años. Estudio **SCHLEIFE** en Gran Canaria. Instagram del estudio **@schleifestudio**; su cuenta personal es @leonorglezzz. **Las citas, por mensaje privado de Instagram** (`https://ig.me/m/schleifestudio`). Alejandro le hace la web como regalo, al nivel de La Brega: *«le tengo mucho cariño y quiero que se vea reflejado»*, *«ni un fallo»*.

⚠️ Vive en la bóveda personal: `C:\Users\galve\Documents\Ale\Schleife Studio\` (repo `Boveda-ALE`). Nada de esto va en RELOAD.

**Su marca (de su Instagram, 6-oct-2026):** logo = S blanca enlazada con un lazo y atravesada por una aguja, sobre **magenta #C50457** (dominante exacto del avatar). *Schleife* = «lazo» en alemán. Destacadas en **Fraktur** (Tattoos, Ofertas, Diseños). Voz corta y cariñosa con corazones rosas. Sus fotos van sobre **negro puro #000**, y los diseños sobre papel blanco. Estilos: fine line, japonés, blackwork, covers y diseños propios.

**Web v1 «La cinta y la aguja»** (`web/sitio/index.html`; se publica la carpeta `sitio/`): la web ES la cinta de su logo. Sale del ojo de una aguja, rodea el brazo del tigre de la portada (recortado con alfa de su propio negro) y lleva SCHLEIFE. Se desenrolla con el scroll, hace de banderín tras cada h2 (Fraktur), pasa por detrás de las fotos y se anuda en un lazo sobre el botón de cita; en la sección magenta se vuelve blanca. Motor propio en SVG, sin librerías. Dirección elegida en la página de decisión de la skill impeccable (semilla 7ddb5254).

**Trampas que costaron (para no repetirlas):**
- **Instagram:** la API pública da 429. Con Chrome por CDP **sin iniciar sesión** sí se ven el perfil (12 últimas publicaciones), cada `/p/<código>/` con su foto a ~1080-3000 px (las del carrusel, pulsando «Siguiente») y el texto en `meta og:title`.
- En **este PC no hay Node** → `web-check.mjs` no corre; se verifica con `cdp.ps1`. Le añadí `Watch-Errores`/`Get-Errores` y `Start-Cdp -ComoDobleClic`.
- **Prueba de solapes** cinta/texto: `isPointInFill` sobre los `defs > path`, NUNCA sobre los del `clipPath` (el recorte cubre la página entera y da 100 % de falsos solapes).
- Una función que ya multiplica por la dirección **no puede recibir datos ya multiplicados**: la cinta salía del revés en los banderines que entran por la derecha.
- En móvil, el `margin-bottom` del `figure` **se colapsa fuera del `li`**: «100 %» del li es el pie de foto, no el hueco (en la rejilla de escritorio no pasa).
- `<link rel=preload as=font crossorigin>` **falla a doble clic** (file://): las fuentes cargan igual desde el CSS, así que la precarga sobra.
- **Rendimiento:** redibujar toda la cinta en cada fotograma daba un 33 % de tirones (móvil, CPU ×4). Ahora solo se rehace la punta, lo hecho va por zonas de 1600 px y cada grupo de color solo lleva sus zonas: **3 tirones de 710**.

- **«Las fotos tardan en cargar»** no era el peso: era un revelado que empezaba tarde (al entrar un 12 %) y lento (barrido de 1,25 s). Arreglo: miniatura **ya desenfocada de fábrica** (40 px, en el HTML), foto descargada y decodificada **pantalla y media antes** y revelado **al asomar**. Ojo con los extremos: con margen grande el revelado ocurre fuera de pantalla y **no se ve**.
- **`filter: blur` animado** sobre fotos grandes = tirones en móvil (42 de 745 fotogramas). Con opacidad y escala sobre la miniatura desenfocada, 12. El efecto «crema» se consigue sin filtro en vivo.
- **Blanco sobre magenta (una sola tinta), como su logo:** las piezas que se cruzan se separan con un **hueco del color del fondo**, nunca con un contorno negro ni con una sombra, que rompen el lenguaje (lo cazó el revisor). Y una pieza con giro que pasa por 90° se **pellizca a ancho cero**: el nudo del lazo no puede ser una tira girada, es una forma propia (reloj de arena).
- **Revisión independiente de la skill impeccable:** fix → (5 de 6 + 2 regresiones) → **ship**. Vale la pena: cazó la Cerezo en miniatura (su mejor pieza) y el nudo que parecía una caja.

**Pendiente de ella:** validar textos (van en su voz), logo original, fotos originales y confirmar que la foto del bote de tinta gigante es ella. Relacionado: [[boveda-alejandro-personal]], [[labrega-studio]], [[preview-web-changes]], [[mirar-antes-de-darlo-por-bueno]].
