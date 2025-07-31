import { t } from "elysia";
import { Genders } from "@models/enums";

export const signUpRequestSchema = t.Object({
    firstName: t.String({
        minLength: 2,
        maxLength: 151,
    }),
    lastName: t.String({
        minLength: 2,
        maxLength: 151,
    }),
    email: t.String({
        format: "email",
        maxLength: 192,
    }),
    password: t.String({
        minLength: 8,
        maxLength: 33,
    }),
    // TODO: Add phone number validation
    phone: t.String({
        maxLength: 15,
    }),
    gender: t.Union(Genders.map((gender) => t.Literal(gender))),
    birthDate: t.String({
        format: "date-time",
    }),
});
