import React, { useContext } from "react";
import { TodoContext } from "./TodoContext";

const TodoItemCount = () => {
    const { count } = useContext(TodoContext);
    
    return (
        <div>
            Todos: {count}
        </div>
    );
};

export default TodoItemCount;