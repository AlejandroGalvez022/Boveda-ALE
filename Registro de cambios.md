---
titulo: Registro de cambios
tags: [registro, log, moc]
---

# 🗒️ Registro de cambios (bóveda Ale)

Bitácora de esta bóveda. **Lo más reciente, arriba.**

---

## 2026-08-08

- **[[La Brega Studio/La Brega Studio|La Brega Studio]]** — 🖨️ **Versión 3 de la web: «La Imprenta»** (`web/v3/index.html`; la v1 y la v2 **intactas**). Alejandro pidió *«entra en su Instagram, fíjate en TODO el estilo de TODOS los posts, y haz una V3 con otro estilo, animaciones por todos lados»*.
  - **Primero mirar, luego diseñar**: entré en [@labrega_estudio](https://www.instagram.com/labrega_estudio/) por CDP y me bajé **los 8 posts en alta con sus pies de foto**. De ahí salieron **dos correcciones de marca que arrastraban la v1 y la v2**: (1) su **logotipo NO es una insignia circular** —eso era el recorte del avatar—, es el **apilado `LA` fino / `BREGA` negra / `ESTUDIO.` con el punto gordo**; y (2) tienen un **sistema de 8 estrellas** que es su firma gráfica y no estaba en ninguna versión (ahora, dibujadas en SVG para poder animarlas).
  - **La idea**: su feed es **cartelería de imprenta** (y su post más rotundo, «Revela», es blanco con marco), así que la v3 rompe con las otras dos y va **en papel claro**. El concepto es literal: **la web se imprime delante de ti**, y su *«no hacemos ruido»* se traduce en el **registro de color** — todo llega **descuadrado en CMYK** y **cuadra** al terminar la impresión.
  - **Qué lleva**: preloader de tres pasadas con rodillo · hero `BREGAR` con **desregistro CMYK reactivo** al ratón y a la velocidad de scroll · manifiesto con **marcador amarillo pintado que se dibuja** · servicios que **se entintan enteros** · **pared de carteles** donde el cartel **vuela desde su sitio** a la ficha · efemérides sobre **órbitas SVG que se dibujan** · **sello de goma** que se estampa · **conmutador de tinta** que cambia toda la web · **cursor-rodillo con rastro de tinta** · marcas de registro en las esquinas · barra superior que se tiñe según el pliego · menú a pantalla completa. **Cero dependencias de JS externo** (la v1 y la v2 usan GSAP + Lenis) y, por fin, **sus pósters reales** en vez de huecos.
  - 🐛 **Ocho fallos reales cazados**: `aspect-ratio` **ignorado** porque el marco del cartel era un `<span>` inline (faltaba `display:block`); `max-width:20ch` medido con **el tamaño de letra del contenedor**, no el del titular de dentro → el manifiesto se recortaba a 180 px y se leía «EST… TIE… NOS…»; el **marcador salía negro** porque el `<path>` del pincel no tenía `fill` y heredaba el negro por defecto (y sobre el pliego oscuro el `multiply` se lo comía); un párrafo que **se quedaba invisible para siempre** porque con scroll a saltos el `IntersectionObserver` se lo salta entre fotogramas (ahora hay red de seguridad que repasa lo que quedó por encima del pliegue); la barra en `mix-blend-mode:difference` pintaba el punto de tinta **azul**; desborde horizontal de 8–26 px por un `inset:-6% -2%`; el `<button>` del cartel conservaba el `padding:1px 6px` del navegador; y el modal dejaba ver la web detrás.
  - ✅ **0 fallos** en **360 / 390 / 430 / 768 / 1280 / 1440 / 1920**: sin desbordes, sin errores de consola, sin imágenes rotas, sin textos cortados, sin nada sin revelar al llegar al fondo, y **aguantando con las tipografías de Google bloqueadas**.
- **[[La Brega Studio/La Brega Studio|La Brega Studio]]** — 🌑 **Versión 2 de la web: «Ruido → señal»** (`web/v2/index.html`; la v1 **intacta**). Alejandro pidió *«una versión muy loca, con animaciones espectaculares, DE TODO»*.
  - **La idea sale de su marca, no de un catálogo de efectos**: *«No hacemos ruido»* → la web **empieza siendo ruido** (estática de televisión de verdad, canvas píxel a píxel, que **baja de amplitud** mientras cuenta 000→100 hasta el silencio). *«El diseño no maquilla. Revela.»* → el manifiesto llega **maquillado** y el **scroll lo revela** (y el ratón abre un círculo que revela a su paso). Sus **eclipses** → hero con un **eclipse en WebGL escrito a mano, sin librerías**.
  - **Y de todo lo demás**: marquee cuya velocidad y sentido manda el scroll · ficha flotante que sigue al ratón por servicio · **galería horizontal anclada** (pin + scroll lateral) con contador 01/04 · **la ficha de proyecto abre como un eclipse desde donde pulsas** · letras que huyen del ratón en contacto · cursor que invierte lo de debajo · **menú a pantalla completa en móvil** (la v1 **no tenía menú en móvil** — fallo real arreglado).
  - 🐛 **Cinco fallos reales cazados**: las dos capas del manifiesto **no encajaban** (el ancho estaba en `.stack`, donde `1ch` es la letra pequeña, en vez de en `.big`) y el texto salía doblado; **todas** las filas de servicios salían encendidas (faltaba `overflow:hidden`, el barrido se veía en la fila de abajo); la **ficha salía en blanco** porque los estilos del arte colgaban de `.proj` y la ficha clona esa pieza fuera; **las secciones iban a sangre** porque `.sec-pad` usaba `padding: X 0` y eso borra el margen lateral de `.wrap` (van juntas en el mismo elemento); y **sin GSAP tres de los cuatro proyectos eran inalcanzables** — salió porque en una pasada el CDN se cayó de verdad, y ahora sin GSAP la galería se apila.
  - 🧪 **Mis propias mediciones me engañaron cuatro veces**, y las cuatro eran del chequeo: `overflow:hidden` **no cambia** el rect (recorta lo pintado); medir el anclaje **justo en el borde**; contar revelados **arriba del todo**, donde deben estar ocultos; y `getPropertyValue('--gutter')` que devuelve el `clamp(...)` **sin resolver**. Más una de manual: `$s` en PowerShell **machaca `$S`** (no distinguen mayúsculas) y me tumbó la sesión de Chrome.
  - ✅ **0 fallos** en 390 / 768 / 1280 / 1440 / 1920, incluida una **pasada con los CDN bloqueados**. Contraste del titular 5,63:1.
- **Memoria** — 🧠 **La memoria portátil pasa a estar partida en dos, y esta bóveda estrena la suya.** Se descubrió cerrando la sesión: cuatro memorias personales (`boveda-alejandro-personal`, `labrega-studio`, `web-calma-preview`, `laboratorio-web-demos`) **no viajaban a la oficina** — no podían estar en el espejo del repo de Reload (ahí solo va lo de Reload) y no había otro sitio. Ahora tienen el suyo en **`Ale/Memoria Claude/`**, y el `CLAUDE.md` de esta bóveda dice que hay que leer **los dos** espejos al arrancar.
  - De paso, corregida la memoria `labrega-studio`: apuntaba a `BOVEDA/RELOAD/Webs/La Brega Studio/...`, una **ruta que ya no existe** (el proyecto se movió a esta bóveda hace tiempo).
- **Herramientas** — 🔭 **Control remoto de Chrome (CDP) desde PowerShell, sin Node** (aquí no está instalado). Emula **móvil de 390px de verdad** con táctil (así `hover:hover` es falso, como en un móvil), ejecuta JS en la página, lee errores de consola y mide píxeles. Reutilizable para cualquier web.

## 2026-07-19

- **Gestión** — 📥 Sistema nuevo: Bandeja universal (en el repo Reload), columna **"Siguiente"** en el Panel, esta bitácora y carpeta `Plantillas/`. Las dos bóvedas funcionan ahora igual.
- **CLAUDE.md** — 🧠 Creado con las reglas de la bóveda (push automático, memoria portátil, solo GitHub).
- **Laboratorio web** — 🌋 Nueva demo **CALDERA** (ascenso WebGL del mar a las estrellas, hecha con Fable 5). Total: 10 demos guardadas.
- **Experimentos** — 💡 Movido desde Reload el proyecto **Experimentos de diseño** (4 ideas de apps: potencial libre, organizadora de eventos, animaciones, calendario iPhone).
- **Bóveda → GitHub** — ☁️ Subida al repo privado `AlejandroGalvez022/Boveda-ALE`. Sincronización solo por git (sin Obsidian Sync).

## 2026-07-18

- **Nacimiento de la bóveda** — 👤 Separados de Reload los proyectos personales: La Brega Studio, Chatbot Psicólogo/Web Calma, Estudio Alisio y Clínica dental. Con `Indice.md` + `Panel.base` propios.
