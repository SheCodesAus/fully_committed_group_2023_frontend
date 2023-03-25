import { useParams } from "react-router-dom";
import { allMentors } from "../mentordata";

function MentorProfilePage() {
    const { id } = useParams();

    const mentorData = allMentors.find(mentor => 
        mentor.id === id);

    return (
       <div>
       <h2>{`${mentorData.first_name} ${mentorData.last_name}`}</h2>
                <h3>{`Email: ${mentorData.email}`}</h3>
                <h3>{`Phone: ${mentorData.phone}`}</h3>
                <h3>{`City: ${mentorData.city}`}</h3>
                <h3>{`Skills: ${mentorData.skills}`}</h3>
                <h3>{`Will travel: ${mentorData.will_travel}`}</h3>
                <h3>{`Onboarding: ${mentorData.is_active}`}</h3>
        </div> 

    )
}

export default MentorProfilePage;

