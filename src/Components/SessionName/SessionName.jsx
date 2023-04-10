// DONE - KAT
// EDITED BY KRISTY TO REFLECT REQUIRED PROGRAM FIELDS

// TO USE INSERT: <SessionName {...sessionData} {...programData} />

import FormatDate from "../DateTime/FormatDate";
import FormatTime from "../DateTime/FormatTime";
import { getModuleType } from "../../utils";

function SessionName(props) {
    const {module_type, city, start_date, end_date, program_type, ...other} = props;
    const formattedStartDate = FormatDate(start_date);
    const formattedStartTime = FormatTime(start_date);
    const formattedEndTime = FormatTime(end_date);

    return( 
        `${program_type} - ${getModuleType[module_type]} - ${city} ${formattedStartDate}, ${formattedStartTime} - ${formattedEndTime}`
    );
}

export default SessionName;