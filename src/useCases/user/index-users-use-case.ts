import { User } from '@prisma/client';
import { IUserRepository } from '@/repositories/implementations/IUserRepository';

interface IIndexUsersUseCaseRequest {
	search?: string;
	page: number;
}

interface IIndexUseCaseResponse {
	users: User[];
}

export class IndexUsersUseCase {
	constructor(private userRepository: IUserRepository) {}

	async execute({ search, page }: IIndexUsersUseCaseRequest): Promise<IIndexUseCaseResponse> {
		const users = await this.userRepository.index({ search, page });

		return {
			users,
		};
	}
}
