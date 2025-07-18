# Einreichung des Web Components Projekts

`>` **KeepCoding Projekte - Web 18:** 📁 [repos-kc-web-18.md](https://github.com/pablo-sch/pablo-sch/blob/main/docs/repos-kc-web-18.md)

`>` **Wähle deine Sprache:** [Englisch](README.md) 🔄 [Spanish](README.es.md)

<!-- ------------------------------------------------------------------------------------------- -->

## Projektziel

Dieses Projekt hat zum Ziel, die **technische Problemerkennung**, auch bekannt als **Componentization**, zu üben, um die möglichen Komponenten der vorgeschlagenen Lösung zu identifizieren und zu klären.

Dabei sollen zuvor erarbeitete Konzepte wie Wiederverwendung, Isolation, Kapselung und Single Responsibility Principle angewendet werden, um eine konsistente Komponentenstruktur zu entwerfen, die den Prinzipien moderner Entwicklung entspricht.

<!-- ------------------------------------------------------------------------------------------- -->

## Erlerntes und Angewandtes Wissen

### 1. Was sind Web Components?

Web Components sind eine Sammlung nativer Browser-Technologien, mit denen man wiederverwendbare, benutzerdefinierte HTML-Elemente erstellen kann, die ihr eigenes Verhalten und Styling besitzen, kapselbar sind und zwischen verschiedenen Frameworks oder Projekten portabel bleiben.

### 2. Probleme, die sie in der Webentwicklung lösen

- **Interoperabilität:** Ermöglichen den Einsatz von Komponenten unabhängig vom Framework (React, Vue, Angular usw.).
- **Isolation:** Kapseln Styles und Logik, um Konflikte mit dem Rest der Anwendung zu vermeiden.
- **Wiederverwendbarkeit:** Erleichtern das Teilen und Wiederverwenden von Komponenten in mehreren Projekten.
- **Kapselung:** Trennen deutlich die interne Logik und das Styling des Components vom Außenbereich.

### 3. Anwendung im aktuellen Paradigma

- **DRY (Don’t Repeat Yourself):** Verhindern von Code-Duplikation durch Erstellung wiederverwendbarer Komponenten.
- **COP (Component Oriented Programming):** Fördern einen modularen, komponentenbasierten Ansatz.
- **SRP (Single Responsibility Principle):** Sicherstellen, dass jede Komponente nur eine einzige, klare Aufgabe erfüllt.

### 4. Einbezogene Standards

- **HTML-Templates:** Definieren wiederverwendbare HTML-Schnipsel, ohne dass sie automatisch gerendert werden.
- **Custom Elements:** Registrieren neuer, benutzerdefinierter HTML-Tags mit eigenem Verhalten.
- **Shadow DOM:** Kapselt das DOM und CSS des Components, um externe Einflüsse zu vermeiden.
- **ES Modules:** Importieren und Exportieren von JavaScript-Code in modularer, wiederverwendbarer Weise.

### 5. Lebenszyklus eines Web Components

- `constructor()` – Wird beim Instanziieren des Components ausgeführt. Ideal, um Eigenschaften zu initialisieren.
- `connectedCallback()` – Wird aufgerufen, wenn das Component dem DOM hinzugefügt wird. Typischerweise für Rendering-Logik.
- `disconnectedCallback()` – Läuft, wenn das Component aus dem DOM entfernt wird. Ideal zum Aufräumen von Event-Listenern.
- `adoptedCallback()` – Wird aufgerufen, wenn das Element in ein neues Dokument verschoben wird.
- `attributeChangedCallback()` – Erkennt Änderungen beobachteter Attribute und erlaubt dynamisches Reagieren darauf.

### 6. Gestaltung eines Web Components

- **Verantwortung:** Jede Komponente muss nur eine einzige, klare Aufgabe erfüllen.
- **Custom Properties:** Verwenden von CSS-Variablen, um externes Styling anzupassen.
- **Attribute:** Konfigurieren das Verhalten oder Aussehen des Components über HTML-Attribute.
- **Events:** Komponenten sollten in der Lage sein, eigene Events auszulösen und darauf zu reagieren, um mit der Umgebung zu kommunizieren.

<!-- ------------------------------------------------------------------------------------------- -->

## Projektdetails

### 1. InputAction

- **Verantwortung**

  - Erfasst Text vom Benutzer und zeigt einen Button an.
  - Hält den Button deaktiviert, wenn das Feld leer ist.
  - Beim Klick löst es `input-action-submit` mit dem eingegebenen Text aus und leert das Eingabefeld.

- **Struktur (Shadow DOM)**
  - Enthält ein `<input>` und einen `<button>`.
  - Attribute:
    - `button-label` (Button-Text, Standard „Add“)
    - `placeholder` (Placeholder-Text fürs Input, Standard „Add Your Task“)
    - `type` (Input-Typ, Standard „text“)

### 2. TodoItem

- **Verantwortung**

  - Zeigt eine Aufgabe mit Checkbox, Text und Lösch-Button an.
  - Ist die Checkbox aktiviert, erscheint der Text durchgestrichen.
  - Beim Ändern der Checkbox löst es `action-item-status-update` aus mit `{ id, text, isChecked }`.
  - Beim Klick auf den Lösch-Button löst es `action-item-remove` aus mit `{ id }` und entfernt sich selbst aus dem DOM.

- **Struktur (Shadow DOM)**

  - Enthält `<input type="checkbox">`, ein `<span>` für den Text und einen `<button>`.
  - Attribute:
    - `text` (Aufgabentext)
    - `is-checked` (markiert, ob sie erledigt ist)
    - `button-label` (Button-Text, Standard „Delete“)
    - `id` (eindeutiger Bezeichner)

- **Synchronisation**
  - `observedAttributes`: `text`, `is-checked`, `id`.
  - `attributeChangedCallback` aktualisiert `<span>` oder Checkbox-Zustand, wenn sich Attribute extern ändern.

### 3. TodoList

- **Verantwortung**

  - Kombiniert `InputAction` und mehrere `TodoItem`.
  - Liest und speichert Aufgaben in `localStorage` unter dem Schlüssel `"todos"`.
  - Erlaubt Erstellen, Markieren, Abhaken und Löschen von Aufgaben sowie das Entfernen aller erledigten Aufgaben.

- **Struktur (Shadow DOM)**

  - Enthält ein `<input-action>`, einen Container für die Items und einen Button „Clean Completed Tasks“.

- **Hauptablauf**

  1. Beim Empfangen von `input-action-submit` wird ein Objekt `{ text, isCompleted: false, id: UUID }` erzeugt, in `localStorage` gespeichert und `addTodo(...)` aufgerufen.
  2. `addTodo` fügt ein `<todo-item>` mit den Attributen `text`, `id` und `is-checked` (falls erledigt) ein.
  3. Jedes `TodoItem` meldet Änderungen:
     - `action-item-status-update`: Aktualisiert die Aufgabe in `localStorage` und den Zustand des „Clean“-Buttons.
     - `action-item-remove`: Entfernt die Aufgabe aus `localStorage`, löscht das Element und aktualisiert den Button.
  4. „Clean Completed Tasks“ filtert alle erledigten Aufgaben heraus, aktualisiert `localStorage` und entfernt die durchgestrichenen Items aus dem DOM.

- **Initiale Einrichtung**
  - `showStoredTodos()`: Lädt aus dem Speicher und rendert alle gespeicherten Aufgaben.
  - `manageCleanButton()`: Aktiviert oder deaktiviert den „Clean“-Button, abhängig davon, ob erledigte Aufgaben vorhanden sind.

<!-- ------------------------------------------------------------------------------------------- -->

## Verwendete Technologien

- **Sprachen:** HTML, CSS und JavaScript.
- **Bemerkenswerte Abhängigkeiten (Node.js):** Tailwindcss und Parcel.

<!-- ------------------------------------------------------------------------------------------- -->

## Installations- und Nutzungshinweise

### 1. Softwareanforderungen

- **[Node.js](https://nodejs.org/en/download/)** (getestet mit Version **v22.15.1**)
- **[Git](https://git-scm.com/downloads)** (getestet mit Version **2.47.1.windows.1**)
- **[Visual Studio Code](https://code.visualstudio.com/)** (getestet mit Version **1.99.0**)
- **Live Server** (VS Code-Erweiterung, _optional_)

### 2. Repository-Klonen

```bash
   git clone https://github.com/pablo-sch/keepcoding-07-web-components.git
```

`>` **Klon-Demo in VSCode ansehen:** 🎥 [Gif Demo](https://github.com/pablo-sch/pablo-sch/blob/main/etc/clone-tutorial.gif)

### 3. Befehle

```sh
# Installiere die Projektabhängigkeiten.
npm install

# Starte den Entwicklungsserver mit Parcel.
npm start

# Starte den Server und öffne den Browser automatisch.
npm start:open

# Bereinige den dist-Ordner und erstelle die produktionsbereite Version.
npm build

# Lösche den dist-Ordner.
npm clear
```

<!-- ------------------------------------------------------------------------------------------- -->

## Projektressourcen

`>` **Projektvorschau:** 👀 [Vorschau](preview.md)

<!-- ------------------------------------------------------------------------------------------- -->

## Beiträge und Lizenzierung

Projekt unter MIT-Lizenz. Frei zur Nutzung und Verbreitung mit Namensnennung. Externe Beiträge werden nicht akzeptiert, aber Vorschläge sind willkommen.
