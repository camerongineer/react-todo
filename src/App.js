import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const BASE_URL = "https://api.airtable.com/v0";
const BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID;
const TABLE_NAME = process.env.REACT_APP_TABLE_NAME;
const API_TOKEN = process.env.REACT_APP_AIRTABLE_API_TOKEN;
// Sorts todos by lastModifiedTime if this entry exists as field type
const SORT_BY_LAST_MODIFIED_TIME = "?sort[0][field]=completed&sort[0][direction]=asc&sort[1][field]=lastModifiedTime&sort[1][direction]=asc";

const AIRTABLE_URL = `${BASE_URL}/${BASE_ID}/${TABLE_NAME}`;

const fetchAirtableData = async ({ method, url, body }) => {
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`
    };
    
    const axiosConfig = {
        method: method,
        url: `${AIRTABLE_URL}${url ?? ""}`,
        headers: headers,
        ...(body ? { data: body } : {}),
    };
    
    try {
        const response = await axios(axiosConfig);
        return response.data;
    } catch (error) {
        throw new Error(`Error: ${error.response ? error.response.status : "Unknown"}`);
    }
};

const App = () => {
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const addTodo = async (newTodo) => {
        const airtableData = {
            fields: {
                title: newTodo,
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
           
            setTodoList(response.records.map(todo => {
                return {
                    id: todo.id,
                    title: todo.fields.title,
                    completed: todo.fields.completed ?? false
                };
            }));
        } catch (error) {
            console.log(error.message);
            setTodoList([]);
        }
    };
    
    const toggleCompleted = async (todoItem) => {
        todoItem.completed = !todoItem.completed;
        try {
            const airtableData = {
                fields: {
                    title: todoItem.title,
                    completed: todoItem.completed
                }
            };
            await fetchAirtableData({ method: "PATCH", url: `/${todoItem.id}`, body: airtableData });
        } catch (error) {
            console.log(error.message);
        }
        await loadTodos();
    };
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={
                    <>
                        <h1>Todo List</h1>
                        <hr/>
                        <AddTodoForm onAddTodo={addTodo}/>
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <TodoList todoList={todoList} onCompleted={toggleCompleted} onRemoveTodo={removeTodo}/>
                        )}
                        <hr/>
                    </>
                }/>
                <Route path={"/new"} element={
                    <h1>New Todo List</h1>
                }/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;