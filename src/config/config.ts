import Joi from 'joi';
import dotenv from 'dotenv';

dotenv.config();

// AUTH0_ACCESS_TOKEN is optional for testing
const environmentSchema = Joi.object({
  AUTH0_ACCESS_TOKEN: Joi.string(),
  AUTH0_AUDIENCE: Joi.string().required(),
  AUTH0_CLIENT_ID: Joi.string().required(),
  AUTH0_CLIENT_SECRET: Joi.string().required(),
  AUTH0_DOMAIN: Joi.string().required(),
  AUTH0_GRANT_TYPE: Joi.string().required(),
  AUTH0_ISSUER: Joi.string().required(),
  AUTH0_MANAGEMENT_AUDIENCE: Joi.string().required(),
  DOMAIN: Joi.string().required(),
  ORIGIN: Joi.string().default('http://localhost:8080'),
  PORT: Joi.number().default(8080),
  TOKEN_SIGNING_ALG: Joi.string().default('RS256'),
  USE_SSL: Joi.boolean().default(false)
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
    accessToken: value.AUTH0_ACCESS_TOKEN,
    grantType: value.AUTH0_GRANT_TYPE,
    managementAudience: value.AUTH0_MANAGEMENT_AUDIENCE
  },
  corsOrigin: value.ORIGIN,
  domain: value.DOMAIN,
  port: value.PORT,
  ssl: value.USE_SSL,
  jsonBodyLimit: '1mb',
  trustProxy: 1
};