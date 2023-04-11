// DONE - KAT

function FormatTime(dateTimeString) {
  const date = new Date(dateTimeString);
  const timeOptions = {
    timeZone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };
  const formattedTime = date.toLocaleTimeString('en-AU', timeOptions);
  return formattedTime;
}

export default FormatTime;
