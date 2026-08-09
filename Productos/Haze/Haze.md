---
titulo: Haze
tipo: proyecto
categoria: Producto
estado: activo
siguiente: "9-ago: PRODUCTO TERMINADO y verificado (0 fallos), en Productos/Haze/paquete/. Son TRES fondos WebGL escritos a mano (caustics, ribbons, chrome) en un solo archivo sin dependencias, para vender en marketplaces como ingreso pasivo. NINGUNO se parece al eclipse: ese es de La Brega y se queda ahi. AHORA TOCA, POR ESTE ORDEN: (1) ABRIR demo/index.html con Live Server y cambiar de motivo y de paleta — si no te gusta, no se publica; (2) poner tu email en LICENSE.md donde pone [your email here] y decidir el precio; (3) comprobar que el nombre HAZE esta libre (dominio + buscar en Envato/Framer/npm); (4) subirlo a Framer Marketplace. LA REGLA: 60 dias sin tocar nada y se mira cuanto vende. Si vende, se empaqueta una pieza al mes hasta tener 12"
conversaciones: 0
tags: [proyecto, producto, webgl, pasivo, marketplace]
---

# 🌫️ Haze

Volver al [[Indice]]

## Qué es

**Tres fondos atmosféricos en WebGL escritos a mano**, empaquetados como producto
para vender en marketplaces. Un archivo, sin dependencias, 23 KB.

No es una web: es **la primera pieza del catálogo**. La idea de negocio son
ingresos pasivos — construyes una pieza, la subes a una tienda que ya tiene
público, y vende sola.

| Motivo | Qué es |
|---|---|
| **`caustics`** | La luz del fondo de una piscina. Dos capas de fBm, la segunda deformada por la primera, dobladas por su mitad para que las manchas suaves se conviertan en filamentos finos y brillantes. |
| **`ribbons`** | Cuatro cintas de luz que van y se cruzan. Deformación del dominio: cada cinta se dibuja sobre una coordenada **que ya viene torcida** por ruido, y eso es lo que convierte una onda de manual en tela. |
| **`chrome`** | Metal líquido. Un campo de alturas derivado a normal, y esa normal lee la paleta **como si fuera un entorno reflejado**. Sin texturas y sin luces. |

## ⚠️ Por qué NO es un eclipse

**Porque el eclipse es de [[La Brega Studio/La Brega Studio|La Brega]], y La Brega
es un cliente de verdad.**

La primera versión de este producto **era** el eclipse de su v2, reescrito de cero
y con otra paleta. Alejandro lo vio y lo cortó en un segundo: *«es igual que el de
La Brega, y La Brega es un cliente que ya tengo»*.

Tenía razón, y el error estaba en el sitio equivocado: yo me había asegurado de que
**el código** fuese nuevo, que es lo que no importa. Lo que importa es **cómo se ve**.
Si Raúl acepta esa web y luego cualquiera puede comprar su portada por 39 €, **se le
ha devaluado la identidad a un cliente**. Eso no se arregla pidiéndole permiso.

> [!warning] La regla que queda para todo el catálogo
> **Lo que se vende no puede parecerse a lo que se le ha entregado a un cliente.**
> No basta con que el código sea nuevo: tiene que **verse distinto**.

Lo que sí se conservó es **el motor** —respaldos, pausado, movimiento reducido,
envoltorio de React, build, sala de control—, que es genérico y era el 80% del
trabajo. Solo cambió el motivo. Y de paso el producto salió más fuerte: en vez de
un fondo, tres.

## Dónde está

`Productos/Haze/paquete/` — eso es literalmente lo que se sube a la tienda.

| | |
|---|---|
| `demo/index.html` | **Ábrela primero.** Sala de control: cambia de motivo y de paleta, mueve todos los mandos, y un botón te copia el código de lo que hayas montado. Esto es lo que vende. |
| `demo/examples/` | `minimal` (cero líneas de JS), `scroll` (la energía sube al bajar), `card` (los tres motivos a la vez) |
| `dist/haze.js` | El `<script>` de toda la vida. Deja `window.Haze` y arranca solo los `[data-haze]` |
| `dist/haze.esm.js` | Módulo ES, para quien use empaquetador |
| `react/Haze.jsx` | Envoltorio de React / Next / Framer, seguro en servidor y con limpieza al desmontar |
| `src/haze.js` | El fuente comentado. **Es el único sitio donde se edita.** Cada motivo es una entrada de la tabla `MOTIFS`: si añades una cuarta, el motor la coge sin tocar nada más |
| `build.ps1` | Regenera `dist/` desde `src/`. Sin Node ni empaquetador: el producto promete cero dependencias y su build también |
| `docs/` | `INSTALL.md` (HTML, React, Next, Framer, Webflow, WordPress) y `API.md` |
| `LICENSE.md` | ⚠️ Borrador. **Que lo lea un abogado o tu gestor antes de publicar** |

## Qué lo hace vendible (y no un script más)

Un shader bonito lo tiene cualquiera. Lo que se paga es lo que pasa **cuando algo
va mal**:

- **Sin WebGL** → pinta un respaldo en CSS **del motivo que le hayas pedido**. El comprador nunca ve un hero vacío.
- **El shader no compila** → mismo respaldo, más un aviso `onFallback`.
- **Fuera de pantalla o pestaña oculta** → deja de dibujar.
- **`prefers-reduced-motion`** → un fotograma quieto y **no arranca el bucle nunca**.
- **Contenedor redimensionado** → `ResizeObserver`, así funciona dentro de Webflow o Elementor.
- **Al desmontar** → `destroy()` quita escuchadores, bucle, programa, búfer y suelta el contexto.
- **Cambiar de motivo** reconstruye solo el shader: el canvas y el contexto se mantienen.

Y una sola opción es la que de verdad compran: **`energy`** (0→1). La enganchas al
scroll y la superficie se despierta. Va suavizada, así que puedes darle el `scrollY`
en crudo cada fotograma.

## Verificado

Chromium por CDP, **0 fallos**:

- 360 / 390 / 768 / 1280 / 1440 / 1920 → canvas del tamaño correcto, sin desbordes, 0 errores de consola.
- **Pinta de verdad**: 132–159 tonos distintos (un rectángulo plano daría 1).
- **Los tres motivos son distintos entre sí** (distancia de color 15,9 / 58,9 / 49,1).
- **Ninguno dibuja un disco oscuro rodeado de luz** — comprobación explícita para que nada recuerde a La Brega.
- **Las paletas cambian el dibujo** (lagoon→magma: 132,4).
- **La energía cambia el dibujo** (13,3), y sube con el scroll en el ejemplo (54,6).
- `pause()`, `play()` y `destroy()` hacen lo que dicen; `destroy()` no deja restos.
- **Sin WebGL**: el canvas se retira y aparece el respaldo.
- **Movimiento reducido**: dos capturas con 1,8 s de diferencia salen **idénticas**.

🐛 **Dos fallos reales cazados**: (1) en la demo, `codeEl` se declaraba *después*
del bucle de sliders, que llama a `paintCode()` nada más crearse → `var` sin
asignar → `TypeError` en las 6 resoluciones; (2) **el motivo `chrome` salía como
estática de televisión** — cinco octavas de fBm y un épsilon minúsculo daban
derivadas tan bruscas que la normal cambiaba en cada píxel. Tres octavas suaves y
un épsilon ancho, y ya es una superficie.

## La estrategia

Alejandro pidió **ingresos pasivos**. Un SaaS paga más (~6.000 €/mes) pero
**nunca es pasivo**: altas, bajas, caídas y correos. Un catálogo de piezas paga
menos pero **sí lo es**.

El precio de lo pasivo es siempre el mismo: **le regalas la distribución a otro y
él se lleva su parte**. Quien pone el tráfico (Framer, Envato, UI8) se queda el
30–50%. A cambio, tú desapareces.

> [!warning] Con 3 piezas esto no funciona. Con 12, sí.
> Realista a 2 años: **800–2.500 €/mes**. Hay quien saca mucho más y mucha gente
> que saca 50 €. Y **no es recurrente**: si dejas de añadir, decae despacio.

Dónde venderlo, por orden: **Framer Marketplace** → Envato/ThemeForest → UI8.
Gumroad propio solo como complemento: ahí el tráfico lo pones tú, y eso ya no es
pasivo.

## Antes de publicar

- [ ] **Abrir `demo/index.html`** y cambiar de motivo y de paleta. Si no te gusta, no se publica.
- [ ] **Comprobar que el nombre está libre**: dominio, y buscar "Haze" en Envato, Framer y npm.
- [ ] Poner tu **email** en `LICENSE.md` (pone `[your email here]`) y decidir el precio.
- [ ] Que un **abogado o tu gestor** lea la licencia. Es un borrador escrito para ser claro, no para ser a prueba de balas.
- [ ] Ojo: si vendes por marketplace, **su licencia manda sobre la tuya**.
- [ ] Fiscal: **estás en Canarias → IGIC, no IVA**. Si vendes a la UE, mira con tu gestor si compensa un *merchant of record* (Lemon Squeezy, Paddle).
- [ ] Nada de esto toca Reload. El fuente es nuevo y es tuyo — pero **revisa tu contrato** por si hay cláusula de exclusividad.

## Próximos pasos

- [ ] Publicar la v1 en Framer Marketplace.
- [ ] **60 días sin tocar nada** y mirar cuánto vende. Ese número es la única respuesta real.
- [ ] Si vende → una pieza nueva al mes hasta llegar a 12. Y cada una pasa el mismo filtro: **que no se parezca a nada entregado a un cliente**.
- [ ] Si no vende → se descarta habiendo perdido un mes y cero euros.
