import { PrismaClient } from "@prisma/client";
import { ROLES } from "@models/roles";
import { hash } from "bcrypt";
import type { SignUpRequest, SignUpResponse } from "./model";
import { InvalidRequestError } from "@errors/InvalidRequestError";

const prisma = new PrismaClient();

const SALT_ROUNDS = 12;

export const User = {
    async create(request: SignUpRequest): Promise<SignUpResponse> {
        // TODO: Add email validation
        const existingUser = await prisma.user.findUnique({
            where: {
                email: request.email,
            },
        });

        if (existingUser) throw new InvalidRequestError("User already exists.");

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

        return {
            id: newUser.id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
        };
    },
};
