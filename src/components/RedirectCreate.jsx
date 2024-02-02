import React from "react";

const RedirectCreate = ({
    tableName,
    onCreateClicked
}) => {
    const handleCreateClicked = async () => await onCreateClicked(tableName);
    
    return (
        <div>
            <h3>"{tableName}" doesn't exist. Would you like create a list by this name?</h3>
            <button onClick={handleCreateClicked}>Create {tableName} List</button>
        </div>
    );
};

export default RedirectCreate;