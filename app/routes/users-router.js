const usersRouter = require("express").Router();
const {
  getUsers,
  getUserByUsername,
  postUsers,
  patchUsername,
} = require("../controllers/users-controllers.js");

usersRouter.route("/").get(getUsers).post(postUsers);

usersRouter.route("/:username").get(getUserByUsername).patch(patchUsername);

module.exports = usersRouter;
