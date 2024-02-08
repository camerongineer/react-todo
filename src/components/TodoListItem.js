import React from "react";
import styles from "../styles/TodoListItem.module.css";
import { ReactComponent as Remove } from "../assets/delete.svg";
import PropTypes from "prop-types";

const TodoListItem = ({ item, onRemoveClicked, onCheckToggled }) => {
    const handleCheckToggled = () => onCheckToggled(item);
    
    return <li className={styles.ListItem}>
        <div className={`${styles.row} ${item.completeDateTime ? styles.complete : ""}`}>
            <span>
                <input
                    className={styles.checkbox}
                    type="checkbox"
                    defaultChecked={!!item.completeDateTime}
                    onChange={handleCheckToggled}
                />
                {item.title}
            </span>
            <button
                id={styles.removeButton}
                type="button"
                data-testid="remove-button"
                onClick={() => onRemoveClicked(item.id)}
            >
                <Remove/>
            </button>
        </div>
    </li>;
};

TodoListItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string.isRequired, title: PropTypes.string.isRequired
    }).isRequired, onRemoveClicked: PropTypes.func.isRequired
};

export default TodoListItem;