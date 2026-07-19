# CLAUDE.md — Bóveda personal de Alejandro (Ale)

## Qué es esto
Bóveda de Obsidian con los **proyectos personales** de Alejandro Gálvez (por fuera de su trabajo en Reload Group Canarias): clientes propios, ideas de apps y demos web. El trabajo de la agencia va en OTRO repo (`Boveda-RELOAD`, carpeta `BOVEDA/RELOAD`). **NUNCA** edites nada dentro de `.obsidian/`.

## Estructura
- Una carpeta por proyecto, con **nota-resumen** homónima y conversaciones `AAAA-MM-DD - Título.md`.
- `Laboratorio web/` → demos web autocontenidas (.html) + su nota-índice `Laboratorio web.md` (añadir ahí cada demo nueva).
- `Experimentos/` → ideas de apps personales.
- `Indice.md` → inicio · `Panel.base` → tabla viva de proyectos (todo proyecto lleva frontmatter `tipo: proyecto` + `estado` + `siguiente: "..."` para salir en el Panel con su próximo paso).
- `Registro de cambios.md` → bitácora de esta bóveda (lo más reciente arriba; anotar cada cambio).
- `Plantillas/` → plantillas de proyecto y conversación (al usarlas, cambiar `tipo: plantilla` por el real).
- La **Bandeja universal** (inbox) está en el repo Reload: `RELOAD/Bandeja.md` — leerla al empezar sesión si está clonado.

## Reglas de trabajo (memoria de Claude)
La memoria completa vive en el repo **`Boveda-RELOAD`**, carpeta **`Memoria Claude/`** — si trabajas en esta bóveda desde un ordenador nuevo, léela primero. Resumen crítico:
1. **Commit+push automático SIEMPRE** (Claude lo hace, verificando local=remoto; repo `AlejandroGalvez022/Boveda-ALE`).
2. **PROHIBIDO tocar el repo `MACV7`** (CMS de MAC-IDAFE).
3. Todo cambio se refleja en el **Panel** y se escribe en **español**, tono directo e informal, con enlaces `[[nota|Texto]]`.
4. **Modo ahorro de tokens**: respuestas concisas, sin multi-agente por defecto.
5. Sincronización **solo por GitHub** — Obsidian Sync está desactivado a propósito, NO reconectarlo.
6. Demos web nuevas → guardarlas en `Laboratorio web/` + añadirlas a su nota-índice.
