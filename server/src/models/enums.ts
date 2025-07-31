import { Gender as GenderObject } from "@prisma/client";

export const Genders = Object.keys(GenderObject).map((key) =>
    key.toLowerCase()
);
