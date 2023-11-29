import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";


const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})
const useAxiosSecure = () => {

    const navigate = useNavigate();
    const { logOut } = useAuth();

    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('Access-token')
        //console.log('request stopped by interceptor', token)
        config.headers.authorization = `Bearer ${token}`
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        //console.log('error status in interceptor', status)
        if (status === 401 || status === 403) {
            await logOut()
            navigate('/signIn')
        }
        return Promise.reject(error)
    })
    return axiosSecure;
};

export default useAxiosSecure;