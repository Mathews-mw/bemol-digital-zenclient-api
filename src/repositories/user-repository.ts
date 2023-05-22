import { prisma } from '@/lib/prisma';
import { Prisma, User } from '@prisma/client';
import { IQuerySearch, IUpdateRequest, IUserRepository } from './implementations/IUserRepository';

export class UserRepository implements IUserRepository {
	async create(data: Prisma.UserCreateInput): Promise<User> {
		const newUser = await prisma.user.create({
			data,
		});

		return newUser;
	}

	async update(userId: string, data: IUpdateRequest): Promise<User> {
		const user = await prisma.user.update({
			data,
			where: {
				id: userId,
			},
		});

		return user;
	}

	async index({ search, page }: IQuerySearch): Promise<User[]> {
		const users = prisma.user.findMany({
			where: {
				OR: [
					{
						name: {
							contains: search,
							mode: 'insensitive',
						},
					},
					{
						email: {
							contains: search,
							mode: 'insensitive',
						},
					},
				],
			},
			orderBy: {
				name: 'asc',
			},
			take: 10,
			skip: (page - 1) * 10,
		});

		return users;
	}

	async findById(id: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				id,
			},
		});

		return user;
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		return user;
	}
}
