const {
  getTasks,
  getTaskById,
  patchTaskById,
  postTask,
  deleteTask,
  getUserTasks,
} = require('../controllers/tasks-controller');

const tasksRouter = require('express').Router();
// const {} = require("../controllers/tasks-controllers.js");

tasksRouter
  .route('/')
  .get(getTasks)
  .post(postTask)
  .patch((req, res) => {
    res.status(200).send('All OK from PATCH /api/tasks');
  });

tasksRouter.route('/:task_id').get(getTaskById).patch(patchTaskById).delete(deleteTask);

tasksRouter.route('/my-account/:user_id').get(getUserTasks); // new route added

module.exports = tasksRouter;
