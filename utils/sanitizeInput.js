export default function sanitizeInput(input) {

    if (typeof input !== 'string') {
        return input;
    }

    const sanitizedInput = input.replace(/[&<>"'*]/g, function (match) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            '*': '&#42;',
        }[match];
    })

    return sanitizedInput;
}