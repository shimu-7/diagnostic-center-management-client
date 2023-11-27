import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {
    const isAdmin = true;
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

                        </> :
                            <>
                                <li className="flex ">

                                    <NavLink to="/dashboard/userHome">User Home</NavLink>
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