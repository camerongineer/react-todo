import React from "react";

const InputWithLabel = ({ inputValue, onInputChange, inputId, children }) => (
    <>
        <label htmlFor={inputId}>
            {children}
            <input autoFocus={true} id={inputId} name="title" value={inputValue} onChange={onInputChange}/>
        </label>
    </>
);

export default InputWithLabel;