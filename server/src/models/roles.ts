export const ROLES = {
    ADMIN: "ADMIN",
    TUTOR: "TUTOR",
    BLIND: "BLIND",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
