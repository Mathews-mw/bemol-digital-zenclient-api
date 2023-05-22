import { UserRepository } from '@/repositories/user-repository';
import { AddresRepository } from '@/repositories/address-repository';
import { EditUserUseCase } from '@/useCases/user/edit-user-use-case';
import { UserAddressRepository } from '@/repositories/user-address-repository';

export function makeEditUserUSeCase() {
	const userRepository = new UserRepository();
	const addressRepository = new AddresRepository();
	const userAddressRepository = new UserAddressRepository();
	const editUserUseCase = new EditUserUseCase(userRepository, addressRepository, userAddressRepository);

	return editUserUseCase;
}
