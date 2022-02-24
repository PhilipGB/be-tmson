const db = require('../../db/connection');

exports.fetchTokenData = (start, end) => {
  const start_date = JSON.stringify(start);
  const end_date = JSON.stringify(end);
  return db
    .query(
      `
      SELECT
          (SELECT COUNT (token_id) FROM tokens) AS total_tokens,
          COUNT (transaction_id) as transactions_date_range
      FROM
          token_transactions
      WHERE
          transaction_time >= $1
          AND transaction_time < $2;`,
      [start_date, end_date]
    )
    .then((result) => {
      return result.rows[0];
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

exports.updateTokenOwner = (token_id, owner_id) => {
  return db
    .query(
      `
      UPDATE tokens
      SET owner_id = $1
      WHERE token_id = $2
      RETURNING*;
      `,
      [owner_id, token_id]
    )
    .then((result) => {
      return result.rows[0];
    });
};

//`INSERT INTO token_transactions (token_id, task_id, previous_transaction)`

// Struggling to create a transaction from the object provided - missing TASK_ID.
// Could insert previous_transaction from a SELECT?
