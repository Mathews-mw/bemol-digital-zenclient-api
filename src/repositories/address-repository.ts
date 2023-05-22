import { prisma } from '@/lib/prisma';
import { Prisma, Address } from '@prisma/client';
import { IAddressRepository, IUpdateRequest } from './implementations/IAddressRepository';

export class AddresRepository implements IAddressRepository {
	async create(data: Prisma.AddressUncheckedCreateInput): Promise<Address> {
		const newAddres = await prisma.address.create({
			data,
		});

		return newAddres;
	}

	async update(addressId: string, data: IUpdateRequest): Promise<Address> {
		const address = await prisma.address.update({
			data,
			where: {
				id: addressId,
			},
		});

		return address;
	}

	async index(): Promise<Address[]> {
		return prisma.address.findMany();
	}

	async findById(id: string): Promise<Address | null> {
		return await prisma.address.findUnique({
			where: {
				id,
			},
		});
	}

	async findByCep(cep: string): Promise<Address | null> {
		return await prisma.address.findFirst({
			where: {
				CEP: cep,
			},
		});
	}

	searchMany(query: string, page: number): Promise<Address[]> {
		throw new Error('Method not implemented.');
	}
}
