const db = require('../../db/connection');

exports.fetchTasks = () => {
	return db.query(`SELECT * FROM tasks`).then(({ rows }) => {
		return rows;
	});
};
