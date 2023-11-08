import React, { useState } from "react";
import InputWithLabel from "./InputWithLabel";

const INITIAL_TITLE_VALUE = "";
const TITLE_ID = "todoTitle";

const AddTodoForm = ({ onAddToDo }) => {
    const [todoTitle, setTodoTitle] = useState(INITIAL_TITLE_VALUE);
    
    const handleTitleChange = (event) => {
        const newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    };
    
    const handleAddTodo = (event) => {
        event.preventDefault();
        onAddToDo({
            title: todoTitle,
            id: Date.now()
        });
        setTodoTitle(INITIAL_TITLE_VALUE);
    };
    
    return (
        <form onSubmit={handleAddTodo}>
            <InputWithLabel inputValue={todoTitle}
                            onInputChange={handleTitleChange}
                            isFocused
                            inputId={TITLE_ID}>
                <strong>Title:</strong>
            </InputWithLabel>
            <button type="submit">Add</button>
        </form>
    );
};

export default AddTodoForm;