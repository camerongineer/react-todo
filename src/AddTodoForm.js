import React from 'react';

const TITLE_ID = 'todoTitle';
const FORM_ID = 'addTodoForm';

const AddTodoForm = ({ onAddToDo }) => {

    const handleAddTodo = (event) => {
        event.preventDefault();
        const todoTitle = event.target.title.value;
        onAddToDo(todoTitle);
        document.querySelector(`#${FORM_ID}`).reset();
    };

    return (
        <form id={FORM_ID} onSubmit={handleAddTodo}>
            <label htmlFor={TITLE_ID}>Title:&nbsp;
                <input id={TITLE_ID} name='title'/>
                <button type='submit'>Add</button>
            </label>
        </form>
    );
};

export default AddTodoForm;