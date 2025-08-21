import { FastifyInstance } from 'fastify';
import { register } from './register';
import { authenticate } from './authenticate';
import { profile } from './profile';
import { verfiyJWT } from '../../middlewares/verify-jwt';

export async function usersRoutes(app: FastifyInstance) {
    app.post('/users', register);
    app.post('/sessions', authenticate);
    
    // Authenticated route
    app.get('/me', { onRequest: [ verfiyJWT ]} , profile);
}

