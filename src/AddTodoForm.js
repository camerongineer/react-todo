import React from 'react';

const FORM_ID = 'todoTitle'

const AddTodoForm = () => (
        <form>
            <label htmlFor={FORM_ID}>Title: </label>
            <input id={FORM_ID}/>
            <button type={'submit'}>Add</button>
        </form>
    );

export default AddTodoForm;