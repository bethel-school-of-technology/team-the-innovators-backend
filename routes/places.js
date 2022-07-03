var express = require('express');
var router = express.Router();
var models = require("../models")
const { Op } = require("sequelize");
const { response } = require('../app');

/* GET places listing. */


router.get('/:id', function (req, res, next) {

  models.place.findByPk(req.params.id).then(places => {
    res.json(places);
  })
});

router.get('/search/:query', function (req, res, next) {
  console.log(req.params.query);

  models.place.findAll({
    where: {

      [Op.or]: [
        { place_location: { [Op.like]: '%' + req.params.query + '%' } },
        { place_name: { [Op.like]: '%' + req.params.query + '%' } },
        { place_category: { [Op.like]: '%' + req.params.query + '%' } }
      ],

    }
  }).then(places => {
    res.json(places);
  });

});


// router.post("/makePlace", (req, res) => {

//   models.place.create({
//     place_name: req.body.place_name,
//     place_location: req.body.place_location,
//     place_phonenumber: req.body.place_phonenumber,
//     place_category: req.body.place_category
//   }).then(response => {
//     res.json(response)
//   })

// });

// router.get('/', function (req, res, next) {
//   models.place.findAll({}).then(places => {
//     res.json(places);
//   })
// });

module.exports = router;
