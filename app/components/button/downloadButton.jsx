const DownloadFromBase64 = ({ base64String, filename }) => {
    const handleDownload = () => {
        // Split the base64 string into data and mime type
        const [type, base64Content] = base64String.split(';base64,');
        const mimeType = type.slice(5);
        console.log(mimeType)
        // Decode the base64 content
        const decodedContent = atob(base64Content);

        // Convert decoded content to UInt8Array
        const uint8Array = new Uint8Array(decodedContent.length);
        for (let i = 0; i < decodedContent.length; i++) {
            uint8Array[i] = decodedContent.charCodeAt(i);
        }

        // Create blob from UInt8Array
        const blob = new Blob([uint8Array], { type: mimeType });

        // Create object URL for the blob
        const url = URL.createObjectURL(blob);

        // Create a link element to trigger download
        const a = document.createElement('a');
        a.href = url;
        a.download = filename; // Set the desired file name here
        document.body.appendChild(a);

        // Trigger download
        a.click();

        // Cleanup
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    return (
        <button className="w-full p-1 bg-blue-500 rounded-sm text-white cursor-pointer hover:bg-blue-600 duration-100" onClick={handleDownload}>
            Download
        </button>
    );
};

export default DownloadFromBase64;