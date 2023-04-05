// DONE - KAT
// TO USE INSERT: <SessionName {...sessionData} {...programData} />
import FormatDate from "../DateTime/FormatDate";
import FormatTime from "../DateTime/FormatTime";

function SessionName(props) {
    const {program_type, city, start_date, end_date, ...other} = props;
    const formattedStartDate = FormatDate(start_date);
    const formattedTime = FormatTime(start_date);

    return (
        `She Codes ${program_type} Session - ${formattedStartDate}, ${formattedTime} - ${city}`
    )
}

export default SessionName;