const db = require('../../db/connection');

exports.fetchTasks = (sort, order) => {
	const allowedSortBys = ['skill_id', 'start_time', 'end_time', 'location'];
	const allowedOrder = ['ASC', 'DESC', 'asc', 'desc'];

	if (sort === undefined || order === undefined) {
		sort = 'skill_id';
		order = 'DESC';
	} else if (sort === undefined) {
		sort = 'skill_id';
	} else if (order === undefined) {
		order = 'DESC';
	}

	if (!allowedSortBys.includes(sort) || !allowedOrder.includes(order)) {
		return Promise.reject({
			status: 400,
			msg: 'Bad request, Invalid Input',
		});
	}

	let queryStr =
		'SELECT task_id, skill_id, start_time, end_time, location FROM tasks';

	queryStr += ` ORDER BY ${sort} ${order}`;

	return db.query(queryStr).then(({ rows }) => {
		return rows;
	});
};

exports.fetchTaskById = (id) => {
	return db
		.query(`SELECT * FROM tasks WHERE task_id = $1`, [id])
		.then(({ rows }) => {
			if (!rows[0]) {
				return Promise.reject({
					status: 404,
					msg: 'Not Found',
				});
			}
			return rows[0];
		});
};
