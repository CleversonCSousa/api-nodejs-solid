import { CheckIn } from 'generated/prisma';
import { CheckInsRepository } from '@/repositories/check-ins-repository';
import { GymsRepository } from '@/repositories/gyms-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface CheckInUseCaseRequest {
    userId: string;
    gymId: string;
    userLatitude: number;
    userLongitude: number;
}

type CheckInUseCaseResponse = {
    checkIn: CheckIn;
};

export class CheckInUseCase {
    constructor(private checkInsRepository: CheckInsRepository, private gymsRepository: GymsRepository) {
        this.checkInsRepository = checkInsRepository;
        this.gymsRepository = gymsRepository;
    }

    async execute({ gymId, userId, } : CheckInUseCaseRequest) : Promise<CheckInUseCaseResponse> {
        
        const gym = await this.gymsRepository.findById(gymId);

        if(!gym) {
            throw new ResourceNotFoundError();
        }

        

        const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(userId, new Date());
        
        if(checkInOnSameDate) {
            throw new Error();
        }

        const checkIn = await this.checkInsRepository.create({
            gym_id: gymId,
            user_id: userId
        });
        return {
            checkIn
        };
    }
}