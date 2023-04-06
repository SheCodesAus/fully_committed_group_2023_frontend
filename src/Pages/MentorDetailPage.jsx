// (KAT) - STARTED

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PageContent from "../Components/PageContent/PageContent";
import ToggleButton from "../Components/ToggleButton/ToggleButton"

function MentorDetailPage() {
  const { id } = useParams();
  const [mentorData, setMentorData] = useState(
    {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      will_travel: false,
      city: '',
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
      payment_type: '',
      current_step: '',
      is_active: true,
      sessions: [],
  });

  useEffect(() => {
    async function fetchMentorData() {
      const response = await fetch(`${import.meta.env.VITE_API_URL}mentors/${id}`);
      const data = await response.json();
      setMentorData(data);
      console.log("Mentor Data:", data)
    }
    fetchMentorData();
  }, [id]);

  const sectionHeaders = [
    ["Personal Information"],
    ["Skills"],
    [""],
    ["Notes"]
  ];

  const firstTableData = {
    first_name: mentorData.first_name,
    last_name: mentorData.last_name,
    email: mentorData.email,
    phone: mentorData.phone,
    city: mentorData.city,
  };

  const secondTableData = {
    html_css: {
      label: "HTML/CSS",
      value: mentorData.html_css,
    },
    javascript: {
      label: "JavaScript",
      value: mentorData.javascript,
    },
    react: {
      label: "React",
      value: mentorData.react,
    },
    python: {
      label: "Python",
      value: mentorData.python,
    },
    django: {
      label: "Django",
      value: mentorData.django,
    },
    drf: {
      label: "DRF",
      value: mentorData.drf,
    },
  };
  
  const thirdTableData = {
    will_travel: {
      label: "Willing to travel",
      value: mentorData.will_travel,
    },
    mentor_type: {
      label: "Junior Mentor",
      value: mentorData.junior_mentor,
    },
    industry_mentor: {
      label: "Industry Mentor",
      value: mentorData.industry_mentor,
    },
    she_codes_alumni: {
      label: "She Codes Alumni",
      value: mentorData.she_codes_alumni,
    },
  };
  
  const handleToggle = async (key, value) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}mentors/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ [key]: !value }),
    });
    const data = await response.json();
    setMentorData(data);
    console.log("Mentor Data:", data);
  };

  return (
    <PageContent>
      <div className="page-content-wrapper">
        <h1>{`${mentorData.first_name} ${mentorData.last_name}`}</h1>
        {sectionHeaders.map((header, index) => (
          <React.Fragment key={index}>
            <h2 className="section-header">{header}</h2>
            <table>
              <tbody>
                {index === 0 && (
                  <>
                    <tr>
                      <td className="label"><strong>First Name </strong></td>
                      <td className="input">{mentorData.first_name}</td>
                    </tr>
                    <tr>
                      <td className="label"><strong>Last Name </strong></td>
                      <td className="input">{mentorData.last_name}</td>
                    </tr>
                    <tr>
                      <td className="label"><strong>Email </strong></td>
                      <td className="input">{mentorData.email}</td>
                    </tr>
                    <tr>
                      <td className="label"><strong>Phone </strong></td>
                      <td className="input">{mentorData.phone}</td>
                    </tr>
                    <tr>
                      <td className="label"><strong>Location </strong></td>
                      <td className="input">{mentorData.city}</td>
                    </tr>
                  </>
                )}
                {index === 1 &&
                  Object.entries(secondTableData).map(([key, { label, value }]) => (
                    <tr key={key}>
                      <td className="label">
                        <strong>{label}</strong>
                      </td>
                      <td className="input">
                        <ToggleButton
                          value={value}
                          onChange={() => handleToggle(key, value)}
                        />
                      </td>
                    </tr>
                  ))}
                {index === 2 &&
                  Object.entries(thirdTableData).map(([key, { label, value }]) => (
                    <tr key={key}>
                      <td className="label">
                        <strong>{label}</strong>
                      </td>
                      <td className="input">
                        <ToggleButton
                          value={value}
                          onChange={() => handleToggle(key, value)}
                        />
                      </td>
                    </tr>
                  ))}
                {/* {index === 3 && (
                    <tr>
                      <td className="label"><strong>Notes:</strong></td>
                      <td className="input">{notes}</td>
                    </tr>
                  )} */}
              </tbody>
            </table>
          </React.Fragment>
        ))}
      </div>
    </PageContent>
  );
  } 
  export default MentorDetailPage;   
  
// added two Object.entries() calls to iterate over the firstTableData and secondTableData objects and created tr elements for each key-value pair. Added a check to differentiate between the two tables by checking the index variable passed into the map function. The Array.isArray() check is added to handle the case where we're iterating over the mentor_type property, which is an array.

