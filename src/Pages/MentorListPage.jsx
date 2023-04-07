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

    return (
        <div className="page-content list">
            <div className="list-header">
                <h1>MENTORS</h1>
                <Link className="create-button" to={`/mentors/create`}>Create</Link>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Lead</th>
                        <th>Alumni</th>
                        <th>Name</th>
                        <th>Current Step</th>
                        <th colSpan={6}>Skills</th>
                        <th>Location</th>
                        <th>Travel</th>
                    </tr>

                </thead>

                <tbody>
                    {mentorData?.map(mentor => ( 
                        <tr key={mentor.id} >
                            <td>{getMentorType(mentor)}</td>
                            <td><ToggleButtonReadOnly
                            value={mentor.she_codes_alumni}
                            readOnly={true} /></td>
                            <td><ToggleButtonReadOnly
                            value={mentor.lead_mentor}
                            readOnly={true}
                            /></td>
                            <td><Link to={`/mentors/${mentor.id}`}>{mentor.first_name} {mentor.last_name}</Link></td>
                            <td>{currentStepMapping[mentor.current_step]}</td>
                            <div className="skills-table">
                                <td><ToggleButtonReadOnly value={mentor.html_css} checkedCharacter="H" readOnly={true} /></td>
                                <td><ToggleButtonReadOnly value={mentor.python} checkedCharacter="P" readOnly={true} /></td>
                                <td><ToggleButtonReadOnly value={mentor.django} checkedCharacter="D" readOnly={true} /></td>
                                <td><ToggleButtonReadOnly value={mentor.drf} checkedCharacter="Drf" readOnly={true} /></td>
                                <td><ToggleButtonReadOnly value={mentor.javascript} checkedCharacter="J" readOnly={true} /></td>
                                <td><ToggleButtonReadOnly value={mentor.react} checkedCharacter="R" readOnly={true} /></td>
                            </div>
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