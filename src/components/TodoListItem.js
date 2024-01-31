import React from "react";
import styles from "../styles/TodoListItem.module.css";
import { ReactComponent as Remove } from "../assets/delete.svg";
import PropTypes from "prop-types";

const TodoListItem = ({ item, onRemoveClicked }) =>
    <li className={styles.ListItem}>
        <div className={styles.row}>
            {item.title}
            <button
                type="button"
                data-testid="remove-button"
                onClick={() => onRemoveClicked(item.id)}
            >
                <Remove/>
            </button>
        </div>
    </li>;

TodoListItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired,
    onRemoveClicked: PropTypes.func.isRequired
};

export default TodoListItem;