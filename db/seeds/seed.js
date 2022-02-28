const format = require('pg-format');
const db = require('../connection.js');

const seed = (data) => {
  const {
    ratings,
    skill_categories,
    skills,
    tasks,
    token_transactions,
    tokens,
    users_skills,
    users,
  } = data;

  return (
    db
      // Drop tables
      .query(`DROP TABLE IF EXISTS ratings;`)
      .then(() => {
        return db.query(`DROP TABLE IF EXISTS token_transactions;`);
      })
      .then(() => {
        return db.query(`DROP TABLE IF EXISTS tasks;`);
      })
      .then(() => {
        return db.query(`DROP TABLE IF EXISTS tokens;`);
      })
      .then(() => {
        return db.query(`DROP TABLE IF EXISTS users_skills;`);
      })
      .then(() => {
        return db.query(`DROP TABLE IF EXISTS skills;`);
      })
      .then(() => {
        return db.query(`DROP TABLE IF EXISTS skill_categories;`);
      })
      .then(() => {
        return db.query(`DROP TABLE IF EXISTS users;`);
      })

      // TODO Create tables
      .then(() => {
        // DEFAULT value for testing
        return db.query(`
        CREATE TABLE  users (
          user_id SERIAL PRIMARY KEY,
          firebase_id VARCHAR(28) DEFAULT 'agLS9wrzWRUE64NGNfKqIrocBTG2' NOT NULL,
          username VARCHAR NOT NULL UNIQUE,
          first_name VARCHAR NOT NULL,
          last_name VARCHAR,
          birth_date TIMESTAMP,
          avatar_url VARCHAR NOT NULL,
          address VARCHAR NOT NULL,
          postcode VARCHAR(7),
          email_address VARCHAR NOT NULL,
          bio VARCHAR,
          minter BOOL DEFAULT false
        );
      `);
      })
      .then(() => {
        return db.query(`
        CREATE TABLE skill_categories (
          slug VARCHAR PRIMARY KEY,
          description VARCHAR
        );
      `);
      })
      .then(() => {
        return db.query(`
        CREATE TABLE skills (
          skill_id SERIAL PRIMARY KEY,
          skill_category VARCHAR REFERENCES skill_categories,
          skill_subcategory VARCHAR NOT NULL,
          skill_description VARCHAR,
          thumbnail_image_url VARCHAR
        );
      `);
      })
      .then(() => {
        return db.query(`
        CREATE TABLE users_skills (
          user_id INT REFERENCES users,
          skill_id INT REFERENCES skills
        );
      `);
      })
      .then(() => {
        return db.query(`
        CREATE TABLE tokens (
          token_id BIGSERIAL PRIMARY KEY,
          generated_date TIMESTAMP DEFAULT now(),
          owner_id INT REFERENCES users,
          minter_id INT REFERENCES users
        );
      `);
      })
      .then(() => {
        return db.query(`
        CREATE TABLE tasks (
          task_id SERIAL PRIMARY KEY,
          provider_id INT REFERENCES users NOT NULL,
          booker_id INT REFERENCES users ,
          skill_id INT REFERENCES skills NOT NULL,
          start_time TIMESTAMP,
          end_time TIMESTAMP,
          location VARCHAR NOT NULL
        );
      `);
      })
      .then(() => {
        return db.query(`
        CREATE TABLE token_transactions (
          transaction_id SERIAL PRIMARY KEY,
          token_id BIGINT REFERENCES tokens,
          task_id INT REFERENCES tasks,
          transaction_time TIMESTAMP DEFAULT now(),
          previous_transaction_id INT
        );
      `);
      })
      .then(() => {
        return db.query(`
        CREATE TABLE ratings (
          rating_id SERIAL PRIMARY KEY,
          task_id INT REFERENCES tasks,
          rating INT NOT NULL,
          comment VARCHAR
        );
      `);
      })

      // TODO insert data
      .then(() => {
        const insertUsers = format(
          `
          INSERT INTO users
            (username, first_name, last_name, birth_date, avatar_url, address, postcode, email_address, bio, minter)
          VALUES
            %L;
          `,
          users.map((user) => [
            user.username,
            user.first_name,
            user.last_name,
            user.birth_date,
            user.avatar_url,
            user.address,
            user.postcode,
            user.email_address,
            user.bio,
            user.minter,
          ])
        );
        return db.query(insertUsers);
      })
      .then(() => {
        const insertSkillCategories = format(
          `
          INSERT INTO skill_categories
            (slug, description)
          VALUES
            %L;
          `,
          skill_categories.map((category) => [
            category.slug,
            category.description,
          ])
        );
        return db.query(insertSkillCategories);
      })
      .then(() => {
        const insertSkills = format(
          `
          INSERT INTO skills
            (skill_category, skill_subcategory, skill_description, thumbnail_image_url)
          VALUES
            %L;
          `,
          skills.map((skill) => [
            skill.skill_category,
            skill.skill_subcategory,
            skill.skill_description,
            skill.thumbnail_image_url,
          ])
        );
        return db.query(insertSkills);
      })
      .then(() => {
        const insertUserSkills = format(
          `
          INSERT INTO users_skills
            (user_id, skill_id)
          VALUES
            %L;
          `,
          users_skills.map((skill) => [skill.user_id, skill.skill_id])
        );
        return db.query(insertUserSkills);
      })
      .then(() => {
        const insertTokens = format(
          `
          INSERT INTO tokens
            (token_id, generated_date, owner_id, minter_id)
          VALUES
            %L;
          `,
          tokens.map((token) => [
            token.token_id,
            token.generated_date,
            token.owner_id,
            token.minter_id,
          ])
        );
        return db.query(insertTokens);
      })
      .then(() => {
        const insertTasks = format(
          `
          INSERT INTO tasks
            (booker_id, provider_id, skill_id, start_time, end_time, location)
          VALUES
            %L;
          `,
          tasks.map((task) => [
            task.booker_id,
            task.provider_id,
            task.skill_id,
            task.start_time,
            task.end_time,
            task.location,
          ])
        );
        return db.query(insertTasks);
      })
      .then(() => {
        const insertTokenTransactions = format(
          `
          INSERT INTO token_transactions
            (token_id, task_id, transaction_time, previous_transaction_id)
          VALUES
            %L;
          `,
          token_transactions.map((transaction) => [
            transaction.token_id,
            transaction.task_id,
            transaction.transaction_time,
            transaction.previous_transaction_id,
          ])
        );
        return db.query(insertTokenTransactions);
      })
      .then(() => {
        const insertRatings = format(
          `
          INSERT INTO ratings
            (task_id, rating, comment)
          VALUES
            %L;
          `,
          ratings.map((rating) => [
            rating.task_id,
            rating.rating,
            rating.comment,
          ])
        );
        return db.query(insertRatings);
      })
  );
};

module.exports = seed;
