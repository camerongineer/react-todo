import React from "react";
import styles from "../styles/Header.module.css";
import { ReactComponent as Back } from "../assets/back.svg";
import { ReactComponent as Notebook } from "../assets/notebook.svg";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Header = ({ tableName }) => {
    const navigate = useNavigate();
    return (
        <>
            <div className={styles.Container}>
                <h1 className={styles.Logo}>{tableName || "?"}<Notebook className={styles.Icon}/>List</h1>
                <Back className={styles.Back} onClick={() => navigate("/")}/>
            </div>
        </>
    );
};

Header.propTypes = {
    tableName: PropTypes.string
};

export default Header;