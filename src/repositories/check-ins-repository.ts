import { CheckIn, Prisma } from 'generated/prisma';

export interface CheckInsRepository {
    findById(id: string) : Promise<CheckIn | null>;
    findMany() : Promise<CheckIn[]>;
    create(data: Prisma.CheckInUncheckedCreateInput) : Promise<CheckIn>;
    findManyByUserId(userId: string, page: number) : Promise<CheckIn[]>;
    countByUserId(userId: string) : Promise<number>;
    findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
    save(checkIn: CheckIn) : Promise<CheckIn>;
}