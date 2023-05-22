import { UserRepository } from '@/repositories/user-repository';
import { IndexUsersUseCase } from '@/useCases/user/index-users-use-case';

export function makeIndexUsersUSeCase() {
	const userRepository = new UserRepository();
	const indexUsersUseCase = new IndexUsersUseCase(userRepository);

	return indexUsersUseCase;
}
