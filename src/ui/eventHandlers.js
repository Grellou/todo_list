import { Todo } from "../modules/todo.js";

export function initializeEventHandlers(
  content,
  form,
  todosArr,
  saveTodos,
  render,
) {
  // Delete button event
  content.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-button")) {
      const index = e.target.dataset.buttonIndex;

      // Remove from array, makes changes in local storage and display
      todosArr.splice(parseInt(index), 1);
      saveTodos(todosArr);
      render(content, todosArr);
    }
  });

  // Form submitting eventhandling
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const title = document.getElementById("todo-title").value;
    const description = document.getElementById("todo-description").value;
    const date = document.getElementById("todo-date").value;
    const priority = document.getElementById("todo-priority").value;
    const todo = new Todo(title, description, date, priority);

    // Add to array and local storage
    todosArr.push(todo);
    saveTodos(todosArr);

    // Display and reset form
    render(content, todosArr);
    form.reset();
  });

  // Checkbox toggle event
  content.addEventListener("change", function (e) {
    if (e.target.classList.contains("status-checkbox")) {
      const index = e.target.dataset.checkboxIndex;

      todosArr[index].toggleCompleted();
      saveTodos(todosArr);
      render(content, todosArr);
    }
  });
}
