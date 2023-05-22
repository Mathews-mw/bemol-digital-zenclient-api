import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';

import { ResourceNotFoundError } from '@/useCases/errors/resource-not-found-error';
import { makeFindUserByEmailUSeCase } from '@/useCases/factories/users/make-find-user-by-email-use-case';

export async function findUserByEmailController(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
	const findUserQuerySchema = z.object({
		email: z.string().email(),
	});

	const { email } = findUserQuerySchema.parse(request.query);

	try {
		const findUserByEmailUseCase = makeFindUserByEmailUSeCase();

		const user = await findUserByEmailUseCase.execute({
			email,
		});

		return reply.status(200).send(user);
	} catch (error) {
		if (error instanceof ResourceNotFoundError) {
			return reply.status(409).send({ message: error.message });
		}

		console.log('findUserByEmailController: ', error);
		return reply.status(500).send();
	}
}
