import React from 'react';
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

const PROGRAM_TITLE = 'Todo List';

const App = () => (
      <div>
          <h1>{PROGRAM_TITLE}</h1>
          <hr/>
          <AddTodoForm/>
          <TodoList />
          <hr/>
      </div>
  );

export default App;