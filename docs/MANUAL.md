# 📘 Manual de usuario · PWDC

Guía del sitio de portafolio: qué contiene, cómo funciona el formulario de contacto y qué datos
maneja. Para la parte técnica vuelve al [README](../README.md).

**Sitio:** [lariasca1994.github.io/PWDC](https://lariasca1994.github.io/PWDC/)

## Contenido

1. [Proyecto: objetivos y alcances](#1-proyecto-objetivos-y-alcances)
2. [Glosario](#2-glosario)
3. [Plataformas, base de datos y servicios](#3-plataformas-base-de-datos-y-servicios)
4. [Paso a paso](#4-paso-a-paso)
5. [Seguridad: tu información protegida](#5-seguridad-tu-información-protegida)
6. [Agradecimientos](#6-agradecimientos)

---

## 1. Proyecto: objetivos y alcances

### Objetivo

Sitio de portafolio personal hecho con HTML, CSS y JavaScript puro, publicado en GitHub Pages. No
tiene servidor, base de datos ni cuentas.

## 2. Glosario

Palabras técnicas que aparecen en este manual, explicadas en lenguaje simple.

| Término | Qué significa |
|---|---|
| **API** | Puerta de entrada de un programa para que otros programas le pidan o le envíen datos. |
| **Backend** | La parte de la aplicación que trabaja "detrás": procesa lo que envías y habla con la base de datos. |
| **Base de datos** | Lugar donde la aplicación guarda la información de forma ordenada y permanente. |
| **Cifrado / TLS / HTTPS** | Protección que codifica la información mientras viaja, para que nadie en el camino pueda leerla. |
| **Cookie** | Pequeño dato que el navegador guarda para recordar tu sesión en ese sitio. |
| **localStorage** | Espacio del navegador donde la aplicación guarda datos pequeños en tu equipo (por ejemplo, el tema o la sesión). |
| **Navegador** | Programa con el que abres páginas web: Chrome, Edge, Firefox, Safari. |
| **Nube** | Servidores de una empresa (Amazon, Microsoft, Google, Oracle…) donde la aplicación funciona sin depender de un computador propio. |
| **Servidor** | Computador en la nube que atiende las peticiones de la aplicación. |
| **Tema claro / oscuro** | Combinación de colores de la interfaz; puedes elegir la clara o la oscura. |

## 3. Plataformas, base de datos y servicios

Qué servicio de nube, base de datos o API usa el proyecto y para qué sirve cada uno.

| Plataforma | Tipo | Qué hace en el proyecto |
|---|---|---|
| ![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222222?style=for-the-badge&logo=githubpages&logoColor=white) | Nube | Sirve los archivos estáticos por HTTPS. |

## 4. Paso a paso

### 4.1 Inicio

![Página de inicio](img/manual/01-inicio.png)

Presenta el perfil y los proyectos. El botón de tema alterna entre claro y oscuro y recuerda tu
elección en este navegador.

### 4.2 Contacto

![Formulario de contacto con sus campos numerados](img/manual/02-contacto.png)

| # | Campo | Qué escribir |
|:-:|---|---|
| 1 | Nombre | Tu nombre |
| 2 | ¿Cómo te contacto? | Opcional: tu LinkedIn o usuario de Telegram, para poder responderte |
| 3 | Mensaje | Lo que quieres decir |
| 4 | Enviar por WhatsApp | Abre **WhatsApp** con el mensaje ya escrito; solo falta pulsar Enviar ahí |

Nombre y mensaje son obligatorios. También puedes escribir directo por WhatsApp o Telegram a
**@cortosvar26**.

## 5. Seguridad: tu información protegida

Tu confianza es lo primero: la plataforma solo pide los datos necesarios para funcionar, los protege y no los comparte con terceros. Esto es lo que se guarda y cómo se protege.

### Qué datos se guardan y dónde

| Dato | Dónde queda |
|---|---|
| Nombre, contacto y mensaje del formulario | **En ningún servidor.** El sitio arma el mensaje y abre WhatsApp; el envío lo haces tú desde WhatsApp y el sitio no lo guarda ni lo transmite |
| Preferencia de tema | `localStorage` de tu navegador |

### Cómo se protege tu información

Comprobado en el código (`JS/formulario.js`, `JS/tema.js`):

- **Sin recolección de datos:** no hay backend, base de datos, cookies de seguimiento ni servicios
  de terceros para el formulario.
- **Tú controlas el envío:** el mensaje sale desde tu propio WhatsApp y puedes revisarlo antes de
  enviarlo.
- **HTTPS** provisto por GitHub Pages.

## 6. Agradecimientos

A mi familia, por su apoyo incondicional, su paciencia y por creer en cada proyecto incluso cuando apenas era una idea. Este trabajo también es de ustedes.

Y a ti, que usas esta plataforma: cada prueba, comentario y sugerencia ayuda a que siga mejorando.
