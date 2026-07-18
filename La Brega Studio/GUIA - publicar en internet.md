---
titulo: Guía - publicar La Brega en internet
tags: [guia, deploy, netlify, github]
---

# 🌐 Cómo poner La Brega online (y verla en el móvil)

Volver a [[La Brega Studio/La Brega Studio|La Brega Studio]] · [[Indice]]

Objetivo: tener una **URL** (tipo `labrega.netlify.app`) que puedas abrir en el **iPhone** y que se **actualice sola** cada vez que cambiamos algo, igual que el Obsidian.

Ya te dejé **el repositorio de git preparado** en la carpeta `web/` (con el primer commit hecho). Solo falta conectarlo. Hay dos caminos:

---

## ✅ Opción A — GitHub + Netlify (la recomendada: se actualiza sola)

**Lo haces tú una vez (5 min):**

1. **Crea cuenta en GitHub** (si no tienes): [github.com](https://github.com) → *Sign up*. Gratis.
2. **Crea un repositorio vacío**: arriba a la derecha, `+` → *New repository*.
   - Nombre: `labrega-web` (o el que quieras).
   - **Privado** o público, da igual (la web es pública igualmente).
   - **NO marques** "Add a README" ni nada. Déjalo **vacío**.
   - *Create repository*.
3. **Cópiame la URL** que te da (algo como `https://github.com/tuusuario/labrega-web.git`) y pégamela aquí en el chat.
   - Yo conecto el repo y **subo la web**. La primera vez se abrirá una ventana del navegador para que **inicies sesión en GitHub** (es la autorización, una sola vez).
4. **Conecta Netlify** (ya la usas en Reload): [app.netlify.com](https://app.netlify.com) → *Add new site* → *Import an existing project* → *GitHub* → elige `labrega-web` → *Deploy*.
5. En ~30 seg tienes tu **URL pública**. Ábrela en el iPhone y dale a **Compartir → Añadir a pantalla de inicio**: la tienes como una app. 🎉

**A partir de ahí:** cada cambio que hagamos, yo hago `push` y **Netlify la republica sola**. Tú no tocas nada; solo abres la URL.

---

## ⚡ Opción B — Netlify Drop (al momento, sin cuentas, pero manual)

Para verla YA hoy, sin configurar nada:

1. Entra en [app.netlify.com/drop](https://app.netlify.com/drop) (desde el PC).
2. **Arrastra la carpeta** `web` entera a la página.
3. Te da una URL al instante. Ábrela en el móvil.

> Pega: cada vez que cambiemos algo, hay que **volver a arrastrar** la carpeta (no se actualiza sola). Por eso la Opción A es mejor a largo plazo.

---

## 🔑 Qué necesito de ti para la Opción A
Solo **una cosa**: que crees el repo vacío en GitHub (pasos 1–2) y me pases la **URL** (paso 3). El resto lo hago yo.

> [!tip] Cuando tengas cuenta de Netlify con dominio propio, podemos ponerle un dominio bonito (ej. `labrega.estudio`) en vez del `.netlify.app`.
