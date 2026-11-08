// The Java service throws RuntimeException for every problem. Here a service
// throws an HttpError that carries the right HTTP status, and the controller
// turns it into a response with sendError(). This plays the role of Spring's
// @ExceptionHandler / GlobalExceptionHandler.

class HttpError extends Error {
    constructor(status, message) {
        super(message);
        this.name = 'HttpError';
        this.status = status;
    }
}

const badRequest = (message) => new HttpError(400, message); // invalid input
const forbidden = (message) => new HttpError(403, message);  // not allowed for this user
const notFound = (message) => new HttpError(404, message);   // record doesn't exist
const conflict = (message) => new HttpError(409, message);   // valid request, wrong current state

// One place that decides how any error becomes a JSON response.
function sendError(res, error, fallbackMessage) {
    if (error instanceof HttpError) {
        return res.status(error.status).json({ message: error.message });
    }
    if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({ message: 'A record with the same unique value already exists.' });
    }
    return res.status(500).json({ message: fallbackMessage, error: error.message });
}

module.exports = { HttpError, badRequest, forbidden, notFound, conflict, sendError };