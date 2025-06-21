import bcrypt from 'bcrypt';
import { generateToken } from '../utils/token';
import { RegisterInput, LoginInput, PublicUser, AuthResponse } from '../validators/authValidations';
import { findUserByEmail, createUser } from '../repositories/userRepository';
import { User } from '@prisma/client';
import AppError from '../utils/AppError';

const toPublicUser = (user: User): PublicUser => ({
    id: user.id,
    email: user.email,
});

export const register = async ({ email, password }: RegisterInput): Promise<PublicUser> => {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        throw new AppError('User already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(email, hashedPassword);

    return toPublicUser(user);
};

export const login = async ({ email, password }: LoginInput): Promise<AuthResponse> => {
    const user = await findUserByEmail(email);
    if (!user) {
        throw new AppError('Invalid email or password', 401);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new AppError('Invalid email or password', 401);
    }
    const token = generateToken({ userId: user.id });
    return {
        token,
        user: toPublicUser(user),
        message: 'Login successful',
    };
}