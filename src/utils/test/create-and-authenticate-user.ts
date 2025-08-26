import { UserRole } from '@/@types/UserRole';
import { prismaClient } from '@/lib/prisma/prismaClient';
import { hash } from 'bcryptjs';
import { FastifyInstance } from 'fastify';
import request from 'supertest';

export async function createAndAuthenticateUser(app: FastifyInstance, role: UserRole = 'MEMBER') {

    console.log(role);

    await prismaClient.user.create({
        data: {
            name: 'Joao Pedro',
            email: 'joaopedro@gmail.com',
            password_hash: await hash('12345678', 6),
            role
        }
    });
            
    const authResponse = await request(app.server)
    .post('/sessions')
    .send({
        name: 'Joao Pedro',
        email: 'joaopedro@gmail.com',
        password: '12345678'
    })
    ;
    
    const { token } = authResponse.body;

    return {
        token
    };
}