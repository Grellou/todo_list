export function render(content, todosArr) {
  // Clear content
  content.textContent = "";

  // Loop through todos
  for (let i = 0; i < todosArr.length; i++) {
    // Create elements
    const todoDiv = document.createElement("div");
    const statusCheckbox = document.createElement("input");
    const deleteButton = document.createElement("button");

    // Set content div
    todoDiv.setAttribute("class", "todo-content");
    todoDiv.textContent = `Title: ${todosArr[i].title} | Description: ${todosArr[i].description} | Date: ${todosArr[i].dueDate} | Priority: ${todosArr[i].priority}`;

    // Set delete button
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("class", "delete-button");
    deleteButton.setAttribute("data-button-index", i);

    // Set status checkbox
    statusCheckbox.setAttribute("class", "status-checkbox");
    statusCheckbox.setAttribute("type", "checkbox");
    statusCheckbox.setAttribute("data-checkbox-index", [i]);

    // Check for completed todos
    if (todosArr[i].completed) {
      todoDiv.classList.add("todo-completed");
      statusCheckbox.checked = true;
    }

    // Add to content
    content.appendChild(todoDiv);
    content.appendChild(deleteButton);
    content.appendChild(statusCheckbox);
  }
}
