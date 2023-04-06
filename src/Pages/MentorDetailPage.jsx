  // (KAT) - STARTED

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PageContent from "../Components/PageContent/PageContent";
import ToggleButtonReadOnly from "../Components/ToggleButton/ToggleButtonReadOnly"

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
    
    const ToggleTableRow = ({ label, value, onChange }) => {
      const handleToggle = (newValue) => {
        console.log("handleToggle:", newValue);
        onChange(newValue);
      };
    
      return (
        <tr>
          <td className="label">
            <strong>{label}</strong>
          </td>
          <td className="input">
            <ToggleButtonReadOnly
              value={value}
              onChange={handleToggle}
              readOnly={true}
            />
          </td>
        </tr>
      );
    };
    
    

    const sectionHeaders = [
      ["Personal Information"],
      ["Skills"],
      ["Other Information"],
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

      payment_type: {
        label: "Payment Type",
        value: formattedString(mentorData.payment_type),
      },
    };
    const fourthTableData = {
      will_travel: {
        label: "Willing to travel",
        value: mentorData.will_travel,
      },
      junior_mentor: {
        label: "Junior Mentor",
        value: mentorData.junior_mentor
      },

      industry_mentor: {
          label: "Industry Mentor",
          value: mentorData.industry_mentor
      },
      she_codes_alumni: {
        label: "She Codes Alumni",
        value: mentorData.she_codes_alumni,
      },
    };    

    const fifthTableData = {
    is_active: {
      label: "Is Active",
      value: mentorData.is_active,
      },
    
    lead_mentor: {
      label: "Is Qualified as Lead Mentor",
      value: mentorData.lead_mentor,
    },
     
    };

    const sessionNames = mentorData.sessions.map(session => session.session_name)

    const sixthTableData= {
      session: {
        label: "Sessions",
        value: mentorData.sessions.map((session) => formattedString(session.session_name)),
      },
    };
    
    const seventhTableData= {
      notes: {
        label: "Notes",
        value: mentorData.notes,
      },
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
                        <td className="label"><strong>City </strong></td>
                        <td className="input">{mentorData.city}</td>
                      </tr>
                    </>
                  )}
                  {index === 1 && (
                    <>
                      {Object.entries(secondTableData).map(([key, value]) => (
                        <ToggleTableRow
                          key={key}
                          label={value.label}
                          value={value.value}
                          onChange={() => handleToggle(key, value.value)}
                        />
                      ))}
                    </>
                  )}
                  {index === 2 && (
                    <>
                      {Object.entries(thirdTableData).map(([key, value]) => (
                        <tr key={key}>
                          <td className="label"><strong>{value.label} </strong></td>
                          <td className="input">{value.value}</td>
                        </tr>
                      ))}
                    </>
                  )}
                  {index === 3 && (
                    <>
                      {Object.entries(fourthTableData).map(([key, value]) => (
                        <ToggleTableRow
                          key={key}
                          label={value.label}
                          value={value.value}
                          onChange={() => handleToggle(key, value.value)}
                        />
                      ))}
                    </>
                  )}
                  {index === 4 && (
                    <>
                      {Object.entries(fifthTableData).map(([key, value]) => (
                        <ToggleTableRow
                          key={key}
                          label={value.label}
                          value={value.value}
                          onChange={() => handleToggle(key, value.value)}
                        />
                      ))}
                    </>
                  )}
                  {index === 5 && (
                    <>
                      <tr>
                        <td className="label"><strong>Sessions </strong></td>
                        <td className="input">{sessionNames.join(", ")}</td>
                      </tr>
                    </>
                  )}
                  {index === 6 && (
                    <>
                      <tr>
                        <td className="label"><strong>Notes </strong></td>
                        <td className="input">{mentorData.notes}</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </React.Fragment>
          ))}
        </div>
      </PageContent>
    );
}
export default MentorDetailPage;