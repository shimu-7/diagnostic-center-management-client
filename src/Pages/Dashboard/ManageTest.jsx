import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useTest from "../../hooks/useTest";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FcViewDetails } from "react-icons/fc";
import UpdateTest from "./UpdateTest";
import { useNavigate } from "react-router-dom";

const ManageTest = () => {

    const [tests, ,refetch] = useTest();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const handleDeleteItem =(item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async(result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/tests/${item._id}`);
                console.log(res.data)
                if(res.data.deletedCount){
                    refetch();
                Swal.fire({
                    title: "Deleted!",
                    text: "Successfully deleted.",
                    icon: "success"
                });
            }
            }
        });

    }

    const handleUpdateTest = (item) => {
        <UpdateTest item={item}></UpdateTest>
        navigate(`/dashboard/updateTest/${item._id}`)
        console.log("clicked")
    }

    const handleReservation = (item) =>{

    }


    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Update</th>
                            <th>Delete</th>
                            <th>Reservation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            tests.map((item, idx) => <tr key={item._id}>
                                <th>
                                    {idx + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>

                                    </div>
                                </td>
                                <td>
                                    {item.name}

                                </td>
                                <td>{item.price}</td>
                                <td>
                                    <button onClick={() => handleUpdateTest(item)}>
                                        <FaEdit className="text-2xl"></FaEdit>
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteItem(item)} ><FaTrash className="text-2xl text-red-600"></FaTrash></button>
                                </td>
                                <td>
                                    <button onClick={() => handleReservation(item)} ><FcViewDetails className="text-3xl text-red-600"></FcViewDetails></button>
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageTest;