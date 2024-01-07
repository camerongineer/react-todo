import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import styles from "./App.module.css";
import { ReactComponent as Notebook } from "./notebook.svg";
import Loading from "./Loading";
import Login from "./Login";

const BASE_URL = "https://api.airtable.com/v0";
const BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID;
const USER_TABLE_NAME = process.env.REACT_APP_USER_TABLE_NAME;
const API_TOKEN = process.env.REACT_APP_AIRTABLE_API_TOKEN;

const SORT_BY_LAST_MODIFIED_TIME = "?sort%5B0%5D%5Bfield%5D=lastModifiedTime&sort%5B0%5D%5Bdirection%5D=asc";
const filterByUserId = (userId) => `&filterByFormula=AND(userId='${userId}')`;

const AIRTABLE_USER_URL = `${BASE_URL}/${BASE_ID}/${USER_TABLE_NAME}`;

const fetchAirtableData = async ({ method, url, body }) => {
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`
    };
    
    const axiosConfig = {
        method: method,
        url: url,
        headers: headers,
        ...(body ? { data: body } : {})
    };
    
    try {
        const response = await axios(axiosConfig);
        return response.data;
    } catch (error) {
        throw new Error(`Error: ${error.response ? error.response.status : "Unknown"}`);
    }
};

const getUserInfo = async () => {
    try {
        const response = await fetch("/.auth/me");
        const payload = await response.json();
        const { clientPrincipal } = payload;
        return clientPrincipal;
    } catch (error) {
        console.error("No profile could be found");
        return null;
    }
};

const App = () => {
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userInfo, setUserInfo] = useState(null);
    
    const addTodo = async (newTodo) => {
        const airtableData = {
            fields: {
                title: newTodo,
                userId: userInfo.userId,
                user: userInfo.userDetails
            }
        };
        try {
            await fetchAirtableData({ method: "POST", body: airtableData, url: AIRTABLE_USER_URL });
        } catch (error) {
            console.log(error.message);
        }
        await loadTodos(userInfo);
    };
    
    const removeTodo = async (id) => {
        try {
            await fetchAirtableData({ method: "DELETE", url: `${AIRTABLE_USER_URL}/${id}` });
        } catch (error) {
            console.log(error.message);
        }
        await loadTodos(userInfo);
    };
    
    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const loadedUserInfo = await getUserInfo();
            setUserInfo(loadedUserInfo);
            await loadTodos(loadedUserInfo);
            setIsLoading(false);
        })();
    }, []);
    
    const loadTodos = async () => {
        const loadedUserInfo = await getUserInfo();
        if (loadedUserInfo) {
            try {
                const url = `${AIRTABLE_USER_URL}${SORT_BY_LAST_MODIFIED_TIME}${filterByUserId(loadedUserInfo.userId)}`;
                const response = await fetchAirtableData({ method: "GET", url: url });
                
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
        }
    };
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <div className={styles.container}>
                        <div className={styles.App}>
                            <div className={styles.Logo}>
                                <h1>Todo</h1>
                                <Notebook
                                    width="50px"
                                    height="50px"
                                />
                                <h1>List</h1>
                            </div>
                            <Login userInfo={userInfo}/>
                            {isLoading ? (
                                <Loading/>
                            ) : (
                                userInfo &&
                                <>
                                    <AddTodoForm onAddTodo={addTodo}/>
                                    <TodoList
                                        todoList={todoList}
                                        onRemoveTodo={removeTodo}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                }/>
                <Route
                    path="/new"
                    element={
                        <h1>New Todo List</h1>
                    }
                />
                <Route
                    path={"/login"}
                    element={<Login/>}
                />
            
            </Routes>
        </BrowserRouter>
    );
};

export default App;