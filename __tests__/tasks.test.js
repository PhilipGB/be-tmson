const request = require('supertest');
const app = require('../app/app.js');
const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('0. GET /notARoute', () => {
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

describe('1. GET /api/tasks', () => {
	test('responds with status: 200 and returns array of task objects', () => {
		return request(app)
			.get('/api/tasks')
			.expect(200)
			.then(({ body: { tasks } }) => {
				tasks.forEach((task) => {
					expect(task).toMatchObject({
						booker_id: expect.any(Number),
						provider_id: expect.any(Number),
						skill_id: expect.any(Number),
						start_time: expect.any(String),
						end_time: expect.any(String),
						location: expect.any(String),
					});
				});
			});
	});
});
