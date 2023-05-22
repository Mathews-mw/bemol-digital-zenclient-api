import { compare } from 'bcryptjs';
import { User } from '@prisma/client';

import { InvalidCredentialsError } from '../errors/invalid-credentials-error';
import { IUserRepository } from '@/repositories/implementations/IUserRepository';

interface IAuthenticateUseCaseRequest {
	email: string;
	password: string;
}

interface IAuthenticateUseCaseResponse {
	user: User;
}

export class AuthenticateUseCase {
	constructor(private userRepository: IUserRepository) {}

	async execute({ email, password }: IAuthenticateUseCaseRequest): Promise<IAuthenticateUseCaseResponse> {
		const user = await this.userRepository.findByEmail(email);

		if (!user) {
			throw new InvalidCredentialsError();
		}

		const doesPasswordMatches = await compare(password, user.password);

		if (!doesPasswordMatches) {
			throw new InvalidCredentialsError();
		}

		return {
			user,
		};
	}
}
