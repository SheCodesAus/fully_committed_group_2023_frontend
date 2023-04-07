// (KRISTY) - DONE

// RENDERED ON SESSIONCREATIONPAGE.JSX

import ReactDOMServer from "react-dom/server";

import { useState, useEffect } from "react";
import { useNavigate, useOutletContext, Link } from "react-router-dom";

import "./SessionForm.css";
import PageContent from "../PageContent/PageContent.jsx";
import SubmitButton from "../SubmitButton/SubmitButton";
import SessionName from "../SessionName/SessionName";

function SessionForm() {
  // ------- AUTH -------
  const authToken = window.localStorage.getItem("token");
  const [loggedIn] = useOutletContext();

  // ------- HOOKS -------
  const navigate = useNavigate();

  // ------- STATE -------
  const [session, setSession] = useState({
    // from JSON Raw Body in Deployed (default values)
    session_name: "",
    start_date: "",
    end_date: "",
    city: "",
    module_type: "",
    program: "",
    mentors_required: "",
  });

  // ------- ACTIONS & EFFECTS -------

  const handleChange = (event) => {
    const { id, value } = event.target;
    setSession((prevSessions) => ({
      ...prevSessions,
      [id]: value,
    }));
  };
  // copies the original data, replaces the old data for each id/value pair to what is input in the form (changes state). this will be submitted to API below.

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if user is admin
    if (!loggedIn) {
      // Redirect to login page
      navigate(`/login`);
      return;
    }

    // Fetch program data for the selected program
    const programResponse = await fetch(
      `${import.meta.env.VITE_API_URL}programs/${session.program}/`
    );
    const programData = await programResponse.json();

    // Format session name using SessionName component
    const formattedSessionName = ReactDOMServer.renderToString(
      <SessionName
        module_type={session.module_type}
        city={session.city}
        start_date={session.start_date}
        end_date={session.end_date}
        program={programData}
        program_type={programData.program_type}
      />
    );

    // ---------- POST session data to API -------
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}sessions/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${authToken}`,
        },
        body: JSON.stringify({
          session_name: formattedSessionName,
          start_date: session.start_date,
          end_date: session.end_date,
          city: session.city,
          module_type: session.module_type,
          program: session.program,
          mentors_required: session.mentors_required,
        }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      location.reload();
    } catch (error) {
      console.error(error);
      alert(`Error: ${error.message}`);
    }
    // navigate(`/session/${}`)
  };

  /* 
    If authtoken exists (if logged in) --> 
        --> TRY to POST the data to deployed, using fetch 
        --> Send the token with it to auth the ability to post
        --> wait for the response 
        --> if successful, return the JSON payload and reload the page with the data --> 
        --> if not successful, CATCH the error and display as a pop up alert
        --> if not logged in, redirect to login page
    */

  // -----------Get program data for drop down
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}programs/`)
      .then((response) => response.json())
      .then((data) => setPrograms(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <PageContent>
      <>
        {loggedIn ? (
          <div>
            <form onSubmit={handleSubmit}>
              <h2>Create a session</h2>

              <div>
                {/* -------------------- SESSION TIMES ------------- */}
                <label htmlFor="start_date">Session Start:</label>
                <input
                  type="datetime-local"
                  id="start_date"
                  placeholder="Select Start Date and Time"
                  name="start_date"
                  value={session.start_date}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="end_date">Session End:</label>
                <input
                  type="datetime-local"
                  id="end_date"
                  placeholder="Select End Date and Time"
                  name="end_date"
                  value={session.end_date}
                  onChange={handleChange}
                />
              </div>
              <div>
                {/* -------------------- CITY DROP DOWN BOX ------------- */}
                <label htmlFor="city">City:</label>
                <select
                  id="city"
                  name="city"
                  value={session.city}
                  onChange={handleChange}
                >
                  <option value="">-- Select a city --</option>
                  <option value="Brisbane">Brisbane</option>
                  <option value="Sydney">Sydney</option>
                  <option value="Perth">Perth</option>
                </select>
              </div>
              <div>
                {/* -------------------- MODULE DROP DOWN BOX ------------- */}
                <label htmlFor="module_type">Module Type:</label>
                <select
                  id="module_type"
                  name="module_type"
                  value={session.module_type}
                  onChange={handleChange}
                >
                  <option value="">-- Select a module type --</option>
                  <option value="html_css">HTML/CSS</option>
                  <option value="python">Python</option>
                  <option value="javascript_react">JavaScript/React</option>
                  <option value="django">Django</option>
                  <option value="drf">DRF</option>
                  <option value="group">Group</option>
                  <option value="one_day_workshop">One Day Workshop</option>
                  <option value="n/a">Not Applicable</option>
                </select>
              </div>

              <div>
                {/* -------------------- SINGLE CHOICE PROGRAMS ------------- */}
                <label htmlFor="program">Choose a program:</label>
                <select id="program" name="program" onChange={handleChange}>
                  <option value="">-- Select a program --</option>
                  {programs.map((program) => (
                    <option key={program.id} value={program.id}>
                      {program.program_name} ({program.city},{" "}
                      {program.program_type})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="mentors_required">Mentors Required:</label>
                <input
                  type="number"
                  id="mentors_required"
                  placeholder="Enter the number of mentors required"
                  name="mentors_required"
                  value={session.mentors_required}
                  onChange={handleChange}
                />
              </div>
              <SubmitButton />
            </form>
          </div>
        ) : (
          <Link to="/login" className="button-link">
            You must be an admin to create a session
          </Link>
        )}
      </>
    </PageContent>
  );
}

export default SessionForm;
