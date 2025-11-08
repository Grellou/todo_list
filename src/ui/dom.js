export function render(content, todosArr) {
  // Clear content
  content.textContent = "";

  // Empty state - no todos
  if (todosArr.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "empty-state";
    emptyMessage.textContent = "📝 No todos yet. Add one above to get started!";
    content.appendChild(emptyMessage);
    return;
  }

  // Loop through todos
  for (let i = 0; i < todosArr.length; i++) {
    // Create elements
    const todoDiv = document.createElement("div");
    const todoTitle = document.createElement("div");
    const todoDescription = document.createElement("div");
    const todoDueDate = document.createElement("div");
    const todoPriority = document.createElement("div");
    const statusCheckbox = document.createElement("input");
    const deleteButton = document.createElement("button");
    const editButton = document.createElement("button");

    // Set content div
    todoDiv.setAttribute("class", "todo-container");
    todoTitle.setAttribute("class", "todo-title");
    todoTitle.textContent = todosArr[i].title;
    todoDescription.setAttribute("class", "todo-description");
    todoDescription.textContent = todosArr[i].description;
    todoDueDate.setAttribute("class", "todo-due-date");
    todoDueDate.textContent = `📅 ${todosArr[i].dueDate}`;
    todoPriority.setAttribute("class", "todo-priority");
    todoPriority.textContent = todosArr[i].priority;

    // Set delete button
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("class", "todo-delete-button");
    deleteButton.setAttribute("data-delete-button-index", i);

    // Set status checkbox
    statusCheckbox.setAttribute("class", "todo-status-checkbox");
    statusCheckbox.setAttribute("type", "checkbox");
    statusCheckbox.setAttribute("data-checkbox-index", i);

    // Set edit button
    editButton.textContent = "Edit";
    editButton.setAttribute("class", "todo-edit-button");
    editButton.setAttribute("data-edit-button-index", i);

    // Check for completed todos
    if (todosArr[i].completed) {
      todoDiv.classList.add("todo-completed");
      statusCheckbox.checked = true;
    }

    // Check todo priority
    if (todosArr[i].priority === "high") {
      todoDiv.classList.add("todo-priority-high");
    } else if (todosArr[i].priority === "medium") {
      todoDiv.classList.add("todo-priority-medium");
    } else if (todosArr[i].priority === "low") {
      todoDiv.classList.add("todo-priority-low");
    }

    // Add to content
    todoDiv.append(
      todoTitle,
      todoDescription,
      todoDueDate,
      todoPriority,
      deleteButton,
      editButton,
      statusCheckbox,
    );
    content.appendChild(todoDiv);
  }
}

export function renderProjects(projectsContent, projectsArr, activeProjectId) {
  // Clear projects content
  projectsContent.textContent = "";

  // Loop through projects
  for (let i = 0; i < projectsArr.length; i++) {
    // Create elements
    const projectDiv = document.createElement("div");
    const projectName = document.createElement("div");

    // Count todos in project
    const todoCount = projectsArr[i].todos.length;

    // Set content
    projectDiv.setAttribute("class", "project-container");
    projectDiv.setAttribute("data-project-id", projectsArr[i].id);
    projectName.setAttribute("class", "project-name");
    projectName.textContent = `${projectsArr[i].name} (${todoCount})`;

    // Check if added project is active
    if (projectsArr[i].id === activeProjectId) {
      projectDiv.classList.add("active");
    }

    // Append to content
    projectDiv.append(projectName);
    projectsContent.appendChild(projectDiv);
  }
}
