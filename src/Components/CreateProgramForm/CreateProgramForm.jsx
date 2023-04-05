// (KAT) - TO DO
import { useState } from 'react';
import DatePicker from 'react-date-picker';
import ReactDOMServer from 'react-dom/server';

import ProgramName from '../ProgramName/ProgramName.jsx';
import './CreateProgramForm.css';
import 'react-date-picker/dist/DatePicker.css';
import PageContent from '../PageContent/PageContent.jsx';

function ProgramForm() {
    const [programFormData, setProgramFormData]= useState({
        program_type: "",
        city: "",
        start_date: "",
        end_date: "",
    });

    function handleChange(name, value) {
        let newValue = value;
      
        // If this is the start date input, set the time part to midnight
        if (name === "start_date") {
          const date = new Date(value);
          date.setHours(0, 0, 0, 0);
          newValue = date;
        }
      
        // If this is the end date input, set the time part to 23:59:59
        if (name === "end_date") {
          const date = new Date(value);
          date.setHours(23, 59, 59, 999);
          newValue = date;
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
      <PageContent>  
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
                    
            <DatePicker
            id="start_date"
            name="start_date"
            selected={programFormData.start_date}
            onChange={(date) => handleChange("start_date", date)}
            dateFormat="dd/MM/yyyy"
            required
            />

            <DatePicker
            id="end_date"
            name="end_date"
            selected={programFormData.end_date}
            onChange={(date) => handleChange("end_date", date)}
            dateFormat="dd/MM/yyyy"
            required
            />
      
          <button type="submit">Create Program</button>
        </form>
      </PageContent>);

}

export default ProgramForm;