import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaTrash } from "react-icons/fa";
import moment from "moment";
import Swal from "sweetalert2";


const Appoinment = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const { data: appointments = [], refetch } = useQuery({
        queryKey: ['appointments'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/reservations/${user.email}`);
            return res.data;
        }
    })
    //console.log(appointments)
    const dateNow = moment().format('YYYY-MM-D')
    const selected = appointments.filter(item => item.testDate >= dateNow)

    const handleDeleteItem = (item) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/reservations/${item._id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Appointment Cancelled",
                                icon: "success"
                            });

                            refetch();
                        }
                    })

            }
        });

    }
    return (
        <div>
            <h1 className="text-4xl font-semibold text-center my-4">Upcoming Appointment{selected.length}</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Test Name</th>
                            <th>Booking Date</th>
                            <th>Appointment Date</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            selected.map((item, idx) => <tr key={item._id}>
                                <th>
                                    {idx + 1}
                                </th>
                                <td>
                                    {item.testName}

                                </td>
                                <td>{item.rDate}</td>
                                <td>{item.testDate}</td>
                                <td>{item.price}</td>

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

export default Appoinment;