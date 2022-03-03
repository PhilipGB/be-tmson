const tokensRouter = require('express').Router();
const {
  getTokenById,
  getTokenData,
  patchTokenOwner,
  postNewToken,
  getTokensByUserId,
  postNewTransaction,
} = require('../controllers/tokens-controllers.js');

tokensRouter.route('/').get(getTokenData).post(postNewToken);
tokensRouter.route('/:token_id').get(getTokenById).patch(patchTokenOwner);
tokensRouter.route('/my-tokens/:user_id').get(getTokensByUserId);
tokensRouter.route('/transactions').post(postNewTransaction);

module.exports = tokensRouter;
