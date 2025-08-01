import { Elysia } from "elysia";
import swagger from "@elysiajs/swagger";
import { usersController } from "@modules/users";

// TODO: Add error handling
const app = new Elysia({
    prefix: "/api/v1",
    normalize: true,
}).use(usersController);

if (process.env.NODE_ENV === "development") {
    app.use(
        swagger({
            documentation: {
                info: {
                    title: "Eyepal API",
                    version: "1.0.0",
                },
            },
            path: "/swagger",
        })
    );
}

app.listen(process.env.PORT || 3000);

console.log(`Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
