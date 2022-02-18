const tokensRouter = require("express").Router();
// const {} = require("../controllers/tokens-controllers.js");

tokensRouter
  .route("/")
  .get((req, res) => {
    res.status(200).send("All OK from POST /api/tokens");
  })
  .post((req, res) => {
    res.status(200).send("All OK from POST /api/tokens");
  })
  .patch((req, res) => {
    res.status(200).send("All OK from PATCH /api/tokens");
  });

tokensRouter
  .route("/:skill")
  .get((req, res) => {
    res.status(200).send("All OK from GET /api/tokens/:username");
  })
  .patch((req, res) => {
    res.status(200).send("All OK from PATCH /api/tokens/:username");
  });

module.exports = tokensRouter;
