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
  let token = req.headers.authorization;
  authService.verifyUser(token)
  .then(user => {
    if (user) {
      models.user.findOne(
       { where: {UserId: user.UserId },
       include: [{
         model: models.place,
         required: false
       }]
      })
      .then(placesFound => {
        console.log(placesFound)
        models.review.create({
          review_message: req.body.review_message,
          rating: req.body.rating,
          placePlaceId: placesFound.place_id,
          //deleted: 0, // updated model to set default value instead
          userId: user.UserId
        }).then(response => {
          res.json({
            message: "created review",
            status: 200,
            review: response
          })
        });
      })
    } else {
      res.json({
        message: "Token not verified",
        status: 406
      })
    }
  })
});

// router.put("/editReview", (req, res, next) => {

//   models.review.findByPk(req.body.reviewId).then(review => {
//     //res.json(review);
//     review.review_message = req.body.review_message;
//     review.rating = req.body.rating;
//     review.save().then(() => {
//       res.json({
//         message: "edited review",
//         status: 200,
//         review: review
//       })
//     });
//   })
// });

// User edits review
router.put('/editReview/:id', function (req, res, next) {
  console.log(req.params.id);
  models.review.update(req.body, {where: {
    reviewId: req.params.id
  }}).then(result => {
    res.json({
      message: "Review edited",
      status: 200,
      result
    });
  })
});

// Get review by reviewId

router.get('/review/:id', function (req, res, next) {
  let reviewId = parseInt(req.params.id);
  models.review
    .find({
      where: {
        reviewId: reviewId
      },
      include: [models.user]
    })
    .then(reviewFound => {
      res.json({
        message: "Review Found",
        status: 200,
        review: reviewFound
      })
    });
});

// View all reviews by User Id
router.get('/user/reviews', function (req, res, next) {
  let token = req.headers.authorization;
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user) {
          models.review
            .findAll({
              where: { userUserId: user.UserId, Deleted: false }
            })
            .then(reviewsFound =>
              res.json({
                message: "Reviews Found",
                status: 200,
                reviews: reviewsFound
              })
            );
        } else {
          res.status(401);
          res.send('Invalid authentification token');
        }
      });
  } else {
    res.send('Unable to retrieve posts');
  }
});


//review by place id
router.get('/place/:id', function (req, res, next) {
          models.review
            .findAll({
              where: { placePlaceId: req.params.id}
            })
            .then(reviewsFound =>
              res.json({
                message: "Reviews Found",
                status: 200,
                reviews: reviewsFound
              })
            );
        });


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

