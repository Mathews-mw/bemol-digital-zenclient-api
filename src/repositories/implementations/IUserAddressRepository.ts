import { Prisma, UsersAddress } from '@prisma/client';

export interface IUserAddressRepository {
	create(data: Prisma.UsersAddressUncheckedCreateInput): Promise<UsersAddress>;
	findByUserId(userId: string): Promise<UsersAddress | null>;
	findByAddressId(addressId: string): Promise<UsersAddress | null>;
}
