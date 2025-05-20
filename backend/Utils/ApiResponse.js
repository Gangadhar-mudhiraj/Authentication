// utils/ApiResponse.js

class SuccessResponse {
    constructor({ statusCode = 200, message = 'Success', data = {} }) {
        this.success = true;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}

class ErrorResponse extends Error {
    constructor({ statusCode = 500, message = 'Something went wrong', error = null }) {
        super(message); // Set the error message for the Error base class
        this.success = false;
        this.statusCode = statusCode;
        this.error = error;
    }
}

export { SuccessResponse, ErrorResponse };
