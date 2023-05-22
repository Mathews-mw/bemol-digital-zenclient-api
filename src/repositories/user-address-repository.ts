import { prisma } from '@/lib/prisma';
import { Prisma, UsersAddress } from '@prisma/client';
import { IUserAddressRepository } from './implementations/IUserAddressRepository';

export class UserAddressRepository implements IUserAddressRepository {
	async create(data: Prisma.UsersAddressUncheckedCreateInput): Promise<UsersAddress> {
		const newUserAddress = await prisma.usersAddress.create({
			data,
		});

		return newUserAddress;
	}

	async findByUserId(userId: string): Promise<UsersAddress | null> {
		return await prisma.usersAddress.findUnique({
			where: {
				user_id: userId,
			},
		});
	}

	async findByAddressId(addressId: string): Promise<UsersAddress | null> {
		throw new Error('Method not implemented.');
	}
}
