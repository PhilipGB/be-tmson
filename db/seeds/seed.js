const format = require("pg-format");
const db = require("../connection.js");

const seed = (data) => {
  const { TODO } = data;

  return (
    db
      // Drop tables
      .query(`DROP TABLE IF EXISTS ;`)
      .then(() => {
        return db.query(`DROP TABLE IF EXISTS ;`);
      })
      // Create tables
      .then(() => {
        return db.query(`
          CREATE TABLE  (
            
          );
        `);
      })

      // insert data
      .then(() => {
        const insertSomething = format(
          `
          INSERT INTO 
            ()
          VALUES
            %L;
        `,
          TODO.map(() => [])
        );
        return db.query(insertSomething);
      })
  );
};

module.exports = seed;
