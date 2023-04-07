// (KAT) - STARTED

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import ProgramName from "../Components/ProgramName/ProgramName.jsx"
import EditButton from "../Components/EditButton/EditButton.jsx";

import "./ProgramListPage.css"; // import CSS file
// import { allPrograms } from "../programdata.js";


function ProgramsListPage() {
    const [programData, setProgramData] = useState([])

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}programs`)
            .then((results) => { return results.json(); })
            .then((data) => {
                setProgramData(data);
                console.log(data);
            });
    }, []);
    return (
        <div className="page-content list">
            <div className="list-header">
                <h1>PROGRAMS</h1>
                <Link className="create-button" to={`/programs/create`}>Create</Link>
            </div>


            <div>
                {
                    programData.map((program) => {
                        return <div key={program.id}>
                            <Link to={`/programs/${program.id}`}><h2>{<ProgramName {...program} />}</h2></Link>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default ProgramsListPage;

