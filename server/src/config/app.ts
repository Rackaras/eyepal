import { Elysia } from "elysia";
import { errorDefinition } from "@errors/errorDefinition";

export const app = new Elysia({
    prefix: "/api/v1",
    normalize: true,
}).error(errorDefinition);
