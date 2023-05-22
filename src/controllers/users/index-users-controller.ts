import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';

import { makeIndexUsersUSeCase } from '@/useCases/factories/users/make-index-users-use-case';

export async function indexUserController(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
	const indexUserQuerySchema = z.object({
		search: z.optional(z.string()),
		page: z.coerce.number().default(1),
	});

	const { search, page } = indexUserQuerySchema.parse(request.query);

	try {
		const indexUsersUseCase = makeIndexUsersUSeCase();

		const { users } = await indexUsersUseCase.execute({
			search,
			page,
		});

		return reply.status(200).send(users);
	} catch (error) {
		console.log('indexUserController: ', error);
		return reply.status(500).send();
	}
}
