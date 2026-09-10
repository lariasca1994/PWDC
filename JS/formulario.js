// formulario.js
//
// CORRECCIÓN respecto a la versión anterior: el formulario original solo
// hacía console.log() del mensaje y no lo enviaba a ningún lado — era una
// simulación, no un envío real. Esta versión sí envía de verdad: arma un
// enlace "mailto:" con el asunto y el cuerpo ya llenos, y abre el cliente
// de correo del visitante (Gmail, Outlook, etc.) para que solo tenga que
// darle "Enviar" ahí. No requiere backend ni servicios externos.

const CORREO_CONTACTO = 'ariascluisf@gmail.com';

document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const mensaje = document.getElementById('mensaje').value;

    const asunto = encodeURIComponent(`Contacto desde el portafolio — ${nombre}`);
    const cuerpo = encodeURIComponent(
        `Nombre: ${nombre}\nCorreo de contacto: ${correo}\n\nMensaje:\n${mensaje}`
    );

    window.location.href = `mailto:${CORREO_CONTACTO}?subject=${asunto}&body=${cuerpo}`;

    document.getElementById('contactForm').reset();
});
