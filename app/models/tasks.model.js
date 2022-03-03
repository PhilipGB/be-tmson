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
      *
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
        return Promise.reject({
          status: 404,
          msg: 'Not Found',
        });
      }
      return rows[0];
    });
};
// amend this to take update on task_complete?
exports.updateTaskById = (body, id) => {
  const { booker_id } = body;
  const { provider_id } = body;
  const { location } = body;
  const { skill_id } = body;
  const { task_name } = body;
  const { task_description } = body;
  const { start_time } = body;
  const { end_time } = body;
  const { task_booking_confirmed } = body;
  const { task_completed } = body;

  return db
    .query(
      `UPDATE tasks SET booker_id = $1, provider_id = $2, location = $3, skill_id = $4, task_name = $5, task_description = $6, start_time = $7, end_time = $8, task_booking_confirmed = $9, task_completed = $10  WHERE task_id = $11 RETURNING *`,
      [booker_id, provider_id, location, skill_id, task_name, task_description, start_time, end_time, task_booking_confirmed, task_completed, id]
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
  const {
    booker_id,
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
			(booker_id, skill_id, task_name, task_description, start_time, end_time, location)
		VALUES
			($1, $2, $3, $4, $5, $6, $7)
		RETURNING *
	`,
      [
        booker_id,
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
      throw err;
    });
};

// added end point to get tasks by user ID that are still live
exports.fetchUserTasks = (user_id) => {
  return db
    .query(
      `SELECT * 
    FROM tasks 
    WHERE booker_id = $1
    AND task_complete = false
    RETURNING*;`,
      [user_id]
    )
    .then(({ rows }) => {
      if (!rows[0]) {
        console.log(rows[0]);
        return Promise.reject({
          status: 404,
          msg: 'Not Found',
        });
      }
      return rows;
    });
};

exports.approveTaskById = (task_id) => {
  return db
    .query(
      `UPDATE tasks SET task_completed=true 
      WHERE task_id=$1
      RETURNING *`,
      [task_id]
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
