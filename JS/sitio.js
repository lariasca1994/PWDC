// sitio.js — interacción del sitio (sin dependencias). Si algo falla, la página se ve igual.
//  - Cabecera con fondo al desplazarse y luz bajo la sección activa.
//  - Barra inferior del celular con indicador de la sección activa.
//  - Filtros de proyectos por área.
//  - Aparición suave al desplazarse y cifras que cuentan.
//  - Registro del service worker (aplicación instalable; solo guarda la cáscara).
(function () {
    "use strict";
    var raiz = document.documentElement;
    var reducir = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Cabecera.
    var cabecera = document.getElementById("cabecera");
    function alDesplazar() {
        if (cabecera) cabecera.classList.toggle("con-fondo", window.scrollY > 12);
    }
    window.addEventListener("scroll", alDesplazar, { passive: true });
    alDesplazar();

    // Sección activa: menú superior y barra del celular.
    var menu = document.querySelector(".menu");
    var luz = menu && menu.querySelector(".menu__luz");
    var barra = document.querySelector(".barra-movil");
    var luzBarra = barra && barra.querySelector(".barra-movil__luz");
    function marcar(id) {
        if (menu) {
            var activo = null;
            menu.querySelectorAll("a").forEach(function (a) {
                var es = a.getAttribute("href") === "#" + id;
                a.classList.toggle("activo", es);
                if (es) activo = a;
            });
            if (luz) {
                if (activo) {
                    luz.style.opacity = "1";
                    luz.style.width = activo.offsetWidth - 20 + "px";
                    luz.style.transform = "translateX(" + (activo.offsetLeft + 10) + "px)";
                } else {
                    luz.style.opacity = "0";
                }
            }
        }
        if (barra) {
            var enBarra = null;
            barra.querySelectorAll("a[data-seccion]").forEach(function (a) {
                var es = a.getAttribute("data-seccion") === id;
                a.classList.toggle("activo", es);
                if (es) enBarra = a;
            });
            if (luzBarra) {
                if (enBarra) {
                    luzBarra.style.opacity = "1";
                    luzBarra.style.width = enBarra.offsetWidth + "px";
                    luzBarra.style.transform = "translateX(" + enBarra.offsetLeft + "px)";
                } else {
                    luzBarra.style.opacity = "0";
                }
            }
        }
    }
    var secciones = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
    if (secciones.length && "IntersectionObserver" in window) {
        var visibles = {};
        var observador = new IntersectionObserver(function (entradas) {
            entradas.forEach(function (e) { visibles[e.target.id] = e.isIntersecting ? e.intersectionRatio : 0; });
            var mejor = secciones.reduce(function (a, s) { return (visibles[s.id] || 0) > (visibles[a.id] || 0) ? s : a; }, secciones[0]);
            if (visibles[mejor.id]) marcar(mejor.id);
        }, { rootMargin: "-30% 0px -50% 0px", threshold: [0, .25, .5, 1] });
        secciones.forEach(function (s) { observador.observe(s); });
    }
    window.addEventListener("resize", function () {
        var a = document.querySelector(".menu a.activo, .barra-movil a.activo");
        if (a) marcar((a.getAttribute("href") || "").replace("#", "") || a.getAttribute("data-seccion"));
    });

    // Filtros de proyectos.
    var filtros = document.querySelectorAll(".filtro");
    var proyectos = document.querySelectorAll(".proyecto");
    filtros.forEach(function (boton) {
        boton.addEventListener("click", function () {
            var area = boton.getAttribute("data-filtro");
            filtros.forEach(function (b) {
                var es = b === boton;
                b.classList.toggle("activo", es);
                b.setAttribute("aria-selected", String(es));
            });
            var orden = 0;
            proyectos.forEach(function (p) {
                var mostrar = area === "todos" || p.getAttribute("data-area") === area;
                p.classList.toggle("oculto", !mostrar);
                if (mostrar && !reducir) {
                    p.style.animation = "none";
                    void p.offsetWidth;
                    p.style.animation = "entra .45s " + orden++ * 40 + "ms cubic-bezier(.2,.8,.2,1) backwards";
                }
            });
        });
    });

    // Aparición al desplazarse.
    var revelables = document.querySelectorAll(".seccion__cabeza, .servicio, .proyecto, .proceso li, .habilidad, .cifras, .llamado__fila, .formulario, .contacto-btn");
    if ("IntersectionObserver" in window && !reducir) {
        var vistos = new IntersectionObserver(function (entradas) {
            entradas.forEach(function (e) {
                if (!e.isIntersecting) return;
                e.target.classList.add("visible");
                vistos.unobserve(e.target);
                if (e.target.classList.contains("cifras")) contarCifras(e.target);
            });
        }, { rootMargin: "0px 0px -8% 0px" });
        revelables.forEach(function (el) {
            var hermanos = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
            el.style.setProperty("--retraso", Math.min(hermanos, 6) * 70 + "ms");
            el.classList.add("revelar");
            vistos.observe(el);
        });
    }

    // Cifras que cuentan desde cero (el texto final es el del HTML).
    function contarCifras(caja) {
        caja.querySelectorAll("[data-contar]").forEach(function (n) {
            var destino = parseInt(n.getAttribute("data-contar"), 10);
            if (!destino) return;
            var inicio = performance.now();
            (function paso(t) {
                var avance = Math.min(1, (t - inicio) / 900);
                n.textContent = String(Math.round(destino * (1 - Math.pow(1 - avance, 3))));
                if (avance < 1) requestAnimationFrame(paso);
            })(inicio);
        });
    }

    // Transiciones entre páginas: una transición cancelada no deja error en la consola.
    function calmar(t) { if (!t) return; [t.ready, t.finished, t.updateCallbackDone].forEach(function (p) { if (p) p.catch(function () {}); }); }
    window.addEventListener("pageswap", function (e) { calmar(e.viewTransition); });
    window.addEventListener("pagereveal", function (e) { calmar(e.viewTransition); });

    if ("serviceWorker" in navigator && window.isSecureContext) {
        window.addEventListener("load", function () { navigator.serviceWorker.register("sw.js").catch(function () {}); });
    }
    raiz.classList.add("listo");
})();
