import Joi from 'joi';

export const userActionSchema = Joi.object({
  data: Joi.object({
    email: Joi.string().email()
  }).optional(),
  // Alphanumerical, greater than 12, includes |
  userId: Joi.string().pattern(/^[\dA-Za-z|]{13,}$/)
});