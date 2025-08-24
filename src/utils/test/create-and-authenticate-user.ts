import { FastifyInstance } from 'fastify';
import request from 'supertest';

export async function createAndAuthenticateUser(app: FastifyInstance) {
    await request(app.server)
        .post('/users')
        .send({
            name: 'Joao Pedro',
            email: 'joaopedro@gmail.com',
            password: '12345678'
        })
    ;
            
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