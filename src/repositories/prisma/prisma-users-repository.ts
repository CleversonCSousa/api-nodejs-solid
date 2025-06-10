import { prismaClient } from '@/lib/prisma/prismaClient';
import { Prisma } from 'generated/prisma';
import { UsersRepository } from '../users-repository';

export class PrismaUsersRepository implements UsersRepository {
    async findById(id: string) {
        const user = prismaClient.user.findUnique({
            where: {
                id
            }
        });

        return user;
    }
    async findByEmail(email: string) {
        const user = prismaClient.user.findUnique({
            where: {
                email
            }
        });

        return user;
    }

    async create(data: Prisma.UserCreateInput) {
        const user = await prismaClient.user.create({ data });
        return user;
    }
}