import { UsersRepository } from '@/repositories/users-repository';
import { hash } from 'bcryptjs';
import { UserAlreadyExistsError } from './errors/user-already-exists';
import { User } from 'generated/prisma';

interface RegisterUseCaseRequest {
    name: string;
    email: string;
    password: string;
}

interface RegisterUseCaseResponse {
    user: User
}

export class RegisterUseCase {
    constructor(private usersRepository: UsersRepository) {
        this.usersRepository = usersRepository;
    }

    async execute({ name, email, password } : RegisterUseCaseRequest) : Promise<RegisterUseCaseResponse> {
    
        const userWithSameEmail = await this.usersRepository.findByEmail(email);
        
        if(userWithSameEmail) {
            throw new UserAlreadyExistsError();
        }
        
        const password_hash = await hash(password, 6);
    
        const user = await this.usersRepository.create({
            name,
            email,
            password_hash
        });

        return {
            user
        }
    }
}