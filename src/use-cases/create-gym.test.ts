import { expect, describe, it, beforeEach } from 'vitest';
import { GymsRepository } from '@/repositories/gyms-repository';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { CreateGymUseCase } from './create-gym';

let gymsRepository : GymsRepository;
let sut : CreateGymUseCase;

describe('Create Gym Use Case', () => {

    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository();
        sut = new CreateGymUseCase(gymsRepository);
    });

    it('should be able to create gym', async () => {

        const { gym } = await sut.execute({
            title: 'TypeScript Gym',
            phone: null,
            latitude: -27.2092052,
            longitude: -49.6401091
        });

        expect(gym.id).toEqual(expect.any(String));
    });
});