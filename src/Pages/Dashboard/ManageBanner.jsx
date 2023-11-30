import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { ImCross } from "react-icons/im";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { RiVerifiedBadgeLine } from "react-icons/ri";

const ManageBanner = () => {

    const axiosPublic = useAxiosPublic()

    const { data: banners = [], refetch } = useQuery({
        queryKey: ['banners'],
        queryFn: async () => {
            const res = await axiosPublic.get('/banners');
            return res.data;
        }
    })


    const handleStatus = (banner) => {
        axiosPublic.patch(`/banners/status/${banner._id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Successfully Updated`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }




    return (
        <div>
            Manage Banner
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">All Banner</h2>
                <h2 className="text-3xl">Total Users: {banners.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>

                            <th>Img</th>
                            <th>Title</th>
                            <th>Status</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            banners.map((banner, idx) => <tr key={banner._id}>
                                <th>{idx + 1}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={banner.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>

                                    </div>
                                </td>
                                <td>{banner.name}</td>

                                <td >
                                    <button onClick={() => handleStatus(banner)}>
                                        {
                                            banner.isActive == 1 ? <RiVerifiedBadgeLine className="text-3xl text-slate-500 " /> : <ImCross className="text-xl text-slate-500 " />
                                        }
                                    </button>
                                </td>



                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageBanner;