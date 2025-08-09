import type { app } from "@config/app";

export type OnErrorHandler = Parameters<typeof app.onError>[1];
