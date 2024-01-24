import React from "react";
import TodoListItem from "./TodoListItem";
import TodoItemCount from "./TodoItemCount";

const TodoList = ({ todoList, onRemoveTodo }) => (
    <ul>{todoList.map(listItem =>
        <TodoListItem
            key={listItem.id}
            item={listItem}
            onRemoveClicked={onRemoveTodo}
        />)}
        <TodoItemCount/>
    </ul>);

export default TodoList;