import { Address, User } from '@prisma/client';

import { UnderageUserError } from '../errors/underage-user-error';
import { CepIsNotValidError } from '../errors/cep-not-valid-error';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { IUserRepository } from '@/repositories/implementations/IUserRepository';
import { IAddressRepository } from '@/repositories/implementations/IAddressRepository';
import { IUserAddressRepository } from '@/repositories/implementations/IUserAddressRepository';

interface IUpdateUseCaseRequest {
	userId: string;
	name?: string;
	email?: string;
	age?: number;
	phone?: string;
	rua?: string;
	numero?: string;
	bairro?: string;
	complemento?: string;
	cep?: string;
}

interface IUpdateUserUseCaseResponse {
	user: User;
	address: Address;
}

export class EditUserUseCase {
	constructor(private userRepository: IUserRepository, private addressRepository: IAddressRepository, private userAddressRepository: IUserAddressRepository) {}

	async execute({ userId, name, email, age, phone, rua, numero, bairro, complemento, cep }: IUpdateUseCaseRequest): Promise<IUpdateUserUseCaseResponse> {
		const user = await this.userRepository.findById(userId);

		if (!user) {
			throw new ResourceNotFoundError();
		}

		if (cep) {
			const isCepFromManaus = cep.slice(0, 2) === '69';

			if (!isCepFromManaus) {
				throw new CepIsNotValidError();
			}
		}

		if (age) {
			const underEighteenYearsOld = age < 18;
			if (underEighteenYearsOld) {
				throw new UnderageUserError();
			}
		}

		const userAddress = await this.userAddressRepository.findByUserId(user.id);

		if (!userAddress) {
			throw new ResourceNotFoundError();
		}

		const userUpdate = await this.userRepository.update(userId, {
			name,
			email,
			age,
			phone,
			updated_at: new Date(),
		});

		const addressUpdate = await this.addressRepository.update(userAddress.address_id, {
			rua,
			numero,
			bairro,
			complemento,
			CEP: cep,
		});

		return {
			user: userUpdate,
			address: addressUpdate,
		};
	}
}
