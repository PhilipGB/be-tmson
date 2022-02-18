exports.getApi = (req, res) => {
  res.status(200).send(require("../endpoints.json"));
};
