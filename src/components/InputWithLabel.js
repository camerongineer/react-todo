import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

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
            <input
                ref={inputRef}
                id={inputId}
                type={type}
                value={inputValue}
                onChange={onInputChange}
            />
        </>
    );
};

InputWithLabel.propTypes = {
    inputId: PropTypes.string.isRequired,
    inputValue: PropTypes.string.isRequired,
    type: PropTypes.string,
    onInputChange: PropTypes.func.isRequired,
    isFocused: PropTypes.bool.isRequired,
    children: PropTypes.string
};

export default InputWithLabel;