import React from "react";
import TodoListItem from "./TodoListItem";

const TodoList = ({ todoList }) => (
    <ul>{todoList.map(listItem =>
        <TodoListItem key={listItem.id} item={listItem}/>)}
    </ul>);

export default TodoList;