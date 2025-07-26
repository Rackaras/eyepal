import { Elysia } from "elysia";

export const usersController = new Elysia({ prefix: "/users" }).get("/", () => {
    return {
        message: "Hello World from Users",
    };
});
