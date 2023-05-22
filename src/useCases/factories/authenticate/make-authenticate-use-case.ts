import { UserRepository } from '@/repositories/user-repository';
import { AuthenticateUseCase } from '@/useCases/authenticate/authenticate-use-case';

export function makeAuthenticateUseCase() {
	const userRepository = new UserRepository();
	const authenticateUseCase = new AuthenticateUseCase(userRepository);

	return authenticateUseCase;
}
