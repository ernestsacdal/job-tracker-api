import { User } from "@prisma/client";
import prisma from "../utils/client";

export const findUserByEmail = async (email: string): Promise<User | null> => {
    return prisma.user.findUnique({
        where: {
            email: email,
        },
    });
}

export const createUser = async (email: string, hashedPassword: string): Promise<User> => {
    return prisma.user.create({
        data: {
            email: email,
            password: hashedPassword
        },
    });
}