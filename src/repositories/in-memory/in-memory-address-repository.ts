import { randomUUID } from 'node:crypto';
import { Prisma, Address } from '@prisma/client';
import { IAddressRepository, IUpdateRequest } from '../implementations/IAddressRepository';

export class InMemoryAddressRepository implements IAddressRepository {
	private addresses: Address[] = [];

	async create(data: Prisma.AddressUncheckedCreateInput) {
		const newAddress = {
			id: randomUUID(),
			rua: data.rua,
			numero: data.numero,
			bairro: data.bairro,
			complemento: data.complemento ?? null,
			CEP: data.CEP,
			cidade: data.cidade,
			estado: data.estado,
		};

		this.addresses.push(newAddress);

		return newAddress;
	}

	async update(addressId: string, data: IUpdateRequest) {
		const addressIndex = this.addresses.findIndex((address) => address.id === addressId);

		if (addressIndex >= 0) {
			const address = this.addresses[addressIndex];

			const updatedAddress = {
				id: addressId,
				rua: data.rua ? data.rua : address.rua,
				numero: data.numero ? data.numero : address.numero,
				bairro: data.bairro ? data.bairro : address.bairro,
				complemento: data.complemento ? data.complemento : address.complemento,
				CEP: data.CEP ? data.CEP : address.CEP,
				cidade: address.cidade,
				estado: address.estado,
			};

			this.addresses[addressIndex] = updatedAddress;
		}

		return this.addresses[addressIndex];
	}

	async index() {
		return this.addresses;
	}

	async findById(id: string) {
		const address = this.addresses.find((org) => org.id === id);

		if (!address) {
			return null;
		}

		return address;
	}

	async findByCep(cep: string) {
		const address = this.addresses.find((address) => address.CEP === cep);

		if (!address) {
			return null;
		}

		return address;
	}

	async searchMany(query: string, page: number) {
		const addresses = this.addresses.filter((address) => address.cidade.toLowerCase().includes(query.toLowerCase()) || address.estado.toLocaleLowerCase().includes(query.toLowerCase()));

		return addresses.slice((page - 1) * 10, page * 10);
	}
}
