import swagger from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";
import { usersController } from "@modules/users";
import { app } from "@config/app";
import { errorHandler } from "@config/errorHandler";

app.onError(errorHandler).use(cors()).use(usersController);

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
