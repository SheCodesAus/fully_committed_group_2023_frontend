import FormatDate from "../DateTime/FormatDate";

// Kristy Edited - <span> tags were sending as JSON to the database. Had to remove

function ProgramName(props) {
    const {program_type, city, start_date, end_date, ...other} = props;
    const formattedStartDate = FormatDate(start_date);
    const formattedEndDate = FormatDate(end_date);

    return (

    `${program_type} - ${city} - ${formattedStartDate} - ${formattedEndDate}`

    )
}

export default ProgramName;