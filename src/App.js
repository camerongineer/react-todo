import React, { useEffect, useState } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

const useSemiPersistentState = (key, initialState) => {
    const [value, setValue] = useState(JSON.parse(localStorage.getItem(key)) ?? initialState);
    
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    
    return [value, setValue];
};

const App = () => {
    const [todoList, setTodoList] = useSemiPersistentState("savedTodoList", []);
    const addTodo = (newTodo) => setTodoList(prevTodoList => [...prevTodoList, newTodo]);
    
    return (
        <>
            <h1>Todo List</h1>
            <hr/>
            <AddTodoForm onAddToDo={addTodo}/>
            <TodoList todoList={todoList}/>
            <hr/>
        </>
    );
};

export default App;