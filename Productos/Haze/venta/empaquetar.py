"""
Lustre - empaqueta la venta. Uso:  python empaquetar.py

1. venta/Lustre-vX.Y.Z.zip  -> lo que recibe el comprador (todo paquete/ dentro
   de una carpeta lustre/). Rutas con "/" (Compress-Archive de PowerShell 5.1
   las guarda con "\" y el ZIP sale roto en Mac).
2. venta/sitio/           -> la demo publica para Netlify (arrastrar la carpeta).
   Mete precios, FAQ, pie con enlaces y las paginas legales (terms.html, license.html).
   Con "buy_single"/"buy_unlimited" en venta/config.json, los botones de comprar funcionan.

Antes de nada hay que haber corrido paquete/build.ps1 (o pruebas/pruebas.ps1,
que lo corre).
"""
import io, json, os, re, shutil, zipfile

HERE = os.path.dirname(os.path.abspath(__file__))
PKG = os.path.normpath(os.path.join(HERE, '..', 'paquete'))
SITE = os.path.join(HERE, 'sitio')

src = io.open(os.path.join(PKG, 'src', 'lustre.js'), encoding='utf-8').read()
version = re.search(r"Lustre\.version\s*=\s*'([^']+)'", src).group(1)

cfg = {}
cfg_path = os.path.join(HERE, 'config.json')
if os.path.exists(cfg_path):
    cfg = json.load(io.open(cfg_path, encoding='utf-8'))

# ---------------------------------------------------------------- 1. ZIP
must = ['dist/lustre.js', 'dist/lustre.esm.js', 'dist/Lustre.framer.tsx', 'README.md', 'LICENSE.md']
for m in must:
    if not os.path.exists(os.path.join(PKG, m)):
        raise SystemExit('Falta ' + m + ' en paquete/: corre build.ps1 antes.')

lic = io.open(os.path.join(PKG, 'LICENSE.md'), encoding='utf-8').read()
warnings = []
if '[your email here]' in lic:
    warnings.append('LICENSE.md todavia dice [your email here]')
if 'Draft' in lic:
    warnings.append('LICENSE.md todavia lleva el aviso de BORRADOR')

zpath = os.path.join(HERE, 'Lustre-v%s.zip' % version)
n = 0
with zipfile.ZipFile(zpath, 'w', zipfile.ZIP_DEFLATED) as z:
    for root, dirs, files in os.walk(PKG):
        dirs[:] = sorted(d for d in dirs if not d.startswith('.'))
        for f in sorted(files):
            if f.startswith('.'):
                continue
            full = os.path.join(root, f)
            rel = os.path.relpath(full, PKG).replace(os.sep, '/')
            z.write(full, 'lustre/' + rel)
            n += 1
print('ZIP  %s  (%d archivos, %.1f KB)' % (os.path.basename(zpath), n, os.path.getsize(zpath) / 1024))

# ---------------------------------------------------------------- 2. sitio
if os.path.exists(SITE):
    shutil.rmtree(SITE)
# El motor va en js/, NO en dist/: Netlify Drop se salta las carpetas 'dist'
# al arrastrar (27-sep: la web salio sin fondo, dist/lustre.js daba 404).
os.makedirs(os.path.join(SITE, 'js'))
os.makedirs(os.path.join(SITE, 'examples'))
shutil.copy(os.path.join(PKG, 'dist', 'lustre.js'), os.path.join(SITE, 'js', 'lustre.js'))

idx = io.open(os.path.join(PKG, 'demo', 'index.html'), encoding='utf-8').read()
idx = idx.replace('src="../dist/lustre.js"', 'src="js/lustre.js"')
# --- venta: portada con boton, bloque de precios, pie con enlaces y legales.
# config.json: "buy_single" y "buy_unlimited" (enlaces de Lemon Squeezy).
# Sin ellos los botones salen desactivados, pero precios y legales se ven
# igual: la revision de Lemon Squeezy/Stripe pide precios, reembolsos y contacto.
def buy_attr(url):
    url = (url or '').strip()
    if url:
        return 'href="%s"' % url
    return 'href="#pricing" aria-disabled="true" title="Checkout opening soon"'
buy1 = cfg.get('buy_single', cfg.get('buy_url', ''))
buy2 = cfg.get('buy_unlimited', '')
if not buy1.strip() or not buy2.strip():
    warnings.append('faltan buy_single / buy_unlimited en config.json: botones de comprar DESACTIVADOS')

idx = idx.replace('<button class="btn solid" id="toRoom">',
                  '<a class="btn solid" href="#pricing">Buy \u2014 from $24</a>\n      <button class="btn" id="toRoom">', 1)
block = io.open(os.path.join(HERE, 'venta-bloque.html'), encoding='utf-8').read()
block = re.sub(r'<!--[\s\S]*?-->\s*', '', block, count=1)
block = block.replace('{{BUY_SINGLE}}', buy_attr(buy1)).replace('{{BUY_UNLIMITED}}', buy_attr(buy2))
footer = ('\n<footer>\n  <span>Lustre v%s \u00b7 by Alejandro G\u00e1lvez Bra\u00f1a</span>\n'
          '  <nav><a href="#pricing">Pricing</a><a href="license.html">Licence</a>'
          '<a href="terms.html">Terms &amp; refunds</a><a href="mailto:galvezbranaa@gmail.com">Contact</a></nav>\n'
          '</footer>') % version
idx = re.sub(r'<footer>[\s\S]*?</footer>', lambda m: block + footer, idx, count=1)
if 'id="pricing"' not in idx:
    raise SystemExit('ERROR: no se pudo meter el bloque de precios (no hay <footer> en demo/index.html)')

# paginas legales: mismo aspecto que la web, sin JS
PAGE_HEAD = """<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 32 32%27%3E%3Crect width=%2732%27 height=%2732%27 rx=%277%27 fill=%27%230b1d2e%27/%3E%3Cpath d=%27M6 20c5-8 9 2 14-4s6-2 6-2%27 stroke=%27%239fe8ff%27 stroke-width=%272.6%27 fill=%27none%27 stroke-linecap=%27round%27/%3E%3C/svg%3E">
<style>
:root{--ink:#f2f4f6;--dim:#98a1ab;--faint:#606a76;--line-soft:rgba(242,244,246,.07);
  --f:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;--mono:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:var(--f);background:#030a14;color:var(--ink);line-height:1.65;-webkit-font-smoothing:antialiased}
a{color:#9fe8ff}
.doc{max-width:720px;margin:0 auto;padding:clamp(28px,6vw,72px) clamp(16px,5vw,32px) 96px}
.back{font-family:var(--mono);font-size:12px;letter-spacing:.12em;text-transform:uppercase;margin-bottom:28px}
.back a{color:var(--dim);text-decoration:none}
h1{font-size:clamp(32px,5vw,48px);font-weight:800;letter-spacing:-.04em;line-height:1.05;margin-bottom:8px}
.meta{color:var(--faint);font-size:14px;margin-bottom:24px}
h2{font-size:20px;font-weight:700;letter-spacing:-.01em;margin:36px 0 10px}
p,li{color:#c9d0d7;font-size:16px}
p+p{margin-top:12px}
ul{margin:12px 0 0 20px;display:grid;gap:6px}
hr{border:0;border-top:1px solid var(--line-soft);margin:32px 0}
code{font-family:var(--mono);font-size:.9em;background:#061020;padding:2px 6px;border-radius:5px}
</style>"""

def md_html(md):
    """Markdown minimo para LICENSE.md: #, ##, listas, **negrita**, `codigo`, ---."""
    def inline(t):
        t = t.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
        t = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', t)
        t = re.sub(r'`([^`]+)`', r'<code>\1</code>', t)
        return t
    out, para, items = [], [], []
    def flush():
        if para:
            out.append('<p>' + inline(' '.join(para)) + '</p>'); del para[:]
        if items:
            out.append('<ul>' + ''.join('<li>' + inline(i) + '</li>' for i in items) + '</ul>'); del items[:]
    for line in md.splitlines():
        l = line.strip()
        if not l:
            flush(); continue
        if l.startswith('## '):
            flush(); out.append('<h2>' + inline(l[3:]) + '</h2>'); continue
        if l.startswith('# '):
            flush(); out.append('<h1>' + inline(l[2:]) + '</h1>'); continue
        if l == '---':
            flush(); out.append('<hr>'); continue
        if l.startswith('- '):
            if para:
                flush()
            items.append(l[2:]); continue
        if items and line.startswith('  '):
            items[-1] += ' ' + l; continue
        para.append(l)
    flush()
    return '\n'.join(out)

lic = md_html(io.open(os.path.join(PKG, 'LICENSE.md'), encoding='utf-8').read())
io.open(os.path.join(SITE, 'license.html'), 'w', encoding='utf-8', newline='').write(
    '<!DOCTYPE html>\n<html lang="en"><head><meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n'
    '<title>Licence \u2014 Lustre</title>\n' + PAGE_HEAD + '\n</head><body>\n<main class="doc">\n'
    '  <p class="back"><a href="index.html">\u2190 Lustre</a></p>\n' + lic + '\n</main>\n</body></html>\n')
terms = io.open(os.path.join(HERE, 'terms.html'), encoding='utf-8').read().replace('{{PAGE_HEAD}}', PAGE_HEAD)
io.open(os.path.join(SITE, 'terms.html'), 'w', encoding='utf-8', newline='').write(terms)
io.open(os.path.join(SITE, 'index.html'), 'w', encoding='utf-8', newline='').write(idx)

for f in os.listdir(os.path.join(PKG, 'demo', 'examples')):
    t = io.open(os.path.join(PKG, 'demo', 'examples', f), encoding='utf-8').read()
    t = t.replace('src="../../dist/lustre.js"', 'src="../js/lustre.js"')
    io.open(os.path.join(SITE, 'examples', f), 'w', encoding='utf-8', newline='').write(t)

# enlaces rotos: todo src/href relativo del sitio tiene que existir
bad = []
for root, _, files in os.walk(SITE):
    for f in files:
        if not f.endswith('.html'):
            continue
        t = io.open(os.path.join(root, f), encoding='utf-8').read()
        # lo de dentro de <script> es codigo (y ejemplos de codigo), no enlaces
        t = re.sub(r'(<script[^>]*>)[\s\S]*?(</script>)', r'', t)
        for ref in re.findall(r'(?:src|href)="([^"#:?]+)"', t):
            if not os.path.exists(os.path.normpath(os.path.join(root, ref))):
                bad.append(os.path.relpath(os.path.join(root, f), SITE) + ' -> ' + ref)
print('SITIO venta/sitio/  (%d enlaces rotos)' % len(bad))
for b in bad:
    print('   ROTO ' + b)
for w in warnings:
    print('AVISO ' + w)
