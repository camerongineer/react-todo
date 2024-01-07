import React from "react";
import styles from "./TodoListItem.module.css";
import { ReactComponent as Remove } from "./delete.svg";

const TodoListItem = ({ item, onRemoveClicked }) =>
    <li className={styles.ListItem}>
        <div className={styles.row}>
            {item.title}
            <button onClick={() => onRemoveClicked(item.id)}>
                <Remove
                    width="20px"
                    height="20px"
                />
            </button>
        </div>
    </li>;

export default TodoListItem;