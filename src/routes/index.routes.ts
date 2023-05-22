import { FastifyInstance } from 'fastify';
import { usersRoutes } from './users.routes';
import { authRoutes } from './authenticate.routes';

export async function routes(app: FastifyInstance) {
	app.register(authRoutes, { prefix: '/authenticate' });
	app.register(usersRoutes, { prefix: '/users' });
}
