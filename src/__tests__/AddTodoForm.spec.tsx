import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { AddTodoForm, AddTodoFormProps } from "../AddTodoForm";

const inputProps: AddTodoFormProps = {
  addTodo: jest.fn(),
};

describe("AddTodoForm", () => {
  it("snapshot test", () => {
    const { baseElement } = render(<AddTodoForm {...inputProps} />);
    expect(baseElement).toMatchSnapshot();
  });

  it("user interactions", async () => {
    render(<AddTodoForm {...inputProps} />);

    expect(screen.queryByPlaceholderText("I need to do...")).toHaveFocus();
    userEvent.type(screen.getByPlaceholderText("I need to do..."), "My New Todo");
    expect(screen.queryByDisplayValue("My New Todo")).toBeInTheDocument();
    userEvent.click(screen.getByText("Add"));
    expect(inputProps.addTodo).toHaveBeenCalledWith("My New Todo");

    expect(screen.getByPlaceholderText("I need to do...")).toHaveFocus();
    expect(screen.getByPlaceholderText("I need to do...")).toHaveValue("");

    userEvent.type(screen.getByPlaceholderText("I need to do..."), "My 2nd Todo{enter}");
    expect(inputProps.addTodo).toHaveBeenCalledWith("My 2nd Todo");

    expect(screen.getByPlaceholderText("I need to do...")).toHaveFocus();
    expect(screen.getByPlaceholderText("I need to do...")).toHaveValue("");

    userEvent.type(screen.getByPlaceholderText("I need to do..."), "My 3rd Todo{esc}");
    expect(inputProps.addTodo).not.toHaveBeenCalledWith("My 3rd Todo");
  });
});
