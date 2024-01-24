import request from 'supertest';
import { fastify } from './index.js';
import { describe, test, expect, beforeAll } from '@jest/globals';

describe('Fastify server test', () => {
  beforeAll(async () => {
    await fastify.ready();
  });

  test('should respond with a 200 status code for GET /habits', async () => {
    const response = await request(fastify.server).get('/habits');
    expect(response.statusCode).toBe(200);
  });

  // Add more tests for other routes and methods
});