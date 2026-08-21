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
  base.css             → Reset, variables, textura de grano, botón pill, transición de página
  landing.css          → Estilos específicos de la splash screen
  page.css             → Estilos específicos de las pantallas placeholder
js/
  main.js              → Parallax sutil + transición de página (fade) + fade-in al cargar
assets/
  fonts/               → (vacío) aquí van los archivos de Stencilia-A si se activa
  img/                 → (vacío) para futuros assets de imagen
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

- **Fondo**: negro (`#000`) con una capa de ruido generada por un filtro SVG (`feTurbulence`) aplicada como textura (`mix-blend-mode: overlay`), más una viñeta radial muy sutil. Todo en CSS, sin imágenes externas.
- **Monograma "GJ"**: es texto real (no imagen), con `aria-label="Great Juni"` para lectores de pantalla, tipografía bold geométrica (fallback de sistema: Arial Black / Helvetica Neue).
- **Botones (SHOP / CONTACT)**: pill/rounded-full, borde de 1px, fondo transparente, texto en mayúsculas con letter-spacing amplio. En hover, el fondo se rellena de blanco y el texto pasa a negro (transición suave). Foco visible por teclado vía `:focus-visible`.
- **Tipografía de botones**: preparada para **Stencilia-A**. Si añades los archivos de la fuente en `assets/fonts/` y descomentas el bloque `@font-face` en `css/base.css`, se activa automáticamente sin tocar el resto del CSS. Mientras tanto usa un fallback sans-serif geométrico en mayúsculas.
- **Parallax**: desplazamiento sutil (unos pocos píxeles) del contenido central y del fondo (en direcciones opuestas) según la posición del cursor, suavizado con interpolación por frame. Se desactiva por completo si el usuario tiene activado `prefers-reduced-motion: reduce`.
- **Transición entre pantallas**: fade suave (fade-out → navegación → fade-in) al pulsar SHOP, CONTACT o "Volver", gestionado en `js/main.js` sin librerías externas.
- **Responsive**: tamaños con `clamp()` y unidades relativas a viewport; en pantallas muy estrechas los botones pasan a apilarse en columna manteniendo la misma jerarquía visual (monograma → acciones).
- **Sin dependencias externas**: no hay conexión a Shopify, APIs ni CDNs. Todo funciona 100% offline como frontend estático.

## Próximas fases (fuera de alcance de esta entrega)

- Menú superior de navegación (ALL PRODUCTS, DROP 1, DROP 2, CONTACTO).
- Catálogo de productos / tienda real.
- Contenido real de la pantalla de contacto.
