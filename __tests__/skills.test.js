const request = require('supertest');
const app = require('../app/app.js');
const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('0. GET /notARoute', () => {
  it('responds with status: 404 for invalid route', () => {
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

describe('1. GET /api/skills', () => {
  test('status:200, responds with an object of all skills', () => {
    return request(app)
      .get('/api/skills')
      .expect(200)
      .then(({ body }) => {
        const { skill_categories } = body;
        expect(skill_categories).toHaveLength(5);
        skill_categories.forEach((skill) => {
          expect(skill).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
      });
  });
  test('responds with status: 404 for invalid route', () => {
    return request(app)
      .get('/api/notaroute')
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

describe('2. POST /api/skills', () => {
  test('status:201, accepts object of  an object of all skills', () => {
    const newSkill = {
      skill_category: 'languages',
      skill_subcategory: 'latin',
      skill_description:
        'Teach Latin speaking and listening to English speakers',
      thumbnail_image_url: 'http://dummyimage.com/138x100.png/ff4444/ffffff',
    };
    return request(app)
      .post('/api/skills')
      .send(newSkill)
      .expect(201)
      .then((res) => {
        expect(res.body).toEqual({
          skill_id: 26,
          skill_category: 'languages',
          skill_subcategory: 'latin',
          skill_description:
            'Teach Latin speaking and listening to English speakers',
          thumbnail_image_url:
            'http://dummyimage.com/138x100.png/ff4444/ffffff',
        });
      });
  });
  test('status:400, request body missing', () => {
    const newSkill = {
      skill_category: 'languages',
    };
    return request(app)
      .post('/api/skills')
      .send(newSkill)
      .expect(400)
      .then((res) => {
        expect(res.body).toEqual({ msg: 'Bad Request' });
      });
  });

  test('status:401, Invalid category', () => {
    const newSkill = {
      skill_category: 'invalid',
      skill_subcategory: 'invalid',
      skill_description: 'invalid',
      thumbnail_image_url: 'http://dummyimage.com/138x100.png/ff4444/ffffff',
    };
    return request(app)
      .post('/api/skills')
      .send(newSkill)
      .expect(400)
      .then((res) => {
        expect(res.body).toEqual({ msg: 'Bad Request' });
      });
  });
});
describe('3. GET /api/skills/categories/:skill', () => {
  test('status:200, responds with an object of all skills from selected category', () => {
    return request(app)
      .get('/api/skills/categories/languages')
      .expect(200)
      .then(({ body }) => {
        const { skills } = body;
        expect(skills).toHaveLength(5);
        skills.forEach((skill) => {
          expect(skill).toEqual(
            expect.objectContaining({
              skill_id: expect.any(Number),
              skill_category: expect.any(String),
              skill_subcategory: expect.any(String),
              thumbnail_image_url: expect.any(String),
            })
          );
        });
      });
  });
  test('status: 404, responds with "Bad Request - Invalid category" when category does not exist', () => {
    return request(app)
      .get('/api/skills/categories/notacategory')
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toEqual('No category found for "notacategory"');
      });
  });
  test('status: 400, responds with "Bad Request - Invalid category" when category is in wrong format', () => {
    return request(app)
      .get('/api/skills/categories/99999')
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toEqual('No category found for "99999"');
      });
  });
});

describe('4. GET /api/skills/:skill_id', () => {
  test('status:200, responds with an object of all skills', () => {
    return request(app)
      .get('/api/skills/1')
      .expect(200)
      .then(({ body }) => {
        const { skills } = body;
        expect(skills).toEqual(
          expect.objectContaining({
            skill_id: expect.any(Number),
            skill_category: expect.any(String),
            skill_subcategory: expect.any(String),
            thumbnail_image_url: expect.any(String),
          })
        );
      });
  });
});
