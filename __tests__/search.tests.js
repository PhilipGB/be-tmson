const request = require('supertest');
const app = require('../app/app.js');
const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('Search end point tests', () => {
  it('1. Empty search returns request for search parameters', () => {
    return request(app)
      .get('/api/search')
      .expect(400)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            msg: `Please provide a search string`,
          })
        );
      });
  });
  it('2. Array of results for single word search string', () => {
    return request(app)
      .get('/api/search?q=cleaning')
      .expect(200)
      .then((res) => {
        console.log(res.body);
        expect(res.body).toEqual(
          expect.objectContaining({
            results: expect.any(Array),
          })
        );
      });
  });
  it('3. Array of results for multi word search string', () => {
    return request(app)
      .get('/api/search?q=french russian')
      .expect(200)
      .then((res) => {
        console.log(res.body);
        expect(res.body).toEqual(
          expect.objectContaining({
            results: expect.any(Array),
          })
        );
      });
  });
  it('4. Array of results for multi word search string in quotes', () => {
    return request(app)
      .get('/api/search?q="Task 4"')
      .expect(200)
      .then((res) => {
        console.log(res.body);
        expect(res.body).toEqual(
          expect.objectContaining({
            results: expect.any(Array),
          })
        );
      });
  });

  it('4. Array of results for multi word search string in quotes by descrption, category or sub categry', () => {
    return request(app)
      .get('/api/search?q="Task 1" household french')
      .expect(200)
      .then((res) => {
        console.log(res.body);
        expect(res.body).toEqual(
          expect.objectContaining({
            results: expect.any(Array),
          })
        );
      });
  });

  it.only('5. Array of results for multi word search string based on skill description', () => {
    return request(app)
      .get('/api/search?q=speaking listening')
      .expect(200)
      .then((res) => {
        console.log(res.body);
        expect(res.body).toEqual(
          expect.objectContaining({
            results: expect.any(Array),
          })
        );
      });
  });
});
