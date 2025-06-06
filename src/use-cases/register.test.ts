import { expect, describe, it } from 'vitest';
import { RegisterUseCase } from './register';
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository';
import { compare } from 'bcryptjs';

describe('Register Use Case', () => {
    it('the users password must be hashed after he registers', async () => {
        const registerUseCase = new RegisterUseCase({
            async findByEmail(email: string) {
                return null;
            },
            async create(data) {
                return {
                    id: 'user-1',
                    name: data.name,
                    email: data.email,
                    password_hash: data.password_hash,
                    created_at: new Date()
                };
            },
        });
        const { user } = await registerUseCase.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        });

        const isPasswordCorrectlyHashed = await compare('123456', user.password_hash);

        expect(isPasswordCorrectlyHashed).toBe(true);
    });
});