const skillsRouter = require('express').Router();
const {
  getAllSkills,
  getSkillsByCategory,
  postNewSkill,
  getSkillsById,
} = require('../controllers/skills-controllers.js');

skillsRouter.route('/').get(getAllSkills).post(postNewSkill);
skillsRouter.route('/:skill_id').get(getSkillsById);
skillsRouter.route('/:category').get(getSkillsByCategory);
skillsRouter.patch((req, res) => {
  res.status(200).send('All OK from PATCH /api/skills/:category');
});

module.exports = skillsRouter;
