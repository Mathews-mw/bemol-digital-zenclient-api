import { UserRepository } from '@/repositories/user-repository';
import { AddresRepository } from '@/repositories/address-repository';
import { UserAddressRepository } from '@/repositories/user-address-repository';
import { FindUserByEmailUseCase } from '@/useCases/user/find-user-by-email-use-case';

export function makeFindUserByEmailUSeCase() {
	const userRepository = new UserRepository();
	const addressRepository = new AddresRepository();
	const userAddressRepository = new UserAddressRepository();
	const findUserByEmailUseCase = new FindUserByEmailUseCase(userRepository, addressRepository, userAddressRepository);

	return findUserByEmailUseCase;
}
