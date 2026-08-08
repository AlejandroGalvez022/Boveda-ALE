---
name: web-calma-preview
description: Proyecto prioritario de la psicóloga (Web Calma + chatbot Aura) recuperado del Design de Claude
metadata: 
  node_type: memory
  type: project
  originSessionId: a38d008c-192b-4c01-8820-2faaa5ce4909
  modified: 2026-07-18T22:19:04.222Z
---

**Prioridad actual de Alejandro.** Proyecto personal: web para una psicóloga llamada **"Web Calma"** + chatbot de IA **"Aura"**. Recuperado del apartado **Design de Claude** (formato *Design Components* `.dc.html`) desde la exportación, reconstruido en `C:\Users\galve\Documents\Ale\Chatbot Psicologo\codigo\` (bóveda personal "Ale" → [[boveda-alejandro-personal]]).

- Archivos: `Web Calma.html/.js` (landing), `Chatbot Psicologo.html/.js` (chatbot), `integracion__widget.js`, y `Web Calma - VISTA.html` (vista previa renderizable con datos de ejemplo).
- **Cambio hecho:** paleta verde salvia `#7c9885` → marrón mocha `#8a6d4f` (la clienta pidió marrones/beige clásicos). Verde profundo `#23301f` → `#2f2820`.
- **Limitación clave:** los `.dc.html` NO son web desplegable directa: el chatbot responde vía `window.claude` (motor de Design) y usan plantillas `{{ }}`. Para publicar de verdad hay que **portarlo a web estándar + backend que llame a la API de Claude** (clave en servidor). Datos configurables: therapistName, botName, practiceName, contactEmail, price, accent.
- **PORT HECHO (chatbot):** reconstruí el motor de plantillas Design (sc-if/sc-for/{{}}/style-hover) como intérprete a React real, y generé `Chatbot Aura - VISTA.html` — **un único archivo autónomo (offline, React incrustado)** que corre el chatbot completo y fiel al diseño: onboarding, login, chat, ánimo semanal, diario, historial de conversaciones, calendario de reservas (.ics), respiración, resumen para el psicólogo, perfil. Sin API, usa respuestas demo inteligentes en español (detecta ansiedad/sueño/precio/crisis→024/112). Build en scratchpad: `fw.js` (motor) + `build-chatbot.ps1`. Verificado con Edge headless. Falta: conectar API real y enlazar la landing (Web Calma) a este chatbot por iframe.

Relacionado: [[vault-second-brain]], [[preview-web-changes]].
