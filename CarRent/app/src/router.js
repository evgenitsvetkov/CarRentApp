import { createBrowserRouter } from "react-router-dom";
import App from "./components/App";
import Layout from "./components/Layout";
import Cars from "./components/Cars";
import AddCar from "./components/AddCar";
import CarDetails from "./components/CarDetails";
import Login from "./components/Login";
import Register from "./components/Register";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./components/Unauthorized";
import EditCar from "./components/EditCar";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />, 
        children: [
            { path: "/", element: <App /> },
            { path: "/Cars", element: <Cars /> },
            { path: "/Cars/Details/:id", element: <CarDetails /> },
            {
                path: "/Cars/Add",
                element: (
                    <RequireAuth requiredRole="Administrator">
                        <AddCar />
                    </RequireAuth>
                )
            },
            {
                path: "/Cars/Edit/:id",
                element: (
                    <RequireAuth requiredRole="Administrator">
                        <EditCar />
                    </RequireAuth>
                )
            },
            { path: "/Login", element: <Login /> },
            { path: "/Register", element: <Register /> },
            { path: "/Unauthorized", element: <Unauthorized /> },
        ],
    },
]);

export default router;