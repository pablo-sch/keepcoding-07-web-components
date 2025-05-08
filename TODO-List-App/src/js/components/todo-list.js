/*
todo-list

Responsabilidad: 
  - Reaccionar a cuando se quiere.
  - Crear un nuevo item y crearlo.
  - Borrar elemen.tos y gestionar todo's completados.

Custom properties:
  - (X)

Eventos:
  - (X)

Propiedades:
  - title
*/

const template = document.createElement("template");
template.innerHTML = `
  <div class="todo-list">
    <input-action></input-action>
    <div class="todo-items-wrapper"></div>
    <button>Clean Completed Tasks</button>
  </div>
`

class TodoList extends HTMLElement {

  constructor() {
    super();

    this.attachShadow({ mode: "open" })
  }

  //connectedCallback===================================================================
  connectedCallback() {
    const templateCopy = template.content.cloneNode(true);

    const inputAction = templateCopy.querySelector("input-action");
    this.cleanBtn = templateCopy.querySelector("button");

    this.manageCleanButton()

    //input-action-submit-------------------------------------------------------------------
    inputAction.addEventListener("input-action-submit", (event) => {
      const text = event.detail;

      const currentTodos = this.getStoredTodos()
      const newTodo = {
        text: text,
        isCompleted: false,
        id: crypto.randomUUID()
      }
      currentTodos.push(newTodo)


      /* ______________________________________________________________ */
      localStorage.setItem("todos", JSON.stringify(currentTodos));
      /* ______________________________________________________________ */

      this.addTodo(newTodo)
    })

    //cleanBtn-click------------------------------------------------------------------------
    this.cleanBtn.addEventListener("click", () => {
      const currentTodos = this.getStoredTodos()
      const cleanTodos = currentTodos.filter(todo => !todo.isCompleted)

      /* ______________________________________________________________ */
      localStorage.setItem("todos", JSON.stringify(cleanTodos))
      /* ______________________________________________________________ */

      this.shadowRoot.querySelectorAll('todo-item[is-checked]').forEach(item => {
        item.remove()
      })

      this.manageCleanButton()
    })

    this.shadowRoot.appendChild(templateCopy)
    this.showStoredTodos();
  }

  //getStoredTodos======================================================================
  getStoredTodos() {
    /* ______________________________________________________________ */
    const todos = localStorage.getItem("todos");
    /* ______________________________________________________________ */

    return todos ? JSON.parse(todos) : [];
  }

  //showStoredTodos=====================================================================
  showStoredTodos() {
    const todos = this.getStoredTodos();

    todos.forEach(todo => {
      this.addTodo(todo)
    });
  }

  //manage-clean-button=================================================================
  manageCleanButton() {
    const currentTodos = this.getStoredTodos();
    const isAnyChecked = currentTodos.some(todo => todo.isCompleted)
    isAnyChecked ? this.cleanBtn.removeAttribute("disabled") : this.cleanBtn.setAttribute("disabled", "")
  }

  //addTodo=============================================================================
  addTodo(todo) {
    const newTodoItem = document.createElement("todo-item");
    this.shadowRoot.querySelector(".todo-items-wrapper").appendChild(newTodoItem)
    newTodoItem.setAttribute("text", todo.text);
    newTodoItem.setAttribute("id", todo.id);
    if (todo.isCompleted) {
      newTodoItem.setAttribute("is-checked", "");
    }

    //action-item-status-update-------------------------------------------------------------
    newTodoItem.addEventListener("action-item-status-update", (event) => {
      const currentTodos = this.getStoredTodos();
      const updatedTodos = currentTodos.map(todo => {
        if (todo.id === event.detail.id) {
          todo.isCompleted = event.detail.isChecked
        }
        return todo;
      });

      /* ______________________________________________________________ */
      localStorage.setItem("todos", JSON.stringify(updatedTodos))
      /* ______________________________________________________________ */

      this.manageCleanButton()
    })

    //action-item-remove--------------------------------------------------------------------
    newTodoItem.addEventListener("action-item-remove", (event) => {
      const idToRemove = event.detail.id;
      const currentTodos = this.getStoredTodos();
      const updatedTodos = currentTodos.filter(todo => todo.id !== idToRemove)

      /* ______________________________________________________________ */
      localStorage.setItem("todos", JSON.stringify(updatedTodos))
      /* ______________________________________________________________ */

      this.manageCleanButton()
    })
  }
}

window.customElements.define("todo-list", TodoList)