import React from "react";
import styles from "./Loading.module.css";
import { ReactComponent as Spinner } from "./spinner.svg";

const Loading = () => {
    return (
        <div className={styles.Loading}>
            <Spinner
                width="100px"
                height="100px"
            />
        </div>
    );
};

export default Loading;