// KRISTY - DONE
// RENDERED ON MENTORCREATIONPAGE.JSX

import { useState, useEffect } from "react";
import { useNavigate, useOutletContext, Link } from "react-router-dom";

import ToggleButton2 from "../ToggleButton/ToggleButton2.jsx";
import SubmitButton from "../SubmitButton/SubmitButton";
import PageContent from "../PageContent/PageContent.jsx";
import "./CreateMentorForm.css";

function MentorCreateForm() {
  // ------- AUTH -------
  const authToken = window.localStorage.getItem("token");
  const [loggedIn] = useOutletContext();

  // ------- HOOKS -------
  const navigate = useNavigate();

  // ------- STATE -------
  const [mentors, setMentors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    will_travel: false,
    city: "",
    html_css: false,
    javascript: false,
    react: false,
    python: false,
    django: false,
    drf: false,
    junior_mentor: false,
    industry_mentor: false,
    lead_mentor: false,
    she_codes_alumni: false,
    payment_type: "",
    current_step: "",
    is_active: true,
    sessions: [],
  });

  // ------- MENTOR LIST CHANGE (inc toggle changes using checked) -------

  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setMentors({
      ...mentors,
      [name]: value,
    });
  };

  // ------- SUBMIT FORM -------

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if user is logged in
    if (!loggedIn) {
      // Redirect to login page
      navigate(`/login`);
      return;
    }

    // ---------- POST session data to API -------
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}mentors/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${authToken}`,
        },
        body: JSON.stringify(mentors),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

       // Navigate to mentor details page
       const data = await response.json();
       navigate(`/mentors/${data.id}`);

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


// ------------Mentor type conditional logic
  const setMentorType = (mentor_type) => (newValue) => {
    switch(mentor_type){
      case 'junior_mentor':
        setMentors({ ...mentors, junior_mentor: newValue, industry_mentor: !newValue, lead_mentor: newValue ? false : mentors.lead_mentor })
        break;
      case 'industry_mentor':
        setMentors({ ...mentors, junior_mentor: !newValue, industry_mentor: newValue })
        break;
      case 'lead_mentor':
        setMentors({ ...mentors, lead_mentor: mentors.industry_mentor && newValue })
        break;
      default:
        break;
    }
  };

  // ----------- RENDER

  return (
    <PageContent>
      <>
        {loggedIn ? (
          <div className="mentor-form">
            <h1>New Mentor</h1>
            <form onSubmit={handleSubmit} id="mentor-form">
              <div className="contact-inputs">
                {/* -------------------- CONTACT DETAILS ------------- */}
                <label htmlFor="first_name">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  value={mentors.first_name}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="last_name">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  value={mentors.last_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-inputs">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={mentors.email}
                  onChange={handleChange}
                  required
                />
                {/* <label htmlFor="phone">CONTACT NUMBER</label>
                    <input type="text" name="phone" id="phone" value={mentors.phone} onChange={handleChange}/> */}
              </div>
              <div className="inputs-block">
                <div className="location-inputs">
                  {/* -------------------- CITY DROP DOWN BOX ------------- */}
                  <label htmlFor="city">Location</label>
                  <select
                    id="city"
                    name="city"
                    value={mentors.city}
                    onChange={handleChange}
                  >
                    <option value="">---</option>
                    <option value="Brisbane">Brisbane</option>
                    <option value="Sydney">Sydney</option>
                    <option value="Perth">Perth</option>
                  </select>
                </div>
                <div className="container">
                  <div>
                    {/* -------------------- WILL TRAVEL ------------- */}
                    <label htmlFor="willTravel">Will Travel</label>
                    <ToggleButton2
                      isChecked={mentors.will_travel}
                      onChange={(newValue) =>
                        setMentors({ ...mentors, will_travel: newValue })
                      }
                    />
                  </div>
                  <div>
                    {/* -------------------- IS ALUMNI ------------- */}
                    <label htmlFor="sheCodesAlumni">She Codes Alumni</label>
                    <ToggleButton2
                      isChecked={mentors.she_codes_alumni}
                      onChange={(newValue) =>
                        setMentors({ ...mentors, she_codes_alumni: newValue })
                      }
                    />
                  </div>
                </div>
                <div className="container">
                  {/* -------------------- IS ACTIVE ------------- */}
                  <label htmlFor="is_active">Active</label>
                  <ToggleButton2
                    isChecked={mentors.is_active}
                    onChange={(newValue) =>
                      setMentors({ ...mentors, is_active: newValue })
                    }
                  />
                </div>
              </div>

              <div className="container">
                {/* -------------------- SKILLS TYPE TOGGLES ------------- */}
                <div>
                  <label htmlFor="skills">Skills</label>
                </div>
                <div>
                  <label htmlFor="html_css">HTML/CSS</label>
                  <ToggleButton2
                    isChecked={mentors.html_css}
                    onChange={(newValue) =>
                      setMentors({ ...mentors, html_css: newValue })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="javascript">JavaScript</label>
                  <ToggleButton2
                    isChecked={mentors.javascript}
                    onChange={(newValue) =>
                      setMentors({ ...mentors, javascript: newValue })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="react">React</label>
                  <ToggleButton2
                    isChecked={mentors.react}
                    onChange={(newValue) =>
                      setMentors({ ...mentors, react: newValue })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="python">Python</label>
                  <ToggleButton2
                    isChecked={mentors.python}
                    onChange={(newValue) =>
                      setMentors({ ...mentors, python: newValue })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="django">Django</label>
                  <ToggleButton2
                    isChecked={mentors.django}
                    onChange={(newValue) =>
                      setMentors({ ...mentors, django: newValue })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="drf">DRF</label>
                  <ToggleButton2
                    isChecked={mentors.drf}
                    onChange={(newValue) =>
                      setMentors({ ...mentors, drf: newValue })
                    }
                  />
                </div>
              </div>

              {/* -------------------- MENTOR TYPE TOGGLES ------------- */}
              <div className="container">
                <div>
                  <label>Mentor Type</label>
                </div>
                <div>
                  <label htmlFor="junior_mentor">Junior Mentor</label>
                  <ToggleButton2
                    isChecked={mentors.junior_mentor}
                    onChange={setMentorType('junior_mentor')}
                  />
                </div>
                <div>
                  <label htmlFor="industry_mentor">Industry Mentor</label>
                  <ToggleButton2
                    isChecked={mentors.industry_mentor}
                    onChange={setMentorType('industry_mentor')}

                  />
                </div>
                <div>
                  <label htmlFor="lead_mentor">Lead Mentor</label>
                  <ToggleButton2
                    isChecked={mentors.lead_mentor}
                    onChange={setMentorType('lead_mentor')}

                  />
                </div>
              </div>

              <div className="recruitment-inputs">
                {/* -------------------- STEPS DROP DOWN ------------- */}
                <label htmlFor="current_step">Stage</label>
                <select
                  id="current_step"
                  name="current_step"
                  value={mentors.current_step}
                  onChange={handleChange}
                >
                  <option value="">-- Select a Step --</option>
                  <option value="step_0_expression_of_interest_sent">
                    Expression of Interest Sent
                  </option>
                  <option value="step_0a_expression_of_interest_received">
                    Expression of Interest Received
                  </option>
                  <option value="step_1_interview_required">
                    Step 1 - Interview Required
                  </option>
                  <option value="step_1a_interview_not_required">
                    Step 1 - Interview Not Required
                  </option>
                  <option value="step_1b_interview_scheduled">
                    Step 1 - Interview Scheduled
                  </option>
                  <option value="step_1c_interview_completed">
                    Step 1 - Interview Completed
                  </option>
                  <option value="step_2_send_offer">
                    Step 2 - Send Offer to Mentor
                  </option>
                  <option value="step_2a_offer_sent">
                    Step 2 - Offer Sent to Mentor
                  </option>
                  <option value="step_2b_offer_accepted">
                    Step 2 - Offer Accepted
                  </option>
                  <option value="step_2c_offer_declined">
                    Step 2 - Offer Declined
                  </option>
                  <option value="step_3_send_contract">
                    Step 3 - Send Contract to Mentor
                  </option>
                  <option value="step_3a_contract_sent">
                    Step 3 - Contract Sent to Mentor
                  </option>
                  <option value="step_4_contract_signed_by_mentor">
                    Step 4 - Contract Signed by Mentor Only
                  </option>
                  <option value="step_4a_contract_signed_by_admin">
                    Step 4 - Contract Signed by Admin Only
                  </option>
                  <option value="step_4b_contract_completed">
                    Step 4 - Contract Signing Complete
                  </option>
                  <option value="step_5_send_calendar_invites">
                    Step 5 - Send Calendar Invites
                  </option>
                  <option value="step_5a_calendar_invites_sent">
                    Step 5 - Calendar Invites Sent
                  </option>
                  <option value="step_6_onboard_mentor">
                    Step 6 - Onboard Mentor
                  </option>
                  <option value="step_6a_mentor_onboarded">
                    Step 6 - Mentor Onboarded
                  </option>
                  <option value="step_7_mentoring">
                    Step 7 - Mentoring in Program
                  </option>
                  <option value="step_8_collate_feedback">
                    Step 8 - Collate Feedback for Mentor
                  </option>
                  <option value="step_8a_feedback_sent">
                    Step 8 - Feedback Sent to Mentor
                  </option>
                  <option value="step_9_offboard_mentor">
                    Step 9 - Offboard Mentor
                  </option>
                  <option value="step_9a_offboarding_in_progress">
                    Step 9 - Offboarding in Progress
                  </option>
                  <option value="step_9b_mentor_offboarded">
                    Step 9 - Mentor Offboarded
                  </option>
                </select>
              </div>

              <div className="recruitment-inputs">
                {/* -------------------- MULTIPLE CHOICE SESSIONS ------------- */}
                <label htmlFor="session">Session</label>
                <select
                  id="session"
                  name="session"
                  onChange={handleChange}
                  multiple
                  size={3}
                >
                  <option value="">-- Select a session --</option>
                  {sessions.map((session) => (
                    <option key={session.id} value={session.id}>
                      {session.session_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="recruitment-inputs">
                {/* -------------------- PAYMENT TYPE DROP DOWN BOX ------------- */}
                <label htmlFor="payment_type">Payment Type</label>
                <select
                  id="payment_type"
                  name="payment_type"
                  value={mentors.payment_type}
                  onChange={handleChange}
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

export default MentorCreateForm;
