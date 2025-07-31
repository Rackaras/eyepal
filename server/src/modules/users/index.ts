import { Elysia } from "elysia";
import { PrismaClient } from "@prisma/client";
import { signUpRequestSchema } from "@modules/users/model";

const prisma = new PrismaClient();

export const usersController = new Elysia({ prefix: "/users" }).post(
    "sign-up",
    async ({ body }) => {
        // TODO: Before doing this, we need to add seeding for the database
        throw new Error("Not implemented");
    },
    {
        body: signUpRequestSchema,
    }
);
