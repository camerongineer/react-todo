import React, { useEffect, useReducer, useState } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import todoReducer from "./todoReducer";

const App = () => {
    // const [todoList, setTodoList] = useState([]); <== OLD WAY
    const [todoList, dispatch] = useReducer(todoReducer, []); // <=== NEW WAY
    
    const [isLoading, setIsLoading] = useState(true);
    
    //const addTodo = (newTodo) => setTodoList(prevTodoList => [...prevTodoList, newTodo]); <== OLD WAY
    const addTodo = (newTodo) => dispatch({type: "ADD_TODO", payload: newTodo}); //<== NEW WAY
    
    // const removeTodo = (id) => setTodoList(prevTodoList => prevTodoList.filter(item => item.id !== id));
    const removeTodo = (id) => dispatch({type: "REMOVE_TODO", payload: id}); // NEW WAY
    
    useEffect(() => {
        new Promise(resolve => {
            setTimeout(() => {
                resolve({ data: { todoList: JSON.parse(localStorage.getItem("todoList")) ?? [] } });
            }, 2000);
        }).then(result => {
            
            // setTodoList(result.data.todoList); <== OLD WAY
            dispatch({ type: "SET_TODOS", payload: result.data.todoList ?? [] }); // <=== NEW WAY
            
            setIsLoading(false);
        });
    }, []);
    
    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem("todoList", JSON.stringify(todoList));
        }
    }, [isLoading, todoList]);
    
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