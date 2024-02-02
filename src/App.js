import {
    createBrowserRouter,
    createRoutesFromElements, redirect,
    Route,
    RouterProvider
} from "react-router-dom";
import Layout from "./components/Layout";
import CreateContainer from "./components/CreateContainer";
import Home from "./components/Home";
import ErrorBoundary from "./components/ErrorBoundary";
import { getTableNames } from "./api/airtable";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            loader={getTableNames}
            element={<Layout/>}
            errorElement={<ErrorBoundary/>}
        >
            <Route
                index
                loader={() => {
                    const recentList = localStorage.getItem("todoListRecent") ?? "Todo";
                    throw redirect(`/list/${recentList}`);
                }}
            />
            <Route
                path="list/:tableName"
                element={<Home/>}
            />
            <Route
                path="create-list"
                element={<CreateContainer/>}
            />
        </Route>
    )
);

const App = () => <RouterProvider router={router}/>;

export default App;