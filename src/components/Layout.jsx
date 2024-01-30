import React from 'react';
import styles from "../styles/Layout.module.css";
import {ReactComponent as Notebook} from "../assets/notebook.svg";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <div>
            <h1 className={styles.Logo}>Todo<Notebook/>List</h1>
            <Outlet/>
        </div>
    );
};

export default Layout;