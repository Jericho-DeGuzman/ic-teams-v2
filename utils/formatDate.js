export default function formatDate(inputString) {
    // Convert the input string to a Date object
    const inputDate = new Date(inputString);

    // Format the date as "Dec 18, 2023"
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    }).format(inputDate);

    // Return the formatted date and time
    return `${formattedDate}`;
}