// (KAT) - STARTED

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import ProgramName from "../Components/ProgramName/ProgramName.jsx"
import EditButton from "../Components/EditButton/EditButton.jsx";
import PageContent from "../Components/PageContent/PageContent.jsx";
// import { allPrograms } from "../programdata.js";


function ProgramsListPage() {
    const [programData, setProgramData] = useState ([])

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}programs`)
        .then((results) => {return results.json();})
        .then((data) => {setProgramData(data);
            console.log(data);
        });
    }, []);
    return (
    <PageContent>
        <div>
            {
                programData.map((program) =>{
                return <div key={program.id}>
                <Link to={`/programs/${program.id}`}><h2>{<ProgramName {...program} />}</h2></Link>
                    </div>
                })
            }
        </div>
    </PageContent>)
}

export default ProgramsListPage;

