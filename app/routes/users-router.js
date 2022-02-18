const usersRouter = require("express").Router();
// const {} = require("../controllers/users-controllers.js");

usersRouter
  .route("/")
  .get((req, res) => {
    res.status(200).send("All OK from POST /api/users");
  })
  .post((req, res) => {
    res.status(200).send("All OK from POST /api/users");
  });

usersRouter
  .route("/:username")
  .get((req, res) => {
    res.status(200).send("All OK from GET /api/users/:username");
  })
  .patch((req, res) => {
    res.status(200).send("All OK from PATCH /api/users/:username");
  });

module.exports = usersRouter;
