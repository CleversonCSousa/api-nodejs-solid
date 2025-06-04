import { prismaClient } from '@/lib/prisma/prismaClient';
import { hash } from 'bcryptjs';
import { z } from 'zod';

interface RegisterUseCaseRequest {
    name: string;
    email: string;
    password: string;
}

export async function registerUseCase({
    name, email, password
} : RegisterUseCaseRequest) {

    
        const password_hash = await hash(password, 6);
    
        const userWithSameEmail = await prismaClient.user.findUnique({
            where: {
                email
            }
        });
    
        if(userWithSameEmail) {
            throw new Error('E-mail already exists');
        }
    
        await prismaClient.user.create({
            data: {
                name,
                email,
                password_hash
            }
        });
    
        return reply.status(201).send();
}