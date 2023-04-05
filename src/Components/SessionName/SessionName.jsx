// DONE - KAT
// TO USE INSERT: <SessionName {...sessionData} {...programData} />
import FormatDate from "../DateTime/FormatDate";
import FormatTime from "../DateTime/FormatTime";

function SessionName(props) {
    const {module_type, city, start_date, end_date, ...other} = props;
    const formattedStartDate = FormatDate(start_date);
    const formattedTime = FormatTime(start_date);

    return( 
        `${city} - ${module_type} Session - ${formattedStartDate}, ${formattedTime}`
    );
}

export default SessionName;