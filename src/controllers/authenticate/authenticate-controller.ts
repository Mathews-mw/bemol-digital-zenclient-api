import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';

import { InvalidCredentialsError } from '@/useCases/errors/invalid-credentials-error';
import { makeAuthenticateUseCase } from '@/useCases/factories/authenticate/make-authenticate-use-case';

export async function authenticateController(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
	const registerBodySchema = z.object({
		email: z.string().email(),
		password: z.string(),
	});

	const { email, password } = registerBodySchema.parse(request.body);

	try {
		const authenticateUseCase = makeAuthenticateUseCase();

		const { user } = await authenticateUseCase.execute({
			email,
			password,
		});

		const token = await reply.jwtSign(
			{
				role: user.role,
			},
			{
				sign: {
					sub: user.id,
				},
			}
		);

		const refreshToken = await reply.jwtSign(
			{
				role: user.role,
			},
			{
				sign: {
					sub: user.id,
					expiresIn: '7d',
				},
			}
		);

		return reply
			.setCookie('refreshToken', refreshToken, {
				path: '/',
				secure: true,
				sameSite: true,
				httpOnly: true,
			})
			.status(200)
			.send({
				token,
				user: {
					id: user.id,
					email: user.email,
					role: user.role,
				},
			});
	} catch (error) {
		if (error instanceof InvalidCredentialsError) {
			return reply.status(409).send({ message: error.message });
		}

		console.log('authenticate-controller-error: ', error);
		throw error;
	}
}
