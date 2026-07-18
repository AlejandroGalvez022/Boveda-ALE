/*
  Widget flotante "Aura" — chatbot para tu web.
  Uso: coloca este <script> al final de tu página, antes de </body>:

  <script src="widget.js"
          data-src="chatbot-aura.html"
          data-color="#7c9885"
          data-title="Habla con Aura"></script>

  data-src   = ruta al archivo chatbot-aura.html (relativa a tu web o URL completa)
  data-color = color del botón (opcional)
  data-title = texto del tooltip (opcional)
*/
(function () {
  var script = document.currentScript;
  var SRC = (script && script.getAttribute('data-src')) || 'chatbot-aura.html';
  var COLOR = (script && script.getAttribute('data-color')) || '#7c9885';
  var TITLE = (script && script.getAttribute('data-title')) || 'Habla con nosotros';

  var open = false;

  // --- estilos ---
  var style = document.createElement('style');
  style.textContent = [
    '.aura-launcher{position:fixed;right:22px;bottom:22px;z-index:2147483000;width:62px;height:62px;border-radius:50%;border:none;cursor:pointer;',
    'background:' + COLOR + ';color:#fff;box-shadow:0 10px 30px rgba(40,30,20,.28);display:flex;align-items:center;justify-content:center;',
    'transition:transform .25s cubic-bezier(.2,.9,.3,1.3),box-shadow .25s;}',
    '.aura-launcher:hover{transform:translateY(-3px) scale(1.05);}',
    '.aura-launcher svg{transition:transform .3s ease;}',
    '.aura-panel{position:fixed;right:22px;bottom:96px;z-index:2147483000;width:400px;height:660px;max-height:calc(100vh - 120px);',
    'border:none;border-radius:26px;overflow:hidden;background:#f6efe6;box-shadow:0 24px 70px rgba(40,30,20,.32);',
    'opacity:0;transform:translateY(16px) scale(.98);pointer-events:none;transition:opacity .28s ease,transform .28s cubic-bezier(.2,.8,.2,1);}',
    '.aura-panel.aura-open{opacity:1;transform:translateY(0) scale(1);pointer-events:auto;}',
    '.aura-panel iframe{width:100%;height:100%;border:none;display:block;}',
    '@media (max-width:520px){',
    '  .aura-panel{right:0;left:0;bottom:0;top:0;width:100%;height:100%;max-height:100%;border-radius:0;}',
    '  .aura-launcher.aura-open{opacity:0;pointer-events:none;}',
    '}'
  ].join('');
  document.head.appendChild(style);

  // --- panel + iframe (el iframe se carga al primer clic para no ralentizar tu web) ---
  var panel = document.createElement('div');
  panel.className = 'aura-panel';
  var iframe = null;

  // --- botón ---
  var btn = document.createElement('button');
  btn.className = 'aura-launcher';
  btn.setAttribute('aria-label', TITLE);
  btn.title = TITLE;
  var ICON_CHAT = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M20 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 20.5l1.9-4.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var ICON_CLOSE = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/></svg>';
  btn.innerHTML = ICON_CHAT;

  function setOpen(v) {
    open = v;
    if (open && !iframe) {
      iframe = document.createElement('iframe');
      iframe.setAttribute('title', TITLE);
      iframe.src = SRC;
      panel.appendChild(iframe);
    }
    panel.classList.toggle('aura-open', open);
    btn.classList.toggle('aura-open', open);
    btn.innerHTML = open ? ICON_CLOSE : ICON_CHAT;
  }

  btn.addEventListener('click', function () { setOpen(!open); });

  function mount() {
    document.body.appendChild(panel);
    document.body.appendChild(btn);
  }
  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount);
})();
