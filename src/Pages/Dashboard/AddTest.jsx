
import { useForm } from "react-hook-form"
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_image_hosting_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const AddTest = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit } = useForm()
    const onSubmit = async (data) => {
        console.log(data)
        // uploading image to imgbb
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        if (res.data.success) {
            // store menu item in db
            const test = {
                name: data.name,
                price: parseFloat(data.price),
                date: data.date,
                slot: data.slot,
                detail: data.detail,
                image: res.data.data.display_url
            }
            const res2 = await axiosSecure.post('/tests', test);
            console.log(res.data);
            if(res2.data.insertedId){
                //show alert 
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "items added",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }
        console.log(res.data);
    };
    return (
        <div>
            <h1 className="text-4xl font-semibold text-center my-4">Add A Test</h1>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Test Name*</span>
                        </label>
                        <input {...register("name", { required: true })} type="text" placeholder="Recipe Name" className="input input-bordered w-full " />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL*</span>
                        </label>

                        <input {...register("image", { required: true })} type="file" className="file-input file-input-bordered file-input-accent w-full " />


                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Price*</span>
                            </label>
                            <input {...register("price", { required: true })} type="number" placeholder="Price" className="input input-bordered w-full " />
                        </div>
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Date*</span>
                            </label>
                            <input {...register("date", { required: true })} type="date" placeholder="Price" className="input input-bordered w-full " />
                        </div>
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Slot*</span>
                            </label>
                            <input {...register("slot", { required: true })} type="number" placeholder="Slot" className="input input-bordered w-full " />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Test Details</span>

                        </label>
                        <textarea {...register("detail", { required: true })} className="textarea textarea-bordered h-24" placeholder="Recipe Details"></textarea>

                    </div>

                    <div className="my-5 text-center">
                        <button className="btn w-1/3 btn-accent text-white">
                            Add Test
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTest;