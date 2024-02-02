import React from "react";
import TodoContainer from "./TodoContainer";
import { useParams } from "react-router-dom";

const Home = () => {
    const { tableName } = useParams();
    return (
        <TodoContainer tableName={tableName}/>
    );
};

export default Home;