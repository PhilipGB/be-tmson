const {
  fetchTasks,
  fetchTaskById,
  updateTaskById,
  writeNewTask,
  eraseTask,
  fetchUserTasks,
  approveTaskById,
} = require('../models/tasks.model');

exports.getTasks = (req, res, next) => {
  const { sort_by } = req.query;
  const { order } = req.query;
  fetchTasks(sort_by, order)
    .then((tasks) => {
      res.status(200).send({ tasks });
    })
    .catch(next);
};

exports.getTaskById = (req, res, next) => {
  const { task_id } = req.params;
  fetchTaskById(task_id)
    .then((task) => {
      res.status(200).send({ task });
    })
    .catch(next);
};

exports.patchTaskById = (req, res, next) => {
  const { task_id } = req.params;
  const updatedTaskBody = req.body;
  updateTaskById(updatedTaskBody, task_id)
    .then((task) => {
      res.status(200).send({ task });
    })
    .catch(next);
};

exports.postTask = (req, res, next) => {
  writeNewTask(req.body)
    .then((task) => {
      res.status(201).send({ task });
    })
    .catch(next);
};

exports.deleteTask = (req, res, next) => {
  const { task_id } = req.params;
  eraseTask(task_id)
    .then(() => {
      res.status(204).send({ msg: 'No Content' });
    })
    .catch(next);
};

exports.getUserTasks = (req, res, next) => {
  const { user_id } = req.params;
  fetchUserTasks(user_id)
    .then((tasks) => {
      res.status(200).send({ tasks });
    })
    .catch(next);
};

exports.patchTaskToApproved = (req, res, next) => {
  const { task_id } = req.params;
  approveTaskById(task_id)
    .then((task) => {
      console.log(task);
      res.status(201).send({ task });
    })
    .catch(next);
};
