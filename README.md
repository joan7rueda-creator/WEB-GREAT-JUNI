# Great Juni — Web

Frontend estático (HTML/CSS/JS vanilla, sin frameworks ni build step) para la web de Great Juni.

Por ahora solo está construida la **pantalla de entrada (landing/splash)**, con dos placeholders de navegación (Shop / Contact). El resto de secciones (tienda real, menú superior, contacto real, etc.) se añadirán en fases posteriores sobre esta misma base.

## Estructura

```
index.html            → Landing / splash screen (pantalla de entrada)
pages/
  shop.html            → Placeholder de la sección Shop
  contact.html          → Placeholder de la sección Contact
css/
  base.css             → Reset, variables (colores/tipografía), grano, marco técnico, botón pill, transición de página
  landing.css          → Estilos específicos de la splash screen (topbar, fondo de campaña, scrim, brandmark)
  page.css             → Estilos específicos de las pantallas placeholder
js/
  main.js              → Parallax sutil + transición de página (fade) + fade-in al cargar
assets/
  fonts/               → (vacío) libre para futuras webfonts si se decide añadir alguna
  img/
    logo_great_juni.png    → Isotipo real de la marca (negro sobre transparente)
    campaign_bg.jpg        → Foto de campaña tratada (B/N, grano, motion blur, viñeta) usada como fondo de la splash
    campaign_source.jpg    → Foto de campaña original, sin tratar (por si hay que reprocesarla)
```

## Cómo verlo en local

No requiere build ni dependencias. Basta con servir la carpeta como archivos estáticos:

```bash
# Opción 1: Python
python3 -m http.server 8000

# Opción 2: Node (npx)
npx serve .
```

Y abrir `http://localhost:8000` en el navegador.

> Abrir `index.html` directamente con doble clic (`file://`) también funciona, ya que no hay llamadas a APIs ni módulos ES que requieran un servidor.

## Detalles de implementación

- **Fondo de la splash**: foto de campaña real de Great Juni, tratada en blanco y negro (grano, motion blur direccional sobre las figuras, viñeta — ver `assets/img/campaign_bg.jpg`), con un velo oscuro (`.splash-scrim`) encima para garantizar contraste. Las pantallas Shop/Contact usan negro plano con la misma textura de grano (`.grain` + `.grain-blotch`) y viñeta.
- **Logo**: isotipo real de la marca (`assets/img/logo_great_juni.png`, negro sobre transparente), invertido a blanco por CSS (`filter: invert(1)`). Vive en una barra superior fija (`.topbar`), pequeño, a modo de firma de marca — no es el elemento hero.
- **"Great Juni®" y botones (SHOP / CONTACT)**: centrados en pantalla. Los botones son pill/rounded-full, borde de 1px, fondo transparente, texto en mayúsculas con letter-spacing amplio; en hover el fondo se rellena de blanco y el texto pasa a negro. Foco visible por teclado vía `:focus-visible`.
- **Tipografía**: pila monospace de sistema (`--font-tech` en `css/base.css`: `ui-monospace`, SF Mono, Cascadia Mono, Segoe UI Mono, Consolas, Liberation Mono, Menlo…), sin webfonts externas, para un aire técnico/terminal consistente en toda la web (botones, textos, títulos).
- **Marco técnico**: líneas finas horizontales y verticales (`.tech-frame` en `css/base.css`) enmarcando cada pantalla, puramente decorativas, reforzando el aire técnico/blueprint.
- **Parallax**: desplazamiento sutil (unos pocos píxeles) del contenido central y de los fondos (grano/foto, en dirección opuesta) según la posición del cursor, suavizado con interpolación por frame. El logo de la topbar no se mueve (es un elemento de navegación fijo). Se desactiva por completo si el usuario tiene activado `prefers-reduced-motion: reduce`.
- **Transición entre pantallas**: fade suave (fade-out → navegación → fade-in) al pulsar SHOP, CONTACT o "Volver", gestionado en `js/main.js` sin librerías externas.
- **Responsive**: tamaños con `clamp()` y unidades relativas a viewport; en pantallas muy estrechas los botones pasan a apilarse en columna manteniendo la misma jerarquía visual.
- **Sin dependencias externas**: no hay conexión a Shopify, APIs ni CDNs. Todo funciona 100% offline como frontend estático.

## Próximas fases (fuera de alcance de esta entrega)

- Menú superior de navegación (ALL PRODUCTS, DROP 1, DROP 2, CONTACTO).
- Catálogo de productos / tienda real.
- Contenido real de la pantalla de contacto.
