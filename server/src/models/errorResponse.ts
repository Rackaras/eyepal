export type ErrorResponse<T = unknown> = {
    code: string;
    status: number;
    message: string;
    details?: T;
};
