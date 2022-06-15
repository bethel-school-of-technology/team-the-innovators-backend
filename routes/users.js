var express = require('express');
var router = express.Router();
const authService = require("../services/auth");
let models = require('../models');

/* GET users listing. */

router.post('/signup', function (req, res, next) {
  models.user
    .findOrCreate({
      where: {
        Username: req.body.Username
      },
      defaults: {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Password: authService.hashPassword(req.body.Password)
      }
    })
    .spread(function (result, created) {
      if (created) {
        res.json({
          message: "Signup Successful"
        });
      } else {
        res.json({
          message: "User Not Created"
        });
      }
    });
});

router.post('/login', function (req, res, next) {
  models.user.findOne({
    where: {
      Username: req.body.username
    }
  }).then(user => {
    if (!user) {
      res.json({
        message: "User Not Found",
        status: 500
      });
    } else {
      let passwordMatch = authService.comparePasswords(req.body.password, user.Password);
      if (passwordMatch) {
        let token = authService.signUser(user);
        res.json({
          message: "Login Successful",
          status: 200,
          token
        });
      } else {
        console.log('Wrong Password');
        res.json({
          message: "Wrong Password",
          status: 403
        });
      }
    }
  });
});

// PROFILE
router.get('/profile', function (req, res, next) {
  console.log(req.headers);
  let token = req.headers.authorization;
  console.log(token);
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user) {
          res.json({
            message: "Profile Loaded Successfully",
            status: 200,
            user
          });
        } else {
          res.json({
            message: "Invalid Token",
            status: 403
          });
        }
      });
  } else {
    res.json({
      message: "Missing Token",
      status: 403
    });
  }
});

// LOGOUT
router.get('/logout', function (req, res, next) {
  res.cookie('jwt', "", { expires: new Date(0) });
  res.send('Logged out');
});



module.exports = router;
