var express = require('express');
var router = express.Router();
var models = require("../models")
const { Op } = require("sequelize");

/* GET places listing. */
router.get('/', function(req, res, next) {

  models.place.findAll({}).then(response => {
                                                   
  })


});

router.get('/search/:query', function(req, res, next) {
  console.log(req.params.query);

  models.place.findAll({
    where: {

      [Op.or]: [
        { place_location: {[Op.like]: '%' + req.params.query + '%' } },
        { place_name: {[Op.like]: '%' + req.params.query + '%' } }
      ],
      
    }
  }).then(places => {
    res.json(places);
  });

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