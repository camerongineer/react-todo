import React from "react";
import styles from "../styles/Header.module.css";
import {ReactComponent as Notebook} from "../assets/notebook.svg";
import { NavLink } from "react-router-dom";

const Header = ({ tableName, tables }) => {
    return (
        <div>
            <h1 className={styles.Logo}>{tableName}<Notebook className={styles.Icon}/>List</h1>
            {tables?.map(table => <NavLink key={table.id} to={`list/${table.name}`}>{table.name}</NavLink>)}
            <NavLink to="create-list">Plus</NavLink>
        </div>
    );
};

export default Header;