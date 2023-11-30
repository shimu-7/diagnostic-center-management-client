import { Link, useLoaderData } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import moment from "moment/moment";


const TestDetails = () => {
    const test = useLoaderData();
    console.log(test);
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const { data: userInfo, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${user.email}`);
            return res.data;
        }
    })

    const handleReserve = async () => {
        const testDate = test.date
        const email = user.email
        const testName = test.name
        const price = test.price
        const image = test.image
        const slot = test.slot
        const rDate = moment().format('YYYY-MM-D')
        const status = "pending"
        const reserved = { email, testName, price, image, rDate, testDate, status }
        if (slot <= 0 || !userInfo.status) {
            return Swal.fire({
                title: 'An error occurred !!!',
                text: 'Not Eligible to reserve this test',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
        axiosPublic.patch(`/tests/slot/${test._id}`)
        const res = await axiosPublic.post('/reservations', reserved)
        console.log(res.data)
        if (res.data.insertedId) {
            refetch()
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "You reserve this test successfully",
                showConfirmButton: false,
                timer: 1500
            });
        }


    }
    return (
        <div>
            <h2 className="text-2xl font-semibold my-4 text-center">{test.name} Details</h2>
            <div className="card  bg-base-100 shadow-xl">
                <figure><img className="max-w-sm h-60" src={test?.image} alt="Movie" /></figure>
                <div className="card-body ">
                    <h2 className="card-title">{test?.name}</h2>
                    <p>{test.detail}</p>
                    <p><span className="font-semibold">Available Slot</span>: {test?.slot}</p>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
                        <Link className="w-full" to="/allTest"><button className="btn w-full btn-accent">Go Back</button></Link>
                        <button onClick={handleReserve} className="btn btn-outline btn-accent">Reserve</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TestDetails;