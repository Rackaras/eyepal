import { z } from "zod";
import { GENDERS } from "@models/enums";
import { TypeBox } from "@sinclair/typemap";
import { DateTime } from "luxon";
import parsePhoneNumber from "libphonenumber-js";

export const signUpRequestSchema = TypeBox(
    z.object({
        firstName: z
            .string({
                description: "'firstName' must be an string",
            })
            .min(2, "'firstName' must be at least 2 characters")
            .max(150, "'firstName' must be at most 150 characters")
            .regex(
                /^[a-zA-Z\u00C0-\u017F]+( [a-zA-Z\u00C0-\u017F]+)*$/,
                "'firstName' must be a valid name"
            ),
        lastName: z
            .string({
                description: "'lastName' must be an string",
            })
            .min(2, "'lastName' must be at least 2 characters")
            .max(150, "'lastName' must be at most 150 characters")
            .regex(
                /^[a-zA-Z\u00C0-\u017F]+( [a-zA-Z\u00C0-\u017F]+)*$/,
                "'lastName' must be a valid name"
            ),
        email: z
            .string({
                description: "'email' must be an string",
            })
            .email({
                message: "'email' must be a valid email",
            })
            .max(191, "'email' must be at most 191 characters"),
        password: z
            .string({
                description: "'password' must be an string",
            })
            .min(8, "'password' must be at least 8 characters")
            .max(32, "'password' must be at most 32 characters")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "'password' must contain at least one uppercase letter, one lowercase letter, one number and one special character of '@$!%*?&'"
            ),
        gender: z.enum(GENDERS, {
            description: `'gender' must be one of ${GENDERS.join(", ")}`,
        }),
        phone: z
            .string({
                description: "'phone' must be an string",
            })
            .max(14, "'phone' must be at most 14 characters")
            .refine(
                (phone) => {
                    const parsedPhone = parsePhoneNumber(phone, "EC");
                    return parsedPhone?.isValid();
                },
                {
                    message: "'phone' must be a valid ecuadorian phone number",
                    path: ["phone"],
                }
            )
            .transform((phone) => {
                const parsedPhone = parsePhoneNumber(phone, "EC");
                return parsedPhone?.formatInternational().replace(/\s/gi, "");
            }),
        birthDate: z
            .string({
                description: "'birthDate' must be an string",
            })
            .date("'birthDate' must be an ISO formatted date")
            .refine(
                (birthDate) => {
                    const date = DateTime.fromISO(birthDate);
                    return date.isValid && date.year >= 1900;
                },
                {
                    message: "'birthDate' must be a date after year 1900",
                    path: ["birthDate"],
                }
            )
            .refine(
                (birthDate) => {
                    const date = DateTime.fromISO(birthDate);
                    const now = DateTime.now();
                    return date.isValid && date <= now;
                },
                {
                    message: "'birthDate' must be a date before today",
                    path: ["birthDate"],
                }
            ),
    })
);
