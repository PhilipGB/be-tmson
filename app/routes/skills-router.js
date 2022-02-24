const skillsRouter = require('express').Router();
const {
  getAllSkills,
  getSkillsByCategory,
  postNewSkill,
} = require('../controllers/skills-controllers.js');

skillsRouter.route('/').get(getAllSkills).post(postNewSkill);
skillsRouter.route('/:category').get(getSkillsByCategory);
skillsRouter.patch((req, res) => {
  res.status(200).send('All OK from PATCH /api/skills/:category');
});

module.exports = skillsRouter;
