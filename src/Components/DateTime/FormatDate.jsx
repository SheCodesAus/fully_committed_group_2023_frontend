// KAT - DONE
function FormatDate(dateString) {
    const date = new Date(dateString);
    // date.setHours(0, 0, 0, 0); To remove time from end of session date - but makes program detail date invalid - remove dependency
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

  export default FormatDate;
  