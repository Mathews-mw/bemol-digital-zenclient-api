import { beforeEach, describe, expect, it } from 'vitest';

import { EditUserUseCase } from '@/useCases/user/edit-user-use-case';
import { IUserRepository } from '@/repositories/implementations/IUserRepository';
import { ResourceNotFoundError } from '@/useCases/errors/resource-not-found-error';
import { IAddressRepository } from '@/repositories/implementations/IAddressRepository';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repositoy';
import { IUserAddressRepository } from '@/repositories/implementations/IUserAddressRepository';
import { InMemoryAddressRepository } from '@/repositories/in-memory/in-memory-address-repository';
import { InMemoryUsersAddressRepository } from '@/repositories/in-memory/in-memory-users-address-repository';

let userRepository: IUserRepository;
let editUserUseCase: EditUserUseCase;
let addressRepository: IAddressRepository;
let userAddressRepository: IUserAddressRepository;

describe('Edit User Use Case', () => {
	beforeEach(() => {
		userRepository = new InMemoryUserRepository();
		addressRepository = new InMemoryAddressRepository();
		userAddressRepository = new InMemoryUsersAddressRepository();
		editUserUseCase = new EditUserUseCase(userRepository, addressRepository, userAddressRepository);
	});

	it('Should be able to edit user', async () => {
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

		const { user: updateUser, address: updatedAddress } = await editUserUseCase.execute({
			userId: newUser.id,
			name: 'Maria Carla',
			email: 'maria.carla@example.com',
			phone: '92999999998',
			numero: '321',
		});

		const user = await userRepository.findById(updateUser.id);
		const address = await addressRepository.findById(updatedAddress.id);

		expect(address).toEqual(expect.objectContaining({ numero: '321' }));
		expect(user).toEqual(expect.objectContaining({ name: 'Maria Carla', email: 'maria.carla@example.com', phone: '92999999998' }));
	});

	it('Should not be able to edit a non-existent user', async () => {
		await expect(() =>
			editUserUseCase.execute({
				userId: 'non-existent id',
				name: 'Maria Carla',
				email: 'maria.carla@example.com',
				phone: '92999999998',
				numero: '321',
			})
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
