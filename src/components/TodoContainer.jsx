import React, { useEffect, useState } from "react";
import styles from "../styles/TodoContainer.module.css";
import AddTodoForm from "./AddTodoForm";
import Loading from "./Loading";
import TodoList from "./TodoList";
import { sortByField } from "../utils";
import SortBox from "./SortBox";
import { fetchAirtableData } from "../api/airtable";

const LOCAL_STORAGE_SORT_KEY = "todoListSort";
const GRID_VIEW = "view=Grid view";

const savedSortOptions = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SORT_KEY)) ?? {};
const initialSort = savedSortOptions.sortBy ?? "createDateTime";
const initialIsReversed = savedSortOptions.isReversed ?? true;

const TodoContainer = ({ tableName }) => {
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortBy, setSortBy] = useState(initialSort);
    const [isReversed, setIsReversed] = useState(initialIsReversed);

    const addTodo = async (newTodo) => {
        const airtableData = {
            fields: {
                title: newTodo,
                createDateTime: new Date().toISOString()
            }
        };
        try {
            await fetchAirtableData({ method: "POST", body: airtableData, url: `/${tableName}` });
        } catch (error) {
            console.log(error.message);
        }
        await loadTodos();
    };

    const removeTodo = async (id) => {
        try {
            await fetchAirtableData({ method: "DELETE", url: `/${tableName}/${id}` });
        } catch (error) {
            console.log(error.message);
        }
        await loadTodos();
    };

    const loadTodos = async () => {
        try {
            const response = await fetchAirtableData({ method: "GET", url: `/${tableName}?${GRID_VIEW}` });

            const todosFromAPI = await response;

            setTodoList(
                sortByField(
                    todosFromAPI.records.map(todo => {
                        return {
                            id: todo.id,
                            title: todo.fields.title,
                            createDateTime: todo.fields.createDateTime,
                            completeDateTime: todo.fields.completeDateTime
                        };
                    }),
                        initialSort,
                        initialIsReversed
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
    }, [tableName]);

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