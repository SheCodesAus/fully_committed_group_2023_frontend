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
      city: '',
      current_step: '',
      payment_type: '',
      notes: '',
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

  function formattedString(str) {
    return str.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  }
  

  const sectionHeaders = [
    ["Personal Information"],
    ["Skills"],
    [""],
    [""],
    [""],
    // ["Sessions"],
    // ["Notes"]
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
    step: {
      label: "Onboarding Stage",
      value: formattedString(mentorData.current_step),
    },
  };
    const fourthTableData = {
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

  const fifthTableData = {
    payment_type: {
      label: "Payment Type",
      value: mentorData.payment_type,
    },

    is_active: {
      label: "Is Active",
      value: mentorData.is_active,
    }
  };

  // const sessionNames = mentorData.sessions.map(session => session.session_name)

  // const sixthTableData= {
  //   session: {
  //     label: "Sessions",
  //     value: mentorData.sessions.map((session) => formattedString(session.session_name)),
  //   },
  // };
  
  // const seventhTableData= {
  //   notes: {
  //     label: "Notes",
  //     value: mentorData.notes,
  //   },
  // };
  
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
        {sectionHeaders.map(([header], index) => (
          <React.Fragment key={index}>
          <h2 className="section-header">{header || " "}</h2>
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
                  {index === 2 && (
                    <>
                    <tr>
                      <td className="label">
                        <strong>{thirdTableData.step.label}</strong>
                      </td> 
                      <td>{thirdTableData.step.value}</td>
                    </tr>
                    </>
                  )}
                {index === 3 &&
                  Object.entries(fourthTableData).map(([key, { label, value }]) => (
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
                  {index === 4 &&
                  Object.entries(fifthTableData).map(([key, { label, value }]) => (
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
                  {/* {index === 5 && (
                    <>
                    <tr>
                      <td className="label">
                        <strong>{sixthTableData.label}</strong>
                      </td> 
                      <td>{sixthTableData.value}</td>
                    </tr>
                    </>
                  )}
                  {index === 6 && (
                    <>
                    <tr>
                      <td className="label">
                        <strong>{seventhTableData.label}</strong>
                      </td> 
                      <td>{seventhTableData.value}</td>
                    </tr>
                    </>
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
  

