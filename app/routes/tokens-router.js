const tokensRouter = require('express').Router();
const {
  getTokenById,
  getTokenData,
  patchTokenOwner,
  postNewToken,
} = require('../controllers/tokens-controllers.js');

tokensRouter.route('/').get(getTokenData).post(postNewToken);

tokensRouter.route('/:token_id').get(getTokenById).patch(patchTokenOwner);

module.exports = tokensRouter;
