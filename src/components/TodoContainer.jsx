import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/TodoContainer.module.css";
import AddTodoForm from "./AddTodoForm";
import Loading from "./Loading";
import TodoList from "./TodoList";
import { sortByField } from "../utils";
import SortBox from "./SortBox";

const LOCAL_STORAGE_SORT_KEY = "todoListSort";

const BASE_URL = "https://api.airtable.com/v0";
const BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID;
const TABLE_NAME = process.env.REACT_APP_TABLE_NAME;
const API_TOKEN = process.env.REACT_APP_AIRTABLE_API_TOKEN;
const GRID_VIEW = "view=Grid view";
const SORT_BY_TITLE = "sort[0][field]=title&sort[0][direction]=asc";
const SORT_BY_LAST_MODIFIED_TIME = "sort[0][field]=lastModifiedTime&sort[0][direction]=asc";

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
        ...(body ? { data: body } : {})
    };
    
    try {
        const response = await axios(axiosConfig);
        return response.data;
    } catch (error) {
        throw new Error(`Error: ${error.response ? error.response.status : "Unknown"}`);
    }
};

const savedSortOptions = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SORT_KEY)) ?? {};

const TodoContainer = () => {
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortBy, setSortBy] = useState(savedSortOptions.sortBy ?? "lastModifiedTime");
    const [isReversed, setIsReversed] = useState(savedSortOptions.isReversed ?? true);
    
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
    
    const loadTodos = async () => {
        try {
            const response = await fetchAirtableData({ method: "GET", url: `?${GRID_VIEW}` });
            
            const todosFromAPI = await response;
            
            setTodoList(
                sortByField(
                    todosFromAPI.records.map(todo => {
                        return {
                            id: todo.id,
                            title: todo.fields.title,
                            lastModifiedTime: todo.fields.lastModifiedTime
                        };
                    }),
                    sortBy,
                    isReversed
                ));
        } catch (error) {
            console.log(error.message);
            setTodoList([]);
        }
    };
    
    useEffect(() => {
        (async () => {
            setIsLoading(true);
            await loadTodos();
            setIsLoading(false);
        })();
    }, []);
    
    useEffect(() => {
        setTodoList(prevState => sortByField(prevState, sortBy, isReversed));
    }, [isReversed, sortBy]);
    
    const handleIsReversedChange = () => {
        setIsReversed(prevState => {
            const prevLocalStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SORT_KEY)) ?? {};
            localStorage.setItem(LOCAL_STORAGE_SORT_KEY,
                JSON.stringify({ ...prevLocalStorage, "isReversed": !prevState }));
            return !prevState;
        });
    };
    
    const handleSortFieldChange = (event) => {
        const newSortBy = event.target.value;
        const prevLocalStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SORT_KEY)) ?? {};
        localStorage.setItem(LOCAL_STORAGE_SORT_KEY, JSON.stringify({ ...prevLocalStorage, "sortBy": newSortBy }));
        setSortBy(newSortBy);
    };
    
    return (
        <div className={styles.container}>
            <div className={styles.App}>
                <AddTodoForm onAddTodo={addTodo}/>
                {isLoading ? (
                    <Loading/>
                ) : (
                    <>
                        <SortBox
                            isReversed={isReversed}
                            onIsReversedChange={handleIsReversedChange}
                            onSortFieldChange={handleSortFieldChange}
                            sortField={sortBy}
                        />
                        <TodoList
                            todoList={todoList}
                            onRemoveTodo={removeTodo}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default TodoContainer;