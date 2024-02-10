import React from "react";
import Header from "./Header";
import styles from "../styles/Layout.module.css";
import { Outlet, useParams } from "react-router-dom";

const Layout = () => {
    const { tableName } = useParams();
    
    return (
        <div className={styles.Container}>
            <div className={styles.App}>
                <Header tableName={tableName}/>
                <Outlet/>
            </div>
        </div>
    );
};

export default Layout;