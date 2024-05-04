import express from 'express';
import { validateRequest } from '../validators/request-validators';
import { asyncErrorHandler } from '../middleware/async-error-handler';
import { userActionSchema } from '../schema/update-account-schema';
import { deleteUser, listUsers } from '../operations/delete-user';
import { updateUser } from '../operations/update-user';

export const protectedRoutes = express.Router();

protectedRoutes.post('/delete_account', validateRequest(userActionSchema), asyncErrorHandler(async (request, response) => {
  const data = await deleteUser(request.body.userId);
  if (data) {
    response.status(204).json({ data });
  }
}));

protectedRoutes.post('/update_account', validateRequest(userActionSchema), asyncErrorHandler(async (request, response) => {
  const data = await updateUser(request.body.userId, request.body.data);
  if (data) {
    response.status(200).json({ data });
  }
}));

protectedRoutes.get('/list_users', asyncErrorHandler(async (_, response) => {
  const data = await listUsers();
  if (data) {
    response.status(200).json({ data });
  }
}));

protectedRoutes.get('/protected_health', async (_, response) => {
  response.status(200).json({ status: 'ok' });
});