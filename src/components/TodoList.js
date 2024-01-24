import React from "react";
import TodoListItem from "./TodoListItem";
import PropTypes from "prop-types";

const TodoList = ({ todoList, onRemoveTodo }) => (
    <ul>{todoList.map(listItem =>
        <TodoListItem
            key={listItem.id}
            item={listItem}
            onRemoveClicked={onRemoveTodo}
        />)}
    </ul>);

TodoList.propTypes = {
    todoList: PropTypes.array.isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoList;