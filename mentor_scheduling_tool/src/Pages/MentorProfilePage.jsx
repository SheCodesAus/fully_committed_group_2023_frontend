import { useParams } from "react-router-dom";
import { allMentors } from "../mentordata";

function MentorProfilePage() {
    const { id } = useParams();

    const mentorData = allMentors.find(mentor => 
        mentor.id === id);

    return (
        <div>
            <div>
                <p>{`First Name: ${mentorData.first_name}`}</p>  
                <p>{`Last Name: ${mentorData.last_name}`}</p>
                <p>{`Email: ${mentorData.email}`}</p>
                <p>{`Phone: ${mentorData.phone}`}</p>
                <p>{`City: ${mentorData.city}`}</p>
            </div>
            <div>
                <p>{`Will travel? ${mentorData.will_travel}`}</p>
                <p>{`Junior mentor? ${mentorData.junior_mentor}`}</p>
                <p>{`Industry mentor? ${mentorData.industry_mentor}`}</p>
                <p>{`Lead mentor? ${mentorData.lead_mentor}`}</p>
                <p>{`She codes alumni? ${mentorData.she_codes_alumni}`}</p>
            </div>
            <div>
                <p>{`Skills: ${mentorData.skills}`}</p>
            </div>
            <div>
                <p>{`Current step: ${mentorData.current_step}`}</p>
                <p>{`Pay Type: ${mentorData.payment_type}`}</p>
                <p>{`Onboarding active? ${mentorData.is_active}`}</p>
            </div>
            <div>
                <p>{`Notes: ${mentorData.notes}`}</p>
            </div>
            <div>
                <p>{`Feedback: ${mentorData.feedback}`}</p>
            </div>
        </div> 

    )
}

export default MentorProfilePage;


