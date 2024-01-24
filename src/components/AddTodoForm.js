import React, { useState } from "react";
import InputWithLabel from "./InputWithLabel";
import { ReactComponent as Add } from "../add.svg";
import styles from "../AddTodoForm.module.css";

const INITIAL_TITLE_VALUE = "";
const TITLE_ID = "todoTitle";

const AddTodoForm = ({ onAddTodo }) => {
    const [todoTitle, setTodoTitle] = useState(INITIAL_TITLE_VALUE);
    
    const handleTitleChange = (event) => {
        const newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    };
    
    const handleAddTodo = (event) => {
        event.preventDefault();
        
        if (!todoTitle.trim().length) {
            alert("You must provide a title!");
            return;
        }
        
        onAddTodo(todoTitle);
        setTodoTitle(INITIAL_TITLE_VALUE);
    };
    
    return (
        <form onSubmit={handleAddTodo}>
            <div className={styles.AddTodoForm}>
                <InputWithLabel
                    inputValue={todoTitle}
                    onInputChange={handleTitleChange}
                    isFocused
                    inputId={TITLE_ID}
                />
                <button type="submit">
                    <Add/>
                </button>
            </div>
        </form>
    );
};

export default AddTodoForm;