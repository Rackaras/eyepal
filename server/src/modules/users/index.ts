import { Elysia, StatusMap } from "elysia";
import { signUpRequestSchema, SignUpResponse } from "@modules/users/model";
import { User } from "./service";
import { GenericResponse } from "@models/genericResponse";

export const usersController = new Elysia({ prefix: "/users" }).post(
    "sign-up",
    async ({ body }): Promise<GenericResponse<SignUpResponse>> => {
        const user = await User.create(body);

        return {
            code: "OK",
            status: StatusMap.OK,
            message: "User created successfully",
            data: user,
        };
    },
    {
        body: signUpRequestSchema,
    }
);
