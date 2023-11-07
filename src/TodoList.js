import React from "react";
import TodoListItem from "./TodoListItem";

const TodoList = ({ todoRecords }) => (
    <ul>{todoRecords.map(record =>
        <TodoListItem key={record.id} item={record.fields}/>)}
    </ul>);

export default TodoList;