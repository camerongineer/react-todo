import React, { useEffect, useRef } from "react";

const InputWithLabel = ({
    inputId,
    inputValue,
    type = "text",
    onInputChange,
    isFocused,
    children
}) => {
    const inputRef = useRef(null);
    
    useEffect(() => {
        if (isFocused && inputRef.current) {
            inputRef.current.focus();
        }
    });
    
    return (
        <>
            <label htmlFor={inputId}>
                {children}
            </label>
            &nbsp;
            <input ref={inputRef}
                   id={inputId}
                   type={type}
                   value={inputValue}
                   onChange={onInputChange}
            />
        </>
    );
};

export default InputWithLabel;