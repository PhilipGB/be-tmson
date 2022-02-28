const db = require('../../db/connection.js');

exports.selectUsers = (limit = 'ALL', offset = 0) => {
  return db
    .query(
      `
        SELECT *
        FROM users
        LIMIT ${limit} OFFSET ${offset};
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
  firebase_id,
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
          (firebase_id, username, first_name, 
            last_name, bio, birth_date, 
            avatar_url, address, postcode, 
            email_address, minter) 
        VALUES 
          ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
        RETURNING *;
      `,
      [
        firebase_id,
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
      if (err.code === '23502') {
        return Promise.reject({
          status: 405,
          msg: 'Invalid request body',
        });
      } else if (err.code === '23505') {
        return Promise.reject({
          status: 409,
          msg: 'Username already in use',
        });
      }
      console.error(err);
      throw err;
    });
};

exports.updateUser = (updatedUser, usernameEndpoint) => {
  const {
    user_id,
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
  } = updatedUser;

  return db
    .query(
      `
        UPDATE users 
        SET 
          username = $2,
          first_name = $3,
          last_name = $4,
          bio = $5,
          birth_date = $6,
          avatar_url = $7,
          address = $8,
          postcode = $9,
          email_address = $10,
          minter = $11
        WHERE user_id = $1
        RETURNING *;
      `,
      [
        user_id,
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
    .then((result) => {
      if (result.rowCount) {
        return result.rows[0];
      }
      return Promise.reject({
        status: 404,
        msg: `No user found for ${usernameEndpoint}`,
      });
    });
};
