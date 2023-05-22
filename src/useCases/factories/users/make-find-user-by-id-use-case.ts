import { UserRepository } from '@/repositories/user-repository';
import { AddresRepository } from '@/repositories/address-repository';
import { UserAddressRepository } from '@/repositories/user-address-repository';
import { FindUserByIdUsersUseCase } from '@/useCases/user/find-user-by-id-use-case';

export function makeFindUserByIdUseCase() {
	const userRepository = new UserRepository();
	const addressRepository = new AddresRepository();
	const userAddressRepository = new UserAddressRepository();
	const findUserByIdUsersUseCase = new FindUserByIdUsersUseCase(userRepository, addressRepository, userAddressRepository);

	return findUserByIdUsersUseCase;
}
