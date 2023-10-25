import React, { useState } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

const App = () => {
    const [todoList, setTodoList] = useState([]);
    const addTodo = (newTodo) => setTodoList(todoList => [...todoList, newTodo]);
    
    return (
        <div>
            <h1>Todo List</h1>
            <hr/>
            <AddTodoForm onAddToDo={addTodo}/>
            <TodoList todoList={todoList}/>
            <hr/>
        </div>
    );
};

export default App;