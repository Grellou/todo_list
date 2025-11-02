import { Todo } from "./todo.js";

export function saveTodos(todosArray) {
  const todosConvertedToJson = JSON.stringify(todosArray);
  localStorage.setItem("todos", todosConvertedToJson);
}

export function loadTodos() {
  const todosFromStorage = localStorage.getItem("todos");
  if (todosFromStorage) {
    try {
      const plainTodo = JSON.parse(todosFromStorage);
      const instanceTodo = plainTodo.map((obj) => {
        const objTodo = new Todo(
          obj.title,
          obj.description,
          obj.dueDate,
          obj.priority,
        );
        objTodo.completed = obj.completed;
        return objTodo;
      });
      return instanceTodo;
    } catch (error) {
      console.log("Error loading todos");
      return [];
    }
  } else {
    return [];
  }
}
