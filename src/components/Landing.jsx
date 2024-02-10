import React from "react";
import styles from "../styles/Landing.module.css";
import { createNewTable, getTableNames } from "../utils/fetchAirtableData";
import { useLoaderData, useNavigate } from "react-router-dom";
import LandingMenuButton from "./LandingMenuButton";
import {ReactComponent as Plus} from "../assets/plus.svg";

const landingLoader = async () => {
    const tables = await getTableNames();
    if (!tables.length || !tables.some(table => table.name === "Todo")) {
        await createNewTable("Todo");
    }
    return tables;
};

const Landing = () => {
    const tables = useLoaderData();
    const navigate = useNavigate();
    
    const onPlusClicked = () => navigate("create-list")
    
    return (
        <div className={styles.MenuContainer}>
            <div className={styles.Menu}>
                {tables.map(table => <LandingMenuButton key={table.id} table={table}/>)}
                <div className={styles.Plus}>
                    <button onClick={onPlusClicked}><Plus/></button>
                </div>
            </div>
        </div>
    );
};

export { landingLoader };
export default Landing;