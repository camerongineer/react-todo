import React from 'react';

const LIST_TITLES = [
    'Begin Todo app',
    'Checkout new github branch',
    'Create list',
    'Display list on page',
    'Push changes to github',
    'Go to bed'
];

const buildList = (titles) => {
    let id = 0;
    return titles.map(title => ({ id: ++id, title: title }));
};

const TodoList = () => (
        <ul>
            {buildList(LIST_TITLES).map(
                (item) => <li key={item.id}>{item.title}</li>
            )}
        </ul>
    );

export default TodoList;