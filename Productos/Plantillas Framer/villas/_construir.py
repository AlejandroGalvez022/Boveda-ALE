"""Copia la cabecera y el pie de index.html en las demás páginas.

Uso: python _construir.py   (desde esta carpeta)

Las páginas llevan <!--CABECERA:clave--> y <!--PIE--> donde van; la clave
dice qué enlace del menú se marca como página actual. Así las cuatro
páginas tienen siempre la misma cabecera y el mismo pie. Herramienta de
trabajo: no forma parte de la plantilla.
"""
import re, pathlib
aqui = pathlib.Path(__file__).parent
inicio = (aqui / 'index.html').read_text(encoding='utf-8')
cab = inicio[inicio.index('<a class="saltar"'):inicio.index('</header>') + len('</header>')]
pie = inicio[inicio.index('<footer class="pie">'):inicio.index('</footer>') + len('</footer>')]
actual = {'villas': 'villas.html', 'villa': 'villas.html', 'contact': 'contact.html'}
for pagina in ('villas.html', 'villa.html', 'contact.html'):
    ruta = aqui / pagina
    texto = ruta.read_text(encoding='utf-8')
    plantilla = ruta.with_suffix('.fuente')
    if not plantilla.exists():
        plantilla.write_text(texto, encoding='utf-8')   # la primera vez guarda la fuente con los huecos
    fuente = plantilla.read_text(encoding='utf-8')
    clave = re.search(r'<!--CABECERA:(\w+)-->', fuente).group(1)
    destino = actual[clave]
    c = cab.replace(f'<a href="{destino}">', f'<a href="{destino}" aria-current="page">')
    salida = fuente.replace(f'<!--CABECERA:{clave}-->', c).replace('<!--PIE-->', pie)
    ruta.write_text(salida, encoding='utf-8')
    print(pagina, '<-', clave, '- enlaces marcados:', c.count('aria-current'))
