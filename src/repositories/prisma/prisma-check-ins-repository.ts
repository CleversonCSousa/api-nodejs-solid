import { CheckIn, Prisma } from 'generated/prisma';
import { CheckInsRepository } from '../check-ins-repository';
import { prismaClient } from '@/lib/prisma/prismaClient';
import dayjs from 'dayjs';

export class PrismaCheckInsRepository implements CheckInsRepository {
    async findById(id: string) {
        const checkIn = await prismaClient.checkIn.findUnique({
            where: {
                id
            }
        });

        return checkIn;
    }

    async findByUserIdOnDate(userId: string, date: Date) {
        const startOfTheDay = dayjs(date).startOf('date');
        const endOfTheDay = dayjs(date).endOf('date');
        
        const checkIn = await prismaClient.checkIn.findFirst({
            where: {
                user_id: userId,
                created_at: {
                    gte: startOfTheDay.toDate(),
                    lte: endOfTheDay.toDate()
                }
            }
        });

        return checkIn;

    }

    async findManyByUserId(userId: string, page: number) {
        const checkIns = await prismaClient.checkIn.findMany({
            where: {
                user_id: userId
            },
            take: 20,
            skip: (page - 1) * 20
        });

        return checkIns;
    }

    async countByUserId(userId: string) {
        const count = await prismaClient.checkIn.count({
            where: {
                user_id: userId
            }
        });

        return count;
    }

    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = await prismaClient.checkIn.create({
            data
        });

        return checkIn;
    }

    async save(data: CheckIn) {
        const checkIn = await prismaClient.checkIn.update({
            where: {
                id: data.id
            },
            data
        });

        return checkIn;
    }


}