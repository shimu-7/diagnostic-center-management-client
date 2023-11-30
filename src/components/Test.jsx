import { Link } from "react-router-dom";


const Test = ({ test }) => {
    return (
        <div>
            <div className="card card-side bg-base-100 shadow-xl">
                <figure><img className="max-w-sm h-60" src={test?.image} alt="Movie" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{test?.name}</h2>
                    <p><span className="font-semibold">Available Slot</span>: {test?.slot}</p>
                    <Link to={`/testDetails/${test._id}`}><button className="btn btn-accent"> Show Details</button></Link>

                </div>
            </div>
        </div>
    );
};

export default Test;