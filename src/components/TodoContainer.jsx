import React, { useEffect, useState } from "react";
import styles from "../styles/TodoContainer.module.css";
import AddTodoForm from "./AddTodoForm";
import Loading from "./Loading";
import TodoList from "./TodoList";
import { sortByField } from "../utils/sortByField";
import SortBox from "./SortBox";
import { fetchAirtableData, loadTodos } from "../utils/fetchAirtableData";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID;

const LOCAL_STORAGE_REVERSED_KEY = "todoListIsReversed";
const LOCAL_STORAGE_SORT_BY_KEY = "todoListSortBy";

const TodoContainer = ({
    tableName,
    initialSortBy,
    initialIsReversed
}) => {
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortBy, setSortBy] = useState(initialSortBy);
    const [isReversed, setIsReversed] = useState(initialIsReversed);
    const navigate = useNavigate();
    
    const addTodo = async (newTodo) => {
        const airtableData = {
            fields: {
                title: newTodo,
                createDateTime: new Date().toISOString(),
                completeDateTime: null,
                description: null
            }
        };
        try {
            const newTodoRes = await fetchAirtableData(
                { method: "POST", body: airtableData, url: `${BASE_ID}/${tableName}` });
            setTodoList(prevTodoList => {
                    const newList = [
                        ...prevTodoList,
                        {
                            id: newTodoRes.id,
                            ...airtableData.fields
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
            const removedTodoRes = await fetchAirtableData({ method: "DELETE", url: `${BASE_ID}/${tableName}/${id}` });
            if (removedTodoRes.deleted) {
                setTodoList(prevState => prevState.filter(todo => removedTodoRes.id !== todo.id));
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    
    const toggleCompleteTodo = async (todoItem) => {
        try {
            const toggledTodo = {
                ...todoItem,
                completeDateTime: todoItem.completeDateTime ? null : new Date().toISOString()
            };
            const airtableData = {
                fields: {
                    completeDateTime: toggledTodo.completeDateTime
                }
            };
            const res = await fetchAirtableData({
                method: "PATCH",
                url: `${BASE_ID}/${tableName}/${todoItem.id}`,
                body: airtableData
            });
            
            const filteredTodos = todoList.filter(todo => todo.id !== res.id);
            setTodoList(sortByField([...filteredTodos, toggledTodo], sortBy, isReversed));
        } catch (error) {
            console.log(error.message);
        }
    };
    
    useEffect(() => {
        setSortBy(initialSortBy);
        setIsReversed(initialIsReversed);
        const initTodos = async () => {
            try {
                setIsLoading(true);
                const todos = await loadTodos(tableName);
                const sortedTodos = sortByField(todos, initialSortBy, initialIsReversed);
                setTodoList(sortedTodos);
            } catch (error) {
                console.log(error.message);
                if (error.response.status === 403) {
                    return navigate(`../create-list?t=${tableName}`);
                }
            } finally {
                setIsLoading(false);
            }
        };
        initTodos();
    }, [initialIsReversed, initialSortBy, navigate, tableName]);
    
    useEffect(() => {
        const sortTodos = async () => {
            setTodoList(prevState => sortByField(prevState, sortBy, isReversed));
            const prevSortByItem = localStorage.getItem(LOCAL_STORAGE_SORT_BY_KEY);
            const prevSortBy = prevSortByItem ? JSON.parse(prevSortByItem) : {};
            const newSortBy = { ...prevSortBy, [tableName]: sortBy };
            localStorage.setItem(LOCAL_STORAGE_SORT_BY_KEY, JSON.stringify(newSortBy));
            
            const prevIsReversedItem = localStorage.getItem(LOCAL_STORAGE_REVERSED_KEY);
            const prevIsReversed = prevIsReversedItem ? JSON.parse(prevIsReversedItem) : {};
            const newIsReversed = { ...prevIsReversed, [tableName]: isReversed };
            localStorage.setItem(LOCAL_STORAGE_REVERSED_KEY, JSON.stringify(newIsReversed));
        };
        sortTodos();
    }, [isReversed, sortBy, tableName]);
    
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
                            onCheckToggled={toggleCompleteTodo}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

TodoContainer.propTypes = {
    tableName: PropTypes.string.isRequired,
    initialSortBy: PropTypes.string.isRequired,
    initialIsReversed: PropTypes.bool.isRequired
};

export default TodoContainer;