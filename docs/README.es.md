# Entrega del Proyecto de Web Components

## Selecciona tu idioma

- 🇺🇸 [Inglés](README.md)
- 🇩🇪 [Alemán](README.de.md)

## Conocimientos trabajados

### ¿Qué son los Web Components?

Los Web Components son una colección de tecnologías nativas del navegador que permiten crear elementos personalizados reutilizables, con un comportamiento y estilo propios, encapsulados y portables entre distintos frameworks o proyectos.

---

### Problemas que resuelven en el desarrollo web

- **Interoperabilidad:** Permiten usar componentes sin importar el framework (React, Vue, Angular, etc.).
- **Aislamiento:** Encapsulan estilos y lógica, evitando conflictos con el resto de la aplicación.
- **Reutilización:** Facilitan compartir y reutilizar componentes en múltiples proyectos.
- **Encapsulación:** Separan claramente la lógica y el estilo interno del componente del exterior.

---

### Aplicación al paradigma actual

- **DRY (Don’t Repeat Yourself):** Se evita la duplicación de código creando componentes reutilizables.
- **COP (Component Oriented Programming):** Favorecen un enfoque modular basado en componentes.
- **SRP (Single Responsibility Principle):** Cada componente debe tener una única función o responsabilidad clara.

---

### Estándares involucrados

- **HTML Templates:** Permiten definir fragmentos de HTML reutilizable sin que se rendericen automáticamente.
- **Custom Elements:** Permiten registrar nuevas etiquetas HTML personalizadas con su propio comportamiento.
- **Shadow DOM:** Encapsula el DOM y CSS del componente, evitando interferencias externas.
- **ES Modules:** Permiten importar y exportar código JavaScript de forma modular y reutilizable.

---

### Ciclo de vida de un Web Component

- `constructor()` – Se ejecuta al instanciar el componente. Ideal para inicializar propiedades.
- `connectedCallback()` – Se llama cuando el componente se agrega al DOM. Aquí suele ir la lógica de renderizado.
- `disconnectedCallback()` – Se ejecuta cuando el componente se elimina del DOM. Ideal para limpieza de eventos.
- `adoptedCallback()` – Se llama cuando el nodo es movido a un nuevo documento.
- `attributeChangedCallback()` – Detecta cambios en atributos observados, permitiendo reaccionar dinámicamente.

---

### Planteamiento de un Web Component

- **Responsabilidad:** Cada componente debe cumplir una única función o propósito.
- **Custom Properties:** Uso de variables CSS para permitir estilos personalizados desde fuera.
- **Atributos:** Permiten configurar el comportamiento o apariencia del componente mediante HTML.
- **Eventos:** Los componentes deben poder emitir y reaccionar a eventos para comunicarse con el entorno.

### Descripción del proyecto

Este proyecto tiene como objetivo ejercitar la **identificación técnica del problema**, también conocida como **componentización**, con el fin de detectar y desambiguar los posibles componentes que puede tener la solución planteada.

Se buscará aplicar los conceptos trabajados previamente, como la reutilización, el aislamiento, la encapsulación y la responsabilidad única, con el propósito de diseñar una estructura de componentes coherente y alineada con los principios de desarrollo moderno.

## Tecnologías utilizadas

- **HTML**: Para la estructuración del contenido y la creación de la estructura de la página web.
- **CSS**: Para el diseño y estilo visual de la página, asegurando una experiencia de usuario atractiva y coherente.
- **JavaScript**: Para agregar interactividad y características dinámicas al sitio web, mejorando la experiencia del usuario con funcionalidades como validación de formularios, animaciones y manejo de eventos.

Tailwind: Genera clases de utilidad para estilos
PostCSS: Procesa el CSS generado por Tailwind
Parcel: Junta todo: HTML, JS, CSS (procesado con PostCSS)

## Instrucciones de instalación y uso

### Requisitos de software
### Descripción de programas
### Pasos para utilizar este proyecto
### Notas

## Sin contribuciones ni licencias

Este proyecto no cuenta con contribuciones externas ni licencias.
## Vista previa del proyecto
...