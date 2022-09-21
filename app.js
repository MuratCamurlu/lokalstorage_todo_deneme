const addBtn = document.getElementById("todo-button");
const todoInput = document.getElementById("todo-input");
const todoUl = document.getElementById("todo-ul");
let todos = JSON.parse(localStorage.getItem("TODOS")) || [];
const renderSavedTodos = () => {
  todos.forEach((todo) => {
    createListElement(todo);
  });

  renderSavedTodos();
};
addBtn.addEventListener("click", () => {
  if (todoInput.value.trim() === "") {
    alert("please enter a task");
  } else {
    const newTodo = {
      id: new Date().getTime(),
      completed: false,
      text: todoInput.value,
    };
    createListElement(newTodo);
    //? dom da oluşturduğum tüm elementleri todos dizisine  pushluyorum.
    todos.push(newTodo);
    //? todos dizisini lokalstorage e TODOS  ile atıyorum.
    localStorage.setItem("TODOS", JSON.stringify(todos));
    todoInput.value = "";
    todoInput.focus();
  }
});

function createListElement(newTodo) {
  //? bir li parent ı oluşturdum içine ikonları ve text bağlı bir p yi child olarak atayacağım.
  const li = document.createElement("li");
  li.setAttribute("id", newTodo.id);
  newTodo.completed && li.classList("completed");
  //?  tik ikonunu oluşturdum ve li ye child olarak atadım
  const okIcon = document.createElement("i");
  okIcon.setAttribute("class", "fas fa-check");
  li.appendChild(okIcon);
  //? p elementini oluşturuyorum.todo objesindeki text i içine atıyorum.
  const p = document.createElement("p");
  const pText = document.createTextNode(newTodo.text);
  p.appendChild(pText);
  li.appendChild(p);
  //?çöp kutusunu oluşturuyorum.
  const dltIcon = document.createElement("i");
  dltIcon.setAttribute("class", "fas fa-trash");
  li.appendChild(dltIcon);
  //? li yi todoUl ye child yapıyorum.
  todoUl.appendChild(li);
}

todoUl.addEventListener("click", (e) => {
  const id = e.target.parentElement.getAttribute("id");
  if (e.target.classList.contains("fa-trash")) {
    e.target.parentElement.remove();
    todos = todos.filter((todo) => todo.id != id);
  }
  if (e.target.classList.contains("fa-check")) {
    e.target.parentElement.classList.toggle("completed");
  }
});

todoInput.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    addBtn.click();
  }
});

window.onload = function () {
  todoInput.focus();
};
