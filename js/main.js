/**
 * Great Juni — comportamiento compartido entre pantallas:
 * - Parallax sutil ligado al cursor (desactivado con prefers-reduced-motion).
 * - Transición de página con fade suave entre pantallas.
 * - Fade-in al cargar cada pantalla.
 */
(function () {
  'use strict';

  var reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  function initParallax() {
    var stage = document.querySelector('[data-parallax-stage]');
    var grainLayers = document.querySelectorAll('[data-parallax-grain]');

    if (!stage || reduceMotionQuery.matches) {
      return;
    }

    var STAGE_RANGE = 14; // px máximos de desplazamiento del contenido principal
    var GRAIN_RANGE = 6; // px máximos de desplazamiento del fondo (dirección opuesta)
    var EASE = 0.07; // suavizado del seguimiento (menor = más suave)

    var targetX = 0;
    var targetY = 0;
    var currentX = 0;
    var currentY = 0;
    var frameRequested = false;

    function onPointerMove(event) {
      targetX = event.clientX / window.innerWidth - 0.5;
      targetY = event.clientY / window.innerHeight - 0.5;
    }

    function onPointerLeave() {
      targetX = 0;
      targetY = 0;
    }

    function tick() {
      currentX += (targetX - currentX) * EASE;
      currentY += (targetY - currentY) * EASE;

      stage.style.transform =
        'translate3d(' + (currentX * STAGE_RANGE).toFixed(2) + 'px, ' + (currentY * STAGE_RANGE).toFixed(2) + 'px, 0)';

      var grainTransform =
        'translate3d(' + (-currentX * GRAIN_RANGE).toFixed(2) + 'px, ' + (-currentY * GRAIN_RANGE).toFixed(2) + 'px, 0)';
      grainLayers.forEach(function (layer) {
        layer.style.transform = grainTransform;
      });

      frameRequested = false;
      requestAnimationFrame(loop);
    }

    function loop() {
      if (!frameRequested) {
        frameRequested = true;
        tick();
      }
    }

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('mouseleave', onPointerLeave, { passive: true });
    requestAnimationFrame(loop);
  }

  function initPageTransitions() {
    var body = document.body;

    // Fade-in al entrar en la pantalla.
    requestAnimationFrame(function () {
      body.classList.remove('is-entering');
    });

    var links = document.querySelectorAll('a[data-transition]');

    links.forEach(function (link) {
      link.addEventListener('click', function (event) {
        var href = link.getAttribute('href');

        if (!href || link.target === '_blank' || event.metaKey || event.ctrlKey) {
          return;
        }

        event.preventDefault();

        if (body.classList.contains('is-leaving')) {
          return;
        }

        body.classList.add('is-leaving');

        var navigated = false;
        var navigate = function () {
          if (navigated) {
            return;
          }
          navigated = true;
          window.location.href = href;
        };

        body.addEventListener(
          'transitionend',
          function onEnd(event) {
            if (event.propertyName === 'opacity') {
              body.removeEventListener('transitionend', onEnd);
              navigate();
            }
          }
        );

        // Red de seguridad por si transitionend no llega a dispararse.
        window.setTimeout(navigate, 500);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initParallax();
    initPageTransitions();
  });
})();
