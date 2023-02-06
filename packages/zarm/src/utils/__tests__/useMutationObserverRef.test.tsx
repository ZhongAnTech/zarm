import React, { useRef } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import useMutationObserverRef from "../hooks/useMutationObserverRef";

describe("useMutationObserverRef", () => {
  it("should watch for children change", async () => {
    let id = 1;
    const fn = jest.fn();
    const TestComp = () => {
      const [ref, setNode] = useMutationObserverRef((records) => {
        // 重置监听状态
        records.forEach((record) => {
          if (Array.from(record.addedNodes)?.length >= 1) {
            fn();
          }
        });
      });

      const addTodo = () => {
        const todo = document.createElement("li");
        id += 1;
        todo.textContent = `todo ${id}`;
        ref?.appendChild(todo);
      };

      return (
        <div>
          <ul ref={setNode}>
            <li>todo {id}</li>
          </ul>
          <button onClick={addTodo} type="button">
            Add Todo
          </button>
        </div>
      );
    };

    render(<TestComp />);
    const button = screen.getByText(/add todo/iu);
    fireEvent.click(button);
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    await waitFor(() => {
      expect(fn).toBeCalledTimes(1);
    });
  })
});
