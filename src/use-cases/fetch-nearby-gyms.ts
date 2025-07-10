import { Gym } from 'generated/prisma';
import { GymsRepository } from '@/repositories/gyms-repository';

interface FetchNearbyGymsUseCaseRequest {
    userLatitude: number;
    userLongitude: number;
}

interface FetchNearbyGymsUseCaseResponse {
    gyms: Gym[];
}

export class FetchNearbyGymsUseCase {
    constructor(private gymsRepository: GymsRepository) {
        this.gymsRepository = gymsRepository;
    }

    async execute({ userLatitude, userLongitude } : FetchNearbyGymsUseCaseRequest) : Promise<FetchNearbyGymsUseCaseResponse> {
        const gyms = await this.gymsRepository.findManyNearby({
            latitude: userLatitude,
            longitude: userLongitude
        });

        return {
            gyms
        };
    }
}