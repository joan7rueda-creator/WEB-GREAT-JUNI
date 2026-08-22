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

- **Fondo de la splash**: foto de campaña real de Great Juni tratada como acabado editorial (`assets/img/campaign_bg.jpg`): monocromo, unsharp mask para que palmeras y tablones lean nítidos, motion blur horizontal **solo** sobre la banda de los cuerpos, grano fino modulado por luminancia y viñeta. Encima, un velo (`.splash-scrim`) con caída radial en el centro que asegura el contraste del CTA sin apagar los bordes. Las pantallas Shop/Contact usan negro plano con la misma textura de grano (`.grain` + `.grain-blotch`) y viñeta.
- **Retícula**: logo, rail, metadata y footer comparten los mismos insets (`--grid-inset-x` / `--grid-inset-y` en `css/base.css`), de modo que todo se alinea al mismo eje en cualquier viewport.
- **Logo**: isotipo real de la marca (`assets/img/logo_great_juni.png`, negro sobre transparente), invertido a blanco por CSS (`filter: invert(1)`). Encaja en la esquina superior izquierda del marco, como primer elemento del rail superior — es firma de marca, no elemento hero.
- **Líneas**: 1px, blanco a baja opacidad (`--rule-color`), todas independientes entre sí — ninguna toca los bordes ni se encuentra con otra, de modo que no forman marco ni figura cerrada. Dos tienen función explícita: el *rail superior* (marcador cuadrado → conector → bloque de metadata) que parte del logo, y la *regla del footer* que separa el hero de la fila de metadata. Las otras tres son trazos sueltos (`.hero-rules`), dos verticales y una horizontal, en posiciones y longitudes distintas.
- **Metadata de marca**: bloques `.meta-tag` en monoespaciada de sistema (`--font-meta`), mayúsculas, tracking amplio y opacidad reducida, situados en los extremos de las líneas: `BIGSET7` al final del rail; `GJ · 7`, `BARCELONA` y `GETYOURS` en el footer (izquierda / centro / derecha). Deliberadamente por debajo del logo y del CTA en la jerarquía.
- **CTA**: un único botón "Shop Now" centrado — pill de borde 1px, fondo transparente, mayúsculas con letter-spacing amplio; en hover el fondo se rellena de blanco y el texto pasa a negro. Foco visible por teclado vía `:focus-visible`.
- **Tipografía**: Hanken Grotesk (Google Fonts) como familia principal (`--font-tech`), con fallback a sans de sistema; monoespaciada de sistema (`--font-meta`) reservada a la metadata técnica.
- **Parallax**: desplazamiento sutil (unos pocos píxeles) del contenido central y de los fondos (grano/foto, en dirección opuesta) según la posición del cursor, suavizado con interpolación por frame. Rail, marco y footer no se mueven: son la retícula fija. Se desactiva por completo si el usuario tiene activado `prefers-reduced-motion: reduce`.
- **Transición entre pantallas**: fade suave (fade-out → navegación → fade-in) al pulsar el CTA o "Volver", gestionado en `js/main.js` sin librerías externas.
- **Responsive**: tamaños con `clamp()` y unidades relativas a viewport; en pantallas estrechas la fila de metadata se reduce a sus dos extremos y el CTA pasa a ancho completo.
- **Dependencias externas**: solo la webfont de Google Fonts. No hay conexión a Shopify ni a ninguna API; el resto funciona como frontend estático.

## Próximas fases (fuera de alcance de esta entrega)

- Menú superior de navegación (ALL PRODUCTS, DROP 1, DROP 2, CONTACTO).
- Catálogo de productos / tienda real.
- Contenido real de la pantalla de contacto.
