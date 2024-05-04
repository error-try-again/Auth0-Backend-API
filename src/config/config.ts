import Joi from 'joi';
import dotenv from 'dotenv';

dotenv.config();

const environmentSchema = Joi.object({
  AUTH0_AUDIENCE: Joi.string().required(),
  AUTH0_CLIENT_ID: Joi.string().required(),
  AUTH0_CLIENT_SECRET: Joi.string().required(),
  AUTH0_DOMAIN: Joi.string().required(),
  AUTH0_ISSUER: Joi.string().required(),
  DOMAIN: Joi.string().required(),
  PORT: Joi.number().default(8080),
  ORIGIN: Joi.string().default('http://localhost:8080'),
  USE_SSL: Joi.boolean().default(false),
  TOKEN_SIGNING_ALG: Joi.string().default('RS256'),
  AUTH0_ACCESS_TOKEN: Joi.string().required()
}).unknown();

const { error, value } = environmentSchema.validate(process.env);

if (error) {
  throw new Error(`Configuration validation error: ${error.message}`);
}

export const config = {
  auth0: {
    audience: value.AUTH0_AUDIENCE,
    clientId: value.AUTH0_CLIENT_ID,
    clientSecret: value.AUTH0_CLIENT_SECRET,
    domain: value.AUTH0_DOMAIN,
    issuer: value.AUTH0_ISSUER,
    tokenSigningAlg: value.TOKEN_SIGNING_ALG,
    accessToken: value.AUTH0_ACCESS_TOKEN
  },
  corsOrigin: value.ORIGIN,
  domain: value.DOMAIN,
  port: value.PORT,
  ssl: value.USE_SSL === 'true',
  jsonBodyLimit: '1mb',
  trustProxy: 1
};