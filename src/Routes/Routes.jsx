import {
    createBrowserRouter,

} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import AllTest from "../Pages/AllTest/AllTest";
import SignIn from "../Pages/SignIn/SignIn";
import SignUp from "../Pages/SignUp/SignUp";
import Dashboard from "../Layout/Dashboard";
import AdminHome from "../Pages/Dashboard/AdminHome";
import AllUsers from "../Pages/Dashboard/AllUsers";
import AddTest from "../Pages/Dashboard/AddTest";
import ManageTest from "../Pages/Dashboard/ManageTest";
import UpdateTest from "../Pages/Dashboard/UpdateTest";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "allTest",
                element: <AllTest></AllTest>
            },
            {
                path: "signIn",
                element: <SignIn></SignIn>
            },
            {
                path: "signUp",
                element: <SignUp></SignUp>
            }
        ]
    },
    {
        path: "dashboard",
        element: <Dashboard></Dashboard>,
        children: [
            {
                path:"adminHome",
                element: <AdminHome></AdminHome>
            },
            {
                path: "allUsers",
                element: <AllUsers></AllUsers>
            },
            {
                path: "addTest",
                element: <AddTest></AddTest>
            },
            {
                path: "manageTest",
                element: <ManageTest></ManageTest>
            },
            {
                path: "updateTest/:id",
                element: <UpdateTest></UpdateTest>
            }
        ]
    }
]);