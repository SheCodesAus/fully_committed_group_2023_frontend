// (KAT) - TO DO
import { useState } from 'react';
import ProgramName from '../ProgramName/ProgramName.jsx';
import ReactDOMServer from 'react-dom/server';
import './CreateProgramForm.css';

function ProgramForm() {
    const [programFormData, setProgramFormData]= useState({
        program_type: "",
        city: "",
        start_date: "",
        end_date: "",
    });

    function handleChange(event) {
        const { name, value } = event.target;
        let newValue = value;
      
        // If this is the start date input, set the time part to midnight
        if (name === "start_date") {
          newValue = `${newValue.slice(0, 11)}00:00:00`;
        }
      
        // If this is the end date input, set the time part to 23:59:59
        if (name === "end_date") {
          newValue = `${newValue.slice(0, 11)}23:59:59`;
        }
      
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
          program_name: formattedProgramName
        };
      
        fetch(`${import.meta.env.VITE_API_URL}programs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData)
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };

      return (
        <form onSubmit={handleSubmit}>
          <label htmlFor="program_type">Program Type:</label>
          <select value={programFormData.program_type}
            id="program_type" 
            name="program_type"
            onChange={handleChange}
            required>
            <option value="Plus">Plus</option>
            <option value="Sydney">Flash</option>
            <option value="Workshop">Workshop</option>
         </select>
      
          <label htmlFor="city">Location:</label>
          <select value={programFormData.city} id="city" name="city" onChange={handleChange} required>
          <option value="Perth">Perth</option>
          <option value="Sydney">Sydney</option>
          <option value="Brisbane">Brisbane</option>
        </select>
          
        <label htmlFor="start_date">Start Date:</label>
        <input type="datetime-local"
        id="start_date"
        name="start_date"
        value={programFormData.start_date}
        onChange={handleChange}
        step="1"
        required
        />

        <label htmlFor="end_date">End Date:</label>
        <input
        type="datetime-local"
        id="end_date"
        name="end_date"
        value={programFormData.end_date}
        onChange={handleChange}
        step="1"
        required
        />

      
          <button type="submit">Create Program</button>
        </form>
      );

}

export default ProgramForm;