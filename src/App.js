import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

const BASE_URL = "https://api.airtable.com/v0";
const BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID;
const TABLE_NAME = process.env.REACT_APP_TABLE_NAME;
const API_TOKEN = process.env.REACT_APP_AIRTABLE_API_TOKEN;
// Sorts todos by lastModifiedTime if this entry exists as field type
const SORT_BY_LAST_MODIFIED_TIME = "?sort%5B0%5D%5Bfield%5D=lastModifiedTime&sort%5B0%5D%5Bdirection%5D=asc";

const AIRTABLE_URL = `${BASE_URL}/${BASE_ID}/${TABLE_NAME}`;

const fetchAirtableData = async ({ method, url, body }) => {
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`
    };
    
    const fullUrl = `${AIRTABLE_URL}${url ?? ""}`;
    
    let response;
    switch (method) {
        case "POST":
            response = await axios.post(fullUrl, body, { headers });
            break;
        case "GET":
            response = await axios.get(fullUrl, { headers });
            break;
        case "DELETE":
            response = await axios.delete(fullUrl, { headers });
            break;
        default:
            throw new Error("Invalid method type.");
    }
    
    if (!response || response.status !== 200) {
        throw new Error(`Error: ${response ? response.status : "Unknown"}`);
    }
    
    return response.data;
};

const App = () => {
    const [todoList, setTodoList] = useState([]);
    const [loading, setLoading] = useState(true);
    
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
        // Add a request interceptor
        const requestInterceptor = axios.interceptors.request.use(
            (config) => {
                // Show loading indicator
                setLoading(true);
                return config;
            },
            (error) => {
                // Hide loading indicator on request error
                setLoading(false);
                return Promise.reject(error);
            }
        );
        
        // Add a response interceptor
        const responseInterceptor = axios.interceptors.response.use(
            (response) => {
                // Hide loading indicator on successful response
                setLoading(false);
                return response;
            },
            (error) => {
                // Hide loading indicator on response error
                setLoading(false);
                return Promise.reject(error);
            }
        );
        
        // Cleanup the interceptors when the component is unmounted
        return () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        };
    }, []); // Run this effect only once on component mount
    
    useEffect(() => {
        const loadData = async () => {
            await loadTodos();
        };
        loadData();
    }, []);
    
    const loadTodos = async () => {
        try {
            debugger
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
            {loading ? (
                <p>Loading...</p>
            ) : (
                <TodoList todoList={todoList} onRemoveTodo={removeTodo}/>
            )}
            <hr/>
        </>
    );
};

export default App;