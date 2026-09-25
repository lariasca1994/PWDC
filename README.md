# Portafolio — Luis Felipe Arias

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

Sitio personal, estático (HTML, CSS y JavaScript puro, sin frameworks ni
backend): presentación profesional, proyectos desplegados del portafolio y
un formulario de contacto real.

## Demo en vivo

**Sitio:** [lariasca1994.github.io/PWDC](https://lariasca1994.github.io/PWDC/)

## Enfoque

El sitio está orientado a los perfiles a los que apunto: QA / Pruebas
funcionales y validación de API REST, Soporte y Gestión de Incidentes (ITIL),
y Análisis y Calidad de Datos. La sección "Sobre mí" está organizada en
pestañas por esos tres perfiles, y cada proyecto listado indica su stack y
enlaza a una demo en vivo cuando está desplegado.

## Arquitectura

```mermaid
flowchart TB

    subgraph Clientes["👤 Cliente"]
        Browser["🌐 Navegador Web<br/>Acceso al portafolio"]
    end

    subgraph GitHubPages["▲ GitHub Pages"]
        subgraph Sitio["Sitio Estático"]
            Index["index.html<br/>Presentación · Proyectos · Habilidades"]
            Contacto["contacto.html<br/>Formulario de contacto"]
            CSS["CSS/styles.css<br/>Tema claro/oscuro · Estilos globales"]
            JS["JS/<br/>perfil.js · tema.js · formulario.js"]
        end
    end

    subgraph Mailto["📧 Cliente de correo"]
        Email["mailto:<br/>Abre el cliente de correo<br/>del visitante"]
    end

    %% ---- Flujo de datos ----
    Browser -->|HTTPS| Index
    Browser -->|HTTPS| Contacto
    Index --> CSS
    Index --> JS
    Contacto --> CSS
    Contacto --> JS
    JS -->|mailto:| Email

    %% ---- Colores de marca (Brand Colors) ----
    classDef html fill:#E34F26,stroke:#7F2A14,stroke-width:2px,color:#FFFFFF,rx:12,ry:12;
    classDef css fill:#1572B6,stroke:#0A3D66,stroke-width:2px,color:#FFFFFF,rx:12,ry:12;
    classDef javascript fill:#F7DF1E,stroke:#B8A400,stroke-width:2px,color:#000000,rx:12,ry:12;
    classDef github fill:#24292E,stroke:#000000,stroke-width:2px,color:#FFFFFF,rx:12,ry:12;
    classDef neutral fill:#F5F5F5,stroke:#CCCCCC,stroke-width:1px,color:#333333,rx:10,ry:10;

    class Browser neutral;
    class Index,Contacto html;
    class CSS css;
    class JS javascript;
    class Email neutral;

    %% ---- Estilos de subgráficos ----
    style Clientes fill:#FAFAFA,stroke:#DDDDDD,stroke-width:1px,rx:14,ry:14;
    style GitHubPages fill:#F0F0F0,stroke:#24292E,stroke-width:2px,stroke-dasharray:6 4,rx:16,ry:16;
    style Sitio fill:#FFF3E0,stroke:#E34F26,stroke-width:1px,rx:12,ry:12;
    style Mailto fill:#E8F5E9,stroke:#199900,stroke-width:2px,stroke-dasharray:4 3,rx:14,ry:14;
```

## Estructura

```
├── index.html          # página principal: presentación, proyectos, habilidades
├── contacto.html        # formulario de contacto
├── CSS/styles.css        # tema claro/oscuro, estilos de todo el sitio
└── JS/
    ├── perfil.js          # pestañas de la sección "Sobre mí"
    ├── tema.js             # alternador de tema claro/oscuro (localStorage)
    └── formulario.js        # arma un mailto: con el mensaje del formulario
```

## A qué se conecta

A nada. No requiere base de datos, backend ni API keys — es un sitio 100%
estático. El formulario de contacto no envía datos a ningún servidor: arma un
enlace `mailto:` con el mensaje y abre el cliente de correo del visitante.

## Cómo verlo

No necesita instalación. Basta con abrir `index.html` en el navegador, o
servirlo en local:

```bash
npm start
```

(usa `npx serve` para levantarlo en `http://localhost:8200`).

Para publicarlo: Settings → Pages → Branch: main → Save, en GitHub. Da una
URL pública en un par de minutos — la que está en uso hoy es
`https://lariasca1994.github.io/PWDC/`.