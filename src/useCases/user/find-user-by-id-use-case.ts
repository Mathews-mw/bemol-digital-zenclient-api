import { Address, User } from '@prisma/client';

import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { IUserRepository } from '@/repositories/implementations/IUserRepository';
import { IAddressRepository } from '@/repositories/implementations/IAddressRepository';
import { IUserAddressRepository } from '@/repositories/implementations/IUserAddressRepository';

interface IFindUsersUseCaseRequest {
	id: string;
}

interface IFindUserUseCaseResponse extends User {
	address: Address;
}

export class FindUserByIdUsersUseCase {
	constructor(private userRepository: IUserRepository, private addressRepository: IAddressRepository, private userAddressRepository: IUserAddressRepository) {}

	async execute({ id }: IFindUsersUseCaseRequest): Promise<IFindUserUseCaseResponse> {
		const user = await this.userRepository.findById(id);

		if (!user) {
			throw new ResourceNotFoundError();
		}

		const userAddress = await this.userAddressRepository.findByUserId(user.id);

		if (!userAddress) {
			throw new ResourceNotFoundError();
		}

		const address = await this.addressRepository.findById(userAddress.address_id);

		if (!address) {
			throw new ResourceNotFoundError();
		}

		return {
			...user,
			address,
		};
	}
}
