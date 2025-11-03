import "./styles.css";
import { saveTodos, loadTodos } from "./modules/storage.js";
import { render } from "./ui/dom.js";
import { initializeEventHandlers } from "./ui/eventHandlers.js";

document.addEventListener("DOMContentLoaded", function () {
  // Get content, form, edit dialog modal
  const content = document.getElementById("todo-content");
  const form = document.getElementById("todo-form");
  const editDialog = document.getElementById("todo-edit-dialog");

  // Load todos
  const todosArr = loadTodos();

  // Call event handlers
  initializeEventHandlers(
    content,
    form,
    todosArr,
    saveTodos,
    render,
    editDialog,
  );

  // Display
  render(content, todosArr);
});
