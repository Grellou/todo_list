export function render(content, todosArr) {
  // Clear content
  content.textContent = "";

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
    todoTitle.textContent = `Title: ${todosArr[i].title}`;
    todoDescription.setAttribute("class", "todo-description");
    todoDescription.textContent = `Description: ${todosArr[i].description}`;
    todoDueDate.setAttribute("class", "todo-due-date");
    todoDueDate.textContent = `Due date: ${todosArr[i].dueDate}`;
    todoPriority.setAttribute("class", "todo-priority");
    todoPriority.textContent = `Priority: ${todosArr[i].priority}`;

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
