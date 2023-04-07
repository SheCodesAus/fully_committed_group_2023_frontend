// (KAT & CLAIRE & WEN) - STARTED

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import MentorCreationForm from "../Components/CreateMentorForm/CreateMentorForm.jsx";
import "./MentorListPage.css"; // import CSS file
import ToggleButtonReadOnly from "../Components/ToggleButton/ToggleButtonReadOnly.jsx";

function MentorListPage() {
    const [mentorData, setMentorData] = useState([])

    // useEffect(() => {
    //     fetch(`${import.meta.env.VITE_API_URL}mentors`)
    //         .then((results) => { return results.json(); })
    //         .then((data) => {
    //             setMentorData(data);
    //         });
    // }, []);


    useEffect(() => {
        const fetchMentorList = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}mentors`)
            const data = await response.json();

            setMentorData(data);
        }
        fetchMentorList();
    }, []);

    const tableHeaders = ["Name", "Type", "Skills", "Alumni", "Location", "Travel", "Current Step"]


  // For Mentor Allocation: Generating the value for mentor type
    const getMentorType = ({ lead_mentor, industry_mentor, junior_mentor }) => {
        if (junior_mentor) return "Junior";
        if (industry_mentor) return "Industry";
        if (lead_mentor) return "Lead";
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
                        {tableHeaders.map(header => (
                            <th key={header}>{header}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {/* {mentorData?.map(mentor => ( <Link key={mentor.id} to={`/mentors/${mentor.id}`}> */}
                    {mentorData?.map(mentor => ( 
                        <tr key={mentor.id} >
                            
                            <td>{mentor.first_name} {mentor.last_name}</td>
                            <td>{getMentorType(mentor)}</td>
                            <td></td>
                            <td><ToggleButtonReadOnly
                            value={mentor.she_codes_alumni}
                            readOnly={true}
                            /></td>
                            <td>{mentor.city}</td>
                            <td></td>
                            <td>{mentor.current_step}</td>

                        </tr>
                    // </Link>
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