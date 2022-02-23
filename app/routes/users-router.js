const usersRouter = require("express").Router();
const {
  getUsers,
  getUserByUsername,
  postUsers,
} = require("../controllers/users-controllers.js");

usersRouter
  .route("/")
  .get(getUsers)
  .post(postUsers)
  .patch((req, res) => {
    res.status(200).send("All OK from PATCH /api/users");
  });

usersRouter
  .route("/:username")
  .get(getUserByUsername)
  .patch((req, res) => {
    res.status(200).send("All OK from PATCH /api/users/:username");
  });

module.exports = usersRouter;
