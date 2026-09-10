# Portafolio — Luis Felipe Arias

Sitio personal simple (HTML/CSS/JS, sin frameworks ni backend) con mi
presentación, proyectos destacados y un formulario de contacto real.

## Qué se corrigió respecto a la versión anterior

- `index.html` y el formulario apuntaban a `CSS/styles.css` y
  `JS/script.js`, ninguno de los dos existía en el repositorio — el
  sitio nunca se vio con estilos ni funcionó la navegación.
- El botón "Enviar" del formulario no enviaba nada a ningún lado —
  solo hacía `console.log()` del mensaje. Ahora abre el cliente de
  correo del visitante con el mensaje ya redactado, dirigido a mi
  correo de contacto.
- El footer tenía enlaces vacíos (`href="#"`) a siete redes distintas,
  varias sin uso real. Se dejaron solo LinkedIn, GitHub y correo de
  contacto.
- Se quitaron los documentos personales que estaban comiteados en
  `practica_1/DOC/` (hoja de vida, certificados, PDFs de procesos de
  aplicación laboral) — no debían estar en un repositorio público.

## Estructura

```
├── index.html        # página principal
├── contacto.html      # formulario de contacto
├── CSS/styles.css
└── JS/formulario.js
```

## Cómo verlo

Es un sitio estático — no necesita instalar nada. Basta con abrir
`index.html` en el navegador, o publicarlo gratis con GitHub Pages:
Settings → Pages → Branch: main → Save. GitHub te da una URL pública
en un par de minutos.
