const { fetchSeachResults } = require('../models/search-models');

exports.getSearchResults = (req, res, next) => {
  const { q } = req.query;

  fetchSeachResults(q)
    .then((results) => {
      res.status(200).send({ results: results });
    })
    .catch((err) => {
      next(err);
    });
};
