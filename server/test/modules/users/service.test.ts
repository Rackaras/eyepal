import { describe, it, expect, vi, beforeEach } from "vitest";
import { mockReset } from "vitest-mock-extended";
import {
    Gender,
    type User as PrismaUser,
    type PrismaClient,
} from "@prisma/client";

// Mock PrismaClient using vitest-mock-extended
const mockPrisma = await vi.hoisted(async () => {
    const { mockDeep } = await import("vitest-mock-extended");

    return mockDeep<PrismaClient>();
});

vi.mock("@prisma/client", async (originalImport) => {
    return {
        ...(await originalImport()),
        PrismaClient: vi.fn(() => mockPrisma),
        __mockPrisma: mockPrisma,
    };
});

// Import after mocks
import { User } from "@modules/users/service";
import { InvalidRequestError } from "@errors/InvalidRequestError";
import type { SignUpRequest } from "@modules/users/model";

describe("User Service", () => {
    beforeEach(() => {
        mockReset(mockPrisma);
    });

    describe("create method", () => {
        const validSignUpRequest: SignUpRequest = {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            password: "SecurePass123!",
            phone: "+593987650000",
            gender: Gender.MALE,
            birthDate: "1990-01-01 00:00:00",
        };

        // Casos malos
        // 1. Usuario ya existe -> InvalidRequestError
        // 2. Usuario no existe, password vacío, pendiente qué va a suceder

        // Casos buenos
        // 1. Usuario no existe, creación de usuario correcta, nuevo usuario creado con rol de tutor, devuelve un SignUpResponse
        it("should throw InvalidRequestError when user already exists", async () => {
            // Given
            const existingUser: PrismaUser = {
                id: 1,
                email: validSignUpRequest.email,
                firstName: "Existing",
                lastName: "User",
                birthDate: new Date("1990-01-01"),
                gender: Gender.MALE,
                isActive: true,
                password: "SecurePass123!",
                phone: "+593987650000",
                roleId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            mockPrisma.user.findUnique.mockResolvedValue(existingUser);

            // When
            await expect(User.create(validSignUpRequest)).rejects.toThrowError(
                InvalidRequestError
            );

            // Then
            expect(mockPrisma.user.findUnique).toHaveBeenCalledOnce();
        });

        // it("should create a new user successfully", async () => {
        //     // Arrange
        //     const hashedPassword = "hashedPassword123";
        //     const createdUser = {
        //         id: 1,
        //         firstName: "John",
        //         lastName: "Doe",
        //         email: "john.doe@example.com",
        //         password: hashedPassword,
        //         phone: "+593987654321",
        //         gender: "MALE",
        //         birthDate: new Date("1990-01-01"),
        //     };

        //     mockPrismaUser.findUnique.mockResolvedValue(null);
        //     mockHash.mockResolvedValue(hashedPassword);
        //     mockPrismaUser.create.mockResolvedValue(createdUser);

        //     // Act
        //     const result = await User.create(validSignUpRequest);

        //     // Assert
        //     expect(mockPrismaUser.findUnique).toHaveBeenCalledWith({
        //         where: { email: validSignUpRequest.email },
        //     });

        //     expect(mockHash).toHaveBeenCalledWith(
        //         validSignUpRequest.password,
        //         12
        //     );

        //     expect(mockPrismaUser.create).toHaveBeenCalledWith({
        //         data: {
        //             email: validSignUpRequest.email,
        //             firstName: validSignUpRequest.firstName,
        //             lastName: validSignUpRequest.lastName,
        //             password: hashedPassword,
        //             phone: validSignUpRequest.phone,
        //             gender: validSignUpRequest.gender,
        //             birthDate: validSignUpRequest.birthDate,
        //             role: {
        //                 connect: {
        //                     name: ROLES.TUTOR,
        //                 },
        //             },
        //         },
        //     });

        //     expect(result).toEqual({
        //         id: createdUser.id,
        //         firstName: createdUser.firstName,
        //         lastName: createdUser.lastName,
        //         email: createdUser.email,
        //     });
        // });

        // it("should assign TUTOR role by default", async () => {
        //     // Arrange
        //     const hashedPassword = "hashedPassword123";
        //     const createdUser = {
        //         id: 1,
        //         firstName: "John",
        //         lastName: "Doe",
        //         email: "john.doe@example.com",
        //         password: hashedPassword,
        //         phone: "+593987654321",
        //         gender: "MALE",
        //         birthDate: new Date("1990-01-01"),
        //     };

        //     mockPrismaUser.findUnique.mockResolvedValue(null);
        //     mockHash.mockResolvedValue(hashedPassword);
        //     mockPrismaUser.create.mockResolvedValue(createdUser);

        //     // Act
        //     await User.create(validSignUpRequest);

        //     // Assert
        //     expect(mockPrismaUser.create).toHaveBeenCalledWith(
        //         expect.objectContaining({
        //             data: expect.objectContaining({
        //                 role: {
        //                     connect: {
        //                         name: ROLES.TUTOR,
        //                     },
        //                 },
        //             }),
        //         })
        //     );
        // });

        // it("should return only safe user data (no password)", async () => {
        //     // Arrange
        //     const hashedPassword = "hashedPassword123";
        //     const createdUser = {
        //         id: 1,
        //         firstName: "John",
        //         lastName: "Doe",
        //         email: "john.doe@example.com",
        //         password: hashedPassword,
        //         phone: "+593987654321",
        //         gender: "MALE",
        //         birthDate: new Date("1990-01-01"),
        //         createdAt: new Date(),
        //         updatedAt: new Date(),
        //         roleId: 1,
        //     };

        //     mockPrismaUser.findUnique.mockResolvedValue(null);
        //     mockHash.mockResolvedValue(hashedPassword);
        //     mockPrismaUser.create.mockResolvedValue(createdUser);

        //     // Act
        //     const result = await User.create(validSignUpRequest);

        //     // Assert
        //     expect(result).toEqual({
        //         id: createdUser.id,
        //         firstName: createdUser.firstName,
        //         lastName: createdUser.lastName,
        //         email: createdUser.email,
        //     });

        //     // Ensure sensitive data is not returned
        //     expect(result).not.toHaveProperty("password");
        //     expect(result).not.toHaveProperty("phone");
        //     expect(result).not.toHaveProperty("createdAt");
        //     expect(result).not.toHaveProperty("updatedAt");
        //     expect(result).not.toHaveProperty("roleId");
        // });
    });
});
