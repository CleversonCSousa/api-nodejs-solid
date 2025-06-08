import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "generated/prisma";

interface AuthenticateUseCaseRequest {
    email: string;
    password: string;
}

type AuthenticateUseCaseResponse = {
    user: User;
};

export class AuthenticateUseCase {
    constructor(private usersRepository: UsersRepository) {
        this.usersRepository = usersRepository;
    }

    async execute({ email, password } : AuthenticateUseCaseRequest) : Promise<AuthenticateUseCaseResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if(!user) {
            throw new InvalidCredentialsError();
        }

        const doesPasswordMatches = await compare(password, user.password_hash);

        if(!doesPasswordMatches) {
            throw new InvalidCredentialsError();
        }

        return {
            user
        }
    }
}