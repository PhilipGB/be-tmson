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
        expect(tokens).toEqual({
          total_tokens: '20',
          transactions_date_range: '3',
        });
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
  test('status:200, responds with updated token owner ', () => {
    return request(app)
      .patch('/api/tokens/2')
      .send({
        token_id: 2,
        owner_id: 17,
      })
      .expect(200)
      .then(({ body }) => {
        const { token } = body;
        expect(token).toEqual({
          generated_date: expect.any(String),
          minter_id: expect.any(Number),
          owner_id: 17,
          token_id: '2',
        });
      });
  });
  test('status:200, responds with updated token owner AND creates new transaction', () => {
    return request(app)
      .patch('/api/tokens/2')
      .send({
        minter_id: 1,
        token_id: 2,
        owner_id: 17,
      })
      .expect(200)
      .then(({ body }) => {
        const { token } = body;
        expect(token).toEqual({
          generated_date: expect.any(String),
          minter_id: 1,
          owner_id: 17,
          token_id: '2',
        });
      });
  });
});
