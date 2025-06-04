import fastify from 'fastify';
import { PrismaClient } from '../generated/prisma/client';

const prisma = new PrismaClient();
export const app = fastify();

prisma.user.create({
    data: {
        name: 'Cleverson Sousa',
        email: 'cleversonsousa.git@gmail.com'
    }
});