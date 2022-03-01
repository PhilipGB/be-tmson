const tokensRouter = require('express').Router();
const {
  getTokenById,
  getTokenData,
  patchTokenOwner,
  postNewToken,
  getTokensByUserId,
} = require('../controllers/tokens-controllers.js');

tokensRouter.route('/').get(getTokenData).post(postNewToken);

tokensRouter.route('/:token_id').get(getTokenById).patch(patchTokenOwner);

tokensRouter.route('/users/:user_id').get(getTokensByUserId);

module.exports = tokensRouter;
