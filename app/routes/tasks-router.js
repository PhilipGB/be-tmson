const {
	getTasks,
	getTaskById,
	patchTaskById,
} = require('../controllers/tasks-controller');

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

tasksRouter.route('/:task_id').get(getTaskById).patch(patchTaskById);

module.exports = tasksRouter;
