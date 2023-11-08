import React from "react";
import TodoListItem from "./TodoListItem";

const TodoList = ({ todoList, onRemoveTodo }) => (
    <ul>{todoList.map(listItem =>
        <TodoListItem key={listItem.id} item={listItem} onRemoveClicked={onRemoveTodo}/>)}
    </ul>);

export default TodoList;