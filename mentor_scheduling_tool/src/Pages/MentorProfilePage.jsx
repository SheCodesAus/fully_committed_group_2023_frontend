import { useParams } from "react-router-dom";
import { allMentors } from "../mentordata";

function MentorProfilePage() {
    const { id } = useParams();

    const mentorData = allMentors.find(mentor => 
        mentor.id === id);

    return (
       <div>
       <h2>{`${mentorData.first_name} ${mentorData.last_name}`}</h2>
                <p>{`Email: ${mentorData.email}`}</p>
                <p>{`Phone: ${mentorData.phone}`}</p>
                <p>{`City: ${mentorData.city}`}</p>
                <p>{`Skills: ${mentorData.skills}`}</p>
                <p>{`Will travel: ${mentorData.will_travel}`}</p>
                <p>{`Onboarding: ${mentorData.is_active}`}</p>
        </div> 

    )
}

export default MentorProfilePage;

