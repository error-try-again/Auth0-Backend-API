import express from 'express';

export const publicRoutes = express.Router();

publicRoutes.get('/public_health', (_, response) => {
  response.json({ status: 'ok' });
});