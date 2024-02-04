import React from "react";
import TodoContainer from "./TodoContainer";
import { redirect, useParams } from "react-router-dom";
import { createNewTable, getTableNames } from "../utils/fetchAirtableData";

const homeLoader = async () => {
    const tables = await getTableNames();
    if (!tables.length || !tables.some(table => table.name === "Todo")) {
        await createNewTable("Todo");
        throw redirect("/list/Todo");
    }
    return tables;
};

const Home = () => {
    const { tableName } = useParams();
    return (
        <TodoContainer tableName={tableName}/>
    );
};

export { homeLoader };
export default Home;