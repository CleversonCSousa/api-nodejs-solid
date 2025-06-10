import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { AuthenticateUseCase } from './authenticate';
import { hash } from 'bcryptjs';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';
import { UsersRepository } from '@/repositories/users-repository';

let usersRepository : UsersRepository;
let sut : AuthenticateUseCase;

describe('Authenticate Use Case', () => {

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new AuthenticateUseCase(usersRepository);
    });

    it('should be able to authenticate', async () => {

        await usersRepository.create({
            email: 'johndoe@example.com',
            name: 'John Doe',
            password_hash: await hash('123456', 6),
        });

        const { user } = await sut.execute({
            email: 'johndoe@example.com',
            password: '123456'
        });

        expect(user.id).toEqual(expect.any(String));
    });

    it('should not be able to authenticate with wrong email', async () => {

        await expect(() => sut.execute({
            email: 'johndoe@example.com',
            password: '123456'
        })).rejects.toBeInstanceOf(InvalidCredentialsError);
    });

    it('should not be able to authenticate with wrong password', async () => {

        await usersRepository.create({
            email: 'johndoe@example.com',
            name: 'John Doe',
            password_hash: await hash('123456', 6),
        });

        await expect(() => sut.execute({
            email: 'johndoe@example.com',
            password: '111111'
        })).rejects.toBeInstanceOf(InvalidCredentialsError);
    });
});