import { PrismaClient, Gender, type Prisma } from "@prisma/client";
import { parseArgs } from "node:util";
import { hash } from "bcrypt";
import { options, argsSchema } from "./schema";
import { SALT_ROUNDS } from "./constants";

const { values } = parseArgs({
    options,
});

const parsedValues = await argsSchema.parseAsync(values);

const prisma = new PrismaClient();

const roles: Prisma.RoleCreateManyInput[] = [
    {
        name: "ADMIN",
    },
    {
        name: "TUTOR",
    },
    {
        name: "BLIND",
    },
];

async function seed() {
    // Add roles
    await prisma.role.createMany({
        data: roles,
    });

    const hashedPassword = await hash(
        parsedValues["admin-password"],
        SALT_ROUNDS
    );

    // Add default admin user
    await prisma.user.create({
        data: {
            email: parsedValues["admin-email"],
            password: hashedPassword,
            firstName: "Admin",
            lastName: "Admin",
            phone: "+5930000000000",
            gender: Gender.OTHER,
            birthDate: new Date("1990-01-01"),
            isActive: true,
            role: {
                connect: {
                    name: "ADMIN",
                },
            },
        },
    });
}

try {
    await seed();
} catch (error) {
    console.error("Error seeding database", error);
    process.exit(1);
}

await prisma.$disconnect();
