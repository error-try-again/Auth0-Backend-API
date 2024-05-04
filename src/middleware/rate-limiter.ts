import rateLimit from 'express-rate-limit';

export const singleLimiter = rateLimit({
  limit: 10,
  windowMs: 15 * 60 * 1000
});