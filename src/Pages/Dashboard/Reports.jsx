import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useRef } from "react";
import generatePDF from 'react-to-pdf';


const Reports = () => {

    const { user } = useAuth();
    const targetRef = useRef();
    const axiosPublic = useAxiosPublic();
    const { data: appointments = [] } = useQuery({
        queryKey: ['appointments'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/reservations/${user.email}`);
            return res.data;
        }
    })
    const selected = appointments.filter(item => item.status != "pending")
        
      const saveAs = () =>{generatePDF(targetRef, {filename: 'page.pdf'})}
    //   const print = () =>{
    //     console.log("Shimu")
    //   }
   
    return (
        <div >
            <h2 className="text-2xl my-5 text-center font-semibold">Reports</h2>
            <button onClick={saveAs} className="btn my-4 w-full btn-accent">Download Report</button>
            
            <div ref={targetRef} className="overflow-x-auto">
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

                                

                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Reports;