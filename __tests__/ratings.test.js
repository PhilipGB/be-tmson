const request = require('supertest');
const app = require('../app/app.js');
const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('0. POST /api/ratings/', () => {
  test('responds with status: 200 and responds with newly posted rating', () => {
    return request(app)
      .post('/api/ratings')
      .send({
        task_id: 3,
        rating: 10,
        comment: 'fine',
      })
      .expect(201)
      .then(({ body: { rating } }) => {
        expect(rating).toBeInstanceOf(Object);
        expect(rating).toMatchObject({
          task_id: 3,
          rating: 10,
          comment: 'fine',
        });
      });
  });
  test('responds with status: 405 and error message when passed an incomplete request body ', () => {
    return request(app)
      .post('/api/ratings')
      .send({ comment: 'fine' })
      .expect(405)
      .then(({ body: { msg } }) => {
        expect(msg).toBe('Invalid request body');
      });
  });
});

describe('1. GET /notARoute', () => {
  test('responds with a status: 404 for invalid route', () => {
    return request(app)
      .get('/notARoute')
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

describe('2. GET /api/ratings', () => {
  test('status:200, responds with an object containing an array of objects containing task ratings', () => {
    return request(app)
      .get('/api/ratings')
      .expect(200)
      .then(({ body }) => {
        expect(typeof body).toEqual('object');
        expect(Array.isArray(body.ratings)).toEqual(true);
        expect(body.ratings[0]).toEqual({
          task_id: 1,
          rating: 7,
          comment: 'nulla',
          rating_id: 1,
        });
      });
  });
});

describe('3. GET /api/ratings/:user_id', () => {
  test('responds with status: 200 and returns an array of objects containing properties of task_id, rating and comment for that user', () => {
    return request(app)
      .get('/api/ratings/19')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeInstanceOf(Array);
        expect(body).toMatchObject([
          {
            task_id: 19,
            rating: 8,
            comment: 'ligula',
          },
        ]);
      });
  });
});
