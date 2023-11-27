import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const image_hosting_key = import.meta.env.VITE_image_hosting_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const SignUp = () => {


    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const [error, setError] = useState(null)
    const { data: districts = [], } = useQuery({
        queryKey: ['districts'],
        queryFn: async () => {
            const res = await axiosPublic.get('/districts');
            console.log(res.data.length)
            return res.data;
        }

    })
    const { data: upazila = [], } = useQuery({
        queryKey: ['upazila'],
        queryFn: async () => {
            const res = await axiosPublic.get('/upazila');
            console.log(res.data.length)
            return res.data;
        }

    })


    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const { createUser } = useContext(AuthContext);


    const onSubmit = async (data) => {
        console.log(data)
        // uploading image to imgbb
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        console.log(data)
       
        const { name, email, district, upazila, password, confirm, blood} = data;
        console.log(name, email, district, upazila, password, confirm)
        createUser(email, password)
            .then(result => {
                //console.log(result.user);
                const userInfo = {
                    name: name,
                    email: email,
                    image: res.data.data.display_url,
                    district: district,
                    upazila: upazila,
                    blood: blood,
                    status: 1
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            console.log('user added to the database')
                            reset();
                            updateProfile(result.user, {
                                displayName: name,
                                photoURL: userInfo.image
                            })
                                .then(() => {
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "Successfully Signed Up",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                })
                                .catch((error) => {
                                    console.log(error.message)
                                })
                            navigate('/');
                        }
                    })

            })
            .catch(error => {
                console.log(error.message);
                setError(error.message);
            })
    }
    return (
        <div>
            <h2 className="text-3xl">Sign up here{districts.length}</h2>
            <div className="hero min-h-screen ">
                <div className="hero-content flex-col md:flex-row-reverse">
                    <div className="text-center md:w-1/3 lg:text-left">
                        <img src="https://evy7bxt87kk.exactdn.com/wp-content/uploads/2021/10/petscanimg.jpg?lossy=0&ssl=1" alt="" />
                    </div>
                    <div className="card md:w-2/3  shadow-md bg-base-100">
                        <h1 className="text-4xl font-semibold text-center my-4">Sign Up</h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name*</span>
                                    </label>
                                    <input type="text" placeholder="name" className="input input-bordered" {...register("name", { required: true })} name='name' />
                                    {errors.name && <span className="text-red-600">Name is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email*</span>
                                    </label>
                                    <input type="email" placeholder="email" className="input input-bordered" {...register("email", { required: true })} name='email' required />
                                    {errors.email && <span className="text-red-600">Email is required</span>}
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL*</span>
                                </label>

                                <input {...register("image", { required: true })} type="file" className="file-input file-input-bordered file-input-accent w-full " />

                                {errors.photo && <span className="text-red-600">Photo is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Blood Group*</span>
                                </label>
                                <select defaultValue="default" {...register("blood", { required: true })} className="select select-bordered w-full ">
                                    <option disabled value="default">Select Group</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">District*</span>
                                    </label>
                                    <select defaultValue="default" {...register("district", { required: true })} className="select select-bordered w-full ">
                                        <option disabled value="default">Select District</option>
                                        {
                                            districts.map(dis => <option key={dis._id} value={dis.name}>{dis.name}</option>)
                                        }

                                    </select>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Upazila*</span>
                                    </label>
                                    <select defaultValue="default" {...register("upazila", { required: true })} className="select select-bordered w-full ">
                                        <option disabled value="default">Select Upazila</option>
                                        {
                                            upazila.map(dis => <option key={dis._id} value={dis.name}>{dis.name}</option>)
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password*</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered" {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*/
                                })} name='password' required />
                                {errors.password?.type === 'required' && <span className="text-red-600">Email field is required</span>}
                                {errors.password?.type === 'minLength' && <span className="text-red-600">Password should contain 6 character or more</span>}
                                {errors.password?.type === 'maxLength' && <span className="text-red-600">Password should contain maximum 20 character</span>}
                                {errors.password?.type === 'pattern' && <span className="text-red-600">Password should contain at least one capital/special character</span>}

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password*</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered" {...register("confirm", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*/
                                })} name='confirm' required />


                            </div>
                            <div className="form-control mt-6">
                                <button className="btn text-white btn-accent ">SignUp</button>
                            </div>
                            <p>Already have an account?
                                <Link to="/signIn">
                                    <span className="underline ml-2 text-blue-500">
                                        Sign In
                                    </span>
                                </Link>
                            </p>
                            {
                                error && <p className="text-red-600">{error}</p>
                            }

                        </form>

                        <div className="card md:w-2/3  shadow-md bg-base-100">
                            <p>Already have an account?
                                <Link to="/signIn">
                                    <span className="underline ml-2 text-blue-500">
                                        Sign In
                                    </span>
                                </Link>
                            </p>
                            {
                                error && <p className="text-red-600">{error}</p>
                            }
                        </div>


                    </div>
                </div>
            </div>

        </div>
    );
};

export default SignUp;