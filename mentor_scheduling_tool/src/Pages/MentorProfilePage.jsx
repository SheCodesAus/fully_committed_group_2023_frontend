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
                <p>{`Will travel? ${mentorData.will_travel}`}</p>
                <p>{`Onboarding active? ${mentorData.is_active}`}</p>
                <p>{`Current step: ${mentorData.current_step}`}</p>
                <p>{`Junior mentor? ${mentorData.junior_mentor}`}</p>
                <p>{`Industry mentor? ${mentorData.industry_mentor}`}</p>
                <p>{`Lead mentor? ${mentorData.lead_mentor}`}</p>
                <p>{`She codes alumni? ${mentorData.she_codes_alumni}`}</p>
                <p>{`Notes: ${mentorData.notes}`}</p>
                <p>{`Feedback: ${mentorData.feedback}`}</p>
                
        </div> 

    )
}

export default MentorProfilePage;


