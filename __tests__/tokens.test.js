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

describe('5. POST /api/tokens', () => {
  test('status:200, responds with new token', () => {
    return request(app)
      .post('/api/tokens')
      .send({
        minter_id: 1,
        owner_id: 2,
      })
      .expect(200)
      .then(({ body }) => {
        const { token } = body;
        expect(token).toEqual({
          generated_date: expect.any(String),
          minter_id: expect.any(Number),
          owner_id: 2,
          token_id: expect.any(String),
        });
      });
  });
});

describe('6. GET /api/tokens/users/:user_id', () => {
  test('status:200, responds with new token', () => {
    return request(app)
      .get('/api/tokens/users/7')
      .expect(200)
      .then(({ body }) => {
        const { tokens } = body;
        expect(tokens[0]).toEqual({
          address: '90 Acker Place',
          avatar_url: 'https://robohash.org/estidquae.png?size=50x50&set=set1',
          bio: 'Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat.',
          birth_date: '1946-10-11T00:00:00.000Z',
          email_address: 'rkleinfeld6@cmu.edu',
          firebase_id: 'dDmmSCBxSIUPLmkYavCw7RFxtTQ2',
          first_name: 'Rachele',
          generated_date: '2022-02-18T06:56:21.000Z',
          last_name: 'Kleinfeld',
          minter: false,
          minter_id: 1,
          owner_id: 7,
          postcode: 'LE15',
          token_id: '1',
          user_id: 7,
          username: 'rkleinfeld6',
        });
      });
  });
});

describe.only('7. POST /api/tokens/transactions', () => {
  test('status:200, responds with new token', () => {
    return request(app)
      .post('/api/tokens/transactions')
      .send({
        token_id: 2,
        task_id: 2,
      })
      .expect(200)
      .then(({ body }) => {
        const { transaction } = body;
        expect(transaction).toEqual({
          transaction_id: 21,
          token_id: '2',
          task_id: 2,
          transaction_time: expect.any(String),
          previous_transaction_id: null,
        });
      });
  });
});
