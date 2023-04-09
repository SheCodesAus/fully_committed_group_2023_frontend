// KAT - DONE EXCEPT FOR AUTH TROUBLESHOOTING, SHOULD BE SAFE TO STYLE. 
// User will have to enter a start and end time as well as dates at this point, trying to take it out/automate the times caused issues. Backend requires datetime format.

// Kristy Edited: fixed auth, repaired non JSON return for program name, added "Select" option for drop down boxes - REACT needs it or doesn't recognise there is a change in field


import { useState } from 'react';
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import ProgramName from '../ProgramName/ProgramName.jsx';
import ReactDOMServer from 'react-dom/server';
import PageContent from  '../PageContent/PageContent.jsx';
import SubmitButton from '../SubmitButton/SubmitButton';
import './CreateProgramForm.css';

function ProgramForm() {

      // ------- AUTH -------
    const authToken = window.localStorage.getItem("token")
    const [loggedIn] = useOutletContext();

      // ------- HOOKS -------
    const navigate = useNavigate();


    const [programFormData, setProgramFormData]= useState({
        program_type: "",
        city: "",
        start_date: "",
        end_date: "",
    });

    function handleChange(event) {
        const { name, value } = event.target;
        let newValue = value;
        
        setProgramFormData((prevData) => ({ ...prevData, [name]: newValue }));
    }      
        

    function getProgramName(program) {
        return ReactDOMServer.renderToString(
        <ProgramName
            program_type={program.program_type}
            city={program.city}
            start_date={program.start_date}
            end_date={program.end_date}
        />
        );
    }

    function handleSubmit(event) {
        event.preventDefault();

        const formattedProgramName = getProgramName(programFormData);
    
        const postData = {
        program_type: programFormData.program_type,
        city: programFormData.city,
        start_date: programFormData.start_date,
        end_date: programFormData.end_date,
        program_name: formattedProgramName,
        };
        fetch(`${import.meta.env.VITE_API_URL}programs/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${authToken}`,
        },
        body: JSON.stringify(postData)
        })
        .then(response => {
            console.log("response:", response.status);
            return response.json();
        })
        .then(data => {
          console.log('Success:', data);
          navigate(`/programs/${data.id}`);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };

    return (
      <PageContent>
        <>
      <div className='program-form'>
      <h1>New Program</h1>
        <form onSubmit={handleSubmit} id='program-form'>
        <div className='program-inputs'>
        <label htmlFor="program_type">Program Type</label>
        <select value={programFormData.program_type}
            id="program_type" 
            name="program_type"
            onChange={handleChange}
            required>
            <option value="">-- Select a program type --</option>
            <option value="Plus">Plus</option>
            <option value="Sydney">Flash</option>
            <option value="Workshop">One Day Workshop</option>
        </select>
        <label htmlFor="city">Location</label>
        <select value={programFormData.city} id="city" name="city" onChange={handleChange} required>
        <option value="">-- Select a location --</option>
        <option value="Perth">Perth</option>
        <option value="Sydney">Sydney</option>
        <option value="Brisbane">Brisbane</option>
        </select>
        </div>
        <div className='program-dates'>
        <label htmlFor="start_date">Start Date</label>
        <input type="date"
        id="start_date"
        name="start_date"
        value={programFormData.start_date}
        onChange={handleChange}
        required
        />

        <label htmlFor="end_date">End Date</label>
        <input
        type="date"
        id="end_date"
        name="end_date"
        value={programFormData.end_date}
        onChange={handleChange}
        required
        />
        </div>

        {/* <button type="submit">Create Program</button> */}
        <SubmitButton />
        </form>
        </div>
        </>
        </PageContent>
    );

}

export default ProgramForm;