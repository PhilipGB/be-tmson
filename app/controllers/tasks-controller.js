const { fetchTasks } = require('../models/tasks.model');

exports.getTasks = (req, res, next) => {
	const { sort_by } = req.query;
	const { order } = req.query;
	fetchTasks(sort_by, order)
		.then((tasks) => {
			res.status(200).send({ tasks });
		})
		.catch(next);
};
