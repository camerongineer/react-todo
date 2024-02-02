import React from "react";
import Header from "./Header";
import { Outlet, useLoaderData, useParams } from "react-router-dom";

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

export default Layout;