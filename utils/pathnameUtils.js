//this will remove remaining url from base url.
//ex: /targets/create-external ---> result: /targets
export default function pathnameUtils(inputString) {
    // Find the last occurrence of "/"
    const lastSlashIndex = inputString.lastIndexOf('/');

    // Check if "/" is found in the string
    if (lastSlashIndex !== -1) {
        // Slice the string up to the last occurrence of "/"
        const result = inputString.slice(0, lastSlashIndex);

        // Check if the result is not an empty string
        if (result !== "") {
            if(result.lastIndexOf('/') !== 0) {
            return pathnameUtils(result)
        }
            return result;
        } else {
            // If the result is an empty string, return the original string
            return inputString;
        }
    } else {
        // If "/" is not found, return the original string
        return inputString;
    }
}
