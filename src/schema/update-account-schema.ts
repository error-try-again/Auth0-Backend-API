import Joi from 'joi';

export const userActionSchema = Joi.object({
  data: Joi.object({
    email: Joi.string().email()
  }).optional()
});