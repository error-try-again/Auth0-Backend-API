import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

export const validateRequest =
  (schema: Joi.ObjectSchema) =>
  (request: Request, response: Response, next: NextFunction) => {
    const { error } = schema.validate(request.body, { abortEarly: false });
    if (error) {
      response.status(422).json({
        details: error.details.map(detail => detail.message),
        error: 'Validation error'
      });
    } else {
      next();
    }
  };