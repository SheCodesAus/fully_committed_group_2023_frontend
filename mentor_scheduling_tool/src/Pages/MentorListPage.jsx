import { Link } from "react-router-dom";
import { allMentors } from "../mentordata";

function MentorListPage() {

    return (
        <div>
        {
        allMentors.map((mentor) => {
            return <div key ={mentor.id}>
                <Link to={`/mentors/${mentor.id}`}><h2>{`${mentor.first_name} ${mentor.last_name}`}</h2></Link>
                <p>{`Skills: ${mentor.skills}`}</p>
                <p>{`Will travel? ${mentor.will_travel}`}</p>
                <p>{`Onboarding active? ${mentor.is_active}`}</p>
                </div>
            })
        }
        </div> 
    );
}

export default MentorListPage;

