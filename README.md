# Bildungsspuren

Sitio personal bilingüe (alemán y español) sobre educación, aprendizaje, experiencias y desarrollo profesional en Alemania.

## Estructura

- `index.html`, `ueber-mich.html`, `themen.html`, `blog.html`, `warum-bildungsspuren.html`: páginas en alemán.
- `es/`: versiones en español.
- `assets/css/styles.css`: hoja de estilos común. Las reglas de cada página están aisladas mediante una clase en `body`.
- `assets/js/main.js`: menú móvil accesible y animaciones de aparición al desplazarse.
- `bildungsspuren-social.jpg`: imagen social.
- `CNAME`, `robots.txt`, `sitemap.xml`: configuración del dominio y del rastreo.

## Criterios técnicos

- HTML, CSS y JavaScript nativos, sin frameworks ni dependencias de ejecución.
- Rutas actuales y metadatos SEO conservados.
- El contenido permanece visible si JavaScript no está disponible.
- Las animaciones respetan `prefers-reduced-motion`.
- Los recursos de las páginas en `es/` usan rutas relativas a `../assets/`.

## Publicación

El sitio está preparado para GitHub Pages. Los cambios de esta rama deben revisarse antes de integrarse en `main`.
