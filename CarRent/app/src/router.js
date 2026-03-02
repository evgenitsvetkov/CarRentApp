import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Cars from "./components/Cars";
import AddCar from "./components/AddCar";
import CarDetails from "./components/CarDetails";
import Login from "./components/Login";
import Register from "./components/Register";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./components/Unauthorized";
import EditCar from "./components/EditCar";
import PersistLogin from "./components/PersistLogin";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [

            // Public routes WITHOUT persistence
            { path: "Login", element: <Login /> },
            { path: "Register", element: <Register /> },
            { path: "Unauthorized", element: <Unauthorized /> },

            // Public routes with persistence
            {
                element: <PersistLogin />,
                children: [
                    { index: true, element: <Home /> },
                    { path: "Cars", element: <Cars /> },
                    { path: "Cars/Details/:id", element: <CarDetails /> },

                    // Admin Only
                    {
                        element: <RequireAuth requiredRole="Administrator" />,
                        children: [
                            { path: "Cars/Add", element: <AddCar /> },
                            { path: "Cars/Edit/:id", element: <EditCar /> },
                        ],
                    },
                ],
            },
        ],
    },
]);

export default router;