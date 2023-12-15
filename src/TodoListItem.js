import React from "react";

const TodoListItem = ({ item, onCompleted, onRemoveClicked }) =>
    <li>
        <div style={{ display: "flex", margin: "4px 20px 4px 0", justifyContent: "space-between" }}>
            <div>
                <input type={"checkbox"} checked={item.completed} onChange={() => onCompleted(item)}/>
                <span style={{ textDecoration: item.completed ? "line-through" : "none" }}>{item.title}</span>
            </div>
            <button onClick={() => onRemoveClicked(item.id)}>Remove</button>
        </div>
    </li>;

export default TodoListItem;