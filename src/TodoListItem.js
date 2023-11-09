import React from "react";

const TodoListItem = ({ item, onRemoveClicked }) =>
    <li>
        <div style={{ display: "flex", margin: "4px 20px 4px 0", justifyContent: "space-between" }}>
            {item.title}
            <button onClick={() => onRemoveClicked(item.id)}>Remove</button>
        </div>
    </li>;

export default TodoListItem;