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

    useEffect(() => {
        if (sessionData == null) return;
        const fetchProgramData = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}programs/${sessionData.program}`)
            const data = await response.json();

            setProgramData(data);
        }

        fetchProgramData();

    }, [sessionData])


    return (
        <div className="page-content-wrapper">
            <div>
                <h2 className="section-header">SESSION DETAILS</h2>
                <div>
                    <span>Program </span> 
                    <span>{programData.program_name}</span>

                    <span>Location</span>
                    <span>{sessionData.city}</span>

                    <span>Module</span>
                    <span>{sessionData.module_type}</span>

                    <span>Date</span>
                    <span>{sessionData.date}</span>
                    {/* NOTE: Extract date only */}

                    <span>Time</span>
                    <span>{sessionData.date}</span>
                    {/* NOTE: Have to replace this with the to and from time */}

                </div>
            </div>



        </div>




    )
}

export default SessionDetailPage;