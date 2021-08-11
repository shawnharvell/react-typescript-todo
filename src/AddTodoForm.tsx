import React, { useState, ChangeEvent, KeyboardEvent, useEffect, useRef } from "react";
import { AddTodo } from "./types";

export interface AddTodoFormProps {
  addTodo: AddTodo;
}

export const AddTodoForm: React.FC<AddTodoFormProps> = ({ addTodo }) => {
  const [newTodo, setNewTodo] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      onAddClick();
    } else if (e.key === "Escape") {
      setNewTodo("");
    }
  };

  const onAddClick = () => {
    addTodo(newTodo);
    setNewTodo("");
    inputRef.current?.focus();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="add-form-container">
      <div className="textfield">
        <input
          ref={inputRef}
          type="text"
          value={newTodo}
          onKeyDown={handleEnter}
          onChange={handleChange}
          placeholder="I need to do..."
          data-testid="new-todo-textbox"
        />
      </div>
      <div className="button">
        <button onClick={onAddClick}>Add</button>
      </div>
    </div>
  );
};
