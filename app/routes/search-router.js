const searchRouter = require('express').Router();
const { getSearchResults } = require('../controllers/search-controllers.js');

searchRouter.route('/').get(getSearchResults);

module.exports = searchRouter;
