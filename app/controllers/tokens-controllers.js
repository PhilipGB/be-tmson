const { fetchTokenData, fetchTokenById } = require('../models/tokens-models');

exports.getTokenData = (req, res, next) => {
  console.log(req.query);
  const { start, end } = req.query;
  fetchTokenData(start, end)
    .then((tokens) => {
      res.status(200).send({ tokens });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getTokenById = (req, res, next) => {
  const { token_id } = req.params;
  fetchTokenById(token_id)
    .then((token) => {
      res.status(200).send({ token });
    })
    .catch((err) => {
      next(err);
    });
};
