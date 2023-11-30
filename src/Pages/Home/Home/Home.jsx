import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import Recommendation from "../Recommendation";


const Home = () => {
    const axiosPublic = useAxiosPublic()

    const { data: banners = [] } = useQuery({
        queryKey: ['banners'],
        queryFn: async () => {
            const res = await axiosPublic.get('/banners');
            return res.data;
        }
    })
    const selectedBanner = banners.find(banner => banner.isActive && 1)
    const ImageURL = selectedBanner?.image
    console.log(selectedBanner)
    return (
        <div>
            <div className="hero min-h-screen"
                style={{ backgroundImage: `url(${ImageURL})` }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">{selectedBanner?.name}</h1>
                        <p className="mb-5">{selectedBanner?.detail}</p>

                    </div>
                </div>
            </div>

            {/* <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <img src={ImageURL} className="w-1/2 rounded-lg shadow-2xl" />
                    <div>
                        <h1 className="text-5xl font-bold">{selectedBanner.name}</h1>
                        <p className="py-6">{selectedBanner.detail}</p>
                        
                    </div>
                </div>
            </div> */}

            <div className="max-w-7xl mx-auto my-10 rounded-lg bg-base-200">
                <div className="py-8">
                    <div className="flex gap-8 text-lg justify-center items-center">
                        <Link to="/signIn" className="border-2 rounded-md font-medium border-slate-900 px-5 py-2">
                            Sign in
                        </Link>
                        <Link to="/signUp" className="underline font-semibold">
                            Register
                        </Link>
                    </div>
                    <h2 className="text-lg mt-2 text-center">Sign in to Book a Service</h2>
                </div>
            </div>
            <div className="hero min-h-screen my-5"
                style={{ backgroundImage: `url(https://webtechsoft.com/wp-content/uploads/2018/03/Hospital-Management-System-1.jpg)` }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Efficient Diagnostic Solutions for Modern Healthcare</h1>
                    

                    </div>
                </div>
            </div>
            <Recommendation></Recommendation>
        </div>
    );
};

export default Home;