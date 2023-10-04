import React, {useState} from 'react';
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

const LIST_TITLES = [
    'Begin Todo app',
    'Checkout new github branch',
    'Create list',
    'Display list on page',
    'Push changes to github',
    'Go to bed'
];

const buildList = titles => {
    let id = 0;
    return titles.map(title => ({ id: ++id, title: title }));
};

const App = () => {
    const [newTodo, setNewTodo] = useState('');
    return (
        <div>
            <h1>{'Todo List'}</h1>
            <hr/>
            <AddTodoForm onAddToDo={setNewTodo}/>
            <p>{newTodo}</p>
            <br/>
            <TodoList list={buildList(LIST_TITLES)}/>
            <hr/>
        </div>
    )
};

export default App;