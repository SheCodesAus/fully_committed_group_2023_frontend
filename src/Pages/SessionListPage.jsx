// (WEN & KRISTY) 

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./SessionListPage.css"; // import CSS file
import ProgressBar from "../Components/ProgressBar/ProgressBar";
import { getModuleType } from "../utils";

import ProgressSessionBar from "../Components/ProgressSessionBar/ProgressSessionBar";




function SessionListPage() {
    // const [sessionData, setSessionData] = useState(null);
    const [programData, setProgramData] = useState(null);
    // const [annotatedSessionData, setAnnotatedSessionData] = useState(null);

    // useEffect(() => {
    //     const fetchSessionList = async () => {
    //         const response = await fetch(`${import.meta.env.VITE_API_URL}sessions`)
    //         const data = await response.json();

    //         setSessionData(data);
    //     }
    //     fetchSessionList();
    // }, []);


    useEffect(() => {
        const fetchProgramList = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}programs`)
            const data = await response.json();

            setProgramData(data);
        }
        fetchProgramList();
    }, []);

    // useEffect(() => {
    //     if (!programData) return;
    //     const annotated = programData.flatMap(({ program_type, sessions }) => {
    //         return sessions.map((session) => ({ ...session, program_type }))
    //     })
    //     setAnnotatedSessionData(annotated);
    // }, [programData])


    const annotatedSessionData = programData?.flatMap(({ program_type, program_name, sessions }) => {
        return sessions.map((session) => ({ ...session, program_type, program_name }))
    })

    const tableHeaders = ["Date", "Time", "Program", "Program Type",  "Module", "Location", "Mentors"];

    return (

        <div className="page-content list session-list" >
            <div className="list-header">
                <h1>Sessions</h1>
                <Link className="create-button" to={`/sessions/create`}>Create</Link>
            </div>


            <table>
                <thead>
                    <tr>
                        {tableHeaders.map(header => (
                            <th key={header}>{header}</th>
                        ))}
                    </tr>
                </thead>

                <tbody className="sessions-list-table">
                    {annotatedSessionData?.map(session => (
                        <tr key={session.id}>
                            <td><Link to={`/sessions/${session.id}`}>{new Date(session.start_date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: '2-digit' })}</Link></td>
                            <td className="input">
                            {" "}
                            {new Date(session.start_date).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', timeZone: 'UTC'})}
                            </td>
                            <td><Link to={`/programs/${session.program}`}>{session.program_name}</Link></td>
                            <td>{session.program_type}</td>
                            <td>{getModuleType[session.module_type]}</td>
                            <td>{session.city}</td>
                            <td>
                                <ProgressBar 
                                completed={
                                    session.mentors_required > 0 
                                    ?  Math.ceil(
                                        (session.mentors_assigned/session.mentors_required)*    100
                                        )
                                    :0
                                }
                                ></ProgressBar>
                                </td>
                            </tr>))}
                    </tbody>

                </table>

            </div>
        // </div>



    )
}

export default SessionListPage;




