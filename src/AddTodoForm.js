import React from 'react';

const FORM_ID = 'todoTitle'

const AddTodoForm = ({ onAddToDo }) => {
    const handleAddTodo = (event) => {
        event.preventDefault();
        const todoTitle = event.target.name;
        console.log(todoTitle);
        onAddToDo(todoTitle)
    }

    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor={FORM_ID}>Title: </label>
            <input id={FORM_ID} name='title'/>
            <button type='submit'>Add</button>
        </form>
    )
};

export default AddTodoForm;