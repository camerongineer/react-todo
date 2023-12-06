import React, { useEffect, useState } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

const BASE_URL = "https://api.airtable.com/v0";
const BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID;
const TABLE_NAME = process.env.REACT_APP_TABLE_NAME;
const API_TOKEN = process.env.REACT_APP_AIRTABLE_API_TOKEN;
// Sorts todos by lastModifiedTime if this entry exists as field type
const SORT_BY_LAST_MODIFIED_TIME = ""; //"?sort%5B0%5D%5Bfield%5D=lastModifiedTime&sort%5B0%5D%5Bdirection%5D=asc";

const AIRTABLE_URL = `${BASE_URL}/${BASE_ID}/${TABLE_NAME}`;

const fetchTodos = async () => {
    try {
        const response = await fetch(AIRTABLE_URL + SORT_BY_LAST_MODIFIED_TIME, {
            headers: {
                "Authorization": `Bearer ${API_TOKEN}`
            }
        });
        
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        
        const todosFromAPI = await response.json();
        
        return todosFromAPI.records.map(todo => {
            return {
                id: todo.id,
                title: todo.fields.title
            };
        });
    } catch (error) {
        console.log(error.message);
        return [];
    }
};

const postTodo = async (newTodo) => {
    const airtableData = {
        fields: {
            title: newTodo
        }
    };
    
    try {
        const response = await fetch(AIRTABLE_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(airtableData)
        });
        
        if (!response.ok) {
            throw new Error(`Error has occurred: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.log(error.message);
        return null;
    }
};

const deleteTodo = async (id) => {
    const deleteUrl = `${AIRTABLE_URL}/${id}`;
    
    try {
        const response = await fetch(deleteUrl, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${API_TOKEN}`,
                "Content-Type": "application/json"
            }
        });
        
        if (!response.ok) {
            throw new Error(`Error has occurred: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.log(error.message);
        return null;
    }
};

const App = () => {
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const addTodo = async (newTodo) => {
        await postTodo(newTodo);
        await loadTodos();
    };
    const removeTodo = async (id) => {
        await deleteTodo(id);
        await loadTodos();
    };
    
    useEffect(() => {
        const loadData = async () => await loadTodos();
        loadData();
        setIsLoading(false);
    }, []);
    
    const loadTodos = async () => setTodoList(await fetchTodos());
    
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