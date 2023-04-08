// (KAT) - STARTED

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import PageContent from "../Components/PageContent/PageContent";
import ToggleButtonReadOnly from "../Components/ToggleButton/ToggleButtonReadOnly";

import MentorNoteCard from "../Components/MentorNoteCard/MentorNotesCard";
import MentorNoteForm from "../Components/MentorNoteForm/MentorNoteForm";
import "./MentorDetailPage.css";

function MentorDetailPage() {
  const { id } = useParams();

  const [mentorData, setMentorData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
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
    city: "",
    current_step: "",
    payment_type: "",
    notes: "",
    is_active: true,
    sessions: [],
  });

  useEffect(() => {
    async function fetchMentorData() {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}mentors/${id}`
      );
      const data = await response.json();
      setMentorData(data);
      console.log("Mentor Data:", data);
    }
    fetchMentorData();
  }, [id]);

  function formattedString(str) {
    return str
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const ToggleTableRow = ({ label, value, onChange }) => {
    const handleToggle = (newValue) => {
      console.log("handleToggle:", newValue);
      onChange(newValue);
    };

    return (
      <div className="tick-table">
        <tr classname="tick-table-item">
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
      </div>
    );
  };

  const sectionHeaders = [
    ["Personal Information"],
    ["Skills"],
    ["Other Information"],
    [""],
    [""],
    ["Session Allocation"],
    ["Notes"],
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
    is_active: {
      label: "Is Active",
      value: mentorData.is_active,
    },

    lead_mentor: {
      label: "Is Qualified as Lead Mentor",
      value: mentorData.lead_mentor,
    },
  };

  const sessionNames = mentorData.sessions.map(
    (session) => session.session_name
  );

  const sixthTableData = {
    session: {
      label: "Sessions",
      value: mentorData.sessions.map((session) => (
        <Link to={`/sessions/${session.id}`}>
          {formattedString(session.session_name)}
        </Link>
      )),
    },
  };

  const seventhTableData = {
    notes: {
      label: "Notes",
      value: mentorData.notes,
    },
  };
  return (
    <>
      <PageContent>
        <div className="page-content-wrapper">
        <h1 className="title-mentor-name">{`${mentorData.first_name} ${mentorData.last_name}`}</h1>

          {sectionHeaders.map(([header], index) => (
            <React.Fragment key={index}>
              <h2 className="section-header">{header || " "}</h2>
              <div className="personal-information-container">
                <table>
                  <tbody className="mentor-detail-table">
                    {index === 0 && (
                      <>
                        <tr>
                          <td className="label">
                            <strong>First Name </strong>
                          </td>
                          <td className="input">{mentorData.first_name}</td>
                        </tr>
                        <tr>
                          <td className="label">
                            <strong>Last Name </strong>
                          </td>
                          <td className="input">{mentorData.last_name}</td>
                        </tr>
                        <tr>
                          <td className="label">
                            <strong>Email </strong>
                          </td>
                          <td className="input">{mentorData.email}</td>
                        </tr>
                        <tr>
                          <td className="label">
                            <strong>Phone </strong>
                          </td>
                          <td className="input">{mentorData.phone}</td>
                        </tr>
                        <tr>
                          <td className="label">
                            <strong>Location </strong>
                          </td>
                          <td className="input">{mentorData.city}</td>
                        </tr>
                      </>
                    )}
                    {index === 1 && (
                      <>
                        {/* ------------------ SKILLS TABLE ------------------ */}
                        <div className="tick-table">
                          {Object.entries(secondTableData).map(
                            ([key, value]) => (
                              <ToggleTableRow
                                key={key}
                                label={value.label}
                                value={value.value}
                                onChange={() => handleToggle(key, value.value)}
                              />
                            )
                          )}
                        </div>
                      </>
                    )}
                    {index === 2 && (
                      <>
                        {/* ------------------ ONBOARDING AND PAYMENT TYPE TABLE ------------------ */}
                        {Object.entries(thirdTableData).map(([key, value]) => (
                          <tr key={key}>
                            <td className="label">
                              <strong>{value.label} </strong>
                            </td>
                            <td className="input">{value.value}</td>
                          </tr>
                        ))}
                      </>
                    )}
                    {index === 3 && (
                      <>
                        <div className="tick-table">
                          {/* ------------------ TRAVEL, JNR MENTOR, INDUSTRY MENTOR, ALUMNI ------------------ */}
                          {Object.entries(fourthTableData).map(
                            ([key, value]) => (
                              <ToggleTableRow
                                key={key}
                                label={value.label}
                                value={value.value}
                                onChange={() => handleToggle(key, value.value)}
                              />
                            )
                          )}
                        </div>
                      </>
                    )}
                    {index === 4 && (
                      <>
                        <div className="tick-table">
                          {/* ------------------ ACTIVE, LEAD MENTOR QUAL ------------------ */}
                          {Object.entries(fifthTableData).map(
                            ([key, value]) => (
                              <ToggleTableRow
                                key={key}
                                label={value.label}
                                value={value.value}
                                onChange={() => handleToggle(key, value.value)}
                              />
                            )
                          )}
                        </div>
                      </>
                    )}
                    {index === 5 && (
                      <>
                        {/* ------------------ SESSIONS ------------------ */}
                        <tr>
                          <td className="input">
                            {sixthTableData.session.value.map(
                              (sessionName, i) => (
                                <React.Fragment key={i}>
                                  {sessionName}
                                  <br />
                                </React.Fragment>
                              )
                            )}
                          </td>
                        </tr>
                      </>
                    )}
                    {index === 6 && (
                      <>
                        {/* ------------------ NOTES ------------------ */}
                        <tr>
                          <td>{mentorData.notes}</td>
                          {(mentorData.mentornotes ?? []).map(
                            (mentorNote, key) => {
                              return (
                                <MentorNoteCard
                                  key={key}
                                  mentorNote={mentorNote}
                                />
                              );
                            }
                          )}
                          <MentorNoteForm mentorData={mentorData} />
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </React.Fragment>
          ))}
        </div>
        <button type="button" className="edit-button">
        <Link
            to={`https://fully-committed-mentor-scheduling-tool.fly.dev/admin/mentors/mentor/${id}/change/`}
            style={{ textDecoration: "none", color: "white" }}
          >
            Edit
          </Link>
        </button>
      </PageContent>
    </>
  );
}
export default MentorDetailPage;
