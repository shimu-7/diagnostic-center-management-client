import { Link, NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";


const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)

    const handleSignOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Bye!!!",
                    text: "You are Logged Out",

                });
            })
            .catch(error => {
                console.log(error.message)
            })
    }
    console.log(user)
    const links = <>
        <li className="mx-2"><NavLink
            to="/"
            style={({ isActive, isPending, isTransitioning }) => {
                return {
                    fontWeight: isActive ? "bold" : "",
                    color: isPending ? "" : "red",
                    viewTransitionName: isTransitioning ? "slide" : "",
                };
            }}
        >
            Home
        </NavLink>
        </li>
        <li className="mx-2"><NavLink
            to="/allTest"
            style={({ isActive, isPending, isTransitioning }) => {
                return {
                    fontWeight: isActive ? "bold " : "",
                    color: isPending ? "" : "red",
                    viewTransitionName: isTransitioning ? "slide" : "",
                };
            }}
        >
            All Test
        </NavLink>
        </li>
    </>
    return (
        <div>
            <div className="navbar  z-10 bg-opacity-30 max-w-7xl">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {links}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">daisyUI</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="flex mx-2 ">
                        {
                            links
                        }
                    </ul>
                </div>


                <div className="navbar-end flex items-center">
                    <Link to="/dashboard" className="mr-1">
                        <div className="btn btn-ghost btn-circle avatar">
                            {
                                user?.photoURL ? <div className="rounded-full">
                                    <img src={user.photoURL} alt="" />
                                </div>
                                    :
                                    <div className="rounded-full">
                                        <CgProfile className="text-3xl"></CgProfile>
                                    </div>
                            }


                        </div>
                    </Link>
                    {
                        user ? <button className="btn  btn-accent"><Link onClick={handleSignOut} to="/">Sign Out</Link></button> :
                            <Link to="/signIn">
                                <button className="btn  btn-accent">Sign In</button>
                            </Link>
                    }


                </div>

            </div>
            <div className="w-full h-[1px] bg-slate-400"></div>
        </div>
    );
};

export default Navbar;