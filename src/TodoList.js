import React from 'react';

let id = 0

const LIST_TITLES = [
    'Begin Todo app',
    'Checkout new github branch',
    'Create list',
    'Display list on page',
    'Push changes to github',
    'Go to bed'
];

const buildList = (titles) => {
    const todoList = [];
    titles.forEach((title) => {
        todoList.push(
            {
                id: ++id,
                title: title,
            }
        );
    });
    return todoList;
};

const TodoList = () => (
        <ul>
            {buildList(LIST_TITLES).map(
                (item) => <li key={item.id}>{item.title}</li>
            )}
        </ul>
    );

export default TodoList;