function newTaskElementCreation(content) {
  const container = document.querySelector(".tasks");
  const newTaskButton = document.createElement("div");
  container.appendChild(newTaskButton);
  newTaskButton.classList.add("d-flex");
  newTaskButton.classList.add("align-items-center");
  newTaskButton.classList.add("gap-2");

  const checkbox = document.createElement("input");
  newTaskButton.appendChild(checkbox);
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");
  checkbox.classList.add("form-check-input");
  checkbox.classList.add("rounded-circle");

  const label = document.createElement("label");
  newTaskButton.appendChild(label);
  label.classList.add("form-check-label");
  label.type = "checkbox";
  label.textContent = content;
}

function newTaskWindow() {
  const HTMLNewTaskButton = document.querySelector(".newTask");
  HTMLNewTaskButton.onclick = () => {};
  const newTaskButton = document.createElement("div");
}

newTaskElementCreation("hello");
