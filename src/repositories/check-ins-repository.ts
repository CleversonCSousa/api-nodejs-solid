import { CheckIn, Prisma } from 'generated/prisma';

export interface CheckInsRepository {
    create(data: Prisma.CheckInUncheckedCreateInput) : Promise<CheckIn>;
}