import React from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import useAirtable from "./hooks/UseAirtable";

const App = () => {
    const [todoRecords, postNewTodoRecord] = useAirtable("todolist");
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