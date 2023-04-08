// (KAT) - STARTED

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import ProgramName from "../Components/ProgramName/ProgramName.jsx"
import EditButton from "../Components/EditButton/EditButton.jsx";
import ProgressBar from "../Components/ProgressBar/ProgressBar";

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

    const tableHeaders = ["Program", "Start", "End", "Program Type", "Location", , "Mentors Allocated"];

  const program_name = programData.program_name;


    return (
        <div className="page-content list" id="program-list">
            <div className="list-header">
                <h1>Programs</h1>
                <Link className="create-button" to={`/programs/create`}>Create</Link>
            </div>

            <table>
                <thead>
                    <tr>
                        {tableHeaders.map(header => (
                            <th key={header}>{header}</th>
                        ))}
                    </tr>
                </thead>

                <tbody className="programs-list-table">
                    {programData?.map(program => (
                        
                        <tr key={program.id}>
                            <td><Link to={`/programs/${program.id}`} className="progress-link">{program.program_name}</Link></td>

                            <td>{new Date(program.start_date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: '2-digit' })}</td>

                            <td>{new Date(program.end_date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: '2-digit' })}</td>

                            <td>{program.program_type}</td>
                            <td>{program.city}</td>
                            <td><ProgressBar className="progress-bar"
                            completed={
                                program.mentors_required > 0
                                ? Math.ceil(
                                    (program.mentors_assigned /
                                    program.mentors_required) *
                                        100
                                    )
                                : 0
                            }
                            ></ProgressBar></td>

{/* 
                            <td><Link to={`/programs/${program.id}`}>{program.program_name}</Link></td> */}

 
                        </tr>))}
                </tbody>

            </table>

        </div>
    )
}

export default ProgramsListPage;

