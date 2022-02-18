const skillsRouter = require("express").Router();
// const {} = require("../controllers/skills-controllers.js");

skillsRouter
  .route("/")
  .get((req, res) => {
    res.status(200).send("All OK from POST /api/skills");
  })
  .post((req, res) => {
    res.status(200).send("All OK from POST /api/skills");
  })
  .patch((req, res) => {
    res.status(200).send("All OK from PATCH /api/skills");
  });

skillsRouter
  .route("/:skill")
  .get((req, res) => {
    res.status(200).send("All OK from GET /api/skills/:username");
  })
  .patch((req, res) => {
    res.status(200).send("All OK from PATCH /api/skills/:username");
  });

module.exports = skillsRouter;
