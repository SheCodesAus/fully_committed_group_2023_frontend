// (KAT) - STARTED

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ProgressBar from "../Components/ProgressBar/ProgressBar";
import PageContent from "../Components/PageContent/PageContent";
import "./ProgramDetailPage.css";
import EditButton from "../Components/EditButton/EditButton"

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
        const response = await fetch(`${import.meta.env.VITE_API_URL}programs/${id}`);
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
    ["MENTORS ASSIGNED - PROGRAM"],
    ["MENTORS"],
    ["SESSIONS"],
    ["NOTES"],
  ];

  const tableHeaders = [
    [""],
    [""],
    ["Date", "Module", "Start Time", "End Time", "Mentors Assigned"],
    [""],
  ];

  const program_name = programData.program_name;

  const firstTableData = {
    program_type: programData.program_type,
    city: programData.city,
    start_date: programData.start_date,
    end_date: programData.end_date,
  };

  const secondTableData = {};

  const thirdTableData = {};

  const fourthTableData = {};

  const fifthTableData = {};

  return (
    <>
      <h1 className="title-program-name">{`${program_name}`}</h1>

      <PageContent>
        <div className="page-content-wrapper">
          {sectionHeaders.map(([header], index) => (
            <React.Fragment key={index}>
              <h2 className="section-header">{header || " "}</h2>
              <div className="program-information-container">
                <table>
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
                          <td className="input">{`She Codes ${programData.program_type} Program`}</td>
                        </tr>
                        <tr>
                          <td className="label">
                            <strong>Location</strong>
                          </td>
                          <td className="input">{programData.city}</td>
                        </tr>
                        <tr>
                          <td className="label">
                            <strong>Start Date</strong>
                          </td>
                          <td className="input">{programData.start_date}</td>
                          <td className="label">
                            <strong>End Date</strong>
                          </td>
                          <td className="input">{programData.end_date}</td>
                        </tr>
                      </>
                    )}
                    {/* ---------------------- PROGRESS BAR ---------------------- */}
                    {index === 1 && (
                      <>
                        {programData ? (
                          <div className="progress-bar-container">
                            <div className="progress-bar">
                              <ProgressBar
                                completed={
                                  programData.mentors_required > 0
                                    ? Math.ceil(
                                        (programData.mentors_assigned /
                                          programData.mentors_required) *
                                          100
                                      )
                                    : 0
                                }
                              />
                            </div>
                          </div>
                        ) : null}
                        <tr>
                          <td colSpan={tableHeaders[index].length}></td>
                        </tr>
                      </>
                    )}

                    {/* ------------------------ MENTORS ------------------------ */}
                    {index === 2 && (
                      <>
                        <tr>
                          <td></td>
                        </tr>
                      </>
                    )}
                    {/* ------------------------ SESSIONS ------------------------ */}
                    {index === 3 && (
                      <>
                        <tr>
                          <td></td>
                        </tr>
                      </>
                    )}

                    {/* ------------------------ NOTES ------------------------ */}
                    {index === 4 && (
                      <>
                        <tr>
                          <td></td>
                        </tr>
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
