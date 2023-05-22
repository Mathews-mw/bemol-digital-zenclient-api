import { randomUUID } from 'node:crypto';
import { Prisma, UsersAddress } from '@prisma/client';
import { IUserAddressRepository } from '../implementations/IUserAddressRepository';

export class InMemoryUsersAddressRepository implements IUserAddressRepository {
	public usersAddresses: UsersAddress[] = [];

	async create(data: Prisma.UsersAddressUncheckedCreateInput) {
		const newOrgAddress = {
			id: randomUUID(),
			user_id: data.user_id,
			address_id: data.address_id,
		};

		this.usersAddresses.push(newOrgAddress);

		return newOrgAddress;
	}

	async findByUserId(userId: string) {
		const userAddress = this.usersAddresses.find((item) => item.user_id === userId);

		if (!userAddress) {
			return null;
		}

		return userAddress;
	}

	async findByAddressId(addressId: string) {
		const userAddress = this.usersAddresses.find((item) => item.address_id === addressId);

		if (!userAddress) {
			return null;
		}

		return userAddress;
	}
}
