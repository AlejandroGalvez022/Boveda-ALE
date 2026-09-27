"""
Lustre - empaqueta la venta. Uso:  python empaquetar.py

1. venta/Lustre-vX.Y.Z.zip  -> lo que recibe el comprador (todo paquete/ dentro
   de una carpeta lustre/). Rutas con "/" (Compress-Archive de PowerShell 5.1
   las guarda con "\" y el ZIP sale roto en Mac).
2. venta/sitio/           -> la demo publica para Netlify (arrastrar la carpeta).
   Si venta/config.json tiene "buy_url", mete el boton de comprar con "price".

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
buy = cfg.get('buy_url', '').strip()
if buy:
    price = cfg.get('price', '').strip()
    label = 'Buy Lustre' + (' — ' + price if price else '')
    idx = idx.replace('<button class="btn solid" id="toRoom">',
                      '<a class="btn solid" href="%s">%s</a>\n      <button class="btn" id="toRoom">' % (buy, label), 1)
    idx = idx.replace('<span>WebGL · commercial licence</span>',
                      '<span><a href="%s">%s</a> · commercial licence</span>' % (buy, label), 1)
else:
    warnings.append('sin buy_url en config.json: la demo sale SIN boton de comprar')
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
