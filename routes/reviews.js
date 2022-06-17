var express = require('express');
var router = express.Router();
var models = require("../models")
const { Op } = require("sequelize");
const { response } = require('../app');

router.post("/createReview", (req, res, next) => {
    models.review.create({
      review_message: req.body.review_message,
      rating: req.body.rating,
      placePlaceId: req.body.placePlaceId
  
    }).then(response => {
      res.json({
        message: "created review",
        status: 200,
        review: response
      })
    })
  })
  
  module.exports = router;