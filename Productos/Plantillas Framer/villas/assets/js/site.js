/* Isla Blanca — behaviour shared by the four pages.
   Everything here is an enhancement: links, forms and content work without it. */
(() => {
  'use strict';

  /* The floating capsule: lifts off the edges once the page moves */
  const nav = document.querySelector('.nav');
  if (nav) {
    /* pages whose first screen is half photo, half wall keep the capsule from the start */
    const siempre = document.body.classList.contains('siempre-flota');
    const flota = () => nav.classList.toggle('flotando', siempre || scrollY > 24);
    flota();
    addEventListener('scroll', flota, { passive: true });
  }

  /* Stepping in through the arch (home). The scroll drives --p (the opening)
     and --q (the name of the house appearing) with CSS scroll timelines.
     Where the browser has none, a mouse-driven fallback sets them here;
     on touch without timelines the scene stays as it is, still complete. */
  const pista = document.querySelector('.entrada-arco');
  if (pista) {
    const escena = pista.querySelector('.escena');
    const recorre = () => {
      const r = pista.getBoundingClientRect();
      return Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - innerHeight)));
    };
    const tramo = (t, a, b) => Math.min(1, Math.max(0, (t - a) / (b - a)));
    const suave = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const timelines = CSS.supports('animation-timeline: view()');
    const raton = matchMedia('(hover: hover) and (pointer: fine)').matches;
    const quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let pedido = false;
    const pinta = () => {
      pedido = false;
      const t = recorre();
      if (!timelines && raton && !quieto) {
        escena.style.setProperty('--p', suave(tramo(t, .08, .7)).toFixed(4));
        escena.style.setProperty('--q', tramo(t, .66, .92).toFixed(4));
      }
      /* what can be clicked follows what can be seen */
      pista.classList.toggle('abierta', quieto ? false : t > .55);
    };
    addEventListener('scroll', () => { if (!pedido) { pedido = true; requestAnimationFrame(pinta); } }, { passive: true });
    pinta();
  }

  /* Phone menu */
  const boton = document.querySelector('.nav-menu');
  const panel = document.getElementById('panel-movil');
  if (boton && panel) {
    const cerrar = () => { panel.classList.remove('abierto'); boton.setAttribute('aria-expanded', 'false'); };
    boton.addEventListener('click', () => {
      const abierto = panel.classList.toggle('abierto');
      boton.setAttribute('aria-expanded', String(abierto));
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') cerrar(); });
    matchMedia('(min-width:810px)').addEventListener('change', e => { if (e.matches) cerrar(); });
  }

  /* The pool: Lustre caustics in every [data-piscina]. Clear Balearic water,
     not a neon lagoon. Without WebGL Lustre falls back to its own CSS. */
  if (window.Lustre) {
    document.querySelectorAll('[data-piscina]').forEach(el => {
      new Lustre(el, {
        motif: 'caustics',
        colors: ['#F4FEFF', '#A9EBF3', '#3DB7D3', '#0C6F98'],
        background: '#0E6E97',
        energy: 0.32,
        speed: 0.55,
        scale: parseFloat(el.dataset.escala || '1.15'),
        contrast: 0.92,
        grain: 0.02,
        vignette: 0.12,
        startAt: 9,
      });
    });
  }

  /* Villas listing: filter by island, also from the address (?isla=ibiza) */
  const filtros = document.querySelectorAll('[data-isla-filtro]');
  const villas = document.querySelectorAll('[data-isla]');
  const cuenta = document.getElementById('cuenta-villas');
  if (filtros.length && villas.length) {
    const aplicar = isla => {
      let n = 0;
      villas.forEach(v => { const ve = isla === 'todas' || v.dataset.isla === isla; v.hidden = !ve; if (ve) n++; });
      filtros.forEach(f => f.setAttribute('aria-pressed', String(f.dataset.islaFiltro === isla)));
      if (cuenta) cuenta.textContent = n === 1 ? '1 house' : n + ' houses';
      try {
        const u = new URL(location.href);
        if (isla === 'todas') u.searchParams.delete('isla'); else u.searchParams.set('isla', isla);
        history.replaceState(null, '', u);
      } catch (e) { /* the filter is applied anyway */ }
    };
    filtros.forEach(f => f.addEventListener('click', () => aplicar(f.dataset.islaFiltro)));
    const pedida = new URLSearchParams(location.search).get('isla');
    if (pedida && [...filtros].some(f => f.dataset.islaFiltro === pedida)) aplicar(pedida);
  }

  /* Booking request: remembers where the visitor came from
     (contact.html?villa=can-sal-blanca&llegada=…&salida=…&huespedes=…) */
  const reserva = document.getElementById('form-reserva');
  if (reserva) {
    const q = new URLSearchParams(location.search);
    [['villa', 'villa'], ['llegada', 'llegada'], ['salida', 'salida'], ['huespedes', 'huespedes']].forEach(([param, id]) => {
      const v = q.get(param), campo = document.getElementById(id);
      if (v && campo) campo.value = v;
    });

    const marcar = (campo, mensaje) => {
      const caja = campo.closest('.campo');
      if (!caja) return;
      if (mensaje) { caja.dataset.error = ''; caja.querySelector('.error').textContent = mensaje; campo.setAttribute('aria-invalid', 'true'); }
      else { delete caja.dataset.error; campo.removeAttribute('aria-invalid'); }
    };
    reserva.addEventListener('submit', e => {
      e.preventDefault();
      let primero = null;
      const fallo = (c, m) => { marcar(c, m); if (!primero) primero = c; };
      reserva.querySelectorAll('[required]').forEach(c => {
        const vacio = c.type === 'checkbox' ? !c.checked : !c.value.trim();
        if (vacio) fallo(c, c.dataset.falta || 'Please fill this in.'); else marcar(c, '');
      });
      const llegada = document.getElementById('llegada'), salida = document.getElementById('salida');
      if (llegada.value && salida.value && salida.value <= llegada.value) fallo(salida, 'Departure has to be after arrival.');
      const correo = document.getElementById('correo');
      if (correo.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value)) fallo(correo, 'That email does not look complete, e.g. name@example.com.');
      if (primero) { primero.focus(); return; }
      reserva.hidden = true;
      const hecho = document.getElementById('reserva-enviada');
      hecho.hidden = false;
      hecho.focus();
    });
  }
})();
