// KAT - DONE
function FormatDate(dateString) {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

  export default FormatDate;
  