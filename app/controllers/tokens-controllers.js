const {
  fetchTokenData,
  fetchTokenById,
  updateTokenOwner,
  mintNewToken,
} = require('../models/tokens-models');

exports.getTokenData = (req, res, next) => {
  const { start, end } = req.query;
  fetchTokenData(start, end)
    .then((tokens) => {
      res.status(200).send({ tokens });
    })
    .catch((err) => {
      console.log(err);
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

exports.patchTokenOwner = (req, res, next) => {
  const { token_id, owner_id, minter_id } = req.body;
  updateTokenOwner(token_id, owner_id, minter_id)
    .then((token) => {
      res.status(200).send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postNewToken = (req, res, next) => {
  const { minter_id, owner_id } = req.body;
  mintNewToken(minter_id, owner_id)
    .then((token) => {
      res.status(200).send({ token });
    })
    .catch((err) => {
      next(err);
    });
};
