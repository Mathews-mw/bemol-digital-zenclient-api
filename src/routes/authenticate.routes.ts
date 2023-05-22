import { FastifyInstance } from 'fastify';
import { authenticateController } from '@/controllers/authenticate/authenticate-controller';
import { refreshTokenController } from '@/controllers/authenticate/refresh-token-controller';

export async function authRoutes(app: FastifyInstance) {
	app.post('/', authenticateController);
	app.patch('/refresh-token', refreshTokenController);
}
