import React from "react";
import { render, screen } from "@testing-library/react";

import TodoList from "../TodoList";
import { describe, expect, jest, test } from "@jest/globals";

describe("TodoList", () => {
    const mockTodoList = [
        { id: "1", title: "Task 1" },
        { id: "2", title: "Task 2" },
        { id: "3", title: "Task 3" }
    ];
    
    const mockOnRemoveTodo = jest.fn();
    
    test("renders TodoList component with todo items", () => {
        render(<TodoList todoList={mockTodoList} onRemoveTodo={mockOnRemoveTodo}/>);
        
        mockTodoList.forEach((item) => {
            expect(screen.getByText(item.title))
                .toBeTruthy();
        });
        
        mockTodoList.forEach((item) => {
            expect(screen.getByText(item.title))
                .toBeDefined();
        });
    });
    
    test("renders TodoList component with three todo items", () => {
        render(<TodoList todoList={mockTodoList} onRemoveTodo={mockOnRemoveTodo} />);
        
        mockTodoList.forEach((item) => {
            expect(screen.getByText(item.title)).toBeDefined();
        });
        
        const todoItems = screen.getAllByRole("listitem");
        expect(todoItems).toHaveLength(3);
    });
});
