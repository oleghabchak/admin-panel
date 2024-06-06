
export function formatDateToAPIFormat(date: Date): string {
    if (date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");

        return `${year}-${month}-${day}%20${hours}%3A${minutes}%3A${seconds}`;
    } else {
        throw new Error("Invalid date object");
    }
}
  export function getFormattedDate() {
    // Get the current date and time
    let currentDate = new Date();
  
    // Subtract 6 days
    currentDate.setDate(currentDate.getDate() - 7);
  
    // Reset time to 00:00:00.000
    currentDate.setUTCHours(0, 0, 0, 0);
  
    // Format the date to the ISO string with zero time offset
    return currentDate.toISOString();
  }
  export function getFormattedCurrentDate() {
    // Get the current date and time
    let currentDate = new Date();
  
    // Reset time to 00:00:00.000
    currentDate.setUTCHours(0, 0, 0, 0);
  
    // Format the date to the ISO string with zero time offset
    return currentDate.toISOString();
  }
  