import React from 'react';
const programTitle = "Todo List";
const todoList = [
  {
    id: 1,
    title: "Begin To-Do app",
  },
  {
    id: 2,
    title: "Checkout new github branch"
  },
  {
    id: 3,
    title: "Create list"
  },
  {
    id: 4,
    title: "Display list on page"
  },
  {
    id: 5,
    title: "Push changes to github"
  }
];

function App() {
  return (
      <div>
        <h1>{programTitle}</h1>
        <ul>
          {todoList.map(function(item) {
            return <li key={item.id}>{item.title}</li>
          })}
        </ul>
      </div>
  );
}

export default App;
