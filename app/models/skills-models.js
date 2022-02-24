const db = require('../../db/connection');

exports.fetchSkills = (limit = 'ALL', offset = 0) => {
  return db
    .query(
      `SELECT *
      FROM skill_categories
      LIMIT ${limit}
      OFFSET ${offset};`
    )
    .then((result) => {
      return result.rows;
    });
};

exports.fetchSkillsByCategory = (category, limit = 'ALL', offset = 0) => {
  return db
    .query(
      `
        SELECT * 
        FROM skills
        WHERE skill_category=$1
        LIMIT ${limit}
        OFFSET ${offset};`,
      [category]
    )
    .then((result) => {
      if (result.rowCount) {
        return result.rows;
      }
      return Promise.reject({
        status: 404,
        msg: `No category found for "${category}"`,
      });
    });
};

exports.addNewSkill = (newSkill) => {
  console.log(newSkill);
  const { skill_category, skill_subcategory, skill_description, thumbnail_image_url } = newSkill;
  console.log(skill_subcategory);
  return db
    .query(
      `INSERT INTO skills (skill_category, skill_subcategory, skill_description, thumbnail_image_url)
        VALUES ($1, $2, $3, $4)
        RETURNING*;`,
      [skill_category, skill_subcategory, skill_description, thumbnail_image_url]
    )
    .then((res) => {
      console.log(res);
      return res.rows[0];
    });
};
