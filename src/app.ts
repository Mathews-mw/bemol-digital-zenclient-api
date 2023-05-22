import fastify from 'fastify';
import { ZodError } from 'zod';
import cors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';

import { env } from './env';
import { routes } from './routes/index.routes';

export const app = fastify();

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
	cookie: {
		cookieName: 'refreshToken',
		signed: false,
	},
	sign: {
		expiresIn: '10m',
	},
});

app.register(fastifyCookie);

app.register(cors, {
	origin: '*',
	methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
});
app.register(routes, { prefix: '/api' });

app.setErrorHandler((error, _, reply) => {
	if (error instanceof ZodError) {
		return reply.status(400).send({ message: 'Validation error', issues: error.format() });
	}

	if (env.NODE_ENV !== 'production') {
		console.log('handler error:', error);
	}

	return reply.status(500).send({ message: 'Internal server error.' });
});
