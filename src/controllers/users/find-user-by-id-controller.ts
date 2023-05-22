import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';

import { ResourceNotFoundError } from '@/useCases/errors/resource-not-found-error';
import { makeFindUserByIdUseCase } from '@/useCases/factories/users/make-find-user-by-id-use-case';

export async function findUserByIdController(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
	const findUserParamsSchema = z.object({
		userId: z.string().uuid(),
	});

	const { userId } = findUserParamsSchema.parse(request.params);

	try {
		const findUserByIdUseCase = makeFindUserByIdUseCase();

		const user = await findUserByIdUseCase.execute({
			id: userId,
		});

		return reply.status(200).send(user);
	} catch (error) {
		if (error instanceof ResourceNotFoundError) {
			return reply.status(409).send({ message: error.message });
		}

		console.log('findUserByIdController: ', error);
		return reply.status(500).send();
	}
}
