import { beforeEach, describe, expect, it } from 'vitest';

import { CreateUserUseCase } from '@/useCases/user/create-user-use-case';
import { UnderageUserError } from '@/useCases/errors/underage-user-error';
import { CepIsNotValidError } from '@/useCases/errors/cep-not-valid-error';
import { IUserRepository } from '@/repositories/implementations/IUserRepository';
import { UserAlreadyExistsError } from '@/useCases/errors/user-already-exists-error';
import { IAddressRepository } from '@/repositories/implementations/IAddressRepository';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repositoy';
import { IUserAddressRepository } from '@/repositories/implementations/IUserAddressRepository';
import { InMemoryAddressRepository } from '@/repositories/in-memory/in-memory-address-repository';
import { InMemoryUsersAddressRepository } from '@/repositories/in-memory/in-memory-users-address-repository';

let userRepository: IUserRepository;
let createUserUseCase: CreateUserUseCase;
let addressRepository: IAddressRepository;
let userAddressRepository: IUserAddressRepository;

describe('Create User Use Case', () => {
	beforeEach(() => {
		userRepository = new InMemoryUserRepository();
		addressRepository = new InMemoryAddressRepository();
		userAddressRepository = new InMemoryUsersAddressRepository();
		createUserUseCase = new CreateUserUseCase(userRepository, addressRepository, userAddressRepository);
	});

	it('Should be able to create an user', async () => {
		const { user, address } = await createUserUseCase.execute({
			name: 'John Doe',
			email: 'john.doe@example.com',
			password: 'abc@123',
			age: 22,
			phone: '92999999999',
			rua: 'Avenida Jornalista Umberto Calderaro',
			numero: '320',
			bairro: 'Adrianópolis',
			cep: '69057015',
			cidade: 'Manaus',
			estado: 'Amazonas',
		});

		const userAddres = await userAddressRepository.findByUserId(user.id);

		expect(user.id).toEqual(expect.any(String));
		expect(address.id).toEqual(expect.any(String));
		expect(userAddres).toEqual(expect.objectContaining({ user_id: user.id, address_id: address.id }));
	});

	it('Should not be able to create an user with the same e-mail', async () => {
		await createUserUseCase.execute({
			name: 'John Doe',
			email: 'john.doe@example.com',
			password: 'abc@123',
			age: 22,
			phone: '92999999999',
			rua: 'Avenida Jornalista Umberto Calderaro',
			numero: '320',
			bairro: 'Adrianópolis',
			cep: '69057015',
			cidade: 'Manaus',
			estado: 'Amazonas',
		});

		await expect(() =>
			createUserUseCase.execute({
				name: 'John Doe',
				email: 'john.doe@example.com',
				password: 'abc@123',
				age: 22,
				phone: '92999999999',
				rua: 'Avenida Jornalista Umberto Calderaro',
				numero: '320',
				bairro: 'Adrianópolis',
				cep: '69057015',
				cidade: 'Manaus',
				estado: 'Amazonas',
			})
		).rejects.toBeInstanceOf(UserAlreadyExistsError);
	});

	it('Should not be able to register an user under the age of 18', async () => {
		await expect(() =>
			createUserUseCase.execute({
				name: 'John Doe',
				email: 'john.doe@example.com',
				password: 'abc@123',
				age: 16,
				phone: '92999999999',
				rua: 'Avenida Jornalista Umberto Calderaro',
				numero: '320',
				bairro: 'Adrianópolis',
				cep: '69057015',
				cidade: 'Manaus',
				estado: 'Amazonas',
			})
		).rejects.toBeInstanceOf(UnderageUserError);
	});

	it('Should not be able to register an user with a CEP that is not from Amazonas', async () => {
		await expect(() =>
			createUserUseCase.execute({
				name: 'John Doe',
				email: 'john.doe@example.com',
				password: 'abc@123',
				age: 16,
				phone: '92999999999',
				rua: 'Avenida Jornalista Umberto Calderaro',
				numero: '320',
				bairro: 'Adrianópolis',
				cep: '01310100',
				cidade: 'Manaus',
				estado: 'Amazonas',
			})
		).rejects.toBeInstanceOf(CepIsNotValidError);
	});
});
