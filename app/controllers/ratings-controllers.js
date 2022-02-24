const { 
    insertNewRating,
    fetchRatings,
    fetchRatingsByUserID
} = require("../models/ratings-model.js");
  
    exports.postRating = (req, res, next) => {
            insertNewRating(req.body)
            .then((rating) => {
                res.status(201).send({ rating });
            })
        .catch(next);
    };

    exports.getRatings = (req, res, next) => {
        fetchRatings()
        .then((ratings) => {
            res.status(200).send({ratings});
        })
        .catch(next);
    }

    exports.getRatingsByUserID = (req, res, next) => {
        const { user_id } = req.params; 
        
        fetchRatingsByUserID(user_id)
        .then((results) => {
           let newResult = results.map((result => {
               return {task_id: result.task_id,
                        rating: result.rating,
                            comment: result.comment}
            }))
            res.status(200).send(newResult);
        })
        .catch((err) => {
            console.log(err)
            next(err)
        });
    }