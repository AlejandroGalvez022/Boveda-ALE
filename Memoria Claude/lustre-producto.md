---
name: lustre-producto
description: Lustre (antes Haze, renombrado 27-sep) — producto de ingresos pasivos, 3 fondos WebGL (caustics, silk, chrome); Framer + Lemon Squeezy a 24/59 $; regla de no repetir lo entregado a un cliente
metadata: 
  node_type: memory
  type: project
  originSessionId: 802fa9ed-5310-47a9-9542-8177e94cd987
  modified: 2026-08-09T19:44:47.837Z
---

**Lustre** (hasta el 27-sep se llamó **Haze**) es el **primer producto** de Alejandro pensado como **ingreso pasivo** (9-ago-2026). Vive en `C:\Users\galve\Documents\Ale\Productos\Haze\` (repo `Boveda-ALE`). Nota: [[Lustre]].

**Qué es:** **tres** fondos atmosféricos en WebGL escritos a mano —`caustics` (luz de piscina), `ribbons` (cintas de luz) y `chrome` (metal líquido)— en **un archivo, cero dependencias, 23 KB**, un triángulo y una llamada de dibujo por fotograma. Siete paletas, envoltorio de React, auto-arranque por `data-haze`, y una demo-sala-de-control que copia el código de lo que montes.

🚨 **LA REGLA QUE SALIÓ DE AQUÍ, y vale para todo lo que se venda:**
**lo que se vende NO puede parecerse a lo que se le ha entregado a un cliente.** No basta con que el código sea nuevo: **tiene que verse distinto.**
La primera versión de este producto era el **eclipse de la v2 de [[labrega-studio]]**, reescrito de cero. Alejandro lo cortó al verlo: *«es igual que el de La Brega, y La Brega es un cliente que ya tengo»*. Tenía razón — yo me aseguré de que el **código** fuese nuevo, que es lo que no importa; lo que importa es **cómo se ve**. Si el cliente acepta esa web y luego cualquiera puede comprar su portada por 39 €, **se le devalúa la identidad**. Eso no se arregla pidiendo permiso. **El eclipse se queda en La Brega.**
Lo que sí se conservó fue **el motor** (respaldos, pausado, movimiento reducido, React, build, sala de control): genérico y el 80% del trabajo.

**La estrategia:** Alejandro pidió negocio **fuera de Reload, automatizado, escalable, no cara al público** y después **pasivo**. Se descartó el SaaS de auditoría de accesibilidad (paga ~6.000 €/mes pero **nunca es pasivo**) y se eligió el **catálogo de piezas**. La regla que lo explica: **lo pasivo se paga regalándole la distribución a otro** (Framer, Envato, UI8 se quedan el 30–50%) a cambio de desaparecer tú.

⚠️ **Con 3 piezas no funciona; con 12, sí.** Realista a 2 años: **800–2.500 €/mes**, y **no es recurrente**. Haze es la **pieza 1**. Prueba acordada: **Framer Marketplace**, **60 días sin tocar nada**, y ese número decide.

**Reglas duras:** el `cdp.ps1` y el Radar **son de Reload y no se sacan**. La licencia es un **borrador** (que la lea un abogado) y si vende por marketplace **manda la del marketplace**. Está en **Canarias → IGIC, no IVA**: mirar *merchant of record* con el gestor. **Nunca prometer cumplimiento de accesibilidad** ni de ninguna ley.

**27-sep-2026 — rehecho como «producto estrella»** (lo pidió así). La v1 NO lo era: se veía peor que fondos gratis (ShaderGradient, Vanta). Fondos rehechos de cero (caustics = Voronoi F2-F1 doblado por ruido; ribbons = cintas que se dan la vuelta; chrome = refleja un estudio hecho con la paleta), componente de Framer `dist/Haze.framer.tsx` (lo genera `build.ps1` desde `src/framer.tsx`), y 4 fallos que venían de la v1 arreglados. **Venta: Framer Marketplace (escaparate, no cobra) + Lemon Squeezy (5 %, merchant of record) a 24 $ / 59 $**; todo en `venta/Ficha de venta.md`, ZIP y demo pública con `venta/empaquetar.py`. **Pruebas: `pruebas/pruebas.ps1` (63, todas en verde) — relanzarlas tras tocar cualquier cosa.** Lecciones: juzgar los fondos a TAMAÑO DE CABECERA (en miniatura todo parece nítido); `Select-Object -First` corta el script y deja capturas viejas; el build debe leer en UTF-8. Pendiente, él: pasos 1-9 de la ficha.

**27-sep (tarde) — investigación + segunda vuelta.** Mercado: Framer (0 %, enlaza a tu pago) + Lemon Squeezy **confirmados** con doc oficial; Envato ya sin exclusividad pero 50 %. **Lo gratis es bueno** (Paper Shaders con *liquid metal*, Vanta, ShaderGradient): el hueco defendible son **motivos reconocibles**, no degradados. `ribbons` **rehecho y renombrado a `silk`** (tela tornasolada drapeada; las cintas parecían tubos de plástico). Fallo arreglado: `mobile.scale` **pisaba** la escala del comprador → ahora multiplica. **Vídeo de la ficha** con `venta/video.ps1` (ffmpeg vía `pip install imageio-ffmpeg`; `video.html` pinta cada fotograma en un instante exacto). 64 pruebas, 0 fallos. Nombre: en npm están cogidos todos los cortos; decisión de marca pendiente de él. **Renombrado a Lustre el 27-sep** (lo eligió él): carpeta aún `Productos/Haze/` (renombrarla a `Productos/Lustre/` cuando VS Code suelte `paquete/`; los enlaces apuntan a Haze hasta entonces), `data-lustre`, `window.Lustre`, `LustreBackground`, `Lustre.framer.tsx`. Ojo al renombrar: `autoInit` tenía `slice(10)` = largo de `data-haze-` escrito a mano; ahora se calcula. Truco: `Invoke-Js` de cdp.ps1 espera un CUERPO de función → `return X`.

**27-sep (noche) — estado de lanzamiento:** web viva en lustre-backgrounds.netlify.app (Netlify Drop SE SALTA carpetas `dist` → motor en `js/`); Lemon Squeezy tienda `alejandrogalvez` (USD, W-8BEN, IBAN Revolut), identidad en revisión, producto Single 24 / Unlimited 59 con ZIP, compra de prueba OK; enlace de prueba en `venta/config.json` (buy_single/buy_unlimited). Plan B si Lemon falla: Gumroad. Framer exige entregar el **Component URL** tras la compra (añadirlo en Links de Lemon) y miniatura sin texto. Siguiente: Framer. Carpetas de trabajo en su Escritorio: `LUSTRE - ARRASTRAR A NETLIFY`, `LUSTRE - PARA LEMON SQUEEZY`, `LUSTRE - PARA FRAMER`.

Relacionado: [[user-profile]], [[preview-web-changes]], [[boveda-alejandro-personal]], [[labrega-studio]].
