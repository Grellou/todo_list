import { Todo } from "../modules/todo.js";

export function initializeEventHandlers(
  content,
  form,
  todosArr,
  saveTodos,
  render,
  editDialog,
) {
  // Buttons events
  let currentIndex = null;
  content.addEventListener("click", function (e) {
    // Delete button
    if (e.target.classList.contains("todo-delete-button")) {
      const index = e.target.dataset.deleteButtonIndex;

      // Remove from array, makes changes in local storage and display
      todosArr.splice(parseInt(index), 1);
      saveTodos(todosArr);
      render(content, todosArr);
    }

    // Edit button
    if (e.target.classList.contains("todo-edit-button")) {
      const index = e.target.dataset.editButtonIndex;
      currentIndex = parseInt(index);
      const dialog = document.getElementById("todo-edit-dialog");

      // Prefill dialog with todo data
      const title = document.getElementById("todo-dialog-title");
      const description = document.getElementById("todo-dialog-description");
      const date = document.getElementById("todo-dialog-date");
      const priority = document.getElementById("todo-dialog-priority");

      title.value = todosArr[index].title;
      description.value = todosArr[index].description;
      date.value = todosArr[index].dueDate;
      priority.value = todosArr[index].priority;

      // Display dialog
      dialog.showModal();
    }
  });

  // Dialog modal events
  editDialog.addEventListener("click", function (e) {
    // Cancel button
    if (e.target.classList.contains("todo-dialog-cancel-button")) {
      editDialog.close();
    }

    // Save button
    if (e.target.classList.contains("todo-dialog-save-button")) {
      // Get todo values from dialog input and change them
      const title = document.getElementById("todo-dialog-title").value;
      const description = document.getElementById(
        "todo-dialog-description",
      ).value;
      const date = document.getElementById("todo-dialog-date").value;
      const priority = document.getElementById("todo-dialog-priority").value;
      todosArr[currentIndex].title = title;
      todosArr[currentIndex].description = description;
      todosArr[currentIndex].dueDate = date;
      todosArr[currentIndex].priority = priority;
      saveTodos(todosArr);
      render(content, todosArr);
      editDialog.close();
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
    if (e.target.classList.contains("todo-status-checkbox")) {
      const index = e.target.dataset.checkboxIndex;

      todosArr[index].toggleCompleted();
      saveTodos(todosArr);
      render(content, todosArr);
    }
  });
}
