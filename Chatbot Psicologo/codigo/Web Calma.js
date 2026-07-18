class Component extends DCLogic {
  state = { chatOpen: false, chatMounted: false };

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

  componentDidMount() {
    const ease = 'cubic-bezier(.2,.8,.2,1)';
    this._io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target;
          el.style.opacity = '1';
          el.style.transform = 'none';
          el.style.filter = 'none';
          this._io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    const arm = () => {
      document.querySelectorAll('[data-reveal]').forEach(el => {
        if (el.dataset.armed) return;
        el.dataset.armed = '1';
        const kind = el.getAttribute('data-reveal') || 'up';
        el.style.opacity = '0';
        el.style.transform = kind === 'left' ? 'translateX(-34px)' : (kind === 'right' ? 'translateX(34px)' : (kind === 'scale' ? 'scale(.94)' : 'translateY(30px)'));
        el.style.transition = 'opacity .8s ' + ease + ', transform .8s ' + ease;
        el.style.transitionDelay = (el.getAttribute('data-reveal-delay') || 0) + 'ms';
        el.style.willChange = 'opacity, transform';
        this._io.observe(el);
      });
    };
    requestAnimationFrame(arm);
    setTimeout(arm, 200);
  }
  componentWillUnmount() { if (this._io) this._io.disconnect(); }

  openChat = () => { if (this._ct) clearTimeout(this._ct); this.setState({ chatMounted: true }, () => requestAnimationFrame(() => this.setState({ chatOpen: true }))); };
  toggleChat = () => {
    if (this.state.chatOpen) { this.setState({ chatOpen: false }); if (this._ct) clearTimeout(this._ct); this._ct = setTimeout(() => this.setState({ chatMounted: false }), 480); }
    else this.openChat();
  };

  renderVals() {
    const c = this.colors();
    const name = this.props.botName || 'Aura';
    const waDigits = (this.props.whatsappNumber || '').replace(/[^0-9]/g, '');
    return {
      ...c,
      practiceName: this.props.practiceName || 'Calma',
      therapistName: this.props.therapistName || 'Marta Ruiz',
      botName: name,
      price: this.props.price || '55',
      contactEmail: this.props.contactEmail || 'hola@calma.es',
      appSrc: (this.props.appSrc || 'chatbot-aura.html') + '?full=1',
      waHref: 'https://wa.me/' + waDigits + '?text=' + encodeURIComponent('Hola, me gustaría reservar una primera toma de contacto.'),
      chatOpen: this.state.chatOpen,
      chatClosed: !this.state.chatOpen,
      chatMounted: this.state.chatMounted,
      chatOverlayStyle: { position: 'fixed', inset: 0, zIndex: 90, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: this.state.chatOpen ? 1 : 0, transition: 'opacity .35s ease', pointerEvents: this.state.chatOpen ? 'auto' : 'none' },
      chatWashStyle: { position: 'absolute', inset: 0, background: 'radial-gradient(circle at 88% 90%, ' + c.accentLight + ', ' + c.accent + ' 55%, ' + c.accentDeep + ')', animation: this.state.chatOpen ? 'washIn .55s cubic-bezier(.65,0,.35,1) both' : 'none', ['--ox']: '88%', ['--oy']: '90%' },
      chatFrameStyle: { position: 'relative', zIndex: 2, width: '100%', height: '100%', overflow: 'hidden', background: '#f6efe6', animation: this.state.chatOpen ? 'frameIn .4s cubic-bezier(.2,.8,.2,1) .1s both' : 'none' },
      chatCloseStyle: { position: 'absolute', top: 'calc(env(safe-area-inset-top,0px) + 22px)', right: '24px', zIndex: 4, width: '46px', height: '46px', borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,.2)', backdropFilter: 'blur(6px)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
      openChat: this.openChat,
      toggleChat: this.toggleChat,
    };
  }
}