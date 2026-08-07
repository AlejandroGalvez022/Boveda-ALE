---
titulo: La Brega Studio
tipo: proyecto
categoria: Personal
estado: activo
siguiente: "8-ago: HAY UNA VERSION 2 ('Ruido -> señal') en web/v2/index.html, con la v1 intacta. Sale de sus dos frases: la web EMPIEZA SIENDO RUIDO (estatica de verdad en canvas que se calla mientras cuenta a 100) y el manifiesto llega MAQUILLADO y el scroll lo REVELA; el hero es un ECLIPSE en WebGL escrito a mano. Ademas: galeria horizontal anclada con ficha que abre como un eclipse, ficha flotante en servicios, letras que huyen del raton en contacto y MENU MOVIL (la v1 no tenia). Verificada con 0 fallos en 390/768/1280/1440/1920, incluida una pasada con los CDN bloqueados. AHORA TOCA: (1) ABRIRLA Y VERLA (Live Server sobre web/v2/index.html), (2) decidir si se queda la v1 o la v2, (3) publicar en Netlify -> la v1 queda en / y la v2 en /v2/. PENDIENTE DE SIEMPRE: logo PNG original, imagenes reales de proyectos (los huecos ya estan puestos) y confirmar con Raul los textos de las fichas de proyecto, que son recreacion de su feed"
conversaciones: 1
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

## Su marca (lo que detecté)
- **Lema:** *"No hacemos ruido. Hacemos marcas."* (es su hero).
- **Estilo:** oscuro, editorial y muy conceptual. Negro/blanco con **degradado naranja→magenta→violeta**, **verde ácido** y **amarillo canario**. Motivos **cósmicos** (soles, órbitas, eclipses), grano, tipografía muy bold. Orgullo **canario**.
- **Logo:** insignia circular con anillo degradado y "LA BREGA ESTUDIO." apilado en blanco. **Recreado en código** (CSS), clavado. Falta el PNG original para sustituirlo si se quiere fidelidad total.
- **Trabajos suyos referenciados** en la web: Saltimbanqui, Omnia, "El diseño no maquilla. Revela.", Día de Brega (Día de Canarias).

## Dónde está / cómo verla
Hay **dos versiones**, y las dos funcionan. La v1 **no se ha tocado**.

| | Archivo | En Netlify | Qué es |
|---|---|---|---|
| **v1** | `web/index.html` | `/` | La propuesta original (19-jul). |
| **v2** ⭐ | `web/v2/index.html` | `/v2/` | «Ruido → señal» (8-ago). Eclipse en WebGL, manifiesto que se revela, galería anclada. |

Ábrelas con **Live Server** en VSCode (clic derecho → *Open with Live Server*). Necesitan internet (Google Fonts, y la v2 además GSAP + Lenis — si no cargan, la web sigue funcionando entera).

## Conversaciones
- [[La Brega Studio/2026-08-08 - Version 2 de la web (Ruido a senal)|2026-08-08 · Versión 2 de la web (Ruido → señal)]]

## Qué lleva la v2 (8-ago)
El concepto no es un efecto: son **sus dos frases** convertidas en interacción.
- *«No hacemos ruido»* → **preloader de estática de verdad** (canvas, píxel a píxel) que **se va callando** mientras cuenta 000→100.
- *«El diseño no maquilla. Revela.»* → el manifiesto llega **maquillado** y el **scroll (y el ratón) lo revelan**.
- Sus **eclipses** → hero con un **eclipse en WebGL escrito a mano**, sin librerías, que se abre al bajar.
- Y además: marquee cuya velocidad manda el scroll · ficha flotante por servicio · **galería horizontal anclada** con ficha que **abre como un eclipse** desde donde pulsas · letras que huyen del ratón en contacto · **menú a pantalla completa en móvil** (la v1 no tenía) · cursor que invierte lo de debajo.
- **Verificada: 0 fallos** en 390 / 768 / 1280 / 1440 / 1920, incluida una pasada **con los CDN bloqueados** (sin ellos la galería se apila y los 4 proyectos siguen alcanzables).

## Qué lleva la v1
Preloader, logo circular animado, cursor propio, hero con degradado de marca, marquee, botones magnéticos, grano. **Scroll premium con Lenis (suave/inercia) + GSAP ScrollTrigger** (revelados con stagger y dirección, hero con scrub, **manifiesto revelado palabra por palabra** ligado al scroll, e **inclinación de las tarjetas por velocidad de scroll**); si las librerías no cargan, cae en animaciones caseras (nada se rompe). Secciones: hero → marquee → manifiesto ("Revela") → servicios (01–06) → trabajo (4 proyectos suyos) → cómo bregamos → contacto. Verificada sin errores de JS; diseño comprobado con capturas.

## Próximos pasos
- [ ] **Abrir la v2 y verla** (`web/v2/index.html` con Live Server) y decidir: ¿v1 o v2?
- [ ] Confirmar con Raúl los **textos de las fichas de proyecto** de la v2 (son recreación de su feed).
- [ ] Pasar el **logo PNG original** (para sustituir el recreado, si se quiere).
- [ ] Meter **imágenes reales** de sus proyectos (ahora son recreaciones en CSS).
- [ ] Ajustar textos/servicios con Raúl tras presentarla.
- [ ] Publicar en **Netlify** para enseñarla con un enlace → guía lista en [[La Brega Studio/GUIA - publicar en internet|Guía - publicar en internet]]. Repo git ya preparado en `web/`; falta crear el repo en GitHub y pasar la URL.

> [!note] Propuesta comercial. Los textos de proyectos son recreaciones de su feed; confirmar con el cliente.
