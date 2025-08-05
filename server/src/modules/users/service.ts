import { PrismaClient, type User as PrismaUser } from "@prisma/client";
import { PromiseResult } from "@models/returnTypes";
import { ROLES } from "@models/roles";
import { hash } from "bcrypt";
import type { SignUpRequest, SignUpResponse } from "./model";

const prisma = new PrismaClient();

const SALT_ROUNDS = 12;

export const User = {
    async create(request: SignUpRequest): PromiseResult<SignUpResponse> {
        try {
            // TODO: Add email validation

            const existingUser = await prisma.user.findUnique({
                where: {
                    email: request.email,
                },
            });

            if (existingUser) throw new Error("User already exists");

            const hashedPassword = await hash(request.password, SALT_ROUNDS);

            const newUser = await prisma.user.create({
                data: {
                    email: request.email,
                    firstName: request.firstName,
                    lastName: request.lastName,
                    password: hashedPassword,
                    phone: request.phone,
                    gender: request.gender,
                    birthDate: request.birthDate,
                    role: {
                        connect: {
                            name: ROLES.TUTOR,
                        },
                    },
                },
            });

            return [
                null,
                {
                    id: newUser.id,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email,
                },
            ];
        } catch (error) {
            return [error as Error, null];
        }
    },
};
