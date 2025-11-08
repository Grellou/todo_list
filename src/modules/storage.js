import { Todo } from "./todo.js";
import { Project } from "./project.js";

// Save todos
export function saveTodos(todosArray) {
  const todosConvertedToJson = JSON.stringify(todosArray);
  localStorage.setItem("todos", todosConvertedToJson);
}

// Load todos from storage
export function loadTodos() {
  const todosFromStorage = localStorage.getItem("todos");
  if (todosFromStorage) {
    try {
      const plainTodos = JSON.parse(todosFromStorage);
      const todoInstances = plainTodos.map((obj) => {
        const todo = new Todo(
          obj.title,
          obj.description,
          obj.dueDate,
          obj.priority,
        );
        todo.completed = obj.completed;
        return todo;
      });
      return todoInstances;
    } catch (error) {
      console.log("Error loading todos");
      return [];
    }
  } else {
    return [];
  }
}

// Save projects
export function saveProjects(projectsArray) {
  const projectsConvertedToJson = JSON.stringify(projectsArray);
  localStorage.setItem("projects", projectsConvertedToJson);
}

// Load projects from storage
export function loadProjects() {
  const projectsFromStorage = localStorage.getItem("projects");

  // Return default project if nothing is found in storage
  if (!projectsFromStorage) {
    const defaultProject = new Project(1, "default");
    return [defaultProject];
  } else {
    try {
      // Reconstruct projects
      const plainProjects = JSON.parse(projectsFromStorage);
      const projectInstances = plainProjects.map((obj) => {
        const project = new Project(obj.id, obj.name);

        // Reconstruct todos for this project
        obj.todos.forEach((todoObj) => {
          const todo = new Todo(
            todoObj.title,
            todoObj.description,
            todoObj.dueDate,
            todoObj.priority,
          );
          todo.completed = todoObj.completed;
          project.addTodo(todo);
        });
        return project;
      });
      return projectInstances;
    } catch (error) {
      console.log("Error loading projects");
      const defaultProject = new Project(1, "default");
      return [defaultProject];
    }
  }
}
