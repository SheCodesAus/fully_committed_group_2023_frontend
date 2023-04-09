import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import ProgressBar from "../Components/ProgressBar/ProgressBar";

import "./ProgramListPage.css"; 

function ProgramsListPage() {
    const [programData, setProgramData] = useState([])

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}programs`)
            .then((results) => { return results.json(); })
            .then((data) => {
                setProgramData(data);
            });
    }, []);


    // SORTING
    const [sortAttribute, setSortAttribute] = useState(null);
    const [reverseSort, setReverseSort] = useState(false);

    const sortedProgramData = [...programData];
    if (sortAttribute != null){
        sortedProgramData.sort((a, b) => {
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
        sortedProgramData.reverse()
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
        <div className="page-content list" id="program-list">
            <div className="list-header">
                <h1>Programs</h1>
                <Link className="create-button" to={`/programs/create`}>Create</Link>
            </div>

            <table className="programs-table">
                <thead>
                    <tr>
                        <SortableTableHeader sortKey="program_name">Program</SortableTableHeader>
                        <SortableTableHeader sortKey="start_date">Start</SortableTableHeader>
                        <SortableTableHeader sortKey="end_date">End</SortableTableHeader>
                        <SortableTableHeader sortKey="program_type">Program Type</SortableTableHeader>
                        <SortableTableHeader sortKey="city">Location</SortableTableHeader>
                        <th>Mentors</th>
                    </tr>
                </thead>

                <tbody className="programs-list-table">
                    {sortedProgramData?.map(program => (
                        <tr key={program.id}>
                            <td id="program-name"><Link to={`/programs/${program.id}`} className="progress-link">{program.program_name}</Link></td>
                            <td>{new Date(program.start_date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: '2-digit' })}</td>
                            <td>{new Date(program.end_date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: '2-digit' })}</td>
                            <td>{program.program_type}</td>
                            <td>{program.city}</td>
                            <td>
                                <ProgressBar className="progress-bar" completed={program.mentors_required > 0
                                ? Math.ceil((program.mentors_assigned / program.mentors_required) * 100)
                                : 0} />
                            </td> 
                        </tr>))}
                </tbody>

            </table>

        </div>
    )
}

export default ProgramsListPage;

