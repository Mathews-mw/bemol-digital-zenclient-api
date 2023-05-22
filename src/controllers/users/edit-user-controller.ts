import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';

import { UnderageUserError } from '@/useCases/errors/underage-user-error';
import { CepIsNotValidError } from '@/useCases/errors/cep-not-valid-error';
import { ResourceNotFoundError } from '@/useCases/errors/resource-not-found-error';
import { makeEditUserUSeCase } from '@/useCases/factories/users/make-edit-user-use-case';

export async function editUserController(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
	const editUserParamsSchema = z.object({
		userId: z.string().uuid(),
	});

	const editBodySchema = z.object({
		name: z.optional(z.string()),
		email: z.optional(z.string()),
		age: z.optional(z.coerce.number()),
		phone: z.optional(z.string()),
		rua: z.optional(z.string()),
		numero: z.optional(z.string()),
		bairro: z.optional(z.string()),
		complemento: z.optional(z.string()),
		cep: z.optional(z.string()),
	});

	const { userId } = editUserParamsSchema.parse(request.params);
	const { name, email, age, phone, rua, numero, bairro, complemento, cep } = editBodySchema.parse(request.body);

	try {
		const editUserUseCase = makeEditUserUSeCase();

		await editUserUseCase.execute({
			userId,
			name,
			email,
			age,
			phone,
			rua,
			numero,
			bairro,
			complemento,
			cep,
		});

		return reply.status(204).send({ message: 'Usuário editado com sucesso' });
	} catch (error) {
		if (error instanceof ResourceNotFoundError) {
			return reply.status(409).send({ message: error.message });
		} else if (error instanceof CepIsNotValidError) {
			return reply.status(409).send({ message: error.message });
		} else if (error instanceof UnderageUserError) {
			return reply.status(409).send({ message: error.message });
		}

		console.log('edit-user-controller: ', error);
		return reply.status(500).send();
	}
}
