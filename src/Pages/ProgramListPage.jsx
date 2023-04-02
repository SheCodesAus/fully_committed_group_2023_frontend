import { allPrograms } from "../programdata.js";

function ProgramsListPage() {
    return (
        <div>
            {
                allPrograms.map((program) =>{
                return <div key={program.id}>
                    <h2>{`${program.program_name}`}</h2>
                    {/* <p>{`Program Type: ${program.program_type}`}</p> */}
                    <p>{`Program City: ${program.city}`}</p>
                    <p>{`Start Date: ${program.start_date}`}</p>
                    {/* <p>{`End Date: ${program.end_date}`}</p> */}
                    </div>
                })
            }
        </div>
    )
}

export default ProgramsListPage;
