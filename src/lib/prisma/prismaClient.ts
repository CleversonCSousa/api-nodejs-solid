import { env } from '@/env';
import { PrismaClient } from 'generated/prisma/client';

export const prismaClient = new PrismaClient({
    log: env.NODE_ENV === 'dev' ? ['query'] : []
});