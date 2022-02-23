const {
  selectUsers,
  selectUserByUsername,
  insertUser,
  updateUser,
} = require("../models/users-models.js");

exports.getUsers = (req, res, next) => {
  selectUsers()
    .then((users) => {
      res.status(200).send({ users: users });
    })
    .catch(next);
};

exports.getUserByUsername = (req, res, next) => {
  const { username } = req.params;

  selectUserByUsername(username)
    .then((user) => {
      res.status(200).send({ user: user });
    })
    .catch(next);
};

exports.postUsers = (req, res, next) => {
  const { body: user } = req;

  insertUser(user)
    .then((user) => {
      res.status(201).send({ user: user });
    })
    .catch(next);
};

exports.patchUsername = (req, res, next) => {
  // if (JSON.stringify(Object.keys(req.body)) !== ) {
  //   res.status(405).send({ msg: "Invalid request body" });
  // }
  const { username } = req.params;
  const updatedUser = req.body;

  updateUser(updatedUser, username)
    .then((user) => {
      res.status(200).send({ user: user });
    })
    .catch(next);
};
