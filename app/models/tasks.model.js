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

  let queryStr = `SELECT 
      task_id,task_name, task_description, 
      skill_id, start_time, end_time, location 
    FROM tasks`;

  queryStr += ` ORDER BY ${sort} ${order}`;

  return db.query(queryStr).then(({ rows }) => {
    return rows;
  });
};

exports.fetchTaskById = (id) => {
  return db
    .query(
      `SELECT * 
    FROM tasks 
    INNER JOIN skills
    ON tasks.skill_id=skills.skill_id
    INNER JOIN users
    on tasks.booker_id=users.user_id
    WHERE task_id = $1`,
      [id]
    )
    .then(({ rows }) => {
      if (!rows[0]) {
        console.log(rows[0]);
        return Promise.reject({
          status: 404,
          msg: 'Not Found',
        });
      }
      return rows[0];
    });
};

exports.updateTaskById = (body, id) => {
  const { location } = body;
  const { skill_id } = body;
  const { booker_id } = body;
  const { provider_id } = body;
  const { start_time } = body;
  const { end_time } = body;

  return db
    .query(
      `UPDATE tasks SET location = $1, skill_id = $2, booker_id = $3, provider_id = $4, start_time = $5, end_time = $6 WHERE task_id = $7 RETURNING *`,
      [location, skill_id, booker_id, provider_id, start_time, end_time, id]
    )
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({
          status: 404,
          msg: 'ID not found',
        });
      } else {
        return rows[0];
      }
    });
};

exports.writeNewTask = (body) => {
  console.log(body);

  const {
    provider_id,
    skill_id,
    task_name,
    task_description,
    start_time,
    end_time,
    location,
  } = body;

  return db
    .query(
      `INSERT INTO tasks 
			(provider_id, skill_id, task_name, task_description, start_time, end_time, location)
		VALUES
			($1, $2, $3, $4, $5, $6, $7)
		RETURNING *
	`,
      [
        provider_id,
        skill_id,
        task_name,
        task_description,
        start_time,
        end_time,
        location,
      ]
    )
    .then(({ rows }) => {
      return rows[0];
    })
    .catch((err) => {
      console.log(err);
      if (err.code === '23502') {
        return Promise.reject({
          status: 405,
          msg: 'Invalid Request Body',
        });
      }
    });
};

exports.eraseTask = (id) => {
  return db
    .query(`DELETE FROM tasks WHERE task_id = $1 RETURNING *`, [id])
    .then(({ rows }) => {})
    .catch((err) => {
      console.log('Delete Error: >> ', err);
      throw err;
    });
};
