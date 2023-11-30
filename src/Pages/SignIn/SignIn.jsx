import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";


const SignIn = () => {
    
    const { signIn } = useContext(AuthContext)

    const navigate = useNavigate();
    

    const [logError, setLogError] = useState(null)

    const handleLogin = e => {
        e.preventDefault();
        setLogError(null)
        const email = e.target.email.value;
        const password = e.target.password.value;

        console.log(email, password);

        signIn(email, password)
            .then(result => {
                console.log(result.user)
                Swal.fire({
                    icon: "success",
                    title: "Great!!!",
                    text: "Signed in successfully",
                });
                navigate("/");
            })
            .catch(error => {
                setLogError(error.message)
            })


    }


    return (
        <div>
            <div className="hero min-h-screen ">
                <div className="hero-content flex-col md:flex-row md:justify-between">
                    <div className="text-center md:w-1/2 lg:text-left">
                        <img src="https://evy7bxt87kk.exactdn.com/wp-content/uploads/2021/10/petscanimg.jpg?lossy=0&ssl=1" alt="" />
                    </div>
                    <div className="card md:w-1/2 max-w-sm shadow-md bg-base-100">
                        <h1 className="text-4xl font-semibold text-center my-4">Sign In</h1>
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" name='email' required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered" name='password' required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>

                            <div className="form-control mt-6">
                                <button className={`btn text-white btn-accent btn-outline`}>Sign In</button>
                            </div>

                            <p>New Here? Please
                                <Link to="/signUp"> <span className="underline text-blue-500">Sign Up</span></Link>
                            </p>
                        </form>
                        {
                            logError && <p className="text-red-500 pl-2 pb-2">{logError}</p>
                        }

                    </div>
                </div>
            </div>



        </div>
    );
};

export default SignIn;