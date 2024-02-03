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

const initialSort = localStorage.getItem(LOCAL_STORAGE_SORT_BY_KEY) ?? "createDateTime";
const initialIsReversed = JSON.parse(localStorage.getItem(LOCAL_STORAGE_REVERSED_KEY)) ?? true;

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
            const newTodoRes = await fetchAirtableData({ method: "POST", body: airtableData, url: tableName });
            setTodoList(prevTodoList => {
                    const newList = [
                        ...prevTodoList,
                        {
                            id: newTodoRes.id,
                            title: newTodoRes.fields.title,
                            createDateTime: newTodoRes.fields.createDateTime
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
            const removedTodoRes = await fetchAirtableData({ method: "DELETE", url: `${tableName}/${id}` });
            if (removedTodoRes.deleted) {
                setTodoList(prevState => prevState.filter(todo => removedTodoRes.id !== todo.id));
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    
    useEffect(() => {
        const loadTodo = async () => {
            try {
                const todosRes = await fetchAirtableData({ method: "GET", url: `${tableName}?${GRID_VIEW}` });
                const todos = todosRes.records.map(todo => {
                    return {
                        id: todo.id,
                        title: todo.fields.title,
                        createDateTime: todo.fields.createDateTime
                    };
                });
                const sortedTodos = sortByField(todos, initialSort, initialIsReversed);
                setTodoList(sortedTodos);
            } catch (error) {
                console.log(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        loadTodo();
    }, [tableName]);
    
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
                {isLoading ? (
                    <Loading/>
                ) : (
                    <>
                        <AddTodoForm onAddTodo={addTodo}/>
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