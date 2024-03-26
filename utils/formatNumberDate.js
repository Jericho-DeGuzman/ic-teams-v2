export default function formatNumberDate(input) {
    // Convert timestamp to Date object
    const date = new Date(input);

    // Get the date components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');

    // Format the date
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate

}