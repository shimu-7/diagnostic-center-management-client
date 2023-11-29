import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useTest = () => {

    const axiosPublic = useAxiosPublic();
    const { data: tests = [], refetch, isLoading: loading } = useQuery({
        queryKey: ['tests'],
        queryFn: async () => {
            const res = await axiosPublic.get('/tests');
            return res.data;
        }

    })

    return [tests, loading, refetch];

};

export default useTest;