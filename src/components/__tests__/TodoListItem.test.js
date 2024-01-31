import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, jest, test } from "@jest/globals";
import TodoListItem from "../TodoListItem";

describe("TodoListItem", () => {
    const mockItem = {
        id: "1",
        title: "Test Todo Item"
    };
    
    const mockOnRemoveClicked = jest.fn();
    
    test("renders TodoListItem component", () => {
        render(<TodoListItem item={mockItem} onRemoveClicked={mockOnRemoveClicked}/>);
        
        expect(screen.getByText(mockItem.title))
            .toBeDefined();
        
        expect(screen.getByTestId("remove-button"))
            .toBeDefined();
    });
    
    test("calls onRemoveClicked when remove button is clicked", () => {
        render(<TodoListItem item={mockItem} onRemoveClicked={mockOnRemoveClicked}/>);
        
        fireEvent.click(screen.getByTestId("remove-button"));
        
        expect(mockOnRemoveClicked)
            .toHaveBeenCalledWith(mockItem.id);
    });
});
