import { useQuery } from "@tanstack/react-query";
import {  FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import { ImCross } from "react-icons/im";
import { RiAdminFill } from "react-icons/ri";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { RiVerifiedBadgeLine } from "react-icons/ri";



const AllUsers = () => {

    const axiosPublic = useAxiosPublic()

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            return res.data;
        }
    })

   


    const handleMakeAdmin = (user) => {
        axiosPublic.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is admin Now`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }
    const handleStatus = (user) => {
        axiosPublic.patch(`/users/status/${user._id}`)
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

    const handleDetails = (user) =>{
        Swal.fire({
            title: user.name,
            text: user.email,
            imageUrl: user.image,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Image Not Found"
          });
    }


    return (
        <div>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">All Users</h2>
                <h2 className="text-3xl">Total Users: {users.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Role</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, idx) => <tr key={user._id}>
                                <th>{idx + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td >
                                    <button onClick={()=>handleStatus(user)}>
                                    {
                                        user.status == 1 ? <RiVerifiedBadgeLine  className="text-3xl text-slate-500 " /> : <ImCross className="text-xl text-slate-500 " />
                                    }
                                    </button>
                                </td>
                                <td>
                                    {
                                        user?.role == 'admin' ? <RiAdminFill  className="text-xl text-slate-500 "/> : <button onClick={() => handleMakeAdmin(user)}>
                                            <FaUsers className="text-2xl text-slate-500 "></FaUsers>
                                        </button>
                                    }
                                </td>
                                <td>
                                    <button onClick={()=>handleDetails(user)} className="btn btn-outline btn-accent">Details</button>
                                </td>
                                
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;