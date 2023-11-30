

const Doctors = () => {
    return (
        <div>
            <h2 className="text-center  border-b-2 font-semibold text-xl my-5">Meet Our Healthcare Network</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
                <div className="card w-96 bg-base-100 shadow-xl">
                    <figure><img src="https://static.vecteezy.com/system/resources/thumbnails/028/287/384/small/a-mature-indian-male-doctor-on-a-white-background-ai-generated-photo.jpg" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Dr. Emily Johnson</h2>
                        <p>Internal Medicine</p>
                        <p>Visiting Time: 10.00AM-2.00PM</p>
                        
                    </div>
                </div>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <figure><img src="https://static.vecteezy.com/system/resources/thumbnails/028/287/384/small/a-mature-indian-male-doctor-on-a-white-background-ai-generated-photo.jpg" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Dr. Marcus Anderson</h2>
                        <p>Cardiology</p>
                        <p>Visiting Time: 10.00AM-2.00PM</p>
                        
                    </div>
                </div>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <figure><img src="https://www.yourfreecareertest.com/wp-content/uploads/2018/01/how_to_become_a_doctor.jpg" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Dr. Alexa Patel</h2>
                        <p>Orthopedics</p>
                        <p>Visiting Time: 2.00PM-7.00PM</p>
                        
                    </div>
                </div>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <figure><img src="https://www.yourfreecareertest.com/wp-content/uploads/2018/01/how_to_become_a_doctor.jpg" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Dr. Benjamin Lee</h2>
                        <p>Dermatology</p>
                        <p>Visiting Time: 2.00PM-7.00PM</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Doctors;