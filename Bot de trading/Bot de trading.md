---
titulo: Bot de trading
tipo: proyecto
categoria: Experimentos
estado: activo
siguiente: "Dejar correr la cartera de TENDENCIA en papel (tarea BotTendencia, resumen diario por Telegram) al menos 4-8 semanas y compararla con 'aguantar las 3'. El bot intradía NO tiene ventaja probada: no pasarlo a real. Renovar el crédito de la API solo si se quiere seguir probando la IA."
conversaciones: 1
tags: [proyecto, trading, python]
---

# 📈 Bot de trading (Revolut X)

Volver al [[Indice]]

> [!info] Ficha
> **Código:** `C:\Users\galve\Documents\revolut-trading-bot` (repo git local, sin remoto) · **Exchange:** Revolut X (API firmada Ed25519) · **Avisos y control:** Telegram · **Modo:** PAPEL (dinero simulado)

## 🎯 El veredicto (25-sep-2026)

| | ¿Gana después de comisiones? |
|---|---|
| **Bot intradía** (reglas técnicas + IA, XRP, 15 min) | ❌ **No demostrado.** Las reglas técnicas pierden −0,09R por operación en 3,7 años; con 192 variantes validadas año a año, fuera de muestra −0,12R |
| **Cartera de TENDENCIA** (BTC+ETH+XRP, una decisión al día) | ✅ **Aguantó la prueba** 2020-2026: mismo dinero que aguantar las tres, con la caída máxima de −75% a **−42%**. En 2022: −19% frente a −59% |

> [!warning] Lo que NO promete
> Nadie puede garantizar beneficio. La tendencia **protege en las caídas**, pero en los años muy alcistas gana **menos** que aguantar (entra tarde). Es menos riesgo por el mismo dinero, no dinero mágico.

## ⚙️ Qué está corriendo

| Qué | Cómo | Coste |
|---|---|---|
| **Bot de tendencia** | Tarea de Windows `BotTendencia`: una pasada al día, 1.000 € en papel, resumen por Telegram | 0 € (sin IA) |
| Bot intradía | Tarea `BotTradingXRP`, en papel. La IA está parada: **crédito de la API agotado** | ~66 €/mes con la IA encendida |
| **Hablar con Claude por Telegram** | Escribe en el chat del bot: te llega «📥 Recibido» y Claude lo lee y contesta | — |

## 📋 Próximos pasos
- [ ] Dejar la tendencia en papel **4-8 semanas** y comparar con «aguantar las 3» (sale en cada resumen).
- [ ] Si convence: pasarla a real con **poco dinero** y órdenes *post-only* (0% de comisión en Revolut X).
- [ ] Rotar las 3 claves que se pegaron en el chat el 18-sep (Anthropic, Revolut X, Telegram).
- [ ] Decidir si merece la pena seguir pagando la IA del intradía: las pruebas dicen que sus reglas técnicas no tienen ventaja.

## 💬 Conversaciones (1)
- 2026-09-25 - [[Bot de trading/2026-09-25 - Pruebas de rentabilidad y cartera de tendencia|Pruebas de rentabilidad y cartera de tendencia]]
