const K_USER = 'aura_user_v1';
const K_CONVOS = 'aura_convos_v1';
const K_CURRENT = 'aura_current_v1';
const K_BOOKINGS = 'aura_bookings_v1';
const K_MOODS = 'aura_moods_v1';
const K_JOURNAL = 'aura_journal_v1';
const K_ONB = 'aura_onboarded_v1';
const SLOTS = ['10:00', '11:00', '12:00', '13:00', '16:00', '17:00', '18:00', '19:00'];
const BREATH_STEPS = ['Inhala', 'Mantén', 'Exhala', 'Mantén'];
const POKE_MSGS = ['Aquí estoy, contigo.', 'Respira. No hay prisa.', 'Me alegra verte hoy.', 'Estoy de tu lado.', 'Paso a paso, ¿vale?', 'Cuidarte también es avanzar.', 'Tómate tu tiempo.'];

class Component extends DCLogic {
  constructor(props) {
    super(props);
    const now = new Date();
    this.state = {
      screen: 'onboarding',
      convos: [], currentId: null, typing: false,
      user: null, moods: {}, journal: [], bookings: [],
      showMenu: false, showSignin: false, signinMode: 'signin', pendingEnter: false,
      bkYear: now.getFullYear(), bkMonth: now.getMonth(), bkDateISO: null, bkSlot: null,
      bkConfirmed: false, bkResult: null, bkError: false, loginError: false,
      breathing: false, breathIdx: 0,
      summaryLoading: false, summaryText: '',
      celebrate: false, pokeIdx: -1,
    };
    this.scrollRef = React.createRef();
    this.inputRef = React.createRef();
    this.bkNameRef = React.createRef();
    this.bkPhoneRef = React.createRef();
    this.bkEmailRef = React.createRef();
    this.userNameRef = React.createRef();
    this.userEmailRef = React.createRef();
    this.journalRef = React.createRef();
    this.loginNameRef = React.createRef();
    this.loginEmailRef = React.createRef();
    this._breathTimer = null;
    this._celTimer = null;
  }

  lsGet(k, def) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : def; } catch (e) { return def; } }
  lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  componentDidMount() {
    try { const p = new URLSearchParams(location.search); if (p.has('full')) document.documentElement.classList.add('embed-full'); } catch (e) {}
    const onboarded = this.lsGet(K_ONB, false);
    this.setState({
      user: this.lsGet(K_USER, null), convos: this.lsGet(K_CONVOS, []), currentId: this.lsGet(K_CURRENT, null),
      moods: this.lsGet(K_MOODS, {}), journal: this.lsGet(K_JOURNAL, []), bookings: this.lsGet(K_BOOKINGS, []),
      screen: onboarded ? 'login' : 'onboarding',
    }, () => { if (this.state.screen === 'chat') this.scrollChatToEnd(); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (this.state.screen === 'chat') this.scrollChatToEnd(); });
  }
  componentWillUnmount() { if (this._breathTimer) clearInterval(this._breathTimer); if (this._celTimer) clearTimeout(this._celTimer); }
  scrollChatToEnd() {
    const go = () => { const el = this.scrollRef.current; if (el) el.scrollTop = el.scrollHeight; };
    requestAnimationFrame(() => { go(); requestAnimationFrame(go); });
    setTimeout(go, 60); setTimeout(go, 180); setTimeout(go, 360); setTimeout(go, 650); setTimeout(go, 1000);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.screen === 'chat' &&
        (prevState.convos !== this.state.convos || prevState.typing !== this.state.typing || prevState.screen !== 'chat')) {
      this.scrollChatToEnd();
    }
  }

  colors() {
    const accent = this.props.accent || '#8a6d4f';
    return {
      accent,
      accentDeep: 'color-mix(in oklch, ' + accent + ' 78%, #2f2820)',
      accentLight: 'color-mix(in oklch, ' + accent + ' 68%, #fff)',
      accentSoft: 'color-mix(in oklch, ' + accent + ' 30%, transparent)',
      accentSoft2: 'color-mix(in oklch, ' + accent + ' 15%, transparent)',
    };
  }
  todayISO() { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  isoOf(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  firstName() { const u = this.state.user; return (u && u.name) ? u.name.split(' ')[0] : ''; }

  streak() {
    let d = new Date();
    if (!this.state.moods[this.isoOf(d)]) d.setDate(d.getDate() - 1);
    let n = 0;
    while (this.state.moods[this.isoOf(d)]) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }

  greeting() {
    const name = this.props.botName || 'Aura';
    const fn = this.firstName();
    return (fn ? ('Hola ' + fn) : 'Hola') + ', soy ' + name + ' 🌿 Me alegra que estés aquí. Cuéntame, ¿cómo te encuentras hoy? No hay prisa.';
  }
  currentConvo() { return this.state.convos.find(c => c.id === this.state.currentId) || null; }
  mkTitle(msg) { return msg.length > 32 ? msg.slice(0, 32) + '…' : msg; }

  persona() {
    const name = this.props.botName || 'Aura';
    const practice = this.props.practiceName || 'Calma';
    const price = this.props.price || '55';
    const u = this.state.user;
    return [
      'Eres "' + name + '", un asistente conversacional de IA (con forma de pequeño compañero) de la consulta de psicología "' + practice + '".',
      u && u.name ? ('La persona con la que hablas se llama ' + u.name + '. Puedes dirigirte a ella por su nombre con naturalidad.') : '',
      'Tu tono es cálido, cercano y humano, en español de España. Hablas de tú, con frases breves (2-4 oraciones), sin jerga clínica ni listas largas. Validas lo que la persona siente antes de sugerir nada. Haces una pregunta abierta a la vez.',
      'Tus funciones: (1) acompañamiento emocional; (2) un primer cribado suave preguntando con delicadeza por cómo se siente, desde cuándo y con qué intensidad, SIN diagnosticar; (3) información de la consulta.',
      'Datos de la consulta: sesión individual ' + price + '€; primera toma de contacto gratuita de 20 min; online y presencial; lunes a viernes 9:00-20:00. Para reservar, invita a pulsar "Pedir cita".',
      'Cuando le vendría bien una sesión, ofrécelo con suavidad.',
      'SEGURIDAD: ante crisis, ideas de autolesión/suicidio o riesgo, responde con calma y cercanía, anima a contactar ya con un profesional o alguien de confianza, y facilita 024 y 112. No minimices.',
      'Recuerda con naturalidad, solo si es relevante, que eres una IA y no sustituyes la terapia profesional.'
    ].filter(Boolean).join(' ');
  }
  demoReply(text) {
    const t = (text || '').toLowerCase();
    const has = (...ks) => ks.some(k => t.includes(k));
    if (has('suicid', 'morir', 'no quiero vivir', 'hacerme daño', 'matarme', 'desaparecer')) return 'Gracias por confiarme algo tan difícil. No estás solo/a en esto y tu vida importa. Por favor, contacta ahora mismo con el 024 o el 112, y si puedes, avisa a alguien de confianza para que te acompañe.';
    if (has('ansie', 'nervios', 'agobi', 'estres', 'estrés', 'angustia', 'panico', 'pánico')) return 'Siento que te encuentres así, la ansiedad agota mucho. Estoy aquí para escucharte. ¿Desde cuándo lo notas y hay algún momento del día en que se hace más fuerte?';
    if (has('dorm', 'sueño', 'sueno', 'insomnio', 'descans')) return 'Dormir mal lo desgasta todo, lo siento. ¿Te cuesta más conciliar el sueño o te despiertas durante la noche?';
    if (has('precio', 'cuesta', 'cuánto', 'cuanto', 'tarifa', 'pago', 'cita', 'reserv', 'agend', 'sesión', 'sesion', 'hora')) { const price = this.props.price || '55'; return 'Una sesión individual cuesta ' + price + '€, y puedes empezar con una primera toma de contacto gratuita de 20 min, sin compromiso. Pulsa "Pedir cita" arriba y te reservo un hueco.'; }
    if (has('triste', 'deprimi', 'vacío', 'vacio', 'solo', 'sola', 'llorar', 'desanim')) return 'Gracias por compartirlo, no es fácil ponerlo en palabras. Estoy aquí contigo. ¿Quieres contarme qué crees que ha hecho que te sientas así?';
    if (has('gracias', 'mejor', 'me ayuda')) return 'Me alegra mucho leerte. Estoy aquí siempre que lo necesites. ¿Hay algo más que te ronde la cabeza?';
    if (has('hola', 'buenas', 'hey')) return 'Hola 🌿 Me alegra que te pases por aquí. ¿Cómo estás hoy? Cuéntame lo que quieras, sin prisa.';
    return 'Te escucho. Cuéntame un poco más sobre cómo te hace sentir eso, para entenderte mejor.';
  }

  triggerCelebrate(ms) { this.setState({ celebrate: true }); if (this._celTimer) clearTimeout(this._celTimer); this._celTimer = setTimeout(() => this.setState({ celebrate: false }), ms || 1900); }

  // conversations
  freshConvo() { return { id: 'c' + Date.now(), title: 'Nueva conversación', messages: [{ role: 'bot', text: this.greeting() }], updatedAt: Date.now() }; }
  goChat = () => { this.setState(s => { if (s.currentId && s.convos.find(c => c.id === s.currentId)) return { screen: 'chat', showMenu: false }; const convo = this.freshConvo(); const convos = [convo, ...s.convos]; this.lsSet(K_CONVOS, convos); this.lsSet(K_CURRENT, convo.id); return { screen: 'chat', currentId: convo.id, convos, showMenu: false }; }, () => this.scrollChatToEnd()); };
  newChat = () => { this.setState(s => { const convo = this.freshConvo(); const convos = [convo, ...s.convos]; this.lsSet(K_CONVOS, convos); this.lsSet(K_CURRENT, convo.id); return { convos, currentId: convo.id, screen: 'chat', showMenu: false }; }); };
  openConvo = (id) => { this.lsSet(K_CURRENT, id); this.setState({ currentId: id, screen: 'chat' }, () => this.scrollChatToEnd()); };
  deleteConvo = (id) => { this.setState(s => { const convos = s.convos.filter(c => c.id !== id); this.lsSet(K_CONVOS, convos); let currentId = s.currentId; if (currentId === id) { currentId = null; this.lsSet(K_CURRENT, null); } return { convos, currentId }; }); };

  async send(text) {
    const msg = (text || '').trim();
    if (!msg || this.state.typing) return;
    let id = this.state.currentId; let convos = this.state.convos.slice(); let base;
    if (!id || !convos.find(c => c.id === id)) { const convo = this.freshConvo(); id = convo.id; base = convo.messages; convos = [convo, ...convos]; }
    else base = convos.find(c => c.id === id).messages;
    const history = [...base, { role: 'user', text: msg }];
    convos = convos.map(c => c.id === id ? { ...c, messages: history, title: c.title === 'Nueva conversación' ? this.mkTitle(msg) : c.title, updatedAt: Date.now() } : c);
    this.lsSet(K_CONVOS, convos); this.lsSet(K_CURRENT, id);
    this.setState({ convos, currentId: id, typing: true, screen: 'chat' });
    const finish = (replyText) => { this.setState(s => { const cs = s.convos.map(c => c.id === id ? { ...c, messages: [...c.messages, { role: 'bot', text: replyText }], updatedAt: Date.now() } : c); this.lsSet(K_CONVOS, cs); return { convos: cs, typing: false }; }); };
    const realAI = !!(window.claude && typeof window.claude.complete === 'function');
    if (!realAI) { const reply = this.demoReply(msg); setTimeout(() => finish(reply), 700 + Math.min(reply.length * 14, 1400)); return; }
    const apiMessages = [{ role: 'user', content: this.persona() }, { role: 'assistant', content: 'Entendido. Estoy aquí para acompañar con calidez.' }, ...history.map(m => ({ role: m.role === 'bot' ? 'assistant' : 'user', content: m.text }))];
    try { const reply = await window.claude.complete({ messages: apiMessages }); finish((reply || '').trim() || 'Perdona, me he quedado en blanco. ¿Puedes contármelo de otra forma?'); }
    catch (e) { finish(this.demoReply(msg)); }
  }
  handleSend = () => { const el = this.inputRef.current; if (!el) return; const v = el.value; el.value = ''; el.style.height = 'auto'; this.send(v); };
  onInputKey = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this.handleSend(); } else { const el = e.target; requestAnimationFrame(() => { el.style.height = 'auto'; el.style.height = Math.min(el.scrollHeight, 110) + 'px'; }); } };

  // nav
  goHome = () => this.setState({ screen: 'home', showMenu: false });
  goCalma = () => this.setState({ screen: 'calma' });
  goPerfil = () => this.setState({ screen: 'perfil', showMenu: false });
  goHistory = () => this.setState({ screen: 'history', showMenu: false });
  goJournal = () => this.setState({ screen: 'journal' });
  goCitas = () => this.setState({ screen: 'citas' });

  // onboarding / signin
  startEntry = () => { this.lsSet(K_ONB, true); if (this.state.user && this.state.user.name) this.setState({ screen: 'chat' }); else this.setState({ screen: 'login', loginError: false }); };
  doLogin = () => {
    const name = (this.loginNameRef.current && this.loginNameRef.current.value || '').trim();
    if (!name) { this.setState({ loginError: true }); return; }
    const email = (this.loginEmailRef.current && this.loginEmailRef.current.value || '').trim();
    const user = { name, email }; this.lsSet(K_USER, user);
    this.setState({ user, screen: 'chat', loginError: false }, () => this.scrollChatToEnd());
  };
  loginGuest = () => this.setState({ screen: 'chat' }, () => this.scrollChatToEnd());
  openProfile = () => this.setState({ showSignin: true, signinMode: 'profile', showMenu: false, pendingEnter: false });
  skipSignin = () => { const go = this.state.pendingEnter; this.setState({ showSignin: false, pendingEnter: false, screen: go ? 'chat' : this.state.screen }); };
  saveUser = () => { const name = (this.userNameRef.current && this.userNameRef.current.value || '').trim(); const email = (this.userEmailRef.current && this.userEmailRef.current.value || '').trim(); const user = { name, email }; this.lsSet(K_USER, user); const go = this.state.pendingEnter; this.setState({ user, showSignin: false, pendingEnter: false, screen: go ? 'chat' : this.state.screen }); };
  openMenu = () => this.setState({ showMenu: true });
  closeSheets = () => this.setState({ showMenu: false, showSignin: false, pendingEnter: false });

  // mascot poke
  pokeMascot = () => { this.setState(s => ({ pokeIdx: (s.pokeIdx + 1) % POKE_MSGS.length })); this.triggerCelebrate(900); };

  // mood
  setMood = (v) => { const iso = this.todayISO(); const first = !this.state.moods[iso]; this.setState(s => { const moods = { ...s.moods, [iso]: v }; this.lsSet(K_MOODS, moods); return { moods }; }); if (first || v >= 4) this.triggerCelebrate(1600); };

  // journal
  addJournal = () => { const el = this.journalRef.current; if (!el) return; const text = el.value.trim(); if (!text) return; el.value = ''; this.setState(s => { const journal = [{ id: 'j' + Date.now(), at: Date.now(), text }, ...s.journal]; this.lsSet(K_JOURNAL, journal); return { journal }; }); this.triggerCelebrate(1600); };
  deleteJournal = (id) => { this.setState(s => { const journal = s.journal.filter(j => j.id !== id); this.lsSet(K_JOURNAL, journal); return { journal }; }); };

  // breathing
  goBreathing = () => this.setState({ screen: 'breathing', breathing: false, breathIdx: 0 });
  toggleBreathing = () => { if (this.state.breathing) { if (this._breathTimer) clearInterval(this._breathTimer); this._breathTimer = null; this.setState({ breathing: false }); } else { this.setState({ breathing: true, breathIdx: 0 }); this._breathTimer = setInterval(() => { this.setState(s => ({ breathIdx: (s.breathIdx + 1) % BREATH_STEPS.length })); }, 4000); } };

  // summary
  goSummary = async () => {
    const conv = this.currentConvo();
    this.setState({ screen: 'summary', showMenu: false, summaryLoading: true, summaryText: '' });
    const msgs = conv ? conv.messages.filter(m => m.role === 'user') : [];
    if (!conv || msgs.length === 0) { this.setState({ summaryLoading: false, summaryText: 'Aún no hay suficiente conversación para resumir. Habla un poco con ' + (this.props.botName || 'Aura') + ' y vuelve a intentarlo.' }); return; }
    const transcript = conv.messages.map(m => (m.role === 'bot' ? (this.props.botName || 'Aura') : 'Persona') + ': ' + m.text).join('\n');
    const realAI = !!(window.claude && typeof window.claude.complete === 'function');
    if (realAI) {
      try { const prompt = 'A partir de esta conversación entre una persona y un asistente de apoyo emocional, redacta un resumen breve y respetuoso en español (máx 120 palabras) que la persona pueda compartir con su psicólogo antes de la sesión. Estructura: 1) Cómo se ha sentido, 2) Temas principales, 3) Qué le gustaría trabajar. No diagnostiques. Escribe en primera persona ("Me he sentido...").\n\nConversación:\n' + transcript; const out = await window.claude.complete(prompt); this.setState({ summaryLoading: false, summaryText: (out || '').trim() || this.demoSummary(conv) }); }
      catch (e) { this.setState({ summaryLoading: false, summaryText: this.demoSummary(conv) }); }
    } else { setTimeout(() => this.setState({ summaryLoading: false, summaryText: this.demoSummary(conv) }), 900); }
  };
  demoSummary(conv) { const topics = conv.messages.filter(m => m.role === 'user').slice(0, 3).map(m => '· ' + this.mkTitle(m.text)).join('\n'); return 'Cómo me he sentido:\nHe hablado sobre cómo me encuentro últimamente y he podido desahogarme.\n\nTemas principales:\n' + topics + '\n\nMe gustaría trabajar:\nEntender mejor lo que me pasa y encontrar herramientas para el día a día.'; }

  // booking
  openBooking = () => this.setState({ screen: 'booking', showMenu: false, bkConfirmed: false, bkError: false });
  closeBooking = () => this.setState({ screen: 'chat', bkConfirmed: false });
  prevMonth = () => this.setState(s => { const now = new Date(); if (s.bkYear === now.getFullYear() && s.bkMonth === now.getMonth()) return {}; let nm = s.bkMonth - 1, ny = s.bkYear; if (nm < 0) { nm = 11; ny -= 1; } return { bkMonth: nm, bkYear: ny }; });
  nextMonth = () => this.setState(s => { let nm = s.bkMonth + 1, ny = s.bkYear; if (nm > 11) { nm = 0; ny += 1; } return { bkMonth: nm, bkYear: ny }; });
  confirmBooking = () => { const name = (this.bkNameRef.current && this.bkNameRef.current.value || '').trim(); const phone = (this.bkPhoneRef.current && this.bkPhoneRef.current.value || '').trim(); const email = (this.bkEmailRef.current && this.bkEmailRef.current.value || '').trim(); if (!name || !phone) { this.setState({ bkError: true }); return; } const iso = this.state.bkDateISO, slot = this.state.bkSlot; const dateLabel = new Date(iso + 'T00:00:00').toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }); const result = { name, phone, email, iso, slot, dateLabel }; this.setState(s => { const bookings = [...s.bookings, { ...result, at: Date.now() }]; this.lsSet(K_BOOKINGS, bookings); return { bkConfirmed: true, bkResult: result, bkError: false, bookings }; }); this.triggerCelebrate(2200); };
  downloadIcs = () => { const b = this.state.bkResult; if (!b) return; const practice = this.props.practiceName || 'Calma'; const dt = b.iso.replace(/-/g, ''); const parts = b.slot.split(':'); const h = parts[0].padStart(2, '0'); const mi = parts[1]; const start = dt + 'T' + h + mi + '00'; const end = dt + 'T' + String(Number(parts[0]) + 1).padStart(2, '0') + mi + '00'; const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//' + practice + '//ES', 'BEGIN:VEVENT', 'UID:' + Date.now() + '@aura', 'DTSTAMP:' + start, 'DTSTART:' + start, 'DTEND:' + end, 'SUMMARY:Cita — ' + practice, 'DESCRIPTION:Primera toma de contacto con ' + practice, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n'); const blob = new Blob([ics], { type: 'text/calendar' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'cita.ics'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1500); };
  bookingText() { const b = this.state.bkResult; if (!b) return ''; const practice = this.props.practiceName || 'Calma'; return 'Hola, me gustaría reservar una cita en ' + practice + '.\n\nNombre: ' + b.name + '\nFecha: ' + b.dateLabel + ' a las ' + b.slot + '\nTeléfono: ' + b.phone + (b.email ? ('\nEmail: ' + b.email) : ''); }
  sendTranscript = () => { const conv = this.currentConvo(); if (!conv) return; const to = this.props.contactEmail || ''; const body = conv.messages.map(m => (m.role === 'bot' ? (this.props.botName || 'Aura') : 'Yo') + ': ' + m.text).join('\n\n'); window.location.href = 'mailto:' + encodeURIComponent(to) + '?subject=' + encodeURIComponent('Conversación con ' + (this.props.botName || 'Aura')) + '&body=' + encodeURIComponent(body); this.setState({ showMenu: false }); };

  buildCalendar() {
    const c = this.colors(); const y = this.state.bkYear, m = this.state.bkMonth; const first = new Date(y, m, 1); const start = (first.getDay() + 6) % 7; const daysInMonth = new Date(y, m + 1, 0).getDate(); const today = new Date(); today.setHours(0, 0, 0, 0); const cells = [];
    for (let i = 0; i < start; i++) cells.push({ key: 'e' + i, label: '', disabled: true, onClick: null, style: { visibility: 'hidden' } });
    for (let d = 1; d <= daysInMonth; d++) { const date = new Date(y, m, d); const dow = date.getDay(); const iso = y + '-' + String(m + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0'); const disabled = date < today || dow === 0 || dow === 6; const selected = this.state.bkDateISO === iso; cells.push({ key: iso, label: String(d), disabled, iso, onClick: disabled ? null : (() => this.setState({ bkDateISO: iso, bkSlot: null, bkError: false })), style: { border: selected ? ('1px solid ' + c.accent) : '1px solid transparent', background: selected ? c.accent : (disabled ? 'transparent' : '#fff'), color: selected ? '#fff' : (disabled ? '#cabfae' : '#2f2820'), fontFamily: 'inherit', fontSize: '14px', fontWeight: selected ? '700' : '500', height: '40px', borderRadius: '11px', cursor: disabled ? 'default' : 'pointer', boxShadow: (!disabled && !selected) ? '0 1px 4px rgba(120,90,50,.05)' : 'none' } }); }
    return cells;
  }
  buildSlots() { const c = this.colors(); return SLOTS.map(s => { const sel = this.state.bkSlot === s; return { label: s, onClick: () => this.setState({ bkSlot: s, bkError: false }), style: { border: sel ? ('1px solid ' + c.accent) : '1px solid #e3d4c2', background: sel ? c.accent : '#fff', color: sel ? '#fff' : '#4f463c', fontFamily: 'inherit', fontSize: '14px', fontWeight: sel ? '700' : '500', padding: '11px 0', borderRadius: '12px', cursor: 'pointer' } }; }); }

  icon(name, size) {
    const h = React.createElement; const s = size || 23;
    const P = (d) => h('svg', { width: s, height: s, viewBox: '0 0 24 24', fill: 'none' }, h('path', { d, stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }));
    switch (name) {
      case 'home': return P('M3 10.5L12 3l9 7.5M5 9.5V20h14V9.5');
      case 'chat': return P('M20 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 20.5l1.9-4.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z');
      case 'wind': return P('M3 8h9a2.5 2.5 0 10-2.5-2.5M3 12h13a2.5 2.5 0 11-2.5 2.5M3 16h7');
      case 'book': return P('M5 4h11a2 2 0 012 2v14H7a2 2 0 01-2-2V4zM5 18h13');
      case 'user': return h('svg', { width: s, height: s, viewBox: '0 0 24 24', fill: 'none' }, h('circle', { cx: 12, cy: 8, r: 3.5, stroke: 'currentColor', strokeWidth: 1.8 }), h('path', { d: 'M5 20c0-3.3 3-5.5 7-5.5s7 2.2 7 5.5', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' }));
      case 'calendar': return h('svg', { width: s, height: s, viewBox: '0 0 24 24', fill: 'none' }, h('rect', { x: 3, y: 5, width: 18, height: 16, rx: 3, stroke: 'currentColor', strokeWidth: 1.8 }), h('path', { d: 'M3 9h18M8 3v4M16 3v4', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' }));
      case 'clock': return h('svg', { width: s, height: s, viewBox: '0 0 24 24', fill: 'none' }, h('circle', { cx: 12, cy: 12, r: 9, stroke: 'currentColor', strokeWidth: 1.8 }), h('path', { d: 'M12 7v5l3.5 2', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }));
      default: return P('M12 3v18');
    }
  }
  moodFaceSvg(v, size) {
    const h = React.createElement; const s = size || 26;
    const eye = (cx) => h('circle', { key: 'e' + cx, cx, cy: 10, r: 1.5, fill: 'currentColor' });
    let mouth;
    if (v <= 2) mouth = h('path', { d: 'M8.5 17c1-1.4 5-1.4 7 0', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', fill: 'none' });
    else if (v === 3) mouth = h('path', { d: 'M9 16h6', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' });
    else mouth = h('path', { d: 'M8.5 15c1 1.7 5 1.7 7 0', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', fill: 'none' });
    return h('svg', { width: s, height: s, viewBox: '0 0 24 24', fill: 'none' }, eye(9), eye(15), mouth);
  }

  // ---- SIMPLE ANIMATED ORB ----
  renderMascot(size, ctx) {
    ctx = ctx || {};
    const h = React.createElement;
    const accent = this.props.accent || '#8a6d4f';
    const light = 'color-mix(in oklch, ' + accent + ' 60%, #ffffff)';
    const celebrate = ctx.celebrate; const guide = ctx.guideActive;
    const px = size + 'px';
    const innerAnim = celebrate ? 'joyBounce .8s ease-in-out' : (guide ? 'none' : 'mascotBreathe 4.5s ease-in-out infinite');
    const orbStyle = { width: px, height: px, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at 34% 28%, ' + light + ', ' + accent + ')', boxShadow: '0 12px 36px ' + accent + '55, inset 0 -6px 16px rgba(0,0,0,.09), inset 0 7px 16px rgba(255,255,255,.28)', animation: innerAnim, transformOrigin: 'center' };
    if (guide) { orbStyle.transform = 'scale(' + (ctx.breathScale || 1) + ')'; orbStyle.transition = 'transform 4s cubic-bezier(.37,0,.24,1), box-shadow 4s ease'; }
    return h('div', { style: { width: px, height: px, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: ctx.noFloat ? 'none' : 'mascotFloat 6s ease-in-out infinite' } },
      h('div', { style: orbStyle },
        h('div', { style: { width: (size * 0.6) + 'px', height: (size * 0.6) + 'px', borderRadius: '50%', background: 'radial-gradient(circle at 40% 35%, rgba(255,255,255,.6), rgba(255,255,255,.1))', animation: guide ? 'none' : 'breatheGlow 4.5s ease-in-out infinite' } })
      )
    );
  }

  renderVals() {
    const c = this.colors();
    const name = this.props.botName || 'Aura';
    const conv = this.currentConvo();
    const messages = conv ? conv.messages : [];
    const screen = this.state.screen;
    const todayMood = this.state.moods[this.todayISO()];
    const cel = this.state.celebrate;

    const bubbles = messages.map(m => { const user = m.role === 'user'; return { text: m.text, rowStyle: { display: 'flex', justifyContent: user ? 'flex-end' : 'flex-start' }, bubbleStyle: { maxWidth: '80%', padding: '11px 15px', fontSize: '15px', lineHeight: '1.45', whiteSpace: 'pre-wrap', animation: 'msgIn .28s ease both', background: user ? c.accent : '#ffffff', color: user ? '#fff' : '#36302a', border: user ? 'none' : '1px solid #ece0d2', borderRadius: user ? '18px 18px 5px 18px' : '18px 18px 18px 5px', boxShadow: user ? ('0 4px 12px ' + c.accentSoft) : '0 2px 8px rgba(120,90,50,.05)' } }; });
    const mk = (label, text) => ({ label, onClick: () => this.send(text) });
    const quickReplies = [mk('Me siento ansioso/a', 'Últimamente me siento muy ansioso y no sé bien por qué.'), mk('Solo necesito hablar', 'Hoy solo necesito hablar un rato, desahogarme.'), mk('¿Cuánto cuesta una sesión?', '¿Cuánto cuesta una sesión y cómo pido cita?')];

    const moodFaces = [1, 2, 3, 4, 5].map(v => {
      const labels = { 1: 'Muy mal', 2: 'Mal', 3: 'Regular', 4: 'Bien', 5: 'Genial' };
      const active = todayMood === v;
      return { label: labels[v], face: this.moodFaceSvg(v, 26), onClick: () => this.setMood(v),
        style: { width: '48px', height: '48px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: active ? ('1.5px solid ' + c.accent) : '1.5px solid transparent', background: active ? c.accentSoft2 : 'rgba(255,255,255,.6)', color: active ? c.accentDeep : '#a89a88', cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s', transform: active ? 'scale(1.08)' : 'scale(1)' } };
    });
    const moodWeekArr = [];
    for (let i = 6; i >= 0; i--) { const d = new Date(); d.setDate(d.getDate() - i); const iso = this.isoOf(d); const v = this.state.moods[iso]; const wd = ['D', 'L', 'M', 'X', 'J', 'V', 'S'][d.getDay()]; const isToday = i === 0; moodWeekArr.push({ label: wd, labelColor: isToday ? c.accentDeep : '#b3a493', barStyle: { width: '100%', maxWidth: '20px', height: v ? (18 + (v / 5) * 42) + 'px' : '6px', borderRadius: '6px', background: v ? c.accent : '#e7dccd', opacity: v ? (0.45 + (v / 5) * 0.55) : 1, transition: 'height .3s' } }); }
    const hasMoodData = Object.keys(this.state.moods).length > 0;

    const audioResources = [{ title: 'Meditación para dormir', meta: '12 min · relajación' }, { title: 'Escaneo corporal', meta: '8 min · atención plena' }, { title: 'Calmar la mente acelerada', meta: '6 min · ansiedad' }];
    const readResources = [{ title: 'Qué es la ansiedad y por qué aparece', desc: 'Entender lo que sientes es el primer paso para manejarlo.', meta: '4 min de lectura' }, { title: '3 formas de cuidar tu descanso', desc: 'Pequeños hábitos que mejoran tu sueño desde esta noche.', meta: '3 min de lectura' }, { title: 'Cómo aprovechar tu primera sesión', desc: 'Ideas para llegar preparado/a y sin nervios a terapia.', meta: '5 min de lectura' }];

    const journalList = this.state.journal.map(j => ({ text: j.text, date: new Date(j.at).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }), onDelete: () => this.deleteJournal(j.id) }));
    const convoList = this.state.convos.slice().sort((a, b) => b.updatedAt - a.updatedAt).map(cv => { const meta = new Date(cv.updatedAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }) + ' · ' + cv.messages.filter(m => m.role === 'user').length + ' mensajes'; return { title: cv.title, meta, onOpen: () => this.openConvo(cv.id), onDelete: () => this.deleteConvo(cv.id) }; });
    const citasSorted = this.state.bookings.slice().sort((a, b) => (a.iso < b.iso ? -1 : 1));
    const citasList = citasSorted.map(bk => { const d = new Date(bk.iso + 'T00:00:00'); return { day: String(d.getDate()), mon: d.toLocaleDateString('es-ES', { month: 'short' }).replace('.', ''), dateLabel: bk.dateLabel.charAt(0).toUpperCase() + bk.dateLabel.slice(1), slot: bk.slot, name: bk.name }; });

    const profileStats = [{ value: String(Object.keys(this.state.moods).length), label: 'días de ánimo' }, { value: String(this.state.convos.length), label: 'conversaciones' }, { value: String(this.state.journal.length), label: 'notas' }];
    const profileMenu = [{ icon: this.icon('clock', 20), label: 'Mis conversaciones', onClick: this.goHistory }, { icon: this.icon('calendar', 20), label: 'Mis citas', onClick: this.goCitas }, { icon: this.icon('wind', 20), label: 'Recursos y calma', onClick: this.goCalma }];
    const menuItems = [{ icon: '✏️', label: 'Nueva conversación', onClick: this.newChat }, { icon: '📝', label: 'Resumen para mi psicólogo', onClick: this.goSummary }, { icon: '✉️', label: 'Enviar esta conversación', onClick: this.sendTranscript }];

    const tabDef = [{ id: 'chat', label: 'Hablar', icon: 'chat', onClick: this.goChat }, { id: 'journal', label: 'Diario', icon: 'book', onClick: this.goJournal }, { id: 'perfil', label: 'Perfil', icon: 'user', onClick: this.goPerfil }];
    const activeTab = (screen === 'breathing') ? 'journal' : (screen === 'calma' ? 'perfil' : screen);
    const tabs = tabDef.map(t => { const active = activeTab === t.id; return { label: t.label, onClick: t.onClick, icon: this.icon(t.icon, 23), sideIcon: this.icon(t.icon, 21),
      btnStyle: { flex: 1, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', padding: '4px', color: active ? c.accentDeep : '#b0a291', transform: active ? 'translateY(-3px) scale(1.08)' : 'none', transition: 'transform .28s cubic-bezier(.2,.9,.3,1.3), color .2s' },
      sideStyle: { width: '100%', display: 'flex', alignItems: 'center', gap: '13px', border: 'none', cursor: 'pointer', padding: '13px 15px', borderRadius: '15px', fontFamily: 'inherit', fontSize: '15px', fontWeight: active ? '600' : '500', textAlign: 'left', color: active ? c.accentDeep : '#6f6356', background: active ? c.accentSoft2 : 'transparent', transition: 'background .2s, color .2s' } }; });

    const monthLabel = new Date(this.state.bkYear, this.state.bkMonth, 1).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
    const b = this.state.bkResult;
    const summaryDateLabel = this.state.bkDateISO && this.state.bkSlot ? (new Date(this.state.bkDateISO + 'T00:00:00').toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }) + ' · ' + this.state.bkSlot) : '';
    const waDigits = (this.props.whatsappNumber || '').replace(/[^0-9]/g, '');
    const bText = this.bookingText();
    const waHref = b ? ('https://wa.me/' + waDigits + '?text=' + encodeURIComponent(bText)) : '#';
    const mailHref = b ? ('mailto:' + encodeURIComponent(this.props.contactEmail || '') + '?subject=' + encodeURIComponent('Nueva solicitud de cita — ' + b.name) + '&body=' + encodeURIComponent(bText)) : '#';
    const confirmSummary = b ? (b.dateLabel.charAt(0).toUpperCase() + b.dateLabel.slice(1) + ' a las ' + b.slot + '.') : '';

    const sText = this.state.summaryText;
    const summaryWaHref = 'https://wa.me/' + waDigits + '?text=' + encodeURIComponent('Hola, este es mi resumen antes de la sesión:\n\n' + sText);
    const summaryMailHref = 'mailto:' + encodeURIComponent(this.props.contactEmail || '') + '?subject=' + encodeURIComponent('Resumen antes de mi sesión') + '&body=' + encodeURIComponent(sText);

    const u = this.state.user;
    const profile = this.state.signinMode === 'profile';
    const breathLabels = { 'Inhala': 'Toma aire despacio por la nariz', 'Mantén': 'Sostén el aire con suavidad', 'Exhala': 'Suelta el aire lentamente por la boca' };
    const breathPhase = this.state.breathing ? BREATH_STEPS[this.state.breathIdx] : 'Respira';

    // mascot message
    let mascotMsg;
    if (this.state.pokeIdx >= 0) mascotMsg = POKE_MSGS[this.state.pokeIdx];
    else if (cel) mascotMsg = '¡Bien hecho! 🌿';
    else if (todayMood >= 4) mascotMsg = 'Me alegra verte así de bien.';
    else if (todayMood && todayMood <= 2) mascotMsg = 'Aquí estoy, a tu ritmo.';
    else if (todayMood === 3) mascotMsg = 'Tranquilo/a, un paso cada vez.';
    else mascotMsg = 'Hola, ¿cómo te encuentras hoy?';

    const streakN = this.streak();

    return {
      ...c,
      practiceName: this.props.practiceName || 'Calma', practiceShort: this.props.practiceName || 'Calma',
      botName: name,
      price: this.props.price || '55',

      showOnboarding: screen === 'onboarding', showLogin: screen === 'login', showHome: screen === 'home', showChat: screen === 'chat',
      loginTitle: (this.state.user && this.state.user.name) ? ('Hola de nuevo, ' + this.state.user.name.split(' ')[0]) : ('Bienvenido/a a ' + (this.props.practiceName || 'Calma')),
      loginError: this.state.loginError,
      loginPrefillName: (this.state.user && this.state.user.name) || '',
      loginPrefillEmail: (this.state.user && this.state.user.email) || '',
      mascotLogin: this.renderMascot(76, { noShadow: true }),
      loginNameRef: this.loginNameRef, loginEmailRef: this.loginEmailRef,
      doLogin: this.doLogin, loginGuest: this.loginGuest,
      showCalma: screen === 'calma', showPerfil: screen === 'perfil', showBreathing: screen === 'breathing',
      showJournal: screen === 'journal', showHistory: screen === 'history', showCitas: screen === 'citas',
      showSummary: screen === 'summary', showBooking: screen === 'booking',
      showTabs: (screen === 'chat' || screen === 'journal' || screen === 'perfil' || screen === 'calma'),
      showSafetyBanner: this.props.showSafetyBanner === true,

      // mascots
      mascotHome: this.renderMascot(186, { mood: todayMood, celebrate: cel }),
      mascotOnb: this.renderMascot(150, {}),
      mascotChat: this.renderMascot(40, { mood: todayMood, noFloat: true, noShadow: true }),
      mascotMini: this.renderMascot(60, { noFloat: true, noShadow: true }),
      mascotGuideEl: this.renderMascot(150, { guideActive: this.state.breathing, breathScale: (!this.state.breathing ? 1 : ((this.state.breathIdx === 0 || this.state.breathIdx === 1) ? 1.16 : 0.6)), noFloat: true, noShadow: true }),
      mascotProfile: this.renderMascot(60, { mood: todayMood, noFloat: true, noShadow: true }),
      mascotSignin: this.renderMascot(90, { noShadow: true }),
      mascotCelebrate: this.renderMascot(120, { celebrate: true, noFloat: true, noShadow: true }),

      todayLabel: new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }).replace(/^\w/, ch => ch.toUpperCase()),
      homeGreeting: this.firstName() ? ('Hola, ' + this.firstName()) : 'Hola',
      mascotMsg,
      moodQuestion: todayMood ? '¿Sigue igual tu día?' : '¿Cómo te sientes hoy?',
      moodFaces, moodWeek: moodWeekArr, hasMoodData,
      hasStreak: streakN >= 2, streakLabel: streakN + ' días seguidos',

      bubbles, isTyping: this.state.typing, showQuickReplies: messages.length <= 1 && !this.state.typing, quickReplies,
      audioResources, readResources,
      journalList, noJournal: this.state.journal.length === 0,
      convoList, noHistory: this.state.convos.length === 0,
      citasList, noCitas: this.state.bookings.length === 0,
      userDisplayName: (u && u.name) ? u.name : 'Invitado/a', userEmailDisplay: (u && u.email) ? u.email : 'Sin correo guardado',
      userInitial: (u && u.name) ? u.name.trim().charAt(0).toUpperCase() : '·',
      profileStats, profileMenu,

      breathPhase, breathHint: this.state.breathing ? (breathLabels[breathPhase] || 'Sigue el ritmo de ' + name) : 'Sigue a ' + name + ': crece al inhalar, se calma al exhalar. 4 segundos cada fase.',
      breathBtnLabel: this.state.breathing ? 'Terminar' : 'Empezar',
      breathGlowStyle: { position: 'absolute', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(255,255,255,.4)', filter: 'blur(24px)', animation: this.state.breathing ? 'breatheGlow 16s ease-in-out infinite' : 'none', opacity: 0.35 },

      summaryLoading: this.state.summaryLoading, summaryReady: !this.state.summaryLoading && !!sText, summaryText: sText, summaryWaHref, summaryMailHref,

      weekdayLabels: ['L', 'M', 'X', 'J', 'V', 'S', 'D'], monthLabel,
      calendarCells: this.buildCalendar(), slotCells: this.buildSlots(),
      dateChosen: !!this.state.bkDateISO, slotChosen: !!this.state.bkSlot,
      bookingNotConfirmed: !this.state.bkConfirmed, bookingConfirmed: this.state.bkConfirmed, bookingError: this.state.bkError,
      summaryDateLabel, confirmSummary, waHref, mailHref,

      anySheet: this.state.showMenu || this.state.showSignin, showMenu: this.state.showMenu, showSignin: this.state.showSignin,
      menuItems, tabs,
      signinTitle: profile ? 'Mi perfil' : 'Encantada de conocerte', signinCta: profile ? 'Guardar' : 'Continuar', skipLabel: profile ? 'Cerrar' : 'Ahora no, gracias',

      scrollRef: this.scrollRef, inputRef: this.inputRef, bkNameRef: this.bkNameRef, bkPhoneRef: this.bkPhoneRef, bkEmailRef: this.bkEmailRef, userNameRef: this.userNameRef, userEmailRef: this.userEmailRef, journalRef: this.journalRef,

      handleSend: this.handleSend, onInputKey: this.onInputKey, startEntry: this.startEntry, pokeMascot: this.pokeMascot,
      goHome: this.goHome, goChat: this.goChat, goCalma: this.goCalma, goPerfil: this.goPerfil,
      goBreathing: this.goBreathing, goJournal: this.goJournal, goHistory: this.goHistory, goCitas: this.goCitas,
      toggleBreathing: this.toggleBreathing, addJournal: this.addJournal, goSummary: this.goSummary,
      openBooking: this.openBooking, closeBooking: this.closeBooking, prevMonth: this.prevMonth, nextMonth: this.nextMonth,
      confirmBooking: this.confirmBooking, downloadIcs: this.downloadIcs,
      openMenu: this.openMenu, closeSheets: this.closeSheets, openProfile: this.openProfile, saveUser: this.saveUser, skipSignin: this.skipSignin, newChat: this.newChat,
    };
  }
}