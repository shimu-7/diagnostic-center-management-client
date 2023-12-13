import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";


const Reservations = () => {
    const axiosPublic = useAxiosPublic()

    const { data: reservations = [], refetch } = useQuery({
        queryKey: ['reservations'],
        queryFn: async () => {
            const res = await axiosPublic.get('/reservations');
            return res.data;
        }
    })
    console.log(reservations.length)
    const handlePending = (item) => {
        axiosPublic.patch(`/reservations/status/${item._id}`)
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
    const handleDeleteItem = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosPublic.delete(`/reservations/${item._id}`);
                console.log(res.data)
                if (res.data.deletedCount) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Successfully deleted.",
                        icon: "success"
                    });
                }
            }
        })
    }
    return (
        <div>
            <h2 className="text-2xl font-semibold text-center my-5">Manage Reservations</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Test Name</th>
                            <th>Email</th>
                            <th>Appointment Date</th>
                            <th>Status</th>
                            <th>DELETE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            reservations?.map((item, idx) => <tr key={item._id}>
                                <th>
                                    {idx + 1}
                                </th>
                                <td>
                                    {item.testName}

                                </td>
                                <td>{item.email}</td>
                                <td>{item.testDate}</td>
                                <td >
                                    <button className="btn btn-outline btn-accent" onClick={() => handlePending(item)}> {item.status}</button>
                                </td>


                                <td>
                                    <button onClick={() => handleDeleteItem(item)} ><FaTrash className="text-2xl text-red-600"></FaTrash></button>
                                </td>

                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Reservations;