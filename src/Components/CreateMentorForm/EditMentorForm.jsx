import { useState, useEffect } from "react";
import { useOutletContext, Link, useParams } from "react-router-dom";
import PageContent from "../PageContent/PageContent";
import "./CreateMentorForm.css";
import ToggleButton2 from "../ToggleButton/ToggleButton2";
import SubmitButton from "../SubmitButton/SubmitButton";

function MentorEditForm() {

// ------- AUTH -------
const authToken = window.localStorage.getItem("token")
const [loggedIn] = useOutletContext();

const { id } = useParams();

const [mentor, setMentor] = useState({});


useEffect(() => {
    async function fetchMentorData() {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}mentors/${id}/`
    );
    const data = await response.json();
    setMentor(data);
    console.log("Mentor:", data);
    }
    fetchMentorData();
}, [id]);

const handleChange = (event) => {
    const { id, value } = event.target;
    setMentor((prevMentor) => ({
    ...prevMentor,
    [id]: value,
    }));
        
};  

const handleSessionChange = (event) => {
    const selectedSessions = Array.from(event.target.selectedOptions, (option) => {
    const session = sessions.find((s) => s.id === parseInt(option.value));
    return { id: session.id, session_name: session.session_name };
    });
    setMentor(prevMentor => ({
    ...prevMentor,
    sessions: selectedSessions
    }));
};

  // ------- SUBMIT FORM -------

const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(mentor);

    // const updatedMentor = mentor.map((mentor) => ({
    //     ...mentor,
    // }));

    // ---- UPDATE MENTOR LIST
    const updatedMentor = {
        first_name: mentor.first_name,
        last_name: mentor.last_name,
        email: mentor.email,
        will_travel: mentor.will_travel,
        city: mentor.city,
        html_css: mentor.html_css,
        javascript: mentor.javascript,
        react: mentor.react,
        python: mentor.python,
        django: mentor.django,
        drf: mentor.drf,
        junior_mentor: mentor.junior_mentor,
        industry_mentor: mentor.industry_mentor,
        lead_mentor: mentor.lead_mentor,
        she_codes_alumni: mentor.she_codes_alumni,
        payment_type: mentor.payment_type,
        current_step: mentor.current_step,
        is_active: mentor.is_active
        // sessions: mentor.sessions
    };

    // Check if user is logged in
    if (!loggedIn) {
    // Redirect to login page
    navigate(`/login`);
    return;
    }

    // ---------- PUT session data to API -------
    try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}mentors/${id}/`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${authToken}`,
        },
        body: JSON.stringify(updatedMentor),
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    location.reload();
    } catch (error) {
    console.error(error);
    alert(`Error: ${error.message}`);
    }
};

// ----------- Get session data for drop down
const [sessions, setSessions] = useState([]);

useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}sessions/`)
    .then((response) => response.json())
    .then((data) => setSessions(data))
    .catch((error) => console.error(error));
}, []);

// ----------- RENDER

    return (
        <PageContent>
        <>
            {loggedIn ? (
            <div className="mentor-form">
                <h1>CREATE A MENTOR</h1>
                <form onSubmit={handleSubmit}>
                <div className="contact-inputs">
                    {/* -------------------- CONTACT DETAILS ------------- */}
                    <label htmlFor="first_name">FIRST NAME</label>
                    <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    defaultValue={mentor.first_name}
                   
                    required
                    />
                    <label htmlFor="last_name">LAST NAME</label>
                    <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    defaultValue={mentor.last_name}
                   
                    required
                    />
                </div>
    
                <div className="contact-inputs">
                    <label htmlFor="email">EMAIL</label>
                    <input
                    type="email"
                    name="email"
                    id="email"
                    defaultValue={mentor.email}
                   
                    required
                    />
                    {/* <label htmlFor="phone">CONTACT NUMBER</label>
                        <input type="text" name="phone" id="phone" value={mentor.phone}/> */}
                </div>
                <div className="inputs-block">
                    <div className="location-inputs">
                    {/* -------------------- CITY DROP DOWN BOX ------------- */}
                    <label htmlFor="city">LOCATION</label>
                    <select
                        id="city"
                        name="city"
                        defaultValue={mentor.city}
                       
                    >
                        <option value="">---</option>
                        <option value="Brisbane" defaultValue={mentor.city === 'Brisbane'}>Brisbane</option>
                        <option value="Sydney" defaultValue={mentor.city === 'Sydney'}>Sydney</option>
                        <option value="Perth" defaultValue={mentor.city === 'Perth'}>Perth</option>
                    </select>
                    </div>
                <div className="container">
                    <div>
                    {/* -------------------- WILL TRAVEL ------------- */}
                    <label htmlFor="willTravel">WILL TRAVEL</label>
                    <ToggleButton2
                        isChecked={mentor.will_travel}
                        onChange={(newValue) =>
                        setMentor({ ...mentor, will_travel: newValue })
                        }
                    />
                    </div>
                    <div>
                    {/* -------------------- IS ALUMNI ------------- */}
                    <label htmlFor="sheCodesAlumni">SHE CODES ALUMNI</label>
                    <ToggleButton2
                        isChecked={mentor.she_codes_alumni}
                        onChange={(newValue) =>
                        setMentor({ ...mentor, she_codes_alumni: newValue })
                        }
                    />
                    </div>
                </div>
                <div className="container">
                    {/* -------------------- IS ACTIVE ------------- */}
                    <label htmlFor="is_active">IS ACTIVE</label>
                    <ToggleButton2
                    isChecked={mentor.is_active}
                    onChange={(newValue) =>
                        setMentor({ ...mentor, is_active: newValue })
                    }
                    />
                </div>
                </div>
    
                <div className="container">
                    {/* -------------------- SKILLS TYPE TOGGLES ------------- */}
                    <div>
                    <label htmlFor="skills">SKILLS:</label>
                    </div>
                    <div>
                    <label htmlFor="html_css">HTML/CSS</label>
                    <ToggleButton2
                        isChecked={mentor.html_css}
                        onChange={(newValue) =>
                        setMentor({ ...mentor, html_css: newValue })
                        }
                    />
                    </div>
                    <div>
                    <label htmlFor="javascript">JavaScript</label>
                    <ToggleButton2
                        isChecked={mentor.javascript}
                        onChange={(newValue) =>
                        setMentor({ ...mentor, javascript: newValue })
                        }
                    />
                    </div>
                    <div>
                    <label htmlFor="react">React</label>
                    <ToggleButton2
                        isChecked={mentor.react}
                        onChange={(newValue) =>
                        setMentor({ ...mentor, react: newValue })
                        }
                    />
                    </div>
                    <div>
                    <label htmlFor="python">Python</label>
                    <ToggleButton2
                        isChecked={mentor.python}
                        onChange={(newValue) =>
                        setMentor({ ...mentor, python: newValue })
                        }
                    />
                    </div>
                    <div>
                    <label htmlFor="django">Django</label>
                    <ToggleButton2
                        isChecked={mentor.django}
                        onChange={(newValue) =>
                        setMentor({ ...mentor, django: newValue })
                        }
                    />
                    </div>
                    <div>
                    <label htmlFor="drf">DRF</label>
                    <ToggleButton2
                        isChecked={mentor.drf}
                        onChange={(newValue) =>
                        setMentor({ ...mentor, drf: newValue })
                        }
                    />
                    </div>
                </div>
    
                {/* -------------------- MENTOR TYPE TOGGLES ------------- */}
                <div className="container">
                    <div>
                    <label>MENTOR TYPE:</label>
                    </div>
                    <div>
                    <label htmlFor="junior_mentor">Junior Mentor</label>
                    <ToggleButton2
                        isChecked={mentor.junior_mentor}
                        onChange={(newValue) =>
                        setMentor({ ...mentor, junior_mentor: newValue })
                        }
                    />
                    </div>
                    <div>
                    <label htmlFor="industry_mentor">Industry Mentor</label>
                    <ToggleButton2
                        isChecked={mentor.industry_mentor}
                        onChange={(newValue) =>
                        setMentor({ ...mentor, industry_mentor: newValue })
                        }
                    />
                    </div>
                    <div>
                    <label htmlFor="lead_mentor">Lead Mentor</label>
                    <ToggleButton2
                        isChecked={mentor.lead_mentor}
                        onChange={(newValue) =>
                        setMentor({ ...mentor, lead_mentor: newValue })
                        }
                    />
                    </div>
                </div>
    
                <div className="recruitment-inputs">
                    {/* -------------------- STEPS DROP DOWN ------------- */}
                    <label htmlFor="current_step">STAGE</label>
                    <select
                    id="current_step"
                    name="current_step"
                    value={mentor.current_step}
                   
                    >
                    <option value="">-- Select a Step --</option>
                    <option value="step_0_expression_of_interest_sent" defaultValue={mentor.step === 'step_0_expression_of_interest_sent'}>
                        Expression of Interest Sent
                    </option>
                    <option value="step_0a_expression_of_interest_received" defaultValue={mentor.step === 'step_0a_expression_of_interest_received'}>
                        Expression of Interest Received
                    </option>
                    <option value="step_1_interview_required" defaultValue={mentor.step === 'step_1_interview_required'}>
                        Step 1 - Interview Required
                    </option>
                    <option value="step_1a_interview_not_required" defaultValue={mentor.step === 'step_1a_interview_not_required'}>
                        Step 1 - Interview Not Required
                    </option>
                    <option value="step_1b_interview_scheduled" defaultValue={mentor.step === 'step_1b_interview_scheduled'}>
                        Step 1 - Interview Scheduled
                    </option>
                    <option value="step_1c_interview_completed" defaultValue={mentor.step === 'step_1c_interview_completed'}>
                        Step 1 - Interview Completed
                    </option>
                    <option value="step_2_send_offer" defaultValue={mentor.step === 'step_2_send_offer'}>
                        Step 2 - Send Offer to Mentor
                    </option>
                    <option value="step_2a_offer_sent" defaultValue={mentor.step === 'step_2a_offer_sent'}>
                        Step 2 - Offer Sent to Mentor
                    </option>
                    <option value="step_2b_offer_accepted" defaultValue={mentor.step === 'step_2b_offer_accepted'}>
                        Step 2 - Offer Accepted
                    </option>
                    <option value="step_2c_offer_declined" defaultValue={mentor.step === 'step_2c_offer_declined'}>
                        Step 2 - Offer Declined
                    </option>
                    <option value="step_3_send_contract" defaultValue={mentor.step === 'step_3_send_contract'}>
                        Step 3 - Send Contract to Mentor
                    </option>
                    <option value="step_3a_contract_sent" defaultValue={mentor.step === 'step_3a_contract_sent'}>
                        Step 3 - Contract Sent to Mentor
                    </option>
                    <option value="step_4_contract_signed_by_mentor" defaultValue={mentor.step === 'step_4_contract_signed_by_mentor'}>
                        Step 4 - Contract Signed by Mentor Only
                    </option>
                    <option value="step_4a_contract_signed_by_admin" defaultValue={mentor.step === 'step_4a_contract_signed_by_admin'}>
                        Step 4 - Contract Signed by Admin Only
                    </option>
                    <option value="step_4b_contract_completed" defaultValue={mentor.step === 'step_4b_contract_completed'}>
                        Step 4 - Contract Signing Complete
                    </option>
                    <option value="step_5_send_calendar_invites" defaultValue={mentor.step === 'step_5_send_calendar_invites'}>
                        Step 5 - Send Calendar Invites
                    </option>
                    <option value="step_5_send_calendar_invites" defaultValue={mentor.step === 'step_5_send_calendar_invites'}>
                        Step 5 - Send Calendar Invites
                    </option>
                    <option value="step_5a_calendar_invites_sent" defaultValue={mentor.step === 'step_5a_calendar_invites_sent'}>
                        Step 5 - Calendar Invites Sent
                    </option>
                    <option value="step_6_onboard_mentor" defaultValue={mentor.step === 'step_6_onboard_mentor'}>
                        Step 6 - Onboard Mentor
                    </option>
                    <option value="step_6a_mentor_onboarded" defaultValue={mentor.step === 'step_6a_mentor_onboarded'}>
                        Step 6 - Mentor Onboarded
                    </option>
                    <option value="step_7_mentoring" defaultValue={mentor.step === 'step_7_mentoring'}>
                        Step 7 - Mentoring in Program
                    </option>
                    <option value="step_8_collate_feedback" defaultValue={mentor.step === 'step_8_collate_feedback'}>
                        Step 8 - Collate Feedback for Mentor
                    </option>
                    <option value="step_8a_feedback_sent" defaultValue={mentor.step === 'step_8a_feedback_sent'}>
                        Step 8 - Feedback Sent to Mentor
                    </option>
                    <option value="step_9_offboard_mentor" defaultValue={mentor.step === 'step_9_offboard_mentor'}>
                        Step 9 - Offboard Mentor
                    </option>
                    <option value="step_9a_offboarding_in_progress" defaultValue={mentor.step === 'step_9a_offboarding_in_progress'}>
                        Step 9 - Offboarding in Progress
                    </option>
                    <option value="step_9b_mentor_offboarded" defaultValue={mentor.step === 'step_9b_mentor_offboarded'}>
                        Step 9 - Mentor Offboarded
                    </option>
                    </select>
                </div>
    
                <div className="recruitment-inputs">
                {/* -------------------- MULTIPLE CHOICE SESSIONS ------------- */}
                <label htmlFor="session">SESSION</label>
                
                
                <select
                    id="session"
                    name="session"
                    value={
                        mentor.sessions
                        ? mentor.sessions.map((session) => session.id)
                        : []
                    }
                    multiple
                    size={3}
                    onChange={handleSessionChange}
                    >
                    <option value="">-- CTRL + Select/Deselect Sessions --</option>
                    {sessions &&
                        sessions.map((session) => (
                        <option key={session.id} value={session.id}>
                            {session.session_name}
                        </option>
                        ))}
                    </select>
            </div>


    
                <div className="recruitment-inputs">
                    {/* -------------------- PAYMENT TYPE DROP DOWN BOX ------------- */}
                    <label htmlFor="payment_type">PAYMENT TYPE</label>
                    <select
                    id="payment_type"
                    name="payment_type"
                    value={mentor.payment_type}
                   
                    >
                    <option value="">-- Select a payment Type --</option>
                    <option value="paid">Paid</option>
                    <option value="volunteer">Volunteer</option>
                    <option value="mentor_give_back">Mentor Give Back</option>
                    </select>
                </div>
    
                {/* -------------------- NOTES ------------- */}
    
                <SubmitButton />
                </form>
            </div>
            ) : (
            <Link to="/login" className="button-link">
                You must be an admin to create a mentor
            </Link>
            )}
        </>
        </PageContent>
    );
    }

export default MentorEditForm;