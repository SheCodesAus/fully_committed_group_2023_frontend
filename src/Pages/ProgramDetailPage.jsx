// (KAT) - STARTED

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProgressBar from "../Components/ProgressBar/ProgressBar";
import ToggleButton from "../Components/ToggleButton/ToggleButton";
import PageContent from "../Components/PageContent/PageContent";

// import { allPrograms } from "../programdata";

function ProgramDetailPage() {
  const { id } = useParams();
  const [programData, setProgramData] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}programs/${id}`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setProgramData(data);
      });
  }, [id]);

  return (
    <PageContent>
      {programData ? (
        // <div>
        <div>
          <h2>{`${programData.program_name}`}</h2>
          <p key="program-type">{`Program Type: ${programData.program_type}`}</p>
          <p key="program-city">{`Program City: ${programData.program_city}`}</p>
          <p key="start-date">{`Start Date: ${programData.start_date}`}</p>
          <p key="end-date">{`End Date: ${programData.end_date}`}</p>
          <p key="mentors-required">{`Mentors Required: ${programData.mentors_required}`}</p>
          <p key="mentors-assigned">{`Mentors Assigned: ${programData.mentors_assigned}`}</p>
          <div>
            <ToggleButton />
          </div>
          <ProgressBar
            completed={
              programData.mentors_required > 0
                ? (programData.mentors_assigned /
                    programData.mentors_required) *
                  100
                : 0
            }
          ></ProgressBar>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </PageContent>
  );
}
export default ProgramDetailPage;
