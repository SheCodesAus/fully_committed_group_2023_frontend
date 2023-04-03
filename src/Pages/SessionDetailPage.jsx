import { useState, useEffect } from "react";
import { useParams } from "react-router";

function SessionDetailPage() {
    const { id } = useParams();
    const [sessionData, setSessionData] = useState(null);

    useEffect(() => {
        const fetchSessionDetail = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}sessions/${id}`)
            const data = await response.json();
            
            setSessionData(data);
        }

        fetchSessionDetail();

    }, [id]);



    return (
        <div className="page-content-wrapper">
            



        </div>




    )
}

export default SessionDetailPage;