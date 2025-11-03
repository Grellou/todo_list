import { Todo } from "./todo.js";

export function saveTodos(todosArray) {
  const todosConvertedToJson = JSON.stringify(todosArray);
  localStorage.setItem("todos", todosConvertedToJson);
}

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
