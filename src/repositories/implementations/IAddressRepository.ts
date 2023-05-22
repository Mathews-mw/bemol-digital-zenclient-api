import { Address, Prisma } from '@prisma/client';

export interface IUpdateRequest {
	rua?: string;
	numero?: string;
	bairro?: string;
	complemento?: string;
	CEP?: string;
}

export interface IAddressRepository {
	create(data: Prisma.AddressUncheckedCreateInput): Promise<Address>;
	update(addressId: string, data: IUpdateRequest): Promise<Address>;
	index(): Promise<Address[]>;
	findById(id: string): Promise<Address | null>;
	findByCep(cep: string): Promise<Address | null>;
	searchMany(query: string, page: number): Promise<Address[]>;
}
