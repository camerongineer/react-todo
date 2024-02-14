import React from "react";
import TodoListItem from "./TodoListItem";
import PropTypes from "prop-types";

const TodoList = ({todoList, onRemoveTodo, onCheckToggled}) => (
    <ul>{todoList.map(listItem =>
        <TodoListItem
            key={listItem.id}
            item={listItem}
            onRemoveClicked={onRemoveTodo}
            onCheckToggled={onCheckToggled}
        />)}
    </ul>);

TodoList.propTypes = {
    todoList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
        }),
    ),
    onRemoveTodo: PropTypes.func.isRequired,
}

export default TodoList;