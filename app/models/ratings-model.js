const db = require("../../db/connection.js");

exports.insertNewRating = (body) => {
  const { task_id } = body;
  const { rating } = body;
  const { comment } = body;

  return db
    .query(
      `
        INSERT INTO ratings 
          (task_id, rating, comment) 
        VALUES 
          ($1, $2, $3) 
        RETURNING *;
      `,
      [
        task_id,
        rating,
        comment,
      ]
    )
    .then(({ rows }) => {
        return rows[0];
    })
    .catch((err) => {
      if (err.code === "23502") {
        return Promise.reject({
          status: 405,
          msg: "Invalid request body",
        });
      }
    });
};

exports.fetchRatings = () => {
    return db
    .query(
        `
        SELECT *
        FROM ratings;
        `
    )
    .then((result) => result.rows);
};

exports.fetchRatingsByUserID = (user_id) => {
    return db
    .query(
        `
        SELECT *
        FROM tasks
        INNER JOIN ratings
        ON tasks.task_id=ratings.task_id
        WHERE booker_id = $1;
        `, 
        [user_id]
    )
    .then((result) => {
        if (!result.rowCount) {
            return Promise.reject({
                status: 404,
                msg: `No user found for user ID:${user_id}`,      
            });
        }
        return result.rows;
    });
};
