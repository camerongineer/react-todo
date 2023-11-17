import React, { useEffect, useState } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

const App = () => {
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const addTodo = (newTodo) => setTodoList(prevTodoList => [...prevTodoList, newTodo]);
    const removeTodo = (id) => setTodoList(prevTodoList => prevTodoList.filter(item => item.id !== id));
    
    useEffect(() => {
        new Promise(resolve => {
            setTimeout(() => {
                resolve({ data: { todoList: JSON.parse(localStorage.getItem("todoList")) ?? [] } });
            }, 2000);
        }).then(result => {
            setTodoList(result.data.todoList);
            setIsLoading(false);
        });
    }, []);
    
    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem("todoList", JSON.stringify(todoList));
        }
    }, [todoList]);
    
    return (
        <>
            <h1>Todo List</h1>
            <hr/>
            <AddTodoForm onAddTodo={addTodo}/>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <TodoList todoList={todoList} onRemoveTodo={removeTodo}/>
            )}
            <hr/>
        </>
    );
};

export default App;