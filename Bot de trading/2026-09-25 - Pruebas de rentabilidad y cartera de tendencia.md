---
titulo: "Pruebas de rentabilidad y cartera de tendencia"
tipo: conversacion
proyecto: Bot de trading
fecha: 2026-09-25
tags: [conversacion, trading]
---

Proyecto: [[Bot de trading/Bot de trading|Bot de trading]]

# 🧪 ¿El bot gana dinero? Pruebas con 3,7-6,7 años de datos

Encargo: *«ponte a full, quiero que el bot sea rentable, investiga todo lo que puedas»* (él fuera, la IA del bot parada por falta de crédito).

## 1. Datos

- Revolut X solo da **~30 días** de velas de 5 minutos. Con un mes no se puede decir nada.
- **Binance** publica gratis el histórico del **mismo par XRP-EUR** (y BTC-EUR, ETH-EUR). Comparado con Revolut: **0,05%** de diferencia media.
- Bajado: 2020-01 → 2026-08, velas de 5 minutos, las tres monedas.

## 2. Las reglas del bot intradía, simuladas tal cual

Mismo código del bot (`analisis_tecnico`, `risk`, `costes`), mismas ventanas, comisiones y slippage. 2023-01 → 2026-08:

| | Operaciones | Aciertos | Por operación | Total |
|---|---|---|---|---|
| Reglas del bot | 524 | 50% | **−0,09R** | −4,4% |
| Entradas al azar, mismas salidas | — | 45% | −0,28R | −53% |
| Aguantar XRP | — | — | — | +234% |

**Lectura:** las entradas del bot son algo mejores que el azar (+0,19R), pero ir y volver cuesta ~0,28% y con stops de ~1% eso son **~0,28R por operación**: las comisiones se comen la ventaja. Los «filtros de rules.md» y las ventas técnicas **empeoran** el resultado.

## 3. ¿Y con órdenes sin comisión (maker)?

Revolut X cobra **0%** con órdenes *post-only* y la API las admite. Probadas **192 variantes** (tipos de entrada, filtros, maker, salidas, horario, tendencia de 7 días):

- La mejor dentro de muestra: +0,07R, **no significativa** (Sharpe deflactado ≈ 0: con 192 intentos, alguna sale bien por suerte).
- **Walk-forward** (elegir con los años anteriores, medir en el siguiente): **−0,12R**. Pierde.

➡️ **La lógica intradía no tiene ventaja real.** Mejor saberlo en papel.

## 4. Lo que sí tiene respaldo: la tendencia de días/semanas

Investigación (papers de SSRN, Bailey & López de Prado...): en cripto el *momentum* existe a **días-semanas**, no a minutos. Parámetros fijados **antes** de mirar: por moneda, tres votos (¿sube a 7, 14 y 28 días?), 1/3 de la cartera cada una, una decisión al día.

2020-01 → 2026-08, con comisiones:

| | Anual | Caída máx | Sharpe |
|---|---|---|---|
| Aguantar las 3 | 55,7% | −74,9% | 0,98 |
| **Tendencia 3 monedas** | **56,3%** | **−42,1%** | **1,30** |
| Tendencia + control de volatilidad | 39,4% | −31,0% | 1,39 |

| Año | Aguantar | Tendencia |
|---|---|---|
| 2021 | +302% | +184% |
| **2022** | **−59%** | **−19%** |
| 2025 | −17% | −7% |
| 2026 | −15% | +11% |

Funciona parecido con plazos de **7 a 56 días** (no depende de haber acertado). Con 3 días falla: demasiadas comisiones.

## 5. Qué se ha dejado montado

- **Bot de tendencia en papel** (tarea `BotTendencia`), con resumen diario por Telegram. Primera pasada hecha: 1/3 en cada moneda.
- **Telegram en los dos sentidos:** antes el bot solo escuchaba botones; ahora los mensajes de texto le llegan a Claude.
- En el repo: `docs/investigacion.md` (fuentes), `src/simulador.py`, `src/experimentos.py`, `src/cartera_tendencia.py`, `src/tendencia_bot.py` y sus tests.

> [!todo] Verificar
> 4-8 semanas de papel antes de pensar en dinero real, y siempre empezar con poco.
