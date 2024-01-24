import React, { createContext, useState } from 'react';

const TodoContext = createContext();

const TodoProvider = ({ children }) => {
    const [count, setCount] = useState([]);
    
    return (
        <TodoContext.Provider value={{ count, setCount }}>
            {children}
        </TodoContext.Provider>
    );
};

export { TodoProvider, TodoContext };
