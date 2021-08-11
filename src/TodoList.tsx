import React from "react";
import { Todo, ToggleComplete } from "./types";
import { TodoListItem } from "./TodoListItem";

export interface TodoListProps {
  todos: Array<Todo>;
  toggleComplete: ToggleComplete;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, toggleComplete }) => {
  return (
    <div className="todo-list-container">
      <ul>
        {todos.map((todo, index) => (
          <TodoListItem
            key={`${todo.text}---${index}`}
            todo={todo}
            toggleComplete={toggleComplete}
          />
        ))}
      </ul>
    </div>
  );
};
