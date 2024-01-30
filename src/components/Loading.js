import React from "react";
import styles from "../styles/Loading.module.css";
import { ReactComponent as Spinner } from "../assets/spinner.svg";

const Loading = () => {
    return (
        <div className={styles.Loading}>
            <Spinner/>
        </div>
    );
};

export default Loading;