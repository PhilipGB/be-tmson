const db = require('../../db/connection.js');
const format = require('pg-format');

exports.fetchSeachResults = (search, limit = 'ALL', offset = 0) => {
  if (!search) {
    return Promise.reject({
      status: 400,
      msg: `Please provide a search string`,
    });
  }

  const searchTerms = search
    .match(/(".*?"|[^" \s]+)(?=\s* |\s*$)/g)
    .map((term) => term.replaceAll('"', ''));

  const searchQuery = format(
    `
    SELECT 
      task_id, start_time, location, 
      task_name, skill_category, 
      skill_subcategory, thumbnail_image_url
    FROM 
      tasks
    JOIN 
      skills ON tasks.skill_id = skills.skill_id
    WHERE 
      skill_subcategory  ~* ANY(ARRAY[%L])
      OR
      skill_category  ~* ANY(ARRAY[%L])
      OR
      skill_description  ~* ANY(ARRAY[%L])
      OR
      task_name ~* ANY(ARRAY[%L])
    ORDER BY 
      start_time DESC
    LIMIT ${limit} OFFSET ${offset};
    `,
    searchTerms,
    searchTerms,
    searchTerms,
    searchTerms
  );

  return db.query(searchQuery).then((result) => result.rows);
};
