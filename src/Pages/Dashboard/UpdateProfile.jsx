import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_image_hosting_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const UpdateProfile = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic();
    const { data: userInfo } = useQuery({
        queryKey: ['userInfo'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${user.email}`);
            return res.data;
        }
    })
    console.log(userInfo)

    const navigate = useNavigate();

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
            //console.log(res.data.length)
            return res.data;
        }

    })


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()




    const onSubmit = async (data) => {
        //console.log(data)
        // uploading image to imgbb
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        console.log(data)
        const { name, email, district, upazila, blood } = data;
        //console.log(name, email, district, upazila)
        if (res.data.success) {
            // store menu item in db
            const updatedUserInfo = {
                name: name,
                email: email,
                image: res.data.data.display_url,
                district: district,
                upazila: upazila,
                blood: blood,
                status: userInfo.status
            }
            const res2 = await axiosPublic.put(`/users/${user.email}`, updatedUserInfo);
            
            if (res2.data.modifiedCount) {
                //show alert 
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Profile Updated Seccefully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/dashboard/myProfile")
            }
        }
        console.log(res.data);

        
       

    }
    return (
        <div>

            <h1 className="text-4xl font-semibold text-center my-4">Update Profile</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name*</span>
                        </label>
                        <input defaultValue={userInfo?.name} type="text" placeholder="name" className="input input-bordered" {...register("name", { required: true })} name='name' />
                        {errors.name && <span className="text-red-600">Name is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email*</span>
                        </label>
                        <input defaultValue={userInfo?.email} type="email" placeholder="email" className="input input-bordered" {...register("email", { required: true })} name='email' required />
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
                                <select defaultValue={userInfo?.blood} {...register("blood", { required: true })} className="select select-bordered w-full ">
                                    <option disabled value="default">defaultValue={userInfo?.blood}</option>
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
                        <select defaultValue={userInfo?.district} {...register("district", { required: true })} className="select select-bordered w-full ">
                            <option disabled value="default">{userInfo?.district}</option>
                            {
                                districts.map(dis => <option key={dis._id} value={dis.name}>{dis.name}</option>)
                            }

                        </select>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Upazila*</span>
                        </label>
                        <select defaultValue={userInfo?.upazila} {...register("upazila", { required: true })} className="select select-bordered w-full ">
                            <option disabled value="default">{userInfo?.upazila}</option>
                            {
                                upazila.map(dis => <option key={dis._id} value={dis.name}>{dis.name}</option>)
                            }
                        </select>
                    </div>
                </div>



                <div className="form-control mt-6">
                    <button className="btn text-white btn-accent ">Update Profile</button>
                </div>

            </form>
        </div>
    );
};

export default UpdateProfile;