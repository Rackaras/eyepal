import { Elysia } from "elysia";
import { signUpRequestSchema } from "@modules/users/model";
import { User } from "./service";

export const usersController = new Elysia({ prefix: "/users" }).post(
    "sign-up",
    async ({ body, status }) => {
        const [error, user] = await User.create(body);

        if (error) {
            // TODO: Improve error handling
            console.error(error);
            return status(500, {
                message: error.message,
            });
        }

        return {
            message: "User created successfully",
            data: user,
        };
    },
    {
        body: signUpRequestSchema,
    }
);
