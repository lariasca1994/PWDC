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

    // Tarjetas: luz que sigue al cursor e inclinación 3D suave (solo con mouse y sin "reducir movimiento").
    var finas = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (finas && !reducir) {
        document.querySelectorAll(".servicio, .proyecto, .habilidad, .proceso li, .contacto-btn, .cifras > div").forEach(function (t) {
            var inclina = !t.classList.contains("contacto-btn") && t.parentElement && !t.parentElement.classList.contains("cifras");
            var cuadro = null;
            t.addEventListener("pointerenter", function () { cuadro = t.getBoundingClientRect(); });
            t.addEventListener("pointermove", function (e) {
                if (!cuadro) cuadro = t.getBoundingClientRect();
                var x = (e.clientX - cuadro.left) / cuadro.width, y = (e.clientY - cuadro.top) / cuadro.height;
                t.style.setProperty("--mx", (x * 100).toFixed(1) + "%");
                t.style.setProperty("--my", (y * 100).toFixed(1) + "%");
                if (inclina) t.style.transform = "perspective(900px) rotateX(" + ((0.5 - y) * 5).toFixed(2) + "deg) rotateY(" + ((x - 0.5) * 6).toFixed(2) + "deg) translateY(-6px)";
            });
            t.addEventListener("pointerleave", function () { cuadro = null; t.style.transform = ""; });
        });
    }

    // Ilustración de la portada: profundidad con el mouse, con el dedo o al inclinar la tablet/celular;
    // un toque repite la animación de entrada.
    var ilus = document.querySelector(".portada__ilustracion");
    if (ilus && !reducir) {
        var fijar = function (x, y) {
            ilus.style.setProperty("--px", Math.max(-1, Math.min(1, x)).toFixed(3));
            ilus.style.setProperty("--py", Math.max(-1, Math.min(1, y)).toFixed(3));
        };
        ilus.addEventListener("pointermove", function (e) {
            var r = ilus.getBoundingClientRect();
            fijar((e.clientX - r.left) / r.width * 2 - 1, (e.clientY - r.top) / r.height * 2 - 1);
        });
        ilus.addEventListener("pointerleave", function () { fijar(0, 0); });
        ilus.addEventListener("pointerup", function (e) {
            if (e.pointerType === "mouse") return;
            ilus.classList.add("repite");
            void ilus.offsetWidth;
            ilus.classList.remove("repite");
            setTimeout(function () { fijar(0, 0); }, 900);
        });
        if (!finas && "DeviceOrientationEvent" in window) {
            var base = null;
            window.addEventListener("deviceorientation", function (e) {
                if (e.beta == null || e.gamma == null) return;
                var horizontal = screen.orientation ? /landscape/.test(screen.orientation.type) : Math.abs(window.orientation || 0) === 90;
                var b = horizontal ? e.gamma : e.beta, g = horizontal ? -e.beta : e.gamma;
                if (!base) base = { b: b, g: g };
                fijar((g - base.g) / 25, (b - base.b) / 25);
            }, { passive: true });
            var reiniciar = function () { base = null; fijar(0, 0); };
            if (screen.orientation) screen.orientation.addEventListener("change", reiniciar);
            else window.addEventListener("orientationchange", reiniciar);
        }
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
