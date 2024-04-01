// formulario.js

function enviarCorreo() {
    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const mensaje = document.getElementById('mensaje').value;

    // Crear el cuerpo del correo
    const cuerpoCorreo = `Nombre: ${nombre}\nCorreo Electrónico: ${correo}\nMensaje: ${mensaje}`;

    // Simular el envío del correo electrónico
    // (en un entorno real, esta lógica debe ejecutarse en el servidor)
    console.log("Enviando correo:", cuerpoCorreo);

    // Lógica adicional según sea necesario

    // Limpiar el formulario después del envío
    document.getElementById('contactForm').reset();
}