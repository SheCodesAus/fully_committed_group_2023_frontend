// (KAT & CLAIRE & WEN) - DONE

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./MentorListPage.css"; // import CSS file
import ToggleButtonReadOnly from "../Components/ToggleButton/ToggleButtonReadOnly.jsx";
import { currentStepMapping } from "../utils.js";


function MentorListPage() {
    const [mentorData, setMentorData] = useState([])

    useEffect(() => {
        const fetchMentorList = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}mentors`)
            const data = await response.json();

            setMentorData(data);
        }
        fetchMentorList();
    }, []);

    // For Mentor Allocation: Generating the value for mentor type
    const getMentorType = ({ lead_mentor, industry_mentor, junior_mentor }) => {
        if (junior_mentor) return "Junior";
        if (industry_mentor) return "Industry";
    };


    const annotatedMentorData = mentorData.map((mentor) => {
        const fullName = `${mentor.first_name} ${mentor.last_name}`
        const capitalisedFullName = `${mentor.first_name} ${mentor.last_name}`.toUpperCase();
        const mentorType = getMentorType(mentor)

        return {
            ...mentor,
            fullName,
            capitalisedFullName,
            mentorType
        }
    })

    // SORTING
    const [sortAttribute, setSortAttribute] = useState("capitalisedFullName");
    const [reverseSort, setReverseSort] = useState(false);

    const sortedMentorData = [...annotatedMentorData];
    if (sortAttribute != null){
        sortedMentorData.sort((a, b) => {
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
        sortedMentorData.reverse()
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
        <div className="page-content list mentor-list-page">
            <div className="list-header">
                <h1>Mentors</h1>
                <Link className="create-button" to={`/mentors/create`}>Create</Link>
            </div>

            <div className="mentor-table-container">
            <table className="mentors-table">
                <thead>
                <tr>
                        <SortableTableHeader sortKey="mentorType">Type</SortableTableHeader>
                        <SortableTableHeader sortKey="lead_mentor">Lead</SortableTableHeader>
                        <SortableTableHeader sortKey="she_codes_alumni">Alumni</SortableTableHeader>
                        <SortableTableHeader sortKey="capitalisedFullName">Name</SortableTableHeader>
                        <SortableTableHeader sortKey="current_step">Step</SortableTableHeader>
                        <th colSpan={6}>Skills</th>
                        <SortableTableHeader sortKey="city">Location</SortableTableHeader>
                        <SortableTableHeader sortKey="will_travel">Travel</SortableTableHeader>

                        {/* <th>Mentors</th> */}
                    </tr>
                    {/* <tr>
                        <th>Type</th>
                        <th>Lead</th>
                        <th>Alumni</th>
                        <th>Name</th>
                        <th>Current Step</th>
                        <th>Location</th>
                        <th>Travel</th>
                    </tr> */}

                </thead>

                <tbody className="mentors-list-table">
                    {sortedMentorData.map(mentor => ( 
                        <tr key={mentor.id}>
                            <td>{mentor.mentorType}</td>
                            <td><ToggleButtonReadOnly value={mentor.lead_mentor} readOnly={true} /></td>
                            <td><ToggleButtonReadOnly value={mentor.she_codes_alumni} readOnly={true} /></td>
                            <td><Link to={`/mentors/${mentor.id}`}>{mentor.fullName}</Link></td>
                            <td>{currentStepMapping[mentor.current_step]}</td>
                                <td><ToggleButtonReadOnly value={mentor.html_css} checkedCharacter="H" readOnly={true} /></td>
                                <td><ToggleButtonReadOnly value={mentor.python} checkedCharacter="P" readOnly={true} /></td>
                                <td><ToggleButtonReadOnly value={mentor.django} checkedCharacter="D" readOnly={true} /></td>
                                <td><ToggleButtonReadOnly value={mentor.drf} checkedCharacter="Drf" readOnly={true} /></td>
                                <td><ToggleButtonReadOnly value={mentor.javascript} checkedCharacter="J" readOnly={true} /></td>
                                <td><ToggleButtonReadOnly value={mentor.react} checkedCharacter="R" readOnly={true} /></td>
                            <td>{mentor.city}</td>
                            <td><ToggleButtonReadOnly
                            value={mentor.will_travel}
                            readOnly={true}
                            /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>


    


















        // <div className="page-content list">


        //     <div>
        //         {
        //             mentorData.map((mentor) => {
        //                 return <div key={mentor.id}>
        //                     <Link to={`/mentors/${mentor.id}`}><h2>{`${mentor.first_name} ${mentor.last_name}`}</h2></Link>

        //                     <p>{`City: ${mentor.city}`}</p>
        //                     <p>{`Skills: ${mentor.skills}`}</p>
        //                     <p>{`Will travel? ${mentor.will_travel}`}</p>
        //                     <p>{`Onboarding active? ${mentor.is_active}`}</p>
        //                 </div>
        //             })
        //         }
        //     </div>
        // </div>
    );

}

export default MentorListPage;


// import { allMentors } from "../mentordata";

// function MentorListPage() {

//     return (
//         <div>
//         {
//         allMentors.map((mentor) => {
//             return <div key ={mentor.id}>
//                 <Link to={`/mentors/${mentor.id}`}><h2>{`${mentor.first_name} ${mentor.last_name}`}</h2></Link>
//                 <p>{`Skills: ${mentor.skills}`}</p>
//                 <p>{`Will travel? ${mentor.will_travel}`}</p>
//                 <p>{`Onboarding active? ${mentor.is_active}`}</p>
//                 </div>
//             })
//         }
//         </div> 
//     );
// }

// export default MentorListPage;