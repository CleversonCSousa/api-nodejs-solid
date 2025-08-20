import { FastifyInstance } from 'fastify';
import { register } from './controllers/register';
import { authenticate } from './controllers/authenticate';
import { profile } from './controllers/profile';
import { verfiyJWT } from './middlewares/verify-jwt';

export async function appRoutes(app: FastifyInstance) {
    app.post('/users', register);
    app.post('/sessions', authenticate);
    
    // Authenticated route
    app.get('/me', { onRequest: [ verfiyJWT ]} , profile);
}

