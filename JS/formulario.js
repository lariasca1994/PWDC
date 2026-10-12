// formulario.js
//
// El formulario no envía datos a ningún servidor: arma el mensaje con el
// nombre, el contacto (opcional) y el texto, y abre WhatsApp con ese mensaje
// ya escrito para que el visitante solo tenga que darle "Enviar". No requiere
// backend ni servicios externos, y no publica ningún número de teléfono.

const WHATSAPP_USUARIO = 'cortosvar26';

document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const contacto = document.getElementById('contacto').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    const texto = [
        `Hola, soy ${nombre} (te escribo desde tu portafolio).`,
        contacto ? `Mi contacto: ${contacto}` : '',
        '',
        mensaje
    ].filter((linea, i) => linea !== '' || i === 2).join('\n');

    window.open(`https://wa.me/${WHATSAPP_USUARIO}?text=${encodeURIComponent(texto)}`, '_blank', 'noopener');

    document.getElementById('contactForm').reset();
});
