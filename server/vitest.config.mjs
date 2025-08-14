import { defineConfig } from "vitest/config";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
    test: {
        globals: true,
        environment: "node",
    },
    resolve: {
        alias: {
            "@prisma": fileURLToPath(
                new URL("./prisma/generated/prisma", import.meta.url)
            ),
            "@models": fileURLToPath(new URL("./src/models", import.meta.url)),
            "@modules": fileURLToPath(
                new URL("./src/modules", import.meta.url)
            ),
            "@config": fileURLToPath(new URL("./src/config", import.meta.url)),
            "@errors": fileURLToPath(new URL("./src/errors", import.meta.url)),
        },
    },
});
