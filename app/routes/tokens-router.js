const tokensRouter = require('express').Router();
const { getTokenById, getTokenData } = require('../controllers/tokens-controllers.js');

tokensRouter.route('/').get(getTokenData);

tokensRouter.route('/:token_id').get(getTokenById).patch(patchTokenOwner);

module.exports = tokensRouter;
