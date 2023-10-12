import React from 'react';
import TodoListItem from './TodoListItem';

const TodoList = ({ list }) => <ul>{list.map(listItem => <TodoListItem key={listItem.id} item={listItem}/>)}</ul>;

export default TodoList;