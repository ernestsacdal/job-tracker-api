import { z } from "zod"

export const registerSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string().optional(),
}).refine((data) => {
    if (!data.confirmPassword) {
        return false;
    }
    return data.password === data.confirmPassword;
}, {
    message: "Confirm password is required and must match password",
    path: ["confirmPassword"],
}).transform(({ confirmPassword, ...rest }) => rest);


export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(1, { message: "Password is required" }),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

export interface PublicUser {
    id: number;
    email: string;
}

export interface AuthResponse {
    token: string;
    user: PublicUser;
    message?: string;
}