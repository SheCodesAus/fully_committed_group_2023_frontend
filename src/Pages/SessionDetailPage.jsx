import { useState, useEffect } from "react";
import { useParams } from "react-router";

function SessionDetailPage() {
    const { id } = useParams();
    const [sessionData, setSessionData] = useState(null);
    const [programData, setProgramData] = useState(null);

    useEffect(() => {
        const fetchSessionDetail = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}sessions/${id}`)
            const data = await response.json();
            
            setSessionData(data);
        }

        fetchSessionDetail();

    }, [id]);

    // For Session Details: Retrieving the program name
    useEffect(() => {
        if (sessionData == null) return;
        const fetchProgramData = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}programs/${sessionData.program}`)
            const data = await response.json();

            setProgramData(data);
        }

        fetchProgramData();

    }, [sessionData])

    // For Mentor Allocation: Table headings for list of mentors
    const tableHeaders = ["Name", "Type", "Is Active", "Current Step"]

    // For Mentor Allocation: Generating the value for mentor type
    const getMentorType = ({ lead_mentor, industry_mentor, junior_mentor}) => {
        if (junior_mentor) return 'Junior';
        if (industry_mentor) return 'Industry';
        if (lead_mentor) return 'Lead';
    }
    // May need to revisit this logic if we do the lead must be industry mentor thing


    console.log(sessionData)
    return (<>
        {sessionData && programData && <div className="page-content-wrapper">
            <h1>{sessionData.session_name}</h1>
            
                <div>
                    <h2 className="section-header">SESSION DETAILS</h2>
                    <div>
                        <div>
                            <span>Program </span> 
                            <span>{programData?.program_name}</span>
                        </div>
                        <div>
                            <span>Location </span>
                            <span>{sessionData.city}</span>
                        </div>
                        <div>
                            <span>Module </span>
                            <span>{sessionData.module_type}</span>
                        </div>
                        <div>
                            <span>Start Date </span>
                            <span>{new Date(sessionData.start_date).toLocaleDateString()}</span>
                            <span>Start Time </span>
                            <span>{new Date(sessionData.start_date).toLocaleTimeString()}</span>
                            {/* <span>End Date </span>
                            <span>{new Date(sessionData.end_date).toLocaleDateString()}</span> */}
                            <span>End Time </span>
                            <span>{new Date(sessionData.end_date).toLocaleTimeString()}</span>
                        </div>
                        <div>
                            <span>End Date </span>
                            <span>{sessionData.end_date}</span>
                            {/* Extracted Date and time */}
                        </div>
                    </div>
                </div>


            <div>
                <h2 className="section-header">MENTOR ALLOCATION</h2>
            </div>

            {/* TODO: Add mentor required/mentor assigned section */}
            
            <table>
            <thead>
                <tr>
                    {tableHeaders.map(header => (
                        <th key={header}>{header}</th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {sessionData.mentors.map(mentor => (
                    <tr key={mentor.id}>
                        <td>{mentor.first_name} {mentor.last_name}</td>
                        <td>{getMentorType(mentor)}</td>
                        <td><input type='checkbox' checked={mentor.is_active}/></td>
                        <td>{mentor.current_step}</td>
                    </tr>))}
            </tbody>

            </table>

        </div>
    }
    </>)
}

export default SessionDetailPage;