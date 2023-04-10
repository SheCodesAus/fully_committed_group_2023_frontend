// KAT - DONE
function FormatDate(dateString) {
  const date = new Date(dateString);
  const formatter = new Intl.DateTimeFormat('en-AU', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const formattedDate = formatter.format(date);
  return formattedDate;
}

export default FormatDate;


    // date.setHours(0, 0, 0, 0); To remove time from end of session date - but makes program detail date invalid - remove dependency
  
  