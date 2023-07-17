console.log(document.querySelector("#Options").parentElement);

function newTaskElementCreation(content, name = "data") {
  const container = document.querySelector(".tasks");
  const newTaskButton = document.createElement("div");
  container.appendChild(newTaskButton);
  newTaskButton.classList.add("task");
  newTaskButton.classList.add("mb-2");
  newTaskButton.classList.add("p-1");
  newTaskButton.classList.add("d-flex");
  newTaskButton.classList.add("align-items-center");
  newTaskButton.classList.add("gap-2");

  const checkbox = document.createElement("input");
  newTaskButton.appendChild(checkbox);
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");
  checkbox.classList.add("form-check-input");
  checkbox.classList.add("rounded-circle");

  const label = document.createElement("div");
  newTaskButton.appendChild(label);
  label.classList.add("underline");
  label.classList.add("text-truncate");
  label.classList.add("form-check-label");
  label.type = "checkbox";
  label.textContent = content;
}

function taskToStorage(content) {
  const data = JSON.parse(localStorage.getItem("data"));
  if (!(content == undefined || content == null)) {
    data["data"].push(content);
  }
  localStorage.setItem("data", JSON.stringify(data));
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
  container.innerHTML = `<div class="categTitle lead">All Tasks</div>`;
  if (
    localStorage.getItem(name) == null ||
    JSON.parse(localStorage.getItem("data"))["data"].length == 0
  ) {
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
function localStorageToCategories(array) {
  const parent = document.querySelector(".categories");
  parent.innerHTML = "";
  const dropdown = document.querySelector(".dropdown");
  if (JSON.parse(localStorage.getItem("data"))["categories"] === undefined) {
    const data = JSON.parse(localStorage.getItem("data"));
    data["categories"] = new Object();
    localStorage.setItem("data", JSON.stringify(data));
  }
  const dataToRead = Object.keys(
    JSON.parse(localStorage.getItem("data"))["categories"]
  );
  dropdown.innerHTML = "";
  dropdown.innerHTML = `<option value="none">none</option>`;
  dataToRead.forEach((e) => {
    newCategoryCreation(e);
    dropdown.innerHTML += `<option value="${e}">${e}</option>`;
  });
  return dataToRead;
}

function deleteTask(name = "data") {
  const data = JSON.parse(localStorage.getItem(name));
  let checkbox = document.querySelectorAll(".checkbox");
  checkbox.forEach((e) => {
    if (e.checked) {
      const array = data[name];
      const taskContainer = e.parentElement;
      const parent = taskContainer.parentElement;
      parent.removeChild(taskContainer);

      const elementContent = e.nextElementSibling.textContent;
      const index = array.indexOf(elementContent);
      array.splice(index, 1);

      const keys = Object.keys(data["categories"]);
      keys.forEach((e) => {
        if (data["categories"][e].includes(elementContent)) {
          const indexInCateg = data["categories"][e].indexOf(elementContent);
          data["categories"][e].splice(indexInCateg, 1);
        }
      });
      localStorage.setItem(name, JSON.stringify(data));
    }
  });
}

function newtaskPrompt() {
  const newTaskButton = document.querySelector(".newTask");
  const cancelButton = document.querySelector(".cancelButton");
  const taskPrompt = document.querySelector(".createTask");
  const categoryPrompt = document.querySelector(".createCategory");
  taskPrompt.classList.toggle("hide");
  newTaskButton.onclick = () => {
    taskPrompt.classList.toggle("hide");
  };
  cancelButton.onclick = () => {
    taskPrompt.classList.toggle("hide");
  };
  console.log();
}

function newCategoryCreation(content) {
  const categories = document.querySelector(".categories");
  const parent = document.createElement("div");
  parent.classList.add("eachCategContainer");
  parent.classList.add("row");
  parent.classList.add("rounded-3");
  parent.classList.add("input-group");
  parent.classList.add("m-1");
  parent.classList.add("g-0");

  const catButton = document.createElement("button");
  catButton.classList.add("eachCateg");
  catButton.classList.add("text-truncate");
  catButton.classList.add("col");
  catButton.classList.add("btn");
  // catButton.classList.add("btn-light");
  // catButton.classList.add("btn-outline-dark");
  // catButton.classList.add("w-100");
  // catButton.classList.add("rounded-top");
  catButton.classList.add("input-text");

  catButton.textContent = content;
  parent.appendChild(catButton);
  categories.appendChild(parent);
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("deleteCategButton");
  deleteButton.textContent = "❌";
  deleteButton.classList.add("border-start-0");
  deleteButton.classList.add("col-3");
  deleteButton.classList.add("input-text");
  deleteButton.classList.add("text-center");
  deleteButton.classList.add("btn");
  // deleteButton.classList.add("btn-light");
  // deleteButton.classList.add("btn-outline-dark");

  parent.appendChild(deleteButton);
  const mainContainer = parent.parentElement;

  deleteButton.onclick = () => {
    categoryDelete(deleteButton, parent, content);
    localStorageToTasks();
    localStorageToCategories();
  };
}

//TODO: includes category and contents of the said category
function categoryDelete(deleteButton, parent, content) {
  deleteButton.onclick = () => {
    mainContainer.removeChild(parent);
  };

  const data = JSON.parse(localStorage.getItem("data"));
  console.log(data["categories"]);
  data["categories"][content].forEach((e) => {
    let index = data["data"].indexOf(e);
    data["data"].splice(index, 1);
  });
  delete data["categories"][content];
  localStorage.setItem("data", JSON.stringify(data));
}

function categoryAppend(category, content) {
  const data = JSON.parse(localStorage.getItem("data"));
  if (!(category == "none")) {
    data["categories"][category].push(content);
  }
  localStorage.setItem("data", JSON.stringify(data));
}

function categoryChange() {
  const eachCateg = document.querySelectorAll(".eachCateg");
  const tasks = document.querySelector(".tasks");
  const data = JSON.parse(localStorage.getItem("data"));
  const general = document.querySelector(".General");

  eachCateg.forEach((e) => {
    e.onclick = () => {
      tasks.innerHTML = "";
      tasks.innerHTML += `<div class="categTitle lead">${e.textContent}</div>`;
      data["categories"][`${e.textContent}`].forEach((content) => {
        newTaskElementCreation(content);
      });
    };
  });

  general.onclick = () => {
    tasks.innerHTML = "";
    tasks.innerHTML += `<div class="categTitle lead">All Tasks</div>`;
    data["data"].forEach((content) => {
      newTaskElementCreation(content);
    });
  };
}

function categoryToStorage(name) {
  const data = JSON.parse(localStorage.getItem("data"));
  if (!(name == undefined)) {
    data["categories"][name] = [];
  }
  localStorage.setItem("data", JSON.stringify(data));
}

//REFACTOR CODES!!!!
(() => {
  const runtimeData = localStorageToTasks();
  localStorageToCategories();

  const add = document.querySelector(".newTaskButton");
  const addCategory = document.querySelector(".newCategoryButton");
  document.querySelector(".newCategory").onclick = () => {
    categPromptContainer.classList.toggle("hide");
  };
  const categ1 = new Object();
  runtimeData["categories"] = categ1;

  addCategory.onclick = () => {
    const input = document.querySelector(".categoryInput");
    categoryToStorage(input.value);
    localStorageToCategories();
    input.value = "";
  };

  const cancelCategAdd = document.querySelector(".cancelCategoryButton");
  const categPromptContainer = document.querySelector(".createCategory");
  categPromptContainer.classList.toggle("hide");
  cancelCategAdd.onclick = () => {
    categPromptContainer.classList.toggle("hide");
  };

  newtaskPrompt();

  const content = document.querySelector(".content");
  add.onclick = () => {
    const category = document.querySelector(".dropdown");
    newTaskElementCreation(content.value);
    taskToStorage(content.value);
    categoryAppend(category.value, content.value);
    content.value = "";
  };

  categoryChange();
  window.onclick = () => {
    let categTitle = document.querySelector(".categTitle ");
    deleteTask();
    if (!(categTitle.textContent == "All Tasks")) {
      deleteTask(categTitle.textContent);
    }
    categoryChange();
  };
})();
