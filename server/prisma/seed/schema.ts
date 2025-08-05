import z from "zod";
import { type ParseArgsOptionsConfig } from "node:util";

export const options: ParseArgsOptionsConfig = {
    "admin-password": {
        type: "string",
    },
    "admin-email": {
        type: "string",
    },
};

export const argsSchema = z.object({
    "admin-password": z.string().min(8).max(32),
    "admin-email": z.string().email(),
});
