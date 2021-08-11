import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import App from "../App";

describe("App", () => {
  it("snapshot test", () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toMatchSnapshot();
  });

  it("user interactions", async () => {
    render(<App />);

    expect(screen.queryByPlaceholderText("I need to do...")).toHaveFocus();
    userEvent.type(screen.getByPlaceholderText("I need to do..."), "My New Todo");
    expect(screen.queryByDisplayValue("My New Todo")).toBeInTheDocument();
    userEvent.click(screen.getByText("Add"));
    expect(screen.queryByText("My New Todo")).toBeInTheDocument();

    expect(screen.getByPlaceholderText("I need to do...")).toHaveFocus();
    expect(screen.getByPlaceholderText("I need to do...")).toHaveValue("");

    userEvent.type(screen.getByPlaceholderText("I need to do..."), "My 2nd Todo{enter}");
    expect(screen.queryByText("My 2nd Todo")).toBeInTheDocument();

    expect(screen.getByPlaceholderText("I need to do...")).toHaveFocus();
    expect(screen.getByPlaceholderText("I need to do...")).toHaveValue("");

    userEvent.type(screen.getByPlaceholderText("I need to do..."), "My 3rd Todo{esc}");
    expect(screen.queryByText("My 3rd Todo")).not.toBeInTheDocument();

    expect(screen.getByLabelText("My 2nd Todo").parentElement).not.toHaveClass("complete");
    userEvent.click(screen.getByLabelText("My 2nd Todo"));
    expect(screen.getByLabelText("My 2nd Todo").parentElement).toHaveClass("complete");
    await waitFor(() =>
      expect(screen.getByLabelText("My 2nd Todo").parentElement).toHaveClass("complete")
    );
  });
});
