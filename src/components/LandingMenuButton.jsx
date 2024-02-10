import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/LandingMenuButton.module.css";
import {ReactComponent as Notebook} from "../assets/notebook.svg";

const LandingMenuButton = ({ table }) => {
    const navigate = useNavigate();
    
    const onButtonClick = () => {
        navigate(`/list/${table.name}`);
    };
    
    return (
        <div className={styles.Container}>
            <button
                className={styles.MenuButton}
                onClick={onButtonClick}
            >
                <h2 className={styles.Logo}>{table.name}<Notebook className={styles.Icon}/>List</h2>
            </button>
        </div>
    );
};

export default LandingMenuButton;