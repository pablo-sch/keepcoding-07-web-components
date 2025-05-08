/*
todo-item

Responsabilidad: 
  - Pintar un texto a modo de tarea pendiente.
  - Borrarlo si se pulsa el botón de borrar.
  - Modificar la apariencia cuando esté completada.

Custom properties:
  - (X)

Eventos:
  - action-item-remove
  - action-item-status-update
	
Propiedades:
  - text
  - isChecked
  - buttonLabel
*/

const template = document.createElement("template");
template.innerHTML = `

<style>
input:checked + span {
  text-decoration: line-through;
}
</style>

  <div class="todo-item">
    <input type="checkbox" />
    <span></span>
    <button></button>
  </div>
`

class TodoItem extends HTMLElement {

  constructor() {
    super();

    this.text = this.getAttribute("text") ?? "Empty Task";
    this.isChecked = this.hasAttribute("is-checked");
    this.buttonLabel = this.getAttribute("button-label") ?? "Delete";
    this._id = this.getAttribute("id") ?? null;

    this.attachShadow({ mode: "open" })
  }

  //connectedCallback===================================================================
  connectedCallback() {
    const templateCopy = template.content.cloneNode(true);

    const checkbox = templateCopy.querySelector("input");
    const removeButton = templateCopy.querySelector("button");
    const text = templateCopy.querySelector("span")

    text.textContent = this.text;
    checkbox.checked = this.isChecked;
    removeButton.textContent = this.buttonLabel;

    //removeButton-click--------------------------------------------------------------------
    removeButton.addEventListener("click", () => {
      const event = new CustomEvent("action-item-remove", {
        detail: {
          id: this._id
        }
      });
      this.dispatchEvent(event)

      this.remove();
    })

    //checkbox-changue----------------------------------------------------------------------
    checkbox.addEventListener("change", () => {
      const event = new CustomEvent("action-item-status-update", {
        detail: {
          isChecked: checkbox.checked,
          text: text.textContent,
          id: this._id
        }
      })

      checkbox.checked ? this.setAttribute("is-checked", "") : this.removeAttribute("is-checked")


      this.dispatchEvent(event)
    })

    this.shadowRoot.appendChild(templateCopy)
  }

  //observedAttributes==================================================================
  static get observedAttributes() {
    return ["text", "is-checked", "id"]
  }

  //attributeChangedCallback============================================================
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "text") {
      this.shadowRoot.querySelector("span").textContent = newValue
    }

    if (name === "is-checked") {
      this.shadowRoot.querySelector("input").checked = this.hasAttribute("is-checked")
    }

    if (name === "id" && oldValue === null) {
      this._id = newValue;
    }
  }
}

window.customElements.define("todo-item", TodoItem)
