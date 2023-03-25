import { allMentors } from "../mentordata";

function MentorListPage() {

    return (
        <div>
        {
        allMentors.map((mentor) => {
            return <div key ={mentor.id}>
                <h2>{`${mentor.first_name} ${mentor.last_name}`}</h2>
                <h3>{`Skills: ${mentor.skills}`}</h3>
                <h3>{`Will travel?: ${mentor.will_travel}`}</h3>
                <h3>{`Onboarding: ${mentor.is_active}`}</h3>
                </div>
            })
        };
        </div> 
    );
}

export default MentorListPage;

