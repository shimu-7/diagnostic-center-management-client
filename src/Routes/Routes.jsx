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
import Reservation from "../Pages/Dashboard/Reservation";
import AddBanner from "../Pages/Dashboard/AddBanner";
import ManageBanner from "../Pages/Dashboard/ManageBanner";
import TestDetails from "../Pages/TestDetails";
import PrivateRoute from "./PrivateRoute";
import MyProfile from "../Pages/Dashboard/MyProfile";
import UpdateProfile from "../Pages/Dashboard/UpdateProfile";
import Appoinment from "../Pages/Dashboard/Appoinment";
import AboutUs from "../Pages/AboutUs";
import ContactUs from "../Pages/ContactUs";
import Doctors from "../Pages/Doctors";
import Reports from "../Pages/Dashboard/Reports";
import Reservations from "../Pages/Dashboard/Reservations";
import TestReserve from "../Pages/Dashboard/TestReserve";

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
            },
            {
                path: "testDetails/:id",
                element: <PrivateRoute><TestDetails></TestDetails></PrivateRoute>,
                loader: ({params})=>fetch(`https://final-project-server-nine.vercel.app/tests/${params.id}`)
            },
            {
                path: "about",
                element: <AboutUs></AboutUs>
            },
            {
                path: "/contact",
                element: <ContactUs></ContactUs>
            },
            {
                path: "/doctor",
                element: <Doctors></Doctors>
            },
            
        ]
    },
    {
        path: "dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
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
                element: <UpdateTest></UpdateTest>,
                loader: ({params})=>fetch(`https://final-project-server-nine.vercel.app/tests/${params.id}`)
            },
            {
                path: "reservation/:id",
                element: <Reservation></Reservation>
            },
            {
                path: "addBanner",
                element: <AddBanner></AddBanner>
            },
            {
                path: "manageBanner",
                element: <ManageBanner></ManageBanner>
            },
            {
                path: "myProfile",
                element: <MyProfile></MyProfile>
            },
            {
                path: "updateProfile",
                element: <UpdateProfile></UpdateProfile>
            },
            {
                path: "appointment",
                element: <Appoinment></Appoinment>
            },
            {
                path: "reservation",
                element: <Reservations></Reservations>
            },
            {
                path: "testReserve/:name",
                element: <TestReserve></TestReserve>
            },
            {
                path: "report",
                element: <Reports></Reports>
            }
        ]
    }
]);