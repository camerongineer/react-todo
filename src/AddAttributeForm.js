import React, { useState } from "react";

const INITIAL_TITLE_VALUE = "";
const TITLE_ID = "attributeTitle";

const AddAttributeForm = ({ onAddAttribute, label: labelText }) => {
    const [attributeTitle, setAttributeTitle] = useState(INITIAL_TITLE_VALUE);
    
    const handleTitleChange = (event) => {
        const newAttributeTitle = event.target.value;
        setAttributeTitle(newAttributeTitle);
    };
    
    const handleAddTodo = (event) => {
        event.preventDefault();
        onAddAttribute({
            title: attributeTitle,
            id: Date.now()
        });
        setAttributeTitle(INITIAL_TITLE_VALUE);
    };
    
    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor={TITLE_ID}>{labelText}:&nbsp;
                <input id={TITLE_ID} name="title" value={attributeTitle} onChange={handleTitleChange}/>
            </label>
            <button type="submit">Add</button>
        </form>
    );
};

export default AddAttributeForm;