import React from 'react';
import TodoListItem from "./TodoListItem";

const TodoList = ({ list }) => list.map(listItem => <TodoListItem key={listItem.id} item={listItem}/>);

export default TodoList;