//TODO: delete all array elements
//TODO: use data to temporarily store, pass, and retrieve data

function newTaskElementCreation(content, name = "data") {
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

  // if (!(content in data[name])) {
  //   console.log("not inside");
  // }
  // data["data"].push(content);
  // localStorage.setItem(name, JSON.stringify(data));
}

function runtimeStorage(data) {
  this.data = data;
}
runtimeStorage.prototype.Keys = function () {
  this.data.forEach((element) => {
    console.log(element);
  });
};

function localStorageToTasks(name = "data") {
  const container = document.querySelector(".tasks");
  container.innerHTML = "";
  if (
    localStorage.getItem(name) == null ||
    JSON.parse(localStorage.getItem("data"))["data"].length == 0
  ) {
    //create data
    // if key item not in storage, create one
    localStorage.setItem(
      name,
      JSON.stringify(new runtimeStorage(["Your tasks will appear here"]))
    );
  }
  const dataToRead = JSON.parse(localStorage.getItem(name));
  dataToRead["data"].forEach((e) => {
    newTaskElementCreation(e);
  });
  return dataToRead;
}

function deleteTask(data, name = "data") {
  let checkbox = document.querySelectorAll(".checkbox");
  checkbox.forEach((e) => {
    if (e.checked) {
      const array = data["data"];
      const taskContainer = e.parentElement;
      const parent = taskContainer.parentElement;
      parent.removeChild(taskContainer);

      elementContent = e.nextElementSibling.textContent;
      const index = array.indexOf(elementContent);
      array.splice(index, 1);
      localStorage.setItem(name, JSON.stringify(data));
    }
  });
}

function newtaskPrompt() {
  const newTaskButton = document.querySelector(".newTask");
  const taskPrompt = document.querySelector(".createTask");
  taskPrompt.classList.toggle("hide");
  newTaskButton.onclick = () => {
    taskPrompt.classList.toggle("hide");
  };
}

//REFACTOR CODES!!!!
(() => {
  // a function to read if there's already local data, and if not create an object there
  // an object to receive data from local storage
  const runtimeData = localStorageToTasks();

  // a function to add new category to ui and local storage & for deleting a category
  // newCategoryCreation(runtimeData);

  // function for the add task prompt to appear
  newtaskPrompt();
  // newTaskPrompt();

  // a function to facilitate adding a task & to facilitate deleting a task
  const add = document.querySelector(".newTaskButton");
  const content = document.querySelector(".content");
  add.onclick = () => {
    newTaskElementCreation(content.value);
    runtimeData["data"].push(content.value);

    content.value = "";
    localStorage.setItem("data", JSON.stringify(runtimeData));
  };

  window.onclick = () => {
    deleteTask(runtimeData);
  };
})();
