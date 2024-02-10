import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from "react-router-dom";
import Layout from "./components/Layout";
import CreateContainer from "./components/CreateContainer";
import Home, { homeLoader } from "./components/Home";
import ErrorBoundary from "./components/ErrorBoundary";
import Landing, { landingLoader } from "./components/Landing";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={<Layout/>}
            errorElement={<ErrorBoundary/>}
        >
            <Route
                index
                loader={landingLoader}
                element={<Landing/>}
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