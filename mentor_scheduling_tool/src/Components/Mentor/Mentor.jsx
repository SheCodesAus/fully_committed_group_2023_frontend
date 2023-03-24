import React, { useState, useEffect }from "react";

    const mentors = [
        {
            id: 1,
            first_name: "Jane",
            last_name: "Doe",
            phone: "0400 000 454",
            email: "jane.doe@gmail.com",
            city: "Perth",
            skills: "HTML",
            will_travel: true,
            is_active: true, 
        },
        {
            id: 2,
            first_name: "Mark",
            last_name: "Smith",
            phone: "0404 333 666",
            email: "mark.smith@hotmail.com",
            city: "Brisbane",
            Skills: "HTML, CSS, JavaScript",
            will_travel: false,
            is_active: true,

        }
    ]


function Mentor() {

    const [mentorData, SetMentorData]= useState([])

    useEffect(()=>{
        SetMentorData(...mentors)
    }, [])

    return (
        <div>
        <mentorData />
        </div>
        )
};

export default Mentor();