import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { TodoProvider } from "./TodoContext";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <TodoProvider>
        <App/>
    </TodoProvider>
);