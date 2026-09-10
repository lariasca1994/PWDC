// perfil.js
// Controla el menú de pestañas de la sección "Sobre mí" (QA / Datos / Soporte).
// Todo el contenido de las tres pestañas ya está en el HTML (no se genera
// dinámicamente) — este script solo muestra/oculta, así que sigue
// funcionando y siendo legible aunque JavaScript falle en cargar.

document.querySelectorAll('.tab-btn').forEach((boton) => {
    boton.addEventListener('click', () => {
        const tabId = boton.dataset.tab;

        document.querySelectorAll('.tab-btn').forEach((b) => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
        });
        boton.classList.add('active');
        boton.setAttribute('aria-selected', 'true');

        document.querySelectorAll('.tab-panel').forEach((panel) => {
            panel.classList.remove('active');
        });
        document.getElementById(`tab-${tabId}`).classList.add('active');
    });
});
