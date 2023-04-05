// (KRISTY) - TO DO

// RENDERED ON SESSIONCREATIONPAGE.JSX

import { useState, useEffect } from 'react';
import { useNavigate, useOutletContext, Link } from "react-router-dom";

import './SessionForm.css';
import SubmitButton from '../SubmitButton/SubmitButton';

function SessionForm() {

    // ------- AUTH -------
    const authToken = window.localStorage.getItem("token")
    const [loggedIn] = useOutletContext();

    // Check if the user is a super-user with edit/create abilities
    const isAdmin = () => {
        return user.is_superuser === true;
    };

    // ------- HOOKS -------
    const navigate = useNavigate();

    // ------- STATE -------    
    const [sessions, setSessions] = useState({
        // from JSON Raw Body in Deployed (default values)
        session_name: '',
        start_date: '',
        end_date: '',
        city: '',
        module_type: '',
        program: '',
        mentors_required: ''
    });

    // ------- ACTIONS & EFFECTS -------

    const handleChange = (event) => {
        const { id, value } = event.target;
        setSessions((prevSessions) => ({
        ...prevSessions,
        [id]: value,
        }));
    };
    // copies the original data, replaces the old data for each id/value pair to what is input in the form (changes state). this will be submitted to API below. 

    const handleSubmit = async (event) => {
        event.preventDefault();
    // submit the new data (state change) from handleChange.
        // POST: moved from separate function to be embedded and actioned when the submit button is pressed. 

        if (isAdmin) {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}sessions/`,
                    {
                    method: 'POST',
                    headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${authToken}`,
                },
                body: JSON.stringify(sessions),
                }
                );
                if (!response.ok) {
                    throw new Error(await response.text());
                }
                location.reload();
            } catch (err) {
                console.error(err);
                alert(`Error: ${err.message}`);
            }
        } else {
        // redirect to login page
        navigate(`/login`);
        }
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

    // Get program data for drop down
    const [programs, setPrograms] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}programs/`)
            .then(response => response.json())
            .then(data => setPrograms(data))
            .catch(error => console.error(error));
        }, []);


    return (
        <>
            {isAdmin && loggedIn ? 
                <div>
                <form onSubmit={handleSubmit}>
                <h2>Create a session</h2>
                    <div>
                    <label htmlFor="session_name">Session Name:</label>
                    <input
                        type="text"
                        id="session_name"
                        placeholder="Enter session name"
                        name="session_name"
                        value={sessions.session_name}
                        onChange={handleChange}
                    />

                    </div>
                    <div>
                    <label htmlFor="start_date">Session Start:</label>
                    <input
                        type="datetime-local"
                        id="start_date"
                        placeholder="Select Start Date and Time"
                        name="start_date"
                        value={sessions.start_date}
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
                        value={sessions.end_date}
                        onChange={handleChange}
                    />
                    </div>
                    <div>
                        <label htmlFor="city">City:</label>
                        <select id="city" name="city" value={sessions.city} onChange={handleChange}>
                        <option value="">-- Select a city --</option>
                        <option value="Brisbane">Brisbane</option>
                        <option value="Sydney">Sydney</option>
                        <option value="Perth">Perth</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="module_type">Module Type:</label>
                        <select id="module_type" name="module_type" value={sessions.module_type} onChange={handleChange}>
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

                    {/* Single choice option from a model */}
                    <div>
                        <label htmlFor="program">Choose a program:</label>
                        <select id="program" name="program" onChange={handleChange}>
                            <option value="">-- Select a program --</option>
                            {programs.map(program => (
                            <option key={program.id} value={program.id}>
                                {program.program_name} ({program.city}, {program.program_type})
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
                        value={sessions.mentors_required}
                        onChange={handleChange}
                    />
                    </div>
                <SubmitButton />
                </form>
                </div>

            : (
                <Link to="/login" className="button-link">
                You must be an admin to create a session
                </Link>
                
            ) }
        </>
    );
}

export default SessionForm;