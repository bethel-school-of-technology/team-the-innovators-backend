var express = require('express');
var router = express.Router();
var models = require("../models")

/* GET places listing. */
router.get('/', function(req, res, next) {

  console.log("this place works")
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

});

router.put("/places/:id", function (req, res, next) {
  let placeId = parseInt(req.params.id);
  models.place
    .update(req.body, { where: { place_id: placeId } })
    .then(result => res.redirect('/places/' + placeId))
    .catch(err => {
      res.status(400);
      res.send("There was a problem updating the place.  Please check the place information.");
    });
});

module.exports = router;