import React, { useState } from "react";

const INITIAL_TITLE_VALUE = "";
const TITLE_ID = "todoTitle";

const AddEducationForm = ({ onAddToDo }) => {
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
            <label htmlFor={TITLE_ID}>Education:&nbsp;
                <input id={TITLE_ID} name="title" value={todoTitle} onChange={handleTitleChange}/>
            </label>
            <button type="submit">Add</button>
        </form>
    );
};

export default AddEducationForm;