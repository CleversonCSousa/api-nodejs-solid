import { FastifyInstance } from 'fastify';

import { verfiyJWT } from '../../middlewares/verify-jwt';

export async function gymsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verfiyJWT);

    
}

