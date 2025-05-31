import { createBrowserRouter } from "react-router-dom";
import App from "./components/App";
import Layout from "./components/Layout";
import Cars from "./components/Cars";
import AddCar from "./components/AddCar";
import CarDetails from "./components/CarDetails";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />, 
        children: [
            { path: "/", element: <App /> },
            { path: "/Cars", element: <Cars /> },
            { path: "/Cars/Details/:id", element: <CarDetails /> },
            { path: "/Cars/Add", element: <AddCar /> },
        ],
    },
]);

export default router;