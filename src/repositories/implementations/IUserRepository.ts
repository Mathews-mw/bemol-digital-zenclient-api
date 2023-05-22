import { Prisma, User } from '@prisma/client';

export interface IUpdateRequest {
	name?: string;
	email?: string;
	age?: number;
	phone?: string;
	updated_at: Date;
}

export interface IQuerySearch {
	search?: string;
	page: number;
}

export interface IUserRepository {
	create(data: Prisma.UserCreateInput): Promise<User>;
	update(userId: string, data: IUpdateRequest): Promise<User>;
	index({ search, page }: IQuerySearch): Promise<User[]>;
	findById(id: string): Promise<User | null>;
	findByEmail(email: string): Promise<User | null>;
}
