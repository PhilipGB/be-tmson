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
	test('responds with status: 404 and returns error message when passed invalid path', () => {
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
	test('responds with status: 200 and returns an array of tasks object sorted by default as skill_id in descending order', () => {
		return request(app)
			.get('/api/tasks')
			.expect(200)
			.then(({ body: { tasks } }) => {
				expect(tasks).toBeSortedBy('skill_id', { descending: true });
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
	test('responds with status: 400 and error message when passed an invalid query', () => {
		return request(app)
			.get('/api/tasks?sort_by=skil_id&order=asc')
			.expect(400)
			.then(({ body: { msg } }) => {
				expect(msg).toBe('Bad request, Invalid Input');
			});
	});
	test('responds with status: 400 and error message when passed an invalid order', () => {
		return request(app)
			.get('/api/tasks?sort_by=skill_id&order=ascending')
			.expect(400)
			.then(({ body: { msg } }) => {
				expect(msg).toBe('Bad request, Invalid Input');
			});
	});
});

describe('GET /api/tasks/:task_id', () => {
	test('responds with status: 200 and returns array of task object', () => {
		return request(app)
			.get('/api/tasks/1')
			.expect(200)
			.then(({ body: { task } }) => {
				expect(task).toMatchObject({
					booker_id: 1,
					provider_id: 2,
					skill_id: 1,
					start_time: expect.any(String),
					end_time: expect.any(String),
					location: 'Zoom',
				});
			});
	});
	test('responds with status: 404 and error message when passed an ID that does not exist', () => {
		return request(app)
			.get('/api/tasks/3')
			.expect(404)
			.then(({ body: { msg } }) => {
				expect(msg).toBe('Not Found');
			});
	});
	test('responds with status: 400 and error message when passed an invalid data type ', () => {
		return request(app)
			.get('/api/tasks/newid')
			.expect(400)
			.then(({ body: { msg } }) => {
				expect(msg).toBe('Bad Request');
			});
	});
});

describe('PATCH /api/tasks/:task_id', () => {
	test('responds with status: 200 and returns updated task', () => {
		return request(app)
			.patch('/api/tasks/1')
			.send({
				booker_id: 1,
				provider_id: 1,
				skill_id: 1,
				start_time: new Date(2022, 1, 17, 19, 0),
				end_time: new Date(2022, 1, 17, 20, 0),
				location: 'The moon',
			})
			.expect(200)
			.then(({ body: { task } }) => {
				expect(task).toBeInstanceOf(Object);
				expect(task).toMatchObject({
					booker_id: 1,
					provider_id: 1,
					skill_id: 1,
					start_time: expect.any(String),
					end_time: expect.any(String),
					location: 'The moon',
				});
			});
	});

	test('responds with status: 400 and error message when passed an invalid id ', () => {
		return request(app)
			.patch('/api/tasks/notanid')
			.send({
				location: 'Not an ID',
			})
			.expect(400)
			.then(({ body: { msg } }) => {
				expect(msg).toBe('Bad Request');
			});
	});

	test('responds with status: 404 and error message with passed an ID that doesnt exist', () => {
		return request(app)
			.patch('/api/tasks/90')
			.send({ location: 'London' })
			.expect(404)
			.then(({ body: { msg } }) => {
				expect(msg).toBe('ID not found');
			});
	});
});
