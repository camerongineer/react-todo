import React from 'react';

const FORM_ID = 'todoTitle';

const AddTodoForm = ({ onAddToDo }) => {

    const handleAddTodo = (event) => {
        event.preventDefault();
        onAddToDo(event.target.title.value);
        event.target.title.value = '';
    };

    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor={FORM_ID}>{'Title: '}
                <input id={FORM_ID} name='title'/>
                <input type='submit' value={'Add'}/>
            </label>
        </form>
    );
};

export default AddTodoForm;