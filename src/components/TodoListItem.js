import React from "react";
import styles from "../TodoListItem.module.css";
import { ReactComponent as Remove } from "../delete.svg";
import PropTypes from "prop-types";

const TodoListItem = ({ item, onRemoveClicked }) =>
    <li className={styles.ListItem}>
        <div className={styles.row}>
            {item.title}
            <button
                type="button"
                onClick={() => onRemoveClicked(item.id)}
            >
                <Remove/>
            </button>
        </div>
    </li>;

TodoListItem.propTypes = {
    item: PropTypes.object.isRequired,
    onRemoveClicked: PropTypes.func.isRequired
};

export default TodoListItem;