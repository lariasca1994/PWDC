// animaciones.js
// Entrada escalonada de los bloques al hacer scroll y foco de luz que sigue
// el puntero sobre las tarjetas de proyecto. Si este script no carga, la
// clase "anim" igual queda en <html>, así que el CSS solo oculta lo que
// tiene la clase "revelar", que pone este mismo script.

(function () {
    "use strict";

    var reducido = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Grupos que entran uno tras otro: cada hijo recibe un retraso (--i).
    var grupos = [
        ["main > section > h2", false],
        ["#sobre-mi > p, .tabs-perfil, .tab-panel.active", true],
        [".proyecto-card", true],
        [".skills-grupo", true],
        ["form#contactForm, .contacto-directo", true]
    ];

    var objetivos = [];
    grupos.forEach(function (grupo) {
        var elementos = document.querySelectorAll(grupo[0]);
        elementos.forEach(function (el, i) {
            el.classList.add("revelar");
            if (grupo[1]) el.style.setProperty("--i", String(i % 6));
            objetivos.push(el);
        });
    });

    if (reducido || !("IntersectionObserver" in window)) {
        objetivos.forEach(function (el) { el.classList.add("visible"); });
    } else {
        var observador = new IntersectionObserver(function (entradas) {
            entradas.forEach(function (entrada) {
                if (!entrada.isIntersecting) return;
                entrada.target.classList.add("visible");
                observador.unobserve(entrada.target);
            });
        }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
        objetivos.forEach(function (el) { observador.observe(el); });
    }

    if (reducido) return;

    document.querySelectorAll(".proyecto-card").forEach(function (tarjeta) {
        tarjeta.addEventListener("pointermove", function (e) {
            var r = tarjeta.getBoundingClientRect();
            tarjeta.style.setProperty("--mx", (e.clientX - r.left) + "px");
            tarjeta.style.setProperty("--my", (e.clientY - r.top) + "px");
        });
    });
})();
