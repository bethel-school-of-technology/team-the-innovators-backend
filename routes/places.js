var express = require('express');
var router = express.Router();
var models = require("../models");
const mysql = require('mysql2');

/* GET places listing. */
router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.post('/places', function(req, res, next) {
  models.place
    .findOrCreate({
      where: {
        place_name: req.body.name
      },
      defaults: {
        place_location: req.body.location,
        place_phonenumber: req.body.number,
        place_category: req.body.category
        
      }
    })
    .spread(function(result, created) {
      if (created) {
        res.send('Place successfully created');
      } else {
        res.send('This place already exists');
      }
    });
});
// router.get('/', function(req, res, next) {

//   models.place.findAll({}).then(response => {
                                                   
//   })


// });


router.post("/makePlace", (req, res) => {

  models.place.create({
    place_name: req.body.name,
    place_location: req.body.location,
    place_phonenumber: req.body.number,
    place_category: req.body.category
  }).then(response => {
    res.json(response)
  });
});

module.exports = router;