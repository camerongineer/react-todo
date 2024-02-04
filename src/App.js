import {
    createBrowserRouter,
    createRoutesFromElements, redirect,
    Route,
    RouterProvider
} from "react-router-dom";
import Layout, { layoutLoader } from "./components/Layout";
import CreateContainer from "./components/CreateContainer";
import Home, { homeLoader } from "./components/Home";
import ErrorBoundary from "./components/ErrorBoundary";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            loader={layoutLoader}
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
                loader={homeLoader}
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