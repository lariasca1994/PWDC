# Portafolio · Luis F. A.

<p>
  <a href="https://lariasca1994.github.io/PWDC/"><img src="docs/demo-badge.svg" alt="Abrir el sitio en vivo" height="32"></a>
</p>

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

> 📘 **[Manual de usuario](docs/MANUAL.md)**: cómo recorrer el sitio y escribirme, con imágenes.

## Contenido

1. [Presentación](#1-presentación)
2. [Funcionalidades](#2-funcionalidades)
3. [Arquitectura](#3-arquitectura)
4. [Estructura del proyecto](#4-estructura-del-proyecto)
5. [Instalación para pruebas](#5-instalación-para-pruebas)
6. [Autor y licencia](#6-autor-y-licencia)

---

## 1. Presentación

Sitio personal estático (HTML, CSS y JavaScript, sin frameworks ni servidor): presentación
profesional, los proyectos del portafolio con enlace a sus demos y un formulario de contacto. Está
orientado a QA y validación de API REST, soporte y gestión de incidentes, y análisis y calidad de
datos.

**Sitio:** [lariasca1994.github.io/PWDC](https://lariasca1994.github.io/PWDC/)

## 2. Funcionalidades

- Presentación, servicios, proyectos (con filtros por área), forma de trabajo y habilidades.
- Formulario de contacto que arma el mensaje y abre WhatsApp: no envía datos a ningún servidor.
- Tema claro y oscuro recordado en el navegador, animaciones suaves y diseño adaptable a celular,
  tablet y computador; se instala como aplicación.

## 3. Arquitectura

<p align="center">
  <img src="docs/arquitectura.svg" alt="Diagrama de arquitectura: el sitio estático se sirve por HTTPS y todo corre en el navegador; el formulario abre WhatsApp con el mensaje listo" width="100%">
</p>

## 4. Estructura del proyecto

```
index.html        Página principal: presentación, servicios, proyectos y habilidades
contacto.html     Formulario de contacto
CSS/styles.css    Estilos y tema claro/oscuro
JS/sitio.js       Menú, filtros de proyectos y efectos
JS/tema.js        Tema claro/oscuro
JS/formulario.js  Arma el mensaje y abre WhatsApp
docs/             Manual de usuario y diagramas
```

## 5. Instalación para pruebas

No necesita instalación: abre `index.html` en el navegador o sírvelo en local con `npm start`.

## 6. Autor y licencia

**Luis F. A.** · [GitHub](https://github.com/lariasca1994) · [LinkedIn](https://linkedin.com/in/lfac1)

Contacto: Telegram [@lfac6](https://t.me/lfac6) · WhatsApp [@carraian160](https://wa.me/carraian160) ·
[ariascluisf@hotmail.com](mailto:ariascluisf@hotmail.com)

Licencia: MIT.
