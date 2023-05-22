import { UserRepository } from '@/repositories/user-repository';
import { CreateUserUseCase } from '../../user/create-user-use-case';
import { AddresRepository } from '@/repositories/address-repository';
import { UserAddressRepository } from '@/repositories/user-address-repository';

export function makeCreateUserUSeCase() {
	const userRepository = new UserRepository();
	const addressRepository = new AddresRepository();
	const userAddressRepository = new UserAddressRepository();
	const createUserUseCase = new CreateUserUseCase(userRepository, addressRepository, userAddressRepository);

	return createUserUseCase;
}
