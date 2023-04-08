// (WEN & KRISTY) - DONE

// NICE TO HAVES
// Redo step value

import { useState, useEffect, Component } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import PageContent from "../Components/PageContent/PageContent";
import ProgressBar from "../Components/ProgressBar/ProgressBar";
import EditButton from "../Components/EditButton/EditButton";
import ToggleButtonReadOnly from "../Components/ToggleButton/ToggleButtonReadOnly";
import "./SessionDetailPage.css";
import { currentStepMapping } from "../utils";
import { getModuleType } from "../utils";

function SessionDetailPage() {
  const { id } = useParams();
  const [sessionData, setSessionData] = useState(null);
  const [programData, setProgramData] = useState(null);

  useEffect(() => {
    const fetchSessionDetail = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}sessions/${id}`
      );
      const data = await response.json();

      setSessionData(data);
    };

    fetchSessionDetail();
  }, [id]);

  // For Session Details: Retrieving the program name
  useEffect(() => {
    if (sessionData == null) return;
    const fetchProgramData = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}programs/${sessionData.program}`
      );
      const data = await response.json();

      setProgramData(data);
    };

    fetchProgramData();
  }, [sessionData]);

  // For Mentor Allocation: Table headings for list of mentors
  const tableHeaders = ["Name", "Type", "Active", "Current Step"];

  // For Mentor Allocation: Generating the value for mentor type
  const getMentorType = ({ lead_mentor, industry_mentor, junior_mentor }) => {
    if (junior_mentor) return "Junior";
    if (industry_mentor) return "Industry";
    if (lead_mentor) return "Lead";
  };
  // May need to revisit this logic if we do the lead must be industry mentor thing
  return (
    <>

      <PageContent>
        <div className="login"></div>
        {sessionData && programData && (
          <>
            <div>
                    {sessionData && programData && (
              <h1 className="heading-color">{sessionData.session_name}</h1>
      )}
              <h2 className="section-header">Session Details</h2>

              <div className="container-session-details">
                <table className="session-table">
                  <tbody className="session-details-table mentor-table">
                    <tr>
                      <td className="label">
                        <strong className="sub-header">Program </strong>{" "}
                      </td>
                      <td className="input">
                        <Link to={`/programs/${programData.id}`}>
                          {programData?.program_name}
                        </Link>{" "}
                      </td>
                    </tr>
                    <tr>
                      <td className="label">
                        <strong className="sub-header">Location </strong>
                      </td>
                      <td className="input"> {sessionData.city}</td>
                      <td className="separator"></td>
                      <td className="label">
                        <strong className="sub-header">Module </strong>
                      </td>
                      <td className="input"> {getModuleType[sessionData.module_type]}</td>
                    </tr>
                    <tr>
                      <td className="label">
                        <strong className="sub-header">Date </strong>
                      </td>
                      <td className="input">
                        {" "}
                        {new Date(sessionData.start_date).toLocaleDateString()}
                      </td>
                      <td className="separator"></td>
                      <td className="label">
                        <strong className="sub-header">Time </strong>
                      </td>
                      <td className="input">
                        {" "}
                        {new Date(
                          sessionData.start_date
                        ).toLocaleTimeString()}{" "}
                        - {new Date(sessionData.end_date).toLocaleTimeString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* <div>
                        <div>
                            <span>Program </span> 
                            <span>{programData?.program_name}</span>
                        </div>
                        <div>
                            <span>Location </span>
                            <span>{sessionData.city}</span>
                        </div>
                        <div>
                            <span>Module </span>
                            <span>{sessionData.module_type}</span>
                        </div>
                        <div>
                            <span>Start Date </span>
                            <span> {new Date(sessionData.start_date).toLocaleDateString()}</span>
                            <span>Start Time </span>
                            <span> {new Date(sessionData.start_date).toLocaleTimeString()}</span> */}
              {/* <span>End Date </span>
                            <span>{new Date(sessionData.end_date).toLocaleDateString()}</span> */}
              {/* <span>End Time </span>
                            <span> {new Date(sessionData.end_date).toLocaleTimeString()}</span>
                        </div>
                        <div>
                            <span>End Date </span>
                            <span> {sessionData.end_date}</span>
                            {/* Extracted Date and time */}
              {/* </div> */}
              {/* </div> */}
            </div>

            {/* MENTOR ALLOCATION SECTION */}

            <div>
              <h2 className="section-header">Mentor Allocation</h2>
            </div>

            {/* Progress bar summary */}

            <div>
              {/* <span>Total Mentors Assigned</span> */}

              <ProgressBar
                completed={
                  sessionData.mentors_required > 0
                    ? Math.ceil(
                        (sessionData.mentors_assigned /
                          sessionData.mentors_required) *
                          100
                      )
                    : 0
                }
              ></ProgressBar>

              <span>
                {" "}
                {sessionData.mentors_assigned} / {sessionData.mentors_required}{" "}
              </span>
            </div>

            {/* Table of mentors assigned */}

            {sessionData.mentors.length > 0 && (
              <div className="container-mentor-details">
                <table>
                  <thead>
                    <tr>
                      {tableHeaders.map((header) => (
                        <th key={header}>{header}</th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="mentor-table">
                    {sessionData.mentors.map((mentor) => (
                      <tr key={mentor.id}>
                        <td>
                          <Link to={`/mentors/${mentor.id}`}>
                            {mentor.first_name} {mentor.last_name}
                          </Link>
                        </td>
                        <td>{getMentorType(mentor)}</td>
                        <td><ToggleButtonReadOnly value={mentor.is_active} readOnly={true}
                          ></ToggleButtonReadOnly>
                        </td>
                        <td>{currentStepMapping[mentor.current_step]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
        <button type="button" className="edit-button">
          <Link
            to={`https://fully-committed-mentor-scheduling-tool.fly.dev/admin/sess/session/${id}/change/`}
            style={{ textDecoration: "none", color: "white" }}
          >
            Edit
          </Link>
        </button>
      </PageContent>
    </>
  );
}

export default SessionDetailPage;
