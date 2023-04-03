import { useState, useEffect } from "react";

function SessionListPage() {
    const [sessionData, setSessionData] = useState(null);

    useEffect(() => {
        const fetchSessionDetail = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}sessions`)
            const data = await response.json();
            
            setSessionData(data);
        }

        fetchSessionDetail();

    }, []);



    return (
        <p >
            Hi
        </p>




    )
}

export default SessionListPage;




