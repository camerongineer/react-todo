import React, {useState} from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import {LIST_TITLES} from './data/data';
import {buildList} from './utils/listUtils';

const App = () => {
    const [newTodo, setNewTodo] = useState('');
    return (
        <div>
            <h1>Todo List</h1>
            <hr/>
            <AddTodoForm onAddToDo={setNewTodo}/>
            <p>{newTodo}</p>
            <TodoList list={buildList(LIST_TITLES)}/>
            <hr/>
        </div>
    );
};

export default App;