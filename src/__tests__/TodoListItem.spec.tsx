import React from "react";
import { render, act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TodoListItem, TodoListItemProps } from "../TodoListItem";

const inputProps: TodoListItemProps[] = [
  { todo: { complete: false, text: "item 1" }, toggleComplete: jest.fn() },
  { todo: { complete: true, text: "item 2" }, toggleComplete: jest.fn() },
];
describe("TodoListItem", () => {
  it.each(inputProps)("snapshot test", (props: TodoListItemProps) => {
    const { baseElement } = render(<TodoListItem {...props} />);
    expect(baseElement).toMatchSnapshot();
  });

  it.each(inputProps)("event handler fired as expects", (props: TodoListItemProps) => {
    render(<TodoListItem {...props} />);

    act(() => {
      userEvent.click(screen.getByLabelText(props.todo.text));
    });
    expect(props.toggleComplete).toHaveBeenCalled();
  });
});
