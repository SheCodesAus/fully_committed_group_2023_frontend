// (WEN & KRISTY) 

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./SessionListPage.css"; // import CSS file
import ProgressBar from "../Components/ProgressBar/ProgressBar";
import { getModuleType } from "../utils";
import { ShowAllButton } from "../Components/CreateButton/CreateButton"


import ProgressSessionBar from "../Components/ProgressSessionBar/ProgressSessionBar";




function SessionListPage() {
    // const [sessionData, setSessionData] = useState(null);
    const [programData, setProgramData] = useState([]);
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


    const annotatedSessionData = programData.flatMap(({ program_type, program_name, sessions }) => {
        return sessions.map((session) => {
            const formattedStartDate = new Date(session.start_date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: '2-digit' })
            const start_time = new Date(session.start_date).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', timeZone: 'UTC'})
            const end_time = new Date(session.end_date).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', timeZone: 'UTC'})
            const formattedModuleType = getModuleType[session.module_type]
            return {
                ...session,
                program_type,
                program_name,
                start_time,
                end_time,
                formattedStartDate,
                formattedModuleType
            }
        })
    })

    // const tableHeaders = ["Date", "Time", "Program", "Program Type",  "Module", "Location", "Mentors"];

    // FILTER
    const [hideCompleted, setHideCompleted] = useState(true)

    // const filteredProgramData = programData.filter(({ end_date }) => {
    //     return !hideCompleted || (new Date() < new Date(end_date))
    // });

    const filteredSessionData = hideCompleted ? annotatedSessionData.filter(({ end_date }) => {
        return new Date() < new Date(end_date)
    }) : annotatedSessionData;

    // SORTING
    const [sortAttribute, setSortAttribute] = useState("formattedStartDate");
    const [reverseSort, setReverseSort] = useState(false);

    const sortedSessionData = [...filteredSessionData];
    if (sortAttribute != null){
        sortedSessionData.sort((a, b) => {
            if (b[sortAttribute] < a[sortAttribute]){
                return 1
            }
            if (b[sortAttribute] > a[sortAttribute]){
                return -1
            }
            return 0;
        })
    }
    if (reverseSort){
        sortedSessionData.reverse()
    }
    

    const changeSort = (attributeName) => {
        if (attributeName === sortAttribute) {
            setReverseSort(!reverseSort)
        } else {
            setSortAttribute(attributeName);
            setReverseSort(false);
        }
    }    

    // Using a function like a 'local component' to sort
    function SortableTableHeader({ children, sortKey }) {
        return <th onClick={() => changeSort(sortKey)}>{children}{sortKey === sortAttribute && (<span> &#8595;&#8593;</span>)}</th>
    }


    return (

        <div className="page-content list session-list" >
            <div className="list-header">
                <h1>Sessions</h1>
                <Link className="create-button" to={`/sessions/create`}>Create</Link>
            </div>


            <table className="sessions-table">
                <thead>
                    <tr>
                        <SortableTableHeader sortKey="program_name">Program</SortableTableHeader>
                        <SortableTableHeader sortKey="formattedStartDate">Date</SortableTableHeader>
                        <SortableTableHeader sortKey="formattedModuleType">Module</SortableTableHeader>
                        <SortableTableHeader sortKey="start_time">From</SortableTableHeader>
                        <SortableTableHeader sortKey="end_time">To</SortableTableHeader>
                        <SortableTableHeader sortKey="program_type">Program Type</SortableTableHeader>
                        <SortableTableHeader sortKey="city">Location</SortableTableHeader>
                        <th>Mentors</th>
                    </tr>
                    {/* <tr>
                        {tableHeaders.map(header => (
                            <th key={header}>{header}</th>
                        ))}
                    </tr> */}
                </thead>

                <tbody className="sessions-list-table">
                    {sortedSessionData.map(session => (
                        <tr key={session.id}>
                            <td id="program-name"><Link to={`/programs/${session.program}`}>{session.program_name}</Link></td>
                            <td className="hide2">
                                <Link to={`/sessions/${session.id}`}>
                                    {session.formattedStartDate}
                                </Link>
                            </td>
                            <td>{session.formattedModuleType}</td>

                            <td id="session-name" className="hide">
                                <Link to={`/sessions/${session.id}`}>Session: {new Date(session.start_date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: '2-digit' })} @ {new Date(session.start_date).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', timeZone: 'UTC'})}</Link> </td>
                            <td className="hide2">
                                {session.start_time}
                            </td>
                            <td className="hide2">
                                {session.end_time}
                            </td>

                            <td>{session.program_type}</td>

                            <td>{session.city}</td>
                            <td>
                                {/* <ProgressBar 
                                completed={
                                    session.mentors_required > 0 
                                    ?  Math.ceil(
                                        (session.mentors_assigned/session.mentors_required)*    100
                                        )
                                    :0
                                }
                                ></ProgressBar> */}
                                {session.mentors_assigned}/{session.mentors_required}
                                </td>
                            </tr>))}
                    </tbody>

                </table>
                <ShowAllButton onClick={() => setHideCompleted(!hideCompleted)}>{hideCompleted ? "Show all" : "Show current"} sessions</ShowAllButton>
            </div>
        // </div>



    )
}

export default SessionListPage;




