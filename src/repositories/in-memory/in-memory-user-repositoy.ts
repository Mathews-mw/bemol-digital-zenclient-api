import { randomUUID } from 'node:crypto';
import { Prisma, User } from '@prisma/client';
import { IUserRepository, IUpdateRequest, IQuerySearch } from '../implementations/IUserRepository';

export class InMemoryUserRepository implements IUserRepository {
	public users: User[] = [];

	async create(data: Prisma.UserCreateInput): Promise<User> {
		const newUser = {
			id: randomUUID(),
			name: data.name,
			email: data.email,
			password: data.password,
			age: data.age,
			phone: data.phone ?? null,
			role: data.role ? data.role : 'CLIENT',
			created_at: new Date(),
			updated_at: null,
		};

		this.users.push(newUser);

		return newUser;
	}

	async update(userId: string, data: IUpdateRequest) {
		const userIndex = this.users.findIndex((user) => user.id === userId);

		if (userIndex >= 0) {
			const user = this.users[userIndex];

			const updatedUser = {
				id: userId,
				name: data.name ? data.name : user.name,
				email: data.email ? data.email : user.email,
				password: user.password,
				age: data.age ? data.age : user.age,
				phone: data.phone ? data.phone : user.phone,
				role: user.role,
				created_at: user.created_at,
				updated_at: new Date(),
			};

			this.users[userIndex] = updatedUser;
		}

		return this.users[userIndex];
	}

	async index({ search, page }: IQuerySearch): Promise<User[]> {
		const users = this.users;

		if (search) {
			return users
				.filter((user) => user.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || user.email.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
				.slice((page - 1) * 10, page * 10);
		}

		return users.slice((page - 1) * 10, page * 10);
	}

	async findById(id: string): Promise<User | null> {
		const user = this.users.find((user) => user.id === id);

		if (!user) {
			return null;
		}

		return user;
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = this.users.find((user) => user.email === email);

		if (!user) {
			return null;
		}

		return user;
	}
}
