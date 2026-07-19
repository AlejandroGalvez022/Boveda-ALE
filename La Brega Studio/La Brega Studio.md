---
titulo: La Brega Studio
tipo: proyecto
categoria: Personal
estado: activo
siguiente: "Publicar la web (GitHub + Netlify)"
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
- Código: `Webs/La Brega Studio/web/index.html` (un solo archivo autónomo).
- Ábrela con **Live Server** en VSCode. Necesita internet (Google Fonts).

## Qué lleva
Preloader, logo circular animado, cursor propio, hero con degradado de marca, marquee, botones magnéticos, grano. **Scroll premium con Lenis (suave/inercia) + GSAP ScrollTrigger** (revelados con stagger y dirección, hero con scrub, **manifiesto revelado palabra por palabra** ligado al scroll, e **inclinación de las tarjetas por velocidad de scroll**); si las librerías no cargan, cae en animaciones caseras (nada se rompe). Secciones: hero → marquee → manifiesto ("Revela") → servicios (01–06) → trabajo (4 proyectos suyos) → cómo bregamos → contacto. Verificada sin errores de JS; diseño comprobado con capturas.

## Próximos pasos
- [ ] Pasar el **logo PNG original** (para sustituir el recreado, si se quiere).
- [ ] Meter **imágenes reales** de sus proyectos (ahora son recreaciones en CSS).
- [ ] Ajustar textos/servicios con Raúl tras presentarla.
- [ ] Publicar en **Netlify** para enseñarla con un enlace → guía lista en [[La Brega Studio/GUIA - publicar en internet|Guía - publicar en internet]]. Repo git ya preparado en `web/`; falta crear el repo en GitHub y pasar la URL.

> [!note] Propuesta comercial. Los textos de proyectos son recreaciones de su feed; confirmar con el cliente.
