import React from "react";
import TodoListItem from "./TodoListItem";

const TodoList = ({ todoList, onCompleted, onRemoveTodo }) => (
    <ul style={{ listStyle: "none" }}>{todoList.map(listItem =>
        <TodoListItem key={listItem.id} item={listItem} onCompleted={onCompleted} onRemoveClicked={onRemoveTodo}/>)}
    </ul>);

export default TodoList;