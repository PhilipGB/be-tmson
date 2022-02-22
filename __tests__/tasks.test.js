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
	test('responds with status: 200 and returns an array of task objects', () => {
		return request(app)
			.get('/api/tasks')
			.expect(200)
			.then(({ body: { tasks } }) => {
				tasks.forEach((task) => {
					expect(task).toMatchObject({
						task_id: expect.any(Number),
						skill_id: expect.any(Number),
						start_time: expect.any(String),
						end_time: expect.any(String),
						location: expect.any(String),
					});
				});
			});
	});
	test('responds with status: 404 and returns error message', () => {
		return request(app)
			.get('/api/task')
			.expect(404)
			.then(({ body }) => {
				expect(body).toEqual(
					expect.objectContaining({
						msg: 'Invalid URL',
					})
				);
			});
	});
	test('responds with status: 200 and returns an array of task objects sorted by skill_id in descending order', () => {
		return request(app)
			.get('/api/tasks?sort_by=skill_id&order=desc')
			.expect(200)
			.then(({ body: { tasks } }) => {
				expect(tasks).toBeSortedBy('skill_id', { descending: true });
			});
	});
	test('responds with status: 200 and returns an array of task objects sorted by query inputted and order inputted', () => {
		return request(app)
			.get('/api/tasks?sort_by=start_time&order=asc')
			.expect(200)
			.then(({ body: { tasks } }) => {
				expect(tasks).toBeSortedBy('start_time', { ascending: true });
			});
	});
});
