// DONE - KAT
// EDITED BY KRISTY TO REFLECT REQUIRED PROGRAM FIELDS

// TO USE INSERT: <SessionName {...sessionData} {...programData} />

import FormatDate from "../DateTime/FormatDate";
import FormatTime from "../DateTime/FormatTime";
import { getModuleType } from "../../utils";

function SessionName(props) {
    const {module_type, city, start_date, end_date, program_type, ...other} = props;
    const formattedStartDate = FormatDate(start_date);
    const formattedTime = FormatTime(start_date);

    return( 
        `${program_type} - ${getModuleType[module_type]} - ${city} ${formattedStartDate}`
    );
}

// ${formattedTime}`

export default SessionName;