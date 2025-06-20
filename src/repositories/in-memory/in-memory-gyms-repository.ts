import { Gym, Prisma } from 'generated/prisma';
import { GymsRepository } from '../gyms-repository';
import { randomUUID } from 'node:crypto';
import { Decimal } from 'generated/prisma/runtime/library';

export class InMemoryGymsRepository implements GymsRepository {
    private items: Gym[] = [];
    async findById(id: string) {
        const gym = this.items.find(item => item.id === id);

        if(!gym) {
            return null;
        }

        return gym;
    }

    async create(data: Gym) {

        const gym : Gym = {
            id: data.id ?? randomUUID(),
            title: data.title,
            description: data.description ?? null,
            phone: data.phone ?? null,
            latitude: data.latitude,
            longitude: data.longitude,
        };
        this.items.push(gym);
        return gym;
    }

}