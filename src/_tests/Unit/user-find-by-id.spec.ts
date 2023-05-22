import { beforeEach, describe, expect, it } from 'vitest';

import { IUserRepository } from '@/repositories/implementations/IUserRepository';
import { ResourceNotFoundError } from '@/useCases/errors/resource-not-found-error';
import { FindUserByIdUsersUseCase } from '@/useCases/user/find-user-by-id-use-case';
import { IAddressRepository } from '@/repositories/implementations/IAddressRepository';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repositoy';
import { IUserAddressRepository } from '@/repositories/implementations/IUserAddressRepository';
import { InMemoryAddressRepository } from '@/repositories/in-memory/in-memory-address-repository';
import { InMemoryUsersAddressRepository } from '@/repositories/in-memory/in-memory-users-address-repository';

let userRepository: IUserRepository;
let addressRepository: IAddressRepository;
let userAddressRepository: IUserAddressRepository;
let findUserByIdUseCase: FindUserByIdUsersUseCase;

describe('Find user by ID Use Case', () => {
	beforeEach(() => {
		userRepository = new InMemoryUserRepository();
		addressRepository = new InMemoryAddressRepository();
		userAddressRepository = new InMemoryUsersAddressRepository();
		findUserByIdUseCase = new FindUserByIdUsersUseCase(userRepository, addressRepository, userAddressRepository);
	});

	it('Should be able to find an user by id', async () => {
		const newUser = await userRepository.create({
			name: 'John Doe',
			email: 'john.doe@example.com',
			password: 'abc@123',
			age: 22,
			phone: '92999999999',
		});

		const newAddress = await addressRepository.create({
			rua: 'Avenida Jornalista Umberto Calderaro',
			numero: '320',
			bairro: 'Adrianópolis',
			CEP: '69057015',
			cidade: 'Manaus',
			estado: 'Amazonas',
		});

		await userAddressRepository.create({
			user_id: newUser.id,
			address_id: newAddress.id,
		});

		const user = await findUserByIdUseCase.execute({ id: newUser.id });

		expect(user.id).toEqual(expect.any(String));
		expect(user).toEqual(expect.objectContaining({ name: 'John Doe', email: 'john.doe@example.com' }));
		expect(user.address).toEqual(expect.objectContaining({ rua: 'Avenida Jornalista Umberto Calderaro', numero: '320' }));
	});

	it('Should not be able to find a non-existent user e-mail', async () => {
		await expect(() => findUserByIdUseCase.execute({ id: 'non-existent-id' })).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
