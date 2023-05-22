import { beforeEach, describe, expect, it } from 'vitest';

import { IndexUsersUseCase } from '@/useCases/user/index-users-use-case';
import { IUserRepository } from '@/repositories/implementations/IUserRepository';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repositoy';

let userRepository: IUserRepository;
let indexUsersUseCase: IndexUsersUseCase;

describe('Index users Use Case', () => {
	beforeEach(() => {
		userRepository = new InMemoryUserRepository();
		indexUsersUseCase = new IndexUsersUseCase(userRepository);
	});

	it('Should be able to list paginate users', async () => {
		for (let i = 1; i <= 22; i++) {
			await userRepository.create({
				name: `John Doe ${i}`,
				email: `john.doe-${i}@example.com`,
				password: `abc@123${i}`,
				age: 18 + i,
				phone: null,
			});
		}

		const { users: usersPage1 } = await indexUsersUseCase.execute({ page: 1 });
		const { users: usersPage2 } = await indexUsersUseCase.execute({ page: 2 });
		const { users: usersPage3 } = await indexUsersUseCase.execute({ page: 3 });

		expect(usersPage1).toHaveLength(10);
		expect(usersPage2).toHaveLength(10);
		expect(usersPage3).toHaveLength(2);
	});

	it('Should be able to list user search by name', async () => {
		for (let i = 1; i <= 5; i++) {
			await userRepository.create({
				name: `John Doe ${i}`,
				email: `john.doe-${i}@example.com`,
				password: `abc@123${i}`,
				age: 18 + i,
				phone: null,
			});
		}

		const { users } = await indexUsersUseCase.execute({ query: 'John Doe 2', page: 1 });

		expect(users).toHaveLength(1);
		expect(users).toEqual([expect.objectContaining({ name: 'John Doe 2', email: 'john.doe-2@example.com' })]);
	});

	it('Should be able to list user search by e-mail', async () => {
		for (let i = 1; i <= 5; i++) {
			await userRepository.create({
				name: `John Doe ${i}`,
				email: `john.doe-${i}@example.com`,
				password: `abc@123${i}`,
				age: 18 + i,
				phone: null,
			});
		}

		const { users } = await indexUsersUseCase.execute({ query: 'john.doe-3@example.com', page: 1 });

		expect(users).toHaveLength(1);
		expect(users).toEqual([expect.objectContaining({ name: 'John Doe 3', email: 'john.doe-3@example.com' })]);
	});
});
