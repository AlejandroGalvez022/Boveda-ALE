---
titulo: Precio de chatbot con seguimiento de usuarios
proyecto: Chatbot Psicologo
fuente: claude.ai
fecha: 2026-06-29
mensajes: 20
uuid: 2723db6c-a1b8-416a-8fed-519ae4a147bb
tags: [conversacion, diseno]
---

# Precio de chatbot con seguimiento de usuarios

Proyecto: [[Chatbot Psicologo/Chatbot Psicologo|Chatbot Psicologo]] | Fuente: claude.ai | 2026-06-29 | 20 mensajes

## Conversacion

**Tu** (17:12):

Dime un precio razonable para un chat bot en una web que te haga un seguimiento. Tendra que tener logeo y demas para el seguimiento

---

**Claude** (17:12):

The user is asking about pricing for a website chatbot with features like tracking and login functionality. Since this is in Spanish and they're based in the Canary Islands, I should consider the local freelance market rates for that region rather than global pricing standards.

The scope here is somewhat unclear—"seguimiento" could mean lead follow-up, conversation history tracking, user progress monitoring, or something else entirely. This ambiguity affects pricing significantly, so I'll need to provide a structured framework with ranges based on different complexity levels that reflect what a Spanish web developer or small agency would typically charge.

Breaking this down into components: the chatbot integration itself (€500-1,500), authentication and user accounts (€400-1,000), database and tracking functionality (€800-2,000), an admin panel to view the tracking data (€500-1,500), and design/integration/testing/deployment (€300-800). That puts a custom build somewhere in the €2,500-6,000 range depending on how much is included. Beyond the initial build, there are also recurring costs to consider—LLM API usage if we're using Claude or OpenAI, hosting, and ongoing maintenance.

I should present this to Alejandro with a clear breakdown and price range in Spanish, keeping it straightforward since he prefers direct decisions. I'll need to flag the scope assumptions since pricing really depends on what exactly he's building, and I should definitely call out the recurring API costs upfront since that's a real consideration with any LLM-powered chatbot. I'll skip the web search since freelance pricing is stable knowledge and doesn't need real-time verification. Now I'm structuring the response in Spanish for mobile: a quick framing of the price range, a component breakdown, the total, a note about recurring costs, and a suggested pricing model.Te doy un marco realista para el mercado freelance/agencia en España (Canarias), pero antes una aclaración importante: el precio depende mucho de qué significa "seguimiento". Asumo el escenario más habitual: usuarios que se registran, chatean con el bot, y queda guardado su historial + un panel donde se ve la actividad/progreso de cada usuario. Si "seguimiento" es algo más complejo (CRM, métricas avanzadas, integraciones externas), sube.

**Desglose orientativo (desarrollo a medida):**

- Bot en sí (integración LLM tipo Claude/OpenAI o lógica de reglas): €600–1.500
- Sistema de login/registro (alta, recuperación de contraseña, sesiones): €400–1.000
- Base de datos + lógica de seguimiento (guardar conversaciones, estado/progreso por usuario): €700–1.800
- Panel de administración para ver el seguimiento: €500–1.500
- Diseño, integración en la web, pruebas y despliegue: €300–800

**Total proyecto: ~€2.500–6.000**, según alcance. Para un MVP cerrado y sin florituras, apunta a la franja baja (€2.500–3.500). Si el panel de seguimiento es serio y con filtros/exportación, franja alta.

**Ojo con esto (no lo olvides en el presupuesto):**

Si el bot usa un LLM, hay coste recurrente de API que escala con el uso. No lo absorbas tú: o lo facturas como parte de un mantenimiento mensual, o lo repercutes al cliente. Sumando hosting + mantenimiento + API, un retainer de €50–200/mes es razonable según volumen.

Mi recomendación: **pago único de desarrollo + cuota mensual** (igual que planteabas para lo de la automatización de emails). Te protege del coste de API y te da ingreso recurrente.

¿Te concreto un número cerrado? Dime qué es exactamente el "seguimiento" y si el bot es LLM o reglas, y te clavo una cifra.

---

**Tu** (17:15):

Es un seguimiento de un psicologo, gimnasio o algo asi como si guera un asistente personao

---

**Claude** (17:15):

Alejandro is asking about pricing for a chatbot that tracks follow-ups for a psychologist, gym, or similar professional — essentially a personal assistant tool. I need to be careful here because if this involves psychology, it's handling sensitive health data that falls under GDPR protections.

This isn't a refusal situation, but rather an important practical consideration that affects both pricing and legal obligations. For a psychologist specifically, you're dealing with special category health data under RGPD, which means stricter security requirements, explicit consent, and potentially a data processing agreement.

The complexity here goes beyond a simple Q&A chatbot — it needs persistent user state, scheduled reminders and check-ins, and sophisticated tracking logic. That's what drives the pricing up. Let me give a realistic estimate while flagging the data sensitivity angle, since it materially changes the scope and legal requirements.Vale, eso cambia el cálculo — un asistente de seguimiento personalizado es más complejo que un bot de preguntas/respuestas, porque tiene que mantener un estado por usuario en el tiempo (check-ins periódicos, recordatorios, progreso, historial) y muchas veces ser **proactivo** (mensajes programados: "¿cómo te has sentido hoy?", "¿hiciste la rutina?").

**Aviso importante antes del precio (afecta a la cifra):**

Si es para un **psicólogo**, estás tratando datos de salud mental = categoría especial de datos bajo el RGPD. Eso implica consentimiento explícito, cifrado, contrato de encargado de tratamiento, y más responsabilidad legal/técnica. No es un detalle menor: súbelo al presupuesto y déjalo por escrito que el cliente es el responsable del tratamiento. Para un gimnasio el riesgo es menor, pero sigue habiendo datos personales.

**Desglose para un asistente de seguimiento (a medida):**

- Login/registro + gestión de usuarios y roles: €500–1.200
- Motor del asistente (LLM con memoria del usuario, contexto persistente): €1.000–2.500
- Lógica de seguimiento (estados, hitos, progreso por usuario): €1.000–2.500
- Mensajería proactiva (recordatorios, check-ins programados): €500–1.500
- Panel para el profesional (ver a sus clientes, notas, evolución): €800–2.000
- Diseño, integración, pruebas, despliegue + capa RGPD: €500–1.500

**Total: ~€4.500–11.000.** MVP acotado (un solo profesional, seguimiento básico, sin proactividad compleja): franja baja, €4.500–6.000. Plataforma multi-profesional con panel serio: franja alta o más.

**Recurrente (esto es clave aquí):** coste de API del LLM + hosting + mantenimiento → retainer **€100–400/mes** según número de usuarios activos, porque la memoria persistente y los check-ins consumen tokens constantemente.

Mi consejo: empieza por un nicho (solo gimnasio **o** solo psicólogo, no ambos), porque el seguimiento de uno y otro es muy distinto y mezclarlo te dispara el alcance. ¿Para cuál de los dos lo planteas? Con eso te afino la cifra y te digo qué recortar para un MVP vendible.

---

**Tu** (17:16):

Si algo asi… es tam caro?

---

**Claude** (17:16):

Voy a ser honesto sobre por qué el precio es lo que es, pero también le muestro opciones más económicas para que vea que hay alternativas.No, no es caro **para lo que es** — pero sí suena caro si lo comparas con "un chatbot". El salto de precio no es por el chat, es por todo lo de alrededor: usuarios, datos guardados, panel, recordatorios y la parte legal. Eso es básicamente una pequeña aplicación, no un bot.

Dicho esto, esos números son para **desarrollo a medida desde cero**. Hay formas de bajarlo mucho:

**Opción barata de verdad — montar sobre herramientas que ya existen.** En vez de programar login, base de datos y panel a mano, usas algo tipo Supabase o Firebase (auth + base de datos casi gratis), el LLM por API, y los recordatorios con n8n (que ya controlas) o cron. Te ahorras justo las partes caras del desglose. Un MVP así, tú mismo, puede quedarse en **€1.500–3.000** de trabajo, porque reutilizas en lugar de construir.

**Opción aún más barata — ni desarrollo.** Hay plataformas no-code de chatbots con seguimiento (Voiceflow, Chatbase, ManyChat para WhatsApp…) donde el cliente paga una suscripción mensual y tú solo configuras. Trabajo tuyo: unos cientos de euros de setup. Limitación: menos control y los datos viven en un tercero (problema serio si es psicólogo, ahí cuidado con el RGPD).

La pregunta clave es **quién paga la cuenta a fin de mes**. Hagas lo que hagas, el LLM y el hosting cuestan cada mes. Si el cliente espera pagar una vez y olvidarse, el modelo no le cuadra; si entiende que es un servicio mensual, entonces hasta el desarrollo a medida le sale rentable.

¿Quieres que te plantee el MVP más barato posible montado sobre Supabase + n8n, para ti como implementador? Te digo qué piezas usar y dónde está el trabajo real.

---

**Tu** (17:19):

En herramienttas usadas cuanto seria??

---

**Claude** (17:19):

Voy a darle números concretos sobre los costos de herramientas no-code/low-code y el trabajo de setup que cobraría, basándome en el mercado freelance español.Te separo las dos cosas que se mezclan siempre: lo que **cobras tú por montarlo** y lo que **cuesta mantenerlo cada mes** (esto último lo paga el cliente o lo repercutes).

**Lo que cobras tú por el setup (trabajo de una vez):**

- No-code puro (Voiceflow/Chatbase + Zapier o ManyChat): configurar, conectar, personalizar flujos, dejarlo funcionando → **€600–1.500**
- Low-code montado por ti (Supabase auth+BD + LLM por API + n8n para recordatorios + un panel simple): más curro pero mucho más control → **€1.500–3.500**

Para un MVP de un solo profesional, en la franja media de cualquiera de las dos te plantas en algo vendible.

**Lo que cuesta cada mes (recurrente, no lo absorbas tú):**

- Suscripciones de las plataformas no-code: Chatbase/Voiceflow ~€20–80/mes según plan, ManyChat ~€15–60/mes
- Supabase: gratis al principio, ~€25/mes cuando crezca
- API del LLM: lo variable de verdad. Con pocos usuarios y check-ins, calcula €10–50/mes; con memoria persistente y muchos activos, sube rápido
- Hosting del panel (si lo montas): Netlify/Vercel gratis o casi

**Total recurrente realista: €40–150/mes** según volumen y plataforma.

Mi recomendación para ti, viendo lo que ya manejas: **Supabase + n8n + LLM por API**. n8n ya lo controlas, Supabase te quita de encima login y base de datos casi gratis, y mantienes los datos bajo tu control (importante si acaba siendo el psicólogo). Es la opción que mejor relación esfuerzo/control/precio te da.

Modelo de cobro: **setup €1.500–2.500 + retainer €80–150/mes** (que cubre hosting, API y mantenimiento, con margen para ti).

¿Te desgloso el montaje concreto en Supabase + n8n — qué tablas, qué flujos y dónde entra el LLM — para que veas el trabajo real antes de dar precio al cliente?

---

**Tu** (17:20):

No pero dine cuanto me curdts a mi mensualmente montar eso

---

**Claude** (17:20):

Ah, vale — me preguntas cuánto te cuesta **a ti** cada mes tener eso montado y funcionando, antes de cobrar nada al cliente. O sea, tu gasto real de bolsillo.

Para un MVP de un profesional con pocos usuarios:

- **Supabase:** €0 (el plan gratis te sobra al principio — auth + base de datos)
- **n8n:** €0 si lo corres tú en tu Raspberry Pi (que ya tienes) o self-hosted; si usas n8n cloud, ~€20/mes
- **API del LLM:** lo único que de verdad consume. Con pocos usuarios y check-ins ligeros, **€5–20/mes** realista
- **Hosting del panel/web:** €0 en Netlify o Vercel plan gratis

**Total tuyo: prácticamente €0–25/mes** mientras esté pequeño, tirando de Raspberry + planes gratis.

Por eso el modelo cierra tan bien: si le cobras al cliente un retainer de €80–150/mes y a ti te cuesta €20, el resto es margen tuyo. Y solo empiezas a pagar de verdad cuando crece el uso — momento en el que ya estás facturando más.

El único que escala con los usuarios es la API del LLM. Si quieres, te calculo el coste por usuario activo según cuántos mensajes/check-ins al mes, y así sabes a partir de cuántos clientes te conviene subir el retainer.

---

**Tu** (17:26):

Los últimos mensajes es lo q voy a hacer

---

**Claude** (17:27):

Looking at Paula's brainstorming list, I can see several app ideas she's considering — a before-and-after smile filter using AI, an AI psychologist chatbot that evaluates worry levels and brings up topics, a restaurant management tool for tracking table occupancy in real-time, and restaurant menu filters. Now Alejandro is responding to these ideas.

He's saying the last messages are what he's going to build — specifically the AI psychologist chat concept where users rate their concern on a 1-10 scale and the psychologist then addresses those themes in their actual session. So the AI handles the between-session check-in and feeds the data to the human psychologist. This clarifies the product and also makes the GDPR concern around mental health data more concrete and important to address.

I should respond conversationally in Spanish since this is a casual chat, keeping it brief for the mobile format. Now that the concept is clear, I can give useful feedback on the idea and connect it back to the pricing discussion.Vale, ahora lo veo claro — es justo el de la **IA psicóloga**: el usuario chatea, puntúa su preocupación del 1 al 10, y la psicóloga humana es la que luego "saca el tema" en consulta. Eso me cambia un par de cosas respecto a lo que hablábamos, y para bien:

**Lo bueno de este enfoque:** la IA NO hace de terapeuta autónoma. Hace check-in entre sesiones, registra el estado y le pasa una señal a la psicóloga. Eso baja muchísimo el riesgo y la complejidad — el LLM no tiene que "tratar" a nadie, solo conversar ligero, sacar la puntuación y marcar lo que destaque. Mantienes humano en el bucle, que es lo correcto legal y éticamente.

**Por dónde se simplifica:** el motor no necesita memoria pesada ni razonamiento complejo. Es chat + extraer un número + guardar + avisar a la psicóloga si la puntuación es alta. Eso es perfecto para tu stack: Supabase guarda usuario + conversaciones + puntuaciones, n8n dispara el aviso a la psicóloga, el LLM solo conduce la charla. Coste de API muy bajo.

**Donde NO te relajes — esto es serio:** son datos de salud mental, categoría especial RGPD. Necesitas consentimiento explícito, cifrado, y dejar por escrito que la psicóloga es la responsable del tratamiento, tú el encargado. Y un aviso clarísimo al usuario de que esto **no es una urgencia** — si alguien mete un 10 con señales graves, tiene que haber un mensaje de "contacta con tu profesional / 024" y no dejarlo en manos del bot. Esto no es opcional, es lo que te protege a ti si algo sale mal.

**Precio:** sigue encajando lo que dijimos. Setup **€1.500–2.500**, recurrente tuyo casi €0 (Supabase gratis + n8n en tu Raspberry + API baratísima con este uso ligero). El panel de la psicóloga para ver puntuaciones y evolución es lo que más curro te lleva.

¿Es un proyecto vuestro (tú, Paula y Raúl) o para venderlo a una psicóloga real? Según eso te digo si montar el MVP mínimo para validar o ir directo a la capa RGPD bien hecha.

---

**Tu** (17:27):

Todo eso en cuanto a dinero? Es para clientes dsitintos cada mensaje

---

**Claude** (17:28):

¿Me he perdido algo? Tengo que asegurarme de entender bien antes de darte cifras, porque "para clientes distintos cada mensaje" se puede leer de dos formas y el precio cambia mucho:

¿Te refieres a que la **misma plataforma** la vas a vender a varias psicólogas distintas (cada una con sus pacientes), o a que cada uno de esos mensajes/funciones de la captura (la IA psicóloga, lo del restaurante con concurrencia, los filtros de carta) son **proyectos diferentes para clientes diferentes**?

Lo pregunto porque en la imagen hay como tres ideas distintas mezcladas: la IA psicóloga, algo de restaurantes con ocupación de mesas, y filtros de carta. Si todo eso lo vas a montar para clientes separados, son presupuestos independientes y te los desgloso uno a uno.

Y la otra lectura: si es la IA psicóloga vendida a **varias psicólogas a la vez** (multi-cliente), eso es una plataforma multi-inquilino, que cuesta más de montar que la versión de una sola, pero luego la revendes muchas veces — ahí el modelo de negocio cambia y te conviene pensar en precio por psicóloga/mes, no en proyecto único.

Dime cuál de las dos es y te doy números cerrados. ¿Cuál de los dos escenarios es?

---

**Tu** (17:28):

En la captura. Todos los ultimos 4 mendajes son proyectos para dsitintos clientes

---

**Claude** (17:28):

¡Ah, perfecto! Entonces son 4 proyectos independientes, cada uno para un cliente distinto. Te los desgloso uno a uno. Aviso: en la captura hay info muy escueta, así que voy con supuestos razonables y te marco dónde puede variar.

**1. IA psicóloga (chat + autoevaluación 1-10 + la psicóloga saca tema)**
Es el que más hemos hablado. Chat ligero, guardar puntuaciones, panel para la psicóloga, avisos. Lo complejo aquí es la capa RGPD (datos de salud mental).
→ Setup **€1.500–2.500** · recurrente tuyo casi €0 · al cliente retainer €80–150/mes

**2. "Sonrisa antes y después IA"**
Esto huele a app de estética/dental: subes foto antes, la IA simula/muestra el después. OJO: si es generación real de imagen del resultado, es bastante más caro y delicado (modelos de imagen, expectativas del paciente). Si es solo mostrar comparativa de casos reales, es barato.
→ Si es comparativa simple: **€800–1.500**. Si es simulación IA de verdad: **€3.000–6.000+**. Necesito que me aclares cuál.

**3. Restaurante: concurrencia media + mesas ocupadas en el momento**
Esto es un sistema de ocupación en tiempo real. Lo caro no es el software, es **de dónde sacas el dato de las mesas ocupadas**: ¿lo mete el camarero a mano?, ¿se integra con su TPV/sistema de reservas? La integración con un POS existente es lo que dispara el precio.
→ Si es entrada manual o reservas propias: **€1.500–3.000**. Si hay integración con TPV de terceros: **€3.000–6.000+** según el sistema.

**4. Filtros en la carta de restaurantes**
Carta digital con filtros (alérgenos, vegano, sin gluten, precio…). El más sencillo de los cuatro, salvo que quieran gestión de carta por el dueño y multi-restaurante.
→ Carta filtrable de un restaurante: **€600–1.200**. Con panel de autogestión del menú: **€1.500–2.500**

**Resumen rápido (franja realista de cada uno):**

- IA psicóloga: €1.500–2.500
- Sonrisa IA: €800 o €3.000+ (depende)
- Concurrencia restaurante: €1.500–3.000+ (depende de integración)
- Filtros carta: €600–1.200

Lo que de verdad mueve la aguja en los proyectos 2 y 3 es una pregunta cada uno: la sonrisa, ¿genera el "después" con IA o solo enseña casos? Y el de mesas, ¿de dónde sale el dato de ocupación? Contéstame esas dos y te cierro los números de esos dos, que los otros dos ya los tienes bastante claros.

---

**Tu** (17:28):

En total?

---

**Claude** (17:29):

I'm reviewing the ranges I outlined earlier.Sumando los cuatro, depende muchísimo de cómo salgan los dos "depende" (sonrisa IA y concurrencia restaurante). Te doy las dos puntas:

**Escenario sencillo** (sonrisa = solo comparativa, restaurante = entrada manual sin integrar TPV):
- IA psicóloga: €1.500
- Sonrisa: €800
- Concurrencia: €1.500
- Filtros carta: €600
→ **~€4.400 en total**

**Escenario completo** (sonrisa = simulación IA real, restaurante = integración con TPV, todo en franja alta):
- IA psicóloga: €2.500
- Sonrisa: €3.000+
- Concurrencia: €3.000+
- Filtros carta: €1.200
→ **~€9.700+ en total**

Así que la horquilla realista es **€4.400–9.700**, tirando a la parte alta si los proyectos 2 y 3 llevan IA de imagen e integración de TPV de verdad.

Y no olvides lo recurrente: cada proyecto que use LLM o hosting te genera un retainer mensual aparte. Si cierras los cuatro con cuota, ahí tienes un ingreso fijo bastante majo además del setup.

Pero ojo, esto son cifras de proyecto. Si los cuatro son de la misma conversación de colegas (Paula, Raúl), igual no es para clientes que pagan sino ideas que estáis barajando — si es así, dímelo y cambiamos el chip de "presupuesto" a "cuál monto primero como MVP para validar". ¿Son encargos reales con cliente que paga, o ideas vuestras todavía?

---

**Tu** (17:43):

Son proyectos. Que hago yo solo, todo lo que es desarrollarlo, diselo y demas marketing y todo eso lo hacen ellos, yo todo lo q tenga que ver con informatica vaya

---

**Claude** (17:43):

Ah, entonces sois un equipo y tú eres el socio técnico — Paula y Raúl llevan diseño/marketing/comercial, tú todo lo que es desarrollo. Eso cambia el enfoque por completo: aquí no estás poniendo precio a un cliente, estás viendo **cuánto vale tu parte dentro del reparto**.

Dos formas de mirarlo, y te conviene tener clara la diferencia:

**Si os repartís por proyecto cerrado.** Las cifras que te di (€4.400–9.700 los cuatro) son el precio de venta al cliente final, no lo tuyo. De ahí sale lo que cobras por desarrollo. Como regla de mercado, en un proyecto web/app el desarrollo suele ser el grueso del coste — fácilmente **50-70% del precio**, porque diseño y marketing, siendo importantes, llevan menos horas que construir la cosa entera. Así que de cada proyecto, la parte técnica (tuya) pesa más que la de ellos. Eso conviene dejarlo hablado **antes**, no al cobrar.

**Si montáis empresa/marca conjunta.** Entonces no es "cuánto cobro por esto" sino "qué porcentaje me llevo de todo". Y ahí tu aviso interno es: tú eres el cuello de botella real. Sin desarrollo no hay producto; el marketing vende algo que tiene que existir primero. Si los tres os repartís a partes iguales (33/33/33) pero tú haces el 60% del trabajo y encima el más difícil de sustituir, a la larga te quema. No digo que tengas que llevarte más, digo que el reparto tiene que reflejar el peso real de cada uno, no la amistad.

Mi consejo práctico, viniendo de alguien que va a cargar con todo lo técnico de cuatro proyectos a la vez: **dejad por escrito quién hace qué y cómo se reparte el dinero, proyecto por proyecto, desde el principio.** No por desconfianza, sino porque cuando entre el primer cobro y tú hayas echado 80 horas y ellos 20, sin un acuerdo previo, ahí empiezan los líos entre amigos. Un documento simple de una página os ahorra el marrón.

¿Cómo lo tenéis pensado — proyecto a proyecto cada uno cobra su parte, o caja común y os repartís? Según eso te ayudo a poner número justo a tu trabajo.

---

Volver a [[Chatbot Psicologo/Chatbot Psicologo|Chatbot Psicologo]]
