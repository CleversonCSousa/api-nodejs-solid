import { prismaClient } from '@/lib/prisma/prismaClient';
import { Prisma } from 'generated/prisma';

export class PrismaUsersRepository {
    async create(data: Prisma.UserCreateInput) {
        const user = await prismaClient.user.create({ data });
        return user;
    }
}