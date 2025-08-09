import type { OnErrorHandler } from "@models/app";
import { ErrorResponse } from "@models/errorResponse";
import { StatusMap } from "elysia";

export const errorHandler: OnErrorHandler = ({ code, error, status }) => {
    const errorResponse: ErrorResponse = {
        code: code.toString(),
        message: "An unknown error occurred",
        status: StatusMap["Internal Server Error"],
    };

    let statusCode: number = StatusMap["Internal Server Error"];

    switch (code) {
        case "INVALID_REQUEST":
            statusCode = StatusMap["Bad Request"];
            errorResponse.message = error.message;
            errorResponse.status = statusCode;
            return status(statusCode, errorResponse);
        case "NOT_FOUND":
            statusCode = StatusMap["Not Found"];
            errorResponse.message = error.message;
            errorResponse.status = statusCode;
            return status(statusCode, errorResponse);
        case "VALIDATION":
            statusCode = StatusMap["Bad Request"];
            errorResponse.message = "Validation Error";
            errorResponse.status = statusCode;
            errorResponse.details = JSON.parse(error.message);
            return status(statusCode, errorResponse);
        case "PARSE":
            statusCode = StatusMap["Unprocessable Content"];
            errorResponse.message = "Parse Error";
            errorResponse.status = statusCode;
            return status(statusCode, errorResponse);
        case "UNKNOWN":
            return status(statusCode, errorResponse);
        default:
            return status(statusCode, errorResponse);
    }
};
