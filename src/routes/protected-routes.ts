import express from 'express';
import { validateRequest } from '../validators/request-validators';
import { asyncErrorHandler } from '../middleware/async-error-handler';
import { userActionSchema } from '../schema/update-account-schema';
import { deleteUser } from '../operations/delete-user';
import { updateUser } from '../operations/update-user';

export const protectedRoutes = express.Router();

protectedRoutes.post(
  '/delete_account',
  validateRequest(userActionSchema),
  asyncErrorHandler(async (request, response) => {
    const userId = request.auth?.payload?.sub;
    if (userId) {
      const data = await deleteUser(userId);
      if (data) {
        response.status(204).json({ data });
      }
    }
  })
);

protectedRoutes.post(
  '/update_account',
  validateRequest(userActionSchema),
  asyncErrorHandler(async (request, response) => {
    const userId = request.auth?.payload?.sub;
    if (userId) {
      const data = await updateUser(userId, request.body.data);
      if (data) {
        response.status(200).json({ data });
      }
    }
  })
);

protectedRoutes.get('/protected_health', async (request, response) => {
  const userId = request.auth?.payload?.sub;
  if (userId) {
    console.log(userId);
    response.status(200).json({ status: 'ok' });
  }
});