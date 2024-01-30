import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as Arrow } from "../assets/down-arrow.svg";
import styles from "../styles/SortBox.module.css";

const SortBox = ({
    isReversed,
    onIsReversedChange,
    onSortFieldChange,
    sortField
}) => {
    return (
        <div className={styles.Container}>
            <label htmlFor="selectField">Sort By:</label>
            <select
                id="selectField"
                value={sortField}
                onChange={onSortFieldChange}
            >
                <option value="title">Title</option>
                <option value="lastModifiedTime">Recently Updated</option>
            </select>
            <Arrow className={isReversed ? styles.Descending : styles.Ascending} onClick={onIsReversedChange}/>
        </div>
    );
};

SortBox.propTypes = {
    isReversed: PropTypes.bool.isRequired,
    onIsReversedChange: PropTypes.func.isRequired,
    onSortFieldChange: PropTypes.func.isRequired,
    sortField: PropTypes.string.isRequired
}

export default SortBox;
