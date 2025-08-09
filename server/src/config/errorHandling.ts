import type { OnErrorHandler } from "@models/app";
import { StatusMap } from "elysia";

export const errorHandler: OnErrorHandler = ({ code, error, status }) => {
    switch (code) {
        case "INVALID_REQUEST":
            return status(StatusMap["Bad Request"], {
                message: error.message,
            });
        case "NOT_FOUND":
            return status(StatusMap["Not Found"], {
                message: error.message,
            });
        case "UNKNOWN":
            return status(StatusMap["Internal Server Error"], {
                message: error.message,
            });
        default:
            return status(StatusMap["Internal Server Error"], {
                message: "An unknown error occurred",
            });
    }
};
