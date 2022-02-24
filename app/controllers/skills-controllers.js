// const skill_categories = require('../../db/data/test-data/skill_categories');
const { fetchSkills, fetchSkillsByCategory, addNewSkill } = require('../models/skills-models');

exports.getAllSkills = (req, res, next) => {
  fetchSkills()
    .then((skill_categories) => {
      res.status(200).send({ skill_categories });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getSkillsByCategory = (req, res, next) => {
  console.log(req.params);
  const { category } = req.params;
  console.log(category);
  fetchSkillsByCategory(category)
    .then((skills) => {
      res.status(200).send({ skills });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postNewSkill = (req, res, next) => {
  const newSkill = req.body;
  console.log(newSkill);
  addNewSkill(newSkill)
    .then((skill) => {
      console.log(skill);
      res.status(201).send(skill);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
