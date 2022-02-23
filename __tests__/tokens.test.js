const request = require('supertest');
const app = require('../app/app.js');
const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('1. GET /api/tokens', () => {
  test('status:200, responds with an object of data on token history', () => {
    return request(app)
      .get('/api/tokens?start=2022-01-01&end=2022-02-01')
      .expect(200)
      .then(({ body }) => {
        const { tokens } = body;
        expect(tokens).toHaveLength(3);
        expect(tokens).toEqual(
          expect.objectContaining({
            number_of_tokens: expect.any(Number),
            transactions: expect.any(Number),
          })
        );
      });
  });

  test('responds with status: 404 for invalid route', () => {
    return request(app)
      .get('/api/notaroutetoken')
      .expect(404)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            msg: 'Invalid URL',
          })
        );
      });
  });
});

describe('2. GET /api/tokens/:token_id', () => {
  test('status:200, responds with object containing token details', () => {
    return request(app)
      .get('/api/tokens/2')
      .expect(200)
      .then(({ body }) => {
        const { token } = body;
        expect(token).toEqual({
          token_id: '2',
          generated_date: expect.any(String),
          owner_id: 14,
          minter_id: 1,
        });
      });
  });
  test('status:404, responds with "Bad Request - Invalid token id" when token does not exist', () => {
    return request(app)
      .get('/api/tokens/2999')
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toEqual('No token found for 2999');
      });
  });
});

describe('4. PATCH /api/tokens:token_id', () => {
  test('should ', () => {});
});
