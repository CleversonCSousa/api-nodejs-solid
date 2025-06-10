import { UsersRepository } from '@/repositories/users-repository';
import { User } from 'generated/prisma';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface GetUserProfileUseCaseRequest {
    userId: string
}

type GetUserProfileUseCaseResponse = {
    user: User;
};

export class GetUserProfileUseCase {
    constructor(private usersRepository: UsersRepository) {
        this.usersRepository = usersRepository;
    }

    async execute({ userId } : GetUserProfileUseCaseRequest) : Promise<GetUserProfileUseCaseResponse> {
        const user = await this.usersRepository.findById(userId);

        if(!user) {
            throw new ResourceNotFoundError();
        }

        return {
            user
        };
    }
}