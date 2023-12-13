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

const fetchAirtableData = async ({ method, url, body }) => {
    const response = await fetch(`${AIRTABLE_URL}${url ?? ""}`, {
        method,
        headers: {
            "Authorization": `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
    
    if (!response.ok) {
        return Promise.reject(`Error: ${response.status}`);
    }
    
    if (response.headers.get("Content-Type").includes("application/json")) {
        return await response.json();
    }
    
    return null;
};

const App = () => {
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const addTodo = async (newTodo) => {
        const airtableData = {
            fields: {
                title: newTodo
            }
        };
        try {
            await fetchAirtableData({ method: "POST", body: airtableData });
        } catch (error) {
            console.log(error.message);
        }
        await loadTodos();
    };
    
    const removeTodo = async (id) => {
        try {
            await fetchAirtableData({ method: "DELETE", url: `/${id}` });
        } catch (error) {
            console.log(error.message);
        }
        await loadTodos();
    };
    
    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            await loadTodos();
            setIsLoading(false);
        };
        loadData();
    }, []);
    
    const loadTodos = async () => {
        try {
            const response = await fetchAirtableData({ method: "GET", url: SORT_BY_LAST_MODIFIED_TIME });
            
            const todosFromAPI = await response;
            
            setTodoList(todosFromAPI.records.map(todo => {
                return {
                    id: todo.id,
                    title: todo.fields.title
                };
            }));
        } catch (error) {
            console.log(error.message);
            setTodoList([]);
        }
    };
    
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