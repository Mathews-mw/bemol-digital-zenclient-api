import { hash } from 'bcryptjs';
import { Address, User } from '@prisma/client';

import { UnderageUserError } from '../errors/underage-user-error';
import { CepIsNotValidError } from '../errors/cep-not-valid-error';
import { UserAlreadyExistsError } from '../errors/user-already-exists-error';
import { IUserRepository } from '@/repositories/implementations/IUserRepository';
import { IAddressRepository } from '@/repositories/implementations/IAddressRepository';
import { IUserAddressRepository } from '@/repositories/implementations/IUserAddressRepository';

interface ICreateUserUseCaseRequest {
	name: string;
	email: string;
	password: string;
	age: number;
	phone?: string;
	rua: string;
	numero: string;
	bairro: string;
	complemento?: string;
	cep: string;
	cidade: string;
	estado: string;
}

interface ICreateUserUseCaseResponse {
	user: User;
	address: Address;
}

export class CreateUserUseCase {
	constructor(private userRepository: IUserRepository, private addressRepository: IAddressRepository, private userAddressRepository: IUserAddressRepository) {}

	async execute({ name, email, password, age, phone, rua, numero, bairro, complemento, cep, cidade, estado }: ICreateUserUseCaseRequest): Promise<ICreateUserUseCaseResponse> {
		const underEighteenYearsOld = age < 18;
		const isCepFromManaus = cep.slice(0, 2) === '69';

		if (!isCepFromManaus) {
			throw new CepIsNotValidError();
		}

		if (underEighteenYearsOld) {
			throw new UnderageUserError();
		}

		const userAlreadyExists = await this.userRepository.findByEmail(email);

		if (userAlreadyExists) {
			throw new UserAlreadyExistsError();
		}

		const passwordHash = await hash(password, 6);

		const user = await this.userRepository.create({
			name,
			email,
			password: passwordHash,
			age,
			phone,
		});

		const address = await this.addressRepository.create({
			rua,
			numero,
			bairro,
			complemento,
			CEP: cep,
			cidade,
			estado,
		});

		await this.userAddressRepository.create({
			user_id: user.id,
			address_id: address.id,
		});

		return {
			user,
			address,
		};
	}
}
