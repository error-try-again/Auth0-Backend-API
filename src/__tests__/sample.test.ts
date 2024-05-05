import request from 'supertest';
import { app } from '../app';
import { config } from '../config/config';
import { expect } from '@jest/globals';

// const managementToken = 'eyJhbG';
const accessToken = config.auth0.accessToken;
const badAccessToken = 'eyJ';

describe('API Endpoints', () => {

  describe('Configuration Variables', () => {
    it('should have a defined PORT variable', () => {
      expect(config.port).toBeDefined();
      expect(typeof config.port).toBe('number');
    });

    it('should correctly set the TRUST_PROXY variable', () => {
      expect(config.trustProxy).toBeDefined();
      expect(config.trustProxy).toBe(1);
    });

    it('should correctly set the JSON_BODY_LIMIT variable', () => {
      expect(config.jsonBodyLimit).toBeDefined();
      expect(config.jsonBodyLimit).toBe('1mb');
    });

    it('should correctly set the ORIGIN variable', () => {
      expect(config.corsOrigin).toBeDefined();
      expect(config.corsOrigin).toBe(process.env.ORIGIN || 'http://localhost:5173');
    });

    it('should correctly set the USE_SSL variable', () => {
      expect(config.ssl).toBeDefined();
      expect(config.ssl).toBe(process.env.USE_SSL === 'true');
    });

    describe('Public Routes', () => {
      it('Public health check should return json with status ok', async () => {
        const { status, body } = await request(app).get('/public_health');
        expect(status).toBe(200);
        expect(body).toEqual({ status: 'ok' });
      });
    });

    describe('Protected Routes', () => {
      it('Protected endpoint protected_health should return json with status ok when authenticated', async () => {
        const { status, body } = await request(app)
        .get('/protected_health')
        .set('Authorization', `Bearer ${accessToken}`);
        expect(status).toBe(200);
        expect(body).toEqual({ status: 'ok' });
      });
    });

    describe('Protected Routes', () => {
      it('Protected endpoint list_users should return an array of all users with a 200 status code', async () => {
        const { status, body} = await request(app)
        .get('/list_users')
        .set('Authorization', `Bearer ${accessToken}`);
        expect(body).toMatchObject({ data: expect.any(Array) });
        expect(status).toBe(200);
      });
    });

    describe('Protected Routes', () => {
      it('Protected endpoint update_account should return a 422 status code on invalid data', async () => {
        const { status } = await request(app)
        .post('/update_account')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ userId: '1234', data: { name: 'test@test.com.au' } });
        expect(status).toBe(422);
      });
    });

    describe('Protected Routes', () => {
      it('Protected endpoint update_account should return a 401 status code on invalid data', async () => {
        const { status } = await request(app)
        .post('/update_account')
        .set('Authorization', `Bearer ${badAccessToken}`);
        expect(status).toBe(401);
      });
    });


    // Will return non-existent user error if the user ID is not found
    describe('Protected Routes', () => {
      it('Protected endpoint update_account should return a 200 status code on valid data', async () => {
        const { status } = await request(app)
        .post('/update_account')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          userId: 'google-oauth2|101883098026301126189',
          data: { email: 'yane.clarke1@gmail.com' }
        });
        expect(status).toBe(200);
      });
    });

    // Will timeout if the user does not exist
    describe('Protected Routes', () => {
      it('Protected endpoint delete_account should return a 204 status code on valid deletion', async () => {
        const { status } = await request(app)
        .post('/delete_account')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ userId: 'auth0|63f636f4e87141d9bb6e7cd6' });
        expect(status).toBe(204);
      });
    });
  });
});