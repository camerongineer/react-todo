import React, { useState } from "react";
import InputWithLabel from "./InputWithLabel";

const RequestCreate = ({
    onCreateClicked
}) => {
    const [tableName, setTableName] = useState("");
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        await onCreateClicked(tableName)
    }
    
    return (
        <div>
            <form
                onSubmit={handleSubmit}
            >
                <InputWithLabel
                    inputId="newTableInput"
                    inputValue={tableName}
                    onInputChange={(event) => setTableName(event.target.value)}
                    isFocused
                />
                <button type="submit">Create List</button>
            </form>
        </div>
    );
};

export default RequestCreate;