import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const MyProfile = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic();
    const { data: userInfo } = useQuery({
        queryKey: ['userInfo'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${user.email}`);
            return res.data;
        }
    })
    
    console.log(userInfo)
    return (
        <div>
            <h2 className="text-xl font-semibold text-center my-5">{userInfo?.name}'s Profile</h2>
            <div className="flex flex-col md:flex-row p-5">
                <div className="md:w-1/3">
                    {
                        userInfo?.image ? <img src={userInfo?.image} alt="" /> : <h2 className="text-4xl font-semibold">Image <br /> Not <br /> Found</h2>
                    }
                    <Link to="/dashboard/updateProfile">
                    <button className="btn my-4 w-full btn-accent">Edit Profile</button>
                    </Link>

                </div>
               
                <div className="flex flex-col md:w-2/3">


                    <div className="overflow-x-auto">
                        <table className="table ">
                            {/* head */}
                            <tbody>
                                {/* row 1 */}
                                <tr>
                                    <th>Name</th>
                                    <td>{userInfo?.name}</td>

                                </tr>
                                {/* row 2 */}
                                <tr>
                                    <th>Email</th>
                                    <td>{userInfo?.email}</td>

                                </tr>
                                <tr>
                                    <th>Blood Group</th>
                                    <td>{userInfo?.blood}</td>

                                </tr>
                                <tr>
                                    <th>District</th>
                                    <td>{userInfo?.district}</td>

                                </tr>
                                <tr>
                                    <th>UpaZila</th>
                                    <td>{userInfo?.upazila}</td>

                                </tr>
                                {/* row 3 */}
                                <tr>
                                    <th>Phone</th>
                                    <td>018********</td>

                                </tr>
                                {/* row 4 */}
                                <tr>
                                    <th>Profession</th>
                                    <td>Student</td>

                                </tr>
                            </tbody>
                        </table>
                    </div>


                </div>

            </div>
        </div>
    );
};

export default MyProfile;