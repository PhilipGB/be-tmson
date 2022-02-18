const apiRouter = require("express").Router();
const { getApi } = require("../controllers/api-controllers.js");

apiRouter.route("/").get(getApi);

module.exports = apiRouter;
