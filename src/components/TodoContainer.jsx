import React, {useEffect, useState} from 'react';
import axios from "axios";
import styles from "../styles/TodoContainer.module.css";
import AddTodoForm from "./AddTodoForm";
import Loading from "./Loading";
import TodoList from "./TodoList";

const BASE_URL = "https://api.airtable.com/v0";
const BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID;
const TABLE_NAME = process.env.REACT_APP_TABLE_NAME;
const API_TOKEN = process.env.REACT_APP_AIRTABLE_API_TOKEN;
// Sorts todos by lastModifiedTime if this entry exists as field type
const SORT_BY_LAST_MODIFIED_TIME = ""; //"?sort%5B0%5D%5Bfield%5D=lastModifiedTime&sort%5B0%5D%5Bdirection%5D=asc";

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

const TodoContainer = () => {
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
        <div className={styles.container}>
            <div className={styles.App}>
                <AddTodoForm onAddTodo={addTodo}/>
                {isLoading ? (
                    <Loading/>
                ) : (
                    <TodoList
                        todoList={todoList}
                        onRemoveTodo={removeTodo}
                    />
                )}
            </div>
        </div>
    );
};

export default TodoContainer;