// (KAT & CLAIRE) - STARTED

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import MentorCreationForm from "../Components/CreateMentorForm/CreateMentorForm.jsx";
// import "./CreateButton.css";
import "./MentorListPage.css"; // import CSS file



function MentorListPage() {
    const [mentorData, setMentorData] = useState([])

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}mentors`)
            .then((results) => { return results.json(); })
            .then((data) => {
                setMentorData(data);
            });
    }, []);

    return (
        <div className="page-content list">
            <div className="list-header">
                <h1>MENTORS</h1>
                <Link className="create-button" to={`/mentors/create`}>Create</Link>
            </div>

            <div>
                {
                    mentorData.map((mentor) => {
                        return <div key={mentor.id}>
                            <Link to={`/mentors/${mentor.id}`}><h2>{`${mentor.first_name} ${mentor.last_name}`}</h2></Link>

                            <p>{`City: ${mentor.city}`}</p>
                            <p>{`Skills: ${mentor.skills}`}</p>
                            <p>{`Will travel? ${mentor.will_travel}`}</p>
                            <p>{`Onboarding active? ${mentor.is_active}`}</p>
                        </div>
                    })
                }
            </div>
        </div>
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