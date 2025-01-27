// DOM Elements
const inputBox = document.querySelector("#inputBox");
const addBtn = document.querySelector("#addBtn");
const todoList = document.querySelector("#todoList");
let editTodo = null;

// Add or Edit Todo
const addTodo = () => {
  const inputText = inputBox.value.trim();
  if (!inputText) return alert("Please write something");

  if (addBtn.value === "Edit") {
    // Update an existing todo
    editTodo.target.previousElementSibling.innerHTML = inputText;
    updateLocalTodos(
      editTodo.target.previousElementSibling.dataset.id,
      inputText
    );
    resetInput();
  } else {
    // Create a new todo
    const id = Date.now();
    createTodoElement(inputText, id);
    saveLocalTodos({ text: inputText, id });
    resetInput();
  }
};

// Create Todo Element
const createTodoElement = (text, id) => {
  const li = document.createElement("li");
  li.innerHTML = `
    <p data-id="${id}">${text}</p> 
    <button class="btn editBtn">Edit</button> 
    <button class="btn deleteBtn">Remove</button> 
  `;
  todoList.prepend(li);
};

// Handle Edit or Delete Actions
const updateTodo = (e) => {
  const target = e.target;
  const todoItem = target.parentElement;
  const textElement = todoItem.querySelector("p");

  if (target.classList.contains("deleteBtn")) {
    todoList.removeChild(todoItem);
    removeLocalTodos(textElement.dataset.id);
  } else if (target.classList.contains("editBtn")) {
    inputBox.value = textElement.innerHTML;
    inputBox.focus();
    addBtn.value = "Edit";
    editTodo = e;
  }
};

// Reset Input Field
const resetInput = () => {
  inputBox.value = "";
  addBtn.value = "Add";
  editTodo = null;
};

// Save a New Todo to Local Storage
const saveLocalTodos = (todo) => {
  const todos = JSON.parse(localStorage.getItem("todos") || "[]");
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Load Todos from Local Storage
const getLocalTodos = () => {
  const todos = JSON.parse(localStorage.getItem("todos") || "[]");
  todos.forEach(({ text, id }) => createTodoElement(text, id));
};

// Update a Todo in Local Storage
const updateLocalTodos = (id, newText) => {
  const todos = JSON.parse(localStorage.getItem("todos") || "[]");
  const index = todos.findIndex((todo) => todo.id == id);
  if (index !== -1) todos[index].text = newText;
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Remove a Todo from Local Storage
const removeLocalTodos = (id) => {
  const todos = JSON.parse(localStorage.getItem("todos") || "[]");
  const updatedTodos = todos.filter((todo) => todo.id != id);
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
};

// Event Listeners
document.addEventListener("DOMContentLoaded", getLocalTodos);
addBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", updateTodo);
