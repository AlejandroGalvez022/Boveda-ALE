---
titulo: Umbra
tipo: proyecto
categoria: Producto
estado: activo
siguiente: "9-ago: PRODUCTO TERMINADO y verificado (0 fallos), en Productos/Umbra/paquete/. Es un fondo de eclipse en WebGL escrito a mano, sin librerias, para vender en marketplaces como ingreso pasivo. AHORA TOCA, POR ESTE ORDEN: (1) ABRIR demo/index.html con Live Server y jugar con los sliders — si no te gusta como se ve, no se publica; (2) poner tu email en LICENSE.md donde pone [your email here] y decidir el precio; (3) comprobar que el nombre UMBRA esta libre (dominio + buscar en Envato/Framer/npm); (4) subirlo a Framer Marketplace, que es donde menos competencia tiene tu perfil. LA REGLA: 60 dias sin tocar nada y se mira cuanto vende. Si vende, se empaqueta una pieza al mes hasta tener 12"
conversaciones: 0
tags: [proyecto, producto, webgl, pasivo, marketplace]
---

# 🌑 Umbra

Volver al [[Indice]]

## Qué es

Un **fondo de eclipse en WebGL escrito a mano**, empaquetado como producto para
vender en marketplaces. Un archivo, sin dependencias, 20 KB.

No es una web: es **la primera pieza del catálogo**. La idea de negocio es
ingresos pasivos — construyes una pieza, la subes a una tienda que ya tiene
público, y vende sola. Ver la estrategia completa abajo.

## Por qué esta pieza y no otra

Porque escribir un shader a mano es **lo más raro que sabes hacer** y casi
ningún vendedor de plantillas sabe. El mercado está lleno de plantillas limpias
y vacío de movimiento de verdad.

Sale del eclipse de la v2 de [[La Brega Studio/La Brega Studio|La Brega]], pero
está **escrito de cero y genérico**: ni una línea, ni un color, ni un texto de
Raúl. Paleta propia (siete presets), opciones nuevas y respaldos que la web de
La Brega no necesitaba.

## Dónde está

`Productos/Umbra/paquete/` — eso es literalmente lo que se sube a la tienda.

| | |
|---|---|
| `demo/index.html` | **Ábrela primero.** Sala de control: todos los mandos en vivo y un botón que te copia el código de lo que hayas montado. Esto es lo que vende. |
| `demo/examples/` | `minimal` (cero líneas de JS), `scroll` (el eclipse se abre al bajar), `card` (tres instancias a la vez) |
| `dist/umbra.js` | El `<script>` de toda la vida. Deja `window.Umbra` y arranca solo los `[data-umbra]` |
| `dist/umbra.esm.js` | Módulo ES, para quien use empaquetador |
| `react/Umbra.jsx` | Envoltorio de React / Next / Framer, seguro en servidor y con limpieza al desmontar |
| `src/umbra.js` | El fuente comentado. **Es el único sitio donde se edita** |
| `build.ps1` | Regenera `dist/` desde `src/`. Sin Node ni empaquetador: el producto promete cero dependencias y su build también |
| `docs/` | `INSTALL.md` (HTML, React, Next, Framer, Webflow, WordPress) y `API.md` |
| `LICENSE.md` | ⚠️ Borrador. **Que lo lea un abogado o tu gestor antes de publicar** |

## Qué lo hace vendible (y no un script más)

Un shader bonito lo tiene cualquiera. Lo que se paga es lo que pasa **cuando
algo va mal**:

- **Sin WebGL** → pinta el mismo eclipse en CSS. El comprador nunca ve un hero negro.
- **El shader no compila** → mismo respaldo, más un aviso `onFallback` para que lo registre.
- **Fuera de pantalla o pestaña oculta** → deja de dibujar.
- **`prefers-reduced-motion`** → un fotograma quieto y **no arranca el bucle nunca**.
- **Contenedor redimensionado** → `ResizeObserver`, así funciona dentro de Webflow o Elementor.
- **Al desmontar** → `destroy()` quita escuchadores, bucle, programa, búfer y suelta el contexto.
- El radio se mide contra la **altura** del contenedor, no el ancho: la composición aguanta el redimensionado en vez de irse por el borde.

Y una sola opción es la que de verdad compran: **`open`** (0→1). La enganchas al
scroll y el eclipse se abre. Va suavizada, así que puedes darle el `scrollY` en
crudo cada fotograma.

## Verificado

Chromium por CDP, **0 fallos**:

- 360 / 390 / 768 / 1280 / 1440 / 1920 → canvas del tamaño correcto, sin desbordes, 0 errores de consola.
- **Pinta de verdad**: 44–152 tonos distintos en la zona del disco (si fuese un rectángulo plano habría 1).
- **Los presets cambian el dibujo** de verdad (distancia de color eclipse→ice de 65,6, no "cambia el CSS").
- **La apertura abre** (distancia 30,2 entre `open(0)` y `open(1)`).
- `pause()`, `play()` y `destroy()` hacen lo que dicen, y `destroy()` no deja restos.
- **Sin WebGL**: el canvas se retira y aparece el gradiente de respaldo.
- **Movimiento reducido**: dos capturas con 1,8 s de diferencia salen **idénticas** — o sea que de verdad no hay bucle.

🐛 **Un fallo real cazado**: en la demo, `codeEl` se declaraba *después* del
bucle de sliders, y los sliders llaman a `paintCode()` nada más crearse → `var`
sin asignar → `TypeError` en las 6 resoluciones. Se veía bonito y estaba roto.

## La estrategia (por qué esto y no un SaaS)

Alejandro pidió **ingresos pasivos**. Un SaaS paga más (~6.000 €/mes) pero
**nunca es pasivo**: hay altas, bajas, caídas y correos. Un catálogo de piezas
paga menos pero **sí lo es**.

El precio de lo pasivo es siempre el mismo: **le regalas la distribución a otro
y él se lleva su parte**. Quien pone el tráfico (Framer, Envato, UI8) se queda
el 30–50%. A cambio, tú desapareces.

> [!warning] Con 3 piezas esto no funciona. Con 12, sí.
> Realista a 2 años: **800–2.500 €/mes**. Hay quien saca mucho más y mucha
> gente que saca 50 €. No es "monto tres y me jubilo": es un catálogo que se
> construye durante un año y luego renta solo. Y **no es recurrente**: si dejas
> de añadir, decae despacio.

Dónde venderlo, por orden: **Framer Marketplace** (menos competencia para tu
perfil, comprador que paga) → Envato/ThemeForest → UI8. Gumroad propio solo como
complemento: ahí el tráfico lo pones tú, y eso ya no es pasivo.

## Antes de publicar

- [ ] **Abrir `demo/index.html`** y jugar con los mandos. Si no te gusta cómo se ve, no se publica.
- [ ] **Comprobar que el nombre está libre**: dominio, y buscar "Umbra" en Envato, Framer y npm.
- [ ] Poner tu **email** en `LICENSE.md` (pone `[your email here]`) y decidir el precio.
- [ ] Que un **abogado o tu gestor** lea la licencia. Es un borrador escrito para ser claro, no para ser a prueba de balas.
- [ ] Ojo: si vendes por marketplace, **su licencia manda sobre la tuya**. Léela.
- [ ] Fiscal: **estás en Canarias → IGIC, no IVA**. Y si vendes a la UE, mira si te compensa un *merchant of record* (Lemon Squeezy, Paddle) para no lidiar con el IVA de 27 países. **Esto con tu gestor, sin falta.**
- [ ] Nada de esto toca Reload. El fuente es nuevo y es tuyo — pero **revisa tu contrato** por si hay cláusula de exclusividad.

## Próximos pasos

- [ ] Publicar la v1 en Framer Marketplace.
- [ ] **60 días sin tocar nada** y mirar cuánto vende. Ese número es la única respuesta real.
- [ ] Si vende → una pieza nueva al mes hasta llegar a 12. Candidatas del [[Laboratorio web/Laboratorio web|Laboratorio web]]: AZOGUE (cromo líquido), la chaqueta que se infla.
- [ ] Si no vende → se descarta habiendo perdido un mes y cero euros.

> [!note] La v1 y la v2 de La Brega siguen intactas. Umbra no las toca: es código nuevo.
