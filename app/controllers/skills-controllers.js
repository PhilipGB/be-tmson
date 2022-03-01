// const skill_categories = require('../../db/data/test-data/skill_categories');
const {
  fetchSkills,
  fetchSkillsByCategory,
  addNewSkill,
  fetchSkillsById,
} = require('../models/skills-models');

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
  const { category } = req.params;
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
  addNewSkill(newSkill)
    .then((skill) => {
      res.status(201).send(skill);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getSkillsById = (req, res, next) => {
  const { skill_id } = req.params;

  fetchSkillsById(skill_id)
    .then((skills) => {
      res.status(200).send({ skills });
    })
    .catch((err) => {
      next(err);
    });
};
