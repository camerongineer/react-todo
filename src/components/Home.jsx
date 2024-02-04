import React from "react";
import TodoContainer from "./TodoContainer";
import { useLoaderData } from "react-router-dom";

const LOCAL_STORAGE_REVERSED_KEY = "todoListIsReversed";
const LOCAL_STORAGE_SORT_BY_KEY = "todoListSortBy";

const homeLoader = async ({ params }) => {
    const tableName = params.tableName;
    
    const initialSortByItem = localStorage.getItem(LOCAL_STORAGE_SORT_BY_KEY);
    const initialSortBy = initialSortByItem
        ? JSON.parse(initialSortByItem)[tableName] ?? "createDateTime"
        : "createDateTime";
    
    const initialIsReversedItem = localStorage.getItem(LOCAL_STORAGE_REVERSED_KEY);
    const initialIsReversed = initialIsReversedItem ? JSON.parse(initialIsReversedItem)[tableName] ?? true : true;
    
    return { tableName, initialSortBy, initialIsReversed };
};

const Home = () => {
    const { tableName, initialSortBy, initialIsReversed } = useLoaderData();
    return (
        <TodoContainer
            tableName={tableName}
            initialSortBy={initialSortBy}
            initialIsReversed={initialIsReversed}
        />
    );
};

export { homeLoader };
export default Home;