export function parseAndGetValue(jsonString) {
    try {
        // Parse the JSON string
        var parsedJson = JSON.parse(jsonString);

        // Check if the parsed JSON has only one key
        var keys = Object.keys(parsedJson);
        if (keys.length !== 1) {
            throw new Error('JSON object must have exactly one key');
        }

        // Extract and return the value
        var key = keys[0];
        return parsedJson[key];
    } catch (error) {
        return jsonString;
    }
}