import { useParams } from "react-router-dom";
import { allPrograms } from "../programdata";

function ProgramPage() {
    const { id } = useParams();

    const programData = allPrograms.find(program => program.id === id);

    return (
        <div key={programData.id}>
            <h2>{`${programData.program_name}`}</h2>
            <p key="program-type">{`Program Type: ${programData.program_type}`}</p>
            <p key="program-city">{`Program City: ${programData.program_city}`}</p>
            <p key="start-date">{`Start Date: ${programData.start_date}`}</p>
            <p key="end-date">{`End Date: ${programData.end_date}`}</p>
        </div>
    )
}

export default ProgramPage;
