/*
input-action

Responsabilidad: 
  - Recoger un texto. Mantener el botón.
  - Deshabilitado mientras no haya nada escrito.
  - Limpiar el contenido del input cuando el botón se pulse.

Custom properties:
  - (X)

Eventos:
  - input-action-submit: al pulsar el botón.

Propiedades/atributos:
  - button-label
  - placeholder
  - type
*/

const template = document.createElement("template");
template.innerHTML = `
  <div class="input-action">
    <input />
    <button disabled></button>
  </div>
`

class InputAction extends HTMLElement {

  constructor() {
    super();

    this.buttonLabel = this.getAttribute("button-label") ?? "Add";
    this.placeholder = this.getAttribute("placeholder") ?? "Add Your Task";
    this.type = this.getAttribute("type") ?? "text";

    this.attachShadow({ mode: "open" })
  }

  //connectedCallback===================================================================
  connectedCallback() {
    const templateCopy = template.content.cloneNode(true);

    const input = templateCopy.querySelector("input")
    const button = templateCopy.querySelector("button");

    input.setAttribute("placeholder", this.placeholder)
    input.setAttribute("type", this.type)
    button.textContent = this.buttonLabel;

    //addoButton-click----------------------------------------------------------------------
    button.addEventListener("click", () => {
      const inputValue = input.value;

      const event = new CustomEvent("input-action-submit", {
        detail: inputValue
      })

      this.dispatchEvent(event)
      input.value = ""
      button.setAttribute("disabled", "")
    })


    //input---------------------------------------------------------------------------------
    input.addEventListener("input", (event) => {
      const currentValue = event.target.value;
      if (currentValue) {
        button.removeAttribute("disabled")
      } else {
        button.setAttribute("disabled", "")
      }
    })

    this.shadowRoot.appendChild(templateCopy)
  }
}

window.customElements.define("input-action", InputAction)
