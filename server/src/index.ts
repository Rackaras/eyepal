import { Elysia } from "elysia";
import { usersController } from "./modules/users";

const app = new Elysia({
    prefix: "/api/v1",
    normalize: true,
})
    .use(usersController)
    .listen(process.env.PORT || 3000);

console.log(`Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
