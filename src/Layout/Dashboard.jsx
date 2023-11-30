import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";


const Dashboard = () => {
    //const isAdmin = true;
    const [isAdmin] = useAdmin();
    console.log(isAdmin)
    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-slate-300">
                <ul className="menu text-lg">

                    {
                        isAdmin ? <>
                            <li className="flex ">

                                <NavLink to="/dashboard/adminHome">Admin Home</NavLink>
                            </li>
                            <li className="flex ">

                                <NavLink to="/dashboard/allUsers">Manage User</NavLink>
                            </li>
                            <li className="flex ">

                                <NavLink to="/dashboard/addTest">Add Test</NavLink>
                            </li>
                            <li className="flex ">

                                <NavLink to="/dashboard/manageTest">Manage Test</NavLink>
                            </li>
                            <li className="flex ">

                                <NavLink to="/dashboard/addBanner">Add Banner</NavLink>
                            </li>
                            <li className="flex ">

                                <NavLink to="/dashboard/manageBanner">Manage Banner</NavLink>
                            </li>
                            <li className="flex ">

                                <NavLink to="/dashboard/reservation">Manage Reservation</NavLink>
                            </li>

                        </> :
                            <>
                                <li className="flex ">

                                    <NavLink to="/dashboard/myProfile">My Profile</NavLink>
                                </li>
                                <li className="flex ">

                                    <NavLink to="/dashboard/appointment">Appointments</NavLink>
                                </li>
                                <li className="flex ">

                                    <NavLink to="/dashboard/report">Report</NavLink>
                                </li>

                            </>
                    }
                    <div className="divider"></div>
                    <li className="flex ">

                        <NavLink to="/">Home</NavLink>
                    </li>

                    <li className="flex ">

                        <NavLink to="/contact">Contact</NavLink>
                    </li>
                    <li className="flex ">

                        <NavLink to="/about">About Us</NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;