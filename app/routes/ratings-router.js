const ratings = require('../../db/data/test-data/ratings');
const { 
    postRating, 
    getRatings,
    getRatingsByUserID
} = require('../controllers/ratings-controllers');

const ratingsRouter = require('express').Router();

ratingsRouter
    .route("/")
    .post(postRating)
    .get(getRatings)
ratingsRouter
    .route("/:user_id")
    .get(getRatingsByUserID)
    

module.exports = ratingsRouter;