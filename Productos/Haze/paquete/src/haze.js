/*!
 * HAZE — atmospheric WebGL backgrounds for the web.
 * Three motifs, one file, zero dependencies. ~14 KB.
 *
 * Copyright (c) 2026 Alejandro Galvez. See LICENSE.md.
 */

/* ------------------------------------------------------------------ *
 * Colour helpers
 * ------------------------------------------------------------------ */

/** Accepts '#rgb', '#rrggbb', 'rgb(r,g,b)' or [r,g,b] 0-255 → [r,g,b] 0-1. */
function parseColor(input, fallback) {
  if (Array.isArray(input) && input.length >= 3) {
    return [input[0] / 255, input[1] / 255, input[2] / 255];
  }
  if (typeof input === 'string') {
    var s = input.trim();
    var m = s.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
    if (m) {
      var h = m[1];
      if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
      return [
        parseInt(h.slice(0, 2), 16) / 255,
        parseInt(h.slice(2, 4), 16) / 255,
        parseInt(h.slice(4, 6), 16) / 255
      ];
    }
    var n = s.match(/(-?[\d.]+)/g);
    if (n && n.length >= 3) {
      return [Math.min(255, +n[0]) / 255, Math.min(255, +n[1]) / 255, Math.min(255, +n[2]) / 255];
    }
  }
  return fallback;
}

function toCss(c) {
  return 'rgb(' + Math.round(c[0] * 255) + ',' + Math.round(c[1] * 255) + ',' + Math.round(c[2] * 255) + ')';
}
function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }

/* ------------------------------------------------------------------ *
 * Palettes — four stops, dark to light is up to you.
 * ------------------------------------------------------------------ */

var PALETTES = {
  lagoon:   { colors: ['#eafff7', '#5fe2c8', '#1f8fb5', '#10275c'], background: '#030a14' },
  dusk:     { colors: ['#ffe6b0', '#ff9a6b', '#c2508f', '#2b1b57'], background: '#0a0713' },
  forest:   { colors: ['#e8ffd2', '#8fe36b', '#1f9a72', '#0a2f33'], background: '#03100f' },
  steel:    { colors: ['#ffffff', '#c3ccd8', '#6b7d93', '#242c3a'], background: '#070a0f' },
  magma:    { colors: ['#fff0c2', '#ffae3b', '#e0452b', '#3d0d16'], background: '#0b0406' },
  violet:   { colors: ['#f0e6ff', '#b98cff', '#6f45d6', '#1b1140'], background: '#070514' },
  mono:     { colors: ['#ffffff', '#cfcfcf', '#7a7a7a', '#2e2e2e'], background: '#070707' }
};

/* ------------------------------------------------------------------ *
 * Defaults
 * ------------------------------------------------------------------ */

var DEFAULTS = {
  motif: 'caustics',         // 'caustics' | 'ribbons' | 'chrome'
  palette: null,             // name from PALETTES; applied before everything else
  colors: PALETTES.lagoon.colors,
  background: PALETTES.lagoon.background,

  scale: 1,                  // zoom. Smaller = bigger shapes.
  speed: 1,
  energy: 0.5,               // 0..1 — how alive it is. Animate this on scroll.
  contrast: 1,

  grain: 0.03,
  vignette: 0.35,
  mouse: 0.10,               // parallax pull; 0 skips the listener entirely
  intro: true,

  quality: 1.75,             // device-pixel-ratio cap
  pauseOffscreen: true,
  respectReducedMotion: true,

  mobileBreakpoint: 700,
  mobile: { scale: 1.35, quality: 1.5 }
};

/* ------------------------------------------------------------------ *
 * Shaders
 *
 * All three motifs share one prelude (noise, fBm, palette ramp) and one
 * uniform block, so switching motif only swaps the body.
 * ------------------------------------------------------------------ */

var VERT = 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}';

var PRELUDE = [
  'precision highp float;',
  'const float PI=3.14159265;',
  'uniform vec2  uRes;',
  'uniform float uTime;',
  'uniform vec2  uMouse;',
  'uniform vec3  uC0,uC1,uC2,uC3;',
  'uniform vec3  uBg;',
  'uniform float uEnergy,uIntro,uGrain,uVignette,uMouseAmt,uScale,uContrast;',

  'float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}',
  'float vnoise(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);',
  ' return mix(mix(hash(i),hash(i+vec2(1.,0.)),u.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),u.x),u.y);}',
  'float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*vnoise(p);p*=2.03;a*=.5;}return v;}',

  /* Four-stop ramp. Stop 0 is the highlight, stop 3 the deep shade. */
  'vec3 ramp(float t){t=clamp(t,0.,1.);',
  ' if(t<.3333) return mix(uC0,uC1,t*3.);',
  ' if(t<.6666) return mix(uC1,uC2,(t-.3333)*3.);',
  ' return mix(uC2,uC3,(t-.6666)*3.);}',

  /* Grain, vignette and the intro fade are identical for every motif, so
     each one just hands its colour to this and is done. */
  'vec3 finish(vec3 c, vec2 p){',
  ' c*=1.-uVignette*smoothstep(.35,1.30,length(p));',
  ' c+=(hash(gl_FragCoord.xy+uTime*77.)-.5)*uGrain;',
  ' return mix(uBg,c,uIntro);}'
].join('\n');

var MOTIFS = {

  /* ---------------------------------------------------------------- *
   * CAUSTICS — the light on the floor of a pool.
   *
   * Two layers of fBm, the second warped by the first. Folding the result
   * around its midpoint (1 - |m-.5|*2) turns smooth blobs into ridges;
   * raising that to a high power leaves only the thin bright filaments.
   * ---------------------------------------------------------------- */
  caustics: [
    'void main(){',
    ' vec2 p=(gl_FragCoord.xy-.5*uRes)/uRes.y;',
    ' vec2 uv=(p+(uMouse-.5)*uMouseAmt)*(2.2*uScale);',
    ' float t=uTime*.35;',
    ' float n=fbm(uv+vec2(t*.18,-t*.13));',
    ' float m=fbm(uv*1.75+n*(1.1+.9*uEnergy)+vec2(-t*.15,t*.11));',
    ' float ridge=1.-abs(m-.5)*2.;',
    ' float sharp=6.+10.*uEnergy;',
    ' float caust=pow(clamp(ridge,0.,1.),sharp);',
    /* a second, slower set so the pattern never looks like one tiling */
    ' float m2=fbm(uv*1.15-n*.8+vec2(t*.07,t*.09));',
    ' float caust2=pow(clamp(1.-abs(m2-.5)*2.,0.,1.),sharp*.6);',
    ' float light=caust*1.0+caust2*.45;',
    ' vec3 c=mix(uBg, ramp(1.-clamp(n*1.15,0.,1.)), .55);',
    ' c+=ramp(clamp(.15+light*.85,0.,1.))*light*(1.1+.9*uEnergy)*uContrast;',
    ' gl_FragColor=vec4(finish(c,p),1.);',
    '}'
  ].join('\n'),

  /* ---------------------------------------------------------------- *
   * RIBBONS — four bands of light drifting and crossing.
   *
   * The trick is domain warping: each band is drawn where it *would* go,
   * except the coordinate handed to it has already been bent by noise.
   * Straight sines become cloth.
   * ---------------------------------------------------------------- */
  ribbons: [
    'void main(){',
    ' vec2 p=(gl_FragCoord.xy-.5*uRes)/uRes.y;',
    ' vec2 sp=(p+(uMouse-.5)*uMouseAmt)*uScale;',
    ' float t=uTime*.30;',
    ' vec2 w=vec2(fbm(sp*1.25+vec2(t*.16,0.)),fbm(sp*1.25+vec2(9.2,-t*.13)));',
    ' vec2 q=sp+(w-.5)*(.55+.85*uEnergy);',
    ' vec3 c=uBg;',
    ' float glow=0.;',
    ' for(int k=0;k<4;k++){',
    '   float fk=float(k);',
    '   float off=sin(q.x*(1.15+fk*.22)+t*(.55+fk*.17)+fk*2.1)*(.20+.06*fk)+(fk-1.5)*.17;',
    '   float d=abs(q.y-off);',
    '   float thick=.055+.030*sin(t*.7+fk)+.02*uEnergy;',
    '   float band=smoothstep(thick,0.,d);',
    '   vec3 col = fk<.5?uC0 : (fk<1.5?uC1 : (fk<2.5?uC2 : uC3));',
    '   c+=col*band*(.85+.6*uEnergy)*uContrast;',
    '   glow+=smoothstep(thick*5.,0.,d)*.16;',
    ' }',
    ' c+=ramp(.5)*glow*(.5+.5*uEnergy);',
    ' gl_FragColor=vec4(finish(c,p),1.);',
    '}'
  ].join('\n'),

  /* ---------------------------------------------------------------- *
   * CHROME — liquid metal.
   *
   * An fBm height field, differentiated into a surface normal, then that
   * normal is used to look up the palette as if it were an environment.
   * No textures, no lights, no maths beyond a reflect().
   * ---------------------------------------------------------------- */
  chrome: [
    /* Only three octaves, and gentle ones. Metal is a SMOOTH surface catching
       light: with the full five-octave fBm the derivatives get so violent that
       the normal changes every pixel and the whole thing reads as television
       static instead of liquid metal. */
    'float hgt(vec2 p, float t){',
    ' float v=.60*vnoise(p       +vec2(t*.11,-t*.09));',
    ' v+=.28*vnoise(p*2.05-vec2(t*.08, t*.07));',
    ' v+=.12*vnoise(p*4.10+vec2(-t*.06,t*.05));',
    ' return v;}',
    'void main(){',
    ' vec2 p=(gl_FragCoord.xy-.5*uRes)/uRes.y;',
    ' vec2 sp=(p+(uMouse-.5)*uMouseAmt)*(1.05*uScale);',
    ' float t=uTime*.35;',
    /* a wide epsilon is the other half of the fix: it averages the slope over
       a real distance instead of sampling two touching pixels */
    ' float e=.011;',
    ' float hx=hgt(sp+vec2(e,0.),t)-hgt(sp-vec2(e,0.),t);',
    ' float hy=hgt(sp+vec2(0.,e),t)-hgt(sp-vec2(0.,e),t);',
    ' float relief=.020/(0.45+.85*uEnergy);',
    ' vec3 n=normalize(vec3(-hx,-hy,relief));',
    ' vec3 v=vec3(0.,0.,1.);',
    ' vec3 r=reflect(-v,n);',
    /* the environment IS the palette, read along the reflected ray */
    ' vec3 c=ramp(clamp(r.y*.5+.5,0.,1.))*uContrast;',
    ' float spec=pow(clamp(r.z,0.,1.),14.+26.*(1.-uEnergy));',
    ' c+=uC0*spec*.75;',
    ' float fres=pow(1.-clamp(n.z,0.,1.),3.);',
    ' c=mix(c,uC3,fres*.30);',
    ' gl_FragColor=vec4(finish(c,p),1.);',
    '}'
  ].join('\n')
};

/* ------------------------------------------------------------------ *
 * Haze
 * ------------------------------------------------------------------ */

var UNIFORMS = ['uRes', 'uTime', 'uMouse', 'uC0', 'uC1', 'uC2', 'uC3', 'uBg',
  'uEnergy', 'uIntro', 'uGrain', 'uVignette', 'uMouseAmt', 'uScale', 'uContrast'];

function Haze(target, options) {
  if (!(this instanceof Haze)) return new Haze(target, options);

  var el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) throw new Error('[haze] target element not found: ' + target);

  this.el = el;
  this.o = {};
  this.destroyed = false;
  this._raf = 0;
  this._running = false;
  this._visible = true;

  this._reduced = false;
  try { this._reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

  this._mouse = [0.5, 0.5];
  this._mouseTarget = [0.5, 0.5];
  this._energy = 0;
  this._energyTarget = 0;
  this._intro = 0;
  this._introTarget = 0;
  this._t0 = (window.performance && performance.now) ? performance.now() : Date.now();

  this.set(options || {}, true);
  this._mount();
}

/* ---- options ---------------------------------------------------- */

Haze.prototype.set = function (options, silent) {
  options = options || {};

  if (options.palette && PALETTES[options.palette]) {
    options = Object.assign({}, PALETTES[options.palette], options);
  }

  var o = this.o;
  var motifBefore = o.motif;
  for (var k in DEFAULTS) {
    if (!Object.prototype.hasOwnProperty.call(DEFAULTS, k)) continue;
    if (Object.prototype.hasOwnProperty.call(options, k)) o[k] = options[k];
    else if (!Object.prototype.hasOwnProperty.call(o, k)) o[k] = DEFAULTS[k];
  }
  if (!MOTIFS[o.motif]) o.motif = DEFAULTS.motif;

  var cols = Array.isArray(o.colors) && o.colors.length >= 4 ? o.colors : PALETTES.lagoon.colors;
  this._c = [
    parseColor(cols[0], [.92, 1, .97]),
    parseColor(cols[1], [.37, .89, .78]),
    parseColor(cols[2], [.12, .56, .71]),
    parseColor(cols[3], [.06, .15, .36])
  ];
  this._bg = parseColor(o.background, [.01, .04, .08]);

  this._energyTarget = clamp(+o.energy, 0, 1);
  if (silent) this._energy = this._energyTarget;

  if (!silent) {
    this.el.style.backgroundColor = toCss(this._bg);
    /* Changing motif means a different fragment shader, so the program is
       rebuilt. Everything else is just uniforms and costs nothing. */
    if (o.motif !== motifBefore && this.gl) this._buildProgram();
    if (this._fallback) this._paintFallback();
    this._resize();
  }
  return this;
};

Haze.prototype._v = function (key) {
  var o = this.o;
  if (o.mobile && this._w && this._w <= o.mobileBreakpoint &&
      Object.prototype.hasOwnProperty.call(o.mobile, key)) return o.mobile[key];
  return o[key];
};

/* ---- mounting --------------------------------------------------- */

Haze.prototype._mount = function () {
  var el = this.el;
  if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
  el.style.backgroundColor = toCss(this._bg);

  var cv = document.createElement('canvas');
  cv.setAttribute('aria-hidden', 'true');
  cv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;border:0;';
  el.insertBefore(cv, el.firstChild);
  this.canvas = cv;

  var gl = null;
  try {
    var attrs = { antialias: false, alpha: false, depth: false, stencil: false, powerPreference: 'high-performance' };
    gl = cv.getContext('webgl', attrs) || cv.getContext('experimental-webgl', attrs);
  } catch (e) {}
  if (!gl) return this._bail('webgl-unavailable');
  this.gl = gl;

  if (!this._buildProgram()) return;

  this._bindEvents();
  this._resize();

  this._introTarget = 1;
  if (!this.o.intro || (this._reduced && this.o.respectReducedMotion)) this._intro = 1;

  if (this._reduced && this.o.respectReducedMotion) {
    this._energy = this._energyTarget;
    this._mouse = [0.5, 0.5];
    this._intro = 1;
    this._draw();
    return;
  }
  this.play();
};

Haze.prototype._buildProgram = function () {
  var gl = this.gl;
  if (!gl) return false;

  var frag = PRELUDE + '\n' + MOTIFS[this.o.motif];
  var vs = this._shader(gl.VERTEX_SHADER, VERT);
  var fs = this._shader(gl.FRAGMENT_SHADER, frag);
  if (!vs || !fs) { this._bail('shader-compile'); return false; }

  var pr = gl.createProgram();
  gl.attachShader(pr, vs);
  gl.attachShader(pr, fs);
  gl.linkProgram(pr);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) { this._bail('program-link'); return false; }

  if (this.program) gl.deleteProgram(this.program);
  this.program = pr;
  gl.useProgram(pr);

  if (!this.buffer) {
    /* One oversized triangle covers the viewport with no wasted fragments. */
    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  } else {
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
  }
  var loc = gl.getAttribLocation(pr, 'a');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  this.U = {};
  for (var i = 0; i < UNIFORMS.length; i++) this.U[UNIFORMS[i]] = gl.getUniformLocation(pr, UNIFORMS[i]);
  return true;
};

Haze.prototype._shader = function (type, src) {
  var gl = this.gl;
  var s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    if (window.console && console.warn) console.warn('[haze] shader failed:', gl.getShaderInfoLog(s));
    return null;
  }
  return s;
};

/* ---- graceful degradation --------------------------------------- */

/**
 * No WebGL, or the shader will not compile. Paint a still approximation in
 * CSS instead: a buyer must never end up with an empty hero.
 */
Haze.prototype._bail = function (reason) {
  this.fallbackReason = reason;
  this._fallback = true;
  if (this.canvas && this.canvas.parentNode) this.canvas.parentNode.removeChild(this.canvas);
  this.canvas = null;
  this.gl = null;
  this._paintFallback();
  if (typeof this.o.onFallback === 'function') {
    try { this.o.onFallback(reason); } catch (e) {}
  }
};

Haze.prototype._paintFallback = function () {
  var c = this._c, bg = toCss(this._bg);
  var layers;
  if (this.o.motif === 'ribbons') {
    layers = [
      'linear-gradient(115deg, transparent 22%, ' + toCss(c[1]) + ' 34%, transparent 46%)',
      'linear-gradient(100deg, transparent 44%, ' + toCss(c[2]) + ' 56%, transparent 68%)',
      'linear-gradient(128deg, transparent 60%, ' + toCss(c[0]) + ' 70%, transparent 80%)'
    ];
  } else if (this.o.motif === 'chrome') {
    layers = [
      'linear-gradient(150deg, ' + toCss(c[0]) + ' 0%, ' + toCss(c[1]) + ' 28%, ' + toCss(c[2]) + ' 58%, ' + toCss(c[3]) + ' 100%)'
    ];
  } else {
    layers = [
      'radial-gradient(60% 55% at 28% 26%, ' + toCss(c[1]) + ' 0%, transparent 62%)',
      'radial-gradient(52% 48% at 74% 68%, ' + toCss(c[2]) + ' 0%, transparent 60%)',
      'radial-gradient(38% 34% at 58% 22%, ' + toCss(c[0]) + ' 0%, transparent 55%)'
    ];
  }
  this.el.style.backgroundImage = layers.join(',');
  this.el.style.backgroundColor = bg;
};

/* ---- events ----------------------------------------------------- */

Haze.prototype._bindEvents = function () {
  var self = this;

  this._onResize = function () { self._resize(); };
  if (window.ResizeObserver) {
    this._ro = new ResizeObserver(this._onResize);
    this._ro.observe(this.el);
  } else {
    window.addEventListener('resize', this._onResize, { passive: true });
  }

  if (this.o.mouse > 0) {
    this._onMove = function (e) {
      var r = self.el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      self._mouseTarget[0] = clamp((e.clientX - r.left) / r.width, 0, 1);
      self._mouseTarget[1] = 1 - clamp((e.clientY - r.top) / r.height, 0, 1);
    };
    window.addEventListener('mousemove', this._onMove, { passive: true });
  }

  this._onVis = function () { if (document.hidden) self.pause(); else self.play(); };
  document.addEventListener('visibilitychange', this._onVis);

  if (this.o.pauseOffscreen && window.IntersectionObserver) {
    this._io = new IntersectionObserver(function (entries) {
      self._visible = entries[0].isIntersecting;
      if (self._visible) self.play(); else self.pause();
    }, { threshold: 0 });
    this._io.observe(this.el);
  }
};

Haze.prototype._resize = function () {
  if (!this.gl || !this.canvas) return;
  var gl = this.gl;
  var w = this.el.clientWidth || 1, h = this.el.clientHeight || 1;
  this._w = w;

  var dpr = Math.min(window.devicePixelRatio || 1, this._v('quality') || 1.75);
  this.canvas.width = Math.max(1, Math.round(w * dpr));
  this.canvas.height = Math.max(1, Math.round(h * dpr));
  gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  gl.useProgram(this.program);
  gl.uniform2f(this.U.uRes, this.canvas.width, this.canvas.height);

  if (!this._running) this._draw();
};

/* ---- the loop --------------------------------------------------- */

Haze.prototype._draw = function () {
  var gl = this.gl;
  if (!gl || this.destroyed || !this.program) return;
  var o = this.o, U = this.U;

  gl.useProgram(this.program);
  var now = (window.performance && performance.now) ? performance.now() : Date.now();
  gl.uniform1f(U.uTime, ((now - this._t0) / 1000) * (o.speed || 0));
  gl.uniform2f(U.uMouse, this._mouse[0], this._mouse[1]);
  gl.uniform3fv(U.uC0, this._c[0]);
  gl.uniform3fv(U.uC1, this._c[1]);
  gl.uniform3fv(U.uC2, this._c[2]);
  gl.uniform3fv(U.uC3, this._c[3]);
  gl.uniform3fv(U.uBg, this._bg);
  gl.uniform1f(U.uEnergy, this._energy);
  gl.uniform1f(U.uIntro, this._intro);
  gl.uniform1f(U.uGrain, o.grain);
  gl.uniform1f(U.uVignette, o.vignette);
  gl.uniform1f(U.uMouseAmt, o.mouse);
  gl.uniform1f(U.uScale, this._v('scale') || 1);
  gl.uniform1f(U.uContrast, o.contrast);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
};

Haze.prototype._frame = function () {
  this._raf = 0;
  if (!this._running || this.destroyed) return;
  this._mouse[0] += (this._mouseTarget[0] - this._mouse[0]) * 0.05;
  this._mouse[1] += (this._mouseTarget[1] - this._mouse[1]) * 0.05;
  this._energy += (this._energyTarget - this._energy) * 0.08;
  this._intro += (this._introTarget - this._intro) * 0.035;
  this._draw();
  var self = this;
  this._raf = requestAnimationFrame(function () { self._frame(); });
};

/* ---- public API -------------------------------------------------- */

Haze.prototype.play = function () {
  if (this.destroyed || this._running || !this.gl || !this._visible) return this;
  if (this._reduced && this.o.respectReducedMotion) return this;
  this._running = true;
  var self = this;
  if (!this._raf) this._raf = requestAnimationFrame(function () { self._frame(); });
  return this;
};

Haze.prototype.pause = function () {
  this._running = false;
  if (this._raf) { cancelAnimationFrame(this._raf); this._raf = 0; }
  return this;
};

/**
 * How alive it is, 0..1. This is the one to wire to scroll:
 *   haze.energy(scrollY / innerHeight)
 * It eases towards the value, so raw scroll every frame is fine.
 */
Haze.prototype.energy = function (v) {
  this._energyTarget = clamp(+v || 0, 0, 1);
  if (this._reduced && this.o.respectReducedMotion) { this._energy = this._energyTarget; this._draw(); }
  return this;
};

/** Swap the four colours and the background in one call. */
Haze.prototype.palette = function (name) {
  if (!PALETTES[name]) return this;
  return this.set({ colors: PALETTES[name].colors, background: PALETTES[name].background });
};

/** Swap the motif. Rebuilds the shader; the canvas and context are kept. */
Haze.prototype.motif = function (name) {
  if (!MOTIFS[name]) return this;
  return this.set({ motif: name });
};

Haze.prototype.destroy = function () {
  if (this.destroyed) return;
  this.pause();
  this.destroyed = true;

  if (this._ro) this._ro.disconnect();
  else window.removeEventListener('resize', this._onResize);
  if (this._io) this._io.disconnect();
  if (this._onMove) window.removeEventListener('mousemove', this._onMove);
  document.removeEventListener('visibilitychange', this._onVis);

  var gl = this.gl;
  if (gl) {
    if (this.program) gl.deleteProgram(this.program);
    if (this.buffer) gl.deleteBuffer(this.buffer);
    var lose = gl.getExtension('WEBGL_lose_context');
    if (lose) lose.loseContext();
  }
  if (this.canvas && this.canvas.parentNode) this.canvas.parentNode.removeChild(this.canvas);
  this.canvas = null;
  this.gl = null;
  this.program = null;
};

Haze.palettes = PALETTES;
Haze.motifs = ['caustics', 'ribbons', 'chrome'];
Haze.version = '1.0.0';

/* ------------------------------------------------------------------ *
 * Auto-init — for buyers who never touch JavaScript.
 *   <div data-haze data-haze-motif="ribbons" data-haze-palette="dusk"></div>
 * Only wired up in the <script> build; the module stays side-effect free.
 * ------------------------------------------------------------------ */

function autoInit(root) {
  var nodes = (root || document).querySelectorAll('[data-haze]');
  var made = [];
  for (var i = 0; i < nodes.length; i++) {
    var el = nodes[i];
    if (el.__haze) continue;
    var opts = {};
    for (var j = 0; j < el.attributes.length; j++) {
      var at = el.attributes[j];
      if (at.name.indexOf('data-haze-') !== 0) continue;
      var key = at.name.slice(10).replace(/-([a-z])/g, function (m, c) { return c.toUpperCase(); });
      var val = at.value;
      if (key === 'colors') opts.colors = val.split(',').map(function (s) { return s.trim(); });
      else if (val === 'true' || val === 'false') opts[key] = (val === 'true');
      else if (val !== '' && !isNaN(+val)) opts[key] = +val;
      else opts[key] = val;
    }
    try {
      el.__haze = new Haze(el, opts);
      made.push(el.__haze);
    } catch (e) {
      if (window.console && console.warn) console.warn('[haze] auto-init failed', e);
    }
  }
  return made;
}

export { Haze as default, autoInit, PALETTES, MOTIFS };
