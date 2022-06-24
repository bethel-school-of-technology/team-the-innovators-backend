var express = require('express');
var router = express.Router();
var models = require("../models")
const { Op } = require("sequelize");
const { response } = require('../app');
const authService = require("../services/auth");


router.delete("/deleted/:id", (req, res, next) => {
  const reviewId = req.params.id
  models.review.delete({
    where: { reviewId }
  })

});



router.post("/createReview", (req, res, next) => {
  models.review.create({
    review_message: req.body.review_message,
    rating: req.body.rating,
    placePlaceId: req.body.placePlaceId,
    deleted: 0

  }).then(response => {
    res.json({
      message: "created review",
      status: 200,
      review: response
    })
  });

  router.put("/editReview", (req, res, next) => {

    models.review.findByPk(req.body.reviewId).then(review => {
      //res.json(review);
      review.review_message = req.body.review_message;
      review.rating = req.body.rating;
      review.save().then(() => {
        res.json({
          message: "edited review",
          status: 200,
          review: review
        })
      });
      
    })

    
  })
})

// View all reviews if admin
router.get('/admin/reviews', function (req, res, next) {
  console.log(req.headers);
  let token = req.headers.authorization;
  console.log(token);
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user.Admin) {
          models.review
            .findAll({ where: { Deleted: false }, raw: true })
            .then(reviewsFound =>
              res.json({
                message: "Reviews Found",
                status: 200,
                reviews: reviewsFound
              }
              ));
        } else {
          res.send('Unauthorized')
        }
      });
  }
});


// 'Delete' review if an admin
router.delete('/admin/reviews/:id', function (req, res, next) {
  console.log('Enter Delete...');
  console.log(':id ' + req.params.id);
  let reviewId = parseInt(req.params.id);
  console.log('Before Checking for Admin');
  // Verify Admin 
  let token = req.headers.authorization;
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user.Admin) {
          // Admin is logged in
          console.log('We have an Admin!');
          models.review
            .update(
              { deleted: true },
              { where: { reviewId: reviewId } },
              { raw: true }
            )
            .then(response => {
              res.json({ message: 'Review deleted' });
            });
        } else {
          res.json({ message: 'Unauthorized' });
        }
      })
  }
});



module.exports = router;

