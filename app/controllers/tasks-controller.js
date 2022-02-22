const { fetchTasks, fetchTaskById } = require('../models/tasks.model');

exports.getTasks = (req, res, next) => {
	const { sort_by } = req.query;
	const { order } = req.query;
	fetchTasks(sort_by, order)
		.then((tasks) => {
			res.status(200).send({ tasks });
		})
		.catch(next);
};

exports.getTaskById = (req, res, next) => {
	const { task_id } = req.params;
	fetchTaskById(task_id)
		.then((task) => {
			res.status(200).send({ task });
		})
		.catch(next);
};
