import React from "react";
import Header from "./Header";
import { Outlet, redirect, useLoaderData, useParams } from "react-router-dom";
import { createNewTable, getTableNames } from "../utils/fetchAirtableData";

const layoutLoader = async () => {
    const tables = await getTableNames();
    if (!tables.length || !tables.some(table => table.name === "Todo")) {
        await createNewTable("Todo");
        throw redirect("/list/Todo");
    }
    return tables;
};

const Layout = () => {
    const tables = useLoaderData();
    const { tableName } = useParams();
    
    return (
        <div>
            <Header
                tableName={tableName}
                tables={tables}
            />
            <Outlet/>
        </div>
    );
};

export { layoutLoader };
export default Layout;