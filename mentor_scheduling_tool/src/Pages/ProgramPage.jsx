import { useParams } from "react-router-dom";
import { allPrograms } from "../programdata";

function ProgramPage() {
    const { id } = useParams();

    const programData = allPrograms.find(program => program.id === id);

    return (
        <div>
            <h2>{`${program.program_name}`}</h2>
                    <p>{`Program Type: ${programData.program_type}`}</p>
                    <p>{`Program City: ${programData.program_city}`}</p>
                    <p>{`Start Date: ${programData.start_date}`}</p>
                    <p>{`End Date: ${programData.end_date}`}</p>
        </div>
    )
}

export default ProgramPage;