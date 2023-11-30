
import Test from "../../components/test";
import useTest from "../../hooks/useTest";


const AllTest = () => {
    const [tests, ,] = useTest();
    const tDate = new Date();
    const selected = tests.filter(test => new Date(test.date) >= tDate)

    return (
        <div>
            <h2 className="text-2xl">All Available Test Services</h2>
            <div className="grid grid-cols-2 gap-4">
                {
                    selected.map(select => <Test key={select._id} test={select}></Test>)
                }
            </div>


        </div>
    );
};

export default AllTest;