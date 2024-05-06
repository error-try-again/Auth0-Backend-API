import rateLimit from 'express-rate-limit';

// Rate limit for a single endpoint with a limit of 10 requests per 15 minutes
export const singleLimiter = rateLimit({
  limit: 50,
  windowMs: 15 * 60 * 1000
});