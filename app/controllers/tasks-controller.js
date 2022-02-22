const { fetchTasks } = require('../models/tasks.model');

exports.getTasks = (req, res) => {
	fetchTasks().then((tasks) => {
		res.status(200).send({ tasks });
	});
};
