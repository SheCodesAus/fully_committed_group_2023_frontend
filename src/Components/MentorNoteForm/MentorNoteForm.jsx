// (KRISTY) - TO DO
import { useState } from 'react';
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import './MentorNoteForm.css';
import SubmitButton from '../SubmitButton/SubmitButton';


function MentorNoteForm(props) {
    
    // ------- AUTH -------
    const authToken = window.localStorage.getItem("token")
    const [loggedIn] = useOutletContext();
    // ------- STATE -------
    const [mentorNotes, setMentorNotes] = useState({
        "body": "",
        "notes_type": null,
        "mentor": null
    });
    // ------- HOOKS -------
    const { mentorData } = props;
    const navigate = useNavigate();
    // ------- ACTIONS & EFFECTS -------
    const handleChange = (event) => {
        const { id, value } = event.target;
        setMentorNotes((prevMentorNotes) => ({
        ...prevMentorNotes,
        [id]: value,
        mentorNotes: mentorNotes.mentor, 
        }));
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (loggedIn) {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}mentor-notes/`,
                    {
                    method: "post",
                    headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${authToken}`,
                },
                body: JSON.stringify({
                    ...mentorNotes,
                    mentor: mentorData.id // Update mentor field with mentor id
                }),
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
    return (
        <>
        {loggedIn ? 
        <div>
        <form onSubmit={handleSubmit}>
            <h2>Write a note</h2>
            <div>
            <label htmlFor="body">Note </label>
            <input
                type="text"
                id="body"
                placeholder="Enter Note"
                value={mentorNotes.body}
                onChange={handleChange}
            />
            </div>
            <div>
                {/* -------------------- NOTES DOWN BOX ------------- */}
                <label htmlFor="notes_type">Type </label>
                <select id="notes_type" name="notes_type" value={mentorNotes.notes_type} onChange={handleChange}>
                <option value="">--- select type --</option>
                <option value="Feedback">Feedback</option>
                <option value="Case Note">Case Note</option>
                <option value="Lead Mentor Suitability">Lead Mentor Suitability</option>
                </select>
                </div>
                <SubmitButton />
        </form>
        </div>
        : (
        <Link to="/login" className="button-link">
        Login to Comment
        </Link>
        ) }
        </>
    );
}
export default MentorNoteForm