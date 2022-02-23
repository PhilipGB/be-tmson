const db = require("../../db/connection.js");

exports.selectUsers = () => {
  return db
    .query(
      `
        SELECT *
        FROM users;
      `
    )
    .then((result) => result.rows);
};

exports.selectUserByUsername = (username) => {
  return db
    .query(
      `
        SELECT *
        FROM users
        WHERE username = $1;
      `,
      [username]
    )
    .then((result) => {
      if (!result.rowCount) {
        return Promise.reject({
          status: 404,
          msg: `No user found for ${username}`,
        });
      }
      return result.rows[0];
    });
};

exports.insertUser = ({
  username,
  first_name,
  last_name,
  bio,
  birth_date,
  avatar_url,
  address,
  postcode,
  email_address,
  minter,
}) => {
  return db
    .query(
      `
        INSERT INTO users 
          (username, first_name, last_name,
            bio, birth_date, avatar_url,
            address, postcode, email_address,
            minter) 
        VALUES 
          ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
        RETURNING *;
      `,
      [
        username,
        first_name,
        last_name,
        bio,
        birth_date,
        avatar_url,
        address,
        postcode,
        email_address,
        minter,
      ]
    )
    .then(({ rows }) => rows[0])
    .catch((err) => {
      if (err.code === "23502") {
        return Promise.reject({
          status: 405,
          msg: "Invalid request body",
        });
      }

      throw err;
    });
};
