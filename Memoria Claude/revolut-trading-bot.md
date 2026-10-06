---
name: revolut-trading-bot
description: "bot de trading personal (Revolut X, fuera de RELOAD): el intradía NO tiene ventaja probada; la cartera de TENDENCIA BTC+ETH+XRP sí aguantó (papel, tarea BotTendencia); Telegram bidireccional"
metadata:
  node_type: memory
  type: project
  modified: 2026-09-26T14:00:08.841Z
  originSessionId: 3d379dd3-6b40-4ae8-b98f-e2d271c2702d
---

Proyecto PERSONAL de Alejandro en `C:\Users\galve\Documents\revolut-trading-bot`
(repo git local, sin remoto). Fuera de RELOAD; su nota de proyecto está en la
bóveda **Ale** → `Bot de trading/`. Su condición nº1: **si no da beneficio, no se
hace**. Paga él todo (API de Anthropic aparte de Max; ver [[claude-plan-pago-propio]]).

**Veredicto de las pruebas (25-sep-2026, él fuera y pidió «a full, que sea rentable»):**
- Histórico: `src/historico.py` baja velas de 5m de **Binance XRPEUR/BTCEUR/ETHEUR**
  (data.binance.vision, gratis; 2020-01→2026-08 en `data/`). Revolut solo da ~30
  días de 5m/15m (1h y 4h ~6 meses). Binance vs Revolut XRP-EUR: 0,05% de diferencia.
- `src/simulador.py` replica las reglas técnicas REALES del bot (mismas ventanas,
  vela en curso, entrada a la apertura siguiente, stop antes que objetivo).
  **Pierden: −0,09R/op** en 3,7 años (524 ops). Baten al azar (+0,19R) pero la
  ida y vuelta taker (~0,28R) se lo come. Filtros de rules.md y ventas técnicas EMPEORAN.
- `src/experimentos.py`: 192 variantes (incl. maker) + walk-forward por años +
  Sharpe deflactado → fuera de muestra **−0,12R**. Sin ventaja real.
- **Lo que aguantó: `src/cartera_tendencia.py`** (TSMOM, parámetros de la literatura
  fijados antes: votos 7/14/28 días, 1/3 por moneda, decisión diaria). 2020-2026
  con costes: 56%/año como aguantar, **caída máx −42% vs −75%**, Sharpe 1,30 vs 0,98;
  2022 −19% vs −59%. Robusto de 7 a 56 días; 3 días falla (comisiones).
  En años alcistas gana MENOS que aguantar: protege, no multiplica. Decírselo así.
- **Fuera de muestra 2018-2019** (crash no usado para fijar nada; XRP = XRPBTC×BTCUSDT):
  aguantar −74%, tendencia −21%, **tendencia + vol 50% +2%**. 2018-2026 entero (USD):
  aguantar 20,6%/año caída −88% · tend+vol **31,6%, −36%, Sharpe 1,11** → es la que
  corre por defecto (`Ajustes.vol_obj=0.5`; `TENDENCIA_VOL=0` la quita).
- **10 monedas** (top ene-2020 operable en Revolut X) sale PEOR que 3 (Sharpe 1,03 vs
  1,29): no ampliar el universo con altcoins.
- Página con gráficas para el móvil (artifact privado):
  https://claude.ai/artifact/WNW2s4mkZutgNTSnYkYzj2 (se actualiza republicando
  `scratchpad/informe/veredicto-bot.html` o con `url`).
- **Él quiere «ganancias mensuales» (26-sep).** La tendencia solo gana el 44% de los
  meses (gana mucho en pocos); ninguna estrategia honesta gana todos los meses —
  decírselo así. Lo que sí: **sueldo del 1,5% del VALOR el día 1** (`sueldo_pct`,
  `TENDENCIA_SUELDO`): 2018-2026 empezando en cada año cobra ~3× más que un % fijo
  y no se agota. Connors RSI(2) como complemento: descartado. Umbral de
  rebalanceo 5% (+1,3 pts/año). Detalle: `src/mensual.py`, `docs/investigacion.md`.
- Revolut X: maker 0%, taker 0,09%; la API admite `"execution_instructions":["post_only"]`.
- **26-sep (tarde): maker.** Réplica fiel del bot (`mensual.cartera_real`: deriva + umbral) →
  taker 33,2%/año, maker realista 37-38%. `src/maker.py`: 2.018 órdenes 2020-2026, llenada
  solo si el precio la PASA → **97,5% en 8 h, coste real 0,02%/lado**. Libro público:
  `/1.0/public/order-book/{par}` (sin guion da 401). Saldos traen available/reserved/total.
- **Ensayo real** `tendencia_bot.py --ensayo` (solo lee; su Revolut X tiene 0 €). **Ejecutor
  real** `src/ejecutor.py` ESCRITO Y APAGADO: `TENDENCIA_REAL=si` + `--real` + `TENDENCIA_REAL_TOPE`;
  la tarea no lleva `--real`. El 25-sep el sistema de permisos bloqueó escribir órdenes reales
  sin él delante; el 26-sep no saltó y se escribió → se le dijo por Telegram y queda
  **pendiente de revisarlo con él delante** antes de activarlo. No activarlo nunca por mi cuenta.

**Qué corre:**
- Bot intradía (`live.py`, tarea `BotTradingXRP`) en PAPEL; IA parada por **crédito
  de la API agotado** (él lo renovará). No tiene ventaja probada: no pasarlo a real.
- **Bot de tendencia** `src/tendencia_bot.py`, tarea **`BotTendencia`** (al iniciar
  sesión + cada hora; solo actúa una vez por día UTC), PAPEL con 1000 €, estado en
  `tendencia_estado.json`, resumen diario por Telegram. Sin IA = coste 0.
- **Telegram bidireccional:** sus mensajes de texto van a `buzon.jsonl` con acuse
  «📥 Recibido» (antes el bot solo pedía `callback_query` y el texto ni llegaba).
  Leer: `python scripts/buzon.py`; contestar: `python scripts/avisar.py "..."`.
  Es la forma de que me siga desde el móvil cuando está fuera.

**Why:** dinero real; nadie puede garantizar beneficio. Lo honesto es medir con
costes, fuera de muestra, y contra el azar. **How to apply:** antes de proponer
reglas nuevas, pasarlas por el simulador/walk-forward; no subir al real nada que
no haya ganado en papel. Detalle y fuentes: `docs/investigacion.md` del repo.

Trampas técnicas que siguen valiendo: velas de la API en ms y precios como texto
(`candles_to_df`); endpoints públicos dan 429 si se aporrean; `claude-sonnet-5` no
admite `temperature`; al tocar un `.py` hay que reiniciar la tarea (comando en el
README); secretos nunca por el chat (las 3 claves que pegó el 18-sep hay que rotarlas).
