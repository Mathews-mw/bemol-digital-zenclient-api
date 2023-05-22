import { FastifyInstance } from 'fastify';

import { authMiddleware } from '@/middlewares/auth-middleware';
import { editUserController } from '@/controllers/users/edit-user-controller';
import { indexUserController } from '@/controllers/users/index-users-controller';
import { createUserController } from '@/controllers/users/create-user-controller';
import { findUserByIdController } from '@/controllers/users/find-user-by-id-controller';
import { findUserByEmailController } from '@/controllers/users/find-user-by-email-controller';
import { getUserProfileController } from '@/controllers/users/get-user-profile-controller';

export async function usersRoutes(app: FastifyInstance) {
	app.get('/', indexUserController);
	app.get('/find-email', findUserByEmailController);
	app.get('/:userId/find-id', findUserByIdController);

	app.get('/profile', { onRequest: [authMiddleware] }, getUserProfileController);

	app.post('/create', createUserController);
	app.put('/edit/:userId', { onRequest: [authMiddleware] }, editUserController);
}
