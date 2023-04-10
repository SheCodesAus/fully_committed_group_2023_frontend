// (KAT) - STARTED

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ProgressBar from "../Components/ProgressBar/ProgressBar";
import PageContent from "../Components/PageContent/PageContent";
import EditButton from "../Components/EditButton/EditButton";
import "./ProgramDetailPage.css";
import { getModuleType } from "../utils";
import FormatDate from "../Components/DateTime/FormatDate";
import FormatTime from "../Components/DateTime/FormatTime";


function ProgramDetailPage() {
  const { id } = useParams();
  const [programData, setProgramData] = useState({
    program_name: "",
    start_date: "",
    end_date: "",
    city: "",
    program_type: "",
    mentors_required: "",
    mentors_assigned: "",
    sessions: [],
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}programs/${id}`
        );
        const data = await response.json();
        setProgramData(data);
        // console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [id]);

  const sectionHeaders = [
    ["Program Details"],
    ["Mentor Allocation"],
    ["Sessions"],
  ];

  const tableHeaders = [
    [""],
    [""],
    ["Module", "Date", "From", "To", "Mentors Assigned"],
  ];

  const program_name = programData.program_name;

  const firstTableData = {
    program_type: programData.program_type,
    city: programData.city,
    start_date: programData.start_date,
    end_date: programData.end_date,
  };

  const secondTableData = {
    mentors_required: programData.mentors_required,
    mentors_assigned: programData.mentors_assigned,
  };

  const formattedSessions = programData.sessions.map((session) => {
    const startDate = new Date(session.start_date);
    const endDate = new Date(session.end_date);

    return {
      date: FormatDate(startDate),
      // session: session.session_name,
      startTime: FormatTime(startDate),
      endTime: FormatTime(endDate),
      module: getModuleType[session.module_type],
      id: session.id,
      mentorsRequired: session.mentors_required,
      mentorsAssigned: session.mentors_assigned,
    };
  });

  const thirdTableData = {
    sessions: formattedSessions || [],
  };

  console.log("sessions: ", thirdTableData.sessions);
  console.log("sessions as JSON: ", JSON.stringify(thirdTableData.sessions));

  return (
    <>
      <PageContent>
        <div className="page-content-wrapper">
        <h1 className="title-program-name">{`${program_name}`}</h1>

          {/* <h1>{`${program_name}`}</h1> */}

          {sectionHeaders.map(([header], index) => (
            <React.Fragment key={index}>
              <h2 className="section-header">{header || " "}</h2>
              <div className="program-information-container">
                <table className="program-information-container-table">
                  <thead>
                    <tr>
                      {tableHeaders[index].map((header, idx) => (
                        <th key={idx}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* --------------------- PROGRAM DETAILS --------------------- */}
                    {index === 0 && (
                      <>
                        <tr>
                          <td className="label">
                            <strong>Program</strong>{" "}
                          </td>
                          <td className="input">{firstTableData.program_type}</td>
                          <td className="label">
                            <strong>Location</strong>
                          </td>
                          <td className="input">{firstTableData.city}</td>
                        </tr>
                        <tr>
                          <td className="label">
                            <strong>Start Date</strong>
                          </td>
                          <td className="input">
                            {new Date(
                              firstTableData.start_date
                            ).toLocaleDateString("en-AU", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </td>
                          <td className="label">
                            <strong>End Date</strong>
                          </td>
                          <td className="input">
                            {new Date(
                              firstTableData.end_date
                            ).toLocaleDateString("en-AU", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </td>
                        </tr>
                      </>
                    )}
                    {/* ---------------------- PROGRESS BAR ---------------------- */}
                    {index === 1 && (
                      <>
                        <tr>
                          <td colSpan={tableHeaders[index].length}>
                            {secondTableData ? (
                              <div className="progress-bar-container">
                                <div className="progress-bar">
                                  <ProgressBar
                                    completed={
                                      secondTableData.mentors_required > 0
                                        ? Math.ceil(
                                            (secondTableData.mentors_assigned /
                                              secondTableData.mentors_required) *
                                              100
                                          )
                                        : 0
                                    }
                                  />
                                </div>
                              </div>
                            ) : null}
                          </td>
                        </tr>
                      </>
                    )}
                    {/* ------------------------ SESSIONS ------------------------ */}
                    {index === 2 && (
                      <>
                        {thirdTableData.sessions.map(
                          (session, sessionIndex) => (
                            <tr key={sessionIndex}>
                              <td>{session.module}</td>

                              <td>
                                {
                                  <Link to={`/sessions/${session.id}`}>
                                    {FormatDate(session.date)}
                                  </Link>
                                }
                              </td>
                              {/* <td>{session.session_name}</td> */}
                              <td>{session.startTime}</td>
                              <td>{session.endTime}</td>
                              <td>
                              {secondTableData.mentors_assigned} /
                                              {secondTableData.mentors_required}
                                            
                              </td>
                            </tr>
                          )
                        )}
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
              to={`https://fully-committed-mentor-scheduling-tool.fly.dev/admin/programs/program/${id}/change/`}
              style={{ textDecoration: "none", color: "white" }}
            >
              Edit
            </Link>
          </button>
      </PageContent>
    </>
  );
}
export default ProgramDetailPage;
