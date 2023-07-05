const data = {
  AllTasks: [],
};

function newTaskElementCreation(content, array, name = "All Tasks") {
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

  checkbox.onclick = () => {
    let useArray = JSON.parse(array);
    console.log(useArray);
    let index = useArray.indexOf(content);
    console.log(index);
    useArray.splice(index, 1);
    console.log(useArray);
    localStorage.setItem(name, JSON.stringify(useArray));
    deleteTask(container, newTaskButton);
  };
}

function deleteTask(parent, child) {
  parent.removeChild(child);
}

function newTask(array) {
  // const HTMLNewTaskButton = document.querySelector(".newTask");
  // HTMLNewTaskButton.onclick = () => {
  //   const createTask = document.createElement("div");

  // };
  const addTaskButton = document.querySelector(".newTaskButton");
  const content = document.querySelector(".content");

  addTaskButton.onclick = () => {
    newTaskElementCreation(content.value, array);
    array.push(content.value);
    console.log(array);
    localStorage.setItem("All Tasks", JSON.stringify(array));
    content.value = "";
  };
}

function localStorageToTasks(name) {
  if (!(localStorage.getItem(name) == null)) {
    const allTasks = JSON.parse(localStorage.getItem(name));
    allTasks.forEach((content) => {
      newTaskElementCreation(content, localStorage.getItem(name));
    });
  } else {
    localStorage.setItem(name, "[]");
  }
}

// (() => {
//   localStorageToTasks("All Tasks");
//   console.log(localStorage.getItem("All Tasks"));
//   const array = JSON.parse(localStorage.getItem("All Tasks"));
//   newTask(array);
//   // window.onclick = () => {
//   //   console.log(array);
//   // };
// })();
