export type GenericResponse<T> = {
    status: number;
    code: "OK" | "CREATED" | "ACCEPTED";
    message: string;
    data: T;
};
