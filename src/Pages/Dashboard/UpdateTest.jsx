import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";



const UpdateTest = () => {
    const {id} = useParams();
    const axiosSecure = useAxiosSecure();
    console.log(id);
    // const { data: test, refetch } = useQuery({
    //     queryKey: ['test'],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`/tests/${id}`)
    //         return res.data;
    //     }
    // })
    // const {name,image,price, date, details, slot} = test;
    // console.log(test);
    return (
        <div>
            Update test
        </div>
    );
};

export default UpdateTest;