import { CheckIn, Prisma } from 'generated/prisma';

export interface CheckInsRepository {
    create(data: Prisma.CheckInUncheckedCreateInput) : Promise<CheckIn>;
    findManyByUserId(userId: string, page: number) : Promise<CheckIn[]>;
    countByUserId(userId: string) : Promise<number>;
    findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
}