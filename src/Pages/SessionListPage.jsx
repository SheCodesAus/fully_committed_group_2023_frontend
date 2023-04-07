// (WEN & KRISTY) 

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./SessionListPage.css"; // import CSS file
import ProgressBar from "../Components/ProgressBar/ProgressBar";
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

    const tableHeaders = ["Session", "Date", "Program Name", "Program Type", "Module", "Location", "Mentors"];

    return (

        <div className="page-content list">
            <div className="list-header">
                <h1>SESSIONS</h1>
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

                <tbody>
                    {annotatedSessionData?.map(session => (
                        <tr key={session.id}>
                            <td><Link to={`/sessions/${session.id}`}>{session.session_name}</Link></td>
                            <td>{new Date(session.start_date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: '2-digit' })}</td>
                            <td><Link to={`/programs/${session.program}`}>{session.program_name}</Link></td>
                            <td>{session.program_type}</td>
                            <td>{session.module_type}</td>
                            <td>{session.city}</td>
                            
                            <div>
                                <ProgressBar 
                                completed={
                                    session.mentors_required > 0 
                                    ?  Math.ceil(
                                        (session.mentors_assigned/session.mentors_required)*    100
                                        )
                                    :0
                                }
                                ></ProgressBar>
                                
                                <span>
                                {""}
                                {session.mentors_assigned} / {session.mentors_required} {""}
                                </span>
                                </div>
                            </tr>))}
                    </tbody>

                </table>

            </div>
        // </div>



    )
}

export default SessionListPage;




