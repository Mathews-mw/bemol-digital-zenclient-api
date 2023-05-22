import { app } from '@/app';
import request from 'supertest';

import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Authenticate (E2E)', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('Should be able to authenticate', async () => {
		await request(app.server).post('/api/users/create').send({
			name: 'John Doe',
			email: 'john.doe@gmail.com',
			password: 'doe@123',
			age: 24,
			phone: '92999999999',
			rua: 'Avenida Jornalista Umberto Calderaro',
			numero: '320',
			bairro: 'Adrianópolis',
			cep: '69057015',
			cidade: 'Manaus',
			estado: 'Amazonas',
		});

		const response = await request(app.server).post('/api/authenticate').send({
			email: 'john.doe@gmail.com',
			password: 'doe@123',
		});

		expect(response.statusCode).toEqual(200);
		expect(response.body).toEqual(expect.objectContaining({ token: expect.any(String) }));
	});
});
