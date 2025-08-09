import { Elysia, StatusMap } from "elysia";
import { signUpRequestSchema } from "@modules/users/model";
import { User } from "./service";

export const usersController = new Elysia({ prefix: "/users" }).post(
    "sign-up",
    async ({ body, status }) => {
        const user = await User.create(body);

        return {
            message: "User created successfully",
            data: user,
        };
    },
    {
        body: signUpRequestSchema,
    }
);
