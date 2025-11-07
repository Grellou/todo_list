import { Todo } from "../modules/todo.js";

export function initializeEventHandlers(
  content,
  form,
  projectsArr,
  saveProjects,
  render,
  editDialog,
  activeProjectId,
) {
  // Helper to get active project
  function getActiveProject() {
    for (let i = 0; i < projectsArr.length; i++) {
      if (projectsArr[i].id === activeProjectId) {
        return projectsArr[i];
      }
    }
    return projectsArr[0];
  }
  // Buttons events
  let currentIndex = null;
  content.addEventListener("click", function (e) {
    // Delete button
    if (e.target.classList.contains("todo-delete-button")) {
      const index = e.target.dataset.deleteButtonIndex;

      // Find active project
      const activeProject = getActiveProject();

      // Remove from project, makes changes in local storage and display
      activeProject.removeTodo(activeProject.todos[index]);
      saveProjects(projectsArr);
      render(content, activeProject.todos);
    }

    // Edit button
    if (e.target.classList.contains("todo-edit-button")) {
      const index = e.target.dataset.editButtonIndex;
      currentIndex = parseInt(index);

      // Find active project
      const activeProject = getActiveProject();

      // Get dialog to display it
      const dialog = document.getElementById("todo-edit-dialog");

      // Prefill dialog with todo data
      const title = document.getElementById("todo-dialog-title");
      const description = document.getElementById("todo-dialog-description");
      const date = document.getElementById("todo-dialog-date");
      const priority = document.getElementById("todo-dialog-priority");

      title.value = activeProject.todos[index].title;
      description.value = activeProject.todos[index].description;
      date.value = activeProject.todos[index].dueDate;
      priority.value = activeProject.todos[index].priority;

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
      // Find active project
      const activeProject = getActiveProject();

      // Get todo values from dialog input and change them
      const title = document.getElementById("todo-dialog-title").value;
      const description = document.getElementById(
        "todo-dialog-description",
      ).value;
      const date = document.getElementById("todo-dialog-date").value;
      const priority = document.getElementById("todo-dialog-priority").value;
      activeProject.todos[currentIndex].title = title;
      activeProject.todos[currentIndex].description = description;
      activeProject.todos[currentIndex].dueDate = date;
      activeProject.todos[currentIndex].priority = priority;
      saveProjects(projectsArr);
      render(content, activeProject.todos);
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

    // Find active project and add todos to it
    const activeProject = getActiveProject();
    activeProject.addTodo(todo);

    // Save projects
    saveProjects(projectsArr);

    // Display active projects todos and reset form
    render(content, activeProject.todos);
    form.reset();
  });

  // Checkbox toggle event
  content.addEventListener("change", function (e) {
    if (e.target.classList.contains("todo-status-checkbox")) {
      const index = e.target.dataset.checkboxIndex;

      // Find active project
      const activeProject = getActiveProject();

      activeProject.todos[index].toggleCompleted();
      saveProjects(projectsArr);

      render(content, activeProject.todos);
    }
  });
}
