# Web Components Project Submission

`>` **KeepCoding Projects - Web 18:** 📁 [repos-kc-web-18.md](https://github.com/pablo-sch/pablo-sch/blob/main/docs/repos-kc-web-18.md)

`>` **Select your Language:** [Spanish](README.es.md) 🔄 [German](README.de.md)

<!-- ------------------------------------------------------------------------------------------- -->

## Project Objective

This project aims to practice **technical problem identification**, also known as **componentization**, in order to detect and disambiguate the possible components that the proposed solution might have.

The goal is to apply the concepts previously worked on—such as reuse, isolation, encapsulation, and single responsibility—in order to design a coherent component structure aligned with modern development principles.

<!-- ------------------------------------------------------------------------------------------- -->

## Learned and Applied Knowledge

### 1. What Are Web Components?

Web Components are a set of browser-native technologies that allow you to create reusable, custom elements with their own behavior and styling, encapsulated and portable across different frameworks or projects.

### 2. Problems They Solve in Web Development

- **Interoperability:** Enable using components regardless of the framework (React, Vue, Angular, etc.).
- **Isolation:** Encapsulate styles and logic, preventing conflicts with the rest of the application.
- **Reusability:** Make it easy to share and reuse components across multiple projects.
- **Encapsulation:** Clearly separate the component’s internal logic and styling from the outside.

### 3. Application to the Current Paradigm

- **DRY (Don’t Repeat Yourself):** Avoid code duplication by creating reusable components.
- **COP (Component Oriented Programming):** Promote a modular, component-based approach.
- **SRP (Single Responsibility Principle):** Ensure each component has a single, clear function or responsibility.

### 4. Involved Standards

- **HTML Templates:** Define reusable chunks of HTML without rendering them automatically.
- **Custom Elements:** Register new custom HTML tags with their own behavior.
- **Shadow DOM:** Encapsulate the component’s DOM and CSS, preventing external interference.
- **ES Modules:** Import and export JavaScript code in a modular, reusable way.

### 5. Web Component Lifecycle

- `constructor()` – Runs when the component is instantiated. Ideal for initializing properties.
- `connectedCallback()` – Called when the component is added to the DOM. Typically used for rendering logic.
- `disconnectedCallback()` – Runs when the component is removed from the DOM. Ideal for cleaning up event listeners.
- `adoptedCallback()` – Called when the node is moved to a new document.
- `attributeChangedCallback()` – Detects changes in observed attributes, allowing dynamic reactions.

### 6. Designing a Web Component

- **Responsibility:** Each component must fulfill a single, clear purpose.
- **Custom Properties:** Use CSS variables to allow external style customization.
- **Attributes:** Configure component behavior or appearance via HTML attributes.
- **Events:** Components should be able to emit and respond to events to communicate with their environment.

<!-- ------------------------------------------------------------------------------------------- -->

## Project Details

### 1. InputAction

- **Responsibility**

  - Capture user text and display a button.
  - Keep the button disabled if the field is empty.
  - On click, emit `input-action-submit` with the entered text and clear the input.

- **Structure (Shadow DOM)**
  - Contains an `<input>` and a `<button>`.
  - Attributes:
    - `button-label` (button text, default “Add”)
    - `placeholder` (input placeholder text, default “Add Your Task”)
    - `type` (input type, default “text”)

### 2. TodoItem

- **Responsibility**

  - Display a task with a checkbox, text, and delete button.
  - If checked, the text appears crossed out.
  - On checkbox change, emit `action-item-status-update` with `{ id, text, isChecked }`.
  - On delete button click, emit `action-item-remove` with `{ id }` and remove itself from the DOM.

- **Structure (Shadow DOM)**

  - Contains `<input type="checkbox">`, a `<span>` for the text, and a `<button>`.
  - Attributes:
    - `text` (task text)
    - `is-checked` (marks if it’s completed)
    - `button-label` (button text, default “Delete”)
    - `id` (unique identifier)

- **Synchronization**
  - `observedAttributes`: `text`, `is-checked`, `id`.
  - `attributeChangedCallback` updates the `<span>` or checkbox state if those attributes change externally.

### 3. TodoList

- **Responsibility**

  - Combine `InputAction` and multiple `TodoItem`.
  - Retrieve and save tasks in `localStorage` under the `"todos"` key.
  - Allow creating, checking, unchecking, and deleting tasks; clean all completed tasks.

- **Structure (Shadow DOM)**

  - Includes an `<input-action>`, a container for items, and a “Clean Completed Tasks” button.

- **Main Flow**

  1. On receiving `input-action-submit`, create an object `{ text, isCompleted: false, id: UUID }`, save it in `localStorage`, and call `addTodo(...)`.
  2. `addTodo` inserts a `<todo-item>` with the attributes `text`, `id`, and `is-checked` as appropriate.
  3. Each `TodoItem` reports changes:
     - `action-item-status-update`: update the task in `localStorage` and adjust the clean button’s state.
     - `action-item-remove`: remove the task from `localStorage`, delete the element, and update the clean button.
  4. “Clean Completed Tasks” filters out completed tasks, updates `localStorage`, and removes the crossed-out items from the DOM.

- **Initial Setup**
  - `showStoredTodos()`: load from storage and render each task.
  - `manageCleanButton()`: enable or disable the clean button based on whether any tasks are completed.

<!-- ------------------------------------------------------------------------------------------- -->

## Technologies Used

- **Languages:** HTML, CSS, and JavaScript.
- **Notable Dependencies (Node.js):** Tailwindcss and Parcel.

<!-- ------------------------------------------------------------------------------------------- -->

## Installation and Usage Instructions

### 1. Software Requirements

- **[Node.js](https://nodejs.org/en/download/)** (tested on version **v22.15.1**)
- **[Git](https://git-scm.com/downloads)** (tested on version **2.47.1.windows.1**)
- **[Visual Studio Code](https://code.visualstudio.com/)** (tested on version **1.99.0**)
- **Live Server** (VS Code addon, _optional_)

### 2. Repository Cloning

```bash
   git clone https://github.com/pablo-sch/keepcoding-07-web-components.git
```

`>` **View Cloning Demo in VSCode:** 🎥 [Gif Demo](https://github.com/pablo-sch/pablo-sch/blob/main/etc/clone-tutorial.gif)

### 3. Commands

```sh
# Install project dependencies.
npm install

# Start the development server with Parcel.
npm start

# Start the server and open the browser automatically.
npm start:open

# Clean the dist folder and create the production-ready build.
npm build

# Delete the dist folder.
npm clear
```

<!-- ------------------------------------------------------------------------------------------- -->

## Project Resources

`>` **Project Preview:** 👀 [Preview](preview.md)

<!-- ------------------------------------------------------------------------------------------- -->

## Contributions and Licensing

Project licensed under the MIT License. Free to use and distribute with attribution. External contributions are not accepted, but suggestions are welcome.
