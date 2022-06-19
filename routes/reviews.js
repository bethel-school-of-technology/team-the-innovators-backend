var express = require('express');
var router = express.Router();
var models = require("../models")
const { Op } = require("sequelize");
const { response } = require('../app');


router.post("/create", (req, res, next) => {
  models.review.create({
    review_message: req.body.review_message,
    rating: req.body.rating

  }).then(response => {
    res.json({
      message: "created review",
      status: 200,
      review: response
    })
  })

});

router.delete("/deleted/:id", (req, res, next) => {
  const reviewId = req.params.id
  models.review.delete({
    where:{reviewId}
  })
  
});


router.post("/makeReview", (req, res) => {

  models.review.create({
    reviewId: req.body.reviewId,
    review_message: req.body.review_message,
    rating: req.body.review_rating
  }).then(response => {
    res.json(response)
  })
})

module.exports = router;