// (KAT) - STARTED

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ProgressBar from "../Components/ProgressBar/ProgressBar";
import PageContent from "../Components/PageContent/PageContent";
import EditButton from "../Components/EditButton/EditButton";
import "./ProgramDetailPage.css";
// import { allPrograms } from "../programdata";

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
    ["PROGRAM DETAILS"],
    ["MENTORS SUMMARY"],
    ["SESSIONS"],
  ];

  const tableHeaders = [
    [""],
    [""],
    ["Date", "Module", "Start Time", "End Time", "Mentors Assigned"],
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
      date: startDate.toLocaleDateString(),
      startTime: startDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      endTime: endDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      module: session.module_type,
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
      <h1 className="title-program-name">{`${program_name}`}</h1>
      <PageContent>
        <div className="page-content-wrapper">
          {/* <h1>{`${program_name}`}</h1> */}
          <button type="button" className="edit-button">
            <Link
              to={`https://fully-committed-mentor-scheduling-tool.fly.dev/admin/programs/program/${id}/change/`}
              style={{ textDecoration: "none", color: "white" }}
            >
              Edit
            </Link>
          </button>
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
                          <td className="input">{`She Codes ${firstTableData.program_type} Program`}</td>
                        </tr>
                        <tr>
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
                              <td>
                                {
                                  <Link to={`/sessions/${session.id}`}>
                                    {new Date(session.date).toLocaleDateString(
                                      "en-AU",
                                      {
                                        day: "numeric",
                                        month: "short",
                                        year: "2-digit",
                                      }
                                    )}
                                  </Link>
                                }
                              </td>
                              <td>{session.module}</td>
                              <td>{session.startTime}</td>
                              <td>{session.endTime}</td>
                              <td>
                                {
                                  <Link to={`/sessions/${session.id}`}>
                                    =
                                    <ProgressBar
                                      completed={
                                        session.mentorsRequired > 0
                                          ? Math.ceil(
                                              (session.mentorsAssigned /
                                                session.mentorsRequired) *
                                                100
                                            )
                                          : 0
                                      }
                                    />
                                  </Link>
                                }
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
      </PageContent>
    </>
  );
}
export default ProgramDetailPage;
