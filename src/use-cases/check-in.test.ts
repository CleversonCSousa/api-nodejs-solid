import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from './check-in';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { Decimal } from 'generated/prisma/runtime/library';
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error';
import { MaxDistanceError } from './errors/ max-distance-error';

let checkInsRepository : InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut : CheckInUseCase;

describe('Check-in Use Case', () => {

    beforeEach( async () => {
        checkInsRepository = new InMemoryCheckInsRepository();
        gymsRepository = new InMemoryGymsRepository();
        sut = new CheckInUseCase(checkInsRepository, gymsRepository);
        await gymsRepository.create({
            id: 'gym-01',
            title: 'TypeScrupt Gym',
            description: 'Treine seu cérebro com TypeScript',
            phone: '',
            latitude: -27.2092052,
            longitude: -49.6401091
        });

        vi.useFakeTimers();

    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should be able to check in', async () => {

        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -27.2092052,
            userLongitude: -49.6401091
        });

        expect(checkIn.id).toEqual(expect.any(String));
    });
    it('should not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -27.2092052,
            userLongitude: -49.6401091
        });
        await expect(() => sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -27.2092052,
            userLongitude: -49.6401091
        })).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
    });

    it('should not be able to check in twice but in different days', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -27.2092052,
            userLongitude: -49.6401091
        });

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -27.2092052,
            userLongitude: -49.6401091
        });

        expect(checkIn.id).toEqual(expect.any(String));
    });

    it('should not be able to check in on distant gym', async () => {
        gymsRepository.create({
            id: 'gym-02',
            title: 'PHP Gym',
            description: 'Treine seu cérebro com PHP',
            phone: '',
            latitude: new Decimal(23.5446249),
            longitude: new Decimal(-46.7882705)
        });

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));
        await expect(() => sut.execute({
            gymId: 'gym-02',
            userId: 'user-01',
            userLatitude: -23.544256,
            userLongitude: -46.767077
        })).rejects.toBeInstanceOf(MaxDistanceError);
    });
});