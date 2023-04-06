// (KAT) - STARTED

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function MentorDetailPage() {
  const { id } = useParams();
  const [mentorData, setMentorData] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}mentors/${id}`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setMentorData(data);
      });
  }, [id]);

  const tableHeaders = [
    ["Table 1 Header 1", "Table 1 Header 2", "Table 1 Header 3"],
    ["Table 2 Header 1", "Table 2 Header 2", "Table 2 Header 3", "Table 2 Header 4"]
  ];
  return (
    <div className="page-content-wrapper">
      <h1>`${first_name} ${last_name}`</h1>
  
      {tableHeaders.map((headers, index) => (
        <table key={index}>
          <thead>
            <tr>
              {headers.map(header => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
  
          <tbody>
            {/* Render table rows here */}
          </tbody>
        </table>
      ))}
    </div>
  );
  
} 
  export default MentorDetailPage;

// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// function SessionListPage() {
//     const [programData, setProgramData] = useState(null);

//     useEffect(() => {
//         const fetchProgramList = async () => {
//             const response = await fetch(`${import.meta.env.VITE_API_URL}programs`)
//             const data = await response.json();
            
//             setProgramData(data);
//         }
//         fetchProgramList();
//     }, []);

//     const annotatedSessionData = programData?.flatMap(({ program_type, program_name, sessions }) => {
//         return sessions.map((session) => ({ ...session, program_type, program_name }))
//     })
    
//     const tableHeaders = ["Session", "Date", "Program Name", "Program Type", "Module", "Location", "Mentors"];

//     return (
//         <div className="page-content-wrapper">
//         <h1>SESSIONS</h1>

//         <table>
//             <thead>
//                 <tr>
//                     {tableHeaders.map(header => (
//                         <th key={header}>{header}</th>
//                     ))}
//                 </tr>
//             </thead>

//             <tbody>
//                 {annotatedSessionData?.map(session => (
//                     <tr key={session.id}> 
//                         <td><Link to={`/sessions/${session.id}`}>{session.session_name}</Link></td>
//                         <td>{new Date(session.start_date).toLocaleDateString('en-AU', {day: 'numeric', month: 'short', year: '2-digit'})}</td>
//                         <td><Link to={`/programs/${session.program}`}>{session.program_name}</Link></td>
//                         <td>{session.program_type}</td>
//                         <td>{session.module_type}</td>
//                         <td>{session.city}</td>
//                         <td>{session.mentors_assigned}/{session.mentors_required} allocated</td>
//                         {/* TODO: Replace above line with progress bar */}
//                     </tr>))}
//             </tbody>

//         </table>

//         </div>



//     )
// }

// export default SessionListPage;






