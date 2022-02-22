const { getTasks } = require('../controllers/tasks-controller');

const tasksRouter = require('express').Router();
// const {} = require("../controllers/tasks-controllers.js");

tasksRouter
	.route('/')
	.get(getTasks)
	.post((req, res) => {
		res.status(200).send('All OK from POST /api/tasks');
	})
	.patch((req, res) => {
		res.status(200).send('All OK from PATCH /api/tasks');
	});

tasksRouter
	.route('/:skill')
	.get((req, res) => {
		res.status(200).send('All OK from GET /api/tasks/:username');
	})
	.patch((req, res) => {
		res.status(200).send('All OK from PATCH /api/tasks/:username');
	});

module.exports = tasksRouter;
