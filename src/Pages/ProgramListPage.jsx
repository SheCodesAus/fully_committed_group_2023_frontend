import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import EditButton from "../Components/EditButton/EditButton.jsx";
// import { allPrograms } from "../programdata.js";


function ProgramsListPage() {
    const [programData, setProgramData] = useState ([])

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}programs`)
        .then((results) => {return results.json();})
        .then((data) => {setProgramData(data);
        });
    }, []);
    return (
        <div>
            {
                programData.map((program) =>{
                return <div key={program.id}>
                <Link to={`/programs/${program.id}`}><h2>{`${program.program_name}`}</h2></Link>
                    {/* <p>{`Program Type: ${program.program_type}`}</p> */}
                    <p>{`Program City: ${program.city}`}</p>
                    <p>{`Start Date: ${program.start_date}`}</p>
                    {/* <p>{`End Date: ${program.end_date}`}</p> */}
                    <EditButton />
                    </div>
                })
            }
        </div>
    )
}

export default ProgramsListPage;

