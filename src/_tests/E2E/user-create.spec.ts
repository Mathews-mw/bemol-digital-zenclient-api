import { app } from '@/app';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Create User (E2E)', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('Should be able to create an user', async () => {
		const response = await request(app.server).post('/api/users/create').send({
			name: 'John Doe',
			email: 'john.doe@gmail.com',
			password: 'doe@123',
			age: 22,
			phone: '92999999999',
			rua: 'Avenida Jornalista Umberto Calderaro',
			numero: '320',
			bairro: 'Adrianópolis',
			cep: '69057015',
			cidade: 'Manaus',
			estado: 'Amazonas',
		});

		expect(response.statusCode).toEqual(201);
	});
});
