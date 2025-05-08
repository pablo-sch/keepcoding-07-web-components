/*
  1- Create a digital-clock component.
  2- Each second, we must calculate the time and update the component HTML
*/

const template = document.createElement("template");
template.innerHTML = `

<style>

h1 {
  color: var(--digital-clock-color, coral);
}

</style>

<div>
  <h1></h1>
</div>`;

class DigitalClock extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open"});
  }

  connectedCallback() {
    this.showCurrentTime()

    setInterval(() => {
      this.shadowRoot.querySelector('h1').textContent = this.getCurrentTime();
    }, 1000)
  }

  showCurrentTime() {
    const templateCopy = template.content.cloneNode(true)
    const now = this.getCurrentTime()
    templateCopy.querySelector('h1').textContent = now;
    this.shadowRoot.appendChild(templateCopy)
  }

  getCurrentTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    return `${hours} : ${minutes} : ${seconds}`
  }
}

window.customElements.define("digital-clock", DigitalClock)

// obtener la hora
// cada segundo, tendremos que volver a calcular la hora
// mostrar la hora
