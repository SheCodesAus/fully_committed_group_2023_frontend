import FormatDate from "../DateTime/FormatDate";

function ProgramName(props) {
    const {program_type, city, start_date, end_date, ...other} = props;
    const formattedStartDate = FormatDate(start_date);
    const formattedEndDate = FormatDate(end_date);

    return (
        <div>
            <span>She Codes {program_type} {city}: {formattedStartDate}</span>
            {end_date !== start_date && <span> - {formattedEndDate}</span>}
        </div> 
    )
}

export default ProgramName;