import React, { useState } from "react";
import InputWithLabel from "./InputWithLabel";
import Header from "./Header";
import styles from "../styles/RequestCreate.module.css";
import PropTypes from "prop-types";

const RequestCreate = ({
    onCreateClicked
}) => {
    const [tableName, setTableName] = useState("");
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        await onCreateClicked(tableName);
    };
    
    return (
        <>
            <Header tableName={tableName}/>
            <form
                onSubmit={handleSubmit}
            >
                <div className={styles.FormContainer}>
                    <InputWithLabel
                        inputId="newTableInput"
                        inputValue={tableName}
                        onInputChange={(event) => setTableName(event.target.value)}
                        isFocused
                    />
                    <button
                        type="submit"
                        disabled={!tableName.length}
                        className={!tableName.length ? styles.Disabled : styles.Button}
                    >
                        Create
                    </button>
                </div>
            </form>
        </>
    );
};

RequestCreate.propTypes = {
    onCreateClicked: PropTypes.func.isRequired
};

export default RequestCreate;