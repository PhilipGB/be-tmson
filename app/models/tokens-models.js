const db = require('../../db/connection');

exports.fetchTokenData = (start, end) => {
  const start_date = JSON.stringify(start);
  const end_date = JSON.stringify(end);
  return db
    .query(
      `
      SELECT *
      FROM token_transactions
      WHERE
       transaction_time >= $1
       AND transaction_time < $2`,
      [start_date, end_date]
    )
    .then((result) => {
      return result.rows;
    });
};

exports.fetchTokenById = (token_id) => {
  console.log(token_id);
  return db
    .query(
      `
      SELECT *
      FROM tokens
      WHERE token_id=$1;`,
      [token_id]
    )
    .then((result) => {
      if (result.rowCount) {
        return result.rows[0];
      }
      return Promise.reject({
        status: 404,
        msg: `No token found for ${token_id}`,
      });
    });
};
