import "./styles.css";
import { saveTodos, loadTodos } from "./modules/storage.js";
import { render } from "./ui/dom.js";
import { initializeEventHandlers } from "./ui/eventHandlers.js";

document.addEventListener("DOMContentLoaded", function () {
  // Get content and form
  const content = document.getElementById("todo-content");
  const form = document.getElementById("todo-form");

  // Load todos
  const todosArr = loadTodos();

  // Call event handlers
  initializeEventHandlers(content, form, todosArr, saveTodos, render);

  // Display
  render(content, todosArr);
});
