import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useForm } from "react-hook-form";


const image_hosting_key = import.meta.env.VITE_image_hosting_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const UpdateTest = () => {
    // const {id} = useParams();
    const testItem = useLoaderData();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    // const { data: test, refetch } = useQuery({
    //     queryKey: ['test'],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`/tests/${id}`)
    //         return res.data;
    //     }
    // })
    //const { name, image, price, date, details, slot,_id } = testItem;
    //console.log(testItem)
    console.log(name)
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
            const res2 = await axiosSecure.put(`/tests/${testItem._id}`, test);
            console.log(res.data);
            if (res2.data.modifiedCount) {
                //show alert 
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "items added",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/dashboard/manageTest")
            }
        }
        console.log(res.data);
    };

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Test Name*</span>
                        </label>
                        <input {...register("name",{ required: true })} type="text" defaultValue={testItem?.name} placeholder="name" className="input input-bordered w-full " />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL*</span>
                        </label>

                        <input  {...register("image", { required: true })} type="file" className="file-input file-input-bordered file-input-accent w-full " />


                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Price*</span>
                            </label>
                            <input defaultValue={testItem?.price} {...register("price", { required: true })} type="number" placeholder="Price" className="input input-bordered w-full " />
                        </div>
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Date*</span>
                            </label>
                            <input defaultValue={testItem?.date} {...register("date", { required: true })} type="date" placeholder="date" className="input input-bordered w-full " />
                        </div>
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Slot*</span>
                            </label>
                            <input defaultValue={testItem?.slot} {...register("slot", { required: true })} type="number" placeholder="Slot" className="input input-bordered w-full " />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Test Details</span>

                        </label>
                        <textarea defaultValue={testItem?.detail} {...register("detail", { required: true })} className="textarea textarea-bordered h-24" placeholder="Recipe Details"></textarea>

                    </div>

                    <div className="my-5 text-center">
                        <button className="btn w-1/3 btn-accent text-white">
                            Update Test
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateTest;