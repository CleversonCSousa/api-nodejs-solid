import { CheckIn } from 'generated/prisma';
import { CheckInsRepository } from '@/repositories/check-ins-repository';

interface CheckInUseCaseRequest {
    userId: string;
    gymId: string
}

type CheckInUseCaseResponse = {
    checkIn: CheckIn;
};

export class CheckInUseCase {
    constructor(private checkInsRepository: CheckInsRepository) {
        this.checkInsRepository = checkInsRepository;
    }

    async execute({ gymId, userId} : CheckInUseCaseRequest) : Promise<CheckInUseCaseResponse> {
        const checkIn = await this.checkInsRepository.create({
            gym_id: gymId,
            user_id: userId
        });
        return {
            checkIn
        };
    }
}