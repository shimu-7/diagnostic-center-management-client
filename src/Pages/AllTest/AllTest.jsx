
import { useState } from "react";
import Test from "../../components/test";
import useTest from "../../hooks/useTest";


const AllTest = () => {
    const [tests, ,] = useTest();
    const [showTest, setShowTest] = useState([]);
    const tDate = new Date();

    const selected = tests.filter(test => new Date(test.date) >= tDate)


    const handleSearch = e => {
        e.preventDefault();
        const search = e.target.searchDate.value;
        console.log(search);
       // setShowTest(selected)
        const selected = tests.filter(test => {
            const date1 = test.date
           // const rDate = moment().format('YYYY-MM-D')
            const date2 = search
            console.log(date1,date2)
            if(date1>=date2)return test;
        })
        console.log(selected)
        setShowTest(selected)
    }

    return (
        <div>
            <h2 className="text-2xl my-5 text-center font-semibold">All Available Test Services</h2>
            <div>
                <h2>Search By Date</h2>
                <form onSubmit={handleSearch}>
                    <input type="date" placeholder="Type here" className="input input-bordered input-info w-full max-w-xs" name="searchDate" />
                    <input className="btn btn-accent" type="submit" value="Search" />
                </form>
            </div>
            <div className="grid my-5 grid-cols-2 gap-4">
                {
                   showTest.length? showTest.map(select => <Test key={select._id} test={select}></Test>)
                   : selected.map(select => <Test key={select._id} test={select}></Test>)
                }
            </div>


        </div>
    );
};

export default AllTest;