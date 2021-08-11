import React from "react";
import { render } from "@testing-library/react";

import { TodoList, TodoListProps } from "../TodoList";

const inputProps: TodoListProps = {
  todos: [
    { complete: false, text: "item 1" },
    { complete: true, text: "item 2" },
  ],
  toggleComplete: jest.fn(),
};

describe("TodoList", () => {
  it("snapshot test", () => {
    const { baseElement } = render(<TodoList {...inputProps} />);
    expect(baseElement).toMatchSnapshot();
  });
});
