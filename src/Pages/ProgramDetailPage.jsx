import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ToggleButton from "../Components/ToggleButton/ToggleButton";

// import { allPrograms } from "../programdata";

function ProgramDetailPage() {
    const { id } = useParams();
    const [programData, setProgramData] = useState ([])

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}programs/${id}`)
        .then((results) => {return results.json();})
        .then((data) => {setProgramData(data);
        });
    }, [id]);

    return (
            <div>
            {programData ? (
            <div>
                <div>
                <h2>{`${programData.program_name}`}</h2>
                <p key="program-type">{`Program Type: ${programData.program_type}`}</p>
                <p key="program-city">{`Program City: ${programData.program_city}`}</p>
                <p key="start-date">{`Start Date: ${programData.start_date}`}</p>
                <p key="end-date">{`End Date: ${programData.end_date}`}</p>
                <ToggleButton />
                </div>
            </div>
            ) : (
            <div>Loading...</div>
        )}
        </div>
    );
}
export default ProgramDetailPage;
