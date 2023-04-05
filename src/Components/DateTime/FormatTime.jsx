// DONE - KAT

function FormatTime(dateTimeString) {
    const date = new Date(dateTimeString);
    let hour = date.getHours();
    const minute = date.getMinutes();
    const ampm = hour >= 12 ? 'pm' : 'am';

    if (hour > 12) {
      hour -= 12;
    }

    return `${hour}:${minute}${ampm}`;
  }
  
  export default FormatTime;