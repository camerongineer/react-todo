import React from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import styles from "../styles/RedirectCreate.module.css";

const RedirectCreate = ({
    tableName,
    onCreateClicked
}) => {
    const navigate = useNavigate();
    const handleYesClicked = async () => await onCreateClicked(tableName);
    const handleNoClicked = async () => navigate("/");
    
    return (
        <div>
            <Header tableName={tableName}/>
            <h3>"{tableName}" doesn't exist. Would you like create a list by this name?</h3>
            <div className={styles.ButtonContainer}>
                <button onClick={handleYesClicked}>Yes</button>
                <button onClick={handleNoClicked}>No</button>
            </div>
        </div>
    );
};

export default RedirectCreate;