const request = require('supertest');
const app = require('../src/app');

describe('Status Feature', () => {
  test('should get an object with status code 200', async () => {
    const response = await request(app).get('/status');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });
});