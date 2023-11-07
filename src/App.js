import React from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import useAirtableState from "./hooks/UseAirtableState";

const App = () => {
    const [todoRecords, postNewTodoRecord] = useAirtableState("todolist");
    const addTodo = (newTodoTitle) => postNewTodoRecord({ "title": newTodoTitle });
    
    return (
        <>
            <h1>Todo List</h1>
            <hr/>
            <AddTodoForm onAddToDo={addTodo}/>
            <TodoList todoRecords={todoRecords}/>
            <hr/>
        </>
    );
};

export default App;