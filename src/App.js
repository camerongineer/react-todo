import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from "react-router-dom";
import TodoContainer from "./components/TodoContainer";
import Layout from "./components/Layout";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={<Layout/>}
        >
            <Route
                index
                element={<TodoContainer/>}
            />
            <Route
                path="new"
                element={
                    <h1>New Todo List</h1>
                }
            />
        </Route>
    )
);

const App = () => <RouterProvider router={router}/>;

export default App;