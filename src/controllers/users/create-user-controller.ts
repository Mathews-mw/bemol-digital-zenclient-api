import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';

import { UnderageUserError } from '@/useCases/errors/underage-user-error';
import { CepIsNotValidError } from '@/useCases/errors/cep-not-valid-error';
import { UserAlreadyExistsError } from '@/useCases/errors/user-already-exists-error';
import { makeCreateUserUSeCase } from '@/useCases/factories/users/make-create-user-use-case';

export async function createUserController(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
	const createBodySchema = z.object({
		name: z.string(),
		email: z.string(),
		password: z.string(),
		age: z.coerce.number(),
		phone: z.optional(z.string()),
		rua: z.string(),
		numero: z.string(),
		bairro: z.string(),
		complemento: z.optional(z.string()),
		cep: z.string(),
		cidade: z.string(),
		estado: z.string(),
	});

	const { name, email, password, age, phone, rua, numero, bairro, complemento, cep, cidade, estado } = createBodySchema.parse(request.body);

	try {
		const createUserUseCase = makeCreateUserUSeCase();

		await createUserUseCase.execute({
			name,
			email,
			password,
			age,
			phone,
			rua,
			numero,
			bairro,
			complemento,
			cep,
			cidade,
			estado,
		});

		return reply.status(201).send({ message: 'Usuário cadastrado com sucesso' });
	} catch (error) {
		if (error instanceof UserAlreadyExistsError) {
			return reply.status(409).send({ message: error.message });
		} else if (error instanceof CepIsNotValidError) {
			return reply.status(409).send({ message: error.message });
		} else if (error instanceof UnderageUserError) {
			return reply.status(409).send({ message: error.message });
		}

		console.log('create-user-controller: ', error);
		return reply.status(500).send();
	}
}
