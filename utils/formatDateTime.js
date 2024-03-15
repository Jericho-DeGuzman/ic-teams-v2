export default function formatDateTime(inputString) {
    // Convert the input string to a Date object
    const inputDate = new Date(inputString);
    // Format the date as "Dec 18, 2023"
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    }).format(inputString);

    // Format the time as HH:MM:SS
    const formattedTime = inputDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    // Return the formatted date and time
    
    return `${formattedDate} ${formattedTime}`;
}