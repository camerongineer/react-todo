import React, { useEffect, useState } from "react";
import styles from "../styles/TodoContainer.module.css";
import AddTodoForm from "./AddTodoForm";
import Loading from "./Loading";
import TodoList from "./TodoList";
import { sortByField } from "../utils/sortByField";
import SortBox from "./SortBox";
import { fetchAirtableData } from "../utils/fetchAirtableData";

const GRID_VIEW = "view=Grid view";

const LOCAL_STORAGE_REVERSED_KEY = "todoListIsReversed";
const LOCAL_STORAGE_SORT_BY_KEY = "todoListSortBy";

const initialSort = localStorage.getItem(LOCAL_STORAGE_SORT_BY_KEY) ?? "lastModifiedTime";
const initialIsReversed = JSON.parse(localStorage.getItem(LOCAL_STORAGE_REVERSED_KEY)) ?? true;

const TodoContainer = () => {
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortBy, setSortBy] = useState(initialSort);
    const [isReversed, setIsReversed] = useState(initialIsReversed);
    
    const addTodo = async (newTodo) => {
        const airtableData = {
            fields: {
                title: newTodo
            }
        };
        try {
            const newTodoRes = await fetchAirtableData({ method: "POST", body: airtableData });
            setTodoList(prevTodoList => {
                    const newList = [
                        ...prevTodoList,
                        {
                            id: newTodoRes.id,
                            lastModifiedTime: newTodoRes.fields.lastModifiedTime,
                            title: newTodoRes.fields.title
                        }
                    ];
                    return sortByField(newList, sortBy, isReversed);
                }
            );
        } catch (error) {
            console.log(error.message);
        }
    };
    
    const removeTodo = async (id) => {
        try {
            const removedTodoRes = await fetchAirtableData({ method: "DELETE", url: `/${id}` });
            if (removedTodoRes.deleted) {
                setTodoList(prevState => prevState.filter(todo => id !== todo.id));
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    
    useEffect(() => {
        (async () => {
            try {
                const todosRes = await fetchAirtableData({ method: "GET", url: `?${GRID_VIEW}` });
                const todos = todosRes.records.map(todo => {
                    return {
                        id: todo.id,
                        title: todo.fields.title,
                        lastModifiedTime: todo.fields.lastModifiedTime
                    };
                });
                const sortedTodos = sortByField(todos, initialSort, initialIsReversed);
                setTodoList(sortedTodos);
            } catch (error) {
                console.log(error.message);
                setTodoList([]);
            }
            setIsLoading(false);
        })();
    }, []);
    
    useEffect(() => {
        setTodoList(prevState => sortByField(prevState, sortBy, isReversed));
        localStorage.setItem(LOCAL_STORAGE_REVERSED_KEY, isReversed);
        localStorage.setItem(LOCAL_STORAGE_SORT_BY_KEY, sortBy);
    }, [isReversed, sortBy]);
    
    const handleIsReversedChange = () => setIsReversed(prevState => !prevState);
    
    const handleSortFieldChange = (event) => {
        const newSortBy = event.target.value;
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