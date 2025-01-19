import { createBrowserRouter } from "react-router-dom";
import Login from "../components/pages/auth/login/Login";
import NotFound from "../components/pages/notFound/NotFound";
import ProtectRoute from "./protectedRoutes/ProtectRoute";
import { Logout } from "../components/pages/auth/logout/logout";
import MainLayout from "../components/layout/MainLayout";
import Dashboard from "../components/pages/dashboard/Dashboard";
import Register from "../components/pages/auth/register/Register";


export const router = createBrowserRouter([
    {
        path: '*',
        element: <NotFound/>
    },
    {
        path: '/',
        element: <Login/>
    },
    {
        path: '/register',
        element: <Register/>
    },
    {
        path: "",
        element: <ProtectRoute> <MainLayout /> </ProtectRoute>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />
            }

        ]
    },
    {
        path: '/logout',
        element: <Logout/>
    },
])