var express = require('express');
var router = express.Router();
var models = require("../models")

/* GET places listing. */
router.get('/', function(req, res, next) {

  models.place.findAll({}).then(response => {
                                                   
  })


});


router.post("/makePlace", (req, res) => {

models.place.create({
  place_name: req.body.name,
  place_location: req.body.location,
  place_phonenumber: req.body.number,
  place_category: req.body.category
}).then(response => {
  res.json(response)
})

})

module.exports = router;