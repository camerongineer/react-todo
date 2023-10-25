import React, { useState } from "react";

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
            <label htmlFor={TITLE_ID}>Title:&nbsp;
                <input id={TITLE_ID} name="title" value={todoTitle} onChange={handleTitleChange}/>
                <button type="submit">Add</button>
            </label>
        </form>
    );
};

export default AddTodoForm;